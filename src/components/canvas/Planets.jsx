import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Html, Preload, useTexture } from "@react-three/drei";

// Every sphere shares one WebGL context. One canvas per sphere is what the
// original template did, and twenty of them would sit on the browser's context
// limit and evict each other.
const BALL_R = 1;
const SPACING_X = 3;
const SPACING_Y = 3.6;
const DRAG_SENSITIVITY = 0.007;
const DAMPING = 0.93;
const IDLE_SPIN = 0.18;

const columnsFor = (w) => {
  if (w >= 1120) return 6;
  if (w >= 880) return 5;
  if (w >= 620) return 4;
  return 3;
};

const Planet = ({ texture, name, position, index, register, onGrab, frozen }) => {
  const mesh = useRef();
  const group = useRef();
  const [hovered, setHovered] = useState(false);
  const state = useRef({ velocity: 0, rotation: 0, scale: 1 });

  useEffect(() => register(index, state.current), [index, register]);

  useFrame((s, dt) => {
    const st = state.current;
    const step = Math.min(dt, 0.05);

    st.rotation += st.velocity + (frozen ? 0 : IDLE_SPIN * step);
    st.velocity *= DAMPING;
    if (Math.abs(st.velocity) < 0.00005) st.velocity = 0;

    const targetScale = hovered ? 1.14 : 1;
    st.scale += (targetScale - st.scale) * Math.min(1, step * 9);

    if (mesh.current) {
      mesh.current.rotation.y = st.rotation;
      mesh.current.scale.setScalar(st.scale);
    }
    if (group.current) {
      const bob = frozen ? 0 : Math.sin(s.clock.elapsedTime * 0.8 + index * 1.7) * 0.06;
      group.current.position.y = position[1] + bob;
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "grab";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          onGrab(index, e.clientX);
        }}
      >
        <icosahedronGeometry args={[BALL_R, 4]} />
        <meshStandardMaterial
          color="#fff8eb"
          roughness={0.45}
          metalness={0.05}
          emissive="#915eff"
          emissiveIntensity={hovered ? 0.22 : 0}
        />
        <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={1.15} map={texture} />
      </mesh>

      <Html
        center
        position={[0, -BALL_R - 0.62, 0]}
        style={{ pointerEvents: "none", userSelect: "none" }}
        zIndexRange={[5, 0]}
      >
        <span
          className={`block w-[104px] text-center text-[12px] leading-tight transition-colors duration-400 ease-fluid ${
            hovered ? "text-white" : "text-secondary"
          }`}
        >
          {name}
        </span>
      </Html>
    </group>
  );
};

const Grid = ({ items, cols, textures, register, onGrab, frozen }) => {
  const rows = Math.ceil(items.length / cols);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 5]} intensity={1.5} />
      <pointLight position={[-4, 2, 4]} intensity={12} color="#915eff" distance={18} />

      {items.map((tech, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = (col - (cols - 1) / 2) * SPACING_X;
        const y = ((rows - 1) / 2 - row) * SPACING_Y;
        return (
          <Planet
            key={tech.name}
            index={i}
            name={tech.name}
            texture={textures[i]}
            position={[x, y, 0]}
            register={register}
            onGrab={onGrab}
            frozen={frozen}
          />
        );
      })}
    </>
  );
};

const Scene = (props) => {
  const textures = useTexture(props.items.map((t) => t.icon));
  return <Grid {...props} textures={textures} />;
};

const PlanetsCanvas = ({ items }) => {
  const wrapper = useRef(null);
  const states = useRef([]);
  const drag = useRef(null);
  const [layout, setLayout] = useState({ cols: 4, zoom: 34, height: 400 });
  const [frozen, setFrozen] = useState(false);

  const register = useCallback((index, state) => {
    states.current[index] = state;
  }, []);

  const onGrab = useCallback((index, clientX) => {
    drag.current = { index, lastX: clientX };
    document.body.style.cursor = "grabbing";
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setFrozen(mq.matches);
    const onChange = (e) => setFrozen(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    const el = wrapper.current;
    if (!el) return;

    const apply = () => {
      const width = el.clientWidth;
      if (!width) return;
      const cols = columnsFor(width);
      const rows = Math.ceil(items.length / cols);
      // Zoom is px per world unit, so the grid always fills the width without
      // the spheres overlapping.
      const zoom = Math.max(22, Math.min(40, width / (cols * SPACING_X)));
      setLayout({ cols, zoom, height: Math.round(rows * SPACING_Y * zoom) });
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    const st = states.current[d.index];
    if (st) st.velocity += (e.clientX - d.lastX) * DRAG_SENSITIVITY;
    d.lastX = e.clientX;
  };

  const release = () => {
    if (!drag.current) return;
    drag.current = null;
    document.body.style.cursor = "";
  };

  useEffect(() => () => {
    document.body.style.cursor = "";
  }, []);

  return (
    <div
      ref={wrapper}
      className="planets-canvas w-full select-none"
      style={{ height: layout.height }}
      onPointerMove={move}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
    >
      <Canvas orthographic camera={{ position: [0, 0, 10], zoom: layout.zoom }} dpr={[1, 1.75]}>
        <Suspense fallback={null}>
          <Scene
            items={items}
            cols={layout.cols}
            register={register}
            onGrab={onGrab}
            frozen={frozen}
          />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default PlanetsCanvas;

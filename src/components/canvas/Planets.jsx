import { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Html, Preload, useTexture } from "@react-three/drei";
import { meteorTexture } from "../../utils/meteor";

// Every sphere shares one WebGL context. One canvas per sphere is what the
// original template did, and twenty of them would sit on the browser's context
// limit and evict each other.
const BALL_R = 1;
const SPACING_X = 3;
const SPACING_Y = 3.6;
const DRAG_SENSITIVITY = 0.007;
const DAMPING = 0.93;

// Arrival: each sphere starts somewhere off the canvas and falls into its slot.
const ARRIVE_SECONDS = 0.75;
const ARRIVE_STAGGER = 0.025;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const columnsFor = (w) => {
  if (w >= 1120) return 6;
  if (w >= 880) return 5;
  if (w >= 620) return 4;
  return 3;
};

// Deterministic per-index pseudo-random, so the layout is identical on every
// load and nothing jumps between renders.
const rand = (i, salt) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const Planet = ({ texture, surface, name, target, index, register, onGrab, frozen, entered }) => {
  const group = useRef();
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  // Idle motion is a slow sway, not a full revolution: each sphere carries its
  // mark on one face, and a continuous spin hides it for most of every turn.
  // Direction, rate and phase differ per sphere. Dragging still turns a sphere
  // all the way round and leaves it where it is let go.
  const motion = useMemo(() => {
    const dir = index % 2 === 0 ? 1 : -1;
    const angle = rand(index, 1) * Math.PI * 2;
    const distance = 13 + rand(index, 2) * 9;
    return {
      swayAmp: dir * (0.26 + rand(index, 3) * 0.22),
      swayRate: 0.28 + rand(index, 9) * 0.34,
      swayPhase: rand(index, 10) * Math.PI * 2,
      tiltAmp: (rand(index, 4) - 0.5) * 0.3,
      tiltRate: 0.2 + rand(index, 5) * 0.25,
      bobPhase: rand(index, 6) * Math.PI * 2,
      bobRate: 0.55 + rand(index, 7) * 0.5,
      from: [Math.cos(angle) * distance, Math.sin(angle) * distance * 0.7],
      delay: index * ARRIVE_STAGGER,
    };
  }, [index]);

  const state = useRef({ velocity: 0, rotation: 0, scale: 1, elapsed: 0 });

  useEffect(() => register(index, state.current), [index, register]);

  useFrame((s, dt) => {
    const st = state.current;
    const step = Math.min(dt, 0.05);

    // st.rotation holds only what dragging added, so releasing leaves the
    // sphere where it was put and the sway continues around that.
    st.rotation += st.velocity;
    st.velocity *= DAMPING;
    if (Math.abs(st.velocity) < 0.00005) st.velocity = 0;

    const targetScale = hovered ? 1.09 : 1;
    st.scale += (targetScale - st.scale) * Math.min(1, step * 9);

    if (mesh.current) {
      const t = s.clock.elapsedTime;
      const sway = frozen ? 0 : Math.sin(t * motion.swayRate + motion.swayPhase) * motion.swayAmp;
      const tilt = frozen ? 0 : Math.sin(t * motion.tiltRate + motion.bobPhase) * motion.tiltAmp;
      mesh.current.rotation.y = st.rotation + sway;
      mesh.current.rotation.x = tilt;
      mesh.current.scale.setScalar(st.scale);
    }

    if (!group.current) return;

    if (frozen) {
      group.current.position.set(target[0], target[1], 0);
      return;
    }

    if (entered) st.elapsed += step;
    const p = entered
      ? easeOut(Math.min(1, Math.max(0, (st.elapsed - motion.delay) / ARRIVE_SECONDS)))
      : 0;

    const bob = Math.sin(s.clock.elapsedTime * motion.bobRate + motion.bobPhase) * 0.07 * p;
    group.current.position.set(
      motion.from[0] + (target[0] - motion.from[0]) * p,
      motion.from[1] + (target[1] - motion.from[1]) * p + bob,
      0
    );
  });

  return (
    <group ref={group}>
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
        <icosahedronGeometry args={[BALL_R, 2]} />
        {/* No emissive or colour shift on hover: the rock keeps its own colour. */}
        <meshStandardMaterial
          map={surface}
          bumpMap={surface}
          bumpScale={0.035}
          color="#cfc9d8"
          roughness={0.9}
          metalness={0.05}
          flatShading
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
          className={`block w-[104px] text-center text-[12px] leading-tight transition-colors duration-500 ease-fluid ${
            hovered ? "text-white" : "text-secondary"
          }`}
        >
          {name}
        </span>
      </Html>
    </group>
  );
};

const Grid = ({ items, cols, textures, register, onGrab, frozen, entered }) => {
  const rows = Math.ceil(items.length / cols);
  const surface = useMemo(() => meteorTexture(), []);

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 6]} intensity={1.9} />
      <directionalLight position={[-4, -2, 2]} intensity={0.4} color="#b58bff" />

      {items.map((tech, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return (
          <Planet
            key={tech.name}
            index={i}
            name={tech.name}
            texture={textures[i]}
            surface={surface}
            target={[
              (col - (cols - 1) / 2) * SPACING_X,
              ((rows - 1) / 2 - row) * SPACING_Y,
            ]}
            register={register}
            onGrab={onGrab}
            frozen={frozen}
            entered={entered}
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
  const [entered, setEntered] = useState(false);

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

  // The drift starts when the grid is actually looked at, not when it mounts.
  useEffect(() => {
    const el = wrapper.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = wrapper.current;
    if (!el) return;

    const apply = () => {
      const width = el.clientWidth;
      if (!width) return;
      const cols = columnsFor(width);
      const rows = Math.ceil(items.length / cols);
      // Zoom is px per world unit, so the grid fills the width without the
      // spheres overlapping.
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
            entered={entered}
          />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default PlanetsCanvas;

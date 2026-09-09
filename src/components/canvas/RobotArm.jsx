import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import CanvasLoader from "../Loader";

const BODY = "#c9c5d8";
const HOUSING = "#241d3d";
const ACCENT = "#915eff";
const CARGO = "#00cea8";

const BASE_YAW = -0.35;
const DRAG_SENSITIVITY = 0.009;
const SPIN_DAMPING = 0.94;

// The arm is built from primitives rather than loaded as a model: nothing to
// download, nothing to license, and the joint angles stay drivable from code.
const Metal = ({ color = BODY, ...props }) => (
  <meshStandardMaterial color={color} metalness={0.75} roughness={0.35} {...props} />
);

const Joint = ({ radius = 0.3 }) => (
  <mesh castShadow>
    <sphereGeometry args={[radius, 24, 24]} />
    <meshStandardMaterial
      color={HOUSING}
      metalness={0.6}
      roughness={0.3}
      emissive={ACCENT}
      emissiveIntensity={0.45}
    />
  </mesh>
);

const CONVEYOR_LENGTH = 9;
const CRATE_COUNT = 5;

const Conveyor = ({ frozen }) => {
  const crates = useRef([]);
  const offsets = useMemo(
    () => Array.from({ length: CRATE_COUNT }, (_, i) => (i * CONVEYOR_LENGTH) / CRATE_COUNT),
    []
  );

  useFrame((state) => {
    if (frozen) return;
    const t = state.clock.elapsedTime;
    crates.current.forEach((crate, i) => {
      if (!crate) return;
      const travelled = (offsets[i] + t * 0.8) % CONVEYOR_LENGTH;
      crate.position.x = travelled - CONVEYOR_LENGTH / 2;
      crate.rotation.y = travelled * 0.25;
    });
  });

  return (
    <group position={[0, -0.02, 1.9]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[CONVEYOR_LENGTH, 1.5]} />
        <meshStandardMaterial color="#0d0a1c" metalness={0.2} roughness={0.9} />
      </mesh>
      {offsets.map((_, i) => (
        <mesh key={i} ref={(el) => (crates.current[i] = el)} position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.36, 0.36, 0.36]} />
          <meshStandardMaterial
            color={HOUSING}
            metalness={0.5}
            roughness={0.35}
            emissive={CARGO}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

const Arm = ({ frozen }) => {
  const yaw = useRef();
  const shoulder = useRef();
  const elbow = useRef();
  const wrist = useRef();
  const fingerL = useRef();
  const fingerR = useRef();

  useFrame((state) => {
    if (frozen) return;
    const t = state.clock.elapsedTime;
    // One slow pick-and-place cycle, driven by a single phase so the joints
    // stay in step with each other and with the gripper.
    const phase = t * 0.45;
    if (yaw.current) yaw.current.rotation.y = Math.sin(phase * 0.6) * 0.55;
    if (shoulder.current) shoulder.current.rotation.z = -0.35 + Math.sin(phase) * 0.3;
    if (elbow.current) elbow.current.rotation.z = 0.95 + Math.sin(phase + 1.1) * 0.35;
    if (wrist.current) wrist.current.rotation.z = -0.5 + Math.sin(phase + 2.2) * 0.25;

    const grip = 0.09 + (Math.sin(phase * 2) + 1) * 0.05;
    if (fingerL.current) fingerL.current.position.x = -grip;
    if (fingerR.current) fingerR.current.position.x = grip;
  });

  return (
    <group>
      {/* plinth */}
      <mesh receiveShadow position={[0, -0.08, 0]}>
        <cylinderGeometry args={[1.25, 1.4, 0.16, 40]} />
        <Metal color="#191436" metalness={0.5} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.02, 1.14, 48]} />
        <meshBasicMaterial color={ACCENT} toneMapped={false} />
      </mesh>

      <group ref={yaw}>
        {/* rotating column */}
        <mesh castShadow position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.42, 0.55, 0.9, 28]} />
          <Metal />
        </mesh>

        <group position={[0, 0.95, 0]}>
          <Joint radius={0.34} />

          {/* upper arm */}
          <group ref={shoulder}>
            <mesh castShadow position={[0, 1.1, 0]}>
              <boxGeometry args={[0.34, 2.2, 0.42]} />
              <Metal />
            </mesh>
            <mesh position={[0, 1.1, 0.22]}>
              <boxGeometry args={[0.1, 1.5, 0.02]} />
              <meshBasicMaterial color={ACCENT} toneMapped={false} />
            </mesh>

            <group position={[0, 2.2, 0]}>
              <Joint radius={0.28} />

              {/* forearm */}
              <group ref={elbow}>
                <mesh castShadow position={[0, 0.9, 0]}>
                  <boxGeometry args={[0.28, 1.8, 0.34]} />
                  <Metal />
                </mesh>

                <group position={[0, 1.8, 0]}>
                  <Joint radius={0.22} />

                  {/* wrist and gripper */}
                  <group ref={wrist}>
                    <mesh castShadow position={[0, 0.3, 0]}>
                      <cylinderGeometry args={[0.18, 0.2, 0.45, 20]} />
                      <Metal color="#a9a4bd" />
                    </mesh>
                    <mesh position={[0, 0.55, 0]}>
                      <boxGeometry args={[0.42, 0.12, 0.3]} />
                      <Metal color="#a9a4bd" />
                    </mesh>
                    <mesh ref={fingerL} position={[-0.14, 0.78, 0]} castShadow>
                      <boxGeometry args={[0.08, 0.42, 0.22]} />
                      <Metal color="#8f8aa8" />
                    </mesh>
                    <mesh ref={fingerR} position={[0.14, 0.78, 0]} castShadow>
                      <boxGeometry args={[0.08, 0.42, 0.22]} />
                      <Metal color="#8f8aa8" />
                    </mesh>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

// Dragging turns the arm about its own column. Orbiting the camera instead
// swings it around the middle of the page and out of frame, which is what it
// used to do.
const Scene = ({ compact, frozen, spin }) => {
  const pivot = useRef();

  useFrame(() => {
    const s = spin.current;
    if (!s.dragging) {
      s.yaw += s.velocity;
      s.velocity *= SPIN_DAMPING;
      if (Math.abs(s.velocity) < 0.0001) s.velocity = 0;
    }
    if (pivot.current) pivot.current.rotation.y = s.yaw;
  });

  return (
    <group position={[0, -2.3, 0]} scale={compact ? 0.62 : 0.72}>
      <group ref={pivot}>
        <Arm frozen={frozen} />
        <Conveyor frozen={frozen} />
      </group>
    </group>
  );
};

const RobotArmCanvas = () => {
  const [compact, setCompact] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const spin = useRef({ yaw: BASE_YAW, velocity: 0, dragging: false, lastX: 0 });

  useEffect(() => {
    const layout = window.matchMedia("(max-width: 640px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setCompact(layout.matches);
    setFrozen(motion.matches);

    const onLayout = (e) => setCompact(e.matches);
    const onMotion = (e) => setFrozen(e.matches);
    layout.addEventListener("change", onLayout);
    motion.addEventListener("change", onMotion);
    return () => {
      layout.removeEventListener("change", onLayout);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  const start = (e) => {
    spin.current.dragging = true;
    spin.current.lastX = e.clientX;
    spin.current.velocity = 0;
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const move = (e) => {
    if (!spin.current.dragging) return;
    const delta = (e.clientX - spin.current.lastX) * DRAG_SENSITIVITY;
    spin.current.lastX = e.clientX;
    spin.current.yaw += delta;
    spin.current.velocity = delta;
  };

  const end = (e) => {
    if (!spin.current.dragging) return;
    spin.current.dragging = false;
    setDragging(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.9, 11], fov: 26 }}
      gl={{ preserveDrawingBuffer: true }}
      // touch-pan-y keeps vertical scrolling with the page while horizontal
      // drags turn the arm.
      className={`arm-canvas ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
    >
      <Suspense fallback={<CanvasLoader />}>
        <hemisphereLight intensity={0.5} groundColor="#050816" />
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 8, 6]} intensity={1.6} castShadow shadow-mapSize={1024} />
        <pointLight position={[-4, 2, 3]} intensity={18} color={ACCENT} distance={14} />
        <pointLight position={[3, 1, 4]} intensity={10} color={CARGO} distance={12} />
        <Scene compact={compact} frozen={frozen} spin={spin} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default RobotArmCanvas;

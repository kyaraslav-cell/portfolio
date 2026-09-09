import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, Preload, useTexture } from "@react-three/drei";

const Ball = ({ icon }) => {
  const [decal] = useTexture([icon]);

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[1, 1, 2]} intensity={1.6} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#fff8eb" polygonOffset polygonOffsetUnits={5} flatShading />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} map={decal} flatShading />
      </mesh>
    </>
  );
};

// No loader fallback: these are small and there are many of them, so a spinner
// per ball reads as breakage rather than progress. The ball simply appears.
const BallCanvas = ({ icon }) => (
  <Canvas frameloop="always" dpr={[1, 1.5]} gl={{ preserveDrawingBuffer: true }}>
    <Suspense fallback={null}>
      <Float speed={1.6} rotationIntensity={1.4} floatIntensity={1.6}>
        <Ball icon={icon} />
      </Float>
    </Suspense>
    <Preload all />
  </Canvas>
);

export default BallCanvas;

import React, {Suspense} from 'react';
import {Canvas} from "@react-three/fiber"
import {
  Decal,Float, OrbitControls, Preload, useTexture
} from "@react-three/drei"
import CanvasLoader from "../Loader";




const Ball = ({icon}) => {
  const [decal] = useTexture([icon]);
  return (
    <>
      <ambientLight intensity={0.25}/>
      <directionalLight position={[0,0,0.05]} />
      {/* <spotLight position={[-5,5,2]} angle={3} penumbra={1} intensity={400} castShadow shadow-mapSize={1024}/> */}
      <mesh castShadow receiveShadow scale={3}>
        <icosahedronGeometry args={[1,2]}/>
        <meshStandardMaterial 
        color='#fff8eb'
        polygonOffset
        flatShading
        polygonOffsetUnits={5}
        
        />
        <Decal
          position={[0,0,1]}
          rotation={[2* Math.PI,0,6.25]}
          map={decal}
          flatShading
        />
      </mesh>
    </>
  )
}

const BallCanvas = ({icon})=>{
  return(
    <Canvas
    frameloop='always'
    gl={{preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false}/>
        <Float  rotationIntensity={1.2} floatIntensity={1.7} speed={4}>
          <Ball icon={icon}/>
        </Float>
      </Suspense>
      <Preload all/>
    </Canvas>
  )
}
export default BallCanvas

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Animated gradient sphere component
const AnimatedSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<{ time: number } | null>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#20E3B2"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.1}
        metalness={0.1}
        transparent
        opacity={0.1}
      />
    </Sphere>
  );
};

// Particle system component
const Particles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    if (particlesRef.current) {
      const positions = new Float32Array(1000 * 3);
      const colors = new Float32Array(1000 * 3);
      
      for (let i = 0; i < 1000; i++) {
        // Position
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        
        // Color (teal gradient)
        const color = new THREE.Color();
        color.setHSL(0.5 + Math.random() * 0.1, 0.7, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }
      
      particlesRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={particlesRef} />
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Camera controller component
const CameraController: React.FC = () => {
  const { camera, mouse } = useThree();
  
  useFrame(() => {
    // Subtle camera movement based on mouse position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.5, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.5, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Fallback background component
const FallbackBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bokeh-bg opacity-40" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-gold opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

// Main background canvas component
const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasError, setHasError] = React.useState(false);

  // Error boundary for Three.js
  if (hasError) {
    return <FallbackBackground />;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        onError={() => setHasError(true)}
      >
        <Suspense fallback={<FallbackBackground />}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#20E3B2" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4FD1C7" />
          
          {/* Animated sphere */}
          <AnimatedSphere />
          
          {/* Particle system */}
          <Particles />
          
          {/* Camera controller */}
          <CameraController />
        </Suspense>
      </Canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
    </div>
  );
};

export default BackgroundCanvas;

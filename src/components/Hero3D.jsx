import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Custom component for the 3D card that tilts on mouse move
function LogoCard() {
  const cardRef = useRef();
  
  // Load the logo texture
  // she_can_logo.jpeg is in public folder
  const texture = useTexture('/she_can_logo.jpeg');

  useFrame((state) => {
    if (cardRef.current) {
      // Interpolate rotation to face mouse pointer slightly
      const targetX = -state.pointer.y * 0.25;
      const targetY = state.pointer.x * 0.25;
      
      cardRef.current.rotation.x += (targetX - cardRef.current.rotation.x) * 0.1;
      cardRef.current.rotation.y += (targetY - cardRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <group ref={cardRef}>
      {/* Outer Glow / Glass Frame */}
      <RoundedBox args={[3.2, 3.2, 0.15]} radius={0.12} smoothness={4} castShadow receiveShadow>
        <meshPhysicalMaterial
          roughness={0.15}
          metalness={0.1}
          transmission={0.6}
          thickness={0.8}
          envMapIntensity={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          color="#0d111d"
          transparent
          opacity={0.8}
        />
      </RoundedBox>

      {/* Inner Orange Border */}
      <mesh position={[0, 0, 0.081]}>
        <planeGeometry args={[2.95, 2.95]} />
        <meshBasicMaterial color="#ff5e13" wireframe />
      </mesh>

      {/* Logo Plane */}
      <mesh position={[0, 0, 0.085]}>
        <planeGeometry args={[2.9, 2.9]} />
        <meshBasicMaterial 
          map={texture} 
          toneMapped={false}
        />
      </mesh>

      {/* Back Plate Logo (same but on the back so it works when rotated) */}
      <mesh position={[0, 0, -0.085]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.9, 2.9]} />
        <meshBasicMaterial 
          map={texture} 
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// Particle System that orbits and reacts to mouse distance
function SwirlingParticles({ count = 800, color = "#ff5e13", clockwise = true }) {
  const pointsRef = useRef();

  // Generate initial particle coordinates and speed characteristics
  const [positions, initialData] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const data = [];
    
    for (let i = 0; i < count; i++) {
      // Radius distribution: ring-like
      const r = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      // Spread vertically along the y-axis
      const y = (Math.random() - 0.5) * 4.0;
      
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      data.push({
        r,
        theta,
        y,
        speed: (0.15 + Math.random() * 0.3) * (clockwise ? 1 : -1),
        yNoise: Math.random() * 100,
        yFrequency: 0.1 + Math.random() * 0.4
      });
    }
    
    return [pos, data];
  }, [count, clockwise]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    
    // Normalized mouse position projected into scene space roughly
    const mouseX = state.pointer.x * 3.5;
    const mouseY = state.pointer.y * 3.5;

    for (let i = 0; i < count; i++) {
      const data = initialData[i];
      
      // Update orbit angle
      data.theta += 0.005 * data.speed;
      
      // Vertical wave motion
      const wave = Math.sin(time * data.yFrequency + data.yNoise) * 0.15;
      
      let x = data.r * Math.cos(data.theta);
      let y = data.y + wave;
      let z = data.r * Math.sin(data.theta);
      
      // Cursor interaction (repulsion)
      const dx = x - mouseX;
      const dy = y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 1.6) {
        const force = (1.6 - dist) * 0.25;
        x += (dx / dist) * force;
        y += (dy / dist) * force;
      }
      
      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
  });

  // Create a canvas texture for round particles instead of squares
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    return new THREE.CanvasTexture(canvas);
  }, [color]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        map={particleTexture}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        opacity={0.8}
      />
    </points>
  );
}

export default function Hero3D() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const timer = setTimeout(() => setIsLoaded(true), 250);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'var(--primary)',
          fontSize: '1rem',
          fontWeight: 600,
          fontFamily: 'var(--font-heading)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            border: '2px solid var(--primary)',
            borderTopColor: 'transparent',
            animation: 'spin 1s linear infinite'
          }} />
          Loading 3D Canvas...
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, isMobile ? 7.2 : 5.5], fov: 45 }}
        style={{ pointerEvents: 'auto' }}
        onCreated={() => setIsLoaded(true)}
      >
        <ambientLight intensity={0.5} />
        
        {/* Colorful lighting to highlight physical properties */}
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-6, -6, -3]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[6, 6, -3]} intensity={1.5} color="#ff5e13" />
        <pointLight position={[0, -2, 4]} intensity={0.8} color="#f43f5e" />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
          <LogoCard />
        </Float>

        {/* Counter-rotating particle systems (optimized count for mobile) */}
        <SwirlingParticles count={isMobile ? 350 : 700} color="#ff5e13" clockwise={true} />
        <SwirlingParticles count={isMobile ? 250 : 500} color="#8b5cf6" clockwise={false} />

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.6} 
        />
      </Canvas>
    </div>
  );
}

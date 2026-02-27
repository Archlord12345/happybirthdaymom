import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Center, PerspectiveCamera, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Balloon = ({ position, color }) => {
    const mesh = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        mesh.current.position.y += Math.sin(time + position[0]) * 0.002;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <group position={position}>
                <mesh ref={mesh}>
                    <sphereGeometry args={[0.4, 32, 32]} />
                    <meshStandardMaterial color={color} roughness={0.25} metalness={0.6} emissive={color} emissiveIntensity={0.08} />
                </mesh>
                <mesh position={[0, -0.4, 0]}>
                    <coneGeometry args={[0.05, 0.1, 16]} />
                    <meshStandardMaterial color={color} />
                </mesh>
                {/* String */}
                <mesh position={[0, -0.7, 0]}>
                    <cylinderGeometry args={[0.005, 0.005, 0.6]} />
                    <meshStandardMaterial color="#ccc" />
                </mesh>
            </group>
        </Float>
    );
};

const Heart = ({ position, color, scale = 1 }) => {
    const heartShape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
        shape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
        shape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
        shape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);
        return shape;
    }, []);

    const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };

    return (
        <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
            <mesh position={position} rotation={[Math.PI, 0, 0]} scale={scale}>
                <extrudeGeometry args={[heartShape, extrudeSettings]} />
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.5} emissive={color} emissiveIntensity={0.15} />
            </mesh>
        </Float>
    );
};

const GiftBox = ({ position, color = "#2980b9", ribbonColor = "#1a5276", scale = 1 }) => {
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <group position={position} scale={scale}>
                {/* Box body */}
                <mesh>
                    <boxGeometry args={[0.7, 0.5, 0.7]} />
                    <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
                </mesh>
                {/* Lid */}
                <mesh position={[0, 0.33, 0]}>
                    <boxGeometry args={[0.78, 0.12, 0.78]} />
                    <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
                </mesh>
                {/* Ribbon horizontal */}
                <mesh position={[0, 0.01, 0]}>
                    <boxGeometry args={[0.72, 0.52, 0.1]} />
                    <meshStandardMaterial color={ribbonColor} roughness={0.2} metalness={0.6} />
                </mesh>
                {/* Ribbon vertical */}
                <mesh position={[0, 0.01, 0]}>
                    <boxGeometry args={[0.1, 0.52, 0.72]} />
                    <meshStandardMaterial color={ribbonColor} roughness={0.2} metalness={0.6} />
                </mesh>
                {/* Bow */}
                <mesh position={[0, 0.5, 0]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial color={ribbonColor} roughness={0.2} metalness={0.6} />
                </mesh>
            </group>
        </Float>
    );
};

const HuggingVisual = ({ position = [3, -1, 0] }) => {
    return (
        <group position={position}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Mom */}
                <group position={[-0.3, 0, 0]}>
                    <mesh position={[0, 1, 0]}>
                        <sphereGeometry args={[0.3, 32, 32]} />
                        <meshStandardMaterial color="#fce4ec" />
                    </mesh>
                    <mesh position={[0, 0, 0]}>
                        <capsuleGeometry args={[0.3, 1, 4, 16]} />
                        <meshStandardMaterial color="#2980b9" />
                    </mesh>
                </group>
                {/* Child */}
                <group position={[0.2, -0.2, 0.1]} rotation={[0, 0, 0.2]}>
                    <mesh position={[0, 0.7, 0]}>
                        <sphereGeometry args={[0.2, 32, 32]} />
                        <meshStandardMaterial color="#fce4ec" />
                    </mesh>
                    <mesh position={[0, 0, 0]}>
                        <capsuleGeometry args={[0.2, 0.6, 4, 16]} />
                        <meshStandardMaterial color="#1a5276" />
                    </mesh>
                </group>
            </Float>
        </group>
    );
};

const SparkleParticle = ({ position, color = "#FFD700" }) => {
    const mesh = useRef();
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        mesh.current.scale.setScalar(0.5 + Math.sin(time * 3 + position[0] * 10) * 0.3);
    });
    return (
        <mesh ref={mesh} position={position}>
            <octahedronGeometry args={[0.06, 0]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
        </mesh>
    );
};

export default function BirthdayScene() {
    return (
        <div className="scene-container">
            <Canvas shadows gl={{ shadowMapType: THREE.VSMShadowMap }}>
                <PerspectiveCamera makeDefault position={[0, 1, 12]} fov={50} />
                <ambientLight intensity={1.0} />
                <pointLight position={[10, 10, 10]} intensity={1.2} castShadow color="#ffffff" />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} color="#e8f4f8" />
                <pointLight position={[0, -5, 5]} intensity={0.4} color="#2980b9" />

                <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={0.8} />

                {/* Blue, Navy, White balloons — matching the reference */}
                <Balloon position={[-6, 2, -3]} color="#2980b9" />
                <Balloon position={[6, 1, -2]} color="#1a5276" />
                <Balloon position={[-5, 4, -1]} color="#dce6ec" />
                <Balloon position={[5, 0, 0]} color="#2980b9" />
                <Balloon position={[-3, 3, -4]} color="#1a5276" />
                <Balloon position={[4, 3, -3]} color="#dce6ec" />
                <Balloon position={[0, 5, -5]} color="#2980b9" />
                <Balloon position={[-7, -1, -2]} color="#1a5276" />
                <Balloon position={[7, 2, -4]} color="#dce6ec" />
                <Balloon position={[-2, 4, -3]} color="#2980b9" />

                {/* Hearts in blue/gold */}
                <Heart position={[-4, -3, 1]} color="#2980b9" scale={0.4} />
                <Heart position={[4, -2.8, 2]} color="#1a5276" scale={0.35} />
                <Heart position={[0, -4, -1]} color="#FFD700" scale={0.25} />
                <Heart position={[6, 3, -3]} color="#2980b9" scale={0.3} />

                {/* Gift Boxes — like the reference image */}
                <GiftBox position={[3, -3, 1]} color="#2980b9" ribbonColor="#1a5276" scale={0.8} />
                <GiftBox position={[4.5, -3.2, 0.5]} color="#dce6ec" ribbonColor="#1a5276" scale={0.65} />
                <GiftBox position={[2, -3.5, 2]} color="#1a5276" ribbonColor="#d4af37" scale={0.7} />

                {/* Gold sparkles / confetti */}
                <SparkleParticle position={[-3, 2, 1]} color="#FFD700" />
                <SparkleParticle position={[3, 1, 2]} color="#FFD700" />
                <SparkleParticle position={[1, 3, -1]} color="#FFD700" />
                <SparkleParticle position={[-2, -1, 3]} color="#FFD700" />
                <SparkleParticle position={[5, 2, -1]} color="#FFD700" />
                <SparkleParticle position={[-5, 3, 0]} color="#FFD700" />
                <SparkleParticle position={[2, 4, -2]} color="#FFD700" />
                <SparkleParticle position={[-1, -2, 2]} color="#FFD700" />

                {/* Hugging Visual */}
                <HuggingVisual position={[-4, -1, 0]} />

                <Environment preset="sunset" />
            </Canvas>
        </div>
    );
}

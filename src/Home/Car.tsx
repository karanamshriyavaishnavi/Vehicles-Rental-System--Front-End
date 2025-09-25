import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three'; // Import the 'THREE' module

const Car = () => {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />

            <mesh>
                <planeGeometry args={[5, 3]} />
                <meshStandardMaterial map={new THREE.TextureLoader().load('/cars.png')} />
            </mesh>
        </Canvas>
    );
};

export default Car;

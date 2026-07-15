"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Edges } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Standard Rubik's Cube colors
const colors = ["#ff5900", "#ffffff", "#ffd500", "#b71234", "#009b48", "#0046ad"];

// Move definition
type Move = { axis: "x" | "y" | "z"; slice: number; angle: number; duration: number };

function Cubelet({ id, pos }: { id: string; pos: [number, number, number] }) {
  return (
    <mesh name={id} position={pos}>
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      {colors.map((color, idx) => (
        <meshStandardMaterial
          key={idx}
          attach={`material-${idx}`}
          color={color}
          roughness={0.2}
          metalness={0.5}
        />
      ))}
      <Edges scale={1} threshold={15} color="#000" />
    </mesh>
  );
}

function RubiksCubeLogic({ moveQueue, isAnimating, setIsAnimating, isExpanded, setIsExpanded }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const pivotRef = useRef<THREE.Group>(null);
  
  const currentMove = useRef<Move | null>(null);
  const animProgress = useRef(0);

  // Initialize cubelets once
  useEffect(() => {
    if (!groupRef.current || groupRef.current.children.length > 0) return;
    
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.95, 0.95, 0.95),
            colors.map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.2, metalness: 0.5 }))
          );
          mesh.position.set(x, y, z);
          mesh.name = `cubelet-${x}-${y}-${z}`;
          
          const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(mesh.geometry),
            new THREE.LineBasicMaterial({ color: 0x000000 })
          );
          mesh.add(edges);
          groupRef.current.add(mesh);
        }
      }
    }
  }, []);

  useFrame((state, delta) => {
    // If not animating a move, check queue
    if (!currentMove.current && moveQueue.length > 0) {
      const move = moveQueue.shift();
      currentMove.current = move;
      animProgress.current = 0;
      setIsAnimating(true);
      
      // Attach target cubelets to pivot
      const sliceMeshes: THREE.Object3D[] = [];
      groupRef.current?.children.forEach((mesh) => {
        // Find meshes near the slice plane
        const pos = new THREE.Vector3();
        mesh.getWorldPosition(pos);
        const sliceVal = move.axis === "x" ? pos.x : move.axis === "y" ? pos.y : pos.z;
        if (Math.abs(sliceVal - move.slice) < 0.1) {
          sliceMeshes.push(mesh);
        }
      });
      
      sliceMeshes.forEach((m) => pivotRef.current?.attach(m));
    }

    // Animate current move
    if (currentMove.current && pivotRef.current && groupRef.current) {
      const move = currentMove.current;
      const speed = move.duration > 0 ? (1 / move.duration) : 5; // moves per second
      
      animProgress.current += delta * speed;
      
      if (animProgress.current >= 1) {
        // Finish move
        if (move.axis === "x") pivotRef.current.rotation.x = move.angle;
        else if (move.axis === "y") pivotRef.current.rotation.y = move.angle;
        else pivotRef.current.rotation.z = move.angle;
        
        pivotRef.current.updateMatrixWorld();
        
        // Detach back to group
        const children = [...pivotRef.current.children];
        children.forEach((m) => {
          groupRef.current?.attach(m);
          // Snap positions to exact integers to prevent floating point drift
          m.position.x = Math.round(m.position.x);
          m.position.y = Math.round(m.position.y);
          m.position.z = Math.round(m.position.z);
          // Snap rotations to exact 90-degree multiples
          m.rotation.x = Math.round(m.rotation.x / (Math.PI / 2)) * (Math.PI / 2);
          m.rotation.y = Math.round(m.rotation.y / (Math.PI / 2)) * (Math.PI / 2);
          m.rotation.z = Math.round(m.rotation.z / (Math.PI / 2)) * (Math.PI / 2);
        });
        
        // Reset pivot
        pivotRef.current.rotation.set(0, 0, 0);
        currentMove.current = null;
        
        if (moveQueue.length === 0) setIsAnimating(false);
      } else {
        // Interpolate
        const currentAngle = move.angle * animProgress.current;
        if (move.axis === "x") pivotRef.current.rotation.x = currentAngle;
        else if (move.axis === "y") pivotRef.current.rotation.y = currentAngle;
        else pivotRef.current.rotation.z = currentAngle;
      }
    } else if (!isAnimating && groupRef.current) {
      // Gentle idle rotation
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group 
      onPointerDown={(e) => {
        e.stopPropagation();
        if (!isAnimating) setIsExpanded(true);
      }}
      // Cursor pointer on hover over cube
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
    >
      <group ref={groupRef} />
      <group ref={pivotRef} />
    </group>
  );
}

export function RubiksCube() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [moveQueue, setMoveQueue] = useState<Move[]>([]);
  const [history, setHistory] = useState<Move[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const axes: ("x" | "y" | "z")[] = ["x", "y", "z"];
  const slices = [-1, 0, 1];
  const angles = [Math.PI / 2, -Math.PI / 2];

  const handleScramble = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating) return;
    
    const moves: Move[] = [];
    const newHistory: Move[] = [];
    
    for (let i = 0; i < 20; i++) {
      const axis = axes[Math.floor(Math.random() * axes.length)];
      const slice = slices[Math.floor(Math.random() * slices.length)];
      const angle = angles[Math.floor(Math.random() * angles.length)];
      
      moves.push({ axis, slice, angle, duration: 0.15 }); // Fast scramble
      newHistory.push({ axis, slice, angle: -angle, duration: 1.0 }); // Slow solve (inverse)
    }
    
    setMoveQueue(moves);
    setHistory((prev) => [...newHistory.reverse(), ...prev]);
  };

  const handleSolve = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating || history.length === 0) return;
    
    setMoveQueue(history);
    setHistory([]);
  };

  return (
    <>
      {/* Background blur when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-xl"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        className={`relative ${
          isExpanded 
            ? "fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12" 
            : "w-full h-[300px] lg:h-[400px] cursor-grab active:cursor-grabbing group"
        }`}
      >
        <Canvas camera={{ position: [6.5, 6.5, 6.5], fov: 45 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <RubiksCubeLogic 
            moveQueue={moveQueue} 
            isAnimating={isAnimating} 
            setIsAnimating={setIsAnimating}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
          <OrbitControls enableZoom={isExpanded} enablePan={false} autoRotate={!isExpanded} />
        </Canvas>

        {/* UI Overlay */}
        {!isExpanded && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/20 backdrop-blur-sm rounded-2xl">
            <span className="px-4 py-2 bg-orange-500/20 text-orange-400 font-semibold rounded-full border border-orange-500/50 backdrop-blur-md">
              Click to Interact
            </span>
          </div>
        )}

        {isExpanded && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="absolute top-4 right-4 p-3 rounded-full bg-background/50 hover:bg-background border border-border transition-colors backdrop-blur-md"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <button
                onClick={handleScramble}
                disabled={isAnimating}
                className="px-6 py-3 rounded-full bg-orange-500 text-white font-bold tracking-wide hover:bg-orange-600 disabled:opacity-50 transition-all shadow-lg shadow-orange-500/20"
              >
                Scramble
              </button>
              <button
                onClick={handleSolve}
                disabled={isAnimating || history.length === 0}
                className="px-6 py-3 rounded-full bg-emerald-500 text-white font-bold tracking-wide hover:bg-emerald-600 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20"
              >
                Solve
              </button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

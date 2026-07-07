import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PULSE = new THREE.Color("#8b9dff");
const DEEP = new THREE.Color("#5b6cff");

/** Fibonacci-sphere node positions with slight radial jitter. */
function useClusterGeometry(count = 42, radius = 2.15) {
  return useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const jitter = radius * (0.92 + Math.random() * 0.22);
      nodes.push(
        new THREE.Vector3(Math.cos(theta) * r * jitter, y * jitter, Math.sin(theta) * r * jitter),
      );
    }

    const positions = new Float32Array(count * 3);
    nodes.forEach((n, i) => n.toArray(positions, i * 3));

    // connect each node to its 2 nearest neighbours
    const linePos: number[] = [];
    nodes.forEach((n, i) => {
      const dists = nodes
        .map((m, j) => ({ j, d: i === j ? Infinity : n.distanceToSquared(m) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      dists.forEach(({ j }) => {
        linePos.push(n.x, n.y, n.z, nodes[j].x, nodes[j].y, nodes[j].z);
      });
    });

    return { positions, linePositions: new Float32Array(linePos) };
  }, [count, radius]);
}

function Cluster({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const drift = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const { positions, linePositions } = useClusterGeometry();

  useFrame((state, delta) => {
    const g = group.current;
    const d = drift.current;
    if (!g || !d) return;
    const t = state.clock.elapsedTime;
    g.rotation.y += delta * 0.06;
    // ease toward pointer for parallax
    const targetX = pointer.current.y * 0.22;
    const targetY = pointer.current.x * 0.35;
    g.rotation.x += (targetX - g.rotation.x) * 0.04;
    g.rotation.z += (targetY * 0.12 - g.rotation.z) * 0.02;
    d.position.y = Math.sin(t * 0.4) * 0.08;
    if (core.current) {
      core.current.rotation.x -= delta * 0.1;
      core.current.rotation.y -= delta * 0.14;
    }
  });

  return (
    <group ref={drift} position={[2.1, 0.1, 0]} scale={0.82}>
      <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color={DEEP} wireframe transparent opacity={0.28} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={PULSE}
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={PULSE}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      </group>
    </group>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 260;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi) - 2;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={PULSE}
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ClusterScene() {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onPointerMove={(e) => {
        pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      }}
      style={{ touchAction: "pan-y" }}
    >
      <Cluster pointer={pointer} />
      <Dust />
    </Canvas>
  );
}

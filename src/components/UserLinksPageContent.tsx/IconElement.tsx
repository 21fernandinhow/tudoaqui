import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

interface IconElementProps {
  iconUrl: string;
  position: [number, number, number];
  onClick: () => any;
  label?: string;
  activateFloating?: boolean;
}

export const IconElement = ({ iconUrl, position, onClick, label, activateFloating = false }: IconElementProps) => {
  
  const texture = useTexture(iconUrl);
  const meshRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<THREE.Mesh>(null);

  const rootStyle = getComputedStyle(document.documentElement);
  const iconBackgroundColor = rootStyle.getPropertyValue("--user-icons-background-color").trim();
  const fontColor = rootStyle.getPropertyValue("--user-contrast-color").trim();

  const { floatOffset, swingOffset, floatIntensity, swingIntensity } = useMemo(() => {
    return {
      floatOffset: Math.random() * Math.PI * 2,
      swingOffset: Math.random() * Math.PI * 2,
      floatIntensity: 0.05 + Math.random() * 0.07,
      swingIntensity: 0.02 + Math.random() * 0.05,
    };
  }, []);

  useFrame(({ clock }) => {
    if (!activateFloating) return;

    const t = clock.getElapsedTime();
    const floatY = Math.sin(t * 2 + floatOffset) * floatIntensity;
    const swingZ = Math.sin(t * 1.5 + swingOffset) * swingIntensity;

    if (meshRef.current) {
      meshRef.current.position.y = position[1] + floatY;
      meshRef.current.rotation.z = swingZ;
    }

    if (boxRef.current) {
      boxRef.current.position.y = position[1] + floatY;
      boxRef.current.rotation.z = swingZ;
    }

    if (labelRef.current) {
      labelRef.current.position.y = position[1] - 2 + floatY;
    }
  });

  return (
    <>

      {texture && (
        <mesh ref={meshRef} position={position}>
          <planeGeometry args={[2, 2]} />
          <meshStandardMaterial map={texture} transparent />
        </mesh>
      )}

      <RoundedBox
        ref={boxRef}
        args={[3, 3, 0.8]}
        smoothness={100}
        radius={0.4}
        position={[position[0], position[1], position[2] - 0.45]}
        onClick={onClick}
        onPointerEnter={() => (document.body.style.cursor = "pointer")}
        onPointerLeave={() => (document.body.style.cursor = "auto")}
      >
        <meshStandardMaterial color={iconBackgroundColor} roughness={0.5} metalness={0.2} transparent />
      </RoundedBox>

      {label && (
        <Text
          ref={labelRef}
          position={[position[0], position[1] - 2, position[2]]}
          fontSize={0.6}
          color={fontColor}
          anchorX="center"
          anchorY="middle"
          onClick={onClick}
          onPointerEnter={() => (document.body.style.cursor = "pointer")}
          onPointerLeave={() => (document.body.style.cursor = "auto")}
          fontWeight={"bold"}
        >
          {label}
        </Text>
      )}

    </>
  );
};
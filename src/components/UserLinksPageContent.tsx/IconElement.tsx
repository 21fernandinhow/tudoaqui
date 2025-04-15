import { useTexture, RoundedBox, Text } from "@react-three/drei";

interface IconElementProps {
  iconUrl: string;
  position: [number, number, number];
  onClick: () => any;
  label?: string;
}

export const IconElement = ({ iconUrl, position, onClick, label }: IconElementProps) => {

  const texture = useTexture(iconUrl);
  const rootStyle = getComputedStyle(document.documentElement);
  const iconBackgroundColor = rootStyle.getPropertyValue("--user-icons-background-color").trim();
  const fontColor = rootStyle.getPropertyValue("--user-contrast-color").trim();

  return (
    <>

      {texture && (
        <mesh position={position} >
          <planeGeometry args={[2, 2]} />
          <meshStandardMaterial map={texture} transparent />
        </mesh>
      )}

      <RoundedBox
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
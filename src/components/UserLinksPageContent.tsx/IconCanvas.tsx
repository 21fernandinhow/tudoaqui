import { Canvas } from "@react-three/fiber"
import { IconElement } from "./IconElement"
import { OrbitControls } from "@react-three/drei"

export interface IconCanvasProps {
    iconUrl: string
    onClick: () => any
    label: string
}

export const IconCanvas = ({ iconUrl, onClick, label }: IconCanvasProps) => {
    return (
        <div className="icons-grid-item">
            <Canvas shadows>
                <directionalLight position={[0, 0.5, 2]} intensity={2.5} castShadow />
                <OrbitControls />
                <IconElement
                    iconUrl={iconUrl}
                    position={[0, 0.5, 1.5]}
                    onClick={onClick}
                    label={label}
                />
            </Canvas>
        </div>
    )
}
import { useEffect, useRef, useState } from "react";
import { MdMusicNote, MdPause } from "react-icons/md";

interface MusicPlayerButtonProps {
    musicFileUrl: string;
}

export const MusicPlayerButton = ({ musicFileUrl }: MusicPlayerButtonProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        audioRef.current = new Audio(musicFileUrl);
        audioRef.current.loop = true;

        const handleEnded = () => setIsPlaying(false);
        audioRef.current.addEventListener("ended", handleEnded);

        return () => {
            audioRef.current?.pause();
            audioRef.current?.removeEventListener("ended", handleEnded);
            audioRef.current = null;
        };
    }, [musicFileUrl]);

    const handleToggle = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="music-player-btn" onClick={handleToggle}>
            {isPlaying ? <MdPause /> : <MdMusicNote />}
        </div>
    );
};

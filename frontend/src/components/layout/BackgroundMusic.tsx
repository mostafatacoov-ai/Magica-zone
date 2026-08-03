"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface BackgroundMusicProps {
    lang?: string;
}

export default function BackgroundMusic({ lang = "ar" }: BackgroundMusicProps) {
    const isArabic = lang === "ar";
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(0.35);
    const [userManuallyToggled, setUserManuallyToggled] = useState<boolean>(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = volume;

        // Try autoplaying on component mount
        const attemptPlay = () => {
            if (audio.paused && !userManuallyToggled) {
                audio.play().then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    // Browser policy prevented automatic playback without prior user gesture
                    setIsPlaying(false);
                });
            }
        };

        attemptPlay();

        // If browser blocks initial autoplay, start on very first click/tap anywhere on screen
        const handleFirstInteraction = () => {
            if (audioRef.current && audioRef.current.paused && !userManuallyToggled) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(() => {});
            }
            document.removeEventListener("click", handleFirstInteraction);
            document.removeEventListener("keydown", handleFirstInteraction);
            document.removeEventListener("touchstart", handleFirstInteraction);
        };

        document.addEventListener("click", handleFirstInteraction, { once: true });
        document.addEventListener("keydown", handleFirstInteraction, { once: true });
        document.addEventListener("touchstart", handleFirstInteraction, { once: true });

        return () => {
            document.removeEventListener("click", handleFirstInteraction);
            document.removeEventListener("keydown", handleFirstInteraction);
            document.removeEventListener("touchstart", handleFirstInteraction);
        };
    }, [userManuallyToggled]);

    const handleToggleMusic = (e: React.MouseEvent) => {
        e.stopPropagation();
        setUserManuallyToggled(true);
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying || !audio.paused) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().then(() => {
                setIsPlaying(true);
            }).catch(err => console.error("Error playing audio:", err));
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const newVol = parseFloat(e.target.value);
        setVolume(newVol);
        if (audioRef.current) {
            audioRef.current.volume = newVol;
            if (newVol > 0 && !isPlaying && audioRef.current.paused) {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-[99] select-none flex items-center">
            {/* Audio element with fallback sources. Add a file named bg-music.mp3 inside frontend/public/ to override default music */}
            <audio ref={audioRef} loop preload="auto">
                <source src="/bg-music.mp3" type="audio/mpeg" />
                <source src="https://ia801602.us.archive.org/11/items/HappyBee_431/Happy%20Bee.mp3" type="audio/mpeg" />
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
            </audio>

            <div className="flex items-center gap-2 px-4 py-3 bg-gray-950/90 hover:bg-gray-900 text-white rounded-full shadow-2xl backdrop-blur-md border border-rose-500/40 hover:border-rose-500 transition-all duration-300 group">
                <button
                    onClick={handleToggleMusic}
                    title={isArabic ? (isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى التصويرية") : (isPlaying ? "Mute Background Music" : "Play Background Music")}
                    className="flex items-center justify-center text-rose-400 hover:text-white transition-colors focus:outline-none shrink-0"
                >
                    {isPlaying ? (
                        <div className="relative flex items-center justify-center w-6 h-6">
                            <Volume2 className="w-5 h-5 text-rose-500 animate-pulse" />
                            <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                            </span>
                        </div>
                    ) : (
                        <VolumeX className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                    )}
                </button>

                {/* Animated sound bars when playing */}
                {isPlaying ? (
                    <div className="flex items-end gap-0.5 h-4 px-1">
                        <span className="w-1 bg-rose-500 rounded-sm animate-[bounce_0.8s_infinite] h-2"></span>
                        <span className="w-1 bg-pink-500 rounded-sm animate-[bounce_0.6s_infinite_0.2s] h-4"></span>
                        <span className="w-1 bg-rose-400 rounded-sm animate-[bounce_0.7s_infinite_0.4s] h-3"></span>
                        <span className="w-1 bg-amber-400 rounded-sm animate-[bounce_0.9s_infinite_0.1s] h-3.5"></span>
                    </div>
                ) : (
                    <span className="text-[11px] font-black text-gray-400 px-1 flex items-center gap-1">
                        <Music className="w-3.5 h-3.5 text-gray-500" />
                        <span>{isArabic ? "الموسيقى" : "Music"}</span>
                    </span>
                )}

                {/* Volume slider control on hover/click */}
                <div className="w-0 overflow-hidden group-hover:w-20 sm:group-hover:w-24 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center ml-1">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                        title={isArabic ? "مستوى الصوت" : "Volume control"}
                    />
                </div>
            </div>
        </div>
    );
}

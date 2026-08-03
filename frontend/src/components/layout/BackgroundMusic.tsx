"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, SkipForward, SkipBack } from "lucide-react";

interface BackgroundMusicProps {
    lang?: string;
}

const PLAYLIST = [
    { src: "/Magica,%20Ready%20for%20the%20Week.mp3", title: "Ready for the Week", titleAr: "مستعدون للمستقبل" },
    { src: "/Magica!%20Making%20Futures%20Bright.mp3", title: "Making Futures Bright", titleAr: "صناع المستقبل المشرق" },
    { src: "/Magica.mp3", title: "Magica Theme Song", titleAr: "النشيد الرسمي لماجيكا" },
    { src: "/Magica%20Dreams%20(1).mp3", title: "Magica Dreams", titleAr: "أحلام ماجيكا" },
    { src: "/Blueprint_for_Magica.mp3", title: "Blueprint for Magica", titleAr: "مخطط وبصمة ماجيكا" },
    { src: "/Level%20Up%20Your%20World%20(1).mp3", title: "Level Up Your World", titleAr: "طور عالمك" },
    { src: "/Magica_Rising.mp3", title: "Magica Rising", titleAr: "نهضة وتفوق ماجيكا" },
    { src: "/Own_the_Court.mp3", title: "Own the Court", titleAr: "في الصدارة" },
    { src: "/Magica%20Magic.mp3", title: "Magica Magic", titleAr: "سحر وطاقة ماجيكا" },
];

export default function BackgroundMusic({ lang = "ar" }: BackgroundMusicProps) {
    const isArabic = lang === "ar";
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [mounted, setMounted] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(0.35);
    const [userManuallyToggled, setUserManuallyToggled] = useState<boolean>(false);
    const [currentTrack, setCurrentTrack] = useState<number>(0);

    // Ensure hydration safety: render only on client after mount to prevent React Error #423
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.35;

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
    }, [mounted, userManuallyToggled]);

    // Handle track switching cleanly when currentTrack changes
    useEffect(() => {
        if (!mounted || !audioRef.current) return;
        const audio = audioRef.current;
        audio.load();
        audio.volume = volume;

        if (isPlaying || userManuallyToggled) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(() => {});
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTrack]);

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

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setUserManuallyToggled(true);
        setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setUserManuallyToggled(true);
        setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
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

    // Return null during server-side rendering and initial React hydration to guarantee zero mismatch
    if (!mounted) return null;

    const currentSong = PLAYLIST[currentTrack] || PLAYLIST[0];

    return (
        <div className="fixed bottom-6 left-6 z-[99] select-none flex items-center">
            {/* Audio element playing Magica multi-song radio playlist */}
            <audio 
                ref={audioRef} 
                src={currentSong.src} 
                preload="auto" 
                onEnded={() => {
                    // Automatically progress to next track when song finishes
                    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
                }}
                onError={() => {
                    // If an audio file fails to load, gracefully advance to next track
                    if (isPlaying) {
                        setTimeout(() => {
                            setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
                        }, 1000);
                    }
                }}
            />

            <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gray-950/90 hover:bg-gray-900 text-white rounded-full shadow-2xl backdrop-blur-md border border-rose-500/40 hover:border-rose-500 transition-all duration-300 group">
                {/* Previous Track Button */}
                <button
                    onClick={handlePrev}
                    title={isArabic ? "الأغنية السابقة" : "Previous Track"}
                    className="p-1.5 text-gray-400 hover:text-rose-400 transition-colors focus:outline-none shrink-0 rounded-full hover:bg-white/5"
                >
                    <SkipBack className="w-4 h-4" />
                </button>

                {/* Play / Mute Button */}
                <button
                    onClick={handleToggleMusic}
                    title={isArabic ? (isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى") : (isPlaying ? "Mute Background Music" : "Play Background Music")}
                    className="p-1 text-rose-400 hover:text-white transition-colors focus:outline-none shrink-0"
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

                {/* Next Track Button */}
                <button
                    onClick={handleNext}
                    title={isArabic ? "الأغنية التالية" : "Next Track"}
                    className="p-1.5 text-gray-400 hover:text-rose-400 transition-colors focus:outline-none shrink-0 rounded-full hover:bg-white/5"
                >
                    <SkipForward className="w-4 h-4" />
                </button>

                {/* Track Title & Animated Sound Waves Ticker */}
                <div 
                    onClick={handleNext}
                    title={isArabic ? "اضغط للانتقال للأغنية التالية في قائمة راديو ماجيكا" : "Click to skip to next song in Magica Radio"}
                    className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors max-w-[150px] sm:max-w-[190px]"
                >
                    {isPlaying ? (
                        <div className="flex items-end gap-0.5 h-3 shrink-0">
                            <span className="w-0.5 bg-rose-500 rounded-sm animate-[bounce_0.8s_infinite] h-2"></span>
                            <span className="w-0.5 bg-pink-500 rounded-sm animate-[bounce_0.6s_infinite_0.2s] h-3"></span>
                            <span className="w-0.5 bg-rose-400 rounded-sm animate-[bounce_0.7s_infinite_0.4s] h-2.5"></span>
                            <span className="w-0.5 bg-amber-400 rounded-sm animate-[bounce_0.9s_infinite_0.1s] h-3"></span>
                        </div>
                    ) : (
                        <Music className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    )}
                    <div className="flex flex-col min-w-0 text-start">
                        <span className="text-[11px] font-extrabold text-gray-100 truncate leading-tight">
                            {isArabic ? currentSong.titleAr : currentSong.title}
                        </span>
                        <span className="text-[9px] font-bold text-rose-400/90 leading-tight">
                            {isArabic ? `راديو ماجيكا (${currentTrack + 1}/${PLAYLIST.length})` : `Magica Radio (${currentTrack + 1}/${PLAYLIST.length})`}
                        </span>
                    </div>
                </div>

                {/* Volume Slider Control on Hover */}
                <div className="w-0 overflow-hidden group-hover:w-16 sm:group-hover:w-20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center ml-0.5">
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

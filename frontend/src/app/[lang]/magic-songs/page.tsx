"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Music, Play, Pause, Download, Volume2, Sparkles, Headphones, ShieldCheck, CheckCircle2 } from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";

interface Song {
    id: string;
    titleEn: string;
    titleAr: string;
    src: string;
    downloadName: string;
    durationHint: string;
    categoryEn: string;
    categoryAr: string;
    descEn: string;
    descAr: string;
    badgeColor: string;
}

const SONGS: Song[] = [
    {
        id: "s1",
        titleEn: "Magica! Making Futures Bright",
        titleAr: "صنّاع المستقبل المشرق (Making Futures Bright)",
        src: "/Magica!%20Making%20Futures%20Bright.mp3",
        downloadName: "Magica - Making Futures Bright.mp3",
        durationHint: "2:15",
        categoryEn: "Official Anthem",
        categoryAr: "النشيد الرسمي",
        descEn: "An uplifting anthem celebrating leadership, vision, and the bright future of young Magica innovators.",
        descAr: "أنشودة حماسية تحتفي بروح القيادة، الرؤية الواعدة، والمستقبل المشرق لأبطال ومبتكري ماجيكا.",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
    },
    {
        id: "s2",
        titleEn: "Magica Theme Song",
        titleAr: "الموسيقى الرسمية لماجيكا (Magica Theme)",
        src: "/Magica.mp3",
        downloadName: "Magica Theme Song.mp3",
        durationHint: "2:20",
        categoryEn: "Core Theme",
        categoryAr: "السمة الأساسية",
        descEn: "The quintessential Magica musical score embodying innovation, financial literacy, and teamwork.",
        descAr: "الموسيقى التصويرية الخالدة لمعسكرات وأكاديمية ماجيكا، تجسّد روح التعاون، الابتكار والذكاء المالي.",
        badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
        id: "s3",
        titleEn: "Magica, Ready for the Week",
        titleAr: "مستعدون للمستقبل (Ready for the Week)",
        src: "/Magica,%20Ready%20for%20the%20Week.mp3",
        downloadName: "Magica - Ready for the Week.mp3",
        durationHint: "1:50",
        categoryEn: "Morning Motivation",
        categoryAr: "تحفيز وطاقة للصباح",
        descEn: "The ultimate positive kick-start track! Perfect for weekday school mornings and active study preparation.",
        descAr: "نغمة الطاقة الصباحية التفاؤلية المثالية לבداية أسبوع حرج ونشيط والاستعداد للمدرسة والمعسكرات.",
        badgeColor: "bg-rose-50 text-rose-700 border-rose-200"
    },
    {
        id: "s4",
        titleEn: "Magica Dreams",
        titleAr: "أحلام وتطلعات ماجيكا (Magica Dreams)",
        src: "/Magica%20Dreams%20(1).mp3",
        downloadName: "Magica Dreams.mp3",
        durationHint: "2:40",
        categoryEn: "Inspirational Focus",
        categoryAr: "إلهام وتركيز",
        descEn: "A serene, melodic soundtrack ideal for creative brainstorming, reading, and architectural thinking.",
        descAr: "موسيقى هادئة ومُلهمة مصممة لدعم التركيز أثناء التفكير الإبداعي، الدراسة، وبناء خطط المشروعات.",
        badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
    },
    {
        id: "s5",
        titleEn: "Blueprint for Magica",
        titleAr: "مخطط وبصمة ماجيكا (Blueprint for Magica)",
        src: "/Blueprint_for_Magica.mp3",
        downloadName: "Blueprint for Magica.mp3",
        durationHint: "1:35",
        categoryEn: "STEM & Coding",
        categoryAr: "تكنولوجيا وإنجاز",
        descEn: "High-tempo, rhythm-driven track celebrating STEM achievements, coding milestones, and robotic designs.",
        descAr: "إيقاع حيوي متسارع يحتفي بالإنجازات التقنية، البرمجة، وتصميم نماذج الابتكار والروبوتات في ماجيكا.",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
        id: "s6",
        titleEn: "Level Up Your World",
        titleAr: "طوّر عالمك واستعد (Level Up Your World)",
        src: "/Level%20Up%20Your%20World%20(1).mp3",
        downloadName: "Magica - Level Up Your World.mp3",
        durationHint: "1:45",
        categoryEn: "Mind Games & IQ",
        categoryAr: "ألعاب وتحدي الذكاء",
        descEn: "A fun, gamified electronic soundtrack tuned for mind challenges, trade simulators, and Bazar promotions.",
        descAr: "نغمة إلكترونية ممتعة مخصصة لتحديات الألعاب الذهنية، محاكاة الأسواق، وكسب النقاط في البازار.",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    {
        id: "s7",
        titleEn: "Magica Rising",
        titleAr: "نهضة وتفوق ماجيكا (Magica Rising)",
        src: "/Magica_Rising.mp3",
        downloadName: "Magica Rising.mp3",
        durationHint: "1:30",
        categoryEn: "Victory Score",
        categoryAr: "نغمات النجاح والتتويج",
        descEn: "A victorious, orchestral piece designed for graduation days, pitch competition awards, and honors.",
        descAr: "موسيقى فخر واعتزاز بطابع احتفالي مصممة للحظات التتويج، تخرج الدورات، والفوز بالمسابقات.",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
        id: "s8",
        titleEn: "Own the Court",
        titleAr: "في الصدارة دائماً (Own the Court)",
        src: "/Own_the_Court.mp3",
        downloadName: "Magica - Own the Court.mp3",
        durationHint: "1:35",
        categoryEn: "Action & Sports",
        categoryAr: "نشاط حركي وتحديات",
        descEn: "Dynamic sports and outdoor adventure music encouraging physical stamina, courage, and teamwork.",
        descAr: "إيقاع رياضي نشط يشجع على الحماس الحركي، المغامرات الميدانية، والشجاعة والعمل ضمن الفريق.",
        badgeColor: "bg-orange-50 text-orange-700 border-orange-200"
    },
    {
        id: "s9",
        titleEn: "Magica Magic",
        titleAr: "سحر وطاقة ماجيكا (Magica Magic)",
        src: "/Magica%20Magic.mp3",
        downloadName: "Magica Magic.mp3",
        durationHint: "2:00",
        categoryEn: "Wonder & Play",
        categoryAr: "خيال وإبداع حري",
        descEn: "A magical, joyous soundscape transporting young minds into an immersive realm of play and inquiry.",
        descAr: "أجواء ساحرة ומمتعة تنقل خيال الأطفال إلى عالم مليء بالشغف والإنجاز والفضول العلمي الممتع.",
        badgeColor: "bg-pink-50 text-pink-700 border-pink-200"
    },
];

export default function MagicSongsPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';
    const [activeSongId, setActiveSongId] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleTogglePlay = (song: Song) => {
        if (!audioRef.current) return;
        const audio = audioRef.current;

        if (activeSongId === song.id && isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else if (activeSongId === song.id && !isPlaying) {
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
            setActiveSongId(song.id);
            audio.src = song.src;
            audio.load();
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
        }
    };

    // Pause audio cleanly if component unmounts
    useEffect(() => {
        const audio = audioRef.current;
        return () => {
            if (audio && !audio.paused) {
                audio.pause();
            }
        };
    }, []);

    return (
        <main className="min-h-screen font-[family-name:var(--font-inter)] text-gray-800 relative pb-24 pt-28 overflow-hidden">
            <MagicalBackground />

            {/* Hidden master audio element for inline song card previews */}
            <audio
                ref={audioRef}
                onEnded={() => setIsPlaying(false)}
                onError={() => setIsPlaying(false)}
            />

            {/* Hero Section */}
            <section className="relative z-10 max-w-6xl mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center justify-center"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-extrabold text-sm mb-6 shadow-xs">
                        <Headphones className="w-4 h-4 text-rose-500 animate-pulse" />
                        <span>{isArabic ? "المكتبة الصوتية والموسيقى الرسمية" : "Official Audio Library & Anthems"}</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 mb-6 pb-2 leading-none">
                        {isArabic ? "أغانٍ ونغمات ماجيكا" : "Magica Songs & Anthems"}
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-700 max-w-3xl leading-relaxed font-bold mb-8">
                        {isArabic
                            ? "استمع مباشرة، وحمل مجاناً جميع الأناشيد والنغمات الموسيقية الخاصة بعالم ماجيكا بجودة MP3 فائقة النقاء."
                            : "Stream live or download all official Magica theme songs, motivation tracks, and STEM scores completely free in crystal-clear MP3 quality."}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-black text-gray-600 bg-white/80 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-gray-200 shadow-md">
                        <span className="flex items-center gap-1.5 text-rose-600">
                            <ShieldCheck className="w-5 h-5" />
                            <span>{isArabic ? "متاح للتحميل الفوري المجاني" : "100% Free & Instant Downloads"}</span>
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="flex items-center gap-1.5 text-purple-600">
                            <Volume2 className="w-5 h-5" />
                            <span>{isArabic ? "جودة استديو احترافية عالية" : "Professional HQ Studio Grade"}</span>
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="flex items-center gap-1.5 text-teal-600">
                            <Music className="w-5 h-5" />
                            <span>{isArabic ? "9 مسارات حصرية" : "9 Exclusive Sound Tracks"}</span>
                        </span>
                    </div>
                </motion.div>
            </section>

            {/* Song Grid Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SONGS.map((song, index) => {
                        const isThisPlaying = activeSongId === song.id && isPlaying;

                        return (
                            <motion.div
                                key={song.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.07 }}
                                className={`flex flex-col justify-between h-full p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-md border transition-all duration-300 shadow-lg group relative overflow-hidden ${
                                    isThisPlaying ? "border-rose-500 ring-2 ring-rose-400/30 shadow-2xl" : "border-gray-200/80 hover:border-gray-300 hover:shadow-xl"
                                }`}
                            >
                                {/* Top colored accent */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500" />

                                <div>
                                    {/* Header / Badges */}
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <span className={`text-xs font-black px-3 py-1 rounded-full border ${song.badgeColor}`}>
                                            {isArabic ? song.categoryAr : song.categoryEn}
                                        </span>
                                        <span className="text-xs font-bold text-gray-400 font-mono">
                                            ⏱️ {song.durationHint}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2.5 leading-snug tracking-tight">
                                        {isArabic ? song.titleAr : song.titleEn}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm leading-relaxed font-medium mb-6">
                                        {isArabic ? song.descAr : song.descEn}
                                    </p>
                                </div>

                                <div>
                                    {/* Audio Playback Status Box */}
                                    <div className={`p-4 rounded-2xl border mb-6 flex items-center justify-between transition-colors ${
                                        isThisPlaying ? "bg-rose-50 border-rose-200 text-rose-800" : "bg-gray-50/90 border-gray-200/70 text-gray-700"
                                    }`}>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleTogglePlay(song)}
                                                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform hover:scale-105 active:scale-95 ${
                                                    isThisPlaying ? "bg-gradient-to-r from-rose-500 to-pink-600" : "bg-gradient-to-r from-purple-600 to-indigo-600"
                                                }`}
                                                title={isArabic ? (isThisPlaying ? "إيقاف مؤقت" : "استمع الآن") : (isThisPlaying ? "Pause" : "Play Preview")}
                                            >
                                                {isThisPlaying ? (
                                                    <Pause className="w-5 h-5 fill-current" />
                                                ) : (
                                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                                )}
                                            </button>

                                            <div className="flex flex-col text-start">
                                                <span className="text-sm font-black">
                                                    {isThisPlaying ? (isArabic ? "يتم التشغيل الآن..." : "Now Playing...") : (isArabic ? "اضغط للاستماع" : "Click to Preview")}
                                                </span>
                                                <span className="text-xs text-gray-500 font-medium">
                                                    {isThisPlaying ? (isArabic ? "صوت فائق النقاوة" : "Streaming audio") : (isArabic ? "معاينة مباشرة" : "Instant browser playback")}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Animated Sound Bars when active */}
                                        {isThisPlaying ? (
                                            <div className="flex items-end gap-1 h-6 px-2">
                                                <span className="w-1 bg-rose-500 rounded-sm animate-[bounce_0.6s_infinite] h-3"></span>
                                                <span className="w-1 bg-purple-500 rounded-sm animate-[bounce_0.8s_infinite_0.1s] h-6"></span>
                                                <span className="w-1 bg-indigo-500 rounded-sm animate-[bounce_0.5s_infinite_0.3s] h-4"></span>
                                                <span className="w-1 bg-pink-500 rounded-sm animate-[bounce_0.7s_infinite_0.2s] h-5"></span>
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400">
                                                <Music className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Download Button */}
                                    <a
                                        href={song.src}
                                        download={song.downloadName}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 hover:from-gray-800 hover:to-gray-700 text-white font-black text-sm shadow-md hover:shadow-xl flex items-center justify-center gap-2.5 transition-all group/btn"
                                    >
                                        <Download className="w-4 h-4 text-rose-400 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        <span>{isArabic ? "تحميل النغمة مجاناً (MP3)" : "Download Track Free (MP3)"}</span>
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* How To Use Magica Anthems Tip Card */}
            <section className="relative z-10 max-w-5xl mx-auto px-6 mb-16">
                <div className="bg-gradient-to-br from-purple-900 via-indigo-950 to-gray-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-800/50 relative overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-56 h-56 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -left-12 -bottom-12 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-rose-300 font-extrabold text-xs uppercase tracking-wider mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>{isArabic ? "أفكار وطرق الاستخدام" : "Usage Tips & Inspiration"}</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-black mb-6 tracking-tight">
                        {isArabic ? "كيف تستفيد من أغانٍ ونغمات ماجيكا في حياة طفلك؟" : "How to Utilize Magica Anthems in Your Child's Daily Routine:"}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-start mt-8">
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                            <div className="text-2xl mb-3">⏰</div>
                            <h4 className="text-base font-black text-white mb-1.5">
                                {isArabic ? "نغمات منبه صباحية مبهجة" : "Joyful Morning Alarms"}
                            </h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                {isArabic
                                    ? "حمّل نغمة Ready for the Week واجعلها نبه طفلك ليوم دراسي مليء بالنشاط والرغبة في التفوق."
                                    : "Download 'Ready for the Week' to awaken your children with positive energy and motivation for school."}
                            </p>
                        </div>

                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                            <div className="text-2xl mb-3">🎧</div>
                            <h4 className="text-base font-black text-white mb-1.5">
                                {isArabic ? "موسيقى التركيز أثناء المذاكرة" : "Study & STEM Background Music"}
                            </h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                {isArabic
                                    ? "شغّل مسار Magica Dreams الهادئ لدعم تركيز الأطفال أثناء حل التمارين أو ابتكار مشروعات الروبوت."
                                    : "Play 'Magica Dreams' to boost creative mental stamina during coding sessions and homework."}
                            </p>
                        </div>

                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                            <div className="text-2xl mb-3">🎤</div>
                            <h4 className="text-base font-black text-white mb-1.5">
                                {isArabic ? "موسيقى تقديم المشروعات" : "Project Pitch & Presentation Audio"}
                            </h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                {isArabic
                                    ? "استخدم نغمات الحماس عند تصوير فيديوهات عرض منتجات طفلك في البازار أو تقديم أفكاره الإبداعية."
                                    : "Utilize 'Magica Rising' as the backing soundtrack when recording your child's Bazar product pitches and videos!"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            <span>{isArabic ? "جميع الملفات مرخصة ومفتوحة الاستخدام لأسرة ماجيكا" : "All audio files are free to download and share for Magica families."}</span>
                        </div>
                        <Link
                            href={`/${lang}`}
                            className="px-6 py-3 rounded-full bg-white text-gray-900 hover:bg-gray-100 font-black text-sm shadow-md transition-colors w-full sm:w-auto text-center"
                        >
                            {isArabic ? "العودة للرئيسية ←" : "Back to Home →"}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

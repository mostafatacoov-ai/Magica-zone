"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicalBackground from "@/components/ui/MagicalBackground";
import { Brain, FlaskConical, Sparkles, BookOpen, Shapes, Trophy, Star, Gamepad2, Award, ChevronRight } from "lucide-react";
import { ALL_GAMES_INFO, getKidGameScores, GameScore } from "@/lib/games/gameScores";

import MemoryMatchGame from "@/components/games/MemoryMatchGame";
import MathAlchemyGame from "@/components/games/MathAlchemyGame";
import PatternSeerGame from "@/components/games/PatternSeerGame";
import WordSpellGame from "@/components/games/WordSpellGame";
import SpatialMosaicGame from "@/components/games/SpatialMosaicGame";
import { useCMSData } from "@/lib/cms/contentStore";

export default function MagicGamesPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === "ar";
    const { data: cmsData } = useCMSData();
    const [selectedGame, setSelectedGame] = useState<string>("memory-match");
    const [scores, setScores] = useState<Record<string, GameScore>>({});
    const [totalStars, setTotalStars] = useState<number>(0);
    const [totalPoints, setTotalPoints] = useState<number>(0);

    const loadScores = async () => {
        const data = await getKidGameScores();
        setScores(data);

        let starsSum = 0;
        let pointsSum = 0;
        Object.values(data).forEach((sc) => {
            starsSum += sc.stars;
            pointsSum += sc.bestScore;
        });
        setTotalStars(starsSum);
        setTotalPoints(pointsSum);
    };

    useEffect(() => {
        loadScores();
        const handleUpdate = () => loadScores();
        window.addEventListener("magica-scores-updated", handleUpdate);
        return () => window.removeEventListener("magica-scores-updated", handleUpdate);
    }, []);

    const renderIcon = (name: string, className: string = "w-6 h-6") => {
        switch (name) {
            case "Brain": return <Brain className={className} />;
            case "FlaskConical": return <FlaskConical className={className} />;
            case "Sparkles": return <Sparkles className={className} />;
            case "BookOpen": return <BookOpen className={className} />;
            case "Shapes": return <Shapes className={className} />;
            default: return <Gamepad2 className={className} />;
        }
    };

    const activeGameInfo = ALL_GAMES_INFO.find((g) => g.id === selectedGame) || ALL_GAMES_INFO[0];

    return (
        <main className="min-h-screen font-[family-name:var(--font-inter)] text-gray-800 overflow-hidden relative pb-24">
            <MagicalBackground />

            {/* Hero Section */}
            <section className="relative pt-36 pb-12 px-6 z-10">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 text-orange-600 font-bold mb-6 shadow-sm"
                    >
                        <Gamepad2 className="w-5 h-5 animate-pulse text-orange-500" />
                        <span>{isArabic ? "بوابة الذكاء والتركيز لأبطال ماجيكا" : "Magica Champions Cognitive Arena"}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 25, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight"
                    >
                        {isArabic ? (
                            <>ألعاب ماجيكا <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-purple-600">الذهنية والسحرية</span></>
                        ) : (
                            <>Magica <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-purple-600">Mind Games</span> Hub</>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 font-medium leading-relaxed"
                    >
                        {isArabic
                            ? "خمس ألعاب ذهنية مصممة خصيصًا لتطوير الذاكرة، الحساب الذهني الفائق، قوة الملاحظة، والذكاء الريادي في قالب ممتع وتفاعلي!"
                            : "Five mind games specifically engineered to enhance memory, rapid mental arithmetic, observation powers, and entrepreneurial intuition!"}
                    </motion.p>

                    {/* Overall Summary Bar */}
                    <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                        <div className="p-3 border-r border-gray-100 last:border-0">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{isArabic ? "مجموع النجوم" : "Total Stars"}</div>
                            <div className="text-3xl font-black text-amber-500 flex items-center justify-center gap-1.5">
                                <Star className="w-7 h-7 fill-current" />
                                <span>{totalStars} / 25</span>
                            </div>
                        </div>
                        <div className="p-3 border-r border-gray-100 last:border-0">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{isArabic ? "أعلى النقاط" : "High Scores Sum"}</div>
                            <div className="text-3xl font-black text-purple-600 flex items-center justify-center gap-1.5">
                                <Trophy className="w-7 h-7" />
                                <span>{totalPoints}</span>
                            </div>
                        </div>
                        <div className="p-3 col-span-2 sm:col-span-1 flex flex-col items-center justify-center bg-orange-50/50 rounded-2xl border border-orange-100">
                            <div className="text-xs font-extrabold text-orange-600 uppercase mb-1">{isArabic ? "الحالة العقلية" : "Mind Status"}</div>
                            <div className="text-sm md:text-base font-extrabold text-gray-800 flex items-center gap-1">
                                <Award className="w-5 h-5 text-orange-500" />
                                <span>{isArabic ? "عبقري ماجيكا" : "Magica Prodigy"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Game Selection Cards Gallery */}
            <section className="max-w-7xl mx-auto px-6 mb-12">
                <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-orange-500" />
                    <span>{isArabic ? "اختر لعبتك وابدأ التحدي الآن:" : "Choose Your Game & Start the Quest:"}</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {ALL_GAMES_INFO.map((game) => {
                        const cmsMatch = cmsData.games.find(g => g.id === game.id);
                        const scoreData = scores[game.id] || { bestScore: 0, stars: 0, playsCount: 0 };
                        const isSelected = selectedGame === game.id;

                        const displayTitleAr = cmsMatch ? cmsMatch.titleAr : game.titleAr;
                        const displayTitleEn = cmsMatch ? cmsMatch.titleEn : game.titleEn;
                        const displayDescAr = cmsMatch ? cmsMatch.descAr : game.descAr;
                        const displayDescEn = cmsMatch ? cmsMatch.descEn : game.descEn;

                        return (
                            <motion.button
                                key={game.id}
                                whileHover={{ y: -5, scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setSelectedGame(game.id)}
                                className={`text-start p-6 rounded-3xl transition-all duration-300 relative flex flex-col justify-between overflow-hidden border-2 ${
                                    isSelected
                                        ? "bg-gray-900 text-white border-orange-500 shadow-2xl scale-[1.02] ring-4 ring-orange-500/20"
                                        : "bg-white text-gray-800 border-gray-100 hover:border-orange-300 shadow-lg"
                                }`}
                            >
                                {isSelected && (
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/20 to-transparent pointer-events-none rounded-bl-full" />
                                )}

                                <div>
                                    {cmsMatch?.imageUrl ? (
                                        <div className="w-full h-32 mb-4 rounded-2xl overflow-hidden shadow-sm relative border border-gray-100">
                                            <img src={cmsMatch.imageUrl} alt={isArabic ? displayTitleAr : displayTitleEn} className="w-full h-full object-cover" />
                                            {scoreData.stars > 0 && (
                                                <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500 text-white px-2 py-0.5 rounded-full text-[11px] font-black shadow">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    <span>{scoreData.stars}</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${isSelected ? "bg-orange-500 text-white" : game.bgGradient}`}>
                                                {renderIcon(game.iconName, "w-7 h-7")}
                                            </div>
                                            {scoreData.stars > 0 && (
                                                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-full text-xs font-black border border-amber-500/20">
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                    <span>{scoreData.stars}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <h3 className="text-lg font-black leading-tight mb-2">
                                        {isArabic ? displayTitleAr : displayTitleEn}
                                    </h3>
                                    <p className={`text-xs leading-relaxed line-clamp-2 ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                                        {isArabic ? displayDescAr : displayDescEn}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100/20 flex items-center justify-between text-xs font-extrabold">
                                    <span className={isSelected ? "text-orange-400" : "text-orange-500"}>
                                        {isArabic ? "أفضل نتيجة:" : "High Score:"}
                                    </span>
                                    <span className="text-base font-black">{scoreData.bestScore}</span>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </section>

            {/* Active Game Display Area */}
            <section className="max-w-6xl mx-auto px-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedGame}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                    >
                        {selectedGame === "memory-match" && <MemoryMatchGame lang={lang} />}
                        {selectedGame === "math-alchemy" && <MathAlchemyGame lang={lang} />}
                        {selectedGame === "pattern-seer" && <PatternSeerGame lang={lang} />}
                        {selectedGame === "word-spell" && <WordSpellGame lang={lang} />}
                        {selectedGame === "spatial-mosaic" && <SpatialMosaicGame lang={lang} />}
                    </motion.div>
                </AnimatePresence>
            </section>

            {/* Cognitive Benefits Showcase */}
            <section className="max-w-6xl mx-auto px-6 mt-20">
                <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md">
                            {isArabic ? "التطور العقلي والمهاري" : "Skill & Cognitive Development"}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-black leading-tight">
                            {isArabic ? "لماذا نهتم بالألعاب الذهنية في ماجيكا؟" : "Why Mind Games Matter in Magica?"}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium">
                            {isArabic
                                ? "نحن نؤمن بأن الذكاء التجاري والريادي لا ينفصل عن سرعة البديهة، الذاكرة المتينة، وحل الألغاز المنطقية. كل نتيجة يسجلها طفلك هنا تتم مزامنتها فورًا على لوحة تحكم ولي الأمر والمتابع التعليمي!"
                                : "We believe entrepreneurial intelligence is intertwined with intuitive calculation, retention, and problem solving. Every score earned here synchronizes dynamically to the Parent and Child Dashboards!"}
                        </p>
                    </div>

                    <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-xl shrink-0 flex flex-col items-center text-center gap-3 w-64 border border-white/20">
                        <Award className="w-12 h-12 text-orange-500" />
                        <h4 className="font-extrabold text-lg">{isArabic ? "تقارير الوالدين الفورية" : "Live Parent Reports"}</h4>
                        <p className="text-xs text-gray-500 font-medium">
                            {isArabic
                                ? "تابع نتائج طفلك ونموه الإدراكي لحظة بلحظة"
                                : "Track your child's score & brain stats in real-time"}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

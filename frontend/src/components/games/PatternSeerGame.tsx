"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, Star, RefreshCw, Volume2, ShieldAlert } from "lucide-react";
import { saveGameScore } from "@/lib/games/gameScores";

interface Crystal {
    id: number;
    color: string;
    activeColor: string;
    labelEn: string;
    labelAr: string;
    shadow: string;
}

const CRYSTALS: Crystal[] = [
    { id: 0, color: "bg-emerald-600", activeColor: "bg-emerald-300 ring-8 ring-emerald-300/60 scale-105 brightness-125", labelEn: "Emerald Mind", labelAr: "زمردة التفكير", shadow: "shadow-emerald-500/50" },
    { id: 1, color: "bg-amber-500", activeColor: "bg-amber-300 ring-8 ring-amber-300/60 scale-105 brightness-125", labelEn: "Amber Focus", labelAr: "كهرمانة التركيز", shadow: "shadow-amber-500/50" },
    { id: 2, color: "bg-blue-600", activeColor: "bg-blue-300 ring-8 ring-blue-300/60 scale-105 brightness-125", labelEn: "Sapphire Vision", labelAr: "ياقوتة البصيرة", shadow: "shadow-blue-500/50" },
    { id: 3, color: "bg-purple-600", activeColor: "bg-purple-300 ring-8 ring-purple-300/60 scale-105 brightness-125", labelEn: "Amethyst Wisdom", labelAr: "أرجوانة الحكمة", shadow: "shadow-purple-500/50" },
];

export default function PatternSeerGame({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const [sequence, setSequence] = useState<number[]>([]);
    const [userStep, setUserStep] = useState<number>(0);
    const [activeCrystal, setActiveCrystal] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isShowingSequence, setIsShowingSequence] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [level, setLevel] = useState<number>(1);
    const [bestLevel, setBestLevel] = useState<number>(1);
    const [earnedStars, setEarnedStars] = useState<number>(3);
    const [score, setScore] = useState<number>(0);

    const startGame = () => {
        setSequence([]);
        setUserStep(0);
        setLevel(1);
        setScore(0);
        setIsPlaying(true);
        setGameOver(false);
        setTimeout(() => nextRound([]), 600);
    };

    const nextRound = (currentSeq: number[]) => {
        setIsShowingSequence(true);
        setUserStep(0);
        const nextCol = Math.floor(Math.random() * 4);
        const newSeq = [...currentSeq, nextCol];
        setSequence(newSeq);

        // Flash sequence to user
        newSeq.forEach((colIndex, idx) => {
            setTimeout(() => {
                setActiveCrystal(colIndex);
                setTimeout(() => {
                    setActiveCrystal(null);
                    if (idx === newSeq.length - 1) {
                        setIsShowingSequence(false);
                    }
                }, 500);
            }, (idx + 1) * 850);
        });
    };

    const handleCrystalClick = (index: number) => {
        if (!isPlaying || isShowingSequence || gameOver) return;

        // Visual flash feedback
        setActiveCrystal(index);
        setTimeout(() => setActiveCrystal(null), 250);

        if (index === sequence[userStep]) {
            const nextStep = userStep + 1;
            setUserStep(nextStep);
            const addedPts = level * 30;
            setScore((prev) => prev + addedPts);

            // Completed current level sequence!
            if (nextStep === sequence.length) {
                const newLvl = level + 1;
                setLevel(newLvl);
                if (newLvl > bestLevel) setBestLevel(newLvl);

                setTimeout(() => {
                    nextRound(sequence);
                }, 1000);
            }
        } else {
            // Mistake made -> game over
            endGame();
        }
    };

    const endGame = () => {
        setIsPlaying(false);
        setGameOver(true);

        let stars = 3;
        if (level >= 7) stars = 5;
        else if (level >= 4) stars = 4;

        setEarnedStars(stars);
        saveGameScore("pattern-seer", score + level * 50, stars, 50);
    };

    return (
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
                <div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-800 flex items-center gap-2">
                        <Sparkles className="w-8 h-8 text-emerald-500 animate-spin" style={{ animationDuration: '4s' }} />
                        {isArabic ? "العراف وعين النماذج السحرية" : "Pattern Seer"}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                        {isArabic
                            ? "راقب وهج البلورات الضوئية وكرر التسلسل المتزايد بدون أخطاء!"
                            : "Observe the mystical crystal light pattern and repeat the growing sequence!"}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-emerald-50 px-5 py-2.5 rounded-2xl border border-emerald-100 flex items-center gap-3 font-extrabold text-gray-800">
                        <span className="text-emerald-600">{isArabic ? "المستوى:" : "Level:"}</span>
                        <span className="text-2xl font-black">{level}</span>
                    </div>
                    <div className="bg-gray-900 text-white px-5 py-2.5 rounded-2xl font-black text-xl shadow-md">
                        {score} <span className="text-xs text-emerald-300 font-normal">{isArabic ? "نقطة" : "PTS"}</span>
                    </div>
                </div>
            </div>

            {/* Welcome State */}
            {!isPlaying && !gameOver && (
                <div className="text-center py-12 px-4 max-w-xl mx-auto space-y-6">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <Sparkles className="w-14 h-14 fill-current" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-800">
                        {isArabic ? "اختبر تركيزك وذاكرتك البصرية الفائقة!" : "Test Your Ultimate Sequential Memory!"}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {isArabic
                            ? "تضيء بلورات الحكمة بتسلسل ضوئي سحري. مهمتك هي حفظ الترتيب وضغط البلورات بنفس التتابع!"
                            : "The mystical gems will flash in sequence. Memorize the order and repeat it accurately to reach maximum IQ wisdom!"}
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-2xl rounded-full shadow-xl shadow-emerald-500/30 hover:brightness-110 transition-all"
                    >
                        {isArabic ? "ابدأ التحدي السحري!" : "Begin Sequence Test!"}
                    </motion.button>
                </div>
            )}

            {/* Play Area */}
            {isPlaying && (
                <div className="py-6 flex flex-col items-center gap-8 max-w-xl mx-auto">
                    <div className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-bold text-sm tracking-wide flex items-center gap-2">
                        {isShowingSequence ? (
                            <>
                                <span className="w-3 h-3 rounded-full bg-orange-500 animate-ping" />
                                <span>{isArabic ? "راقب التسلسل السحري بانتباه..." : "Watch the sequence closely..."}</span>
                            </>
                        ) : (
                            <>
                                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                                <span>{isArabic ? "دورك الآن! كرر التسلسل..." : "Your turn! Repeat the pattern..."}</span>
                            </>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-6 w-full max-w-md aspect-square">
                        {CRYSTALS.map((crystal) => {
                            const isActive = activeCrystal === crystal.id;
                            return (
                                <motion.button
                                    key={crystal.id}
                                    whileHover={isShowingSequence ? {} : { scale: 1.03 }}
                                    whileTap={isShowingSequence ? {} : { scale: 0.96 }}
                                    onClick={() => handleCrystalClick(crystal.id)}
                                    disabled={isShowingSequence}
                                    className={`w-full h-full rounded-3xl shadow-xl ${crystal.shadow} transition-all duration-300 flex flex-col items-center justify-center p-6 border-4 border-white/20 select-none ${
                                        isActive ? crystal.activeColor : `${crystal.color} opacity-90 hover:opacity-100`
                                    }`}
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/20 mb-3 backdrop-blur-sm flex items-center justify-center border border-white/30 text-white font-black text-xl shadow-inner">
                                        ✦
                                    </div>
                                    <span className="text-sm font-extrabold text-white text-center drop-shadow">
                                        {isArabic ? crystal.labelAr : crystal.labelEn}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Game Over Screen */}
            <AnimatePresence>
                {gameOver && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10 px-4 max-w-xl mx-auto space-y-6"
                    >
                        <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-teal-600 rounded-full flex items-center justify-center mx-auto shadow-xl text-white">
                            <Trophy className="w-12 h-12 fill-current" />
                        </div>

                        <h2 className="text-4xl font-black text-gray-800">
                            {isArabic ? "نهاية الجولة!" : "Sequence Finished!"}
                        </h2>
                        <p className="text-gray-600 text-lg">
                            {isArabic
                                ? `وصلت بنجاح إلى المستوى الـ ${level} وأظهرت ذاكرة متسلسلة مميزة!`
                                : `You mastered cognitive focus reaching Level ${level} in sequential memory!`}
                        </p>

                        <div className="flex justify-center gap-2 py-2">
                            {[...Array(5)].map((_, idx) => (
                                <Star
                                    key={idx}
                                    className={`w-9 h-9 ${
                                        idx < earnedStars
                                            ? "text-yellow-400 fill-current drop-shadow"
                                            : "text-gray-200"
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center gap-4">
                            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 min-w-[140px]">
                                <div className="text-sm text-emerald-600 font-bold mb-1">{isArabic ? "أفضل مستوى" : "Highest Level"}</div>
                                <div className="text-3xl font-black text-gray-900">Lvl {level}</div>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 min-w-[140px]">
                                <div className="text-sm text-orange-600 font-bold mb-1">{isArabic ? "النقاط المسجلة" : "Total Score"}</div>
                                <div className="text-3xl font-black text-gray-900">{score + level * 50}</div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xl rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" />
                                {isArabic ? "حاول مرة أخرى" : "Play Again"}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

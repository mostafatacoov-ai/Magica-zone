"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shapes, Trophy, Star, RefreshCw, Sparkles, Check, ArrowRight } from "lucide-react";
import { saveGameScore } from "@/lib/games/gameScores";

interface MosaicLevel {
    titleEn: string;
    titleAr: string;
    grid: string[]; // 9 elements, one is "?"
    options: string[];
    correctSymbol: string;
}

const LEVELS: MosaicLevel[] = [
    {
        titleEn: "Symmetry Diamond Shield",
        titleAr: "درع الألماس المتماثل",
        grid: ["💠", "🌟", "💠", "🌟", "❓", "🌟", "💠", "🌟", "💠"],
        options: ["💠", "🌟", "🔥", "👑"],
        correctSymbol: "💠"
    },
    {
        titleEn: "Royal Eagle Formation",
        titleAr: "تشكيل الصقر الملكي",
        grid: ["👑", "👑", "👑", "🦅", "❓", "🦅", "⚡", "⚡", "⚡"],
        options: ["⚡", "👑", "🦅", "💠"],
        correctSymbol: "🦅"
    },
    {
        titleEn: "Elemental Campfire Matrix",
        titleAr: "مصفوفة نيرن المعسكر",
        grid: ["🔥", "⛺", "🔥", "⛺", "🔥", "⛺", "🔥", "⛺", "❓"],
        options: ["⛺", "🔥", "🌟", "⚡"],
        correctSymbol: "🔥"
    },
    {
        titleEn: "Celestial Star Harmony",
        titleAr: "تناغم النجوم الفردوسي",
        grid: ["🌟", "✨", "🌟", "✨", "⚡", "✨", "🌟", "✨", "❓"],
        options: ["⚡", "✨", "🌟", "👑"],
        correctSymbol: "🌟"
    },
    {
        titleEn: "Ultimate Magica Portal",
        titleAr: "بوابة ماجيكا الكبرى",
        grid: ["🎨", "🎯", "🎨", "🎯", "👑", "🎯", "🎨", "❓", "🎨"],
        options: ["👑", "🎯", "🎨", "💠"],
        correctSymbol: "🎯"
    }
];

export default function SpatialMosaicGame({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [earnedStars, setEarnedStars] = useState<number>(5);

    const level = LEVELS[currentLevelIdx];

    const handleSelectOption = (sym: string) => {
        if (selectedOpt !== null) return;
        setSelectedOpt(sym);

        const isCorrect = sym === level.correctSymbol;
        if (isCorrect) {
            setScore((prev) => prev + 250);
        }

        setTimeout(() => {
            if (currentLevelIdx < LEVELS.length - 1) {
                setCurrentLevelIdx((prev) => prev + 1);
                setSelectedOpt(null);
            } else {
                completeGame(score + (isCorrect ? 250 : 0));
            }
        }, 1200);
    };

    const completeGame = (finalScore: number) => {
        setIsFinished(true);
        let stars = 3;
        if (finalScore >= 1250) stars = 5;
        else if (finalScore >= 750) stars = 4;

        setEarnedStars(stars);
        saveGameScore("spatial-mosaic", finalScore, stars, 50);
    };

    const restartGame = () => {
        setCurrentLevelIdx(0);
        setScore(0);
        setSelectedOpt(null);
        setIsFinished(false);
    };

    return (
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
                <div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-800 flex items-center gap-2">
                        <Shapes className="w-8 h-8 text-blue-500 animate-pulse" />
                        {isArabic ? "فسيفساء الأشكال والهندسة السحرية" : "Spatial Mosaic Puzzle"}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                        {isArabic
                            ? "اكتشف النمط البصري المفقود لإكمال مصفوفة ماجيكا الهندسية بذكاء!"
                            : "Analyze spatial patterns and place the correct geometric emblem in the missing spot!"}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-blue-50 px-5 py-2.5 rounded-2xl border border-blue-100 flex items-center gap-2 font-extrabold text-gray-800">
                        <span className="text-blue-600">{isArabic ? "المصفوفة:" : "Matrix:"}</span>
                        <span className="text-2xl">{currentLevelIdx + 1} / {LEVELS.length}</span>
                    </div>
                    <div className="bg-gray-900 text-white px-5 py-2.5 rounded-2xl font-black text-xl shadow-md">
                        {score} <span className="text-xs text-blue-300 font-normal">{isArabic ? "نقطة" : "PTS"}</span>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {!isFinished ? (
                <div className="max-w-2xl mx-auto space-y-8 py-4 text-center">
                    <div>
                        <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-extrabold shadow-sm">
                            {isArabic ? level.titleAr : level.titleEn}
                        </span>
                    </div>

                    {/* 3x3 Spatial Grid */}
                    <motion.div
                        key={currentLevelIdx}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-72 md:w-80 aspect-square mx-auto bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-4 shadow-2xl border-4 border-blue-500/30 grid grid-cols-3 gap-3 relative"
                    >
                        <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-blue-400 animate-bounce" />

                        {level.grid.map((cell, idx) => {
                            const isMissing = cell === "❓";
                            return (
                                <div
                                    key={idx}
                                    className={`rounded-2xl flex items-center justify-center text-4xl md:text-5xl select-none transition-all ${
                                        isMissing
                                            ? "bg-amber-400/20 border-2 border-dashed border-amber-400 animate-pulse text-amber-300 font-bold"
                                            : "bg-white/10 backdrop-blur-md shadow-inner border border-white/10 text-white"
                                    }`}
                                >
                                    {isMissing && selectedOpt !== null ? selectedOpt : cell}
                                </div>
                            );
                        })}
                    </motion.div>

                    <div className="space-y-4 pt-4">
                        <p className="font-extrabold text-gray-700 text-lg">
                            {isArabic ? "اختر الشكل الصحيح لإكمال هذا النمط الهونسي:" : "Select the missing emblem to complete the symmetry:"}
                        </p>

                        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                            {level.options.map((opt, idx) => {
                                const isSelected = selectedOpt === opt;
                                const isCorrect = opt === level.correctSymbol;
                                let btnStyle = "bg-gray-50 hover:bg-blue-50 text-gray-800 border-gray-200";

                                if (selectedOpt !== null) {
                                    if (isCorrect) {
                                        btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105";
                                    } else if (isSelected && !isCorrect) {
                                        btnStyle = "bg-rose-500 text-white border-rose-600 opacity-90";
                                    } else {
                                        btnStyle = "bg-gray-50 text-gray-300 border-gray-100 opacity-40";
                                    }
                                }

                                return (
                                    <motion.button
                                        key={idx}
                                        whileHover={selectedOpt === null ? { scale: 1.05, y: -2 } : {}}
                                        whileTap={selectedOpt === null ? { scale: 0.95 } : {}}
                                        onClick={() => handleSelectOption(opt)}
                                        disabled={selectedOpt !== null}
                                        className={`aspect-square rounded-2xl border-2 text-4xl flex items-center justify-center shadow-md transition-all duration-200 ${btnStyle}`}
                                    >
                                        {opt}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                /* Victory Completed */
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 px-4 max-w-xl mx-auto space-y-6"
                >
                    <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-xl text-white">
                        <Trophy className="w-12 h-12 fill-current" />
                    </div>

                    <h2 className="text-4xl font-black text-gray-800">
                        {isArabic ? "عبقري الهندسة السحرية!" : "Spatial Mosaic Master!"}
                    </h2>
                    <p className="text-gray-600 text-lg">
                        {isArabic
                            ? "تمتلك رؤية بصرية مكانية خارقة تمكنت بها من حل كافة الأنماط!"
                            : "Your visual intuition and symmetry discernment are operating at peak potential!"}
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
                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 min-w-[140px]">
                            <div className="text-sm text-blue-600 font-bold mb-1">{isArabic ? "النتيجة الكلية" : "Total Score"}</div>
                            <div className="text-3xl font-black text-gray-900">{score}</div>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 min-w-[140px]">
                            <div className="text-sm text-emerald-600 font-bold mb-1">{isArabic ? "مكافأة الإدراك" : "Spatial Bonus"}</div>
                            <div className="text-3xl font-black text-gray-900">+50 PTS</div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={restartGame}
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-extrabold text-xl rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            {isArabic ? "العب مصفوفة جديدة" : "Play Again"}
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

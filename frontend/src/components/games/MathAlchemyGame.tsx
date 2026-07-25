"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Trophy, Star, RefreshCw, Sparkles, Flame, Timer } from "lucide-react";
import { saveGameScore } from "@/lib/games/gameScores";

interface Question {
    equation: string;
    options: number[];
    answer: number;
}

export default function MathAlchemyGame({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [earnedStars, setEarnedStars] = useState(3);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Generate random educational mental arithmetic question suitable for kids
    const generateQuestion = (): Question => {
        const ops = ["+", "-", "*"];
        const op = ops[Math.floor(Math.random() * ops.length)];
        let num1 = Math.floor(Math.random() * 12) + 3;
        let num2 = Math.floor(Math.random() * 12) + 2;
        let answer = 0;
        let equation = "";

        if (op === "+") {
            answer = num1 + num2;
            equation = `${num1} + ${num2} = ?`;
        } else if (op === "-") {
            if (num1 < num2) [num1, num2] = [num2, num1]; // avoid negative numbers for young kids
            answer = num1 - num2;
            equation = `${num1} - ${num2} = ?`;
        } else {
            num1 = Math.floor(Math.random() * 10) + 2;
            num2 = Math.floor(Math.random() * 8) + 2;
            answer = num1 * num2;
            equation = `${num1} × ${num2} = ?`;
        }

        // Generate 3 plausible wrong options
        const optionsSet = new Set<number>([answer]);
        while (optionsSet.size < 4) {
            const delta = Math.floor(Math.random() * 7) - 3;
            const wrong = answer + (delta !== 0 ? delta : 4);
            if (wrong >= 0) optionsSet.add(wrong);
        }

        const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

        return { equation, options, answer };
    };

    const startGame = () => {
        setIsPlaying(true);
        setIsGameOver(false);
        setScore(0);
        setStreak(0);
        setCorrectCount(0);
        setTimeLeft(30);
        setCurrentQuestion(generateQuestion());
    };

    useEffect(() => {
        if (isPlaying && !isGameOver) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        endGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, isGameOver]);

    const handleOptionClick = (val: number) => {
        if (!isPlaying || !currentQuestion) return;

        if (val === currentQuestion.answer) {
            const pointsGain = 100 + streak * 25;
            setScore((prev) => prev + pointsGain);
            setStreak((prev) => prev + 1);
            setCorrectCount((prev) => prev + 1);
        } else {
            setStreak(0);
        }
        setCurrentQuestion(generateQuestion());
    };

    const endGame = () => {
        setIsPlaying(false);
        setIsGameOver(true);
        if (timerRef.current) clearInterval(timerRef.current);

        let stars = 2;
        if (correctCount >= 10) stars = 5;
        else if (correctCount >= 7) stars = 4;
        else if (correctCount >= 4) stars = 3;

        setEarnedStars(stars);
        saveGameScore("math-alchemy", score, stars, 60);
    };

    return (
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
                <div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-800 flex items-center gap-2">
                        <FlaskConical className="w-8 h-8 text-purple-600 animate-bounce" />
                        {isArabic ? "كيمياء الأرقام السحرية" : "Math Alchemy"}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                        {isArabic
                            ? "حل المعادلات السريعة لدمج عناصر الذكاء وتحضير الجرعات العلمية!"
                            : "Solve rapid equations to mix analytical potion bottles before time runs out!"}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {isPlaying && (
                        <>
                            <div className="bg-purple-50 px-4 py-2 rounded-2xl border border-purple-100 flex items-center gap-2 text-purple-700 font-extrabold">
                                <Timer className="w-5 h-5 text-purple-600 animate-spin" />
                                <span className="text-xl">{timeLeft}s</span>
                            </div>
                            <div className="bg-orange-50 px-4 py-2 rounded-2xl border border-orange-100 flex items-center gap-2 text-orange-600 font-extrabold">
                                <Flame className="w-5 h-5 text-orange-500" />
                                <span>{isArabic ? "سلسلة:" : "Streak:"} {streak}x</span>
                            </div>
                        </>
                    )}
                    <div className="bg-gray-900 text-white px-5 py-2.5 rounded-2xl font-black text-xl shadow-md">
                        {score} <span className="text-xs text-purple-300 font-normal">{isArabic ? "نقطة" : "PTS"}</span>
                    </div>
                </div>
            </div>

            {/* Game Content */}
            {!isPlaying && !isGameOver && (
                <div className="text-center py-12 px-4 max-w-xl mx-auto space-y-6">
                    <div className="w-24 h-24 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <FlaskConical className="w-14 h-14 fill-current opacity-80" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-800">
                        {isArabic ? "هل أنت جاهز لتحدي السرعة والحساب؟" : "Ready for the Speed Math Challenge?"}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {isArabic
                            ? "لديك 30 ثانية للإجابة على أكبر عدد من العمليات الرياضية وتحضير أكبر عدد من كؤوس الحكمة!"
                            : "You have 30 seconds to solve rapid mathematical equations and craft magical wisdom potions!"}
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        className="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-2xl rounded-full shadow-xl shadow-purple-600/30 hover:brightness-110 transition-all"
                    >
                        {isArabic ? "ابدأ التجربة السحرية!" : "Start Alchemy Test!"}
                    </motion.button>
                </div>
            )}

            {isPlaying && currentQuestion && (
                <div className="py-8 max-w-2xl mx-auto text-center space-y-8">
                    {/* Equation Cauldron Card */}
                    <motion.div
                        key={currentQuestion.equation}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-12 bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-3xl shadow-2xl relative overflow-hidden border border-purple-500/30"
                    >
                        <Sparkles className="absolute top-4 right-4 text-purple-300 opacity-20 w-16 h-16 animate-pulse" />
                        <span className="text-sm font-bold text-purple-300 uppercase tracking-widest block mb-4">
                            {isArabic ? "المعادلة الكيميائية" : "Equation Potion"} #{correctCount + 1}
                        </span>
                        <div className="text-6xl md:text-7xl font-black tracking-wider drop-shadow-md text-amber-300 font-mono">
                            {currentQuestion.equation}
                        </div>
                    </motion.div>

                    {/* Multiple choice Bubbles */}
                    <div className="grid grid-cols-2 gap-4">
                        {currentQuestion.options.map((opt, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => handleOptionClick(opt)}
                                className="py-6 rounded-2xl bg-gradient-to-tr from-gray-50 to-purple-50 hover:from-purple-500 hover:to-indigo-600 text-purple-900 hover:text-white font-black text-3xl shadow-md hover:shadow-lg border-2 border-purple-200 hover:border-transparent transition-all duration-200"
                            >
                                {opt}
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}

            {/* Victory Screen */}
            <AnimatePresence>
                {isGameOver && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10 px-4 max-w-xl mx-auto space-y-6"
                    >
                        <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-xl text-white">
                            <Trophy className="w-12 h-12 fill-current" />
                        </div>

                        <h2 className="text-4xl font-black text-gray-800">
                            {isArabic ? "اكتملت الجلسة العلمية!" : "Alchemy Session Complete!"}
                        </h2>
                        <p className="text-gray-600 text-lg">
                            {isArabic
                                ? `لقد نجحت في تحضير ${correctCount} جرعة رياضية صحيحة بسرعة فائقة!`
                                : `You successfully brewed ${correctCount} correct math potions at incredible speed!`}
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
                            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 min-w-[140px]">
                                <div className="text-sm text-purple-600 font-bold mb-1">{isArabic ? "النتيجة النهائية" : "Final Score"}</div>
                                <div className="text-3xl font-black text-gray-900">{score}</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-2xl border border-green-100 min-w-[140px]">
                                <div className="text-sm text-green-600 font-bold mb-1">{isArabic ? "نقاط سحرية" : "Magic Bonus"}</div>
                                <div className="text-3xl font-black text-gray-900">+60</div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xl rounded-full shadow-lg shadow-purple-500/30 flex items-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" />
                                {isArabic ? "العب مرة أخرى" : "Play Again"}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

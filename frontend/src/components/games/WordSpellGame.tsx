"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Trophy, Star, RefreshCw, Sparkles, Lightbulb, CheckCircle, HelpCircle } from "lucide-react";
import { saveGameScore } from "@/lib/games/gameScores";

interface Riddle {
    questionEn: string;
    questionAr: string;
    optionsEn: string[];
    optionsAr: string[];
    correctIndex: number;
    hintEn: string;
    hintAr: string;
}

const RIDDLES: Riddle[] = [
    {
        questionEn: "When you present your new project idea clearly to inspire others, what skill are you practicing?",
        questionAr: "عندما تعرض فكرة مشروعك الجديد بوضوح لإلخام الآخرين، أي مهارة أنت تمارس؟",
        optionsEn: ["Leadership & Pitching", "Sleeping", "Hiding", "Forgetting"],
        optionsAr: ["القيادة وعرض الأفكار", "النوم والاسترخاء", "الانسحاب والتجاهل", "النسيان"],
        correctIndex: 0,
        hintEn: "It takes courage and passion to inspire a team!",
        hintAr: "تتطلب الشجاعة والشغف لإلهام وتحفيز فريقك!"
    },
    {
        questionEn: "In Magica Bazar, when both buyer and seller agree on a fair price where everyone wins, this is called...",
        questionAr: "في ماجيكا بازار، عندما يتفق البائع والمشتري على سعر عادل يرضي الجميع، يسمى هذا...",
        optionsEn: ["Argument", "Win-Win Negotiation", "Giving up", "Monopoly"],
        optionsAr: ["الجدال والصرف", "التفاوض الناجح للطرفين", "الانسحاب الفوري", "الاحتكار الصارم"],
        correctIndex: 1,
        hintEn: "Both sides leave smiling with value in hand.",
        hintAr: "يغادر الطرفان وهما سعداء بالقيمة التي حصلوا عليها."
    },
    {
        questionEn: "What is the true engine that turns a creative thought into a real operating business in Magica Camp?",
        questionAr: "ما هو المحرك الحقيقي الذي يحول الفكرة المبتكرة إلى مشروع حقيقي وناجح في معسكر ماجيكا؟",
        optionsEn: ["Wishing only", "Action & Perseverance", "Watching TV", "Complaining"],
        optionsAr: ["التمني فقط دون عمل", "التنفيذ والمثابرة", "مشاهدة التلفاز لفترات طويلة", "الشكوى المستمرة"],
        correctIndex: 1,
        hintEn: "Action speaks louder than dreams!",
        hintAr: "العمل والتنفيذ أهم بكثير من مجرد التمني!"
    },
    {
        questionEn: "If your first product experiment doesn't work as planned, what is the best entrepreneurial magic mindset?",
        questionAr: "إذا لم تنجح تجربة منتجك الأولى كما خططت لها، ما هي العقلية الريادية السحرية الصحيحة؟",
        optionsEn: ["Quit instantly", "Cry & blame others", "Learn, Pivot, and Try Again!", "Throw it away"],
        optionsAr: ["الاستسلام على الفور", "اللوم وبكاء الظروف", "التعلم من التجربة والمحاولة بذكاء!", "إلقاء اللوم على السوق"],
        correctIndex: 2,
        hintEn: "Every successful inventor learned from thousands of attempts!",
        hintAr: "كل مخترع وناجح تعلم الكثير من محاولاته وتجاربه!"
    },
    {
        questionEn: "Which Magica value gives you the superpower to trust your abilities when speaking in front of an audience?",
        questionAr: "أي قيمة في ماجيكا تمنحك القوة الخارقة للوثوق بقدراتك أثناء التحدث بثبات أمام الجمهور؟",
        optionsEn: ["Self-Confidence", "Fear & Hesitation", "Silence", "Randomness"],
        optionsAr: ["الثقة العالية بالنفس", "الخوف والتردد", "الصممت المطلق", "العشوائية دون تحضير"],
        correctIndex: 0,
        hintEn: "Believing in yourself is the first secret to success.",
        hintAr: "الإيمان بنفسك وبقدراتك هو السر الأول للنجاح والتألق."
    }
];

export default function WordSpellGame({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showHint, setShowHint] = useState<boolean>(false);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [earnedStars, setEarnedStars] = useState<number>(5);

    const handleSelect = (idx: number) => {
        if (selectedOption !== null) return; // already selected
        setSelectedOption(idx);

        const currentRiddle = RIDDLES[currentStep];
        const isCorrect = idx === currentRiddle.correctIndex;

        if (isCorrect) {
            const added = showHint ? 150 : 250;
            setScore((prev) => prev + added);
        }

        setTimeout(() => {
            if (currentStep < RIDDLES.length - 1) {
                setCurrentStep((prev) => prev + 1);
                setSelectedOption(null);
                setShowHint(false);
            } else {
                finishGame(score + (isCorrect ? (showHint ? 150 : 250) : 0));
            }
        }, 1300);
    };

    const finishGame = (finalScore: number) => {
        setIsComplete(true);
        let stars = 3;
        if (finalScore >= 1000) stars = 5;
        else if (finalScore >= 750) stars = 4;
        setEarnedStars(stars);
        saveGameScore("word-spell", finalScore, stars, 60);
    };

    const resetGame = () => {
        setCurrentStep(0);
        setScore(0);
        setSelectedOption(null);
        setShowHint(false);
        setIsComplete(false);
    };

    const riddle = RIDDLES[currentStep];

    return (
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
                <div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-800 flex items-center gap-2">
                        <BookOpen className="w-8 h-8 text-rose-500 animate-bounce" />
                        {isArabic ? "كلمات السحر والألغاز الريادية" : "Word Spells & Riddles"}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                        {isArabic
                            ? "اختبر ذكاءك اللغوي ومفاهيم ريادة الأعمال السحرية عبر الألغاز المواقفية!"
                            : "Test your entrepreneurial language intelligence and logical deduction!"}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-rose-50 px-5 py-2.5 rounded-2xl border border-rose-100 flex items-center gap-2 font-extrabold text-gray-800">
                        <span className="text-rose-600">{isArabic ? "اللغز:" : "Riddle:"}</span>
                        <span className="text-2xl">{currentStep + 1} / {RIDDLES.length}</span>
                    </div>
                    <div className="bg-gray-900 text-white px-5 py-2.5 rounded-2xl font-black text-xl shadow-md">
                        {score} <span className="text-xs text-rose-300 font-normal">{isArabic ? "نقطة" : "PTS"}</span>
                    </div>
                </div>
            </div>

            {/* Main Play Area */}
            {!isComplete ? (
                <div className="max-w-3xl mx-auto space-y-8 py-4">
                    {/* Question Banner */}
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 md:p-10 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-3xl shadow-xl relative overflow-hidden"
                    >
                        <Sparkles className="absolute top-4 right-4 w-24 h-24 text-white opacity-10 pointer-events-none" />
                        
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <span className="bg-white/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                {isArabic ? "تحدي القادة الشباب" : "Young Leader Riddle"}
                            </span>
                            
                            <button
                                onClick={() => setShowHint(true)}
                                className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-bold transition-colors text-amber-200"
                            >
                                <Lightbulb className="w-4 h-4" />
                                {isArabic ? "تلميح ذكاء" : "Use Hint"}
                            </button>
                        </div>

                        <h4 className="text-2xl md:text-3xl font-extrabold leading-relaxed text-balance drop-shadow-sm">
                            {isArabic ? riddle.questionAr : riddle.questionEn}
                        </h4>

                        {showHint && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-6 p-4 bg-black/20 rounded-2xl backdrop-blur-md border border-white/20 text-amber-100 flex items-center gap-3 text-sm font-semibold"
                            >
                                <Lightbulb className="w-5 h-5 text-yellow-300 shrink-0 animate-pulse" />
                                <span>{isArabic ? riddle.hintAr : riddle.hintEn}</span>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Options Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {(isArabic ? riddle.optionsAr : riddle.optionsEn).map((opt, i) => {
                            const isSelected = selectedOption === i;
                            const isCorrect = i === riddle.correctIndex;
                            let btnStyle = "bg-white hover:bg-rose-50 text-gray-800 border-gray-200";

                            if (selectedOption !== null) {
                                if (isCorrect) {
                                    btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg scale-[1.02]";
                                } else if (isSelected && !isCorrect) {
                                    btnStyle = "bg-rose-500 text-white border-rose-600 opacity-90";
                                } else {
                                    btnStyle = "bg-gray-50 text-gray-400 border-gray-100 opacity-50";
                                }
                            }

                            return (
                                <motion.button
                                    key={i}
                                    whileHover={selectedOption === null ? { scale: 1.02 } : {}}
                                    whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                                    onClick={() => handleSelect(i)}
                                    disabled={selectedOption !== null}
                                    className={`p-6 rounded-2xl border-2 text-start font-bold text-lg shadow-sm transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                                >
                                    <span>{opt}</span>
                                    {selectedOption !== null && isCorrect && (
                                        <CheckCircle className="w-6 h-6 shrink-0 text-white" />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                /* Victory Completed */
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 px-4 max-w-xl mx-auto space-y-6"
                >
                    <div className="w-24 h-24 bg-gradient-to-tr from-rose-500 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-xl text-white">
                        <Trophy className="w-12 h-12 fill-current" />
                    </div>

                    <h2 className="text-4xl font-black text-gray-800">
                        {isArabic ? "حكيم ماجيكا المفوه!" : "Master of Word Spells!"}
                    </h2>
                    <p className="text-gray-600 text-lg">
                        {isArabic
                            ? "أنهيت جميع الألغاز بنجاح وأثبتّ أنك تمتلك عقلية القيادي الذكي!"
                            : "You solved every riddle, proving your advanced leadership communication and logic!"}
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
                        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 min-w-[140px]">
                            <div className="text-sm text-rose-600 font-bold mb-1">{isArabic ? "إجمالي النقاط" : "Total Score"}</div>
                            <div className="text-3xl font-black text-gray-900">{score}</div>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 min-w-[140px]">
                            <div className="text-sm text-amber-600 font-bold mb-1">{isArabic ? "جائزة التميز" : "Excellence Bonus"}</div>
                            <div className="text-3xl font-black text-gray-900">+60 PTS</div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={resetGame}
                            className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xl rounded-full shadow-lg shadow-rose-500/30 flex items-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            {isArabic ? "إعادة الألغاز" : "Play Again"}
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

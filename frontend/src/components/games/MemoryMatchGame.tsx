"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, Trophy, Star, CheckCircle2 } from "lucide-react";
import { saveGameScore } from "@/lib/games/gameScores";
import { useAuth } from "@/context/AuthContext";

interface Card {
    id: number;
    symbol: string;
    labelEn: string;
    labelAr: string;
    color: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const EMBLEMS = [
    { symbol: "⛺", labelEn: "Magica Camp", labelAr: "ماجيكا كامب", color: "from-green-400 to-emerald-600" },
    { symbol: "🛍️", labelEn: "Magica Bazar", labelAr: "ماجيكا بازار", color: "from-orange-400 to-amber-600" },
    { symbol: "🍱", labelEn: "Magica Food", labelAr: "ماجيكا فود", color: "from-red-400 to-rose-600" },
    { symbol: "🎙️", labelEn: "Magica Podcast", labelAr: "ماجيكا بودكاست", color: "from-purple-400 to-indigo-600" },
    { symbol: "🦅", labelEn: "Magica Eagle", labelAr: "نسر ماجيكا", color: "from-blue-400 to-cyan-600" },
    { symbol: "✨", labelEn: "Magic Star", labelAr: "نجمة السحر", color: "from-yellow-400 to-amber-500" },
];

export default function MemoryMatchGame({ lang }: { lang: string }) {
    const { user } = useAuth();
    const isArabic = lang === "ar";
    const [cards, setCards] = useState<Card[]>([]);
    const [firstChoice, setFirstChoice] = useState<Card | null>(null);
    const [secondChoice, setSecondChoice] = useState<Card | null>(null);
    const [moves, setMoves] = useState<number>(0);
    const [matches, setMatches] = useState<number>(0);
    const [isWon, setIsWon] = useState<boolean>(false);
    const [earnedScore, setEarnedScore] = useState<number>(0);
    const [earnedStars, setEarnedStars] = useState<number>(3);

    // Initialize & shuffle deck
    const initializeGame = () => {
        const duplicated = [...EMBLEMS, ...EMBLEMS].map((item, index) => ({
            id: index,
            symbol: item.symbol,
            labelEn: item.labelEn,
            labelAr: item.labelAr,
            color: item.color,
            isFlipped: false,
            isMatched: false,
        }));

        // Shuffle array
        const shuffled = duplicated.sort(() => Math.random() - 0.5);

        setCards(shuffled);
        setFirstChoice(null);
        setSecondChoice(null);
        setMoves(0);
        setMatches(0);
        setIsWon(false);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    // Handle card click
    const handleCardClick = (card: Card) => {
        if (firstChoice && secondChoice) return;
        if (card.isFlipped || card.isMatched) return;

        // Flip card in state
        setCards((prev) =>
            prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
        );

        if (!firstChoice) {
            setFirstChoice(card);
        } else {
            setSecondChoice(card);
            setMoves((prev) => prev + 1);
        }
    };

    // Check for match
    useEffect(() => {
        if (firstChoice && secondChoice) {
            if (firstChoice.symbol === secondChoice.symbol) {
                setCards((prev) =>
                    prev.map((card) =>
                        card.symbol === firstChoice.symbol
                            ? { ...card, isMatched: true }
                            : card
                    )
                );
                setMatches((prev) => prev + 1);
                resetTurn();
            } else {
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((card) =>
                            card.id === firstChoice.id || card.id === secondChoice.id
                                ? { ...card, isFlipped: false }
                                : card
                        )
                    );
                    resetTurn();
                }, 1000);
            }
        }
    }, [firstChoice, secondChoice]);

    const resetTurn = () => {
        setFirstChoice(null);
        setSecondChoice(null);
    };

    // Handle win condition
    useEffect(() => {
        if (matches === 6 && matches > 0) {
            let stars = 3;
            let score = 750;

            if (moves <= 8) {
                stars = 5;
                score = 1250;
            } else if (moves <= 12) {
                stars = 4;
                score = 950;
            }

            setEarnedStars(stars);
            setEarnedScore(score);
            setIsWon(true);
            saveGameScore(user?.uid || "", "memory-match", score, stars, 50);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matches, moves]);

    return (
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Header Info */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
                <div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-800 flex items-center gap-2">
                        <Sparkles className="w-7 h-7 text-orange-500 animate-pulse" />
                        {isArabic ? "ذاكرة ماجيكا السحرية" : "Magica Memory Match"}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                        {isArabic
                            ? "اكتشف تطابق جميع رموز عالم ماجيكا بأقل عدد من المحاولات!"
                            : "Match all pairs of Magica world emblems in as few moves as possible!"}
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="bg-orange-50 px-5 py-2.5 rounded-2xl border border-orange-100 flex items-center gap-3 font-extrabold text-gray-800">
                        <span className="text-orange-500">{isArabic ? "المحاولات:" : "Moves:"}</span>
                        <span className="text-2xl">{moves}</span>
                    </div>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={initializeGame}
                        className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-md transition-all"
                        title={isArabic ? "إعادة اللعب" : "Restart Game"}
                    >
                        <RefreshCw className="w-5 h-5" />
                        <span className="hidden sm:inline">{isArabic ? "إعادة" : "Reset"}</span>
                    </motion.button>
                </div>
            </div>

            {/* Victory Banner Modal */}
            <AnimatePresence>
                {isWon && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 z-30 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center rounded-3xl"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
                            className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl mb-6 text-white"
                        >
                            <Trophy className="w-12 h-12 fill-current" />
                        </motion.div>

                        <h2 className="text-4xl font-black text-gray-800 mb-2">
                            {isArabic ? "أداء سحري مذهل!" : "Magical Victory!"}
                        </h2>
                        <p className="text-gray-600 max-w-md text-lg mb-6">
                            {isArabic
                                ? `أحرزت تقدمًا ممتازًا وأكملت التحدي في ${moves} محاولة فقط!`
                                : `You mastered visual focus and completed the matching in just ${moves} moves!`}
                        </p>

                        <div className="flex justify-center gap-2 mb-8">
                            {[...Array(5)].map((_, idx) => (
                                <Star
                                    key={idx}
                                    className={`w-9 h-9 ${
                                        idx < earnedStars
                                            ? "text-yellow-400 fill-current drop-shadow-md"
                                            : "text-gray-200"
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="flex gap-6 mb-8 text-center">
                            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 min-w-[120px]">
                                <div className="text-sm text-orange-600 font-bold mb-1">{isArabic ? "النقاط المسجلة" : "Score Earned"}</div>
                                <div className="text-3xl font-black text-gray-800">+{earnedScore}</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-2xl border border-green-100 min-w-[120px]">
                                <div className="text-sm text-green-600 font-bold mb-1">{isArabic ? "نقاط ماجيكا الإضافية" : "Magic Points"}</div>
                                <div className="text-3xl font-black text-gray-800">+50</div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={initializeGame}
                            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-xl rounded-full shadow-lg shadow-orange-500/30 hover:brightness-110 transition-all"
                        >
                            {isArabic ? "العب مرة أخرى!" : "Play Again!"}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Game Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                {cards.map((card) => (
                    <motion.div
                        key={card.id}
                        whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.03 }}
                        whileTap={{ scale: card.isFlipped || card.isMatched ? 1 : 0.97 }}
                        onClick={() => handleCardClick(card)}
                        className="aspect-square cursor-pointer perspective"
                    >
                        <div
                            className={`w-full h-full rounded-2xl shadow-md transition-all duration-300 flex flex-col items-center justify-center p-4 relative select-none border border-gray-100 ${
                                card.isFlipped || card.isMatched
                                    ? `bg-gradient-to-br ${card.color} text-white shadow-lg`
                                    : "bg-gradient-to-tr from-gray-50 to-orange-50 hover:from-orange-100 hover:to-orange-50 text-gray-400 hover:text-orange-500 border-2 border-dashed border-gray-200"
                            }`}
                        >
                            {card.isFlipped || card.isMatched ? (
                                <motion.div
                                    initial={{ scale: 0.4, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", bounce: 0.5 }}
                                    className="flex flex-col items-center text-center gap-2"
                                >
                                    <span className="text-4xl md:text-5xl drop-shadow-sm">{card.symbol}</span>
                                    <span className="text-xs md:text-sm font-bold text-white tracking-tight drop-shadow">
                                        {isArabic ? card.labelAr : card.labelEn}
                                    </span>
                                    {card.isMatched && (
                                        <CheckCircle2 className="w-6 h-6 text-white absolute top-2 right-2 opacity-80" />
                                    )}
                                </motion.div>
                            ) : (
                                <div className="text-3xl font-black text-orange-400 opacity-60">❓</div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

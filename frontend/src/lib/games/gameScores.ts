export interface GameInfo {
    id: string;
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
    skillEn: string;
    skillAr: string;
    color: string;
    bgGradient: string;
    iconName: string;
}

export interface GameScore {
    gameId: string;
    bestScore: number;
    stars: number; // 0 to 5 stars
    playsCount: number;
    lastPlayed?: string;
}

export const ALL_GAMES_INFO: GameInfo[] = [
    {
        id: "memory-match",
        titleEn: "Magica Memory Match",
        titleAr: "ذاكرة ماجيكا السحرية",
        descEn: "Flip magical emblems and test your visual recall across the Magica Zone.",
        descAr: "اقلب البطاقات واختبر ذاكرتك البصرية مع رموز عالم ماجيكا السحري.",
        skillEn: "Visual Memory & Retention",
        skillAr: "الذاكرة البصرية والتركيز",
        color: "from-orange-500 to-amber-500",
        bgGradient: "bg-orange-500/10 border-orange-500/20 text-orange-600",
        iconName: "Brain"
    },
    {
        id: "math-alchemy",
        titleEn: "Math Alchemy",
        titleAr: "كيمياء الأرقام السحرية",
        descEn: "Solve quick magical equations to mix potent mental arithmetic potions.",
        descAr: "حل المعادلات السحرية السريعة لتحضير جرعات الحساب الذهني الفائقة.",
        skillEn: "Mental Arithmetic & Calculation",
        skillAr: "الحساب الذهني والسرعة",
        color: "from-purple-600 to-indigo-600",
        bgGradient: "bg-purple-500/10 border-purple-500/20 text-purple-600",
        iconName: "FlaskConical"
    },
    {
        id: "pattern-seer",
        titleEn: "Pattern Seer",
        titleAr: "العراف وعين النماذج",
        descEn: "Watch glowing magical sequences and repeat the pattern before the crystals fade.",
        descAr: "راقب التسلسل الضوئي السحري وكرره بدقة قبل أن يخبو وهج البلورات.",
        skillEn: "Sequential & Short-term Memory",
        skillAr: "الذاكرة المتسلسلة والانتباه",
        color: "from-emerald-500 to-teal-600",
        bgGradient: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600",
        iconName: "Sparkles"
    },
    {
        id: "word-spell",
        titleEn: "Word Spells & Riddles",
        titleAr: "كلمات السحر والألغاز",
        descEn: "Unscramble vocabulary spells and solve mind-bending entrepreneurial riddles.",
        descAr: "فك طلاسم الكلمات الريادية وحل الألغاز الذكية لشحذ تفكيرك اللغوي.",
        skillEn: "Vocabulary & Critical Deduction",
        skillAr: "الحصيلة اللغوية والاستنتاج المنطقي",
        color: "from-rose-500 to-pink-600",
        bgGradient: "bg-rose-500/10 border-rose-500/20 text-rose-600",
        iconName: "BookOpen"
    },
    {
        id: "spatial-mosaic",
        titleEn: "Spatial Mosaic",
        titleAr: "فسيفساء الأشكال السحرية",
        descEn: "Spot matching shadow transformations and solve geometric shield puzzles.",
        descAr: "اكتشف تطابق الظلال ومكعبات الهندسة السحرية لإكمال أشكال ماجيكا.",
        skillEn: "Spatial Reasoning & Geometry",
        skillAr: "الإدراك المكاني والهندسة البصرية",
        color: "from-blue-500 to-cyan-600",
        bgGradient: "bg-blue-500/10 border-blue-500/20 text-blue-600",
        iconName: "Shapes"
    }
];

// Initial mock scores to give immediate engaging visual flair on first load
const INITIAL_SCORES: Record<string, GameScore> = {
    "memory-match": { gameId: "memory-match", bestScore: 850, stars: 4, playsCount: 5, lastPlayed: "Today" },
    "math-alchemy": { gameId: "math-alchemy", bestScore: 1200, stars: 5, playsCount: 8, lastPlayed: "Yesterday" },
    "pattern-seer": { gameId: "pattern-seer", bestScore: 640, stars: 3, playsCount: 3, lastPlayed: "2 days ago" },
    "word-spell": { gameId: "word-spell", bestScore: 920, stars: 4, playsCount: 6, lastPlayed: "Today" },
    "spatial-mosaic": { gameId: "spatial-mosaic", bestScore: 780, stars: 4, playsCount: 4, lastPlayed: "Yesterday" }
};

export async function getKidGameScores(userId?: string): Promise<Record<string, GameScore>> {
    if (!userId) return INITIAL_SCORES;
    try {
        const res = await fetch(`/api/users/${userId}`);
        if (res.ok) {
            const data = await res.json();
            if (data.gameScores) {
                return data.gameScores;
            }
        }
        return INITIAL_SCORES;
    } catch (e) {
        console.error("Failed to read game scores from MongoDB", e);
        return INITIAL_SCORES;
    }
}

export async function saveGameScore(userId: string, gameId: string, newScore: number, earnedStars: number, pointsAdded: number = 50): Promise<void> {
    if (!userId) return;
    try {
        const res = await fetch(`/api/users/${userId}`);
        let currentScores = { ...INITIAL_SCORES };
        let currentPoints = 350;

        if (res.ok) {
            const data = await res.json();
            if (data.gameScores) currentScores = data.gameScores;
            if (data.points !== undefined) currentPoints = data.points;
        }

        const existing = currentScores[gameId] || { gameId, bestScore: 0, stars: 0, playsCount: 0 };

        const updatedScore: GameScore = {
            gameId,
            bestScore: Math.max(existing.bestScore, newScore),
            stars: Math.max(existing.stars, earnedStars),
            playsCount: existing.playsCount + 1,
            lastPlayed: "Just now"
        };

        currentScores[gameId] = updatedScore;
        const newPoints = currentPoints + pointsAdded;

        await fetch(`/api/users/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameScores: currentScores, points: newPoints })
        });

        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("magica-scores-updated"));
        }
    } catch (e) {
        console.error("Failed to save game score to MongoDB", e);
    }
}

export async function getTotalMagicPoints(userId?: string): Promise<number> {
    if (!userId) return 350;
    try {
        const res = await fetch(`/api/users/${userId}`);
        if (res.ok) {
            const data = await res.json();
            if (data.points !== undefined) {
                return data.points;
            }
        }
        return 350;
    } catch (e) {
        return 350;
    }
}

export async function resetGameScores(userId: string): Promise<void> {
    if (!userId) return;
    try {
        await fetch(`/api/users/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameScores: INITIAL_SCORES, points: 350 })
        });
        
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("magica-scores-updated"));
        }
    } catch(e) {
        console.error("Error resetting game scores", e);
    }
}

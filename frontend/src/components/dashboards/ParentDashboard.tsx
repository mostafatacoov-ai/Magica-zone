"use client";

import { motion } from "framer-motion";
import { Plus, X, Calendar, Award, Brain, Star, Sparkles, TrendingUp, ChevronDown, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { getKidGameScores, ALL_GAMES_INFO, GameScore } from "@/lib/games/gameScores";
import Link from "next/link";

interface ChildInfo {
    id: number;
    name: string;
    age: number;
    points: number;
    nextCamp: string;
    skills: { nameEn: string; nameAr: string; progress: number; color: string }[];
}

const initialChildren: ChildInfo[] = [
    {
        id: 1,
        name: "Omar",
        age: 10,
        points: 450,
        nextCamp: "Robotics Intro & Tech",
        skills: [
            { nameEn: "Visual Memory", nameAr: "الذاكرة البصرية", progress: 92, color: "bg-orange-500" },
            { nameEn: "Mental Arithmetic", nameAr: "الحساب الذهني الفوري", progress: 88, color: "bg-purple-500" },
            { nameEn: "Logical Deduction", nameAr: "الاستنتاج والتفكير المنطقي", progress: 95, color: "bg-emerald-500" },
            { nameEn: "Spatial Reasoning", nameAr: "الإدراك المكاني والهندسة", progress: 84, color: "bg-blue-500" },
        ]
    },
    {
        id: 2,
        name: "Laila",
        age: 8,
        points: 520,
        nextCamp: "Magica Art & Entrepreneurship",
        skills: [
            { nameEn: "Visual Memory", nameAr: "الذاكرة البصرية", progress: 96, color: "bg-orange-500" },
            { nameEn: "Mental Arithmetic", nameAr: "الحساب الذهني الفوري", progress: 90, color: "bg-purple-500" },
            { nameEn: "Logical Deduction", nameAr: "الاستنتاج والتفكير المنطقي", progress: 89, color: "bg-emerald-500" },
            { nameEn: "Spatial Reasoning", nameAr: "الإدراك المكاني والهندسة", progress: 92, color: "bg-blue-500" },
        ]
    },
];

export default function ParentDashboard({ lang }: { lang: string }) {
    const isArabic = lang === 'ar';
    const [children, setChildren] = useState<ChildInfo[]>(initialChildren);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gameScores, setGameScores] = useState<Record<string, GameScore>>({});
    const [expandedChildId, setExpandedChildId] = useState<number | null>(1);

    useEffect(() => {
        const fetchScores = async () => {
            // Ideally we pass the specific child's userId here
            setGameScores(await getKidGameScores());
        };
        fetchScores();
        
        const handleUpdate = () => fetchScores();
        window.addEventListener("magica-scores-updated", handleUpdate);
        return () => window.removeEventListener("magica-scores-updated", handleUpdate);
    }, []);

    return (
        <div className="space-y-8">
            {/* Header / Add Child */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-800 flex items-center gap-2">
                        <Award className="w-8 h-8 text-orange-500" />
                        {isArabic ? "أطفالي ومتابعة النمو الإدراكي" : "My Children & Cognitive Progress"}
                    </h2>
                    <p className="text-gray-500 mt-1 text-sm md:text-base font-medium">
                        {isArabic
                            ? "متابعة دقيقة لنشاط أطفالك، نقاطهم السحرية، ونتائجهم الفورية في الألعاب الذهنية:"
                            : "Detailed real-time monitoring of your children's activities, magic points, and mind game high scores:"}
                    </p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-extrabold hover:brightness-110 transition-all shadow-lg shadow-orange-500/30 shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    {isArabic ? "إضافة طفل" : "Add a Child"}
                </button>
            </div>

            {/* Children Cards */}
            <div className="grid grid-cols-1 gap-8">
                {children.map((child) => {
                    const isExpanded = expandedChildId === child.id;

                    return (
                        <motion.div
                            key={child.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 md:p-8 bg-white rounded-3xl shadow-xl shadow-gray-100/70 border border-gray-100 relative overflow-hidden transition-all"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-50 to-transparent rounded-bl-full pointer-events-none" />
                            
                            {/* Primary Child Header Info */}
                            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 via-amber-500 to-purple-600 text-white rounded-2xl flex items-center justify-center text-4xl font-black shadow-lg">
                                        {child.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-2xl font-black text-gray-900">{child.name}</h3>
                                            <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-xs font-black flex items-center gap-1">
                                                <CheckCircle className="w-3.5 h-3.5" />
                                                {isArabic ? "نشط الآن" : "Active Now"}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 font-bold text-sm mt-1">
                                            {isArabic ? "العمر:" : "Age:"} {child.age} {isArabic ? "سنوات" : "Years old"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-50 px-5 py-3 rounded-2xl border border-orange-100 text-center">
                                        <span className="text-xs text-orange-600 font-extrabold block uppercase tracking-wide">
                                            {isArabic ? "مجموع النقاط" : "Magic Points"}
                                        </span>
                                        <span className="text-2xl font-black text-gray-900">{child.points}</span>
                                    </div>
                                    <div className="bg-blue-50 px-5 py-3 rounded-2xl border border-blue-100 text-center hidden md:block">
                                        <span className="text-xs text-blue-600 font-extrabold block uppercase tracking-wide">
                                            {isArabic ? "المعسكر القادم" : "Next Camp"}
                                        </span>
                                        <span className="text-sm font-black text-gray-800 block truncate max-w-[150px]">{child.nextCamp}</span>
                                    </div>
                                    <button
                                        onClick={() => setExpandedChildId(isExpanded ? null : child.id)}
                                        className="p-3 rounded-2xl bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-orange-600 font-bold transition-colors border border-gray-200/60"
                                        title={isArabic ? "عرض تفاصيل الألعاب والمهارات" : "View Mind Games Details"}
                                    >
                                        <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "rotate-180 text-orange-500" : ""}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Mind Games & Cognitive Stats Section */}
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    transition={{ duration: 0.3 }}
                                    className="relative z-10 pt-6 space-y-8"
                                >
                                    {/* Section Title */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100/80">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-white rounded-xl shadow-sm text-purple-600">
                                                <Brain className="w-6 h-6 animate-pulse" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-black text-gray-800">
                                                    {isArabic ? "تقرير التطور الإدراكي وأداء الألعاب الذهنية" : "Mind Games Performance & Cognitive Evaluation"}
                                                </h4>
                                                <p className="text-xs text-gray-500 font-semibold">
                                                    {isArabic
                                                        ? `تحليل الأداء الذهني والمهاري المباشر للطفل (${child.name}):`
                                                        : `Live cognitive skill analysis & game high scores for (${child.name}):`}
                                                </p>
                                            </div>
                                        </div>
                                        <Link href={`/${lang}/magic-games`} className="text-xs font-black text-orange-600 hover:underline flex items-center gap-1">
                                            <span>{isArabic ? "استكشف الألعاب الذهنية" : "Explore Mind Games"}</span>
                                        </Link>
                                    </div>

                                    {/* Skills Progress Meters */}
                                    <div>
                                        <h5 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-orange-500" />
                                            <span>{isArabic ? "مؤشرات الكفاءة الذهنية المكتسبة:" : "Acquired Cognitive Proficiency Meters:"}</span>
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {child.skills.map((skill, idx) => (
                                                <div key={idx} className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
                                                    <div className="flex justify-between font-extrabold text-sm mb-2 text-gray-800">
                                                        <span>{isArabic ? skill.nameAr : skill.nameEn}</span>
                                                        <span className="text-orange-600 font-black">{skill.progress}%</span>
                                                    </div>
                                                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${skill.progress}%` }}
                                                            transition={{ duration: 1, ease: "easeOut" }}
                                                            className={`h-full ${skill.color} rounded-full`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Individual Games Scores Table/Cards */}
                                    <div>
                                        <h5 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-purple-600" />
                                            <span>{isArabic ? "سجل نتائج الألعاب الذهنية الخمس:" : "Record of 5 Magica Mind Games:"}</span>
                                        </h5>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                            {ALL_GAMES_INFO.map((g) => {
                                                const score = gameScores[g.id] || { bestScore: (Math.floor(Math.random() * 4) + 6) * 100, stars: 4, playsCount: 5 };
                                                
                                                return (
                                                    <div
                                                        key={g.id}
                                                        className="p-4 rounded-2xl bg-white border border-gray-150 hover:border-orange-200 transition-all text-center flex flex-col justify-between shadow-sm"
                                                    >
                                                        <div>
                                                            <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2 font-black ${g.bgGradient}`}>
                                                                ✦
                                                            </div>
                                                            <div className="text-xs font-black text-gray-800 line-clamp-1 mb-1">
                                                                {isArabic ? g.titleAr : g.titleEn}
                                                            </div>
                                                            <div className="text-[11px] font-bold text-orange-500 mb-2">
                                                                {score.bestScore} {isArabic ? "نقطة" : "PTS"}
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-center gap-0.5 pt-2 border-t border-gray-100">
                                                            {[...Array(5)].map((_, sI) => (
                                                                <Star
                                                                    key={sI}
                                                                    className={`w-3 h-3 ${
                                                                        sI < score.stars
                                                                            ? "text-yellow-400 fill-current"
                                                                            : "text-gray-200"
                                                                    }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Modal for Adding Child */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative border border-gray-100"
                    >
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
                            <X className="w-6 h-6" />
                        </button>
                        <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
                            <Plus className="w-7 h-7 text-orange-500" />
                            {isArabic ? "إضافة طفل جديد" : "Add a New Child"}
                        </h2>
                        <form onSubmit={(e) => { 
                            e.preventDefault(); 
                            const form = e.target as HTMLFormElement;
                            const nameInput = (form.elements.namedItem('childName') as HTMLInputElement).value;
                            const ageInput = parseInt((form.elements.namedItem('childAge') as HTMLInputElement).value) || 8;
                            
                            setChildren(prev => [...prev, {
                                id: Date.now(),
                                name: nameInput,
                                age: ageInput,
                                points: 250,
                                nextCamp: "Magica Starter Camp",
                                skills: [
                                    { nameEn: "Visual Memory", nameAr: "الذاكرة البصرية", progress: 85, color: "bg-orange-500" },
                                    { nameEn: "Mental Arithmetic", nameAr: "الحساب الذهني الفوري", progress: 80, color: "bg-purple-500" },
                                    { nameEn: "Logical Deduction", nameAr: "الاستنتاج والتفكير المنطقي", progress: 85, color: "bg-emerald-500" },
                                    { nameEn: "Spatial Reasoning", nameAr: "الإدراك المكاني والهندسة", progress: 82, color: "bg-blue-500" },
                                ]
                            }]);
                            setIsModalOpen(false); 
                        }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{isArabic ? "الاسم الكامل للطفل" : "Child Full Name"}</label>
                                <input name="childName" required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 outline-none font-medium" placeholder={isArabic ? "مثال: يوسف خالد" : "e.g. Youssef Khaled"} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{isArabic ? "العمر" : "Age"}</label>
                                <input name="childAge" required type="number" min="5" max="16" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 outline-none font-medium" defaultValue="9" />
                            </div>
                            <button type="submit" className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-extrabold hover:brightness-110 transition-all mt-6 text-lg shadow-lg shadow-orange-500/30">
                                {isArabic ? "إنشاء الحساب وبدء التتبع" : "Create Account & Start Tracking"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

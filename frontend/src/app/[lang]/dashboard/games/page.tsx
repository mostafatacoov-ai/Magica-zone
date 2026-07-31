"use client";

import React from "react";
import Link from "next/link";
import { Gamepad2, Sparkles, Trophy, ArrowRight } from "lucide-react";
import MathAlchemyGame from "@/components/games/MathAlchemyGame";

export default function DashboardGamesPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-16" dir={isArabic ? "rtl" : "ltr"}>
            {/* Banner */}
            <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-purple-800/50">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/30 shrink-0">
                        <Gamepad2 className="w-9 h-9 animate-pulse" />
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black mb-2 uppercase tracking-wide border border-purple-500/30">
                            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                            {isArabic ? "صالة الألعاب الذهنية" : "Cognitive Gaming Hall"}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                            {isArabic ? "ألعاب التحدي الذهني والذكاء" : "Mind Games & Cognitive Alchemy"}
                        </h1>
                        <p className="text-purple-200 text-sm mt-1 font-medium max-w-lg">
                            {isArabic ? "العب، تحدَ قدراتك الذهنية، واكسب النقاط الملكية والشارات الذهبية فوريًا." : "Play educational cognitive trials, solve arithmetic puzzles, and unlock reward tiers."}
                        </p>
                    </div>
                </div>

                <Link 
                    href={`/${lang}/magic-games`}
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-950 font-black px-7 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2 text-sm shrink-0"
                >
                    <span>{isArabic ? "تصفح مكتبة الألعاب الكاملة" : "Explore Complete Game Catalog"}</span>
                    <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                </Link>
            </div>

            {/* Live Interactive Game Component */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">⚡</span>
                        <h2 className="text-2xl font-black text-gray-900">{isArabic ? "تحدي الخيمياء والحساب السريع" : "Math Alchemy Blitz Challenge"}</h2>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3 py-1.5 rounded-full border border-emerald-200">
                        {isArabic ? "متاح للعب الآني" : "Ready to Play"}
                    </span>
                </div>
                
                <MathAlchemyGame lang={lang} />
            </div>
        </div>
    );
}

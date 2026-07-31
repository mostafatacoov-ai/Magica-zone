"use client";

import React from "react";
import ChildDashboard from "@/components/dashboards/ChildDashboard";
import { Medal, Sparkles } from "lucide-react";

export default function PointsPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';
    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-16" dir={isArabic ? "rtl" : "ltr"}>
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 rounded-3xl text-white shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                    <Medal className="w-7 h-7 animate-bounce" />
                </div>
                <div>
                    <h1 className="text-2xl font-black">{isArabic ? "أرصدة النقاط الذهبية والمكافآت" : "Magic Golden Points & Rewards"}</h1>
                    <p className="text-amber-100 text-sm font-medium">{isArabic ? "استعرض النقاط المكتسبة، تصنيفات الأبطال، والشارات الذهبية حاليًا." : "Check earned golden points, leaderboards, and unlocks."}</p>
                </div>
            </div>
            <ChildDashboard lang={lang} />
        </div>
    );
}

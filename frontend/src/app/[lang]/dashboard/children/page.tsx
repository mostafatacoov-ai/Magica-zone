"use client";

import React from "react";
import ParentDashboard from "@/components/dashboards/ParentDashboard";
import { Heart, Users } from "lucide-react";

export default function ChildrenPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';
    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-16" dir={isArabic ? "rtl" : "ltr"}>
            <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-gray-900">{isArabic ? "أطفالي المسجلين في المعسكر" : "My Enrolled Children"}</h1>
                    <p className="text-gray-500 text-sm font-medium">{isArabic ? "متابعة تقدم الأطفال، الأرصدة، والحضور اليومي دائمًا." : "Track children academic progress, reward balances, and daily schedules."}</p>
                </div>
            </div>
            <ParentDashboard lang={lang} />
        </div>
    );
}

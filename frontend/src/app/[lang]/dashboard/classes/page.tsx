"use client";

import React from "react";
import TeacherDashboard from "@/components/dashboards/TeacherDashboard";
import { GraduationCap } from "lucide-react";

export default function ClassesPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';
    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-16" dir={isArabic ? "rtl" : "ltr"}>
            <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-gray-900">{isArabic ? "إدارة الفصول والطلاب" : "My Classes & Students"}</h1>
                    <p className="text-gray-500 text-sm font-medium">{isArabic ? "متابعة الحضور، النقاط، والمحتوى التعليمي للمدربين حاليًا." : "Manage academic sessions, attendance, and student rewards."}</p>
                </div>
            </div>
            <TeacherDashboard lang={lang} />
        </div>
    );
}

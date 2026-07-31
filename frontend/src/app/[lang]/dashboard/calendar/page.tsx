"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { 
    CalendarDays, Clock, MapPin, Plus, CheckCircle2, 
    Sparkles, Filter, Users, GraduationCap, Tent, Gamepad2 
} from "lucide-react";

interface ScheduleEvent {
    id: string;
    titleEn: string;
    titleAr: string;
    date: string;
    timeEn: string;
    timeAr: string;
    category: "camp" | "course" | "workshop" | "game";
    locationEn: string;
    locationAr: string;
    statusEn: string;
    statusAr: string;
}

const INITIAL_EVENTS: ScheduleEvent[] = [
    {
        id: "ev-1",
        titleEn: "Magica Innovation Camp - Phase 1 Launch",
        titleAr: "افتتاح معسكر ماجيكا للابتكار الملكي (المرحلة الأولى)",
        date: "2026-08-05",
        timeEn: "09:00 AM - 03:00 PM",
        timeAr: "٠٩:٠٠ صباحًا - ٠٣:٠٠ عصراً",
        category: "camp",
        locationEn: "Main Innovation Campus, Cairo",
        locationAr: "الحرم الرئيسي للابتكار بالقاهرة",
        statusEn: "Confirmed & Open",
        statusAr: "مؤكد ومفتوح للتسجيل"
    },
    {
        id: "ev-2",
        titleEn: "Mental Math & Cognitive Alchemy Workshop",
        titleAr: "ورشة عمل الحساب الذهني الخيمياء المعرفية",
        date: "2026-08-08",
        timeEn: "01:00 PM - 04:00 PM",
        timeAr: "٠١:٠٠ ظهرًا - ٠٤:٠٠ عصراً",
        category: "course",
        locationEn: "STEM Lab B • Online Interactive Hybrid",
        locationAr: "قاعة العلوم B • بث مباشر تفاعلي",
        statusEn: "Few Seats Left",
        statusAr: "مقاعد محدودة متبقية"
    },
    {
        id: "ev-3",
        titleEn: "Robotics Arena & Championship Trials",
        titleAr: "بطولة الروبوتات وتحديات التفكير الإنشائي",
        date: "2026-08-12",
        timeEn: "10:30 AM - 02:00 PM",
        timeAr: "١٠:٣٠ صباحًا - ٠٢:٠٠ ظهرًا",
        category: "game",
        locationEn: "Magica Arena Hall",
        locationAr: "القاعة الكبرى للمسابقات والتحديات",
        statusEn: "Tournament Day",
        statusAr: "يوم البطولة المفتوحة"
    },
    {
        id: "ev-4",
        titleEn: "Parents Guidance & Progress Consultations",
        titleAr: "جلسات التقييم والتوجيه الأسري لأولياء الأمور",
        date: "2026-08-15",
        timeEn: "05:00 PM - 08:00 PM",
        timeAr: "٠٥:٠٠ مساءً - ٠٨:٠٠ مساءً",
        category: "workshop",
        locationEn: "Executive Conference Rooms / Zoom",
        locationAr: "قاعات المؤتمرات التنفيذية / اجتماعات عبر الإنترنت",
        statusEn: "By Appointment",
        statusAr: "بحجز مسبق ومواعيد مخصصة"
    }
];

export default function CalendarPage({ params: { lang } }: { params: { lang: string } }) {
    const { role } = useAuth();
    const isArabic = lang === 'ar';
    const [events, setEvents] = useState<ScheduleEvent[]>(INITIAL_EVENTS);
    const [activeFilter, setActiveFilter] = useState<string>("all");

    const filteredEvents = activeFilter === "all" ? events : events.filter(e => e.category === activeFilter);

    function getCategoryBadge(cat: ScheduleEvent["category"]) {
        switch (cat) {
            case "camp":
                return { label: isArabic ? "معسكر تدريبي" : "Camp", bg: "bg-orange-100 text-orange-800 border-orange-200", icon: Tent };
            case "course":
                return { label: isArabic ? "دورة تعليمية" : "Course", bg: "bg-blue-100 text-blue-800 border-blue-200", icon: GraduationCap };
            case "game":
                return { label: isArabic ? "بطولة وتحدي" : "Tournament", bg: "bg-purple-100 text-purple-800 border-purple-200", icon: Gamepad2 };
            default:
                return { label: isArabic ? "ورشة / مؤتمر" : "Workshop", bg: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: Users };
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-16" dir={isArabic ? "rtl" : "ltr"}>
            {/* Header banner */}
            <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-800 text-white relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 shrink-0">
                        <CalendarDays className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-black mb-2 uppercase tracking-wide">
                            <Clock className="w-3.5 h-3.5" />
                            {isArabic ? "الجدول والمواعيد الرسمية" : "Academic & Activity Schedule"}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                            {isArabic ? "جدول الفعاليات والمعسكرات" : "Events & Camp Calendar"}
                        </h1>
                        <p className="text-gray-300 text-sm mt-1 font-medium max-w-xl">
                            {isArabic 
                                ? "تابع المواعيد، انطلاق المعسكرات التعليمية، ورش عمل الحساب الذهني، وجلسات القياس الذهني حاليًا."
                                : "Keep track of upcoming workshop sessions, camp launch dates, tournaments, and guidance meetings in real time."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Filter Toolbar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                {[
                    { id: "all", label: isArabic ? "جميع الفعاليات" : "All Events" },
                    { id: "camp", label: isArabic ? "المعسكرات التدريبية" : "Camps" },
                    { id: "course", label: isArabic ? "البرامج والمسارات" : "Courses" },
                    { id: "game", label: isArabic ? "البطولات والألعاب" : "Tournaments" },
                    { id: "workshop", label: isArabic ? "ورش العمل والمؤتمرات" : "Workshops" },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveFilter(tab.id)}
                        className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all shrink-0 ${
                            activeFilter === tab.id
                                ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105"
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Events List */}
            <div className="space-y-4">
                {filteredEvents.map((ev, idx) => {
                    const badge = getCategoryBadge(ev.category);
                    const BadgeIcon = badge.icon;
                    const dateObj = new Date(ev.date);
                    const monthName = dateObj.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', { month: 'short' });
                    const dayNum = dateObj.getDate() || ev.date.split('-')[2];

                    return (
                        <motion.div
                            key={ev.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.01 }}
                            className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-md hover:shadow-xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
                        >
                            <div className="flex items-start sm:items-center gap-5">
                                {/* Date Badge */}
                                <div className="w-16 h-18 rounded-2xl bg-gradient-to-b from-slate-900 to-gray-800 text-white flex flex-col items-center justify-center shadow-lg shrink-0 py-3">
                                    <span className="text-[11px] font-black uppercase text-orange-400 tracking-wider">{monthName}</span>
                                    <span className="text-2xl font-black">{dayNum}</span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-black border ${badge.bg}`}>
                                            <BadgeIcon className="w-3.5 h-3.5" />
                                            <span>{badge.label}</span>
                                        </span>
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                                            ✔ {isArabic ? ev.statusAr : ev.statusEn}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-600 transition-colors">
                                        {isArabic ? ev.titleAr : ev.titleEn}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-4 text-gray-500 text-xs font-semibold pt-1">
                                        <span className="flex items-center gap-1 text-gray-600 font-bold">
                                            <Clock className="w-3.5 h-3.5 text-orange-500" />
                                            <span>{isArabic ? ev.timeAr : ev.timeEn}</span>
                                        </span>
                                        <span className="flex items-center gap-1 text-gray-600 font-bold">
                                            <MapPin className="w-3.5 h-3.5 text-rose-500" />
                                            <span>{isArabic ? ev.locationAr : ev.locationEn}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100 flex items-center justify-end">
                                <button className="w-full sm:w-auto bg-gray-100 hover:bg-orange-50 text-gray-800 hover:text-orange-600 font-black px-6 py-3 rounded-2xl transition-all text-xs sm:text-sm">
                                    {isArabic ? "تفاصيل التسجيل والمشاركة" : "Event & Session Details"}
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

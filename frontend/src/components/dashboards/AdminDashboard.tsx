"use client";

import { useState } from "react";
import { 
    LayoutDashboard, Globe, BookOpen, Tent, Store, 
    Mic, Utensils, Shirt, Wrench, Gamepad2, Shield, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import modular section editors
import OverviewSection from "@/components/admin/sections/OverviewSection";
import HeroEditorSection from "@/components/admin/sections/HeroEditorSection";
import CoursesEditorSection from "@/components/admin/sections/CoursesEditorSection";
import CampEditorSection from "@/components/admin/sections/CampEditorSection";
import BazarEditorSection from "@/components/admin/sections/BazarEditorSection";
import PodcastEditorSection from "@/components/admin/sections/PodcastEditorSection";
import FoodEditorSection from "@/components/admin/sections/FoodEditorSection";
import UniformEditorSection from "@/components/admin/sections/UniformEditorSection";
import SuppliesEditorSection from "@/components/admin/sections/SuppliesEditorSection";
import GamesEditorSection from "@/components/admin/sections/GamesEditorSection";

export default function AdminDashboard({ lang = "en" }: { lang?: string }) {
    const isArabic = lang === 'ar';
    const [activeTab, setActiveTab] = useState<
        "overview" | "hero" | "courses" | "camps" | "bazar" | "podcasts" | "food" | "uniforms" | "supplies" | "games"
    >("overview");

    const tabs = [
        { id: "overview", nameEn: "Console Overview", nameAr: "نظرة عامة والطلبات", icon: LayoutDashboard, color: "text-blue-600", bg: "bg-blue-50" },
        { id: "hero", nameEn: "Homepage & Hero", nameAr: "الواجهة وعناوين الاستقبال", icon: Globe, color: "text-orange-600", bg: "bg-orange-50" },
        { id: "courses", nameEn: "Magic Courses", nameAr: "كورسات وبرامج ماجيكا", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
        { id: "camps", nameEn: "Magic Camps", nameAr: "معسكرات المغامرة الصيفية", icon: Tent, color: "text-emerald-600", bg: "bg-emerald-50" },
        { id: "bazar", nameEn: "Magic Bazar", nameAr: "بازار ومتاجر الأطفال", icon: Store, color: "text-amber-600", bg: "bg-amber-50" },
        { id: "podcasts", nameEn: "Magic Podcast", nameAr: "بودكاست واستوديو التسجيل", icon: Mic, color: "text-indigo-600", bg: "bg-indigo-50" },
        { id: "food", nameEn: "Magic Food", nameAr: "قائمة طعام ماجيكا الصحي", icon: Utensils, color: "text-rose-600", bg: "bg-rose-50" },
        { id: "uniforms", nameEn: "Magic Uniforms", nameAr: "الأزياء والبدلات الرسمية", icon: Shirt, color: "text-teal-600", bg: "bg-teal-50" },
        { id: "supplies", nameEn: "Magic Supplies", nameAr: "حقائب الروبوت وأدوات العلوم", icon: Wrench, color: "text-cyan-600", bg: "bg-cyan-50" },
        { id: "games", nameEn: "Magic Games", nameAr: "ألعاب الذكاء والمحاكاة", icon: Gamepad2, color: "text-violet-600", bg: "bg-violet-50" },
    ] as const;

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20 pt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Navigation Tabs Header */}
                <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 sticky top-4 z-30 backdrop-blur-xl bg-white/95">
                    <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-gray-100 px-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl shadow-md shadow-orange-500/25">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-lg font-black text-gray-900 tracking-tight">
                                    {isArabic ? "مركز التحكم الشامل لمنصة ماجيكا (CMS Console)" : "Magica Enterprise CMS Control Center"}
                                </h1>
                                <p className="text-[11px] font-extrabold text-gray-400">
                                    {isArabic ? "اختر القسم المطلوب لتعديل تفاصيله ورفع صوره فورًا على الموقع" : "Select any section tab below to edit live content and upload imagery"}
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 font-extrabold text-xs rounded-xl border border-emerald-100">
                            <Sparkles className="w-4 h-4 text-emerald-500" />
                            <span>{isArabic ? "تزامن حي مع جميع الأقسام" : "Live Web Sync Enabled"}</span>
                        </div>
                    </div>

                    {/* Scrollable Pills Bar */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1 px-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-black text-xs shrink-0 transition-all ${
                                        isActive
                                            ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-[1.02]"
                                            : "bg-gray-50 text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 border border-transparent hover:border-gray-200"
                                    }`}
                                >
                                    <div className={`p-1.5 rounded-lg ${isActive ? "bg-white/10 text-orange-400" : `${tab.bg} ${tab.color}`}`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <span>{isArabic ? tab.nameAr : tab.nameEn}</span>
                                    {isActive && (
                                        <motion.span layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-orange-500 block ml-0.5" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="transition-all duration-300">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === "overview" && <OverviewSection lang={lang} />}
                            {activeTab === "hero" && <HeroEditorSection lang={lang} />}
                            {activeTab === "courses" && <CoursesEditorSection lang={lang} />}
                            {activeTab === "camps" && <CampEditorSection lang={lang} />}
                            {activeTab === "bazar" && <BazarEditorSection lang={lang} />}
                            {activeTab === "podcasts" && <PodcastEditorSection lang={lang} />}
                            {activeTab === "food" && <FoodEditorSection lang={lang} />}
                            {activeTab === "uniforms" && <UniformEditorSection lang={lang} />}
                            {activeTab === "supplies" && <SuppliesEditorSection lang={lang} />}
                            {activeTab === "games" && <GamesEditorSection lang={lang} />}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}

"use client";

import { useState, useEffect, useRef } from "react";
import {
    LayoutDashboard, Globe, BookOpen, Tent, Store,
    Mic, Utensils, Shirt, Wrench, Gamepad2, Shield,
    Sparkles, Menu, X, ChevronRight, Calendar, LogOut,
    Users, UserCheck, MessageSquare, Settings
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

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
import CalendarEditorSection from "@/components/admin/sections/CalendarEditorSection";

type TabId = "overview" | "hero" | "courses" | "camps" | "bazar" | "podcasts" | "food" | "uniforms" | "supplies" | "games" | "calendar";

const navGroups = [
    {
        groupEn: "General",
        groupAr: "عام",
        items: [
            { id: "overview" as TabId, nameEn: "Dashboard Overview", nameAr: "نظرة عامة", icon: LayoutDashboard, accent: "#3b82f6" },
            { id: "calendar" as TabId, nameEn: "Events & Calendar", nameAr: "التقويم والفعاليات", icon: Calendar, accent: "#ec4899" },
        ]
    },
    {
        groupEn: "Education & Activities",
        groupAr: "التعليم والأنشطة",
        items: [
            { id: "courses" as TabId, nameEn: "Magic Courses", nameAr: "الكورسات والبرامج", icon: BookOpen, accent: "#a855f7" },
            { id: "camps" as TabId, nameEn: "Magic Camps", nameAr: "المعسكرات الصيفية", icon: Tent, accent: "#10b981" },
            { id: "games" as TabId, nameEn: "Magic Games", nameAr: "ألعاب الذكاء", icon: Gamepad2, accent: "#8b5cf6" },
        ]
    },
    {
        groupEn: "Store & Products",
        groupAr: "المتجر والمنتجات",
        items: [
            { id: "bazar" as TabId, nameEn: "Magic Bazar", nameAr: "البازار والمتاجر", icon: Store, accent: "#f59e0b" },
            { id: "uniforms" as TabId, nameEn: "Magic Uniforms", nameAr: "الأزياء والبدلات", icon: Shirt, accent: "#14b8a6" },
            { id: "supplies" as TabId, nameEn: "Magic Supplies", nameAr: "الأدوات والمستلزمات", icon: Wrench, accent: "#06b6d4" },
        ]
    },
    {
        groupEn: "Content & Media",
        groupAr: "المحتوى والإعلام",
        items: [
            { id: "hero" as TabId, nameEn: "Homepage & Hero", nameAr: "الواجهة الرئيسية", icon: Globe, accent: "#f97316" },
            { id: "food" as TabId, nameEn: "Magic Food", nameAr: "قائمة الطعام", icon: Utensils, accent: "#ef4444" },
            { id: "podcasts" as TabId, nameEn: "Magic Podcast", nameAr: "البودكاست", icon: Mic, accent: "#6366f1" },
        ]
    },
];

const allTabs = navGroups.flatMap(g => g.items);

function SidebarContent({ activeTab, isArabic, onSelect, onLogout }: { activeTab: TabId; isArabic: boolean; onSelect: (id: TabId) => void; onLogout: () => void }) {
    return (
        <nav className="flex flex-col gap-1 p-4 h-full">
            <div className={`flex items-center gap-3 px-3 py-4 mb-3 border-b border-white/10 ${isArabic ? "flex-row-reverse" : ""}`}>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/30 shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                </div>
                <div className={isArabic ? "text-right" : ""}>
                    <p className="text-white font-black text-sm leading-tight">Magica CMS</p>
                    <p className="text-white/40 text-[10px] font-medium">Admin Console</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
            </div>

            {navGroups.map((group) => (
                <div key={group.groupEn} className="mb-4">
                    <p className={`text-white/30 text-[10px] font-black uppercase tracking-widest px-3 mb-1.5 ${isArabic ? "text-right" : ""}`}>
                        {isArabic ? group.groupAr : group.groupEn}
                    </p>
                    {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onSelect(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isArabic ? "flex-row-reverse text-right" : "text-left"} ${
                                    isActive ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80 hover:bg-white/5"
                                }`}
                            >
                                <span
                                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all"
                                    style={{
                                        backgroundColor: isActive ? item.accent + "33" : "transparent",
                                        color: isActive ? item.accent : "rgba(255,255,255,0.4)"
                                    }}
                                >
                                    <Icon className="w-4 h-4" />
                                </span>
                                <span className="flex-1 truncate">{isArabic ? item.nameAr : item.nameEn}</span>
                                {isActive && (
                                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.accent }} />
                                )}
                            </button>
                        );
                    })}
                </div>
            ))}

            <div className="mb-4">
                <p className={`text-white/30 text-[10px] font-black uppercase tracking-widest px-3 mb-1.5 ${isArabic ? "text-right" : ""}`}>
                    {isArabic ? "إدارة البوابة" : "PORTAL MANAGEMENT"}
                </p>
                <Link href={`/${isArabic ? "ar" : "en"}/dashboard/users`} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-white/50 hover:text-white/80 hover:bg-white/5 ${isArabic ? "flex-row-reverse text-right" : "text-left"}`}>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all text-white/40">
                        <Users className="w-4 h-4" />
                    </span>
                    <span className="flex-1 truncate">{isArabic ? "إدارة المستخدمين" : "Manage Users"}</span>
                </Link>
                <Link href={`/${isArabic ? "ar" : "en"}/dashboard/approvals`} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-white/50 hover:text-white/80 hover:bg-white/5 ${isArabic ? "flex-row-reverse text-right" : "text-left"}`}>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all text-white/40">
                        <UserCheck className="w-4 h-4" />
                    </span>
                    <span className="flex-1 truncate">{isArabic ? "طلبات التسجيل" : "Pending Approvals"}</span>
                </Link>
                <Link href={`/${isArabic ? "ar" : "en"}/dashboard/messages`} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-white/50 hover:text-white/80 hover:bg-white/5 ${isArabic ? "flex-row-reverse text-right" : "text-left"}`}>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all text-white/40">
                        <MessageSquare className="w-4 h-4" />
                    </span>
                    <span className="flex-1 truncate">{isArabic ? "الرسائل" : "Messages"}</span>
                </Link>
                <Link href={`/${isArabic ? "ar" : "en"}/dashboard/settings`} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-white/50 hover:text-white/80 hover:bg-white/5 ${isArabic ? "flex-row-reverse text-right" : "text-left"}`}>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all text-white/40">
                        <Settings className="w-4 h-4" />
                    </span>
                    <span className="flex-1 truncate">{isArabic ? "الإعدادات" : "Settings"}</span>
                </Link>
            </div>

            <div className="mt-auto pt-4 mb-4 px-3 border-t border-white/10">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-black text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                >
                    <LogOut className="w-4 h-4 shrink-0" />
                    <span>{isArabic ? "تسجيل خروج" : "Log Out"}</span>
                </button>
            </div>
        </nav>
    );
}

export default function AdminDashboard({ lang = "en" }: { lang?: string }) {
    const isArabic = lang === "ar";
    const [activeTab, setActiveTab] = useState<TabId>("overview");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();
        router.push(`/${lang}/login`);
    };

    const activeItem = allTabs.find(t => t.id === activeTab)!;

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
                setDrawerOpen(false);
            }
        };
        if (drawerOpen) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [drawerOpen]);

    useEffect(() => {
        document.body.style.overflow = drawerOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [drawerOpen]);

    const handleTabSelect = (id: TabId) => {
        setActiveTab(id);
        setDrawerOpen(false);
    };

    return (
        <div className="flex min-h-screen -mx-4 md:-mx-8 -mt-10 overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#0f1117] border-r border-white/[0.06] sticky top-0 self-start max-h-screen overflow-y-auto">
                <SidebarContent activeTab={activeTab} isArabic={isArabic} onSelect={handleTabSelect} onLogout={handleLogout} />
            </aside>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {drawerOpen && (
                    <>
                        <motion.div
                            key="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.div
                            key="drawer"
                            ref={drawerRef}
                            initial={{ x: isArabic ? "100%" : "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: isArabic ? "100%" : "-100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 280 }}
                            className={`fixed top-0 ${isArabic ? "right-0" : "left-0"} z-50 w-72 h-full bg-[#0f1117] overflow-y-auto lg:hidden shadow-2xl`}
                        >
                            <button
                                onClick={() => setDrawerOpen(false)}
                                className={`absolute top-4 ${isArabic ? "left-4" : "right-4"} p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors z-10`}
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <SidebarContent activeTab={activeTab} isArabic={isArabic} onSelect={handleTabSelect} onLogout={handleLogout} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#f8f9fc]">

                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/80 px-4 sm:px-6 py-3 flex items-center gap-3">
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="lg:hidden p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors shrink-0"
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <div className={`flex items-center gap-2 min-w-0 ${isArabic ? "flex-row-reverse" : ""}`}>
                        <span className="text-gray-400 text-sm font-medium hidden sm:block shrink-0">CMS Console</span>
                        <ChevronRight className={`w-4 h-4 text-gray-300 hidden sm:block shrink-0 ${isArabic ? "rotate-180" : ""}`} />
                        <div className={`flex items-center gap-2 min-w-0 ${isArabic ? "flex-row-reverse" : ""}`}>
                            <span
                                className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                                style={{ backgroundColor: activeItem.accent + "22", color: activeItem.accent }}
                            >
                                <activeItem.icon className="w-3.5 h-3.5" />
                            </span>
                            <h1 className="text-gray-900 font-bold text-sm truncate">
                                {isArabic ? activeItem.nameAr : activeItem.nameEn}
                            </h1>
                        </div>
                    </div>

                    <div className={`${isArabic ? "mr-auto" : "ml-auto"} shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-100`}>
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="hidden sm:block">{isArabic ? "مزامنة حية" : "Live Sync"}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                </header>

                {/* Section Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                        >
                            {activeTab === "overview"  && <OverviewSection lang={lang} />}
                            {activeTab === "hero"      && <HeroEditorSection lang={lang} />}
                            {activeTab === "courses"   && <CoursesEditorSection lang={lang} />}
                            {activeTab === "camps"     && <CampEditorSection lang={lang} />}
                            {activeTab === "bazar"     && <BazarEditorSection lang={lang} />}
                            {activeTab === "podcasts"  && <PodcastEditorSection lang={lang} />}
                            {activeTab === "food"      && <FoodEditorSection lang={lang} />}
                            {activeTab === "uniforms"  && <UniformEditorSection lang={lang} />}
                            {activeTab === "supplies"  && <SuppliesEditorSection lang={lang} />}
                            {activeTab === "games"     && <GamesEditorSection lang={lang} />}
                            {activeTab === "calendar"  && <CalendarEditorSection lang={lang} />}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}

"use client";

import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LayoutDashboard, Users, MessageSquare, Settings, LogOut, Medal, 
    Gamepad2, CalendarDays, ShoppingCart, Menu, X, Shield, ChevronRight, UserCheck 
} from "lucide-react";
import Link from "next/link";
import { logoutUser } from "@/lib/firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar({ lang }: { lang: string }) {
    const { role, user } = useAuth();
    const isArabic = lang === 'ar';
    const router = useRouter();
    const pathname = usePathname();
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    // Close drawer automatically when route changes
    useEffect(() => {
        setMobileDrawerOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await logoutUser();
        router.push(`/${lang}/login`);
    };

    const navItems = [
        { label: isArabic ? "لوحة القيادة" : "Dashboard", icon: LayoutDashboard, href: `/${lang}/dashboard`, roles: ["admin", "teacher", "parent", "child"] },
        { label: isArabic ? "المستخدمين" : "Users", icon: Users, href: `/${lang}/dashboard/users`, roles: ["admin"] },
        { label: isArabic ? "طلبات التسجيل" : "Pending Approvals", icon: UserCheck, href: `/${lang}/dashboard/approvals`, roles: ["admin"] },
        { label: isArabic ? "فصولي" : "My Classes", icon: Users, href: `/${lang}/dashboard/classes`, roles: ["teacher"] },
        { label: isArabic ? "أطفالي" : "My Children", icon: Users, href: `/${lang}/dashboard/children`, roles: ["parent"] },
        { label: isArabic ? "الرسائل" : "Messages", icon: MessageSquare, href: `/${lang}/dashboard/messages`, roles: ["parent", "teacher", "admin"] },
        { label: isArabic ? "النقاط" : "Points", icon: Medal, href: `/${lang}/dashboard/points`, roles: ["child", "teacher"] },
        { label: isArabic ? "الألعاب" : "Games", icon: Gamepad2, href: `/${lang}/dashboard/games`, roles: ["child"] },
        { label: isArabic ? "المتجر" : "Shop", icon: ShoppingCart, href: `/${lang}/dashboard/shop`, roles: ["parent", "admin"] },
        { label: isArabic ? "الجدول" : "Calendar", icon: CalendarDays, href: `/${lang}/dashboard/calendar`, roles: ["admin", "teacher", "parent", "child"] },
        { label: isArabic ? "الإعدادات" : "Settings", icon: Settings, href: `/${lang}/dashboard/settings`, roles: ["admin", "teacher", "parent", "child"] },
    ];

    const filteredNav = navItems.filter(item => role && item.roles.includes(role));

    return (
        <>
            {/* =========================================================
                DESKTOP SIDEBAR (Hidden on mobile screens < md)
               ========================================================= */}
            <motion.aside 
                initial={{ x: isArabic ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className={`hidden md:flex w-64 bg-white border-${isArabic ? 'l' : 'r'} border-gray-200/80 h-screen flex-col p-4 shadow-xl shrink-0 z-20`}
                dir={isArabic ? "rtl" : "ltr"}
            >
                <div className="flex items-center gap-3 mb-8 px-2 mt-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-orange-500/20 shrink-0">
                        M
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-gray-900 tracking-tight leading-none">Magica Portal</h2>
                        <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-wider mt-1 block">
                            {role?.toUpperCase()} {isArabic ? "بوابة" : "ACCESS"}
                        </span>
                    </div>
                </div>

                <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
                    {filteredNav.map((item, idx) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link key={idx} href={item.href}>
                                <motion.div 
                                    whileHover={{ x: isArabic ? -4 : 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                        isActive 
                                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black shadow-lg shadow-orange-500/25" 
                                            : "text-gray-600 hover:text-orange-600 hover:bg-orange-50/50 font-bold"
                                    }`}
                                >
                                    <Icon className="w-5 h-5 shrink-0" />
                                    <span className="text-sm flex-1">{item.label}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-4 border-t border-gray-100">
                    <button 
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-all font-black text-sm"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span>{isArabic ? "تسجيل خروج من الجلسة" : "Log Out of Portal"}</span>
                    </button>
                </div>
            </motion.aside>

            {/* =========================================================
                MOBILE TOP NAVIGATION BAR (Visible only on screens < md)
               ========================================================= */}
            <div className="md:hidden bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white px-4 py-3.5 border-b border-gray-800 shadow-md flex items-center justify-between sticky top-0 z-30" dir={isArabic ? "rtl" : "ltr"}>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMobileDrawerOpen(true)}
                        className="p-2 rounded-xl bg-gray-800 text-orange-400 hover:bg-gray-700 transition-colors focus:outline-none"
                        aria-label="Toggle Dashboard Navigation"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md">
                            M
                        </div>
                        <span className="font-black text-sm tracking-tight">{isArabic ? "بوابة ماجيكا" : "Magica Portal"}</span>
                        <span className="text-[10px] font-extrabold bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full border border-orange-500/40 uppercase">
                            {role}
                        </span>
                    </div>
                </div>

                <Link href={`/${lang}`} className="text-xs font-black text-gray-300 hover:text-white underline">
                    {isArabic ? "الرئيسية" : "Home"}
                </Link>
            </div>

            {/* =========================================================
                MOBILE SIDE-DRAWER MODAL (Slide-over navigation)
               ========================================================= */}
            <AnimatePresence>
                {mobileDrawerOpen && (
                    <div className="fixed inset-0 z-50 md:hidden flex" dir={isArabic ? "rtl" : "ltr"}>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileDrawerOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        {/* Slide Drawer */}
                        <motion.div
                            initial={{ x: isArabic ? "100%" : "-100%" }}
                            animate={{ x: "0%" }}
                            exit={{ x: isArabic ? "100%" : "-100%" }}
                            transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                            className="relative w-72 max-w-[85vw] bg-white text-gray-900 h-full shadow-2xl z-10 flex flex-col p-5 overflow-y-auto"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between pb-5 mb-3 border-b border-gray-100">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center font-black text-white text-xl">
                                        M
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-900 text-base leading-tight">Magica Zone</h3>
                                        <span className="text-[11px] font-extrabold text-orange-600 block mt-0.5 uppercase">
                                            {role} {isArabic ? "بوابة الإدارة" : "Dashboard"}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setMobileDrawerOpen(false)}
                                    className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Mobile Navigation Links */}
                            <nav className="flex-1 space-y-1.5 overflow-y-auto">
                                {filteredNav.map((item, idx) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link key={idx} href={item.href} onClick={() => setMobileDrawerOpen(false)}>
                                            <div className={`flex items-center justify-between px-4 py-3 rounded-2xl font-black text-sm transition-all ${
                                                isActive
                                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                                                    : "text-gray-700 hover:bg-orange-50/70 hover:text-orange-600"
                                            }`}>
                                                <div className="flex items-center gap-3">
                                                    <Icon className="w-5 h-5 shrink-0" />
                                                    <span>{item.label}</span>
                                                </div>
                                                <ChevronRight className={`w-4 h-4 opacity-50 ${isArabic ? "rotate-180" : ""}`} />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Drawer Bottom Action */}
                            <div className="pt-4 mt-4 border-t border-gray-100 space-y-2">
                                <Link 
                                    href={`/${lang}`} 
                                    onClick={() => setMobileDrawerOpen(false)}
                                    className="block w-full py-2.5 text-center rounded-xl bg-gray-100 font-bold text-gray-700 text-xs hover:bg-gray-200 transition-colors"
                                >
                                    {isArabic ? "العودة للموقع الرئيسي" : "Return to Public Website"}
                                </Link>
                                <button 
                                    onClick={() => { setMobileDrawerOpen(false); handleLogout(); }}
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-black text-sm transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>{isArabic ? "تسجيل خروج" : "Log Out"}</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

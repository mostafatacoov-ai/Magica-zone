"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, MessageSquare, Settings, LogOut, Medal, Gamepad2, CalendarDays, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { logoutUser } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export default function Sidebar({ lang }: { lang: string }) {
    const { role } = useAuth();
    const isArabic = lang === 'ar';
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();
        router.push(`/${lang}/login`);
    };

    const navItems = [
        { label: isArabic ? "لوحة القيادة" : "Dashboard", icon: LayoutDashboard, href: `/${lang}/dashboard`, roles: ["admin", "teacher", "parent", "child"] },
        { label: isArabic ? "المستخدمين" : "Users", icon: Users, href: `/${lang}/dashboard/users`, roles: ["admin"] },
        { label: isArabic ? "طلبات التسجيل" : "Pending Approvals", icon: Users, href: `/${lang}/dashboard/approvals`, roles: ["admin"] },
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
        <motion.aside 
            initial={{ x: isArabic ? 100 : -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`w-64 bg-white border-${isArabic ? 'l' : 'r'} border-gray-200 h-screen flex flex-col p-4 shadow-xl shrink-0`}
        >
            <div className="flex items-center gap-3 mb-10 px-2 mt-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    M
                </div>
                <h2 className="text-xl font-bold text-green-600 tracking-tight">Magic Camp</h2>
            </div>

            <nav className="flex-1 space-y-2">
                {filteredNav.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <Link key={idx} href={item.href}>
                            <motion.div 
                                whileHover={{ scale: 1.02, backgroundColor: "#fff7ed" }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-orange-500 transition-colors"
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-semibold">{item.label}</span>
                            </motion.div>
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-auto pt-4 border-t border-gray-100">
                <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-semibold"
                >
                    <LogOut className="w-5 h-5" />
                    {isArabic ? "تسجيل خروج" : "Log Out"}
                </button>
            </div>
        </motion.aside>
    );
}

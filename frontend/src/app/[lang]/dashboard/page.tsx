"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import ParentDashboard from "@/components/dashboards/ParentDashboard";
import ChildDashboard from "@/components/dashboards/ChildDashboard";
import TeacherDashboard from "@/components/dashboards/TeacherDashboard";

export default function DashboardPage({ params: { lang } }: { params: { lang: string } }) {
    const { role, user } = useAuth();
    const isArabic = lang === 'ar';

    if (!role) return null;

    // Remove the part after @ to get a clean name or use the name if available
    const displayName = user?.email?.split('@')[0] || "User";

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-8 p-4 md:p-8"
        >
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">
                        {isArabic ? "مرحباً،" : "Welcome,"} <span className="text-orange-500">{displayName}</span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">
                        {isArabic ? `أنت مسجل كـ ${role}` : `You are logged in as a ${role}`}
                    </p>
                </div>
                <div className="mt-4 md:mt-0 px-6 py-2 bg-orange-50 text-orange-600 rounded-full font-bold border border-orange-100">
                    {role.toUpperCase()}
                </div>
            </header>

            {role === "admin" && <AdminDashboard lang={lang} />}
            {role === "teacher" && <TeacherDashboard lang={lang} />}
            {role === "parent" && <ParentDashboard lang={lang} />}
            {role === "child" && <ChildDashboard lang={lang} />}
        </motion.div>
    );
}

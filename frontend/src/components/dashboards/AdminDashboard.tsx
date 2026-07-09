"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, CreditCard, Activity, Check, X } from "lucide-react";
import { useState } from "react";

const mockPendingParents = [
    { id: 1, name: "Ahmed Youssef", email: "ahmed@example.com", date: "2026-06-25" },
    { id: 2, name: "Mona Ali", email: "mona@example.com", date: "2026-06-26" },
];

const mockRecentActivity = [
    { id: 1, text: "Teacher Sarah awarded 10 points to Omar.", time: "10 mins ago" },
    { id: 2, text: "New parent registration: Kareem S.", time: "1 hour ago" },
    { id: 3, text: "Payment received from Laila's parent.", time: "2 hours ago" },
];

export default function AdminDashboard({ lang }: { lang: string }) {
    const isArabic = lang === 'ar';
    const [pending, setPending] = useState(mockPendingParents);

    const handleApprove = (id: number) => {
        setPending(pending.filter(p => p.id !== id));
    };

    return (
        <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid md:grid-cols-3 gap-6">
                <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="p-5 bg-blue-100 text-blue-500 rounded-2xl"><Users className="w-8 h-8"/></div>
                    <div>
                        <p className="text-gray-500 font-medium">{isArabic ? "إجمالي الطلاب" : "Total Students"}</p>
                        <h3 className="text-3xl font-bold text-gray-800">124</h3>
                    </div>
                </motion.div>
                
                <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="p-5 bg-orange-100 text-orange-500 rounded-2xl"><UserPlus className="w-8 h-8"/></div>
                    <div>
                        <p className="text-gray-500 font-medium">{isArabic ? "طلبات معلقة" : "Pending Parents"}</p>
                        <h3 className="text-3xl font-bold text-gray-800">{pending.length}</h3>
                    </div>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="p-5 bg-green-100 text-green-500 rounded-2xl"><CreditCard className="w-8 h-8"/></div>
                    <div>
                        <p className="text-gray-500 font-medium">{isArabic ? "الإيرادات الشهرية" : "Monthly Revenue"}</p>
                        <h3 className="text-3xl font-bold text-gray-800">$4,200</h3>
                    </div>
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Pending Approvals */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{isArabic ? "الطلبات المعلقة" : "Pending Approvals"}</h2>
                    {pending.length === 0 ? (
                        <p className="text-gray-500">{isArabic ? "لا توجد طلبات معلقة." : "No pending requests."}</p>
                    ) : (
                        <div className="space-y-4">
                            {pending.map(p => (
                                <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div>
                                        <p className="font-bold text-gray-800">{p.name}</p>
                                        <p className="text-sm text-gray-500">{p.email}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleApprove(p.id)} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                                            <Check className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleApprove(p.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Activity className="w-6 h-6 text-orange-500" />
                        <h2 className="text-2xl font-bold text-gray-800">{isArabic ? "النشاط الحديث" : "Recent Activity"}</h2>
                    </div>
                    <div className="space-y-6">
                        {mockRecentActivity.map(act => (
                            <div key={act.id} className="flex gap-4">
                                <div className="w-2 h-2 mt-2 rounded-full bg-orange-400"></div>
                                <div>
                                    <p className="text-gray-700 font-medium">{act.text}</p>
                                    <p className="text-sm text-gray-400">{act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

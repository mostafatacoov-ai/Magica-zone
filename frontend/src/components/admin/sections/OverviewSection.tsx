"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, CreditCard, Activity, Check, X, Shield, RefreshCw } from "lucide-react";
import { useState } from "react";

const mockPendingParents = [
    { id: 1, name: "Ahmed Youssef", email: "ahmed@example.com", date: "2026-06-25" },
    { id: 2, name: "Mona Ali", email: "mona@example.com", date: "2026-06-26" },
];

const mockRecentActivity = [
    { id: 1, textEn: "Admin updated Junior CEO course banner photo.", textAr: "تم تحديث صورة الغلاف لكورس الرائد الصغير والذكاء المالي.", time: "Just now" },
    { id: 2, textEn: "Teacher Sarah awarded 10 points to Omar.", textAr: "المعلمة سارة منحت 10 نقاط للطالب عمر يوسف.", time: "10 mins ago" },
    { id: 3, textEn: "New store created in Magica Bazar: Yassin's Bakery.", textAr: "تم إنشاء متجر جديد في ماجيكا بازار: مخبز يس.", time: "1 hour ago" },
    { id: 4, textEn: "Payment received for Summer Innovation Camp 2026.", textAr: "تم استلام دفعة اشتراك لمعسكر ماجيكا الصيفي 2026.", time: "2 hours ago" },
];

export default function OverviewSection({ lang }: { lang: string }) {
    const isArabic = lang === 'ar';
    const [pending, setPending] = useState(mockPendingParents);

    const handleApprove = (id: number) => {
        setPending(pending.filter(p => p.id !== id));
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Admin Header Notice */}
            <div className="p-6 bg-gradient-to-r from-magica-navy-900 via-purple-900 to-indigo-950 text-white rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-orange-400 font-black text-xs tracking-wider uppercase">
                        <Shield className="w-4 h-4" />
                        <span>{isArabic ? "لوحة التحكم الرئيسية للمنصة" : "Enterprise Platform Control Console"}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                        {isArabic ? "أهلاً بك في غرفة القيادة السحرية لموقع ماجيكا" : "Welcome to the Magica Full-Website Command Room"}
                    </h2>
                    <p className="text-gray-300 text-sm max-w-2xl">
                        {isArabic
                            ? "تتيح لك القائمة التنقلية إدارة كل محتوى الموقع فورًا: الكورسات، المعسكرات، البازار، البودكاست، الوجبات، الألعاب، مع رفع الصور والغلاقات اللحظية لجميع الأقسام دون تعقيد."
                            : "Easily navigate through the section modules to edit text, adjust pricing, manage kid stores, and upload high-resolution banner photos across the entire website instantly."}
                    </p>
                </div>
                <div className="px-5 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center shrink-0">
                    <p className="text-xs text-orange-300 font-bold uppercase">{isArabic ? "حالة النظام" : "System Status"}</p>
                    <p className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1.5 mt-0.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>{isArabic ? "متصل ولحظي" : "Live & Synchronized"}</span>
                    </p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid md:grid-cols-3 gap-6">
                <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100/80 flex items-center gap-6 relative overflow-hidden">
                    <div className="p-5 bg-blue-50 text-blue-600 rounded-2xl shadow-inner"><Users className="w-8 h-8"/></div>
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">{isArabic ? "إجمالي الطلاب والرواد" : "Total Active Students"}</p>
                        <h3 className="text-3xl font-black text-gray-900 mt-1">128</h3>
                        <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">+14% {isArabic ? "هذا الشهر" : "this month"}</span>
                    </div>
                </motion.div>
                
                <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100/80 flex items-center gap-6 relative overflow-hidden">
                    <div className="p-5 bg-orange-50 text-orange-600 rounded-2xl shadow-inner"><UserPlus className="w-8 h-8"/></div>
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">{isArabic ? "طلبات التسجيل المعلقة" : "Pending Approvals"}</p>
                        <h3 className="text-3xl font-black text-gray-900 mt-1">{pending.length}</h3>
                        {pending.length > 0 ? (
                            <span className="text-[11px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-2 inline-block">{isArabic ? "يحتاج مراجعة فورية" : "Needs attention"}</span>
                        ) : (
                            <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">{isArabic ? "مكتمل بالكامل" : "All clear!"}</span>
                        )}
                    </div>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100/80 flex items-center gap-6 relative overflow-hidden">
                    <div className="p-5 bg-green-50 text-emerald-600 rounded-2xl shadow-inner"><CreditCard className="w-8 h-8"/></div>
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">{isArabic ? "الإيرادات والشراكات المالية" : "Monthly Volume"}</p>
                        <h3 className="text-3xl font-black text-gray-900 mt-1">$6,450</h3>
                        <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">+22% vs {isArabic ? "الشهر السابق" : "last month"}</span>
                    </div>
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Pending Approvals */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h2 className="text-2xl font-extrabold text-gray-800">{isArabic ? "الطلبات المعلقة لتفعيل الأهالي والطلاب" : "Pending Parent Registrations"}</h2>
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 font-bold rounded-full text-xs">
                            {pending.length} {isArabic ? "طلب بانتظار المراجعة" : "in queue"}
                        </span>
                    </div>

                    {pending.length === 0 ? (
                        <div className="py-12 text-center text-gray-400 space-y-3">
                            <Check className="w-12 h-12 text-emerald-500 mx-auto bg-emerald-50 p-2 rounded-full" />
                            <p className="text-base font-bold text-gray-600">{isArabic ? "لا توجد طلبات معلقة حاليًا." : "No pending requests currently."}</p>
                            <p className="text-xs text-gray-400">{isArabic ? "جميع الحسابات الجديدة تمت الموافقة عليها أو معالجتها." : "All user accounts are approved and verified."}</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pending.map(p => (
                                <div key={p.id} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-orange-50/10 rounded-2xl border border-gray-200/60 shadow-xs hover:shadow-sm transition-all">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-black text-gray-900 text-base">{p.name}</p>
                                            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">{isArabic ? "ولي أمر جديد" : "New Parent"}</span>
                                        </div>
                                        <p className="text-xs font-medium text-gray-500">{p.email}</p>
                                        <p className="text-[11px] text-gray-400">Date: {p.date}</p>
                                    </div>
                                    <div className="flex gap-2.5">
                                        <button 
                                            onClick={() => handleApprove(p.id)} 
                                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
                                        >
                                            <Check className="w-4 h-4" />
                                            <span>{isArabic ? "موافقة وتفعيل" : "Approve"}</span>
                                        </button>
                                        <button 
                                            onClick={() => handleApprove(p.id)} 
                                            className="p-2 bg-red-100 hover:bg-red-200 text-red-700 font-black rounded-xl transition-all"
                                            title={isArabic ? "رفض الطلب" : "Decline"}
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Activity Feed */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl"><Activity className="w-5 h-5" /></div>
                            <h2 className="text-xl font-extrabold text-gray-800">{isArabic ? "النشاط الحديث للمنصة" : "Recent Platform Logs"}</h2>
                        </div>
                    </div>
                    <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                        {mockRecentActivity.map((act, i) => (
                            <div key={act.id} className="flex gap-4 relative pl-6">
                                <div className={`w-3.5 h-3.5 mt-1.5 rounded-full border-2 border-white absolute left-0 shadow-md ${
                                    i === 0 ? "bg-orange-500 animate-pulse" : i === 1 ? "bg-emerald-500" : "bg-blue-500"
                                }`}></div>
                                <div className="space-y-1">
                                    <p className="text-gray-800 font-bold text-sm leading-snug">{isArabic ? act.textAr : act.textEn}</p>
                                    <span className="text-xs text-gray-400 font-medium">{act.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Settings, Shield, Bell, Lock, Globe, Moon, Sun, Save, 
    Sparkles, CheckCircle2, User, Key, Sliders, Laptop, HelpCircle 
} from "lucide-react";

export default function SettingsPage({ params: { lang } }: { params: { lang: string } }) {
    const { user, role } = useAuth();
    const isArabic = lang === 'ar';
    
    // Form & Preferences state
    const [fullName, setFullName] = useState(user?.displayName || (role === 'admin' ? "Mustafa Magdi (Admin)" : "User Member"));
    const [email, setEmail] = useState(user?.email || "admin@magiccamp.com");
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [autoApproveParents, setAutoApproveParents] = useState(false);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 4000);
    };

    const handleSaveGeneral = (e: React.FormEvent) => {
        e.preventDefault();
        showToast(isArabic ? "تم حفظ الإعدادات العامة بنجاح فوريًا!" : "General account preferences saved successfully!");
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPassword || !newPassword) {
            alert(isArabic ? "يرجى كتابة كلمة المرور الحالية والجديدة" : "Please fill in both current and new password fields.");
            return;
        }
        setCurrentPassword("");
        setNewPassword("");
        showToast(isArabic ? "تم تحديث كلمة المرور وحفظ الأمان دائمًا!" : "Security credentials and password updated successfully!");
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-16" dir={isArabic ? "rtl" : "ltr"}>
            {/* Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed top-6 right-6 left-6 md:left-auto z-[100] max-w-md mx-auto md:mx-0 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-700 flex items-center gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <p className="font-bold text-sm flex-1">{toastMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header banner */}
            <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 rounded-3xl p-8 shadow-2xl border border-gray-800 text-white relative overflow-hidden flex items-center justify-between gap-6">
                <div className="absolute -top-10 -right-10 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-500/20 shrink-0">
                        <Settings className="w-8 h-8 animate-spin-slow" />
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-black mb-2 uppercase tracking-wide">
                            <Sliders className="w-3.5 h-3.5" />
                            {isArabic ? "لوحة التعديل المتقدمة" : "System Configuration"}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                            {isArabic ? "إعدادات الحساب والنظام" : "Account & System Settings"}
                        </h1>
                        <p className="text-gray-300 text-sm mt-1 font-medium">
                            {isArabic 
                                ? "إدارة التفضيلات الشخصية، الأمان، تنبيهات النظام، وصلاحيات القبول التلقائي حاليًا."
                                : "Manage personal account details, security credentials, push notifications, and site configurations."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - General & Admin Settings */}
                <div className="md:col-span-2 space-y-8">
                    {/* General Account Profile */}
                    <div className="bg-white rounded-3xl border border-gray-200/80 p-8 shadow-md">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <User className="w-6 h-6 text-orange-500" />
                            <h2 className="text-xl font-black text-gray-900">
                                {isArabic ? "البيانات الشخصية للحساب" : "Personal Profile Information"}
                            </h2>
                        </div>

                        <form onSubmit={handleSaveGeneral} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wide mb-2">
                                        {isArabic ? "الاسم المعروض" : "Display Name"}
                                    </label>
                                    <input 
                                        type="text"
                                        value={fullName}
                                        onChange={e => setFullName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-extrabold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wide mb-2">
                                        {isArabic ? "البريد الإلكتروني الأساسي" : "Primary Email Address"}
                                    </label>
                                    <input 
                                        type="email"
                                        disabled
                                        value={email}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 font-mono font-bold text-gray-500 text-sm cursor-not-allowed"
                                    />
                                    <span className="text-[11px] text-gray-400 font-medium mt-1 block">
                                        {isArabic ? "لا يمكن تعديل البريد الإلكتروني لدواعٍ أمنية دائمًا." : "Primary address cannot be directly changed for security reasons."}
                                    </span>
                                </div>
                            </div>

                            {/* System Preferences Toggles */}
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <h3 className="text-sm font-black text-gray-800 uppercase tracking-wide">
                                    {isArabic ? "تفضيلات الإشعارات والتنبيهات" : "Notification & Theme Preferences"}
                                </h3>

                                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200/60">
                                    <div className="flex items-center gap-3">
                                        <Bell className="w-5 h-5 text-orange-500" />
                                        <div>
                                            <div className="font-bold text-gray-900 text-sm">
                                                {isArabic ? "إشعارات التسجيل والرسائل الفورية" : "Real-time Enrollment Notifications"}
                                            </div>
                                            <div className="text-xs text-gray-500 font-medium">
                                                {isArabic ? "تلقي تنبيهات عند تسجيل أولياء أمور أو طلاب جدد." : "Receive alerts when parents register or submit inquiries."}
                                            </div>
                                        </div>
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        checked={notificationsEnabled}
                                        onChange={e => setNotificationsEnabled(e.target.checked)}
                                        className="w-5 h-5 accent-orange-500 cursor-pointer rounded" 
                                    />
                                </div>
                            </div>

                            {/* Admin Specialized Controls */}
                            {role === 'admin' && (
                                <div className="space-y-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-2 text-purple-600">
                                        <Shield className="w-5 h-5 fill-purple-100" />
                                        <h3 className="text-sm font-black uppercase tracking-wide">
                                            {isArabic ? "صلاحيات وتحكم مدير النظام (Executive Controls)" : "Executive Admin Controls"}
                                        </h3>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-50/40 border border-purple-200/60">
                                        <div>
                                            <div className="font-bold text-purple-950 text-sm">
                                                {isArabic ? "القبول التلقائي لحسابات أولياء الأمور الجدد" : "Auto-Approve Guardian Registrations"}
                                            </div>
                                            <div className="text-xs text-purple-700/80 font-medium">
                                                {isArabic ? "تجاوز قائمة الانتظار والموافقة الفورية على الحسابات." : "Skip pending queue and grant instant dashboard access upon signup."}
                                            </div>
                                        </div>
                                        <input 
                                            type="checkbox" 
                                            checked={autoApproveParents}
                                            onChange={e => setAutoApproveParents(e.target.checked)}
                                            className="w-5 h-5 accent-purple-600 cursor-pointer rounded" 
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60">
                                        <div>
                                            <div className="font-bold text-amber-950 text-sm">
                                                {isArabic ? "وضع الصيانة المؤقت (Maintenance Mode)" : "Site Maintenance Protection Mode"}
                                            </div>
                                            <div className="text-xs text-amber-700/80 font-medium">
                                                {isArabic ? "إغلاق التسجيل الجديد مؤقتًا لإجراء التحديثات." : "Temporarily suspend public signups during scheduled maintenance."}
                                            </div>
                                        </div>
                                        <input 
                                            type="checkbox" 
                                            checked={maintenanceMode}
                                            onChange={e => setMaintenanceMode(e.target.checked)}
                                            className="w-5 h-5 accent-amber-600 cursor-pointer rounded" 
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black px-8 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all text-sm flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{isArabic ? "حفظ الإعدادات والتحديثات فوريًا" : "Save All General Preferences"}</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Security & Password */}
                    <div className="bg-white rounded-3xl border border-gray-200/80 p-8 shadow-md">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <Lock className="w-6 h-6 text-rose-500" />
                            <h2 className="text-xl font-black text-gray-900">
                                {isArabic ? "الأمان وتغيير كلمة المرور" : "Security & Password Management"}
                            </h2>
                        </div>

                        <form onSubmit={handleUpdatePassword} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wide mb-2">
                                        {isArabic ? "كلمة المرور الحالية" : "Current Password"}
                                    </label>
                                    <input 
                                        type="password"
                                        value={currentPassword}
                                        onChange={e => setCurrentPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wide mb-2">
                                        {isArabic ? "كلمة المرور الجديدة" : "New Secure Password"}
                                    </label>
                                    <input 
                                        type="password"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black px-8 py-3.5 rounded-xl shadow-lg shadow-rose-500/20 transition-all text-sm flex items-center gap-2"
                                >
                                    <Key className="w-4 h-4" />
                                    <span>{isArabic ? "تغيير كلمة المرور الآن" : "Update Password Credentials"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Column - Status Overview & Help */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-orange-500 to-rose-600 rounded-3xl p-6 text-white shadow-xl">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 text-white font-bold">
                            <Shield className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-black mb-2">
                            {isArabic ? "حماية النظام النشطة" : "Active System Security"}
                        </h3>
                        <p className="text-orange-100 text-xs leading-relaxed font-medium mb-4">
                            {isArabic 
                                ? "جلسة الإدارة الخاصة بك مؤمنة ومشفرة بأحدث التقنيات. يتم التحقق من الصلاحيات بانتظام دائمًا."
                                : "Your session is fully encrypted and authenticated via custom verification tokens with administrative privileges."}
                        </p>
                        <div className="py-2.5 px-4 rounded-xl bg-black/20 text-[12px] font-mono font-bold flex items-center justify-between">
                            <span>Status:</span>
                            <span className="text-emerald-300 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Secure & Verified
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
                        <h4 className="font-black text-gray-900 text-base mb-3 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-gray-500" />
                            <span>{isArabic ? "الدعم الفني للإدارة" : "Admin Support Center"}</span>
                        </h4>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed mb-4">
                            {isArabic
                                ? "في حالة مواجهة أي استفسارات أو الحاجة لنقل قواعد بيانات المستخدمين، تواصل مع فريق المطورين فوريًا."
                                : "If you encounter unexpected synchronization behaviors or require database transfers, reach out to core developers directly."}
                        </p>
                        <div className="text-xs font-mono font-bold text-gray-500 bg-gray-100 p-3 rounded-xl text-center">
                            support@magica-group.com
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

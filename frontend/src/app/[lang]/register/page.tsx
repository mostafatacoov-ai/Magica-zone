"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock } from "lucide-react";
import { registerParent } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await registerParent(email, password);
            router.push(`/${lang}/dashboard`); // Redirect to dashboard
        } catch (err: any) {
            setError(err.message || "Failed to register");
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-green-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md border-4 border-green-200"
            >
                <div className="text-center mb-8">
                    <motion.div 
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <UserPlus className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {isArabic ? "تسجيل حساب جديد" : "Parent Registration"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {isArabic ? "قم بإنشاء حساب لإدارة أطفالك" : "Create an account to manage your children"}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {isArabic ? "البريد الإلكتروني" : "Email Address"}
                        </label>
                        <div className="relative flex items-center">
                            <Mail className={`absolute ${isArabic ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full ${isArabic ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all ${isArabic ? 'text-right' : ''}`}
                                placeholder={isArabic ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {isArabic ? "كلمة المرور" : "Password"}
                        </label>
                        <div className="relative flex items-center">
                            <Lock className={`absolute ${isArabic ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full ${isArabic ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all ${isArabic ? 'text-right' : ''}`}
                                placeholder={isArabic ? "اختر كلمة مرور قوية" : "Choose a strong password"}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 focus:ring-4 focus:ring-green-200 transition-all shadow-lg hover:shadow-green-500/30 disabled:opacity-50"
                    >
                        {loading ? "..." : isArabic ? "إنشاء حساب" : "Create Account"}
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-600">
                    {isArabic ? "لديك حساب بالفعل؟ " : "Already have an account? "}
                    <Link href={`/${lang}/login`} className="text-green-500 font-bold hover:underline">
                        {isArabic ? "تسجيل الدخول" : "Log In"}
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}

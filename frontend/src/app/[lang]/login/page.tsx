"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock } from "lucide-react";
import { loginUser } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            // --- MOCK AUTHENTICATION ---
            if (email === "admin@magiccamp.com" && password === "admin123") {
                localStorage.setItem("mock_auth", JSON.stringify({
                    user: { uid: "admin-123", email },
                    role: "admin",
                    status: "approved"
                }));
                // Force a reload so AuthContext picks up the localStorage
                window.location.href = `/${lang}/dashboard`;
                return;
            }
            if (email === "parent@magiccamp.com" && password === "parent123") {
                localStorage.setItem("mock_auth", JSON.stringify({
                    user: { uid: "parent-123", email },
                    role: "parent",
                    status: "approved"
                }));
                window.location.href = `/${lang}/dashboard`;
                return;
            }
            if (email === "student@magiccamp.com" && password === "student123") {
                localStorage.setItem("mock_auth", JSON.stringify({
                    user: { uid: "student-123", email },
                    role: "child",
                    status: "approved"
                }));
                window.location.href = `/${lang}/dashboard`;
                return;
            }

            await loginUser(email, password);
            router.push(`/${lang}/dashboard`); // We will build the dashboard later
        } catch (err: any) {
            setError(err.message || "Failed to log in");
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md border-4 border-orange-200"
            >
                <div className="text-center mb-8">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <LogIn className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {isArabic ? "تسجيل الدخول" : "Welcome Back"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {isArabic ? "ادخل إلى عالم ماجيكا كامب" : "Log in to your Magica Camp account"}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
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
                                className={`w-full ${isArabic ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all ${isArabic ? 'text-right' : ''}`}
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
                                className={`w-full ${isArabic ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all ${isArabic ? 'text-right' : ''}`}
                                placeholder={isArabic ? "أدخل كلمة المرور" : "Enter your password"}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 transition-all shadow-lg hover:shadow-orange-500/30 disabled:opacity-50"
                    >
                        {loading ? "..." : isArabic ? "تسجيل الدخول" : "Log In"}
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-600">
                    {isArabic ? "ليس لديك حساب؟ " : "Don't have an account? "}
                    <Link href={`/${lang}/register`} className="text-orange-500 font-bold hover:underline">
                        {isArabic ? "سجل كولي أمر" : "Register as a Parent"}
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}

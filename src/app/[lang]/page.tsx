"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Star, Users, Gamepad2, Compass } from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";
import Navbar from "@/components/layout/Navbar";
import Gallery from "@/components/ui/Gallery";
import heroImg from "../../../public/DSC09956_edited.jpg";

export default function Home({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';

    return (
        <main className="min-h-screen font-[family-name:var(--font-inter)] text-gray-800 overflow-hidden relative">
            <MagicalBackground />
            <Navbar lang={lang} />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className={isArabic ? "text-right" : "text-left"}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-gray-200/50 mb-8 shadow-sm"
                        >
                            <Sparkles className="w-4 h-4 text-[#fd8a4c]" />
                            <span className="text-sm font-bold tracking-wide text-[#76c05a]">
                                {isArabic ? "أفضل مخيم صيفي تعليمي 2026" : "The #1 Educational Summer Camp 2026"}
                            </span>
                        </motion.div>

                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-gray-800 leading-tight"
                        >
                            {isArabic ? (
                                <>صيف مليء بـ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76c05a] to-[#fd8a4c]">السحر</span> والتعلم</>
                            ) : (
                                <>A Summer of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76c05a] to-[#fd8a4c]">Magic</span> & Learning</>
                            )}
                        </motion.h1>

                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed"
                        >
                            {isArabic 
                                ? "أطلق العنان لقدرات طفلك من خلال البرمجة، الفن، والمغامرات السحرية في بيئة آمنة ومرحة."
                                : "Unlock your child's potential through coding, art, and magical adventures in a safe, fun environment."}
                        </motion.p>

                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center gap-4"
                        >
                            <Link 
                                href={`/${lang}/register`}
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#fd8a4c] to-[#e67a3a] rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-[#fd8a4c]/40 text-white flex items-center justify-center gap-2"
                            >
                                <Star className="w-5 h-5" />
                                {isArabic ? "سجل الآن للمخيم" : "Register for Camp"}
                            </Link>
                            <Link 
                                href={`/${lang}/login`}
                                className="w-full sm:w-auto px-8 py-4 bg-white/60 backdrop-blur-md border border-[#76c05a] text-[#76c05a] rounded-full text-lg font-bold hover:bg-[#76c05a] hover:text-white transition-colors flex items-center justify-center gap-2"
                            >
                                {isArabic ? "تسجيل الدخول" : "Parent Login"}
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0, y: [0, -20, 0] }}
                        transition={{ 
                            opacity: { delay: 0.5, duration: 0.8 },
                            x: { delay: 0.5, type: "spring", bounce: 0.4 },
                            y: { repeat: Infinity, duration: 4, ease: "easeInOut" } 
                        }}
                        className="relative"
                    >
                        {/* Decorative Background blob */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#76c05a] to-[#fd8a4c] rounded-[3rem] transform rotate-3 scale-105 opacity-20 blur-xl"></div>
                        
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                            <Image 
                                src={heroImg} 
                                alt="Kids having fun at Magic Camp" 
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                placeholder="blur"
                            />
                        </div>
                        
                        {/* Decorative Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[#fd8a4c]/20 flex items-center justify-center">
                                <Users className="w-6 h-6 text-[#fd8a4c]" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">{isArabic ? "مرح وأمان" : "Fun & Safe"}</p>
                                <p className="text-sm text-gray-500">{isArabic ? "+500 طفل سعيد" : "500+ Happy Kids"}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div id="about" className="py-24 bg-white/40 backdrop-blur-sm relative z-10 border-y border-gray-200/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-800">{isArabic ? "ماذا نقدم؟" : "What We Offer"}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {isArabic ? "برنامج متكامل يجمع بين المرح والتعلم وبناء الشخصية." : "A comprehensive program combining fun, learning, and character building."}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Gamepad2, color: 'text-[#76c05a]', bg: 'bg-[#76c05a]/20', title: isArabic ? "ألعاب تعليمية" : "Educational Games", desc: isArabic ? "تعلم البرمجة والرياضيات من خلال الألعاب التفاعلية." : "Learn coding and math through interactive games." },
                            { icon: Compass, color: 'text-[#fd8a4c]', bg: 'bg-[#fd8a4c]/20', title: isArabic ? "مغامرات يومية" : "Daily Adventures", desc: isArabic ? "أنشطة بدنية واستكشاف في الطبيعة الخلابة." : "Physical activities and exploration in beautiful nature." },
                            { icon: Users, color: 'text-[#e67a3a]', bg: 'bg-[#e67a3a]/20', title: isArabic ? "بناء الشخصية" : "Character Building", desc: isArabic ? "تنمية مهارات القيادة والعمل الجماعي." : "Developing leadership and teamwork skills." }
                        ].map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="p-8 rounded-3xl bg-white/80 border border-gray-200/50 backdrop-blur-md shadow-sm"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <Gallery lang={lang} />

            {/* Footer */}
            <footer className="py-12 relative z-10 text-center text-gray-500 border-t border-gray-200/50">
                <p>&copy; 2026 Magic Camp. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
            </footer>
        </main>
    );
}

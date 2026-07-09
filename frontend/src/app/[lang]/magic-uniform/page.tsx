"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Heart, Users, Star, Award, Zap, ArrowRight, CheckCircle } from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";

export default function MagicUniformPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';

    const values = [
        {
            icon: Heart,
            color: "text-blue-500",
            bg: "bg-blue-500/15",
            title: isArabic ? "الهوية والانتماء" : "Identity & Belonging",
            desc: isArabic
                ? "الزي ليس مجرد ملابس — بل إعلان عن من أنت وأين تنتمي."
                : "The uniform isn't just clothing — it's a declaration of who you are and where you belong.",
        },
        {
            icon: Users,
            color: "text-indigo-500",
            bg: "bg-indigo-500/15",
            title: isArabic ? "شعور الفريق" : "Team Spirit",
            desc: isArabic
                ? "عندما يرتدي الجميع نفس الزي، يشعر كل طفل أنه جزء من شيء أكبر منه."
                : "When everyone wears the same uniform, every child feels part of something greater than themselves.",
        },
        {
            icon: Award,
            color: "text-cyan-500",
            bg: "bg-cyan-500/15",
            title: isArabic ? "الاحترافية" : "Professionalism",
            desc: isArabic
                ? "يمنح الطفل شعوراً بالجدية والاحترافية — يرى نفسه مهنياً من اليوم الأول."
                : "Gives children a sense of seriousness and professionalism — they see themselves as professionals from day one.",
        },
        {
            icon: Shield,
            color: "text-blue-600",
            bg: "bg-blue-600/15",
            title: isArabic ? "الفخر والثقة" : "Pride & Confidence",
            desc: isArabic
                ? "الطفل الذي يرتدي زيّه بفخر هو الطفل الذي يثق بنفسه ويحترم مكانته."
                : "The child who wears their uniform with pride is the child who trusts themselves and respects their place.",
        },
        {
            icon: Zap,
            color: "text-indigo-600",
            bg: "bg-indigo-600/15",
            title: isArabic ? "جودة عالية" : "High Quality",
            desc: isArabic
                ? "مصنوعة لتتحمل المغامرات — خامات عالية الجودة تناسب نشاط الأطفال وحيويتهم."
                : "Built to withstand adventures — high-quality materials suited to children's activity and energy.",
        },
        {
            icon: Star,
            color: "text-cyan-600",
            bg: "bg-cyan-600/15",
            title: isArabic ? "تصميم ملهم" : "Inspiring Design",
            desc: isArabic
                ? "ألوان ماجيكا زون، شعار الفريق — كل تفصيلة مصممة لتلهم وتحفّز."
                : "Magica Zone colors, team crest — every detail designed to inspire and motivate.",
        },
    ];

    const collection = [
        { emoji: "👕", name: isArabic ? "التيشيرت الرسمي" : "Official T-Shirt", color: "من أخضر إلى برتقالي", colorEn: "Green to Orange" },
        { emoji: "👖", name: isArabic ? "البنطلون الرياضي" : "Sport Pants", color: "رمادي داكن", colorEn: "Dark Grey" },
        { emoji: "🧢", name: isArabic ? "قبعة ماجيكا" : "Magica Cap", color: "أخضر وبرتقالي", colorEn: "Green & Orange" },
        { emoji: "🎒", name: isArabic ? "الحقيبة الرسمية" : "Official Backpack", color: "أسود مع شعار", colorEn: "Black with Logo" },
        { emoji: "👟", name: isArabic ? "الجوارب الرياضية" : "Sport Socks", color: "أبيض وأخضر", colorEn: "White & Green" },
        { emoji: "🧥", name: isArabic ? "جاكيت البروودي" : "Hoodie Jacket", color: "أخضر داكن", colorEn: "Dark Green" },
    ];

    return (
        <main className="min-h-screen font-[family-name:var(--font-inter)] text-gray-800 overflow-hidden relative">
            <MagicalBackground />

            {/* Hero */}
            <section className="relative pt-36 pb-24 px-6 z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-blue-200 shadow-sm mb-8"
                    >
                        <span className="text-2xl">👕</span>
                        <span className="text-sm font-black text-blue-600 uppercase tracking-widest">Magic Uniform</span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-8xl font-black text-gray-800 mb-6 leading-tight"
                    >
                        {isArabic ? (
                            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">البس</span> هويتك</>
                        ) : (
                            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Wear</span> Your Identity</>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed"
                    >
                        {isArabic
                            ? "الزي ليس مجرد ملابس — بل هوية وانتماء."
                            : "The uniform isn't just clothing — it's identity and belonging."}
                    </motion.p>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        {isArabic
                            ? "ماجيك يونيفورم يمنح الطفل شعور الفريق، الفخر، والاحترافية منذ اللحظة الأولى التي يرتديه فيها."
                            : "Magic Uniform gives children a sense of team, pride, and professionalism from the very first moment they wear it."}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link
                            href={`/${lang}/register`}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-blue-500/30"
                        >
                            {isArabic ? "اطلب زيّك الآن" : "Order Your Uniform Now"}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Quote Banner */}
            <section className="relative z-10 py-10 bg-gradient-to-r from-blue-500 to-indigo-600">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-white text-2xl md:text-3xl font-black">
                        {isArabic
                            ? "\"الطفل الذي يرتدي زيّه بفخر هو الطفل الذي يثق بنفسه.\""
                            : "\"The child who wears their uniform with pride is the child who trusts themselves.\""}
                    </p>
                </div>
            </section>

            {/* Collection Showcase */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-gray-800 mb-4">
                            {isArabic ? "مجموعة ماجيك يونيفورم" : "Magic Uniform Collection"}
                        </h2>
                        <p className="text-gray-500 text-lg">
                            {isArabic ? "كل قطعة مصممة بعناية" : "Every piece carefully designed"}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {collection.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="bg-white/90 backdrop-blur-md p-7 rounded-3xl border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 text-center group"
                            >
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{item.emoji}</div>
                                <h3 className="text-lg font-black text-gray-800 mb-1">{item.name}</h3>
                                <p className="text-xs font-semibold text-blue-400">{isArabic ? item.color : item.colorEn}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="relative z-10 py-24 px-6 bg-white/40 backdrop-blur-sm border-y border-gray-200/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-gray-800">
                            {isArabic ? "لماذا الزي مهم؟" : "Why Does the Uniform Matter?"}
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((val, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                whileHover={{ y: -6 }}
                                className="p-7 rounded-3xl bg-white/90 border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${val.bg} flex items-center justify-center mb-5`}>
                                    <val.icon className={`w-7 h-7 ${val.color}`} />
                                </div>
                                <h3 className="text-xl font-black mb-3 text-gray-800">{val.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{val.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sizing & Order CTA */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/80 backdrop-blur-md border border-blue-100 rounded-3xl p-10 shadow-xl"
                    >
                        <h2 className="text-3xl font-black text-gray-800 mb-6 text-center">
                            {isArabic ? "كيفية الطلب" : "How to Order"}
                        </h2>
                        <div className="space-y-4 mb-8">
                            {[
                                isArabic ? "سجّل طفلك في أي برنامج ماجيكا زون" : "Register your child in any Magica Zone program",
                                isArabic ? "اختر المقاسات المناسبة من القائمة" : "Choose the right sizes from the list",
                                isArabic ? "ادفع عند التسجيل أو باقة منفصلة" : "Pay at registration or as a separate package",
                                isArabic ? "استلم الزي قبل بدء البرنامج بيوم واحد" : "Receive the uniform one day before the program starts",
                            ].map((step, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5">{i + 1}</div>
                                    <span className="text-gray-700 font-semibold leading-relaxed">{step}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <Link
                                href={`/${lang}/register`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-black text-lg hover:scale-105 transition-transform shadow-lg"
                            >
                                {isArabic ? "اطلب الآن" : "Order Now"}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

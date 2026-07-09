"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, PenTool, BookOpen, Compass, Sparkles, Star, ArrowRight, CheckCircle } from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";

export default function MagicSuppliesPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';

    const features = [
        {
            icon: PenTool,
            color: "text-rose-500",
            bg: "bg-rose-500/15",
            title: isArabic ? "مصممة للإبداع" : "Designed for Creativity",
            desc: isArabic
                ? "أدوات تشجع الطفل على الرسم، البناء، الكتابة — ليس فقط الحفظ."
                : "Tools that encourage children to draw, build, write — not just memorize.",
        },
        {
            icon: BookOpen,
            color: "text-pink-500",
            bg: "bg-pink-500/15",
            title: isArabic ? "رفيق التعلم اليومي" : "Daily Learning Companion",
            desc: isArabic
                ? "كل أداة مصممة لتجعل التعلم أكثر متعة وأعمق أثراً في الحياة اليومية."
                : "Every tool is designed to make learning more enjoyable and impactful in daily life.",
        },
        {
            icon: Package,
            color: "text-rose-600",
            bg: "bg-rose-600/15",
            title: isArabic ? "جودة لا تُقارن" : "Unmatched Quality",
            desc: isArabic
                ? "أدوات تتحمل الاستخدام اليومي المكثف — لأن الطفل الجاد يستحق أدوات جادة."
                : "Tools that withstand intensive daily use — because a serious child deserves serious tools.",
        },
        {
            icon: Compass,
            color: "text-pink-600",
            bg: "bg-pink-600/15",
            title: isArabic ? "للطفل الطموح" : "For the Ambitious Child",
            desc: isArabic
                ? "مجموعة كاملة تناسب من يؤمن أن التفاصيل الصغيرة تصنع النتائج الكبيرة."
                : "A complete collection for those who believe small details create big results.",
        },
        {
            icon: Star,
            color: "text-rose-400",
            bg: "bg-rose-400/15",
            title: isArabic ? "تصاميم ملهمة" : "Inspiring Designs",
            desc: isArabic
                ? "بألوان وتصاميم ماجيكا زون — كل أداة تذكّر الطفل بمن يريد أن يكون."
                : "With Magica Zone colors and designs — every tool reminds children of who they want to become.",
        },
        {
            icon: Sparkles,
            color: "text-pink-400",
            bg: "bg-pink-400/15",
            title: isArabic ? "كاملة ومتكاملة" : "Complete & Comprehensive",
            desc: isArabic
                ? "من القلم إلى الكتاب إلى الدفتر — كل ما يحتاجه الطفل في مكان واحد."
                : "From pen to book to notebook — everything a child needs in one place.",
        },
    ];

    const products = [
        { emoji: "📓", name: isArabic ? "دفتر الأفكار" : "Ideas Notebook", sub: isArabic ? "للكتابة والرسم الحر" : "For free writing & drawing" },
        { emoji: "✏️", name: isArabic ? "أقلام الإبداع" : "Creativity Pencils", sub: isArabic ? "12 لون فاخر" : "12 premium colors" },
        { emoji: "📐", name: isArabic ? "أدوات الهندسة" : "Geometry Tools", sub: isArabic ? "مجموعة كاملة" : "Complete set" },
        { emoji: "🖊️", name: isArabic ? "أقلام الخط" : "Calligraphy Pens", sub: isArabic ? "للكتابة الاحترافية" : "For professional writing" },
        { emoji: "📚", name: isArabic ? "كتب المهارات" : "Skills Books", sub: isArabic ? "سلسلة ماجيكا التعليمية" : "Magica educational series" },
        { emoji: "🗂️", name: isArabic ? "ملف التنظيم" : "Organization Folder", sub: isArabic ? "لكل أوراقك ومشاريعك" : "For all your papers & projects" },
        { emoji: "📏", name: isArabic ? "المسطرة الذكية" : "Smart Ruler", sub: isArabic ? "مدرج ومزدوج" : "Graduated & double-sided" },
        { emoji: "🖍️", name: isArabic ? "ألوان الإبداع" : "Creativity Colors", sub: isArabic ? "ألوان شمعية وخشبية" : "Wax & wooden colors" },
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-rose-200 shadow-sm mb-8"
                    >
                        <span className="text-2xl">🎒</span>
                        <span className="text-sm font-black text-rose-600 uppercase tracking-widest">Magica Supplies</span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-7xl font-black text-gray-800 mb-6 leading-tight"
                    >
                        {isArabic ? (
                            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">جهّز نفسك.</span> جهّز مستقبلك.</>
                        ) : (
                            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Equip Yourself.</span> Equip Your Future.</>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed"
                    >
                        {isArabic
                            ? "أدوات مصممة لعقول تريد أن تبني وتبتكر."
                            : "Tools designed for minds that want to build and innovate."}
                    </motion.p>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        {isArabic
                            ? "ماجيكا سبلايز ليست مجرد أدوات مدرسية — بل رفيق يومي لكل طفل يأخذ تعليمه بجدية ويؤمن أن التفاصيل الصغيرة تصنع النتائج الكبيرة."
                            : "Magica Supplies aren't just school tools — they're a daily companion for every child who takes their education seriously and believes that small details create big results."}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link
                            href={`/${lang}/register`}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-rose-500/30"
                        >
                            {isArabic ? "اطلب مجموعتك الآن" : "Order Your Set Now"}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Quote Banner */}
            <section className="relative z-10 py-10 bg-gradient-to-r from-rose-500 to-pink-600">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-white text-2xl md:text-3xl font-black">
                        {isArabic
                            ? "\"التفاصيل الصغيرة تصنع النتائج الكبيرة.\""
                            : "\"Small details create big results.\""}
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-gray-800 mb-4">
                            {isArabic ? "ما يحتويه طقم ماجيكا سبلايز" : "What's in the Magica Supplies Kit"}
                        </h2>
                        <p className="text-gray-500 text-lg">
                            {isArabic ? "كل شيء يحتاجه الطفل الطموح" : "Everything the ambitious child needs"}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {products.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.06 }}
                                whileHover={{ y: -5, scale: 1.03 }}
                                className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-rose-100 shadow-md hover:shadow-xl transition-all duration-300 text-center group"
                            >
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.emoji}</div>
                                <h3 className="text-base font-black text-gray-800 mb-1">{item.name}</h3>
                                <p className="text-xs font-semibold text-rose-400">{item.sub}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="relative z-10 py-24 px-6 bg-white/40 backdrop-blur-sm border-y border-gray-200/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-gray-800">
                            {isArabic ? "لماذا ماجيكا سبلايز؟" : "Why Magica Supplies?"}
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                whileHover={{ y: -6 }}
                                className="p-7 rounded-3xl bg-white/90 border border-rose-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-5`}>
                                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                                </div>
                                <h3 className="text-xl font-black mb-3 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Order CTA */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/80 backdrop-blur-md border border-rose-200 rounded-3xl p-10 shadow-xl"
                    >
                        <h2 className="text-3xl font-black text-gray-800 mb-4 text-center">
                            {isArabic ? "طقم ماجيكا سبلايز الكامل" : "Complete Magica Supplies Kit"}
                        </h2>
                        <p className="text-center text-gray-500 mb-8">
                            {isArabic ? "متوفر مع كل تسجيل في برامج ماجيكا زون" : "Available with every Magica Zone program registration"}
                        </p>
                        <div className="space-y-3 mb-8">
                            {[
                                isArabic ? "8 أدوات مختارة بعناية" : "8 carefully selected tools",
                                isArabic ? "تصميم حصري بألوان ماجيكا زون" : "Exclusive design in Magica Zone colors",
                                isArabic ? "حقيبة تنظيم مجانية مع الطقم" : "Free organizing bag with the kit",
                                isArabic ? "ضمان الجودة لعام كامل" : "One-year quality guarantee",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-rose-500 shrink-0" />
                                    <span className="text-gray-700 font-semibold">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <Link
                                href={`/${lang}/register`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-black text-lg hover:scale-105 transition-transform shadow-lg"
                            >
                                {isArabic ? "اطلب الطقم الآن" : "Order the Kit Now"}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

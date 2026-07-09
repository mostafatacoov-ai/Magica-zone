"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Shield, TrendingUp, Users, Target, Zap } from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";
import Link from "next/link";

export default function AboutPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';

    const pillars = [
        {
            title: isArabic ? "ليس تسلية — بل تجهيز" : "Not Entertainment — Preparation",
            desc: isArabic
                ? "كل برنامج نقدمه مصمم بعناية لتنمية مهارة حقيقية. نجهّز الأطفال بما يحتاجه الإنسان الناجح — من قيادة وإبداع وتفكير نقدي."
                : "Every program we offer is carefully designed to develop a real skill. We equip children with what successful people need — leadership, creativity, and critical thinking.",
            icon: Target,
            color: "text-orange-500",
            bg: "bg-orange-100",
            border: "border-orange-200",
        },
        {
            title: isArabic ? "بيئة آمنة وعلمية" : "Safe & Scientific Environment",
            desc: isArabic
                ? "نوفر بيئة مراقبة بدقة حيث يمكن للآباء الاطمئنان التام، مدعومة بمناهج مبنية على أسس علمية حديثة."
                : "We provide a rigorously monitored environment where parents can have absolute peace of mind, backed by curricula built on modern scientific foundations.",
            icon: Shield,
            color: "text-blue-500",
            bg: "bg-blue-100",
            border: "border-blue-200",
        },
        {
            title: isArabic ? "النمو الشامل" : "Holistic Growth",
            desc: isArabic
                ? "نعزز جميع جوانب التنمية — المعرفية، الاجتماعية، الجسدية، والعاطفية. لأن الطفل المتوازن هو الطفل القادر على قيادة مستقبله."
                : "We foster all aspects of development — cognitive, social, physical, and emotional. Because a balanced child is a child capable of leading their future.",
            icon: TrendingUp,
            color: "text-green-500",
            bg: "bg-green-100",
            border: "border-green-200",
        },
        {
            title: isArabic ? "مجتمع داعم" : "Supportive Community",
            desc: isArabic
                ? "نبني شبكة داعمة وشاملة من الأطفال، والآباء، والمعلمين المتحمسين — لأن التعلم يزدهر داخل مجتمع متحد."
                : "We build a supportive, inclusive network of children, parents, and passionate educators — because learning thrives within a united community.",
            icon: Users,
            color: "text-purple-500",
            bg: "bg-purple-100",
            border: "border-purple-200",
        },
        {
            title: isArabic ? "العجائب والخيال" : "Wonder & Imagination",
            desc: isArabic
                ? "نبقي شرارة الفضول حية في كل ما نقوم به. نشجع الأطفال على السؤال دائماً: 'لماذا؟' و'كيف؟' و'ماذا لو؟'"
                : "We keep the spark of curiosity alive in everything we do. We encourage children to always ask: 'Why?' 'How?' and 'What if?'",
            icon: Sparkles,
            color: "text-amber-500",
            bg: "bg-amber-100",
            border: "border-amber-200",
        },
        {
            title: isArabic ? "المتعة هدف حقيقي" : "Fun Is a Real Goal",
            desc: isArabic
                ? "نؤمن أن البيئة الممتعة هي البيئة الأكثر إنتاجاً. عندما يستمتع الطفل، يتعلم بعمق أكبر وبسرعة أعلى."
                : "We believe the most enjoyable environment is the most productive. When children enjoy themselves, they learn deeper and faster.",
            icon: Zap,
            color: "text-rose-500",
            bg: "bg-rose-100",
            border: "border-rose-200",
        },
    ];

    const timeline = [
        {
            year: "2023",
            title: isArabic ? "البداية" : "The Beginning",
            desc: isArabic ? "أُطلقت ماجيكا زون برؤية واضحة: تغيير طريقة نظرة الأطفال إلى التعلم." : "Magica Zone launched with a clear vision: changing how children see learning.",
        },
        {
            year: "2024",
            title: isArabic ? "النمو" : "The Growth",
            desc: isArabic ? "توسعنا لنشمل برامج ما بعد المدرسة، ودورات اللغات، وأول بازار تعليمي." : "We expanded to include after-school programs, language courses, and the first educational bazar.",
        },
        {
            year: "2025",
            title: isArabic ? "الانطلاق" : "The Launch",
            desc: isArabic ? "إطلاق ماجيكا فود، ماجيكا يونيفورم، وماجيكا سبلايز — بيئة متكاملة." : "Launch of Magica Food, Magica Uniform, and Magica Supplies — a complete ecosystem.",
        },
        {
            year: "2026",
            title: isArabic ? "اليوم" : "Today",
            desc: isArabic ? "+500 طفل يبنون مستقبلهم معنا كل يوم." : "+500 children building their future with us every day.",
        },
    ];

    return (
        <main className="min-h-screen font-[family-name:var(--font-inter)] text-gray-800 relative pb-20 overflow-hidden">
            <MagicalBackground />

            <div className="pt-40 max-w-7xl mx-auto px-6 relative z-10">

                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-sm text-purple-500 font-bold mb-6">
                        <Heart className="w-5 h-5" />
                        {isArabic ? "هويتنا" : "Our Identity"}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-orange-500 to-green-500 mb-6 pb-2 leading-tight">
                        {isArabic ? "عن ماجيكا زون" : "About Magica Zone"}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
                        {isArabic
                            ? "ماجيكا زون — حيث يبدأ بناء الإنسان."
                            : "Magica Zone — Where Human Excellence Begins."}
                    </p>
                </motion.div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/80 backdrop-blur-md p-10 rounded-3xl border border-orange-100 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity" />
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
                        <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
                            <Target className="w-7 h-7 text-orange-500" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 mb-4">{isArabic ? "مهمتنا" : "Our Mission"}</h2>
                        <p className="text-lg text-gray-600 leading-relaxed relative z-10">
                            {isArabic
                                ? "تجهيز الأطفال بالمهارات والخبرات والأدوات التي يحتاجها الإنسان الناجح — من خلال بيئة آمنة، علمية، وممتعة في نفس الوقت."
                                : "To equip children with the skills, experiences, and tools that successful people need — through a safe, scientific, and genuinely fun environment."}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/80 backdrop-blur-md p-10 rounded-3xl border border-purple-100 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity" />
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500" />
                        <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                            <Sparkles className="w-7 h-7 text-purple-500" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 mb-4">{isArabic ? "رؤيتنا" : "Our Vision"}</h2>
                        <p className="text-lg text-gray-600 leading-relaxed relative z-10">
                            {isArabic
                                ? "أن نكون الوجهة الرائدة والأكثر ثقة لبناء جيل من القادة — أطفال يعرفون من هم، ماذا يريدون، وكيف يصلون إلى ما يحلمون."
                                : "To be the leading, most trusted destination for building a generation of leaders — children who know who they are, what they want, and how to reach their dreams."}
                        </p>
                    </motion.div>
                </div>

                {/* Core Pillars */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-gray-800">{isArabic ? "ركائزنا الأساسية" : "Our Core Pillars"}</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-28">
                    {pillars.map((pillar, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            className={`bg-white/80 backdrop-blur-md p-8 rounded-3xl border ${pillar.border} shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 flex flex-col`}
                        >
                            <div className={`w-14 h-14 rounded-2xl ${pillar.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                <pillar.icon className={`w-7 h-7 ${pillar.color}`} />
                            </div>
                            <h3 className="text-xl font-black text-gray-800 mb-3">{pillar.title}</h3>
                            <p className="text-gray-600 leading-relaxed flex-grow text-sm">{pillar.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-gray-800">{isArabic ? "رحلتنا" : "Our Journey"}</h2>
                </motion.div>

                <div className="relative max-w-3xl mx-auto mb-24">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 via-purple-300 to-green-300 hidden md:block" />
                    <div className="flex flex-col gap-10">
                        {timeline.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`flex items-center gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                <div className="flex-1 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-lg">
                                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500 mb-2">{item.year}</div>
                                    <h3 className="text-lg font-black text-gray-800 mb-1">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                                <div className="hidden md:flex w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-purple-500 border-4 border-white shadow-lg shrink-0 z-10" />
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-gradient-to-br from-orange-500 via-purple-500 to-green-500 p-1 rounded-3xl shadow-2xl mb-10"
                >
                    <div className="bg-white/95 backdrop-blur-md rounded-[calc(1.5rem-4px)] p-12">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
                            {isArabic ? "هل أنت مستعد لتجهيز طفلك؟" : "Ready to prepare your child?"}
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                            {isArabic
                                ? "انضم إلى مئات الأهالي الذين وثقوا بماجيكا زون لبناء الجيل القادم."
                                : "Join hundreds of parents who trust Magica Zone to build the next generation."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={`/${lang}/magic-camp`}
                                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
                            >
                                {isArabic ? "اكتشف ماجيكا كامب" : "Explore Magica Camp"}
                            </Link>
                            <Link
                                href={`/${lang}/register`}
                                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors"
                            >
                                {isArabic ? "سجّل طفلك الآن" : "Register Your Child"}
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>
        </main>
    );
}

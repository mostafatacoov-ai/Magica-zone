"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mic, Play, Heart, Target, Sparkles, Users, ArrowRight, Headphones } from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";
import { useCMSData } from "@/lib/cms/contentStore";

export default function MagicPodcastPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';
    const { data } = useCMSData();
    const episodes = data.podcasts;

    const topics = [
        {
            icon: Target,
            color: "text-purple-500",
            bg: "bg-purple-500/15",
            title: isArabic ? "الثقة بالنفس" : "Self-Confidence",
            desc: isArabic ? "كيف تؤمن بنفسك حتى لو شك فيك الآخرون؟" : "How to believe in yourself even when others doubt you?",
        },
        {
            icon: Sparkles,
            color: "text-violet-500",
            bg: "bg-violet-500/15",
            title: isArabic ? "اكتشاف الشغف" : "Discovering Passion",
            desc: isArabic ? "كيف تعرف ماذا تحب؟ وكيف تحوّله إلى مسار؟" : "How do you know what you love? And how do you turn it into a path?",
        },
        {
            icon: Heart,
            color: "text-fuchsia-500",
            bg: "bg-fuchsia-500/15",
            title: isArabic ? "مواجهة الفشل" : "Facing Failure",
            desc: isArabic ? "الفشل ليس النهاية — بل درس في طريق النجاح." : "Failure isn't the end — it's a lesson on the path to success.",
        },
        {
            icon: Target,
            color: "text-purple-600",
            bg: "bg-purple-600/15",
            title: isArabic ? "صناعة الحلم" : "Building Dreams",
            desc: isArabic ? "من الحلم إلى الخطة إلى الواقع — كيف تبدأ؟" : "From dream to plan to reality — where do you start?",
        },
        {
            icon: Users,
            color: "text-violet-600",
            bg: "bg-violet-600/15",
            title: isArabic ? "للأهالي أيضًا" : "For Parents Too",
            desc: isArabic ? "محتوى موجّه للأهالي: كيف تدعم طفلك بالطريقة الصحيحة؟" : "Content for parents: how to support your child in the right way?",
        },
        {
            icon: Mic,
            color: "text-fuchsia-600",
            bg: "bg-fuchsia-600/15",
            title: isArabic ? "قصص ملهمة" : "Inspiring Stories",
            desc: isArabic ? "أطفال ومراهقون شاركوا تجاربهم الحقيقية." : "Children and teenagers who shared their real experiences.",
        },
    ];

    // Dynamic CMS episodes loaded directly above

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
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-200 shadow-sm mb-8"
                    >
                        <span className="text-2xl">🎙️</span>
                        <span className="text-sm font-black text-purple-600 uppercase tracking-widest">Magica Podcast</span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-8xl font-black text-gray-800 mb-6 leading-tight"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-600">
                            {isArabic ? "كلام بيفرق" : "Words That Matter"}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed"
                    >
                        {isArabic
                            ? "صوت موجّه للأطفال والأهالي معًا."
                            : "A voice directed to children and parents together."}
                    </motion.p>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        {isArabic
                            ? "ماجيكا بودكاست يناقش ما لا تناقشه المدرسة: الثقة بالنفس، اكتشاف الشغف، مواجهة الفشل، وصناعة الحلم. لأن الكلمة الصحيحة في الوقت الصحيح تغيّر مسار إنسان."
                            : "Magica Podcast discusses what school doesn't: self-confidence, discovering passion, facing failure, and building dreams. Because the right word at the right time changes a person's path."}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="#episodes"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-purple-500/30"
                        >
                            <Play className="w-6 h-6 fill-current" />
                            {isArabic ? "استمع الآن" : "Listen Now"}
                        </Link>
                        <Link
                            href="#topics"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white/80 backdrop-blur-md border-2 border-purple-200 text-purple-600 rounded-full font-black text-xl hover:border-purple-400 transition-colors"
                        >
                            <Headphones className="w-6 h-6" />
                            {isArabic ? "استكشف المواضيع" : "Explore Topics"}
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Quote Banner */}
            <section className="relative z-10 py-12 bg-gradient-to-r from-purple-500 to-fuchsia-600">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-white text-2xl md:text-3xl font-black">
                        {isArabic
                            ? "\"الكلمة الصحيحة في الوقت الصحيح تغيّر مسار إنسان.\""
                            : "\"The right word at the right time changes a person's path.\""}
                    </p>
                </div>
            </section>

            {/* Featured Episodes */}
            <section id="episodes" className="relative z-10 py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-gray-800 mb-4">
                            {isArabic ? "حلقات مميزة" : "Featured Episodes"}
                        </h2>
                        <p className="text-gray-500">
                            {isArabic ? "استمع وغيّر نظرتك للحياة" : "Listen and change your perspective on life"}
                        </p>
                    </div>
                    <div className="space-y-6">
                        {episodes.map((ep, idx) => (
                            <motion.div
                                key={ep.id || idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col sm:flex-row items-center gap-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-purple-100 shadow-md hover:shadow-xl hover:border-purple-300 transition-all duration-300 group"
                            >
                                <div className="relative w-full sm:w-36 h-36 rounded-2xl overflow-hidden bg-purple-50 shrink-0 flex items-center justify-center border border-purple-100">
                                    {ep.imageUrl ? (
                                        <img src={ep.imageUrl} alt={isArabic ? ep.titleAr : ep.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center shadow-lg">
                                            <Play className="w-8 h-8 text-white fill-current ml-1" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white/90 text-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <Play className="w-6 h-6 fill-current ml-0.5" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-grow text-start">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-100 text-purple-700">{ep.category || (isArabic ? "حلقة خاصة" : "Special Episode")}</span>
                                        <span className="text-xs font-bold text-gray-400">• {ep.duration}</span>
                                        {(ep.hostEn || ep.hostAr) && (
                                            <span className="text-xs font-bold text-fuchsia-600">
                                                | {isArabic ? "المضيف:" : "Host:"} {isArabic ? ep.hostAr : ep.hostEn}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                                        {isArabic ? ep.titleAr : ep.titleEn}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        {isArabic ? ep.descAr : ep.descEn}
                                    </p>
                                    {ep.audioUrl && (
                                        <audio controls src={ep.audioUrl} className="w-full h-10 rounded-lg outline-none" />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Topics Grid */}
            <section id="topics" className="relative z-10 py-24 px-6 bg-white/40 backdrop-blur-sm border-y border-gray-200/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-gray-800 mb-4">
                            {isArabic ? "مواضيعنا" : "Our Topics"}
                        </h2>
                        <p className="text-gray-500 text-lg">
                            {isArabic ? "ما لا تناقشه المدرسة — نناقشه نحن" : "What school doesn't discuss — we do"}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topics.map((topic, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                whileHover={{ y: -6 }}
                                className="p-7 rounded-3xl bg-white/90 border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${topic.bg} flex items-center justify-center mb-5`}>
                                    <topic.icon className={`w-7 h-7 ${topic.color}`} />
                                </div>
                                <h3 className="text-xl font-black mb-3 text-gray-800">{topic.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{topic.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subscribe CTA */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-purple-500 to-fuchsia-600 p-10 rounded-3xl text-white text-center shadow-2xl shadow-purple-500/30"
                    >
                        <div className="text-5xl mb-4">🎙️</div>
                        <h2 className="text-3xl font-black mb-4">
                            {isArabic ? "لا تفوّت حلقة واحدة" : "Don't Miss a Single Episode"}
                        </h2>
                        <p className="text-purple-100 mb-8 text-lg max-w-xl mx-auto">
                            {isArabic
                                ? "اشترك الآن واستمع لكل جديد من ماجيكا بودكاست — مجانًا."
                                : "Subscribe now and listen to everything new from Magica Podcast — for free."}
                        </p>
                        <Link
                            href={`/${lang}/register`}
                            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-purple-600 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-xl"
                        >
                            <Mic className="w-5 h-5" />
                            {isArabic ? "اشترك الآن" : "Subscribe Now"}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

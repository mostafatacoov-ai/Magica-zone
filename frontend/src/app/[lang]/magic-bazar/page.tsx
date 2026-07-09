"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import bazarLogo from "../../../../public/magica-bazar-print.png";
import { ShoppingBag, TrendingUp, Users, DollarSign, Lightbulb, Star, ArrowRight, CheckCircle } from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";

export default function MagicBazarPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';

    const features = [
        {
            icon: ShoppingBag,
            color: "text-magica-orange-500",
            bg: "bg-magica-orange-500/15",
            title: isArabic ? "العرض والبيع" : "Pitch & Sell",
            desc: isArabic
                ? "يتعلم الطفل كيف يعرض منتجه بثقة، ويقنع الآخرين بقيمته."
                : "Children learn how to present their product with confidence and convince others of its value.",
        },
        {
            icon: DollarSign,
            color: "text-magica-orange-600",
            bg: "bg-magica-orange-600/15",
            title: isArabic ? "إدارة المال" : "Money Management",
            desc: isArabic
                ? "مقدمة عملية لمفاهيم التسعير، الربح، والتكلفة — بطريقة يفهمها الأطفال."
                : "A practical introduction to pricing, profit, and cost concepts — in a way children understand.",
        },
        {
            icon: TrendingUp,
            color: "text-magica-purple-500",
            bg: "bg-magica-purple-500/15",
            title: isArabic ? "التفاوض" : "Negotiation",
            desc: isArabic
                ? "فن الوصول إلى اتفاق يُرضي الطرفين — مهارة يحتاجها كل إنسان ناجح."
                : "The art of reaching a mutually beneficial agreement — a skill every successful person needs.",
        },
        {
            icon: Lightbulb,
            color: "text-magica-yellow-500",
            bg: "bg-magica-yellow-500/15",
            title: isArabic ? "التفكير الريادي" : "Entrepreneurial Thinking",
            desc: isArabic
                ? "من فكرة إلى منتج إلى بيع — الطفل يعيش دورة ريادة الأعمال كاملة."
                : "From idea to product to sale — children live the complete entrepreneurship cycle.",
        },
        {
            icon: Users,
            color: "text-magica-orange-700",
            bg: "bg-magica-orange-700/15",
            title: isArabic ? "خدمة العملاء" : "Customer Service",
            desc: isArabic
                ? "كيف تتعامل مع الزبون؟ كيف تبني علاقة؟ كيف تخدم بامتياز؟"
                : "How do you deal with a customer? How do you build a relationship? How do you serve with excellence?",
        },
        {
            icon: Star,
            color: "text-magica-purple-600",
            bg: "bg-magica-purple-600/15",
            title: isArabic ? "بناء الثقة" : "Building Confidence",
            desc: isArabic
                ? "السوق الحقيقي يمنح الطفل ثقة حقيقية — ليس من الكتب، بل من التجربة المباشرة."
                : "The real market gives children real confidence — not from books, but from direct experience.",
        },
    ];

    const steps = [
        { num: "01", title: isArabic ? "اختر منتجك" : "Choose Your Product", desc: isArabic ? "كل طفل يقرر ماذا يريد أن يبيع" : "Every child decides what they want to sell" },
        { num: "02", title: isArabic ? "جهّز كشكك" : "Set Up Your Stall", desc: isArabic ? "صمّم، رتّب، واعرض بطريقتك" : "Design, arrange, and display your way" },
        { num: "03", title: isArabic ? "ابدأ البيع" : "Start Selling", desc: isArabic ? "تفاوض، أقنع، وأتمّ الصفقة" : "Negotiate, convince, and close the deal" },
        { num: "04", title: isArabic ? "احسب الأرباح" : "Count Your Profits", desc: isArabic ? "تعلّم من النتائج وابدأ من جديد" : "Learn from results and start again" },
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
                        className="mb-8"
                    >
                        <Image src={bazarLogo} alt="Magica Bazar" className="h-32 w-auto mx-auto object-contain drop-shadow-md" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black text-gray-800 mb-6 leading-tight"
                    >
                        {isArabic ? (
                            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-magica-orange-500 to-magica-purple-600">اشتري. بيع.</span> تعلّم. انجح.</>
                        ) : (
                            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-magica-orange-500 to-magica-purple-600">Buy. Sell.</span> Learn. Succeed.</>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed"
                    >
                        {isArabic
                            ? "هنا لا يكون الطفل زائراً — بل صاحب عمل."
                            : "Here, the child isn't a visitor — they're a business owner."}
                    </motion.p>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        {isArabic
                            ? "ماجيكا بازار هو أول سوق حقيقي يتعلم فيه الطفل كيف يعرض، يبيع، يتفاوض، ويدير. لأن أفضل درس في ريادة الأعمال لا يُدرَّس في فصل — بل يُعاش في السوق."
                            : "Magica Bazar is the first real marketplace where children learn to pitch, sell, negotiate, and manage. Because the best entrepreneurship lesson isn't taught in a classroom — it's lived in the market."}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link
                            href={`/${lang}/register`}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-magica-orange-500 to-magica-purple-600 text-white rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-magica-orange-500/30"
                        >
                            {isArabic ? "سجّل طفلك في البازار" : "Register for Bazar"}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Quote Banner */}
            <section className="relative z-10 py-12 bg-gradient-to-r from-magica-orange-500 to-magica-purple-600">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-white text-2xl md:text-3xl font-black">
                        {isArabic
                            ? "\"أفضل درس في ريادة الأعمال لا يُدرَّس في فصل — بل يُعاش في السوق.\""
                            : "\"The best entrepreneurship lesson isn't taught in a classroom — it's lived in the market.\""}
                    </p>
                </div>
            </section>

            {/* How It Works */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-800 mb-4">
                            {isArabic ? "كيف يعمل البازار؟" : "How the Bazar Works?"}
                        </h2>
                        <p className="text-gray-500 text-lg max-w-xl mx-auto">
                            {isArabic ? "أربع خطوات بسيطة، درس لا يُنسى" : "Four simple steps, an unforgettable lesson"}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/80 backdrop-blur-md p-7 rounded-3xl border border-magica-orange-100 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group"
                            >
                                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-magica-yellow-400 to-magica-orange-600 mb-4 group-hover:scale-110 transition-transform inline-block">{step.num}</div>
                                <h3 className="text-lg font-black text-gray-800 mb-2">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Grid */}
            <section className="relative z-10 py-24 px-6 bg-white/40 backdrop-blur-sm border-y border-gray-200/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-gray-800 mb-4">
                            {isArabic ? "ما يتعلمه طفلك" : "What Your Child Learns"}
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
                                className="p-7 rounded-3xl bg-white/90 border border-magica-orange-100 shadow-sm hover:shadow-xl transition-all duration-300"
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

            {/* Who Can Join */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gradient-to-br from-magica-orange-50 to-magica-yellow-50 border border-magica-orange-200 rounded-3xl p-10 shadow-xl">
                        <h2 className="text-3xl font-black text-gray-800 mb-8 text-center">
                            {isArabic ? "من يستطيع المشاركة؟" : "Who Can Participate?"}
                        </h2>
                        <div className="space-y-4">
                            {[
                                isArabic ? "الأطفال من عمر 7 إلى 16 سنة" : "Children aged 7 to 16 years",
                                isArabic ? "لا تجربة سابقة مطلوبة — نبدأ من الصفر" : "No prior experience required — we start from scratch",
                                isArabic ? "مشاركة فردية أو ضمن فريق" : "Individual or team participation",
                                isArabic ? "كل المنتجات مسموح بها (ضمن الضوابط)" : "All products allowed (within guidelines)",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <CheckCircle className="w-5 h-5 text-magica-orange-500 shrink-0" />
                                    <span className="text-gray-700 font-semibold">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 text-center">
                            <Link
                                href={`/${lang}/register`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-magica-orange-500 to-magica-purple-600 text-white rounded-full font-black text-lg hover:scale-105 transition-transform shadow-lg"
                            >
                                {isArabic ? "احجز مكانك الآن" : "Reserve Your Spot Now"}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

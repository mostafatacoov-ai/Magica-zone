"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, TrendingUp, Target } from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";
import Image from "next/image";
import campLogo from "../../../public/magica-camp-print.png";
import bazarLogo from "../../../public/magica-bazar-print.png";
import foodLogo from "../../../public/magica-food-print.png";

const SUB_BRANDS = (lang: string, isArabic: boolean) => [
    {
        emoji: "🏕️",
        logoImg: campLogo,
        title: isArabic ? "ماجيك كامب" : "Magic Camp",
        tagline: isArabic ? "صيف واحد يغيّر كل شيء" : "One Summer Changes Everything",
        desc: isArabic
            ? "أكثر من معسكر صيفي — تجربة تُعيد تشكيل شخصية طفلك."
            : "More than a summer camp — an experience that reshapes your child's character.",
        href: `/${lang}/magic-camp`,
        from: "from-magica-teal-500",
        to: "to-magica-teal-700",
        border: "border-magica-teal-200",
        bg: "bg-magica-teal-50",
        text: "text-magica-teal-600",
        shadowHover: "hover:shadow-magica-teal-500/20",
    },
    {
        emoji: "🛍️",
        logoImg: bazarLogo,
        title: isArabic ? "ماجيك بازار" : "Magic Bazar",
        tagline: isArabic ? "اشتري. بيع. تعلّم. انجح." : "Buy. Sell. Learn. Succeed.",
        desc: isArabic
            ? "أول سوق حقيقي يتعلم فيه الطفل كيف يعرض، يبيع، ويدير."
            : "The first real marketplace where children learn to pitch, sell, and manage.",
        href: `/${lang}/magic-bazar`,
        from: "from-magica-orange-500",
        to: "to-magica-orange-600",
        border: "border-magica-orange-200",
        bg: "bg-magica-orange-50",
        text: "text-magica-orange-600",
        shadowHover: "hover:shadow-magica-orange-500/20",
    },
    {
        emoji: "🍱",
        logoImg: foodLogo,
        title: isArabic ? "ماجيك فود" : "Magic Food",
        tagline: isArabic ? "أكل صح = تفكير صح" : "Eat Right = Think Right",
        desc: isArabic
            ? "وجبات مصممة علمياً لدعم تركيز الأطفال وطاقتهم."
            : "Scientifically designed meals to fuel children's focus and energy.",
        href: `/${lang}/magic-food`,
        from: "from-magica-navy-400",
        to: "to-magica-navy-600",
        border: "border-magica-navy-200",
        bg: "bg-magica-navy-50",
        text: "text-magica-navy-600",
        shadowHover: "hover:shadow-magica-navy-500/20",
    },
    {
        emoji: "🎙️",
        title: isArabic ? "ماجيك بودكاست" : "Magic Podcast",
        tagline: isArabic ? "كلام بيفرق" : "Words That Matter",
        desc: isArabic
            ? "صوت موجّه للأطفال والأهالي — كلام يغيّر مسار إنسان."
            : "A voice for children and parents — conversations that change lives.",
        href: `/${lang}/magic-podcast`,
        from: "from-magica-purple-500",
        to: "to-magica-purple-700",
        border: "border-magica-purple-200",
        bg: "bg-magica-purple-50",
        text: "text-magica-purple-600",
        shadowHover: "hover:shadow-magica-purple-500/20",
    },
    {
        emoji: "👕",
        title: isArabic ? "ماجيك يونيفورم" : "Magic Uniform",
        tagline: isArabic ? "البس هويتك" : "Wear Your Identity",
        desc: isArabic
            ? "الزي ليس مجرد ملابس — بل هوية وانتماء وشعور بالفريق."
            : "More than clothing — it's identity, belonging, and team pride.",
        href: `/${lang}/magic-uniform`,
        from: "from-magica-teal-400",
        to: "to-magica-teal-600",
        border: "border-magica-teal-200",
        bg: "bg-magica-teal-50",
        text: "text-magica-teal-600",
        shadowHover: "hover:shadow-magica-teal-500/20",
    },
    {
        emoji: "🎒",
        title: isArabic ? "ماجيك سبلايز" : "Magic Supplies",
        tagline: isArabic ? "جهّز نفسك. جهّز مستقبلك." : "Equip Yourself. Equip Your Future.",
        desc: isArabic
            ? "أدوات مصممة لعقول تريد أن تبني وتبتكر."
            : "Tools designed for minds that want to build and innovate.",
        href: `/${lang}/magic-supplies`,
        from: "from-magica-orange-400",
        to: "to-magica-orange-500",
        border: "border-magica-orange-200",
        bg: "bg-magica-orange-50",
        text: "text-magica-orange-600",
        shadowHover: "hover:shadow-magica-orange-500/20",
    },
];

const STATS = (isArabic: boolean) => [
    { value: "500+", label: isArabic ? "طفل" : "Children" },
    { value: "6", label: isArabic ? "برامج متخصصة" : "Programs" },
    { value: "100%", label: isArabic ? "بيئة آمنة" : "Safe Environment" },
];

export default function MagicaZoneHome({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';
    const brands = SUB_BRANDS(lang, isArabic);
    const stats = STATS(isArabic);

    return (
        <main className="min-h-screen font-[family-name:var(--font-inter)] text-gray-800 overflow-hidden relative pb-20 pt-24">
            <MagicalBackground />

            {/* Hero Section */}
            <header className="relative z-10 py-20 px-6 text-center min-h-[85vh] flex flex-col justify-center items-center">
                {/* Floating sparkles */}
                <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="absolute top-16 left-[10%] text-orange-400 opacity-40 hidden md:block"
                >
                    <Sparkles className="w-14 h-14" />
                </motion.div>
                <motion.div
                    className="absolute bottom-24 right-[10%] text-magica-purple-400 opacity-30 hidden md:block"
                >
                    <Sparkles className="w-20 h-20" />
                </motion.div>

                <motion.div
                    initial={{ y: -40, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                    className="flex flex-col items-center justify-center gap-6 relative max-w-5xl mx-auto"
                >
                    {/* Glowing aura */}
                    <div className="absolute inset-0 bg-gradient-to-r from-magica-orange-500/15 via-magica-purple-500/15 to-magica-teal-500/15 blur-[120px] rounded-full w-full h-full -z-10" />

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg text-magica-navy-600 font-bold cursor-default"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        >
                            <Sparkles className="w-5 h-5" />
                        </motion.div>
                        {isArabic ? "حيث يبدأ بناء الإنسان" : "Where Human Excellence Begins"}
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-magica-orange-500 via-magica-purple-500 to-magica-teal-500 tracking-tighter drop-shadow-lg pb-4 leading-none">
                        {isArabic ? "ماجيكا زون" : "Magica Zone"}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight"
                    >
                        {isArabic ? "هنا يُصنع الجيل." : "Where Children Become Leaders."}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-xl text-gray-600 max-w-2xl text-center leading-relaxed"
                    >
                        {isArabic
                            ? "مهمتنا ليست التسلية — بل التجهيز. نجهّز الأطفال بالمهارات والخبرات والأدوات التي يحتاجها الإنسان الناجح."
                            : "Our mission isn't entertainment — it's preparation. We equip children with the skills, experiences, and tools that successful people need."}
                    </motion.p>

                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
                        className="flex flex-col sm:flex-row gap-4 mt-4"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-magica-orange-600 to-magica-purple-600 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse" />
                            <Link
                                href={`/${lang}/magic-camp`}
                                className="relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-magica-orange-500 to-magica-purple-500 text-white rounded-full font-bold text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-magica-orange-500/40"
                            >
                                {isArabic ? "اكتشف عالمنا" : "Explore Our World"}
                                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                    →
                                </motion.span>
                            </Link>
                        </div>
                        <Link
                            href={`/${lang}/login`}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white/80 backdrop-blur-md border-2 border-gray-200 text-gray-700 rounded-full font-bold text-xl hover:border-magica-orange-400 hover:text-magica-orange-500 transition-all shadow-lg"
                        >
                            {isArabic ? "بوابة الأهالي" : "Parent Portal"}
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="mt-20 flex flex-wrap items-center justify-center gap-12"
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl font-black text-gray-800">{stat.value}</div>
                            <div className="text-sm font-semibold text-gray-500 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </header>

            {/* Philosophy Section */}
            <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-sm text-magica-orange-500 font-bold mb-8">
                        <Target className="w-5 h-5" />
                        {isArabic ? "فلسفتنا" : "Our Philosophy"}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6 tracking-tight leading-tight">
                        {isArabic ? "نؤمن أن كل طفل يحمل داخله إمكانات لا حدود لها." : "We believe every child carries unlimited potential within."}
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {isArabic
                            ? "في ماجيكا زون، نوفر بيئة آمنة، علمية، وممتعة في نفس الوقت — تُطلق تلك الإمكانات وتُحوّلها إلى مهارات حقيقية وخبرات تدوم مدى الحياة."
                            : "At Magica Zone, we provide a safe, scientific, and fun environment — one that unlocks that potential and transforms it into real skills and lifelong experiences."}
                    </p>
                </motion.div>
            </section>

            {/* Sub-Brands Grid */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-sm text-magica-teal-600 font-bold mb-6">
                        <TrendingUp className="w-5 h-5" />
                        {isArabic ? "برامجنا" : "Our Programs"}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight">
                        {isArabic ? "اكتشف عالم ماجيكا" : "Discover the Magica World"}
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {brands.map((brand, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08, duration: 0.5 }}
                        >
                            <Link href={brand.href} className="block group h-full">
                                <div className={`h-full p-8 rounded-3xl bg-white/80 backdrop-blur-md border ${brand.border} shadow-md hover:shadow-2xl ${brand.shadowHover} transition-all duration-300 transform group-hover:-translate-y-2 relative overflow-hidden flex flex-col`}>

                                    {/* Gradient top accent */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${brand.from} ${brand.to} opacity-60 group-hover:opacity-100 transition-opacity`} />

                                    {/* Deco blob */}
                                    <div className={`absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gradient-to-br ${brand.from} ${brand.to} opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500`} />

                                    <div className="relative z-10 flex-grow">
                                        <div className={`w-16 h-16 rounded-2xl ${brand.bg} flex items-center justify-center mb-5 text-3xl group-hover:scale-110 transition-transform duration-300`}>
                                            {brand.logoImg ? (
                                                <Image src={brand.logoImg} alt={brand.title} className="w-12 h-12 object-contain drop-shadow-sm" />
                                            ) : (
                                                brand.emoji
                                            )}
                                        </div>
                                        <p className={`text-xs font-black uppercase tracking-widest ${brand.text} mb-2`}>{brand.tagline}</p>
                                        <h3 className="text-2xl font-black mb-3 text-gray-800">{brand.title}</h3>
                                        <p className="text-gray-500 font-medium leading-relaxed text-sm">{brand.desc}</p>
                                    </div>

                                    <div className={`relative z-10 mt-8 flex items-center gap-2 font-bold ${brand.text} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`}>
                                        {isArabic ? "اكتشف المزيد" : "Explore"} →
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import campLogo from "../../../../public/magica-camp-print.png";
import { Sparkles, Star, Users, Lightbulb, Handshake, Brain, ArrowRight } from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";
import Gallery from "@/components/ui/Gallery";
import heroImg from "../../../../public/DSC09956_edited.jpg";
import { useCMSData } from "@/lib/cms/contentStore";

export default function MagicCampPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';
    const { data } = useCMSData();
    const camps = data.camps;

    const skills = [
        {
            icon: Star,
            color: "text-magica-teal-500",
            bg: "bg-magica-teal-500/15",
            title: isArabic ? "القيادة" : "Leadership",
            desc: isArabic
                ? "يتعلم الطفل كيف يقود، يتخذ قرارات، ويتحمل مسؤولية فريقه بثقة وشجاعة."
                : "Children learn how to lead, make decisions, and take responsibility for their team with confidence and courage.",
        },
        {
            icon: Lightbulb,
            color: "text-magica-orange-500",
            bg: "bg-magica-orange-500/15",
            title: isArabic ? "الإبداع" : "Creativity",
            desc: isArabic
                ? "من خلال الفن، الموسيقى، والتصميم — نطلق العنان للخيال ونحوّله إلى أفكار حقيقية."
                : "Through art, music, and design — we unleash imagination and transform it into real ideas.",
        },
        {
            icon: Handshake,
            color: "text-magica-navy-500",
            bg: "bg-magica-navy-500/15",
            title: isArabic ? "التعاون" : "Collaboration",
            desc: isArabic
                ? "الفريق الذي يعمل معًا ينجح معًا. نعلّم الأطفال كيف يبنون علاقات حقيقية تقوم على الاحترام والثقة."
                : "A team that works together succeeds together. We teach children how to build real relationships based on respect and trust.",
        },
        {
            icon: Brain,
            color: "text-magica-purple-500",
            bg: "bg-magica-purple-500/15",
            title: isArabic ? "حل المشكلات" : "Problem Solving",
            desc: isArabic
                ? "كل تحدي في المخيم هو فرصة للتفكير النقدي. نجهّز الأطفال ليكونوا مفكّرين لا مستهلكين."
                : "Every challenge at camp is an opportunity for critical thinking. We prepare children to be thinkers, not consumers.",
        },
        {
            icon: Users,
            color: "text-magica-teal-600",
            bg: "bg-magica-teal-600/15",
            title: isArabic ? "الثقة بالنفس" : "Self-Confidence",
            desc: isArabic
                ? "في بيئة آمنة ومشجعة، يكتشف كل طفل قدراته الحقيقية ويتعلم كيف يؤمن بنفسه."
                : "In a safe and encouraging environment, every child discovers their true abilities and learns to believe in themselves.",
        },
        {
            icon: Sparkles,
            color: "text-magica-orange-600",
            bg: "bg-magica-orange-600/15",
            title: isArabic ? "المرح الهادف" : "Purposeful Fun",
            desc: isArabic
                ? "كل لعبة، كل نشاط، كل مغامرة — مصممة بعناية لتكون ممتعة وذات قيمة في نفس الوقت."
                : "Every game, every activity, every adventure — carefully designed to be both enjoyable and valuable at the same time.",
        },
    ];

    const schedule = [
        { time: isArabic ? "8:00 ص" : "8:00 AM", activity: isArabic ? "الاستقبال وبدء اليوم" : "Welcome & Morning Start" },
        { time: isArabic ? "9:00 ص" : "9:00 AM", activity: isArabic ? "جلسة المهارة الرئيسية" : "Core Skill Session" },
        { time: isArabic ? "11:00 ص" : "11:00 AM", activity: isArabic ? "استراحة ماجيكا فود" : "Magica Food Break" },
        { time: isArabic ? "11:30 ص" : "11:30 AM", activity: isArabic ? "نشاط المغامرة الجماعي" : "Group Adventure Activity" },
        { time: isArabic ? "1:30 م" : "1:30 PM", activity: isArabic ? "ورشة الإبداع الحر" : "Free Creativity Workshop" },
        { time: isArabic ? "3:00 م" : "3:00 PM", activity: isArabic ? "وقت الفريق والألعاب" : "Team Games & Wrap-Up" },
    ];

    return (
        <main className="min-h-screen font-[family-name:var(--font-inter)] text-gray-800 overflow-hidden relative">
            <MagicalBackground />

            {/* Hero */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <div className={isArabic ? "text-right" : "text-left"}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                            className="mb-8"
                        >
                            <Image src={campLogo} alt="Magica Camp" className="h-32 w-auto object-contain drop-shadow-md" />
                        </motion.div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-gray-800 leading-tight"
                        >
                            {isArabic ? (
                                <>صيف واحد <span className="text-transparent bg-clip-text bg-gradient-to-r from-magica-teal-500 to-magica-orange-500">يغيّر</span> كل شيء</>
                            ) : (
                                <>One Summer <span className="text-transparent bg-clip-text bg-gradient-to-r from-magica-teal-500 to-magica-orange-500">Changes</span> Everything</>
                            )}
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-gray-600 mb-6 leading-relaxed"
                        >
                            {isArabic
                                ? "أكثر من معسكر صيفي — تجربة تُعيد تشكيل شخصية طفلك."
                                : "More than a summer camp — an experience that reshapes your child's character."}
                        </motion.p>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.35 }}
                            className="text-lg text-gray-500 mb-10 leading-relaxed"
                        >
                            {isArabic
                                ? "كل نشاط مصمم بعناية لينمّي مهارة حقيقية: القيادة، الإبداع، التعاون، وحل المشكلات. لأن الصيف الحقيقي لا يُقاس بالمتعة فقط — بل بمن أصبح طفلك بعده."
                                : "Every activity is carefully designed to develop a real skill: leadership, creativity, collaboration, and problem-solving. Because a real summer isn't only measured by fun — but by who your child becomes after it."}
                        </motion.p>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center gap-4"
                        >
                            <Link
                                href={`/${lang}/register`}
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-magica-teal-500 to-magica-teal-600 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-magica-teal-500/30 text-white flex items-center justify-center gap-2"
                            >
                                <Star className="w-5 h-5" />
                                {isArabic ? "سجّل الآن" : "Register for Camp"}
                            </Link>
                            <Link
                                href={`/${lang}/login`}
                                className="w-full sm:w-auto px-8 py-4 bg-white/60 backdrop-blur-md border-2 border-magica-teal-500 text-magica-teal-500 rounded-full text-lg font-bold hover:bg-magica-teal-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                            >
                                {isArabic ? "بوابة الأهالي" : "Parent Login"}
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
                        transition={{
                            opacity: { delay: 0.5, duration: 0.8 },
                            x: { delay: 0.5, type: "spring", bounce: 0.4 },
                            y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                        }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-magica-teal-500 to-magica-orange-500 rounded-[3rem] transform rotate-3 scale-105 opacity-20 blur-xl" />
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src={heroImg}
                                alt={isArabic ? "أطفال في ماجيكا كامب" : "Kids having fun at Magica Camp"}
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                placeholder="blur"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-magica-teal-500/20 flex items-center justify-center text-2xl">🏕️</div>
                            <div>
                                <p className="font-bold text-gray-800">{isArabic ? "مرح + تعلم + نمو" : "Fun + Learn + Grow"}</p>
                                <p className="text-sm text-gray-500">{isArabic ? "+500 طفل سعيد" : "500+ Happy Kids"}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="py-24 bg-white/50 backdrop-blur-sm relative z-10 border-y border-gray-200/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4 text-gray-800">
                            {isArabic ? "المهارات التي نبنيها" : "The Skills We Build"}
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            {isArabic
                                ? "كل نشاط في المخيم يستهدف مهارة محددة. لا عشوائية — بل منهج مصمم بعناية."
                                : "Every camp activity targets a specific skill. No randomness — a carefully designed curriculum."}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                whileHover={{ y: -8 }}
                                className="p-7 rounded-3xl bg-white/80 border border-gray-200/50 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${skill.bg} flex items-center justify-center mb-5`}>
                                    <skill.icon className={`w-7 h-7 ${skill.color}`} />
                                </div>
                                <h3 className="text-xl font-black mb-3 text-gray-800">{skill.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{skill.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dynamic CMS Camp Programs & Tracks */}
            {camps.length > 0 && (
                <div className="py-20 bg-emerald-50/30 relative z-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="bg-emerald-100 text-emerald-700 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block shadow-sm">
                                {isArabic ? "برامج ومعسكرات متاحة للتسجيل" : "Open Camp Programs"}
                            </span>
                            <h2 className="text-4xl font-black text-gray-900 mb-4">
                                {isArabic ? "اختر المغامرة الصيفية المناسبة لطِفلك" : "Choose Your Child's Summer Adventure"}
                            </h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-base font-medium">
                                {isArabic ? "تعرف على البرامج الحالية بمواقعها ومواعيدها وتصويرها الحي من داخل المخيمات" : "Explore our current live tracks with locations, schedules, and camp real photography"}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {camps.map((camp) => (
                                <motion.div
                                    key={camp.id}
                                    whileHover={{ y: -6 }}
                                    className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-between group transition-all"
                                >
                                    <div>
                                        {/* Image Banner */}
                                        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                                            {camp.imageUrl ? (
                                                <img 
                                                    src={camp.imageUrl} 
                                                    alt={isArabic ? camp.titleAr : camp.titleEn}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-4xl bg-emerald-50 text-emerald-500">🏕️</div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            <span className="absolute bottom-3 right-3 bg-emerald-600 text-white font-black text-sm px-3.5 py-1 rounded-full shadow-lg">
                                                ${camp.price}
                                            </span>
                                            <span className="absolute top-3 left-3 bg-white/90 text-gray-900 font-black text-xs px-3 py-1 rounded-full shadow-md backdrop-blur-md">
                                                {isArabic ? camp.locationAr : camp.locationEn}
                                            </span>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center justify-between text-xs font-black text-emerald-600 mb-2">
                                                <span>📅 {isArabic ? camp.datesAr : camp.datesEn}</span>
                                                <span>🧒 {isArabic ? camp.ageAr : camp.ageEn}</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                                                {isArabic ? camp.titleAr : camp.titleEn}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                                {isArabic ? camp.descAr : camp.descEn}
                                            </p>

                                            <div className="border-t border-gray-100 pt-4">
                                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                                    {isArabic ? "أهم المزايا والأنشطة:" : "Key Activities & Highlights:"}
                                                </h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {(isArabic ? camp.featuresAr : camp.featuresEn).map((feat, idx) => (
                                                        <span key={idx} className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-xl border border-emerald-100">
                                                            ✦ {feat}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 pt-0">
                                        <Link href={`/${lang}/register`}>
                                            <button className="w-full py-3.5 bg-gray-900 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2">
                                                <span>{isArabic ? "تسجيل وحجز مكان في المعسكر" : "Enroll in this Camp"}</span>
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Daily Schedule */}
            <div className="py-24 relative z-10">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-gray-800 mb-4">
                            {isArabic ? "يوم في المخيم" : "A Day at Camp"}
                        </h2>
                        <p className="text-gray-500">
                            {isArabic ? "كل لحظة لها هدف" : "Every moment has a purpose"}
                        </p>
                    </div>
                    <div className="space-y-4">
                        {schedule.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.07 }}
                                className="flex items-center gap-6 bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-magica-teal-200 group"
                            >
                                <div className="w-20 shrink-0 text-center">
                                    <span className="text-sm font-black text-magica-teal-600 bg-magica-teal-50 px-3 py-1 rounded-full">{item.time}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-magica-teal-400 transition-colors shrink-0" />
                                <span className="font-semibold text-gray-700 text-sm">{item.activity}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-magica-teal-500 to-magica-teal-700 p-10 rounded-3xl text-white text-center shadow-2xl shadow-magica-teal-500/30"
                >
                    <h2 className="text-3xl font-black mb-4">
                        {isArabic ? "احجز مكان طفلك الآن" : "Reserve Your Child's Spot Now"}
                    </h2>
                    <p className="text-magica-teal-100 mb-8 text-lg">
                        {isArabic ? "الأماكن محدودة. كل صيف يختلف." : "Spots are limited. Every summer is different."}
                    </p>
                    <Link
                        href={`/${lang}/register`}
                        className="inline-flex items-center gap-3 px-10 py-4 bg-white text-magica-teal-600 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-xl"
                    >
                        {isArabic ? "سجّل الآن" : "Register Now"}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>

            {/* Gallery */}
            <Gallery lang={lang} />
        </main>
    );
}

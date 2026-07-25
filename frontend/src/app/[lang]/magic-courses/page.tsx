"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicalBackground from "@/components/ui/MagicalBackground";
import { GraduationCap, Sparkles, Star, Users, Calendar, Clock, BookOpen, CheckCircle2, ArrowRight, ShieldCheck, Laptop, Flame, Award, Filter, X } from "lucide-react";
import Link from "next/link";

interface Course {
    id: string;
    titleEn: string;
    titleAr: string;
    category: "business" | "tech" | "leadership" | "creative";
    categoryLabelEn: string;
    categoryLabelAr: string;
    ageGroup: string;
    sessionsCount: number;
    hours: number;
    descEn: string;
    descAr: string;
    skillsEn: string[];
    skillsAr: string[];
    color: string;
    bgGradient: string;
    badgeEn: string;
    badgeAr: string;
    icon: string;
}

const COURSES_DATA: Course[] = [
    {
        id: "junior-entrepreneur",
        titleEn: "Junior Entrepreneurship & Bazar Secrets",
        titleAr: "ريادة الأعمال الصعيرة وأسرار التجارة في ماجيكا بازار",
        category: "business",
        categoryLabelEn: "Entrepreneurship & Money",
        categoryLabelAr: "ريادة الأعمال والذكاء المالي",
        ageGroup: "8 - 14",
        sessionsCount: 8,
        hours: 16,
        descEn: "Learn how to transform a simple creative idea into a profitable real-world product! Students master product design, pricing strategy, customer communication, and salesmanship.",
        descAr: "تعلم كيف تحول فكرتك البسيطة والمبتكرة إلى منتج حقيقي ومربح! يتدرب الأطفال على تصميم المنتجات، استراتيجيات التسعير، التفاوض ومهارات البيع الحية.",
        skillsEn: ["Financial Literacy", "Value Pricing", "Sales Negotiation", "Business Planning"],
        skillsAr: ["الذكاء المالي", "تسعير القيمة", "التفاوض والإقناع", "التخطيط التجاري"],
        color: "from-orange-500 to-amber-600",
        bgGradient: "bg-orange-500/10 border-orange-500/20 text-orange-600",
        badgeEn: "Most Popular 🔥",
        badgeAr: "الأكثر طلباً 🔥",
        icon: "business"
    },
    {
        id: "ai-robotics",
        titleEn: "AI & Robotics Coding Wizards",
        titleAr: "سحرة البرمجيات، الروبوتات والذكاء الاصطناعي",
        category: "tech",
        categoryLabelEn: "Technology & Coding",
        categoryLabelAr: "التقنية والبرمجة",
        ageGroup: "9 - 15",
        sessionsCount: 10,
        hours: 20,
        descEn: "Step into the modern magical tech arena! Children learn intuitive logic programming, robot algorithm sequencing, and basics of AI problem-solving in a fun hands-on laboratory.",
        descAr: "ادخل إلى عالم التقنية السحري! يتعلم الطفل منطق البرمجة المبتكرة، خوارزميات حركة الروبوت، ومبادئ حل المشكلات بالذكاء الاصطناعي عبر ورش تطبيقية تفاعلية.",
        skillsEn: ["Algorithmic Logic", "Robotics Assembly", "AI Prompting & Thinking", "Problem Solving"],
        skillsAr: ["المنطق الخوارزمي", "تجميع وبرمجة الروبوت", "تفكير الذكاء الاصطناعي", "حل المشكلات بذكاء"],
        color: "from-purple-600 to-indigo-600",
        bgGradient: "bg-purple-500/10 border-purple-500/20 text-purple-600",
        badgeEn: "Future Skills 🚀",
        badgeAr: "مهارات المستقبل 🚀",
        icon: "tech"
    },
    {
        id: "public-speaking",
        titleEn: "Charismatic Leadership & Public Speaking",
        titleAr: "الخطابة، قوة التأثير وبناء الكاريزما القيادية",
        category: "leadership",
        categoryLabelEn: "Leadership & Communication",
        categoryLabelAr: "القيادة وفن التواصل",
        ageGroup: "7 - 15",
        sessionsCount: 6,
        hours: 12,
        descEn: "Overcome stage fright and develop genuine vocal presence! Inspired by Magica Podcast, this course coaches children on confidence, speech structuring, eye contact, and emotional intelligence.",
        descAr: "اكسر حاجز الخوف وابنِ حضوراً مقنعاً وصوتًا قياديًا مميزًا! مستوحى من تجربة ماجيكا بودكاست لتدريب الأطفال على لغة الجسد، ترتيب الخطاب، والثقة العالية بالنفس.",
        skillsEn: ["Stage Presence", "Storytelling", "Body Language Mastery", "Emotional Intelligence"],
        skillsAr: ["الحضور والجاذبية", "فن رواية القصص", "لغة الجسد المؤثرة", "الذكاء العاطفي والاجتماعي"],
        color: "from-emerald-500 to-teal-600",
        bgGradient: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600",
        badgeEn: "Essential Growth ⭐",
        badgeAr: "مهارة أساسية ⭐",
        icon: "leadership"
    },
    {
        id: "creative-design",
        titleEn: "Magica Art & Brand Identity Studio",
        titleAr: "استوديو الفنون التصميمية وهوية العلامات التجارية",
        category: "creative",
        categoryLabelEn: "Arts & Innovation",
        categoryLabelAr: "الفنون والابتكار",
        ageGroup: "6 - 13",
        sessionsCount: 8,
        hours: 16,
        descEn: "Where art meets entrepreneurship! Young designers explore color psychology, branding logos (like Magica Uniform), creative crafts, and visual packaging of ideas to make them stand out.",
        descAr: "حيث يلتقي الفن بالتجارة والإنجاز! يستكشف المصممون الصغار سيكولوجية الألوان، تصميم الشعارات (مثل ماجيكا يونيفورم)، والحرف الإبداعية لتغليف الأفكار وبناء الهوية.",
        skillsEn: ["Brand Logo Design", "Color Psychology", "Creative Packaging", "Visual Aesthetics"],
        skillsAr: ["تصميم الشعارات والهوية", "سيكولوجية الألوان", "التغليف الابتكاري", "الحس الفني والبصري"],
        color: "from-rose-500 to-pink-600",
        bgGradient: "bg-rose-500/10 border-rose-500/20 text-rose-600",
        badgeEn: "Creative Spark 🎨",
        badgeAr: "شرارة الإبداع 🎨",
        icon: "creative"
    },
    {
        id: "financial-intelligence",
        titleEn: "Smart Money & Budget Mastery",
        titleAr: "الذكاء المالي، الاستثمار الصغير وإدارة الميزانية",
        category: "business",
        categoryLabelEn: "Entrepreneurship & Money",
        categoryLabelAr: "ريادة الأعمال والذكاء المالي",
        ageGroup: "9 - 15",
        sessionsCount: 6,
        hours: 12,
        descEn: "An interactive gateway to understanding money efficiency, saving vs investing, cost computation, and smart consumption choices. Builds the economic foundations of future CEOs!",
        descAr: "بوابة تفاعلية لفهم قيمة المال، الفرق بين الادخار والاستثمار، حساب التكاليف والأرباح، واتخاذ قرارات إنفاق ذكية لبناء الثاقبة الاقتصادية لقادة الغد!",
        skillsEn: ["Budget Allocation", "Investment Basics", "Profit & Loss Calculation", "Smart Saving"],
        skillsAr: ["توزيع الميزانية", "مبادئ الاستثمار الصغير", "حساب المكسب والتكلفة", "الادخار التراكمي"],
        color: "from-amber-500 to-yellow-600",
        bgGradient: "bg-amber-500/10 border-amber-500/20 text-amber-600",
        badgeEn: "High Value 💰",
        badgeAr: "قيمة فائقة 💰",
        icon: "business"
    },
    {
        id: "young-pioneers",
        titleEn: "Young Pioneers Survival & Problem Solving",
        titleAr: "الرواد الصغار: مهارات القيادة والمغامرة وحل المشكلات",
        category: "leadership",
        categoryLabelEn: "Leadership & Communication",
        categoryLabelAr: "القيادة وفن التواصل",
        ageGroup: "8 - 15",
        sessionsCount: 8,
        hours: 16,
        descEn: "Directly adapted from Magica Camp adventures! Teams tackle interactive survival scenarios, team collaboration dilemmas, strategic resource gathering, and fast adaptive decision-making.",
        descAr: "مقتبس مباشرة من مغامرات ماجيكا كامب الحية! يواجه الفرق سيناريوهات تفاعلية، تحديات التفاوض الجماعي، إدارة الموارد تحت الضغط، واتخاذ القرارات الذكية الشجاعة.",
        skillsEn: ["Team Synergy", "Crisis Strategy", "Resource Management", "Adaptive Thinking"],
        skillsAr: ["روح الفريق العالي", "استراتيجيات تجاوز الأزمات", "إدارة الموارد", "التفكير المرن والفعال"],
        color: "from-blue-600 to-cyan-600",
        bgGradient: "bg-blue-500/10 border-blue-500/20 text-blue-600",
        badgeEn: "Action Packed ⛺",
        badgeAr: "مغامرة وتحدي ⛺",
        icon: "leadership"
    }
];

export default function MagicCoursesPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === "ar";
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
    const [enrollSuccess, setEnrollSuccess] = useState<boolean>(false);

    const filterCategories = [
        { id: "all", labelEn: "All Courses 🌟", labelAr: "كل الكورسات 🌟" },
        { id: "business", labelEn: "Entrepreneurship & Money 💡", labelAr: "ريادة الأعمال والذكاء المالي 💡" },
        { id: "tech", labelEn: "Tech, AI & Coding 🤖", labelAr: "التقنية، الذكاء الاصطناعي والبرمجة 🤖" },
        { id: "leadership", labelEn: "Leadership & Speaking 🎙️", labelAr: "القيادة، الكاريزما والخطابة 🎙️" },
        { id: "creative", labelEn: "Arts & Brand Design 🎨", labelAr: "الفنون، التصميم والابتكار 🎨" },
    ];

    const filteredCourses = selectedCategory === "all" 
        ? COURSES_DATA 
        : COURSES_DATA.filter(c => c.category === selectedCategory);

    const handleReservationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEnrollSuccess(true);
        setTimeout(() => {
            setEnrollSuccess(false);
            setSelectedCourseForModal(null);
        }, 2500);
    };

    return (
        <main className="min-h-screen font-[family-name:var(--font-inter)] text-gray-800 overflow-hidden relative pb-24">
            <MagicalBackground />

            {/* Hero Section */}
            <section className="relative pt-36 pb-16 px-6 z-10">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500/15 via-amber-500/15 to-purple-500/15 border border-orange-500/30 text-orange-600 font-extrabold mb-6 shadow-sm backdrop-blur-md"
                    >
                        <GraduationCap className="w-6 h-6 animate-bounce text-orange-500" />
                        <span>{isArabic ? "أكاديمية ماجيكا لبناء مهارات القادة المبدعين" : "Magica Academy for Future Pioneers"}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 25, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight"
                    >
                        {isArabic ? (
                            <>كورسات ماجيكا <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-purple-600">التعليمية والريادية</span></>
                        ) : (
                            <>Magica <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-purple-600">Educational Courses</span></>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 font-medium leading-relaxed"
                    >
                        {isArabic
                            ? "نصنع مستقبل أطفالنا عبر برامج تطبيقية مدروسة: الإدارة المالية، الابتكار التقني والتحدث أمام الجمهور — بخبرة عملية مستوحاة من عالم ماجيكا بازار ومعسكرات التميز!"
                            : "Empowering children with future-proof practical competence: Financial management, tech innovation, AI, and charismatic public speaking — designed directly from Magica Zone experiential worlds!"}
                    </motion.p>

                    {/* Stats Highlights */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        <div className="bg-white/85 backdrop-blur-md p-5 rounded-3xl border border-gray-100 shadow-md text-center">
                            <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                            <h4 className="text-xl font-black text-gray-800">{isArabic ? "مدربون خبراء" : "Certified Coaches"}</h4>
                            <p className="text-xs text-gray-500 font-bold">{isArabic ? "متخصصون في تربية وتوجيه القادة" : "Specialized in youth mentorship"}</p>
                        </div>
                        <div className="bg-white/85 backdrop-blur-md p-5 rounded-3xl border border-gray-100 shadow-md text-center">
                            <Laptop className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <h4 className="text-xl font-black text-gray-800">{isArabic ? "تطبيق عملي 100%" : "100% Interactive"}</h4>
                            <p className="text-xs text-gray-500 font-bold">{isArabic ? "بدون تلقين أو حفظ نظري" : "Zero rote learning, full real execution"}</p>
                        </div>
                        <div className="bg-white/85 backdrop-blur-md p-5 rounded-3xl border border-gray-100 shadow-md text-center">
                            <Award className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                            <h4 className="text-xl font-black text-gray-800">{isArabic ? "شهادات معتمدة" : "Magica Certificates"}</h4>
                            <p className="text-xs text-gray-500 font-bold">{isArabic ? "توثق المهارات الإدراكية المكتسبة" : "Documenting acquired skills"}</p>
                        </div>
                        <div className="bg-white/85 backdrop-blur-md p-5 rounded-3xl border border-gray-100 shadow-md text-center">
                            <Star className="w-8 h-8 text-amber-500 mx-auto mb-2 fill-current" />
                            <h4 className="text-xl font-black text-gray-800">{isArabic ? "من 6 إلى 15 سنة" : "Ages 6 - 15"}</h4>
                            <p className="text-xs text-gray-500 font-bold">{isArabic ? "مجموعات مصنفة حسب العمر والمهارة" : "Tailored age groups & ability"}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filter Pills */}
            <section className="max-w-7xl mx-auto px-6 mb-12">
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 scrollbar-none flex-wrap">
                    {filterCategories.map((cat) => {
                        const active = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-6 py-3 rounded-full font-black text-sm md:text-base transition-all whitespace-nowrap shadow-sm flex items-center gap-2 ${
                                    active
                                        ? "bg-gray-900 text-white scale-105 shadow-lg ring-2 ring-orange-500"
                                        : "bg-white text-gray-600 hover:text-orange-500 border border-gray-200/80 hover:border-orange-300"
                                }`}
                            >
                                {isArabic ? cat.labelAr : cat.labelEn}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Courses Catalog Grid */}
            <section className="max-w-7xl mx-auto px-6 mb-20">
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredCourses.map((course) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                key={course.id}
                                className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-orange-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
                            >
                                {/* Top Banner Decoration */}
                                <div className={`h-3 bg-gradient-to-r ${course.color} w-full`} />

                                <div className="p-8 flex-1 flex flex-col justify-between">
                                    <div>
                                        {/* Badge & Category */}
                                        <div className="flex items-center justify-between gap-2 mb-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${course.bgGradient}`}>
                                                {isArabic ? course.categoryLabelAr : course.categoryLabelEn}
                                            </span>
                                            <span className="bg-gray-100 text-gray-800 text-xs font-black px-3 py-1 rounded-full shadow-sm">
                                                {isArabic ? course.badgeAr : course.badgeEn}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-orange-600 transition-colors leading-snug">
                                            {isArabic ? course.titleAr : course.titleEn}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                            {isArabic ? course.descAr : course.descEn}
                                        </p>

                                        {/* Quick Meta (Age & Duration) */}
                                        <div className="grid grid-cols-2 gap-3 pb-6 mb-6 border-b border-gray-100 text-xs font-extrabold text-gray-700">
                                            <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-2xl border border-gray-100">
                                                <Users className="w-5 h-5 text-orange-500 shrink-0" />
                                                <div>
                                                    <div className="text-gray-400 text-[10px] uppercase">{isArabic ? "الفئة العمرية" : "Age Group"}</div>
                                                    <div>{course.ageGroup} {isArabic ? "سنوات" : "Years"}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-2xl border border-gray-100">
                                                <Calendar className="w-5 h-5 text-purple-600 shrink-0" />
                                                <div>
                                                    <div className="text-gray-400 text-[10px] uppercase">{isArabic ? "عدد الجلسات" : "Duration"}</div>
                                                    <div>{course.sessionsCount} {isArabic ? "جلسات وتطبيقات" : "Sessions"} ({course.hours}h)</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Skills Learned */}
                                        <div className="mb-6">
                                            <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                <Sparkles className="w-4 h-4 text-amber-500" />
                                                <span>{isArabic ? "المهارات المستهدفة في الكورس:" : "Key Acquired Competencies:"}</span>
                                            </h4>
                                            <div className="flex flex-wrap gap-1.5">
                                                {(isArabic ? course.skillsAr : course.skillsEn).map((skill, idx) => (
                                                    <span key={idx} className="bg-orange-50/70 text-gray-800 text-xs font-bold px-3 py-1 rounded-xl border border-orange-100">
                                                        ✦ {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedCourseForModal(course)}
                                            className={`w-full py-4 rounded-2xl font-black text-white shadow-lg bg-gradient-to-r ${course.color} hover:brightness-110 transition-all flex items-center justify-center gap-2 text-lg`}
                                        >
                                            <CheckCircle2 className="w-5 h-5" />
                                            <span>{isArabic ? "تسجيل وحجز مقعد" : "Enroll & Reserve Seat"}</span>
                                            <ArrowRight className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* Why Magica Courses Value Proposition */}
            <section className="max-w-6xl mx-auto px-6 mb-24">
                <div className="bg-gradient-to-r from-gray-900 via-purple-950 to-indigo-950 text-white rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
                    <Sparkles className="absolute top-6 right-6 w-32 h-32 text-orange-400 opacity-10 pointer-events-none" />

                    <div className="max-w-3xl space-y-6 relative z-10">
                        <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-block shadow-md">
                            {isArabic ? "فلسفتنا التعليمية" : "Our Educational Edge"}
                        </span>
                        
                        <h2 className="text-3xl md:text-5xl font-black leading-tight">
                            {isArabic 
                                ? "لأن التعليم الحقيقي يبدأ بالممارسة والحوار، وليس بالحفظ التلقيني." 
                                : "Because real education happens through practice, dialogues, and real marketplace simulation."}
                        </h2>

                        <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
                            {isArabic
                                ? "جميع كورسات ماجيكا مصممة كتدريب تفاعلي يدمج بين تحديات الألعاب الذهنية، تجارب البيع في البازار الحقيقي، واستوديو التحدث الفوري. يحصل كل طفل على تقرير تقييم مهارات دوري متاح فوراً للأهالي!"
                                : "Every Magica course is crafted as an interactive training experience that infuses mind game challenges, real Bazar salesmanship experiments, and podcast public speaking studios. Every student earns a progress portfolio available to parents instantly!"}
                        </p>

                        <div className="pt-4 flex flex-wrap gap-4">
                            <Link href={`/${lang}/magic-games`}>
                                <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-black text-base shadow-xl shadow-orange-500/30 transition-all flex items-center gap-2">
                                    <Star className="w-5 h-5 fill-current" />
                                    <span>{isArabic ? "جرب الألعاب الذهنية أيضاً" : "Try Our Mind Games Too"}</span>
                                </button>
                            </Link>
                            <Link href={`/${lang}/contact`}>
                                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-black text-base transition-all">
                                    {isArabic ? "استشر مرشد ماجيكا التعليمي" : "Speak to a Course Advisor"}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Modal */}
            {selectedCourseForModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-lg w-full relative border border-gray-100 overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        <button
                            onClick={() => setSelectedCourseForModal(null)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition-colors p-2"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-6 pr-8">
                            <span className="bg-orange-50 text-orange-600 font-extrabold text-xs px-3 py-1 rounded-full border border-orange-100 inline-block mb-2">
                                {isArabic ? "طلب تسجيل في الكورس" : "Course Enrollment Request"}
                            </span>
                            <h3 className="text-2xl font-black text-gray-900">
                                {isArabic ? selectedCourseForModal.titleAr : selectedCourseForModal.titleEn}
                            </h3>
                            <p className="text-xs text-gray-500 font-bold mt-1">
                                {isArabic ? `الفئة العمرية (${selectedCourseForModal.ageGroup} سنة) - ${selectedCourseForModal.sessionsCount} جلسات` : `Age (${selectedCourseForModal.ageGroup} yrs) - ${selectedCourseForModal.sessionsCount} Sessions`}
                            </p>
                        </div>

                        {enrollSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-10 text-center space-y-4"
                            >
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <CheckCircle2 className="w-12 h-12" />
                                </div>
                                <h4 className="text-2xl font-black text-gray-900">
                                    {isArabic ? "تم استلام طلب التسجيل بنجاح!" : "Enrollment Submitted Successfully!"}
                                </h4>
                                <p className="text-gray-600 text-sm max-w-sm mx-auto font-medium">
                                    {isArabic
                                        ? "سيقوم فريق ماجيكا الأكاديمي بالتواصل معك عبر الواتساب لإتمام تأكيد الموعد وتفاصيل انطلاق الجلسات!"
                                        : "Our academic advisors will contact you shortly via WhatsApp to confirm seat allocation and starting schedules!"}
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleReservationSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        {isArabic ? "اسم الطفل الرباعي" : "Child Full Name"}
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 outline-none font-medium"
                                        placeholder={isArabic ? "مثال: عمر محمد أحمد" : "e.g., Omar Mohamed Ahmed"}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        {isArabic ? "عمر الطفل الحقيقي" : "Child Age"}
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        min="5"
                                        max="16"
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 outline-none font-medium"
                                        placeholder="10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        {isArabic ? "رقم الهاتف / الواتساب للتواصل (ولي الأمر)" : "Parent WhatsApp Number"}
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 outline-none font-medium text-start dir-ltr"
                                        placeholder="010xxxxxxxx"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        {isArabic ? "ملاحظات إضافية عن الطفل (اختياري)" : "Additional notes or interests (optional)"}
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 outline-none font-medium resize-none"
                                        placeholder={isArabic ? "هل لدى الطفل خبرة سابقة؟ هل يفضل مواعيد صباحية أم مسائية؟" : "Any previous background or preferred timings?"}
                                    />
                                </div>

                                <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-100/80 text-xs font-semibold text-gray-600 flex items-center gap-3 mt-2">
                                    <ShieldCheck className="w-6 h-6 text-orange-500 shrink-0" />
                                    <span>
                                        {isArabic
                                            ? "الحجز المبدئي مجاني تماماً ومتاح حتى اكتمال العدد المقرر في المجموعة لضمان أعلى جودة تفاعلية."
                                            : "Initial reservation is 100% free and secures priority assessment until cohort seats are filled."}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-orange-500/30 hover:brightness-110 transition-all mt-6"
                                >
                                    {isArabic ? "تأكيد حجز المقعد الآن" : "Confirm Course Reservation"}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </main>
    );
}

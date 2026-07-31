"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import foodLogo from "../../../../public/magica-food-print.png";
import { Utensils, Brain, Heart, Leaf, ChefHat, ArrowRight, CheckCircle, Zap } from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";
import { useCMSData } from "@/lib/cms/contentStore";

export default function MagicFoodPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';
    const { data } = useCMSData();
    const menu = data.food;

    const principles = [
        {
            icon: Brain,
            color: "text-magica-navy-500",
            bg: "bg-magica-navy-500/15",
            title: isArabic ? "وقود العقل" : "Brain Fuel",
            desc: isArabic
                ? "كل وجبة مصممة علميًا لدعم التركيز، الذاكرة، والإدراك خلال ساعات الأنشطة."
                : "Every meal is scientifically designed to support focus, memory, and cognition during activity hours.",
        },
        {
            icon: Zap,
            color: "text-magica-teal-500",
            bg: "bg-magica-teal-500/15",
            title: isArabic ? "طاقة مستدامة" : "Sustained Energy",
            desc: isArabic
                ? "لا مرتفعات سكرية، لا انهيارات — طاقة نظيفة تدوم طوال اليوم."
                : "No sugar spikes, no crashes — clean energy that lasts all day long.",
        },
        {
            icon: ChefHat,
            color: "text-magica-orange-600",
            bg: "bg-magica-orange-600/15",
            title: isArabic ? "الطفل يطبخ" : "Children Cook",
            desc: isArabic
                ? "أحيانًا يُعلّمهم كيف يُعدّون وجباتهم بأيديهم — لأن من يعرف ما يأكل يعرف كيف يهتم بنفسه."
                : "Sometimes we teach them to prepare their own meals — because those who know what they eat know how to care for themselves.",
        },
        {
            icon: Leaf,
            color: "text-magica-orange-500",
            bg: "bg-magica-orange-500/15",
            title: isArabic ? "مكونات طبيعية" : "Natural Ingredients",
            desc: isArabic
                ? "قوائم طعام مبنية على مكونات طازجة وطبيعية، بعيدًا عن المواد الحافظة والإضافات الاصطناعية."
                : "Menus built on fresh, natural ingredients, free from preservatives and artificial additives.",
        },
        {
            icon: Heart,
            color: "text-magica-purple-500",
            bg: "bg-magica-purple-500/15",
            title: isArabic ? "نكهات الأطفال" : "Kids' Flavors",
            desc: isArabic
                ? "صحي لا يعني مملًا — وجباتنا شهية، ملوّنة، ومصممة لتكون محبوبة من الأطفال."
                : "Healthy doesn't mean boring — our meals are delicious, colorful, and designed to be loved by children.",
        },
        {
            icon: Utensils,
            color: "text-magica-teal-700",
            bg: "bg-magica-teal-700/15",
            title: isArabic ? "تعليم غذائي" : "Nutritional Education",
            desc: isArabic
                ? "نعلّم الأطفال أسس التغذية السليمة — معرفة تبقى معهم مدى الحياة."
                : "We teach children the fundamentals of proper nutrition — knowledge that stays with them for life.",
        },
    ];

    // Dynamic CMS menu loaded directly above

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
                        <Image src={foodLogo} alt="Magica Food" className="h-32 w-auto mx-auto object-contain drop-shadow-md" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black text-gray-800 mb-6 leading-tight"
                    >
                        {isArabic ? (
                            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-magica-navy-400 to-magica-navy-600">أكل صح</span> = تفكير صح</>
                        ) : (
                            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-magica-navy-400 to-magica-navy-600">Eat Right</span> = Think Right</>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed"
                    >
                        {isArabic
                            ? "الغذاء الصحيح ليس رفاهية — بل وقود للعقل والجسم."
                            : "The right nutrition isn't a luxury — it's fuel for the mind and body."}
                    </motion.p>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        {isArabic
                            ? "ماجيكا فود يقدم وجبات مصممة علميًا لدعم تركيز الأطفال وطاقتهم. وأحيانًا — يُعلّمهم كيف يُعدّونها بأيديهم. لأن الطفل الذي يعرف ما يأكل، يعرف كيف يهتم بنفسه."
                            : "Magica Food provides scientifically designed meals to support children's focus and energy. And sometimes — we teach them how to prepare it themselves. Because the child who knows what they eat, knows how to take care of themselves."}
                    </motion.p>
                </div>
            </section>

            <section className="relative z-10 py-10 bg-gradient-to-r from-magica-navy-500 to-magica-navy-700">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-white text-2xl md:text-3xl font-black">
                        {isArabic
                            ? "\"الطفل الذي يعرف ما يأكل، يعرف كيف يهتم بنفسه.\""
                            : "\"The child who knows what they eat, knows how to take care of themselves.\""}
                    </p>
                </div>
            </section>

            {/* Menu Showcase */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-gray-800 mb-4">
                            {isArabic ? "من قائمتنا" : "From Our Menu"}
                        </h2>
                        <p className="text-gray-500 text-lg">
                            {isArabic ? "كل وجبة لها هدف" : "Every meal has a purpose"}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {menu.map((item, idx) => (
                            <motion.div
                                key={item.id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                whileHover={{ y: -6 }}
                                className="bg-white/90 backdrop-blur-md rounded-3xl border border-rose-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="relative h-48 w-full overflow-hidden bg-rose-50/50 flex items-center justify-center">
                                        {item.imageUrl ? (
                                            <img 
                                                src={item.imageUrl} 
                                                alt={isArabic ? item.titleAr : item.titleEn} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <span className="text-5xl">🥗</span>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                        {(item.price || 0) > 0 && (
                                            <span className="absolute bottom-3 right-3 bg-rose-600 text-white font-black text-sm px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                                                <span>{item.price}</span>
                                                <span className="text-xs">{isArabic ? "ج.م" : "EGP"}</span>
                                            </span>
                                        )}
                                        {(item.badgeEn || item.badgeAr) && (
                                            <span className="absolute top-3 left-3 bg-white/90 text-rose-600 font-black text-xs px-3 py-1 rounded-full shadow-md backdrop-blur-md">
                                                {isArabic ? item.badgeAr : item.badgeEn}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-6 text-start">
                                        <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                                            {isArabic ? item.titleAr : item.titleEn}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            {isArabic ? item.descAr : item.descEn}
                                        </p>
                                        {(item.ingredientsEn || item.ingredientsAr) && (
                                            <div className="border-t border-rose-100/60 pt-3">
                                                <div className="text-[10px] font-black uppercase text-gray-400 mb-1.5">
                                                    {isArabic ? "المكونات الصحية:" : "Nutritional Ingredients:"}
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {(isArabic ? (item.ingredientsAr || item.ingredientsEn) : item.ingredientsEn)?.map((ing, i) => (
                                                        <span key={i} className="bg-rose-50 text-rose-700 font-extrabold text-[11px] px-2.5 py-0.5 rounded-lg border border-rose-100">
                                                            ✓ {ing}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Principles */}
            <section className="relative z-10 py-24 px-6 bg-white/40 backdrop-blur-sm border-y border-gray-200/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-gray-800 mb-4">
                            {isArabic ? "مبادئنا الغذائية" : "Our Food Principles"}
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {principles.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                whileHover={{ y: -6 }}
                                className="p-7 rounded-3xl bg-white/90 border border-magica-navy-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-5`}>
                                    <item.icon className={`w-7 h-7 ${item.color}`} />
                                </div>
                                <h3 className="text-xl font-black mb-3 text-gray-800">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cooking Workshop CTA */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-magica-navy-400 to-magica-navy-600 p-1 rounded-3xl shadow-2xl shadow-magica-navy-500/30"
                    >
                        <div className="bg-white/95 rounded-[calc(1.5rem-4px)] p-10 text-center">
                            <div className="text-5xl mb-4">👨‍🍳</div>
                            <h2 className="text-3xl font-black text-gray-800 mb-4">
                                {isArabic ? "ورشة الطبخ مع الأطفال" : "Kids Cooking Workshop"}
                            </h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                {isArabic
                                    ? "في ورش الطبخ الخاصة بنا، يتعلم الأطفال كيف يُعدّون وجبات صحية بأيديهم — مهارة حياتية حقيقية."
                                    : "In our cooking workshops, children learn how to prepare healthy meals with their own hands — a real life skill."}
                            </p>
                            <div className="space-y-3 text-right mb-8 max-w-sm mx-auto">
                                {[
                                    isArabic ? "قياس، خلط، وطهي" : "Measure, mix, and cook",
                                    isArabic ? "تعلّم التغذية بشكل تفاعلي" : "Learn nutrition interactively",
                                    isArabic ? "وجبات يأخذ طعمها الطفل للبيت" : "Meals kids take pride in at home",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-magica-navy-500 shrink-0" />
                                        <span className="text-gray-600 text-sm font-semibold">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href={`/${lang}/register`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-magica-navy-400 to-magica-navy-600 text-white rounded-full font-black text-lg hover:scale-105 transition-transform shadow-lg"
                            >
                                {isArabic ? "سجّل في الورشة" : "Join the Workshop"}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

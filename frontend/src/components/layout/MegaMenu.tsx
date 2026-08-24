// src/components/layout/MegaMenu.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ChevronDown, GraduationCap, Tent, ShoppingBag,
    Gamepad2, Store, UtensilsCrossed, Mic, Shirt,
    Music2, ArrowUpRight
} from "lucide-react";

interface MegaMenuProps {
    lang: string;
}

export default function MegaMenu({ lang }: MegaMenuProps) {
    const isArabic = lang === "ar";
    const [isOpen, setIsOpen] = useState(false);

    const learningSectors = [
        {
            href: `/${lang}/magic-courses`,
            icon: GraduationCap,
            color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
            titleEn: "Magica Courses",
            titleAr: "دورات ماجيكا",
            descEn: "Leadership, AI, robotics & coding tracks",
            descAr: "مسارات القيادة، الذكاء الاصطناعي، والبرمجة",
        },
        {
            href: `/${lang}/magic-camp`,
            icon: Tent,
            color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            titleEn: "Magica Camp",
            titleAr: "مخيم ماجيكا",
            descEn: "Transformational outdoor & tech adventure",
            descAr: "مخيم صيفي ينمي الاستقلالية وبناء الشخصية",
        },
        {
            href: `/${lang}/magic-games`,
            icon: Gamepad2,
            color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
            titleEn: "Mind Games",
            titleAr: "ألعاب التفكير",
            descEn: "Logic puzzles & market trading simulators",
            descAr: "تحديات المنطق والرياضيات ومحاكاة التداول",
        },
        {
            href: `/${lang}/magic-podcast`,
            icon: Mic,
            color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
            titleEn: "Magica Podcast",
            titleAr: "بودكاست ماجيكا",
            descEn: "Inspiring youth stories & parenting talks",
            descAr: "حوارات تعليمية وتجارب ملهمة للشباب وأولياء الأمور",
        },
    ];

    const marketplaceSectors = [
        {
            href: `/${lang}/magic-supplies`,
            icon: ShoppingBag,
            color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
            titleEn: "Magica Supplies",
            titleAr: "مستلزمات ماجيكا",
            descEn: "Ergonomic, waterproof executive CEO bags",
            descAr: "حقائب مدرسية ذكية وأدوات ابتكار متطورة",
        },
        {
            href: `/${lang}/magic-uniform`,
            icon: Shirt,
            color: "text-blue-300 bg-blue-900/30 border-blue-400/20",
            titleEn: "Official Uniform",
            titleAr: "الزي الرسمي",
            descEn: "Explorer polos, founder hoodies & caps",
            descAr: "بولو المستكشف، هوديز القائد الصغير، وقبعات الفريق",
        },
        {
            href: `/${lang}/magic-bazar`,
            icon: Store,
            color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
            titleEn: "Magica Bazar",
            titleAr: "بازار ماجيكا",
            descEn: "Kid-run live marketplace & retail stores",
            descAr: "متاجر يديرها الأطفال لتعلم البيع والأرباح الحقيقية",
        },
        {
            href: `/${lang}/magic-food`,
            icon: UtensilsCrossed,
            color: "text-green-400 bg-green-500/10 border-green-500/20",
            titleEn: "Brain Food Bento",
            titleAr: "تغذية ماجيكا",
            descEn: "Nutritionist-tailored cognitive kid meals",
            descAr: "وجبات بينتو صحية مصممة لتعزيز التركيز والطاقة",
        },
        {
            href: `/${lang}/magic-songs`,
            icon: Music2,
            color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
            titleEn: "Songs & Anthems",
            titleAr: "الأناشيد والأغاني",
            descEn: "Exclusive motivational soundtracks & beats",
            descAr: "أناشيد حماسية ونغمات لتعزيز التركيز والإنجاز",
        },
    ];

    return (
        <div className="relative inline-block text-start">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-200 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                aria-expanded={isOpen}
            >
                <span>{isArabic ? "عالم ماجيكا (القطاعات)" : "Our World"}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Mega Dropdown Panel */}
            {isOpen && (
                <div
                    onMouseLeave={() => setIsOpen(false)}
                    className={`absolute z-50 mt-2 w-[680px] max-w-[90vw] p-6 rounded-3xl bg-gray-950/95 backdrop-blur-2xl border border-white/10 shadow-2xl ${isArabic ? "right-0" : "left-0"
                        }`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Column 1: Learning & Leadership */}
                        <div>
                            <div className="text-xs uppercase tracking-wider text-blue-400 font-extrabold mb-3 px-2">
                                {isArabic ? "التعلم والقيادة والتفكير" : "Learning & Leadership"}
                            </div>
                            <div className="space-y-1">
                                {learningSectors.map((sec) => (
                                    <Link
                                        key={sec.href}
                                        href={sec.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white/5 transition-all group"
                                    >
                                        <div className={`p-2 rounded-xl border shrink-0 ${sec.color}`}>
                                            <sec.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white group-hover:text-blue-400 flex items-center gap-1 transition-colors">
                                                <span>{isArabic ? sec.titleAr : sec.titleEn}</span>
                                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <p className="text-xs text-gray-400 leading-snug">
                                                {isArabic ? sec.descAr : sec.descEn}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Gear, Bazar & Nutrition */}
                        <div>
                            <div className="text-xs uppercase tracking-wider text-rose-400 font-extrabold mb-3 px-2">
                                {isArabic ? "المعدات والمتجر والتغذية" : "Gear & Marketplace"}
                            </div>
                            <div className="space-y-1">
                                {marketplaceSectors.map((sec) => (
                                    <Link
                                        key={sec.href}
                                        href={sec.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white/5 transition-all group"
                                    >
                                        <div className={`p-2 rounded-xl border shrink-0 ${sec.color}`}>
                                            <sec.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white group-hover:text-rose-400 flex items-center gap-1 transition-colors">
                                                <span>{isArabic ? sec.titleAr : sec.titleEn}</span>
                                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <p className="text-xs text-gray-400 leading-snug">
                                                {isArabic ? sec.descAr : sec.descEn}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
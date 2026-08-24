"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown, Globe, Menu, X, GraduationCap,
    Tent, ShoppingBag, Gamepad2, Store, UtensilsCrossed,
    Mic, Shirt, Music2, ArrowUpRight
} from "lucide-react";
import Image from "next/image";
import logoImg from "../../../public/logo.png";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface SectorItem {
    labelEn: string;
    labelAr: string;
    descEn: string;
    descAr: string;
    href: string;
    icon: React.ElementType;
    colorClass: string;
}

const LEARNING_SECTORS: SectorItem[] = [
    {
        labelEn: "Magica Courses",
        labelAr: "كورسات ماجيكا",
        descEn: "Leadership, AI, robotics & coding tracks",
        descAr: "مسارات القيادة، الذكاء الاصطناعي، والبرمجة",
        href: "magic-courses",
        icon: GraduationCap,
        colorClass: "text-blue-500 bg-blue-50 border-blue-200",
    },
    {
        labelEn: "Magica Camp",
        labelAr: "ماجيكا كامب",
        descEn: "Transformational outdoor & tech adventure",
        descAr: "مخيم صيفي ينمي الاستقلالية وبناء الشخصية",
        href: "magic-camp",
        icon: Tent,
        colorClass: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
        labelEn: "Magica Mind Games",
        labelAr: "ألعاب ماجيكا الذهنية",
        descEn: "Logic puzzles & market trading simulators",
        descAr: "تحديات المنطق والرياضيات ومحاكاة التداول",
        href: "magic-games",
        icon: Gamepad2,
        colorClass: "text-purple-600 bg-purple-50 border-purple-200",
    },
    {
        labelEn: "Magica Podcast",
        labelAr: "ماجيكا بودكاست",
        descEn: "Inspiring youth stories & parenting talks",
        descAr: "حوارات تعليمية وتجارب ملهمة للشباب والأهالي",
        href: "magic-podcast",
        icon: Mic,
        colorClass: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
];

const MARKETPLACE_SECTORS: SectorItem[] = [
    {
        labelEn: "Magica Supplies",
        labelAr: "ماجيكا سبلايز",
        descEn: "Ergonomic, waterproof executive CEO bags",
        descAr: "حقائب مدرسية ذكية وأدوات ابتكار متطورة",
        href: "magic-supplies",
        icon: ShoppingBag,
        colorClass: "text-rose-600 bg-rose-50 border-rose-200",
    },
    {
        labelEn: "Magica Uniform",
        labelAr: "ماجيكا يونيفورم",
        descEn: "Explorer polos, founder hoodies & caps",
        descAr: "بولو المستكشف، هوديز القائد الصغير، والزي الرسمي",
        href: "magic-uniform",
        icon: Shirt,
        colorClass: "text-blue-700 bg-blue-50 border-blue-200",
    },
    {
        labelEn: "Magica Bazar",
        labelAr: "ماجيكا بازار",
        descEn: "Kid-run live marketplace & retail stores",
        descAr: "متاجر يديرها الأطفال لتعلم البيع والأرباح الحقيقية",
        href: "magic-bazar",
        icon: Store,
        colorClass: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
        labelEn: "Magica Food",
        labelAr: "ماجيكا فود",
        descEn: "Nutritionist-tailored cognitive kid meals",
        descAr: "وجبات بينتو صحية مصممة لتعزيز التركيز والطاقة",
        href: "magic-food",
        icon: UtensilsCrossed,
        colorClass: "text-green-600 bg-green-50 border-green-200",
    },
    {
        labelEn: "Magica Songs & Anthems",
        labelAr: "أغانٍ ونغمات ماجيكا",
        descEn: "Exclusive motivational soundtracks & beats",
        descAr: "أناشيد حماسية ونغمات لتعزيز التركيز والإنجاز",
        href: "magic-songs",
        icon: Music2,
        colorClass: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200",
    },
];

export default function Navbar({ lang }: { lang: string }) {
    const pathname = usePathname();
    const isArabic = lang === "ar";
    const otherLang = isArabic ? "en" : "ar";
    const otherLangLabel = isArabic ? "English" : "عربي";

    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSubOpen, setMobileSubOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { user, role } = useAuth();
    const displayName = user?.email?.split("@")[0] || "User";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    let switchLangHref = `/${otherLang}`;
    if (pathname) {
        const segments = pathname.split("/");
        if (segments[1] === lang) {
            const newSegments = [...segments];
            newSegments[1] = otherLang;
            switchLangHref = newSegments.join("/");
        }
    }

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100"
                    : "bg-white/70 backdrop-blur-md border-b border-gray-200/50"
                    } ${isArabic ? "rtl font-cairo" : "ltr"}`}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">

                    {/* Logo */}
                    <Link href={`/${lang}`} className="flex items-center gap-3 shrink-0">
                        <Image
                            src={logoImg}
                            alt="Magica Zone Logo"
                            className="h-14 md:h-16 w-auto object-contain hover:opacity-90 transition-opacity mix-blend-multiply"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        <Link
                            href={`/${lang}`}
                            className="text-gray-700 hover:text-gray-900 font-semibold transition-colors whitespace-nowrap text-sm tracking-wide"
                        >
                            {isArabic ? "الرئيسية" : "Home"}
                        </Link>

                        <Link
                            href={`/${lang}/about`}
                            className="text-gray-700 hover:text-gray-900 font-semibold transition-colors whitespace-nowrap text-sm tracking-wide"
                        >
                            {isArabic ? "عن ماجيكا" : "About Us"}
                        </Link>

                        {/* Interactive MegaMenu Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setMegaMenuOpen(true)}
                            onMouseLeave={() => setMegaMenuOpen(false)}
                        >
                            <button
                                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                                className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 font-semibold transition-colors py-2 text-sm tracking-wide"
                            >
                                <span>{isArabic ? "عالمنا" : "Our World"}</span>
                                <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-200 opacity-70 ${megaMenuOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {megaMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.18 }}
                                        className={`absolute top-full ${isArabic ? "right-0" : "left-0"
                                            } pt-3 w-[660px] z-50`}
                                    >
                                        <div className="bg-white/95 backdrop-blur-2xl border border-gray-100 shadow-2xl rounded-3xl p-6 grid grid-cols-2 gap-6 text-start">

                                            {/* Column 1: Learning Sectors */}
                                            <div>
                                                <div className="text-[11px] uppercase tracking-wider text-blue-600 font-extrabold mb-3 px-2">
                                                    {isArabic ? "التعلم والقيادة والتفكير" : "Learning & Leadership"}
                                                </div>
                                                <div className="space-y-1">
                                                    {LEARNING_SECTORS.map((sector) => (
                                                        <Link
                                                            key={sector.href}
                                                            href={`/${lang}/${sector.href}`}
                                                            onClick={() => setMegaMenuOpen(false)}
                                                            className="flex items-start gap-3 p-2 rounded-2xl hover:bg-gray-50 transition-all group"
                                                        >
                                                            <div className={`p-2 rounded-xl border shrink-0 ${sector.colorClass}`}>
                                                                <sector.icon className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 flex items-center gap-1 transition-colors">
                                                                    <span>{isArabic ? sector.labelAr : sector.labelEn}</span>
                                                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                </div>
                                                                <p className="text-[11px] text-gray-500 leading-snug line-clamp-1">
                                                                    {isArabic ? sector.descAr : sector.descEn}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Column 2: Marketplace & Gear Sectors */}
                                            <div>
                                                <div className="text-[11px] uppercase tracking-wider text-rose-600 font-extrabold mb-3 px-2">
                                                    {isArabic ? "المعدات والمتجر والتغذية" : "Gear & Marketplace"}
                                                </div>
                                                <div className="space-y-1">
                                                    {MARKETPLACE_SECTORS.map((sector) => (
                                                        <Link
                                                            key={sector.href}
                                                            href={`/${lang}/${sector.href}`}
                                                            onClick={() => setMegaMenuOpen(false)}
                                                            className="flex items-start gap-3 p-2 rounded-2xl hover:bg-gray-50 transition-all group"
                                                        >
                                                            <div className={`p-2 rounded-xl border shrink-0 ${sector.colorClass}`}>
                                                                <sector.icon className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-bold text-gray-900 group-hover:text-rose-600 flex items-center gap-1 transition-colors">
                                                                    <span>{isArabic ? sector.labelAr : sector.labelEn}</span>
                                                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                </div>
                                                                <p className="text-[11px] text-gray-500 leading-snug line-clamp-1">
                                                                    {isArabic ? sector.descAr : sector.descEn}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="w-px h-5 bg-gray-300 mx-1" />

                        {/* Language Switcher */}
                        <Link
                            href={switchLangHref}
                            className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-semibold transition-colors shrink-0 text-sm"
                        >
                            <Globe className="w-4 h-4 opacity-70" />
                            {otherLangLabel}
                        </Link>

                        {/* User Profile / Portal Login */}
                        {user ? (
                            <Link
                                href={`/${lang}/dashboard`}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm bg-white"
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={displayName}
                                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-sm shrink-0">
                                        {displayName[0].toUpperCase()}
                                    </div>
                                )}
                                <div className="flex flex-col text-start">
                                    <span className="text-sm font-black text-gray-900 leading-tight truncate max-w-[90px]">
                                        {displayName}
                                    </span>
                                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider leading-none mt-0.5">
                                        {role}
                                    </span>
                                </div>
                            </Link>
                        ) : (
                            <Link
                                href={`/${lang}/login`}
                                className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg whitespace-nowrap shrink-0"
                            >
                                {isArabic ? "بوابة الدخول" : "Portal Login"}
                            </Link>
                        )}
                    </div>

                    {/* Mobile Navigation Trigger */}
                    <div className="flex items-center gap-4 lg:hidden">
                        <Link
                            href={switchLangHref}
                            className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-semibold transition-colors text-sm"
                        >
                            <Globe className="w-4 h-4 opacity-70" />
                            <span className="hidden sm:inline">{otherLangLabel}</span>
                        </Link>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-lg bg-gray-100/70 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                </div>
            </motion.nav>

            {/* Mobile Slide-out Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`fixed top-20 md:top-24 left-0 right-0 z-40 bg-white shadow-2xl border-b border-gray-100 lg:hidden overflow-y-auto max-h-[calc(100vh-5rem)] ${isArabic ? "rtl font-cairo" : "ltr"
                            }`}
                    >
                        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-2">
                            <Link
                                href={`/${lang}`}
                                onClick={() => setMobileOpen(false)}
                                className="py-3 px-4 rounded-lg font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                            >
                                {isArabic ? "الرئيسية" : "Home"}
                            </Link>
                            <Link
                                href={`/${lang}/about`}
                                onClick={() => setMobileOpen(false)}
                                className="py-3 px-4 rounded-lg font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                            >
                                {isArabic ? "عن ماجيكا" : "About Us"}
                            </Link>

                            {/* Mobile Sub-brands Accordion */}
                            <div>
                                <button
                                    onClick={() => setMobileSubOpen(!mobileSubOpen)}
                                    className="w-full flex items-center justify-between py-3 px-4 rounded-lg font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                                >
                                    <span>{isArabic ? "عالمنا" : "Our World"}</span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform opacity-60 ${mobileSubOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {mobileSubOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className={`px-4 pb-2 flex flex-col gap-1 mt-1 border-gray-100 ${isArabic ? "border-r-2 mr-4" : "border-l-2 ml-4"}`}>
                                                {[...LEARNING_SECTORS, ...MARKETPLACE_SECTORS].map((brand) => (
                                                    <Link
                                                        key={brand.href}
                                                        href={`/${lang}/${brand.href}`}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="flex items-center gap-3 py-2 px-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                                                    >
                                                        <brand.icon className="w-4 h-4 opacity-70" />
                                                        <span>{isArabic ? brand.labelAr : brand.labelEn}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="pt-6 mt-4 border-t border-gray-100">
                                {user ? (
                                    <Link
                                        href={`/${lang}/dashboard`}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-center gap-3 w-full py-3.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm"
                                    >
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={displayName}
                                                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-lg">
                                                {displayName[0].toUpperCase()}
                                            </div>
                                        )}
                                        <div className="flex flex-col text-start">
                                            <span className="text-base font-black text-gray-900 leading-tight">
                                                {displayName}
                                            </span>
                                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider leading-none mt-0.5">
                                                {role}
                                            </span>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link
                                        href={`/${lang}/login`}
                                        onClick={() => setMobileOpen(false)}
                                        className="block w-full py-3.5 text-center bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-md"
                                    >
                                        {isArabic ? "بوابة الدخول" : "Portal Login"}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
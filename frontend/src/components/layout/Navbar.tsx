"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import logoImg from "../../../public/logo.png";
import { useState, useEffect } from "react";

const SUB_BRANDS = (lang: string, isArabic: boolean) => [
    { label: isArabic ? "ماجيكا كامب" : "Magica Camp", href: `/${lang}/magic-camp` },
    { label: isArabic ? "كورسات ماجيكا" : "Magica Courses", href: `/${lang}/magic-courses` },
    { label: isArabic ? "ألعاب ماجيكا الذهنية" : "Magica Mind Games", href: `/${lang}/magic-games` },
    { label: isArabic ? "ماجيكا بازار" : "Magica Bazar", href: `/${lang}/magic-bazar` },
    { label: isArabic ? "ماجيكا فود" : "Magica Food", href: `/${lang}/magic-food` },
    { label: isArabic ? "ماجيكا بودكاست" : "Magica Podcast", href: `/${lang}/magic-podcast` },
    { label: isArabic ? "ماجيكا يونيفورم" : "Magica Uniform", href: `/${lang}/magic-uniform` },
    { label: isArabic ? "ماجيكا سبلايز" : "Magica Supplies", href: `/${lang}/magic-supplies` },
    { label: isArabic ? "أغانٍ ونغمات ماجيكا" : "Magica Songs & Anthems", href: `/${lang}/magic-songs` },
];

export default function Navbar({ lang }: { lang: string }) {
    const pathname = usePathname();
    const isArabic = lang === 'ar';
    const otherLang = isArabic ? 'en' : 'ar';
    const otherLangLabel = isArabic ? 'English' : 'عربي';
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSubOpen, setMobileSubOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    let switchLangHref = `/${otherLang}`;
    if (pathname) {
        const segments = pathname.split('/');
        if (segments[1] === lang) {
            segments[1] = otherLang;
            switchLangHref = segments.join('/');
        }
    }

    const Dropdown = ({ title, links }: { title: string, links: { label: string, href: string }[] }) => (
        <div className="relative group">
            <button className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 font-semibold transition-colors py-2 text-sm tracking-wide">
                {title}
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 opacity-70" />
            </button>
            <div className={`absolute top-full ${isArabic ? 'right-0' : 'left-0'} pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-56 z-50`}>
                <div className="bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-xl p-2 flex flex-col gap-0.5">
                    {links.map((link, idx) => (
                        <Link key={idx} href={link.href} className="px-4 py-2.5 hover:bg-gray-50 rounded-lg text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm text-start">
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );

    const subBrands = SUB_BRANDS(lang, isArabic);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled 
                        ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100" 
                        : "bg-white/50 backdrop-blur-md border-b border-gray-200/50"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">

                    {/* Logo */}
                    <Link href={`/${lang}`} className="flex items-center gap-3 shrink-0">
                        <Image src={logoImg} alt="Magica Zone Logo" className="h-14 md:h-16 w-auto object-contain hover:opacity-90 transition-opacity mix-blend-multiply" />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-10">
                        <Link href={`/${lang}`} className="text-gray-700 hover:text-gray-900 font-semibold transition-colors whitespace-nowrap text-sm tracking-wide">
                            {isArabic ? "الرئيسية" : "Home"}
                        </Link>
                        <Link href={`/${lang}/about`} className="text-gray-700 hover:text-gray-900 font-semibold transition-colors whitespace-nowrap text-sm tracking-wide">
                            {isArabic ? "عن ماجيكا" : "About Us"}
                        </Link>

                        <Dropdown
                            title={isArabic ? "عالمنا" : "Our World"}
                            links={subBrands}
                        />

                        <div className="w-px h-5 bg-gray-300 mx-2" />

                        <Link href={switchLangHref} className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium transition-colors shrink-0 text-sm">
                            <Globe className="w-4 h-4 opacity-70" />
                            {otherLangLabel}
                        </Link>

                        <Link
                            href={`/${lang}/login`}
                            className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg whitespace-nowrap shrink-0"
                        >
                            {isArabic ? "بوابة الدخول" : "Portal Login"}
                        </Link>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex items-center gap-4 lg:hidden">
                        <Link href={switchLangHref} className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">
                            <Globe className="w-4 h-4 opacity-70" />
                            <span className="hidden sm:inline">{otherLangLabel}</span>
                        </Link>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-lg bg-gray-100/50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-20 md:top-24 left-0 right-0 z-40 bg-white shadow-2xl border-b border-gray-100 lg:hidden overflow-y-auto max-h-[calc(100vh-5rem)]"
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
                                    {isArabic ? "عالمنا" : "Our World"}
                                    <ChevronDown className={`w-4 h-4 transition-transform opacity-60 ${mobileSubOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {mobileSubOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-2 flex flex-col gap-1 mt-1 border-l-2 border-gray-100 ml-4">
                                                {subBrands.map((brand, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={brand.href}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="py-2.5 px-4 rounded-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                                                    >
                                                        {brand.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="pt-6 mt-4 border-t border-gray-100">
                                <Link
                                    href={`/${lang}/login`}
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full py-3.5 text-center bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-md"
                                >
                                    {isArabic ? "بوابة الدخول" : "Portal Login"}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import logoImg from "../../../public/logo.png";
import { useState } from "react";

const SUB_BRANDS = (lang: string, isArabic: boolean) => [
    { label: isArabic ? "🏕️ ماجيك كامب" : "🏕️ Magic Camp", href: `/${lang}/magic-camp` },
    { label: isArabic ? "🛍️ ماجيك بازار" : "🛍️ Magic Bazar", href: `/${lang}/magic-bazar` },
    { label: isArabic ? "🍱 ماجيك فود" : "🍱 Magic Food", href: `/${lang}/magic-food` },
    { label: isArabic ? "🎙️ ماجيك بودكاست" : "🎙️ Magic Podcast", href: `/${lang}/magic-podcast` },
    { label: isArabic ? "👕 ماجيك يونيفورم" : "👕 Magic Uniform", href: `/${lang}/magic-uniform` },
    { label: isArabic ? "🎒 ماجيك سبلايز" : "🎒 Magic Supplies", href: `/${lang}/magic-supplies` },
];

export default function Navbar({ lang }: { lang: string }) {
    const pathname = usePathname();
    const isArabic = lang === 'ar';
    const otherLang = isArabic ? 'en' : 'ar';
    const otherLangLabel = isArabic ? 'English' : 'عربي';
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSubOpen, setMobileSubOpen] = useState(false);

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
            <button className="flex items-center gap-1 text-gray-600 hover:text-orange-500 font-bold transition-colors py-2">
                {title}
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className={`absolute top-full ${isArabic ? 'right-0' : 'left-0'} pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-64 z-50`}>
                <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-2 flex flex-col gap-1">
                    {links.map((link, idx) => (
                        <Link key={idx} href={link.href} className="px-4 py-2.5 hover:bg-orange-50 rounded-xl text-gray-600 hover:text-orange-600 font-semibold transition-colors text-sm text-start">
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
                className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-gray-200/50"
            >
                <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

                    {/* Logo */}
                    <Link href={`/${lang}`} className="flex items-center gap-3 shrink-0">
                        <Image src={logoImg} alt="Magica Zone Logo" className="h-16 md:h-20 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform" />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-4 xl:gap-8">
                        <Link href={`/${lang}`} className="text-gray-600 hover:text-orange-500 font-bold transition-colors whitespace-nowrap">
                            {isArabic ? "الرئيسية" : "Home"}
                        </Link>
                        <Link href={`/${lang}/about`} className="text-gray-600 hover:text-orange-500 font-bold transition-colors whitespace-nowrap">
                            {isArabic ? "عن ماجيكا" : "About Us"}
                        </Link>

                        <Dropdown
                            title={isArabic ? "عالمنا" : "Our World"}
                            links={subBrands}
                        />

                        <div className="w-px h-6 bg-gray-300 mx-1" />

                        <Link href={switchLangHref} className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-bold transition-colors shrink-0">
                            <Globe className="w-4 h-4" />
                            {otherLangLabel}
                        </Link>

                        <Link
                            href={`/${lang}/login`}
                            className="px-5 xl:px-6 py-2.5 rounded-full border-2 border-green-500 text-green-500 font-bold hover:bg-green-500 hover:text-white transition-all shadow-sm whitespace-nowrap shrink-0"
                        >
                            {isArabic ? "بوابة ماجيكا" : "Magica Portal"}
                        </Link>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex items-center gap-3 lg:hidden">
                        <Link href={switchLangHref} className="flex items-center gap-1 text-gray-600 hover:text-orange-500 font-bold transition-colors text-sm">
                            <Globe className="w-4 h-4" />
                            {otherLangLabel}
                        </Link>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-xl bg-gray-100 hover:bg-orange-100 transition-colors text-gray-700 hover:text-orange-600"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-24 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl lg:hidden"
                    >
                        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-2">
                            <Link
                                href={`/${lang}`}
                                onClick={() => setMobileOpen(false)}
                                className="py-3 px-4 rounded-xl font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            >
                                {isArabic ? "الرئيسية" : "Home"}
                            </Link>
                            <Link
                                href={`/${lang}/about`}
                                onClick={() => setMobileOpen(false)}
                                className="py-3 px-4 rounded-xl font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            >
                                {isArabic ? "عن ماجيكا" : "About Us"}
                            </Link>

                            {/* Mobile Sub-brands Accordion */}
                            <div>
                                <button
                                    onClick={() => setMobileSubOpen(!mobileSubOpen)}
                                    className="w-full flex items-center justify-between py-3 px-4 rounded-xl font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                >
                                    {isArabic ? "عالمنا" : "Our World"}
                                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {mobileSubOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-2 flex flex-col gap-1">
                                                {subBrands.map((brand, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={brand.href}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="py-2.5 px-4 rounded-xl font-semibold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm"
                                                    >
                                                        {brand.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="pt-2 border-t border-gray-100 mt-2">
                                <Link
                                    href={`/${lang}/login`}
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full py-3 text-center bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                                >
                                    {isArabic ? "بوابة ماجيكا" : "Magica Portal"}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

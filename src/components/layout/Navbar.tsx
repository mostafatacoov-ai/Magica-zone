"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wand2, Globe } from "lucide-react";

import Image from "next/image";
import logoImg from "../../../public/logo.png";

export default function Navbar({ lang }: { lang: string }) {
    const isArabic = lang === 'ar';
    const otherLang = isArabic ? 'en' : 'ar';
    const otherLangLabel = isArabic ? 'English' : 'عربي';

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-40 bg-white/60 backdrop-blur-md border-b border-gray-200/50"
        >
            <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
                
                {/* Logo */}
                <Link href={`/${lang}`} className="flex items-center gap-3">
                    <Image src={logoImg} alt="Magic Camp Logo" className="h-24 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href={`/${lang}#about`} className="text-gray-600 hover:text-[#fd8a4c] font-bold transition-colors">
                        {isArabic ? "من نحن" : "About Us"}
                    </Link>
                    <Link href={`/${lang}#team`} className="text-gray-600 hover:text-[#fd8a4c] font-bold transition-colors">
                        {isArabic ? "الفريق" : "Team"}
                    </Link>
                    
                    <div className="w-px h-6 bg-gray-300" />

                    <Link href={`/${otherLang}`} className="flex items-center gap-2 text-gray-600 hover:text-[#fd8a4c] font-bold transition-colors">
                        <Globe className="w-4 h-4" />
                        {otherLangLabel}
                    </Link>

                    <Link 
                        href={`/${lang}/login`} 
                        className="px-6 py-2 rounded-full border-2 border-[#76c05a] text-[#76c05a] font-bold hover:bg-[#76c05a] hover:text-white transition-colors shadow-sm"
                    >
                        {isArabic ? "دخول" : "Login"}
                    </Link>
                    <Link 
                        href={`/${lang}/register`} 
                        className="px-6 py-2 rounded-full bg-[#fd8a4c] text-white font-bold hover:bg-[#e67a3a] shadow-lg shadow-[#fd8a4c]/40 transition-all hover:-translate-y-0.5"
                    >
                        {isArabic ? "سجل الآن" : "Register"}
                    </Link>
                </div>

            </div>
        </motion.nav>
    );
}

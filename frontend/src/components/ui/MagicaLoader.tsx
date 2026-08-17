"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface MagicaLoaderProps {
    fullScreen?: boolean;
    text?: string;
    subText?: string;
    lang?: string;
}

export default function MagicaLoader({ 
    fullScreen = true, 
    text, 
    subText, 
    lang
}: MagicaLoaderProps) {
    const pathname = usePathname();
    const resolvedLang = lang || (pathname?.startsWith("/ar") ? "ar" : "en");
    const isArabic = resolvedLang === "ar";
    
    const displayTitle = text || (isArabic ? "عـالـم مـاجـيـكـا" : "MAGICA ZONE");
    const displaySubtitle = subText || (isArabic ? "جارٍ تجميع السحر والابتكار..." : "Gathering Magic & Innovation...");

    const content = (
        <div className="relative flex flex-col items-center justify-center p-8 text-center select-none overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>
            {/* Ambient Background Energy Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-orange-500/20 to-amber-400/25 blur-2xl pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute w-64 h-64 rounded-full bg-gradient-to-bl from-emerald-500/20 to-teal-400/20 blur-2xl pointer-events-none"
            />

            {/* Main Animated Logo Container */}
            <div className="relative flex items-center justify-center w-36 h-36 mb-6">
                
                {/* Outer Rotating Energy Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-orange-500 border-r-amber-400 shadow-lg shadow-orange-500/20 opacity-80"
                />

                {/* Inner Counter-Rotating Emerald Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-[2px] border-transparent border-b-emerald-500 border-l-teal-400 opacity-70"
                />

                {/* Shimmering Pulse Halo */}
                <motion.div
                    animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.1, 0.35, 0.1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-4 rounded-full bg-gradient-to-tr from-orange-400 via-emerald-400 to-amber-300 blur-md"
                />

                {/* Floating 3D Magica Logo */}
                <motion.div
                    animate={{
                        y: [-6, 6, -6],
                        scale: [0.98, 1.06, 0.98],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative z-10 w-24 h-24 flex items-center justify-center drop-shadow-xl p-2 bg-white/90 rounded-3xl border border-white/80 shadow-2xl backdrop-blur-md"
                >
                    <Image
                        src="/logo.png"
                        alt="Magica Zone"
                        width={90}
                        height={90}
                        className="object-contain w-auto h-auto max-w-full max-h-full mix-blend-multiply"
                    />
                </motion.div>
            </div>

            {/* Typography & Magical Glow */}
            <div className="space-y-2 max-w-xs z-10">
                <motion.h2
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xl font-black tracking-widest uppercase bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600 bg-clip-text text-transparent"
                >
                    {displayTitle}
                </motion.h2>

                <p className="text-xs font-extrabold text-gray-500 tracking-wide flex items-center justify-center gap-1.5">
                    <span>{displaySubtitle}</span>
                    <span className="inline-flex gap-1">
                        <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
                        <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                        <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }} className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                    </span>
                </p>

                {/* Animated Shimmer Progress Bar */}
                <div className="w-48 h-1.5 bg-gray-200/80 rounded-full overflow-hidden mx-auto mt-4 shadow-inner">
                    <motion.div
                        animate={{
                            x: ["-100%", "200%"]
                        }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-1/2 h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 rounded-full"
                    />
                </div>
            </div>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50/40 backdrop-blur-md min-h-screen w-full">
                {content}
            </div>
        );
    }

    return (
        <div className="flex w-full min-h-[360px] items-center justify-center p-6 bg-white/50 rounded-3xl border border-gray-100/80 shadow-sm backdrop-blur-xs">
            {content}
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MagicalBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="fixed inset-0 bg-[#fffaf0] -z-50" />;

    return (
        <div className="fixed inset-0 bg-[#fffaf0] -z-50 overflow-hidden">
            {/* Ambient gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#fd8a4c] opacity-10 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#76c05a] opacity-10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            
            {/* Floating Orbs */}
            <motion.div 
                className="absolute top-[20%] left-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-[#76c05a] to-transparent opacity-20 blur-2xl animate-bounce"
            />
            <motion.div 
                className="absolute bottom-[30%] right-[20%] w-48 h-48 rounded-full bg-gradient-to-br from-[#fd8a4c] to-transparent opacity-20 blur-2xl animate-bounce"
            />
            
            {/* Stars */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-[#fd8a4c] rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: Math.random() * 4 + 1 + 'px',
                        height: Math.random() * 4 + 1 + 'px',
                        opacity: Math.random() * 0.5 + 0.2,
                    }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X, ZoomIn, Star, Sparkles } from "lucide-react";

const IMAGES = [
    "/DSC09927.JPG",
    "/DSC09941.JPG",
    "/DSC09956_edited.jpg",
    "/DSC09959_edited.jpg",
    "/DSC09962_edited.jpg",
    "/DSC09964.JPG",
    "/DSC09966.JPG",
    "/DSC09967.JPG",
    "/DSC09971.JPG",
    "/DSC09972.JPG",
    "/DSC09976.JPG",
    "/DSC09981.JPG",
    "/DSC09982.JPG"
];

export default function Gallery({ lang }: { lang: string }) {
    const isArabic = lang === 'ar';
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section id="gallery" className="py-32 pb-48 bg-[#fffaf0] relative z-10 border-t border-gray-200/50 overflow-hidden">
            
            {/* Inject CSS for 3D Cylinder Animation */}
            <style dangerouslySetInnerHTML={{__html: `
                .cylinder-wrapper {
                    --tz: 350px;
                }
                @media (min-width: 768px) {
                    .cylinder-wrapper {
                        --tz: 580px;
                    }
                }
                @keyframes spin-cylinder {
                    from { transform: rotateY(0deg); }
                    to { transform: rotateY(-360deg); }
                }
                .cylinder-track {
                    animation: spin-cylinder 50s infinite linear;
                    transform-style: preserve-3d;
                }
                .cylinder-track:hover {
                    animation-play-state: paused;
                }
                .cylinder-item {
                    transform-style: preserve-3d;
                    backface-visibility: hidden;
                }
            `}} />

            <div className="max-w-7xl mx-auto px-6 mb-40 md:mb-56 relative z-20">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", bounce: 0.6, duration: 1 }}
                    className="text-center relative inline-block w-full"
                >
                    {/* Animated Stars */}
                    <motion.div 
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="absolute -top-12 left-[10%] md:left-[25%] opacity-70"
                    >
                        <Star className="text-[#ffb800] w-8 h-8 fill-current drop-shadow-md" />
                    </motion.div>
                    <motion.div 
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                        className="absolute top-4 right-[10%] md:right-[20%]"
                    >
                        <Sparkles className="text-[#fd8a4c] w-6 h-6 drop-shadow-sm" />
                    </motion.div>

                    <h2 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#76c05a] to-[#fd8a4c] drop-shadow-sm inline-block">
                        {isArabic ? "خطوة داخل عالمنا السحري ✨" : "Step Inside Our Magical World ✨"}
                    </h2>
                    <p className="text-lg font-medium text-gray-600 max-w-2xl mx-auto">
                        {isArabic ? "شاهد أبطالنا وهم يصنعون ذكريات لا تُنسى في المخيم!" : "Watch our little heroes create unforgettable memories at camp!"}
                    </p>
                </motion.div>
            </div>

            {/* 3D Cylinder Container */}
            <div className="relative w-full h-[350px] md:h-[450px] mt-16 md:mt-24 flex items-center justify-center cylinder-wrapper" style={{ perspective: '1200px' }}>
                <div className="relative w-[200px] h-[300px] md:w-[280px] md:h-[400px] cylinder-track">
                    {IMAGES.map((src, idx) => (
                        <div
                            key={idx}
                            className="absolute top-0 left-0 w-full h-full cylinder-item cursor-pointer group"
                            style={{ 
                                transform: `rotateY(${idx * (360 / IMAGES.length)}deg) translateZ(var(--tz))` 
                            }}
                            onClick={() => setSelectedImage(src)}
                        >
                            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white transition-transform duration-300 group-hover:scale-105">
                                <Image 
                                    src={src} 
                                    alt={`Camp Moment ${idx + 1}`} 
                                    fill 
                                    unoptimized={true}
                                    className="object-cover" 
                                />
                                {/* Overlay & Icon on Hover */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <ZoomIn className="text-white w-12 h-12" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-pointer"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 bg-white/10 p-2 rounded-full"
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative w-full max-w-6xl h-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking the image itself
                    >
                        <Image 
                            src={selectedImage}
                            alt="Full View"
                            fill
                            unoptimized={true}
                            className="object-contain"
                        />
                    </motion.div>
                </div>
            )}
            
        </section>
    );
}

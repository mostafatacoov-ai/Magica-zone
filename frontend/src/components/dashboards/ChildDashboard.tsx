"use client";

import { motion } from "framer-motion";
import { Star, Trophy, Gamepad2, Sparkles, Map } from "lucide-react";
import { useState } from "react";

export default function ChildDashboard({ lang }: { lang: string }) {
    const isArabic = lang === 'ar';
    const [points, setPoints] = useState(250); // Mock points

    const nextLevelPoints = 500;
    const progress = (points / nextLevelPoints) * 100;

    return (
        <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Main Points Card */}
                <motion.div 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="p-10 bg-gradient-to-br from-green-500 to-lime-500 text-white rounded-3xl shadow-xl relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <Sparkles className="absolute top-4 right-4 w-24 h-24 text-white opacity-10" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-lg border border-white/30">
                            <Star className="w-12 h-12 text-yellow-300 fill-current" />
                        </div>
                        <h3 className="text-3xl font-extrabold mb-2">{isArabic ? "نقاطي السحرية" : "My Magic Points"}</h3>
                        <p className="text-7xl font-black drop-shadow-md tracking-tight">{points}</p>
                        
                        <div className="w-full mt-10">
                            <div className="flex justify-between text-sm font-bold mb-2">
                                <span>{isArabic ? "المستوى الحالي" : "Current Level"}</span>
                                <span>{nextLevelPoints} {isArabic ? "للمستوى القادم" : "for Next Level"}</span>
                            </div>
                            <div className="w-full h-4 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-4 group">
                        <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <Gamepad2 className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-gray-800 text-lg">{isArabic ? "الألعاب" : "Games"}</span>
                    </motion.button>

                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-4 group">
                        <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Map className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-gray-800 text-lg">{isArabic ? "خريطة المعسكر" : "Camp Map"}</span>
                    </motion.button>
                    
                    <motion.div className="col-span-2 bg-gradient-to-r from-orange-400 to-red-500 p-6 rounded-3xl shadow-md text-white flex items-center justify-between">
                        <div>
                            <h4 className="font-extrabold text-xl mb-1">{isArabic ? "شارة جديدة متاحة!" : "New Badge Available!"}</h4>
                            <p className="opacity-90">{isArabic ? "أكمل مهمة اليوم" : "Complete today's quest"}</p>
                        </div>
                        <Trophy className="w-12 h-12 text-yellow-300" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

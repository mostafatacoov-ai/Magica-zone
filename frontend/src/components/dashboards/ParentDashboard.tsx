"use client";

import { motion } from "framer-motion";
import { Plus, X, Calendar, Award } from "lucide-react";
import { useState } from "react";

const mockChildren = [
    { id: 1, name: "Omar", age: 10, points: 150, nextCamp: "Robotics Intro" },
    { id: 2, name: "Laila", age: 8, points: 200, nextCamp: "Magic Art" },
];

export default function ParentDashboard({ lang }: { lang: string }) {
    const isArabic = lang === 'ar';
    const [children, setChildren] = useState(mockChildren);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{isArabic ? "أطفالي" : "My Children"}</h2>
                    <p className="text-gray-500">{isArabic ? "إدارة ومتابعة أطفالك" : "Manage and track your children"}</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
                >
                    <Plus className="w-5 h-5" />
                    {isArabic ? "إضافة طفل" : "Add a Child"}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {children.map(child => (
                    <motion.div whileHover={{ y: -5 }} key={child.id} className="p-8 bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100 to-transparent rounded-bl-full -z-0"></div>
                        <div className="relative z-10 flex items-center gap-6 mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center text-4xl font-extrabold shadow-md">
                                {child.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">{child.name}</h3>
                                <p className="text-gray-500 font-medium">{isArabic ? "العمر:" : "Age:"} {child.age}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                                <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                                    <Award className="w-5 h-5" />
                                    {isArabic ? "النقاط" : "Points"}
                                </div>
                                <p className="text-2xl font-extrabold text-gray-800">{child.points}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                                <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                                    <Calendar className="w-5 h-5" />
                                    {isArabic ? "المعسكر القادم" : "Next Camp"}
                                </div>
                                <p className="text-lg font-bold text-gray-800 truncate">{child.nextCamp}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative"
                    >
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
                            <X className="w-6 h-6" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            {isArabic ? "إضافة طفل جديد" : "Add a New Child"}
                        </h2>
                        <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{isArabic ? "الاسم" : "Full Name"}</label>
                                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{isArabic ? "العمر" : "Age"}</label>
                                <input required type="number" min="5" max="15" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 outline-none" />
                            </div>
                            <button type="submit" className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors mt-6 text-lg">
                                {isArabic ? "إنشاء الحساب" : "Create Account"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

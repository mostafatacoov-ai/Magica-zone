"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const mockStudents = [
    { id: 1, name: "Omar", email: "omar@magiccamp.com" },
    { id: 2, name: "Laila", email: "laila@magiccamp.com" },
    { id: 3, name: "Youssef", email: "youssef@magiccamp.com" },
];

export default function TeacherDashboard({ lang }: { lang: string }) {
    const isArabic = lang === 'ar';
    const [students] = useState(mockStudents);

    const handleAward = (id: number, amount: number) => {
        alert(isArabic ? `تم منح ${amount} نقطة!` : `Awarded ${amount} points!`);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{isArabic ? "طلابي" : "My Students"}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map(student => (
                    <motion.div whileHover={{ y: -5 }} key={student.id} className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-sm">
                                {student.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{student.name}</h3>
                                <p className="text-sm text-gray-500">{student.email}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-2">
                            <button onClick={() => handleAward(student.id, 5)} className="flex-1 py-3 bg-yellow-50 text-yellow-600 font-bold rounded-xl hover:bg-yellow-100 border border-yellow-200 transition-colors shadow-sm">+5</button>
                            <button onClick={() => handleAward(student.id, 10)} className="flex-1 py-3 bg-orange-50 text-orange-600 font-bold rounded-xl hover:bg-orange-100 border border-orange-200 transition-colors shadow-sm">+10</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

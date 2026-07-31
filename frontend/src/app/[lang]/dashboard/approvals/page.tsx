"use client";

import { useState, useEffect } from "react";
import { getPendingParents, approveParent } from "@/lib/firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ApprovalsPage({ params: { lang } }: { params: { lang: string } }) {
    const { role } = useAuth();
    const isArabic = lang === 'ar';
    const [pendingParents, setPendingParents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (role === "admin") {
            fetchPending();
        }
    }, [role]);

    const fetchPending = async () => {
        setLoading(true);
        try {
            const parents = await getPendingParents();
            setPendingParents(parents);
        } catch (error) {
            console.error("Failed to fetch pending parents", error);
        }
        setLoading(false);
    };

    const handleApprove = async (uid: string) => {
        try {
            await approveParent(uid);
            // Refresh list
            setPendingParents(prev => prev.filter(p => p.id !== uid));
        } catch (error) {
            console.error("Failed to approve", error);
        }
    };

    if (role !== "admin") return null;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                {isArabic ? "طلبات التسجيل المعلقة" : "Pending Registrations"}
            </h1>

            {loading ? (
                <div className="text-gray-500">Loading...</div>
            ) : pendingParents.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center shadow-sm">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">
                        {isArabic ? "لا توجد طلبات معلقة حاليًا." : "No pending registrations."}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {pendingParents.map(parent => (
                        <motion.div 
                            key={parent.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-lg">{parent.email || "No Email Provided"}</p>
                                    <p className="text-sm text-gray-500">
                                        {isArabic ? "تاريخ التسجيل:" : "Registered:"} {parent.updatedAt?.toDate?.().toLocaleDateString() || "N/A"}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleApprove(parent.id)}
                                className="px-6 py-2 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
                            >
                                {isArabic ? "قبول" : "Approve"}
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

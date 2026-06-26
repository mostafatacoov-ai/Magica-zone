"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Users, BookOpen, Star, UserPlus, Plus, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { getAllStudents, awardPoints } from "@/lib/firebase/firestore";

export default function DashboardPage({ params: { lang } }: { params: { lang: string } }) {
    const { role, user } = useAuth();
    const isArabic = lang === 'ar';

    if (!role) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-8"
        >
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-gray-800">
                    {isArabic ? "مرحباً،" : "Welcome,"} {user?.email?.split('@')[0]}
                </h1>
                <p className="text-gray-500 mt-2 text-lg">
                    {isArabic ? `أنت مسجل كـ ${role}` : `You are logged in as a ${role}`}
                </p>
            </header>

            {role === "admin" && <AdminDashboard lang={lang} />}
            {role === "teacher" && <TeacherDashboard lang={lang} />}
            {role === "parent" && <ParentDashboard lang={lang} />}
            {role === "child" && <ChildDashboard lang={lang} />}
        </motion.div>
    );
}

function AdminDashboard({ lang }: { lang: string }) {
    const isArabic = lang === 'ar';
    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-4 bg-orange-100 text-orange-500 rounded-2xl"><UserPlus className="w-8 h-8"/></div>
                <div>
                    <p className="text-gray-500 font-semibold">{isArabic ? "الطلبات المعلقة" : "Pending Approvals"}</p>
                    <h3 className="text-2xl font-bold text-gray-800">5</h3>
                </div>
            </div>
        </div>
    );
}

function TeacherDashboard({ lang }: { lang: string }) {
    const { user } = useAuth();
    const isArabic = lang === 'ar';
    const [students, setStudents] = useState<any[]>([]);

    useEffect(() => {
        getAllStudents().then(setStudents);
    }, []);

    const handleAward = async (childId: string, amount: number) => {
        if (!user) return;
        await awardPoints(childId, user.uid, amount);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{isArabic ? "طلابي" : "My Students"}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map(student => (
                    <div key={student.id} className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center font-bold text-xl">
                                {student.name?.charAt(0).toUpperCase() || "S"}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{student.name}</h3>
                                <p className="text-sm text-gray-500">{student.email}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => handleAward(student.id, 5)} className="flex-1 py-2 bg-yellow-100 text-yellow-600 font-bold rounded-xl hover:bg-yellow-200 transition-colors">+5 Points</button>
                            <button onClick={() => handleAward(student.id, 10)} className="flex-1 py-2 bg-yellow-100 text-yellow-600 font-bold rounded-xl hover:bg-yellow-200 transition-colors">+10 Points</button>
                        </div>
                    </div>
                ))}
                {students.length === 0 && (
                    <p className="text-gray-500">{isArabic ? "لا يوجد طلاب متاحون." : "No students available."}</p>
                )}
            </div>
        </div>
    );
}

function ParentDashboard({ lang }: { lang: string }) {
    const { user } = useAuth();
    const isArabic = lang === 'ar';
    const [children, setChildren] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [childName, setChildName] = useState("");
    const [childEmail, setChildEmail] = useState("");
    const [childPassword, setChildPassword] = useState("");
    const [childAge, setChildAge] = useState("");

    useEffect(() => {
        if (user) fetchChildren();
    }, [user]);

    const fetchChildren = async () => {
        if (!user) return;
        const parentDoc = await getDoc(doc(db, "users", user.uid));
        if (parentDoc.exists()) {
            const data = parentDoc.data();
            if (data.children && data.children.length > 0) {
                // Fetch each child document
                const childDocs = await Promise.all(
                    data.children.map((childId: string) => getDoc(doc(db, "users", childId)))
                );
                setChildren(childDocs.map(d => ({ id: d.id, ...d.data() })));
            }
        }
    };

    const handleAddChild = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const idToken = await user?.getIdToken();
            const res = await fetch("/api/auth/createChild", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    idToken,
                    name: childName,
                    email: childEmail,
                    password: childPassword,
                    age: Number(childAge),
                })
            });
            const data = await res.json();
            if (data.success) {
                setIsModalOpen(false);
                fetchChildren();
                setChildName(""); setChildEmail(""); setChildPassword(""); setChildAge("");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">{isArabic ? "أطفالي" : "My Children"}</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
                >
                    <Plus className="w-5 h-5" />
                    {isArabic ? "إضافة طفل" : "Add a Child"}
                </button>
            </div>

            {children.length === 0 ? (
                <div className="p-8 bg-white rounded-3xl shadow-sm border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center h-48">
                    <p className="text-gray-500 mb-4">{isArabic ? "لم تقم بإضافة أي أطفال بعد." : "You haven't added any children yet."}</p>
                    <button onClick={() => setIsModalOpen(true)} className="text-orange-500 font-bold hover:underline">
                        {isArabic ? "إنشاء حساب لطفلك" : "Create your child's account"}
                    </button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {children.map(child => (
                        <div key={child.id} className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-2xl font-bold">
                                {child.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{child.name}</h3>
                                <p className="text-gray-500">{isArabic ? "العمر:" : "Age:"} {child.age}</p>
                                <p className="text-sm text-gray-400">{child.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
                        <form onSubmit={handleAddChild} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{isArabic ? "الاسم" : "Full Name"}</label>
                                <input required type="text" value={childName} onChange={e => setChildName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 outline-none" />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">{isArabic ? "العمر" : "Age"}</label>
                                    <input required type="number" min="5" max="15" value={childAge} onChange={e => setChildAge(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{isArabic ? "البريد الإلكتروني للطفل" : "Child's Email"}</label>
                                <input required type="email" value={childEmail} onChange={e => setChildEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{isArabic ? "كلمة المرور" : "Password"}</label>
                                <input required type="password" minLength={6} value={childPassword} onChange={e => setChildPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 outline-none" />
                            </div>
                            <button disabled={loading} type="submit" className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors flex justify-center items-center gap-2 mt-6">
                                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                                {isArabic ? "إنشاء الحساب" : "Create Account"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

function ChildDashboard({ lang }: { lang: string }) {
    const { user } = useAuth();
    const isArabic = lang === 'ar';
    const [points, setPoints] = useState(0);

    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, "points"), where("childId", "==", user.uid));
        const unsub = onSnapshot(q, (snapshot) => {
            let total = 0;
            snapshot.docs.forEach(doc => {
                total += doc.data().amount || 0;
            });
            setPoints(total);
        });
        return () => unsub();
    }, [user]);

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
                key={points}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="p-8 bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-3xl shadow-lg border-4 border-orange-200"
            >
                <div className="flex items-center gap-4 mb-4">
                    <Star className="w-10 h-10 text-yellow-300 fill-current" />
                    <h3 className="text-3xl font-bold">{isArabic ? "نقاطي السحرية" : "My Magic Points"}</h3>
                </div>
                <p className="text-6xl font-extrabold text-white">{points}</p>
                <p className="mt-4 font-medium opacity-90">{isArabic ? "أنت تقوم بعمل رائع!" : "You're doing great!"}</p>
            </motion.div>
        </div>
    );
}

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAllUsers, updateUserRole, updateUserStatus, createAdminUserDoc, deleteUserDoc } from "@/lib/firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import MagicaLoader from "@/components/ui/MagicaLoader";
import { 
    Users, UserPlus, Search, Shield, UserCheck, UserX, Trash2, Edit3, 
    CheckCircle2, AlertCircle, Filter, Sparkles, Mail, Phone, Calendar, 
    ArrowUpRight, X, Save, Check, ShieldAlert, GraduationCap, Heart, Gamepad2, User
} from "lucide-react";

interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: "admin" | "teacher" | "parent" | "child";
    status: "approved" | "pending_approval" | "suspended";
    phone?: string;
    meta?: string;
    createdAt?: string;
    isMock?: boolean;
}

const DEFAULT_SYSTEM_USERS: UserProfile[] = [
    {
        id: "admin-system-1",
        name: "Mustafa Magdi",
        email: "admin@magiccamp.com",
        role: "admin",
        status: "approved",
        phone: "+20 100 123 4567",
        meta: "Executive Founder & Chief Director",
        createdAt: "2024-01-15",
        isMock: true
    },
    {
        id: "teacher-system-1",
        name: "Sara Ahmed",
        email: "teacher@magiccamp.com",
        role: "teacher",
        status: "approved",
        phone: "+20 101 987 6543",
        meta: "STEM & Robotics Senior Mentor",
        createdAt: "2024-02-01",
        isMock: true
    },
    {
        id: "teacher-system-2",
        name: "Omar Ali",
        email: "omar.ali@magiccamp.com",
        role: "teacher",
        status: "approved",
        phone: "+20 102 345 6789",
        meta: "Mental Math & Cognitive Alchemy",
        createdAt: "2024-03-10",
        isMock: true
    },
    {
        id: "parent-system-1",
        name: "Khaled Mahmoud",
        email: "parent@magiccamp.com",
        role: "parent",
        status: "approved",
        phone: "+20 103 456 7890",
        meta: "2 Children Enrolled (Yassin & Lina)",
        createdAt: "2024-04-05",
        isMock: true
    },
    {
        id: "parent-system-2",
        name: "Fatma Hassan",
        email: "fatma.hassan@example.com",
        role: "parent",
        status: "pending_approval",
        phone: "+20 104 567 8901",
        meta: "New Registration Request",
        createdAt: "2024-05-18",
        isMock: true
    },
    {
        id: "child-system-1",
        name: "Yassin Khaled",
        email: "child@magiccamp.com",
        role: "child",
        status: "approved",
        phone: "+20 103 456 7890",
        meta: "Level 4 • 450 Magic Points",
        createdAt: "2024-04-05",
        isMock: true
    },
    {
        id: "child-system-2",
        name: "Lina Khaled",
        email: "lina.khaled@magiccamp.com",
        role: "child",
        status: "approved",
        phone: "+20 103 456 7890",
        meta: "Level 3 • 320 Magic Points",
        createdAt: "2024-04-05",
        isMock: true
    }
];

export default function UsersManagementPage({ params: { lang } }: { params: { lang: string } }) {
    const { role } = useAuth();
    const isArabic = lang === 'ar';
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeRoleFilter, setActiveRoleFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Modal state for adding/editing user
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
    const [formName, setFormName] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formRole, setFormRole] = useState<UserProfile["role"]>("parent");
    const [formStatus, setFormStatus] = useState<UserProfile["status"]>("approved");
    const [formPhone, setFormPhone] = useState("");
    const [formMeta, setFormMeta] = useState("");

    useEffect(() => {
        if (role === "admin") {
            loadUsersData();
        }
    }, [role]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 4000);
    };

    const loadUsersData = async () => {
        setLoading(true);
        try {
            // Check localStorage for persisted additions/edits
            const localData = localStorage.getItem("magica_admin_users_v1");
            let localUsers: UserProfile[] = localData ? JSON.parse(localData) : [...DEFAULT_SYSTEM_USERS];

            // Try fetching from Firestore
            const firestoreDocs = await getAllUsers();
            if (firestoreDocs && firestoreDocs.length > 0) {
                // Merge firestore users with local users without duplicates by email or id
                const existingEmails = new Set(localUsers.map(u => u.email.toLowerCase()));
                firestoreDocs.forEach((doc: any) => {
                    if (doc.email && !existingEmails.has(doc.email.toLowerCase())) {
                        localUsers.push({
                            id: doc.id,
                            name: doc.displayName || doc.name || doc.email.split('@')[0],
                            email: doc.email,
                            role: doc.role || "parent",
                            status: doc.status || "approved",
                            phone: doc.phone || doc.phoneNumber || "+20 --- --- ----",
                            meta: doc.meta || "Registered via Auth",
                            createdAt: doc.createdAt?.toDate?.() ? doc.createdAt.toDate().toLocaleDateString() : "Recent",
                            isMock: false
                        });
                        existingEmails.add(doc.email.toLowerCase());
                    } else if (doc.email) {
                        // Synchronize role/status from firestore if present
                        const existing = localUsers.find(u => u.email.toLowerCase() === doc.email.toLowerCase());
                        if (existing && doc.role) existing.role = doc.role;
                        if (existing && doc.status) existing.status = doc.status;
                    }
                });
            }

            setUsers(localUsers);
            localStorage.setItem("magica_admin_users_v1", JSON.stringify(localUsers));
        } catch (error) {
            console.error("Error loading users:", error);
            // Fallback to defaults
            const fallback = localStorage.getItem("magica_admin_users_v1");
            setUsers(fallback ? JSON.parse(fallback) : DEFAULT_SYSTEM_USERS);
        } finally {
            setLoading(false);
        }
    };

    const persistUsers = (newUsersList: UserProfile[]) => {
        setUsers(newUsersList);
        localStorage.setItem("magica_admin_users_v1", JSON.stringify(newUsersList));
    };

    const handleOpenAddModal = () => {
        setEditingUser(null);
        setFormName("");
        setFormEmail("");
        setFormRole("parent");
        setFormStatus("approved");
        setFormPhone("+20 ");
        setFormMeta("");
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (user: UserProfile) => {
        setEditingUser(user);
        setFormName(user.name);
        setFormEmail(user.email);
        setFormRole(user.role);
        setFormStatus(user.status);
        setFormPhone(user.phone || "+20 ");
        setFormMeta(user.meta || "");
        setIsModalOpen(true);
    };

    const handleSaveModalUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formEmail.trim() || !formName.trim()) {
            alert(isArabic ? "يرجى ملء الاسم والبحريد الإلكتروني" : "Please enter both name and email.");
            return;
        }

        if (editingUser) {
            // Update existing user
            const updated = users.map(u => {
                if (u.id === editingUser.id) {
                    return {
                        ...u,
                        name: formName,
                        email: formEmail,
                        role: formRole,
                        status: formStatus,
                        phone: formPhone,
                        meta: formMeta
                    };
                }
                return u;
            });
            persistUsers(updated);
            if (!editingUser.isMock) {
                await updateUserRole(editingUser.id, formRole);
                await updateUserStatus(editingUser.id, formStatus);
            }
            showToast(isArabic ? "تم تحديث بيانات المستخدم بنجاح!" : "User profile updated successfully!");
        } else {
            // Create new user
            const newId = `user-${Date.now()}`;
            const newProfile: UserProfile = {
                id: newId,
                name: formName,
                email: formEmail,
                role: formRole,
                status: formStatus,
                phone: formPhone,
                meta: formMeta || (formRole === "admin" ? "System Administrator" : formRole === "teacher" ? "Academic Mentor" : formRole === "parent" ? "Registered Guardian" : "Student / Child Member"),
                createdAt: new Date().toISOString().split('T')[0],
                isMock: false
            };

            // Send to Firestore
            const firestoreId = await createAdminUserDoc({
                displayName: formName,
                email: formEmail,
                role: formRole,
                status: formStatus,
                phone: formPhone,
                meta: formMeta
            });

            if (firestoreId) newProfile.id = firestoreId;

            persistUsers([newProfile, ...users]);
            showToast(isArabic ? "تم إضافة المستخدم الجديد بنجاح فوريًا!" : "New user account registered successfully!");
        }

        setIsModalOpen(false);
    };

    const handleQuickRoleChange = async (userId: string, newRole: UserProfile["role"]) => {
        const updated = users.map(u => u.id === userId ? { ...u, role: newRole } : u);
        persistUsers(updated);
        const target = users.find(u => u.id === userId);
        if (target && !target.isMock) {
            await updateUserRole(userId, newRole);
        }
        showToast(isArabic ? `تم تغيير الصلاحيات إلى (${getRoleLabel(newRole)})` : `User role changed to ${newRole.toUpperCase()}`);
    };

    const handleQuickStatusChange = async (userId: string, newStatus: UserProfile["status"]) => {
        const updated = users.map(u => u.id === userId ? { ...u, status: newStatus } : u);
        persistUsers(updated);
        const target = users.find(u => u.id === userId);
        if (target && !target.isMock) {
            await updateUserStatus(userId, newStatus);
        }
        showToast(isArabic ? `تم تعديل حالة الحساب إلى: (${getStatusLabel(newStatus)})` : `User status updated to ${newStatus}`);
    };

    const handleDeleteUser = async (userId: string, userName: string) => {
        if (!confirm(isArabic ? `هل أنت متأكد من رغبتك في حذف حساب "${userName}" دائمًا؟` : `Are you sure you want to completely delete user "${userName}"?`)) {
            return;
        }

        const target = users.find(u => u.id === userId);
        const updated = users.filter(u => u.id !== userId);
        persistUsers(updated);

        if (target && !target.isMock) {
            await deleteUserDoc(userId);
        }
        showToast(isArabic ? "تم حذف الحساب بنجاح من النظام" : "User account permanently removed.");
    };

    // Filter and search logic
    const filteredUsers = useMemo(() => {
        return users.filter(u => {
            const matchesRole = activeRoleFilter === "all" || u.role === activeRoleFilter;
            const matchesStatus = statusFilter === "all" || u.status === statusFilter;
            const matchesSearch = !searchTerm.trim() || 
                u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (u.phone && u.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (u.meta && u.meta.toLowerCase().includes(searchTerm.toLowerCase()));
            
            return matchesRole && matchesStatus && matchesSearch;
        });
    }, [users, activeRoleFilter, statusFilter, searchTerm]);

    // Statistics
    const stats = useMemo(() => {
        return {
            total: users.length,
            admins: users.filter(u => u.role === "admin").length,
            teachers: users.filter(u => u.role === "teacher").length,
            parents: users.filter(u => u.role === "parent").length,
            children: users.filter(u => u.role === "child").length,
            pending: users.filter(u => u.status === "pending_approval").length,
        };
    }, [users]);

    function getRoleIcon(roleName: string) {
        switch (roleName) {
            case "admin": return <ShieldAlert className="w-4 h-4 text-purple-600" />;
            case "teacher": return <GraduationCap className="w-4 h-4 text-emerald-600" />;
            case "parent": return <Heart className="w-4 h-4 text-rose-600" />;
            case "child": return <Gamepad2 className="w-4 h-4 text-amber-600" />;
            default: return <User className="w-4 h-4 text-gray-500" />;
        }
    }

    function getRoleLabel(roleName: string) {
        if (!isArabic) return roleName.charAt(0).toUpperCase() + roleName.slice(1);
        switch (roleName) {
            case "admin": return "مدير النظام";
            case "teacher": return "معلم / مدرب";
            case "parent": return "ولي أمر";
            case "child": return "طالب / طفل";
            default: return "مستخدم";
        }
    }

    function getStatusLabel(statusName: string) {
        if (!isArabic) {
            if (statusName === "pending_approval") return "Pending";
            return statusName.charAt(0).toUpperCase() + statusName.slice(1);
        }
        switch (statusName) {
            case "approved": return "نشط / معتمد";
            case "pending_approval": return "معلق بانتظار القبول";
            case "suspended": return "حساب مجمد";
            default: return statusName;
        }
    }

    if (role !== "admin") {
        return (
            <div className="p-8 text-center bg-rose-50 rounded-2xl border border-rose-200 text-rose-700 max-w-lg mx-auto my-12">
                <Shield className="w-12 h-12 mx-auto mb-4 text-rose-500 animate-pulse" />
                <h2 className="text-2xl font-black mb-2">{isArabic ? "وصول محظور" : "Access Restricted"}</h2>
                <p className="text-sm font-medium">
                    {isArabic ? "هذه الصفحة مخصصة لمديري النظام فقط لإدارة الهوية والصلاحيات." : "This page is restricted strictly to System Administrators for identity and access governance."}
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-16" dir={isArabic ? "rtl" : "ltr"}>
            {/* Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed top-6 right-6 left-6 md:left-auto z-[100] max-w-md mx-auto md:mx-0 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-700 flex items-center gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <p className="font-bold text-sm flex-1">{toastMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header & Add User Action */}
            <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-800 text-white relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-rose-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-500/20 shrink-0">
                        <Users className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-black mb-2 uppercase tracking-wide">
                            <Shield className="w-3.5 h-3.5" />
                            {isArabic ? "مركز التحكم الأمني" : "Security & Access Governance"}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                            {isArabic ? "إدارة مستخدمي النظام" : "Users & Role Administration"}
                        </h1>
                        <p className="text-gray-300 text-sm mt-1 font-medium max-w-xl">
                            {isArabic 
                                ? "إدارة الحسابات، صلاحيات الدخول، قبول طلبات التسجيل، ومتابعة الهيئات التعليمية وأولياء الأمور حاليًا."
                                : "Manage accounts, adjust authorization roles, approve incoming parent enrollments, and monitor academic staff in real time."}
                        </p>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleOpenAddModal}
                    className="relative z-10 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black px-7 py-4 rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-3 hover:from-orange-600 hover:to-amber-600 transition-all text-sm sm:text-base shrink-0"
                >
                    <UserPlus className="w-5 h-5" />
                    <span>{isArabic ? "إضافة مستخدم جديدًا" : "Add New User Account"}</span>
                </motion.button>
            </div>

            {/* KPI Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { label: isArabic ? "إجمالي المستخدمين" : "Total Users", value: stats.total, color: "from-blue-500/10 to-indigo-500/10 text-blue-600 border-blue-200/60", icon: Users },
                    { label: isArabic ? "المديرين" : "Admins", value: stats.admins, color: "from-purple-500/10 to-pink-500/10 text-purple-600 border-purple-200/60", icon: ShieldAlert },
                    { label: isArabic ? "المعلمين والمدربين" : "Teachers", value: stats.teachers, color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-200/60", icon: GraduationCap },
                    { label: isArabic ? "أولياء الأمور" : "Parents", value: stats.parents, color: "from-rose-500/10 to-orange-500/10 text-rose-600 border-rose-200/60", icon: Heart },
                    { label: isArabic ? "الطلاب والأطفال" : "Children", value: stats.children, color: "from-amber-500/10 to-yellow-500/10 text-amber-600 border-amber-200/60", icon: Gamepad2 },
                    { label: isArabic ? "بانتظار القبول" : "Pending Approval", value: stats.pending, color: "from-red-500/10 to-rose-500/10 text-red-600 border-red-300 animate-pulse", icon: AlertCircle },
                ].map((stat, i) => {
                    const IconComponent = stat.icon;
                    return (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -3 }}
                            className={`bg-gradient-to-br ${stat.color} bg-white p-5 rounded-2xl border shadow-sm flex flex-col justify-between`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold uppercase text-gray-500 tracking-tight">{stat.label}</span>
                                <IconComponent className="w-5 h-5 opacity-80" />
                            </div>
                            <div className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Filters & Search Toolbar */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Role Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                    {[
                        { id: "all", label: isArabic ? "الكل" : "All Accounts", icon: Filter },
                        { id: "admin", label: isArabic ? "المديرين" : "Admins", icon: ShieldAlert },
                        { id: "teacher", label: isArabic ? "المعلمين" : "Teachers", icon: GraduationCap },
                        { id: "parent", label: isArabic ? "أولياء الأمور" : "Parents", icon: Heart },
                        { id: "child", label: isArabic ? "الأطفال" : "Children", icon: Gamepad2 },
                    ].map(tab => {
                        const TabIcon = tab.icon;
                        const isSelected = activeRoleFilter === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveRoleFilter(tab.id)}
                                className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 ${
                                    isSelected 
                                        ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20" 
                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                            >
                                <TabIcon className="w-4 h-4" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Search Bar & Status dropdown */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-72">
                        <Search className={`w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2 ${isArabic ? "right-3.5" : "left-3.5"}`} />
                        <input 
                            type="text"
                            placeholder={isArabic ? "ابحث بالاسم، البريد، الهاتف..." : "Search name, email, phone..."}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className={`w-full bg-gray-50 text-gray-800 text-xs sm:text-sm font-bold rounded-xl border border-gray-200 focus:border-orange-500 focus:bg-white focus:outline-none py-2.5 ${isArabic ? "pr-10 pl-3" : "pl-10 pr-3"} transition-all`}
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm("")}
                                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 ${isArabic ? "left-3" : "right-3"}`}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="bg-gray-50 text-gray-700 text-xs font-black rounded-xl border border-gray-200 py-2.5 px-3 focus:outline-none focus:border-orange-500"
                    >
                        <option value="all">{isArabic ? "جميع الحالات" : "All Status"}</option>
                        <option value="approved">{isArabic ? "نشط / معتمد" : "Approved"}</option>
                        <option value="pending_approval">{isArabic ? "معلق القبول" : "Pending"}</option>
                        <option value="suspended">{isArabic ? "مجمد" : "Suspended"}</option>
                    </select>
                </div>
            </div>

            {/* Users Table / Cards List */}
            {loading ? (
                <MagicaLoader fullScreen={false} lang={lang} text={isArabic ? "إدارة المستخدمين" : "USER MANAGEMENT"} subText={isArabic ? "جارٍ تحميل قائمة المستخدمين والصلاحيات..." : "Loading user accounts and roles..."} />
            ) : filteredUsers.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-200 p-16 text-center shadow-sm">
                    <UserX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-gray-800 mb-2">
                        {isArabic ? "لم يتم العثور على مستخدمين مطابقين" : "No Matching Users Found"}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium max-w-md mx-auto">
                        {isArabic 
                            ? "جرب تعديل كلمات البحث أو الفلاتر الخاصة بصلاحية الحسابات والعودة لاختيار (الكل)." 
                            : "Try modifying your filter options or clearing the search query to reveal existing accounts."}
                    </p>
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm("")} 
                            className="mt-6 font-black text-orange-600 underline text-sm"
                        >
                            {isArabic ? "إزالة فلاتر البحث" : "Clear Search Query"}
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-gray-200/80 shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-start border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-500 text-xs font-black uppercase tracking-wider">
                                    <th className={`py-4 px-6 ${isArabic ? "text-right" : "text-left"}`}>{isArabic ? "المستخدم والحساب" : "User & Account"}</th>
                                    <th className={`py-4 px-6 ${isArabic ? "text-right" : "text-left"}`}>{isArabic ? "الصلاحية الدور" : "Role / Access"}</th>
                                    <th className={`py-4 px-6 ${isArabic ? "text-right" : "text-left"}`}>{isArabic ? "حالة الحساب" : "Account Status"}</th>
                                    <th className={`py-4 px-6 ${isArabic ? "text-right" : "text-left"}`}>{isArabic ? "معلومات إضافية / هاتف" : "Contact & Meta"}</th>
                                    <th className="py-4 px-6 text-center">{isArabic ? "إجراءات التحكم" : "Actions"}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((u) => {
                                    const isPending = u.status === "pending_approval";
                                    const isSuspended = u.status === "suspended";
                                    return (
                                        <motion.tr 
                                            key={u.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`hover:bg-orange-50/40 transition-colors group ${
                                                isPending ? "bg-orange-50/20" : isSuspended ? "bg-red-50/20" : ""
                                            }`}
                                        >
                                            {/* User Bio */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3.5">
                                                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-lg text-white shadow-md shrink-0 ${
                                                        u.role === "admin" ? "bg-gradient-to-br from-purple-500 to-indigo-600" :
                                                        u.role === "teacher" ? "bg-gradient-to-br from-emerald-500 to-teal-600" :
                                                        u.role === "parent" ? "bg-gradient-to-br from-blue-500 to-sky-600" :
                                                        "bg-gradient-to-br from-amber-500 to-orange-500"
                                                    }`}>
                                                        {u.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-gray-900 text-base flex items-center gap-1.5">
                                                            <span>{u.name}</span>
                                                            {u.role === "admin" && <Shield className="w-3.5 h-3.5 text-purple-600 fill-purple-100" />}
                                                        </div>
                                                        <div className="text-gray-500 text-xs font-semibold flex items-center gap-1 mt-0.5">
                                                            <Mail className="w-3 h-3 text-gray-400" />
                                                            <span>{u.email}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role Switcher */}
                                            <td className="py-4 px-6">
                                                <div className="inline-flex items-center gap-1.5">
                                                    <div className="p-1.5 rounded-lg bg-gray-100">
                                                        {getRoleIcon(u.role)}
                                                    </div>
                                                    <select
                                                        value={u.role}
                                                        onChange={e => handleQuickRoleChange(u.id, e.target.value as any)}
                                                        className={`font-black text-xs px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                                                            u.role === "admin" ? "text-purple-700 font-extrabold bg-purple-50/50 border-purple-200" :
                                                            u.role === "teacher" ? "text-emerald-700 bg-emerald-50/50 border-emerald-200" :
                                                            u.role === "parent" ? "text-blue-700 bg-blue-50/50 border-blue-200" :
                                                            "text-amber-700 bg-amber-50/50 border-amber-200"
                                                        }`}
                                                    >
                                                        <option value="admin">{isArabic ? "مدير النظام" : "Admin"}</option>
                                                        <option value="teacher">{isArabic ? "معلم / مدرب" : "Teacher"}</option>
                                                        <option value="parent">{isArabic ? "ولي أمر" : "Parent"}</option>
                                                        <option value="child">{isArabic ? "طالب / طفل" : "Child"}</option>
                                                    </select>
                                                </div>
                                            </td>

                                            {/* Status Switcher */}
                                            <td className="py-4 px-6">
                                                <select
                                                    value={u.status}
                                                    onChange={e => handleQuickStatusChange(u.id, e.target.value as any)}
                                                    className={`font-black text-xs px-3 py-1.5 rounded-full border shadow-2xs cursor-pointer focus:outline-none transition-all ${
                                                        u.status === "approved" 
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-extrabold" 
                                                            : u.status === "pending_approval"
                                                            ? "bg-amber-50 text-amber-700 border-amber-300 animate-pulse font-extrabold"
                                                            : "bg-red-50 text-red-700 border-red-200"
                                                    }`}
                                                >
                                                    <option value="approved">{isArabic ? "✔ معتمد ونشط" : "✔ Approved"}</option>
                                                    <option value="pending_approval">{isArabic ? "⏳ معلق القبول" : "⏳ Pending"}</option>
                                                    <option value="suspended">{isArabic ? "✖ مجمد / محظور" : "✖ Suspended"}</option>
                                                </select>
                                            </td>

                                            {/* Contact & Meta */}
                                            <td className="py-4 px-6">
                                                <div className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                                                    <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                                    <span className="font-mono">{u.phone || "---"}</span>
                                                </div>
                                                {u.meta && (
                                                    <div className="text-[11px] font-bold text-gray-500 mt-1 bg-gray-100/80 px-2 py-0.5 rounded-md inline-block">
                                                        {u.meta}
                                                    </div>
                                                )}
                                            </td>

                                            {/* Action buttons */}
                                            <td className="py-4 px-6 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleOpenEditModal(u)}
                                                        title={isArabic ? "تعديل البيانات" : "Edit User Details"}
                                                        className="p-2 rounded-xl bg-gray-100 hover:bg-orange-50 text-gray-600 hover:text-orange-600 transition-colors"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleDeleteUser(u.id, u.name)}
                                                        title={isArabic ? "حذف الحساب" : "Delete Account"}
                                                        className="p-2 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add / Edit User Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl border border-gray-200 shadow-2xl w-full max-w-lg overflow-hidden"
                            dir={isArabic ? "rtl" : "ltr"}
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-gray-900 to-slate-800 text-white p-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold">
                                        <UserPlus className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-xl font-black">
                                        {editingUser 
                                            ? (isArabic ? `تعديل بيانات: ${editingUser.name}` : `Edit User: ${editingUser.name}`) 
                                            : (isArabic ? "إضافة مستخدم جديدًا" : "Register New User")}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSaveModalUser} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wide mb-1">
                                        {isArabic ? "الاسم الكامل *" : "Full Name *"}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formName}
                                        onChange={e => setFormName(e.target.value)}
                                        placeholder={isArabic ? "مثال: أحمد محمد طه" : "e.g. Ahmed Mohamed Taha"}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wide mb-1">
                                        {isArabic ? "البريد الإلكتروني *" : "Email Address *"}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formEmail}
                                        onChange={e => setFormEmail(e.target.value)}
                                        placeholder={isArabic ? "user@magica-group.com" : "user@magica-group.com"}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-mono"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-gray-700 uppercase tracking-wide mb-1">
                                            {isArabic ? "الصلاحية / الدور" : "Role / Authorization"}
                                        </label>
                                        <select
                                            value={formRole}
                                            onChange={e => setFormRole(e.target.value as any)}
                                            className="w-full px-3 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm cursor-pointer"
                                        >
                                            <option value="admin">{isArabic ? "مدير النظام" : "Admin"}</option>
                                            <option value="teacher">{isArabic ? "معلم / مدرب" : "Teacher"}</option>
                                            <option value="parent">{isArabic ? "ولي أمر" : "Parent"}</option>
                                            <option value="child">{isArabic ? "طالب / طفل" : "Child"}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-gray-700 uppercase tracking-wide mb-1">
                                            {isArabic ? "حالة الحساب" : "Initial Status"}
                                        </label>
                                        <select
                                            value={formStatus}
                                            onChange={e => setFormStatus(e.target.value as any)}
                                            className="w-full px-3 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm cursor-pointer"
                                        >
                                            <option value="approved">{isArabic ? "نشط / معتمد" : "Approved / Active"}</option>
                                            <option value="pending_approval">{isArabic ? "معلق بانتظار القبول" : "Pending Approval"}</option>
                                            <option value="suspended">{isArabic ? "مجمد / محظور" : "Suspended"}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-gray-700 uppercase tracking-wide mb-1">
                                            {isArabic ? "رقم الهاتف / للتواصل" : "Phone Number"}
                                        </label>
                                        <input
                                            type="text"
                                            value={formPhone}
                                            onChange={e => setFormPhone(e.target.value)}
                                            placeholder="+20 100 000 0000"
                                            className="w-full px-3 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-mono"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-gray-700 uppercase tracking-wide mb-1">
                                            {isArabic ? "ملاحظات / القسم" : "Department / Meta Note"}
                                        </label>
                                        <input
                                            type="text"
                                            value={formMeta}
                                            onChange={e => setFormMeta(e.target.value)}
                                            placeholder={isArabic ? "مثال: قسم العلوم والتفكير" : "e.g. STEM Mentor / 2 Kids"}
                                            className="w-full px-3 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                                    >
                                        {isArabic ? "إلغاء" : "Cancel"}
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 rounded-xl font-black text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/30 text-sm flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>{isArabic ? "حفظ التغييرات فوريًا" : "Save User Profile"}</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

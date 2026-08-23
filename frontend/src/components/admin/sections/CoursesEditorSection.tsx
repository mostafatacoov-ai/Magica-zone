"use client";

import { useState, useEffect } from "react";
import { useCMSData, CourseItem } from "@/lib/cms/contentStore";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { 
    Plus, Trash2, Edit3, Save, BookOpen, Clock, Users as UsersIcon, 
    X, Globe, EyeOff, CheckCircle2, RefreshCw, Sparkles, Tag, Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CoursesEditorSection({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const { data, updateSection, syncWithCloud, isSyncing } = useCMSData();
    const [courses, setCourses] = useState<CourseItem[]>(data.courses || []);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [savedNotice, setSavedNotice] = useState<string | null>(null);
    const [filterTab, setFilterTab] = useState<"all" | "published" | "drafts">("all");
    const [newSkillEn, setNewSkillEn] = useState("");
    const [newSkillAr, setNewSkillAr] = useState("");

    // Keep local state in sync whenever data.courses updates from cloud/local storage
    useEffect(() => {
        if (data.courses && Array.isArray(data.courses)) {
            setCourses(data.courses);
        }
    }, [data.courses]);

    const showNotice = (msg: string) => {
        setSavedNotice(msg);
        setTimeout(() => setSavedNotice(null), 3500);
    };

    const handleSaveAll = (updatedList: CourseItem[], customMessage?: string) => {
        setCourses(updatedList);
        updateSection("courses", updatedList);
        showNotice(customMessage || (isArabic ? "✅ تم حفظ التغييرات ومزامنتها سحابيًا مع الموقع!" : "✅ Saved and synchronized with cloud database!"));
    };

    const handleAddNew = () => {
        const newCourse: CourseItem = {
            id: `course-${Date.now()}`,
            titleEn: "New Innovation & Leadership Course",
            titleAr: "كورس الابتكار والقيادة الجديد",
            badgeEn: "New 🔥",
            badgeAr: "جديد 🔥",
            price: 120,
            datesEn: "Starts Soon (Weekend Cohort)",
            datesAr: "يبدأ قريبًا (أفواج نهاية الأسبوع)",
            ageEn: "8 - 14 Years",
            ageAr: "8 - 14 سنة",
            hours: 12,
            sessionsCount: 6,
            descEn: "Describe the interactive business, STEM & leadership simulations for this program...",
            descAr: "اكتب وصفًا جذابًا لتجارب القيادة ومحاكاة السوق والذكاء المالي في هذا البرنامج...",
            skillsEn: ["Financial Math", "Public Speaking", "Leadership"],
            skillsAr: ["الحسابات المالية", "التحدث أمام الجمهور", "القيادة والثقة"],
            color: "from-orange-500 to-amber-600",
            bgGradient: "bg-orange-500/10 border-orange-500/20 text-orange-600",
            imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600",
            published: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const updated = [newCourse, ...courses];
        handleSaveAll(updated, isArabic ? "🎉 تم إنشاء الكورس الجديد ونشره بنجاح!" : "🎉 New course added & published live!");
        setEditingIndex(0);
    };

    const handleDelete = (index: number) => {
        const course = courses[index];
        const title = isArabic ? course?.titleAr : course?.titleEn;
        if (!confirm(isArabic ? `هل أنت متأكد من حذف الكورس "${title}" نهائيًا؟` : `Are you sure you want to completely delete "${title}"?`)) return;
        const updated = courses.filter((_, i) => i !== index);
        if (editingIndex === index) setEditingIndex(null);
        handleSaveAll(updated, isArabic ? "🗑️ تم حذف الكورس بنجاح" : "🗑️ Course deleted successfully");
    };

    const handleTogglePublish = (courseId: string, publishState: boolean) => {
        const updated = courses.map(c => {
            if (c.id === courseId) {
                return { ...c, published: publishState, updatedAt: new Date().toISOString() };
            }
            return c;
        });
        const msg = publishState
            ? (isArabic ? "🚀 تم نشر الكورس ليظهر لجميع الزوار على الموقع!" : "🚀 Course published live on public pages!")
            : (isArabic ? "👁️‍🗨️ تم إخفاء الكورس من الموقع (تم حفظه كمسودة)." : "👁️‍🗨️ Course hidden from website (saved as draft).");
        handleSaveAll(updated, msg);
    };

    const handleUpdateField = (index: number, field: keyof CourseItem, val: any) => {
        const copy = [...courses];
        copy[index] = { ...copy[index], [field]: val, updatedAt: new Date().toISOString() };
        setCourses(copy);
        updateSection("courses", copy);
    };

    const handleAddSkill = (courseIndex: number) => {
        if (!newSkillEn && !newSkillAr) return;
        const currentCourse = courses[courseIndex];
        const skillsEn = [...(currentCourse.skillsEn || [])];
        const skillsAr = [...(currentCourse.skillsAr || [])];
        
        if (newSkillEn.trim()) skillsEn.push(newSkillEn.trim());
        if (newSkillAr.trim()) skillsAr.push(newSkillAr.trim());

        const copy = [...courses];
        copy[courseIndex] = {
            ...copy[courseIndex],
            skillsEn,
            skillsAr,
            updatedAt: new Date().toISOString()
        };
        setCourses(copy);
        updateSection("courses", copy);
        setNewSkillEn("");
        setNewSkillAr("");
    };

    const handleRemoveSkill = (courseIndex: number, skillIdx: number) => {
        const currentCourse = courses[courseIndex];
        const skillsEn = (currentCourse.skillsEn || []).filter((_, i) => i !== skillIdx);
        const skillsAr = (currentCourse.skillsAr || []).filter((_, i) => i !== skillIdx);
        const copy = [...courses];
        copy[courseIndex] = {
            ...copy[courseIndex],
            skillsEn,
            skillsAr,
            updatedAt: new Date().toISOString()
        };
        setCourses(copy);
        updateSection("courses", copy);
    };

    const publishedCount = courses.filter(c => c.published !== false).length;
    const draftsCount = courses.filter(c => c.published === false).length;

    const displayedCourses = courses.filter(c => {
        if (filterTab === "published") return c.published !== false;
        if (filterTab === "drafts") return c.published === false;
        return true;
    });

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Top Bar / Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-orange-50 text-orange-600 rounded-2xl">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                                {isArabic ? "إدارة ونشر كورسات ماجيكا (Magic Courses)" : "Magic Courses & Training Programs CMS"}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                {isArabic
                                    ? "أضف أو عدّل أي كورس، تحكم في نشره أو إخفائه فورًا، مع الحفظ التلقائي والمزامنة السحابية المباشرة."
                                    : "Add, edit, publish or hide any academy course with instant cloud persistence and live site sync."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    <button
                        onClick={() => {
                            syncWithCloud();
                            showNotice(isArabic ? "🔄 جاري المزامنة مع قاعدة البيانات السحابية..." : "🔄 Synchronizing with cloud database...");
                        }}
                        disabled={isSyncing}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-2xl flex items-center gap-2 transition-all"
                        title={isArabic ? "تحديث من السحابة" : "Refresh from cloud"}
                    >
                        <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin text-orange-500" : ""}`} />
                        <span>{isArabic ? "مزامنة السحابة" : "Cloud Sync"}</span>
                    </button>

                    <button
                        onClick={handleAddNew}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all shrink-0"
                    >
                        <Plus className="w-5 h-5" />
                        <span>{isArabic ? "إضافة كورس جديد" : "Add New Course"}</span>
                    </button>
                </div>
            </div>

            {/* Filter Tabs Bar */}
            <div className="flex items-center justify-between gap-4 bg-gray-100/70 p-1.5 rounded-2xl border border-gray-200/60 overflow-x-auto">
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => setFilterTab("all")}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                            filterTab === "all"
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        <Layers className="w-3.5 h-3.5" />
                        <span>{isArabic ? `جميع الكورسات (${courses.length})` : `All Courses (${courses.length})`}</span>
                    </button>

                    <button
                        onClick={() => setFilterTab("published")}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                            filterTab === "published"
                                ? "bg-emerald-600 text-white shadow-sm"
                                : "text-emerald-700 hover:bg-emerald-50"
                        }`}
                    >
                        <Globe className="w-3.5 h-3.5" />
                        <span>{isArabic ? `المنشورة أونلاين (${publishedCount})` : `Published Live (${publishedCount})`}</span>
                    </button>

                    <button
                        onClick={() => setFilterTab("drafts")}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                            filterTab === "drafts"
                                ? "bg-amber-600 text-white shadow-sm"
                                : "text-amber-700 hover:bg-amber-50"
                        }`}
                    >
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>{isArabic ? `المخفية / المسودات (${draftsCount})` : `Hidden / Drafts (${draftsCount})`}</span>
                    </button>
                </div>

                <div className="hidden md:flex items-center gap-2 text-[11px] font-bold text-gray-500 px-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{isArabic ? "الحفظ السحابي التلقائي مفعل" : "Auto-Save to Cloud Active"}</span>
                </div>
            </div>

            {/* Notification Toast */}
            {savedNotice && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-sm rounded-2xl shadow-xl flex items-center justify-between gap-3"
                >
                    <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-200" />
                        <span>{savedNotice}</span>
                    </div>
                    <button onClick={() => setSavedNotice(null)} className="p-1 hover:bg-white/20 rounded-lg">
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}

            {/* Empty State */}
            {displayedCourses.length === 0 && (
                <div className="p-12 text-center bg-white rounded-3xl border border-gray-100 shadow-sm space-y-3">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
                    <h3 className="text-lg font-black text-gray-700">
                        {isArabic ? "لا توجد كورسات مطابقة لهذا التصنيف" : "No courses found in this category"}
                    </h3>
                    <p className="text-xs text-gray-400">
                        {isArabic ? "اضغط على زر إضافة كورس جديد للبدء فورًا" : "Click 'Add New Course' above to create one"}
                    </p>
                </div>
            )}

            {/* Courses List */}
            <div className="grid gap-6">
                {displayedCourses.map((course) => {
                    const originalIdx = courses.findIndex(c => c.id === course.id);
                    const isEditing = editingIndex === originalIdx;
                    const isPublished = course.published !== false;

                    return (
                        <div 
                            key={course.id} 
                            className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                                isEditing 
                                    ? "border-2 border-orange-500 shadow-2xl ring-4 ring-orange-500/10" 
                                    : isPublished
                                        ? "border-gray-100 shadow-sm hover:border-orange-200 hover:shadow-md"
                                        : "border-dashed border-gray-300 bg-gray-50/50 opacity-90"
                            }`}
                        >
                            {/* Header Row */}
                            <div className="p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-gradient-to-r from-gray-50/80 via-white to-orange-50/20">
                                <div className="flex items-center gap-4 flex-1">
                                    {course.imageUrl ? (
                                        <img src={course.imageUrl} alt="Course banner" className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-white shrink-0" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-2xl shrink-0">🎓</div>
                                    )}
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-black text-lg text-gray-900">
                                                {isArabic ? course.titleAr : course.titleEn}
                                            </h3>

                                            {/* Publish Status Badge */}
                                            {isPublished ? (
                                                <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-black rounded-full border border-emerald-200 shadow-xs">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                    {isArabic ? "منشور للجمهور" : "Live Published"}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 bg-amber-50 text-amber-700 font-black rounded-full border border-amber-200">
                                                    <EyeOff className="w-3 h-3" />
                                                    {isArabic ? "مخفي (مسودة)" : "Hidden (Draft)"}
                                                </span>
                                            )}

                                            {(course.badgeEn || course.badgeAr) && (
                                                <span className="text-[10px] px-2.5 py-0.5 bg-orange-500 text-white font-extrabold rounded-full">
                                                    {isArabic ? course.badgeAr : course.badgeEn}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 flex-wrap">
                                            <span className="text-emerald-600 font-black">{course.price} EGP</span>
                                            <span className="flex items-center gap-1">
                                                <UsersIcon className="w-3.5 h-3.5 text-blue-500" />
                                                {isArabic ? course.ageAr : course.ageEn}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5 text-purple-500" />
                                                {course.hours} hrs ({course.sessionsCount} sessions)
                                            </span>
                                            {course.instructorNameEn && (
                                                <span className="text-gray-400">
                                                    👨‍🏫 {isArabic ? course.instructorNameAr || course.instructorNameEn : course.instructorNameEn}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 self-end lg:self-center flex-wrap">
                                    {/* Quick Publish / Hide Button */}
                                    <button
                                        onClick={() => handleTogglePublish(course.id, !isPublished)}
                                        className={`px-3.5 py-2 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
                                            isPublished
                                                ? "bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200"
                                                : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                                        }`}
                                        title={isPublished ? (isArabic ? "إخفاء من الموقع" : "Hide from website") : (isArabic ? "نشر على الموقع" : "Publish to website")}
                                    >
                                        {isPublished ? (
                                            <>
                                                <EyeOff className="w-3.5 h-3.5" />
                                                <span>{isArabic ? "إخفاء الكورس" : "Hide Course"}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Globe className="w-3.5 h-3.5" />
                                                <span>{isArabic ? "نشر الآن 🚀" : "Publish Now 🚀"}</span>
                                            </>
                                        )}
                                    </button>

                                    {/* Edit Toggle */}
                                    <button
                                        onClick={() => setEditingIndex(isEditing ? null : originalIdx)}
                                        className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all ${
                                            isEditing 
                                                ? "bg-gray-900 text-white shadow-md"
                                                : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                                        }`}
                                    >
                                        {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                                        <span>{isEditing ? (isArabic ? "إغلاق" : "Close") : (isArabic ? "تعديل التفاصيل" : "Edit Details")}</span>
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(originalIdx)}
                                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                                        title={isArabic ? "حذف الكورس" : "Delete Course"}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Expandable Detailed Editor */}
                            <AnimatePresence>
                                {isEditing && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }} 
                                        animate={{ height: "auto", opacity: 1 }} 
                                        exit={{ height: 0, opacity: 0 }} 
                                        className="p-6 md:p-8 border-t border-gray-100 space-y-6 bg-white"
                                    >
                                        {/* Publish Status Switch inside Editor */}
                                        <div className="p-4 bg-gradient-to-r from-orange-50/50 via-amber-50/30 to-emerald-50/40 rounded-2xl border border-orange-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div>
                                                <div className="font-black text-sm text-gray-900 flex items-center gap-2">
                                                    <Globe className="w-4 h-4 text-orange-500" />
                                                    <span>{isArabic ? "حالة ظهور الكورس على الموقع العام" : "Public Website Visibility Status"}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {isPublished
                                                        ? (isArabic ? "الكورس منشور ومعروض حاليًا على صفحة الكورسات والصفحة الرئيسية." : "Course is live and visible on public pages.")
                                                        : (isArabic ? "الكورس مخفي حاليًا ومحفوظ كمسودة حتى تقرر نشره." : "Course is hidden from public view and saved as draft.")}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleUpdateField(originalIdx, "published", true)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                                                        isPublished 
                                                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" 
                                                            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                                    }`}
                                                >
                                                    <Globe className="w-3.5 h-3.5" />
                                                    <span>{isArabic ? "منشور (Live)" : "Published (Live)"}</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleUpdateField(originalIdx, "published", false)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                                                        !isPublished 
                                                            ? "bg-amber-600 text-white shadow-md shadow-amber-600/20" 
                                                            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                                    }`}
                                                >
                                                    <EyeOff className="w-3.5 h-3.5" />
                                                    <span>{isArabic ? "مخفي (مسودة)" : "Hidden (Draft)"}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Basic Fields */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Course Title (EN)</label>
                                                <input
                                                    type="text"
                                                    value={course.titleEn}
                                                    onChange={e => handleUpdateField(originalIdx, "titleEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:border-orange-500 focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">العنوان (عربي)</label>
                                                <input
                                                    type="text"
                                                    value={course.titleAr}
                                                    onChange={e => handleUpdateField(originalIdx, "titleAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-right focus:border-orange-500 focus:bg-white outline-none transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Badge Tag (EN, e.g. Most Popular 🔥)</label>
                                                <input
                                                    type="text"
                                                    value={course.badgeEn || ""}
                                                    onChange={e => handleUpdateField(originalIdx, "badgeEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:border-orange-500 focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">الشعار الترويجي (عربي: الأكثر طلبًا 🔥)</label>
                                                <input
                                                    type="text"
                                                    value={course.badgeAr || ""}
                                                    onChange={e => handleUpdateField(originalIdx, "badgeAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right focus:border-orange-500 focus:bg-white outline-none transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Price in EGP (السعر بالجنية)</label>
                                                <input
                                                    type="number"
                                                    value={course.price}
                                                    onChange={e => handleUpdateField(originalIdx, "price", Number(e.target.value))}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-emerald-600 focus:border-orange-500 focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Hours / الساعات</label>
                                                    <input
                                                        type="number"
                                                        value={course.hours}
                                                        onChange={e => handleUpdateField(originalIdx, "hours", Number(e.target.value))}
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:border-orange-500 focus:bg-white outline-none transition-all"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Sessions / الجلسات</label>
                                                    <input
                                                        type="number"
                                                        value={course.sessionsCount}
                                                        onChange={e => handleUpdateField(originalIdx, "sessionsCount", Number(e.target.value))}
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:border-orange-500 focus:bg-white outline-none transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Age Range (EN, e.g. 8 - 14 Years)</label>
                                                <input
                                                    type="text"
                                                    value={course.ageEn}
                                                    onChange={e => handleUpdateField(originalIdx, "ageEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:border-orange-500 focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">الأعمار (عربي: 8 - 14 سنة)</label>
                                                <input
                                                    type="text"
                                                    value={course.ageAr}
                                                    onChange={e => handleUpdateField(originalIdx, "ageAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right focus:border-orange-500 focus:bg-white outline-none transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Start Date & Schedule (EN)</label>
                                                <input
                                                    type="text"
                                                    value={course.datesEn}
                                                    onChange={e => handleUpdateField(originalIdx, "datesEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:border-orange-500 focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">تاريخ ومواعيد البدء (عربي)</label>
                                                <input
                                                    type="text"
                                                    value={course.datesAr}
                                                    onChange={e => handleUpdateField(originalIdx, "datesAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right focus:border-orange-500 focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Course Description (EN)</label>
                                                <textarea
                                                    rows={3}
                                                    value={course.descEn}
                                                    onChange={e => handleUpdateField(originalIdx, "descEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs resize-none focus:border-orange-500 focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">الوصف التفصيلي (عربي)</label>
                                                <textarea
                                                    rows={3}
                                                    value={course.descAr}
                                                    onChange={e => handleUpdateField(originalIdx, "descAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right resize-none focus:border-orange-500 focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Skills Section */}
                                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/70 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-black text-gray-700 flex items-center gap-1.5">
                                                    <Tag className="w-3.5 h-3.5 text-orange-500" />
                                                    <span>{isArabic ? "المهارات المكتسبة في الكورس (Skills)" : "Target Skills & Outcomes"}</span>
                                                </label>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {(course.skillsEn || []).map((skill, sIdx) => (
                                                    <span 
                                                        key={sIdx} 
                                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 text-gray-800 text-xs font-bold rounded-xl shadow-xs"
                                                    >
                                                        <span>✦ {skill} {course.skillsAr?.[sIdx] ? `(${course.skillsAr[sIdx]})` : ""}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSkill(originalIdx, sIdx)}
                                                            className="text-gray-400 hover:text-red-500 ml-1"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-2 pt-2">
                                                <input
                                                    type="text"
                                                    placeholder={isArabic ? "إضافة مهارة بالإنجليزية (e.g. AI Prompting)" : "Add Skill in English"}
                                                    value={newSkillEn}
                                                    onChange={e => setNewSkillEn(e.target.value)}
                                                    className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none"
                                                />
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder={isArabic ? "المهارة بالعربي (مثال: أوامر الذكاء الاصطناعي)" : "Skill in Arabic"}
                                                        value={newSkillAr}
                                                        onChange={e => setNewSkillAr(e.target.value)}
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-right outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddSkill(originalIdx)}
                                                        className="px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-bold shrink-0 hover:bg-orange-600"
                                                    >
                                                        + {isArabic ? "إضافة" : "Add"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Instructor Info */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Instructor Name (EN)</label>
                                                <input
                                                    type="text"
                                                    value={course.instructorNameEn || ""}
                                                    onChange={e => handleUpdateField(originalIdx, "instructorNameEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                                                    placeholder="e.g. Ahmed Magdy"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">اسم المدرب (عربي)</label>
                                                <input
                                                    type="text"
                                                    value={course.instructorNameAr || ""}
                                                    onChange={e => handleUpdateField(originalIdx, "instructorNameAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right"
                                                    placeholder="مثال: أحمد مجدي"
                                                />
                                            </div>
                                        </div>

                                        {/* Photo Uploaders */}
                                        <PhotoUploader
                                            labelEn={`Instructor Photo: ${course.instructorNameEn || 'Instructor'}`}
                                            labelAr={`صورة المدرب: ${course.instructorNameAr || 'المدرب'}`}
                                            isArabic={isArabic}
                                            value={course.instructorImageUrl || ""}
                                            onChange={(val: string) => handleUpdateField(originalIdx, "instructorImageUrl", val)}
                                            helperTextEn="Upload a professional headshot for the instructor."
                                            helperTextAr="قم برفع صورة احترافية وشخصية للمدرب."
                                        />

                                        <PhotoUploader
                                            labelEn={`Course Photo / Banner: ${course.titleEn}`}
                                            labelAr={`صورة الغلاف والعرض للكورس: ${course.titleAr}`}
                                            isArabic={isArabic}
                                            value={course.imageUrl || ""}
                                            onChange={(val: string) => handleUpdateField(originalIdx, "imageUrl", val)}
                                            helperTextEn="Upload a dedicated inspiring classroom or training picture for this course card."
                                            helperTextAr="قم برفع صورة خاصة تعبر عن نشاط ومحاكاة هذا الكورس بالتحديد على صفحة الكورسات."
                                        />

                                        {/* Bottom Action Footer */}
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                                            <div className="text-xs text-gray-400 font-bold">
                                                {isArabic ? "يتم حفظ التغييرات ومزامنتها سحابيًا بصورة فورية." : "Changes are automatically saved and synced to cloud."}
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        handleTogglePublish(course.id, !isPublished);
                                                    }}
                                                    className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all ${
                                                        isPublished
                                                            ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                                            : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                                    }`}
                                                >
                                                    {isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
                                                    <span>{isPublished ? (isArabic ? "إخفاء الكورس" : "Hide Course") : (isArabic ? "نشر الكورس" : "Publish Course")}</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setEditingIndex(null);
                                                        showNotice(isArabic ? "✅ تم حفظ التعديلات وإغلاق المحرر بنجاح!" : "✅ Course details saved successfully!");
                                                    }}
                                                    className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                                                >
                                                    <Save className="w-4 h-4" />
                                                    <span>{isArabic ? "حفظ وإغلاق التعديل" : "Done & Close"}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

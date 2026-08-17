"use client";

import { useState } from "react";
import { useCMSData, CourseItem } from "@/lib/cms/contentStore";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { Plus, Trash2, Edit3, Save, BookOpen, Clock, Users as UsersIcon, DollarSign, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CoursesEditorSection({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const { data, updateSection } = useCMSData();
    const [courses, setCourses] = useState<CourseItem[]>([...data.courses]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [savedNotice, setSavedNotice] = useState(false);

    const handleSaveAll = (updatedList: CourseItem[]) => {
        setCourses(updatedList);
        updateSection("courses", updatedList);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    const handleAddNew = () => {
        const newCourse: CourseItem = {
            id: `course-${Date.now()}`,
            titleEn: "New Innovation & CEO Course",
            titleAr: "كورس الابتكار والقيادة الجديد",
            badgeEn: "New 🔥",
            badgeAr: "جديد 🔥",
            price: 120,
            datesEn: "Starts Soon (Weekend Cohort)",
            datesAr: "يبدأ قريبا (جولات نهاية الأسبوع)",
            ageEn: "8 - 14 Years",
            ageAr: "8 - 14 سنة",
            hours: 12,
            sessionsCount: 6,
            descEn: "Describe the interactive business & entrepreneurship simulations in this course...",
            descAr: "اكتب وصفًا جذابًا لتجارب القيادة ومحاكاة السوق والذكاء المالي في هذا البرنامج...",
            skillsEn: ["Financial Math", "Public Speaking", "Leadership"],
            skillsAr: ["الحسابات المالية", "التحدث أمام الجمهور", "القيادة والثقة"],
            color: "from-orange-500 to-amber-600",
            bgGradient: "bg-orange-500/10 border-orange-500/20 text-orange-600",
            imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600"
        };
        const updated = [newCourse, ...courses];
        handleSaveAll(updated);
        setEditingIndex(0);
    };

    const handleDelete = (index: number) => {
        if (!confirm(isArabic ? "هل أنت متأكد من حذف هذا الكورس بالكامل؟" : "Are you sure you want to completely delete this course?")) return;
        const updated = courses.filter((_, i) => i !== index);
        if (editingIndex === index) setEditingIndex(null);
        handleSaveAll(updated);
    };

    const handleUpdateField = (index: number, field: keyof CourseItem, val: any) => {
        const copy = [...courses];
        copy[index] = { ...copy[index], [field]: val };
        setCourses(copy);
        updateSection("courses", copy);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
                        <BookOpen className="w-7 h-7 text-orange-500" />
                        <span>{isArabic ? "إدارة كورسات ماجيكا (Magic Courses)" : "Magic Courses & Training Programs CMS"}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {isArabic
                            ? "أضف، عدّل، أو احذف أي كورس في أكاديمية ماجيكا، مع تحديد السعر، الأعمار المناسبة، ورفع الصور الخاصة بالدورة فورًا."
                            : "Manage bootcamp pricing, schedules, learning outcomes, age brackets, and high-resolution course banners."}
                    </p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    <span>{isArabic ? "إضافة كورس جديد" : "Add New Course"}</span>
                </button>
            </div>

            {savedNotice && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-lg text-center">
                    {isArabic ? "✅ تم حفظ تغييرات الكورس ونشرها مباشرة على الموقع!" : "✅ Course edits and photos saved live on public pages!"}
                </motion.div>
            )}

            {/* Courses List */}
            <div className="grid gap-6">
                {courses.map((course, idx) => {
                    const isEditing = editingIndex === idx;
                    return (
                        <div key={course.id} className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                            isEditing ? "border-2 border-orange-500 shadow-xl" : "border-gray-100 shadow-sm hover:border-gray-200"
                        }`}>
                            {/* Header Row */}
                            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-gray-50 to-orange-50/10">
                                <div className="flex items-center gap-4">
                                    {course.imageUrl ? (
                                        <img src={course.imageUrl} alt="Course banner" className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-white shrink-0" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xl shrink-0">🎓</div>
                                    )}
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-black text-lg text-gray-900">{isArabic ? course.titleAr : course.titleEn}</h3>
                                            {(course.badgeEn || course.badgeAr) && (
                                                <span className="text-[10px] px-2.5 py-0.5 bg-orange-500 text-white font-extrabold rounded-full">
                                                    {isArabic ? course.badgeAr : course.badgeEn}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mt-1 flex-wrap">
                                            <span className="flex items-center gap-1 text-emerald-600 font-black">{course.price} EGP</span>
                                            <span className="flex items-center gap-1"><UsersIcon className="w-3.5 h-3.5 text-blue-500" />{isArabic ? course.ageAr : course.ageEn}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-500" />{course.hours} hrs ({course.sessionsCount} sessions)</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2 self-end md:self-center">
                                    <button
                                        onClick={() => setEditingIndex(isEditing ? null : idx)}
                                        className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all ${
                                            isEditing 
                                                ? "bg-gray-900 text-white shadow-md"
                                                : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                                        }`}
                                    >
                                        {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                                        <span>{isEditing ? (isArabic ? "إغلاق التعديل" : "Close Editor") : (isArabic ? "تعديل التفاصيل والصور" : "Edit & Add Photo")}</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(idx)}
                                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                                        title={isArabic ? "حذف الكورس" : "Delete Course"}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Expandable Editor Box */}
                            <AnimatePresence>
                                {isEditing && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="p-8 border-t border-gray-100 space-y-6 bg-white">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Course Title (EN)</label>
                                                <input
                                                    type="text"
                                                    value={course.titleEn}
                                                    onChange={e => handleUpdateField(idx, "titleEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">العنوان (عربي)</label>
                                                <input
                                                    type="text"
                                                    value={course.titleAr}
                                                    onChange={e => handleUpdateField(idx, "titleAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-right"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Badge Tag (EN, e.g. Most Popular)</label>
                                                <input
                                                    type="text"
                                                    value={course.badgeEn || ""}
                                                    onChange={e => handleUpdateField(idx, "badgeEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">الشعار المميز (عربي: الأكثر طلبًا 🔥)</label>
                                                <input
                                                    type="text"
                                                    value={course.badgeAr || ""}
                                                    onChange={e => handleUpdateField(idx, "badgeAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Price in EGP (ج.م)</label>
                                                <input
                                                    type="number"
                                                    value={course.price}
                                                    onChange={e => handleUpdateField(idx, "price", Number(e.target.value))}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-emerald-600"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Hours / الساعات</label>
                                                    <input
                                                        type="number"
                                                        value={course.hours}
                                                        onChange={e => handleUpdateField(idx, "hours", Number(e.target.value))}
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Sessions / الجلسات</label>
                                                    <input
                                                        type="number"
                                                        value={course.sessionsCount}
                                                        onChange={e => handleUpdateField(idx, "sessionsCount", Number(e.target.value))}
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Age Range (EN, e.g. 8 - 14 Years)</label>
                                                <input
                                                    type="text"
                                                    value={course.ageEn}
                                                    onChange={e => handleUpdateField(idx, "ageEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">الأعمار (عربي: 8 - 14 سنة)</label>
                                                <input
                                                    type="text"
                                                    value={course.ageAr}
                                                    onChange={e => handleUpdateField(idx, "ageAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Start Date & Schedule (EN)</label>
                                                <input
                                                    type="text"
                                                    value={course.datesEn}
                                                    onChange={e => handleUpdateField(idx, "datesEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">تاريخ ومواعيد البدء (عربي)</label>
                                                <input
                                                    type="text"
                                                    value={course.datesAr}
                                                    onChange={e => handleUpdateField(idx, "datesAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Description (EN)</label>
                                                <textarea
                                                    rows={3}
                                                    value={course.descEn}
                                                    onChange={e => handleUpdateField(idx, "descEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs resize-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">الوصف التفصيلي (عربي)</label>
                                                <textarea
                                                    rows={3}
                                                    value={course.descAr}
                                                    onChange={e => handleUpdateField(idx, "descAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right resize-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Instructor Name (EN)</label>
                                                <input
                                                    type="text"
                                                    value={course.instructorNameEn || ""}
                                                    onChange={e => handleUpdateField(idx, "instructorNameEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                                                    placeholder="e.g. Ahmed Magdy"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">اسم المدرب (عربي)</label>
                                                <input
                                                    type="text"
                                                    value={course.instructorNameAr || ""}
                                                    onChange={e => handleUpdateField(idx, "instructorNameAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right"
                                                    placeholder="مثال: أحمد مجدي"
                                                />
                                            </div>
                                        </div>

                                        <PhotoUploader
                                            labelEn={`Instructor Photo: ${course.instructorNameEn || 'New Instructor'}`}
                                            labelAr={`صورة المدرب: ${course.instructorNameAr || 'مدرب جديد'}`}
                                            isArabic={isArabic}
                                            value={course.instructorImageUrl || ""}
                                            onChange={(val: string) => handleUpdateField(idx, "instructorImageUrl", val)}
                                            helperTextEn="Upload a professional headshot for the instructor."
                                            helperTextAr="قم برفع صورة احترافية وشخصية للمدرب."
                                        />

                                        {/* Photo Uploader for this specific Course */}
                                        <PhotoUploader
                                            labelEn={`Course Photo / Banner: ${course.titleEn}`}
                                            labelAr={`صورة الغلاف والعرض للكورس: ${course.titleAr}`}
                                            isArabic={isArabic}
                                            value={course.imageUrl || ""}
                                            onChange={(val: string) => handleUpdateField(idx, "imageUrl", val)}
                                            helperTextEn="Upload a dedicated inspiring classroom or training picture for this course card."
                                            helperTextAr="قم برفع صورة خاصة تعبر عن نشاط ومحاكاة هذا الكورس بالتحديد على صفحة الكورسات."
                                        />

                                        <div className="flex justify-end pt-2">
                                            <button
                                                onClick={() => {
                                                    setEditingIndex(null);
                                                    setSavedNotice(true);
                                                    setTimeout(() => setSavedNotice(false), 3000);
                                                }}
                                                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                                            >
                                                <Save className="w-4 h-4" />
                                                <span>{isArabic ? "حفظ وإغلاق التعديلات" : "Save Course Details"}</span>
                                            </button>
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

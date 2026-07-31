"use client";

import { useState } from "react";
import { useCMSData, CampProgram } from "@/lib/cms/contentStore";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { Plus, Trash2, Edit3, Save, Tent, MapPin, DollarSign, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CampEditorSection({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const { data, updateSection } = useCMSData();
    const [camps, setCamps] = useState<CampProgram[]>([...data.camps]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [savedNotice, setSavedNotice] = useState(false);

    const handleSaveAll = (updatedList: CampProgram[]) => {
        setCamps(updatedList);
        updateSection("camps", updatedList);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    const handleAddNew = () => {
        const newCamp: CampProgram = {
            id: `camp-${Date.now()}`,
            titleEn: "New Winter / Spring Royal Camp",
            titleAr: "معسكر ماجيكا الملكي الجديد للمغامرات",
            price: 280,
            datesEn: "December 15 - January 5",
            datesAr: "15 ديسمبر - 5 يناير",
            locationEn: "Magica Adventure Nature Resort",
            locationAr: "منتجع وميدان ماجيكا للطبيعة والابتكار",
            ageEn: "7 - 16 Years",
            ageAr: "7 - 16 سنة",
            descEn: "Describe the exciting outdoor entrepreneurship and survival activities included...",
            descAr: "صف هنا الأنشطة الرياضية وتحديات بناء الفرق ومسابقات البازار الميداني داخل المعسكر...",
            highlightsEn: ["Includes All Organic Meals", "Explorer Uniform", "Bazar Booth Day"],
            highlightsAr: ["يشمل الوجبات الصحية العضوية", "يشمل طقم المكتشف الرسمي", "جناح في يوم البازار"],
            imageUrl: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&q=80&w=800",
            galleryPhotos: [
                "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=600"
            ]
        };
        const updated = [newCamp, ...camps];
        handleSaveAll(updated);
        setEditingIndex(0);
    };

    const handleDelete = (index: number) => {
        if (!confirm(isArabic ? "هل أنت متأكد من حذف هذا المعسكر؟" : "Delete this camp program?")) return;
        const updated = camps.filter((_, i) => i !== index);
        if (editingIndex === index) setEditingIndex(null);
        handleSaveAll(updated);
    };

    const handleUpdateField = (index: number, field: keyof CampProgram, val: any) => {
        const copy = [...camps];
        copy[index] = { ...copy[index], [field]: val };
        setCamps(copy);
        updateSection("camps", copy);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
                        <Tent className="w-7 h-7 text-orange-500" />
                        <span>{isArabic ? "إدارة معسكرات ماجيكا الصيفية والموسمية (Magic Camp)" : "Magic Camp & Adventure Programs CMS"}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {isArabic
                            ? "تحكم الكامل بتذاكر المعسكر، الأسعار، الموقع الجغرافي، مع رفع صورة البنر الرئيسي وأستوديو الصور الخاص بالأنشطة الميدانية."
                            : "Manage seasonal camping schedules, location information, pricing, main cover photo, and activity photo galleries."}
                    </p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    <span>{isArabic ? "إضافة معسكر جديد" : "Add New Camp"}</span>
                </button>
            </div>

            {savedNotice && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-lg text-center">
                    {isArabic ? "✅ تم حفظ تفاصيل المعسكر وصور الألبوم الميداني بنجاح!" : "✅ Camp program edits and photo galleries successfully published!"}
                </motion.div>
            )}

            <div className="grid gap-6">
                {camps.map((camp, idx) => {
                    const isEditing = editingIndex === idx;
                    return (
                        <div key={camp.id} className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                            isEditing ? "border-2 border-orange-500 shadow-xl" : "border-gray-100 shadow-sm hover:border-gray-200"
                        }`}>
                            {/* Card Header */}
                            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-gray-50 to-orange-50/10">
                                <div className="flex items-center gap-4">
                                    {camp.imageUrl ? (
                                        <img src={camp.imageUrl} alt="Camp cover" className="w-20 h-16 rounded-2xl object-cover shadow-sm border border-white shrink-0" />
                                    ) : (
                                        <div className="w-20 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-2xl shrink-0">⛺</div>
                                    )}
                                    <div>
                                        <h3 className="font-black text-lg text-gray-900">{isArabic ? camp.titleAr : camp.titleEn}</h3>
                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mt-1 flex-wrap">
                                            <span className="flex items-center gap-1 text-emerald-600 font-black"><DollarSign className="w-3.5 h-3.5" />${camp.price}</span>
                                            <span className="flex items-center gap-1 text-blue-600"><MapPin className="w-3.5 h-3.5" />{isArabic ? camp.locationAr : camp.locationEn}</span>
                                            <span className="text-gray-400 font-medium">({camp.galleryPhotos?.length || 0} gallery photos)</span>
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
                                        <span>{isEditing ? (isArabic ? "إغلاق التعديل" : "Close Editor") : (isArabic ? "تعديل وألبوم الصور" : "Edit & Photos")}</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(idx)}
                                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Expandable Form */}
                            <AnimatePresence>
                                {isEditing && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="p-8 border-t border-gray-100 space-y-6 bg-white">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Camp Name (EN)</label>
                                                <input
                                                    type="text"
                                                    value={camp.titleEn}
                                                    onChange={e => handleUpdateField(idx, "titleEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">اسم المعسكر (عربي)</label>
                                                <input
                                                    type="text"
                                                    value={camp.titleAr}
                                                    onChange={e => handleUpdateField(idx, "titleAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-right"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Location / Campsite (EN)</label>
                                                <input
                                                    type="text"
                                                    value={camp.locationEn}
                                                    onChange={e => handleUpdateField(idx, "locationEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">المكان / وادي المعسكر (عربي)</label>
                                                <input
                                                    type="text"
                                                    value={camp.locationAr}
                                                    onChange={e => handleUpdateField(idx, "locationAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-right"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Price ($)</label>
                                                    <input
                                                        type="number"
                                                        value={camp.price}
                                                        onChange={e => handleUpdateField(idx, "price", Number(e.target.value))}
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-emerald-600"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Ages (e.g. 6-15)</label>
                                                    <input
                                                        type="text"
                                                        value={camp.ageEn}
                                                        onChange={e => handleUpdateField(idx, "ageEn", e.target.value)}
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Dates / Duration (EN)</label>
                                                <input
                                                    type="text"
                                                    value={camp.datesEn}
                                                    onChange={e => handleUpdateField(idx, "datesEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Camp Description (EN)</label>
                                                <textarea
                                                    rows={3}
                                                    value={camp.descEn}
                                                    onChange={e => handleUpdateField(idx, "descEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs resize-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">وصف أنشطة المعسكر (عربي)</label>
                                                <textarea
                                                    rows={3}
                                                    value={camp.descAr}
                                                    onChange={e => handleUpdateField(idx, "descAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right resize-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-6 pt-2">
                                            <PhotoUploader
                                                labelEn="Camp Main Cover Banner Photo"
                                                labelAr="صورة الغلاف والعرض الرئيسية للمعسكر"
                                                isArabic={isArabic}
                                                value={camp.imageUrl || ""}
                                                onChange={(val: string) => handleUpdateField(idx, "imageUrl", val)}
                                                helperTextEn="Upload a vibrant hero photo representing this seasonal camping program."
                                                helperTextAr="ارفع صورة مميزة تعبر عن روح المغامرة والتعاون في هذا المعسكر الميداني."
                                            />

                                            <PhotoUploader
                                                labelEn="Camp Activity Photo Gallery (Multi-Photo Supported)"
                                                labelAr="ألبوم صور الأنشطة والتحديات داخل المعسكر (يدعم صور متتابعة)"
                                                isArabic={isArabic}
                                                isGallery={true}
                                                values={camp.galleryPhotos || []}
                                                onChange={(vals: string[]) => handleUpdateField(idx, "galleryPhotos", vals)}
                                                helperTextEn="Add multiple photos showing tents, student robotics under trees, and team sports."
                                                helperTextAr="ارفع صوراً متعددة للأطفال أثناء التخييم، بناء المشاريع في الهوى الطلق، وتكريم الفائزين."
                                            />
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

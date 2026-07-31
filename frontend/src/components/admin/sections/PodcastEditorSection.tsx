"use client";

import { useState } from "react";
import { useCMSData, PodcastEpisode } from "@/lib/cms/contentStore";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { Plus, Trash2, Edit3, Save, Mic, Clock, Tag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PodcastEditorSection({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const { data, updateSection } = useCMSData();
    const [podcasts, setPodcasts] = useState<PodcastEpisode[]>([...data.podcasts]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [savedNotice, setSavedNotice] = useState(false);

    const handleSaveAll = (updatedList: PodcastEpisode[]) => {
        setPodcasts(updatedList);
        updateSection("podcasts", updatedList);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    const handleAddNew = () => {
        const newEp: PodcastEpisode = {
            id: `pod-${Date.now()}`,
            titleEn: "New Episode: Financial Wisdom & Kid CEO Secrets",
            titleAr: "حلقة جديدة: حكمة المال وأسرار الرائد الصغير",
            duration: "30 min",
            tagEn: "Entrepreneurship",
            tagAr: "ريادة أعمال",
            tagColor: "bg-purple-100 text-purple-600",
            descEn: "Discussing negotiation strategies with alumni champions...",
            descAr: "نقاش ممتع ومفتوح حول طرق التفاوض الناجح وإدارة الوقت للأطفال المبدعين...",
            imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=600",
            audioUrl: ""
        };
        const updated = [newEp, ...podcasts];
        handleSaveAll(updated);
        setEditingIndex(0);
    };

    const handleDelete = (index: number) => {
        if (!confirm(isArabic ? "هل أنت متأكد من حذف هذه الحلقة من البودكاست؟" : "Delete this podcast episode?")) return;
        const updated = podcasts.filter((_, i) => i !== index);
        if (editingIndex === index) setEditingIndex(null);
        handleSaveAll(updated);
    };

    const handleUpdateField = (index: number, field: keyof PodcastEpisode, val: any) => {
        const copy = [...podcasts];
        copy[index] = { ...copy[index], [field]: val };
        setPodcasts(copy);
        updateSection("podcasts", copy);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
                        <Mic className="w-7 h-7 text-orange-500" />
                        <span>{isArabic ? "إدارة حلقات وبرامج ماجيكا بودكاست (Magic Podcast CMS)" : "Magic Podcast Episodes & Audio Media CMS"}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {isArabic ? "أضف أحدث المقابلات مع الأطفال والأهالي، عدل أوقات العرض، وارفع الصور الترويجية وأغلفة الحلقات." : "Manage broadcasting catalog, episode lengths, categories, and studio episode cover photography."}
                    </p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    <span>{isArabic ? "إضافة حلقة جديدة" : "Add Podcast Episode"}</span>
                </button>
            </div>

            {savedNotice && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-lg text-center">
                    {isArabic ? "✅ تم حفظ التعديلات وصورة البودكاست بنجاح!" : "✅ Podcast episode edits and cover photos successfully published!"}
                </motion.div>
            )}

            <div className="grid gap-6">
                {podcasts.map((ep, idx) => {
                    const isEditing = editingIndex === idx;
                    return (
                        <div key={ep.id} className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                            isEditing ? "border-2 border-orange-500 shadow-xl" : "border-gray-100 shadow-sm hover:border-gray-200"
                        }`}>
                            {/* Card Header */}
                            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-gray-50 to-purple-50/10">
                                <div className="flex items-center gap-4">
                                    {ep.imageUrl ? (
                                        <img src={ep.imageUrl} alt="Episode cover" className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-white shrink-0" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-black text-xl shrink-0">🎙️</div>
                                    )}
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-black text-lg text-gray-900">{isArabic ? ep.titleAr : ep.titleEn}</h3>
                                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black ${ep.tagColor || "bg-purple-100 text-purple-600"}`}>
                                                {isArabic ? ep.tagAr : ep.tagEn}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mt-1">
                                            <span className="flex items-center gap-1 text-gray-500"><Clock className="w-3.5 h-3.5 text-purple-500" />{ep.duration}</span>
                                            {ep.audioUrl && <span className="text-emerald-600 text-[11px] font-black">🔊 {isArabic ? "مرفق ملف صوتي" : "Audio Linked"}</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-center">
                                    <button
                                        onClick={() => setEditingIndex(isEditing ? null : idx)}
                                        className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all ${
                                            isEditing 
                                                ? "bg-gray-900 text-white shadow-md"
                                                : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                                        }`}
                                    >
                                        {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                                        <span>{isEditing ? (isArabic ? "إغلاق التعديل" : "Close Editor") : (isArabic ? "تعديل الحلقة والصور" : "Edit Episode & Photo")}</span>
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
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Episode Title (EN)</label>
                                                <input
                                                    type="text"
                                                    value={ep.titleEn}
                                                    onChange={e => handleUpdateField(idx, "titleEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">عنوان الحلقة (عربي)</label>
                                                <input
                                                    type="text"
                                                    value={ep.titleAr}
                                                    onChange={e => handleUpdateField(idx, "titleAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-right"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Duration (e.g. 25 min)</label>
                                                <input
                                                    type="text"
                                                    value={ep.duration}
                                                    onChange={e => handleUpdateField(idx, "duration", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Category Tag (EN)</label>
                                                    <input
                                                        type="text"
                                                        value={ep.tagEn}
                                                        onChange={e => handleUpdateField(idx, "tagEn", e.target.value)}
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">تصنيف الحلقة (عربي)</label>
                                                    <input
                                                        type="text"
                                                        value={ep.tagAr}
                                                        onChange={e => handleUpdateField(idx, "tagAr", e.target.value)}
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-right"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Episode Overview / Summary (EN)</label>
                                                <textarea
                                                    rows={3}
                                                    value={ep.descEn || ""}
                                                    onChange={e => handleUpdateField(idx, "descEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs resize-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">ملخص وأهداف الحلقة (عربي)</label>
                                                <textarea
                                                    rows={3}
                                                    value={ep.descAr || ""}
                                                    onChange={e => handleUpdateField(idx, "descAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right resize-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Photo Uploader for Podcast Episode */}
                                        <PhotoUploader
                                            labelEn="Episode Cover & Guest Thumbnail Photo"
                                            labelAr="صورة غلاف الحلقة وصورة الضيف أو المتحدث"
                                            isArabic={isArabic}
                                            value={ep.imageUrl || ""}
                                            onChange={(val: string) => handleUpdateField(idx, "imageUrl", val)}
                                            helperTextEn="Upload studio microphone shot or student interviewer photo."
                                            helperTextAr="ارفع صورة عالية الوضوح من استوديو التسجيل أو لضيف الحلقة لتعزيز المشاركة."
                                        />

                                        <div className="flex justify-end pt-2">
                                            <button
                                                onClick={() => {
                                                    setEditingIndex(null);
                                                    setSavedNotice(true);
                                                    setTimeout(() => setSavedNotice(false), 3000);
                                                }}
                                                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                                            >
                                                <Save className="w-4 h-4" />
                                                <span>{isArabic ? "حفظ التعديلات وإغلاق الحلقة" : "Save Episode Details"}</span>
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

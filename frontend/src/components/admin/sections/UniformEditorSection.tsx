"use client";

import { useState } from "react";
import { useCMSData, UniformItem } from "@/lib/cms/contentStore";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { Plus, Trash2, Edit3, Save, Shirt, DollarSign, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UniformEditorSection({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const { data, updateSection } = useCMSData();
    const [uniforms, setUniforms] = useState<UniformItem[]>([...data.uniforms]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [savedNotice, setSavedNotice] = useState(false);

    const handleSaveAll = (updatedList: UniformItem[]) => {
        setUniforms(updatedList);
        updateSection("uniforms", updatedList);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    const handleAddNew = () => {
        const newItem: UniformItem = {
            id: `uniform-${Date.now()}`,
            titleEn: "Magica Innovation Hoodie (Royal Edition)",
            titleAr: "سترة ماجيكا للابتكار الملكية (هودي باللون الذهبي)",
            price: 55,
            descEn: "Premium breathable organic cotton hoodie featuring embroidered gold Magica crest.",
            descAr: "هودي قطني عضوي فاخر وجيد التهوية مع تطريز شعار ماجيكا الذهبي الملكي.",
            imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
            sizes: ["S", "M", "L", "XL"]
        };
        const updated = [newItem, ...uniforms];
        handleSaveAll(updated);
        setEditingIndex(0);
    };

    const handleDelete = (index: number) => {
        if (!confirm(isArabic ? "هل أنت متأكد من حذف هذا الزي الرسمي من الموقع؟" : "Delete this uniform set?")) return;
        const updated = uniforms.filter((_, i) => i !== index);
        if (editingIndex === index) setEditingIndex(null);
        handleSaveAll(updated);
    };

    const handleUpdateField = (index: number, field: keyof UniformItem, val: any) => {
        const copy = [...uniforms];
        copy[index] = { ...copy[index], [field]: val };
        setUniforms(copy);
        updateSection("uniforms", copy);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
                        <Shirt className="w-7 h-7 text-orange-500" />
                        <span>{isArabic ? "إدارة أطقم الزي الرسمي والأزياء الميدانية (Magic Uniform CMS)" : "Magic Uniforms & Explorer Apparel CMS"}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {isArabic ? "إدارة بدلات المخترع، أثواب التخرج والقمصان الميدانية، وتحديد السعر والمقاسات ورفع صور العرض." : "Manage official campus apparel, graduation robes, sizes, and high-resolution clothing photos."}
                    </p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    <span>{isArabic ? "إضافة طقم أو زي جديد" : "Add Uniform Item"}</span>
                </button>
            </div>

            {savedNotice && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-lg text-center">
                    {isArabic ? "✅ تم حفظ التعديلات وصور الزي الرسمي بنجاح!" : "✅ Uniform catalog and clothing photography saved live!"}
                </motion.div>
            )}

            <div className="grid gap-6">
                {uniforms.map((u, idx) => {
                    const isEditing = editingIndex === idx;
                    return (
                        <div key={u.id} className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                            isEditing ? "border-2 border-orange-500 shadow-xl" : "border-gray-100 shadow-sm hover:border-gray-200"
                        }`}>
                            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-gray-50 to-orange-50/10">
                                <div className="flex items-center gap-4">
                                    {u.imageUrl ? (
                                        <img src={u.imageUrl} alt="Uniform" className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-white shrink-0" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xl shrink-0">👕</div>
                                    )}
                                    <div>
                                        <h3 className="font-black text-lg text-gray-900">{isArabic ? u.titleAr : u.titleEn}</h3>
                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mt-1">
                                            <span className="flex items-center gap-0.5 text-emerald-600 font-black"><DollarSign className="w-3.5 h-3.5" />${u.price}</span>
                                            <div className="flex items-center gap-1">
                                                <span>Sizes:</span>
                                                {(u.sizes || u.sizesEn || []).map((s: string) => (
                                                    <span key={s} className="px-1.5 py-0.5 bg-gray-200 text-gray-700 rounded text-[10px] font-black">{s}</span>
                                                ))}
                                            </div>
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
                                        <span>{isEditing ? (isArabic ? "إغلاق التعديل" : "Close Editor") : (isArabic ? "تعديل الزي وصورته" : "Edit Uniform & Photo")}</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(idx)}
                                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {isEditing && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="p-8 border-t border-gray-100 space-y-6 bg-white">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Uniform Name (EN)</label>
                                                <input
                                                    type="text"
                                                    value={u.titleEn}
                                                    onChange={e => handleUpdateField(idx, "titleEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">اسم الزي (عربي)</label>
                                                <input
                                                    type="text"
                                                    value={u.titleAr}
                                                    onChange={e => handleUpdateField(idx, "titleAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-right"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Price ($)</label>
                                                <input
                                                    type="number"
                                                    value={u.price}
                                                    onChange={e => handleUpdateField(idx, "price", Number(e.target.value))}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-emerald-600"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Fabric & Design Description (EN)</label>
                                                <textarea
                                                    rows={3}
                                                    value={u.descEn}
                                                    onChange={e => handleUpdateField(idx, "descEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs resize-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">وصف جودة الخامات والتطريز (عربي)</label>
                                                <textarea
                                                    rows={3}
                                                    value={u.descAr}
                                                    onChange={e => handleUpdateField(idx, "descAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right resize-none"
                                                />
                                            </div>
                                        </div>

                                        <PhotoUploader
                                            labelEn={`Apparel Photo: ${u.titleEn}`}
                                            labelAr={`صورة الزي والطقم الرسمي: ${u.titleAr}`}
                                            isArabic={isArabic}
                                            value={u.imageUrl || ""}
                                            onChange={(val: string) => handleUpdateField(idx, "imageUrl", val)}
                                            helperTextEn="Upload clean apparel shot or student modeling the uniform."
                                            helperTextAr="ارفع صورة واضحة ومبهرة للزي أو لطفل يرتدي الزي الرسمي للأكاديمية."
                                        />

                                        <div className="flex justify-end pt-2">
                                            <button
                                                onClick={() => {
                                                    setEditingIndex(null);
                                                    setSavedNotice(true);
                                                    setTimeout(() => setSavedNotice(false), 3000);
                                                }}
                                                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                                            >
                                                <Save className="w-4 h-4" />
                                                <span>{isArabic ? "حفظ التعديلات وإغلاق" : "Save Uniform Details"}</span>
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

"use client";

import { useState } from "react";
import { useCMSData, SupplyItem } from "@/lib/cms/contentStore";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { Plus, Trash2, Edit3, Save, Wrench, DollarSign, X, Eye, EyeOff, Tag, Image as ImageIcon, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES_LIST = [
    { id: "bags", en: "Bags & Backpacks", ar: "الحقائب والحزم المدرسية" },
    { id: "robotics", en: "Robotics & AI Kits", ar: "أطقم الروبوت والذكاء الاصطناعي" },
    { id: "stationery", en: "Stationery & Tools", ar: "الأدوات والقرطاسية الذكية" },
    { id: "books", en: "Books & Ledgers", ar: "الكتب والدفاتر التنفيذية" },
    { id: "bazar", en: "Bazar Kits", ar: "مجموعات البازار والابتكار" }
];

const SERVER_BAG_PHOTOS = [
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.33 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.33 AM (1).jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.33 AM (2).jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.34 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.34 AM (1).jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.34 AM (2).jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.35 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.35 AM (1).jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.35 AM (2).jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.35 AM (3).jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.36 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.36 AM (1).jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.36 AM (2).jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.37 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.37 AM (1).jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.37 AM (2).jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.38 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.39 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.40 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.41 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.42 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.43 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.44 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.45 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.46 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.47 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.48 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.49 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.50 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.51 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.52 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.53 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.54 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.55 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.56 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.57 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.31.58 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.09 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.10 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.11 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.12 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.13 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.14 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.15 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.16 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.17 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.18 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.19 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.20 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.21 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.22 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.23 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.24 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.25 AM.jpeg",
    "/supplies/WhatsApp Image 2026-07-28 at 3.41.26 AM.jpeg"
];

export default function SuppliesEditorSection({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const { data, updateSection } = useCMSData();
    const [supplies, setSupplies] = useState<SupplyItem[]>([...data.supplies]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [savedNotice, setSavedNotice] = useState(false);
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("ALL");
    const [showBagPickerForIndex, setShowBagPickerForIndex] = useState<number | null>(null);

    const handleSaveAll = (updatedList: SupplyItem[]) => {
        setSupplies(updatedList);
        updateSection("supplies", updatedList);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    const handleAddNew = (catEn: string = "Bags & Backpacks", catAr: string = "الحقائب والحزم المدرسية") => {
        const newItem: SupplyItem = {
            id: `supply-${Date.now()}`,
            titleEn: "New Magica Product Item",
            titleAr: "منتج ماجيكا الجديد",
            categoryEn: catEn,
            categoryAr: catAr,
            price: 0, // Default 0 means hidden price tag!
            itemsCount: 1,
            descEn: "High-grade educational equipment designed for practical daily learning and entrepreneurial projects.",
            descAr: "منتج تعليمي عالي الجودة مصمم للتجارب العملية والمشاريع الابتكارية اليومية.",
            imageUrl: "/supplies/WhatsApp Image 2026-07-28 at 3.31.33 AM.jpeg",
            galleryPhotos: [
                "/supplies/WhatsApp Image 2026-07-28 at 3.31.33 AM.jpeg",
                "/supplies/WhatsApp Image 2026-07-28 at 3.31.34 AM.jpeg"
            ]
        };
        const updated = [newItem, ...supplies];
        handleSaveAll(updated);
        setEditingIndex(0);
    };

    const handleDelete = (index: number) => {
        if (!confirm(isArabic ? "هل أنت متأكد من حذف هذا المنتج؟" : "Delete this product item?")) return;
        const updated = supplies.filter((_, i) => i !== index);
        if (editingIndex === index) setEditingIndex(null);
        handleSaveAll(updated);
    };

    const handleUpdateField = (index: number, field: keyof SupplyItem, val: any) => {
        const copy = [...supplies];
        copy[index] = { ...copy[index], [field]: val };
        setSupplies(copy);
        updateSection("supplies", copy);
    };

    const handleCategorySelect = (index: number, categoryId: string) => {
        const found = CATEGORIES_LIST.find(c => c.id === categoryId) || CATEGORIES_LIST[0];
        const copy = [...supplies];
        copy[index] = { ...copy[index], categoryEn: found.en, categoryAr: found.ar };
        setSupplies(copy);
        updateSection("supplies", copy);
    };

    const filteredSupplies = selectedCategoryFilter === "ALL" 
        ? supplies 
        : supplies.filter(item => item.categoryEn === selectedCategoryFilter || item.categoryAr === selectedCategoryFilter);

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
                        <Wrench className="w-7 h-7 text-orange-500" />
                        <span>{isArabic ? "إدارة الحقائب والمستلزمات (Magic Supplies CMS)" : "Magic Supplies & Bags Control Center"}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {isArabic ? "أضف منتجات تحت الأقسام المحددة (مثل الحقائب)، تحكم بالأسعار (أو اتركها فارغة لإخفائها)، واختر الصور بسهولة." : "Add products under specific categories (Bags, Kits), manage pricing (leave unset to keep hidden on frontend), and assign photography."}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => handleAddNew("Bags & Backpacks", "الحقائب والحزم المدرسية")}
                        className="px-5 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:brightness-110 text-white font-black text-xs rounded-2xl shadow-lg shadow-rose-500/25 flex items-center gap-1.5 transition-all shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{isArabic ? "+ إضافة حقيبة جديدة 🎒" : "+ Add New Bag 🎒"}</span>
                    </button>
                    <button
                        onClick={() => handleAddNew("Robotics & AI Kits", "أطقم الروبوت والذكاء الاصطناعي")}
                        className="px-5 py-3 bg-gray-900 hover:bg-orange-500 text-white font-black text-xs rounded-2xl shadow-md flex items-center gap-1.5 transition-all shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{isArabic ? "+ إضافة صندوق روبوت 🤖" : "+ Add Other Kit 🤖"}</span>
                    </button>
                </div>
            </div>

            {savedNotice && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-lg text-center">
                    {isArabic ? "✅ تم حفظ تغييرات المنتجات، صور الحقائب، وإعدادات الأسعار بنجاح!" : "✅ Product catalog, bag photography, and visibility rules saved live!"}
                </motion.div>
            )}

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <span className="text-xs font-black text-gray-400 uppercase mr-2 shrink-0">{isArabic ? "تصفح حسب القسم:" : "Filter by Category:"}</span>
                <button
                    onClick={() => setSelectedCategoryFilter("ALL")}
                    className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 ${selectedCategoryFilter === "ALL" ? "bg-orange-500 text-white shadow-md" : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"}`}
                >
                    {isArabic ? "كل الأقسام" : "All Categories"} ({supplies.length})
                </button>
                {CATEGORIES_LIST.map((cat) => {
                    const count = supplies.filter(s => s.categoryEn === cat.en || s.categoryAr === cat.ar).length;
                    const isActive = selectedCategoryFilter === cat.en || selectedCategoryFilter === cat.ar;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategoryFilter(cat.en)}
                            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 ${isActive ? "bg-rose-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"}`}
                        >
                            {isArabic ? cat.ar : cat.en} ({count})
                        </button>
                    );
                })}
            </div>

            <div className="grid gap-6">
                {filteredSupplies.map((item) => {
                    const idx = supplies.findIndex(s => s.id === item.id);
                    const isEditing = editingIndex === idx;
                    const isPriceHidden = !item.price || item.price <= 0;

                    return (
                        <div key={item.id || idx} className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                            isEditing ? "border-2 border-rose-500 shadow-xl" : "border-gray-100 shadow-sm hover:border-gray-200"
                        }`}>
                            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-gray-50 to-rose-50/10">
                                <div className="flex items-center gap-4">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt="Product" className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-white shrink-0" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xl shrink-0">🎒</div>
                                    )}
                                    <div>
                                        <h3 className="font-black text-lg text-gray-900">{isArabic ? item.titleAr : item.titleEn}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-gray-500 mt-1.5">
                                            <span className="text-rose-700 bg-rose-50 border border-rose-200/60 px-3 py-0.5 rounded-full text-[11px] font-black flex items-center gap-1">
                                                <Tag className="w-3 h-3 text-rose-500" />
                                                <span>{isArabic ? (item.categoryAr || "عام") : (item.categoryEn || "General")}</span>
                                            </span>
                                            
                                            {isPriceHidden ? (
                                                <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full font-extrabold text-[11px] border border-amber-200">
                                                    <EyeOff className="w-3 h-3 text-amber-600" />
                                                    <span>{isArabic ? "السعر مخفي (لم يُحدد)" : "Price Hidden (Unset)"}</span>
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-black text-[11px] border border-emerald-200">
                                                    <DollarSign className="w-3.5 h-3.5" />
                                                    <span>{item.price} {isArabic ? "ج.م" : "EGP"} ({isArabic ? "مرئي" : "Visible"})</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-center">
                                    <button
                                        onClick={() => setEditingIndex(isEditing ? null : idx)}
                                        className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all ${
                                            isEditing 
                                                ? "bg-gray-900 text-white shadow-md"
                                                : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                                        }`}
                                    >
                                        {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                                        <span>{isEditing ? (isArabic ? "إغلاق التعديل" : "Close Editor") : (isArabic ? "تعديل القسم والسعر والصورة" : "Edit Category & Photo")}</span>
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
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Product Title (EN)</label>
                                                <input
                                                    type="text"
                                                    value={item.titleEn}
                                                    onChange={e => handleUpdateField(idx, "titleEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">اسم المنتج أو الحقيبة (عربي)</label>
                                                <input
                                                    type="text"
                                                    value={item.titleAr}
                                                    onChange={e => handleUpdateField(idx, "titleAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-right"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                                    {isArabic ? "تصنيف القسم (Category)" : "Product Category"}
                                                </label>
                                                <select
                                                    value={CATEGORIES_LIST.find(c => c.en === item.categoryEn || c.ar === item.categoryAr)?.id || "bags"}
                                                    onChange={e => handleCategorySelect(idx, e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-rose-50 text-rose-900 border border-rose-200 rounded-xl text-xs font-black cursor-pointer"
                                                >
                                                    {CATEGORIES_LIST.map((cat) => (
                                                        <option key={cat.id} value={cat.id}>
                                                            {isArabic ? cat.ar : cat.en}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50/80 rounded-2xl border border-gray-200/60">
                                            <div>
                                                <label className="block text-xs font-black text-gray-800 mb-1 flex items-center gap-1.5">
                                                    <DollarSign className="w-4 h-4 text-emerald-600" />
                                                    <span>{isArabic ? "سعر المنتج (ج.م / EGP)" : "Product Price (EGP)"}</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    value={item.price || 0}
                                                    placeholder="0"
                                                    onChange={e => handleUpdateField(idx, "price", Number(e.target.value) || 0)}
                                                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-base font-black text-emerald-600"
                                                />
                                                <p className="text-[11px] text-gray-500 font-bold mt-1.5 leading-tight">
                                                    {isArabic 
                                                        ? "⚠️ ملاحظة: إذا ترك السعر 0 أو فارغًا، سيبقى السعر مخفيًا بالكامل في صفحة المنتجات." 
                                                        : "⚠️ Note: If left 0 or blank, the price tag will remain completely hidden on the storefront."}
                                                </p>
                                            </div>
                                            <div className="md:col-span-2 flex flex-col justify-center bg-white p-4 rounded-xl border border-gray-200/80">
                                                <div className="text-xs font-extrabold text-gray-700 mb-1 flex items-center gap-1.5">
                                                    {isPriceHidden ? (
                                                        <><EyeOff className="w-4 h-4 text-amber-500" /> <span className="text-amber-700">{isArabic ? "حالة الظهور في الموقع: السعر مخفي" : "Storefront Visibility: Price Hidden"}</span></>
                                                    ) : (
                                                        <><Eye className="w-4 h-4 text-emerald-500" /> <span className="text-emerald-700">{isArabic ? "حالة الظهور في الموقع: السعر معروض (" + item.price + " ج.م)" : "Storefront Visibility: Price Tag Visible (" + item.price + " EGP)"}</span></>
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-gray-400 font-medium">
                                                    {isArabic
                                                        ? "نظام ماجيكا الذكي يخفي البطاقة السعرية تلقائيًا عندما لا يتم تحديد سعر للمنتج، مما يتيح عرض المنتجات للتعريف أو حسب الاستفسار دون إظهار صفر."
                                                        : "The Magica display engine automatically suppresses the price chip when no price is entered, allowing catalog items to display cleanly without showing a zero."}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Description & Features (EN)</label>
                                                <textarea
                                                    rows={3}
                                                    value={item.descEn}
                                                    onChange={e => handleUpdateField(idx, "descEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs resize-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">وصف المنتج والمحتويات (عربي)</label>
                                                <textarea
                                                    rows={3}
                                                    value={item.descAr}
                                                    onChange={e => handleUpdateField(idx, "descAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right resize-none"
                                                />
                                            </div>
                                        </div>

                                        {/* SERVER BAG PHOTOS PICKER */}
                                        <div className="p-5 bg-gradient-to-r from-rose-50/50 via-purple-50/40 to-amber-50/30 rounded-3xl border border-rose-200/60 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-black text-sm text-gray-900 flex items-center gap-2">
                                                        <ImageIcon className="w-5 h-5 text-rose-500" />
                                                        <span>{isArabic ? "معرض صور الحقائب الجاهزة من مجلد الموقع (/supplies)" : "Quick Server Bag Photos Library (/supplies)"}</span>
                                                    </h4>
                                                    <p className="text-xs text-gray-500">
                                                        {isArabic ? "اضغط على أي صورة من الحقائب المرفوعة مسبقًا على مجلد E:\\...\\public\\supplies لاختيارها فورًا للمنتج:" : "Click any pre-hosted bag photograph from public/supplies folder to assign it immediately:"}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowBagPickerForIndex(showBagPickerForIndex === idx ? null : idx)}
                                                    className="px-4 py-2 bg-white hover:bg-rose-50 text-rose-600 font-black text-xs rounded-xl shadow-sm border border-rose-200 shrink-0 transition-colors"
                                                >
                                                    {showBagPickerForIndex === idx ? (isArabic ? "إخفاء الصور ▲" : "Hide Photo Library ▲") : (isArabic ? "تصفح صور الحقائب (280+ صورة) ▼" : "Browse Bag Photos ▼")}
                                                </button>
                                            </div>

                                            {showBagPickerForIndex === idx && (
                                                <div className="p-4 bg-white rounded-2xl border border-rose-100 shadow-inner max-h-64 overflow-y-auto">
                                                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                                                        {SERVER_BAG_PHOTOS.map((photoUrl, pIndex) => {
                                                            const isSelected = item.imageUrl === photoUrl;
                                                            return (
                                                                <div
                                                                    key={pIndex}
                                                                    onClick={() => handleUpdateField(idx, "imageUrl", photoUrl)}
                                                                    className={`relative h-16 w-full rounded-xl overflow-hidden cursor-pointer border-2 transition-transform hover:scale-105 ${
                                                                        isSelected ? "border-rose-600 ring-2 ring-rose-500/30 shadow-md scale-105" : "border-gray-200 opacity-80 hover:opacity-100"
                                                                    }`}
                                                                >
                                                                    <img src={photoUrl} alt={`Bag ${pIndex + 1}`} className="w-full h-full object-cover" />
                                                                    {isSelected && (
                                                                        <div className="absolute inset-0 bg-rose-600/30 flex items-center justify-center">
                                                                            <Check className="w-6 h-6 text-white drop-shadow-md stroke-[3]" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <p className="text-center text-[10px] font-bold text-gray-400 mt-3">
                                                        {isArabic ? "💡 يمكنك أيضًا استخدام رافع الصور أدناه لرفع ملف جديد من جهازك أو لصق رابط مخصص." : "💡 You can also use the uploader below to attach a fresh image file or custom web URL."}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <PhotoUploader
                                            labelEn="Custom Product / Bag Photo Uploader"
                                            labelAr="رافع صور المنتجات والحقائب المخصص"
                                            isArabic={isArabic}
                                            value={item.imageUrl || ""}
                                            onChange={(val: string) => handleUpdateField(idx, "imageUrl", val)}
                                            helperTextEn="Upload custom bag photography file or enter image CDN URL."
                                            helperTextAr="ارفع ملف صورة مخصص أو ألصق رابط الصورة مباشرة."
                                        />

                                        <PhotoUploader
                                            labelEn="Additional Product & Bag Gallery Photos (Multi-Photo Supported)"
                                            labelAr="ألبوم صور المنتج الإضافية (يدعم إضافة صور متتابعة ومن زوايا مختلفة)"
                                            isArabic={isArabic}
                                            isGallery={true}
                                            values={item.galleryPhotos || []}
                                            onChange={(vals: string[]) => handleUpdateField(idx, "galleryPhotos", vals)}
                                            helperTextEn="Add multiple photos showing internal compartments, side angles, and details."
                                            helperTextAr="ارفع صوًرا إضافية لإظهار الجيوب الداخلية، زوايا الحقيبة، وتفاصيل الجودة."
                                        />

                                        <div className="flex justify-end pt-2">
                                            <button
                                                onClick={() => {
                                                    setEditingIndex(null);
                                                    setSavedNotice(true);
                                                    setTimeout(() => setSavedNotice(false), 3000);
                                                }}
                                                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                                            >
                                                <Save className="w-4 h-4" />
                                                <span>{isArabic ? "حفظ وتطبيق التغييرات" : "Save Product Details"}</span>
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

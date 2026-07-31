"use client";

import { useState, useEffect } from "react";
import { getKidStores, KidStore, KidProduct } from "@/lib/bazar/kidStores";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { Store, Plus, Trash2, Edit3, Save, DollarSign, X, Package, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BazarEditorSection({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const [stores, setStores] = useState<KidStore[]>([]);
    const [editingStoreId, setEditingStoreId] = useState<string | null>(null);
    const [savedNotice, setSavedNotice] = useState(false);

    useEffect(() => {
        setStores(getKidStores());
    }, []);

    const saveToStorage = (newStores: KidStore[]) => {
        setStores(newStores);
        localStorage.setItem("magica_kid_stores_v1", JSON.stringify(newStores));
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    const handleAddStore = () => {
        const newStore: KidStore = {
            id: `store-${Date.now()}`,
            childName: "Junior Creator",
            storeNameEn: "New Innovation & Crafts Store",
            storeNameAr: "متجر الابتكارات والحرف السحرية الجديد",
            logo: "🪄",
            descriptionEn: "Welcome to my store! Take a look at my handmade goods and calculated profit creations.",
            descriptionAr: "مرحبًا بكم في متجري! تصفحوا أفكاري ومنتجاتي المحضرة بحسابات أرباح وذكاء تجاري حقيقي.",
            colorTheme: "from-orange-500 to-amber-600",
            bgGradient: "bg-orange-500/10 border-orange-500/20 text-orange-600",
            createdAt: "2026-08-01",
            bannerUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=800",
            products: [
                { id: `p-${Date.now()}-1`, title: "Magic Prototype Wand / نموذج العصا المبتكرة", sellingPrice: 35, costPrice: 15, profit: 20, icon: "✨", category: "Crafts", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400" }
            ]
        };
        saveToStorage([newStore, ...stores]);
        setEditingStoreId(newStore.id);
    };

    const handleDeleteStore = (id: string) => {
        if (!confirm(isArabic ? "هل أنت متأكد من حذف هذا المتجر بالكامل؟" : "Delete this entire kid store?")) return;
        saveToStorage(stores.filter(s => s.id !== id));
        if (editingStoreId === id) setEditingStoreId(null);
    };

    const handleUpdateStore = (storeId: string, updatedStore: KidStore) => {
        const copy = stores.map(s => s.id === storeId ? updatedStore : s);
        setStores(copy);
        localStorage.setItem("magica_kid_stores_v1", JSON.stringify(copy));
    };

    const handleAddProduct = (store: KidStore) => {
        const newProd: KidProduct = {
            id: `p-${Date.now()}`,
            title: "New Bazar Item / منتج بازار جديد",
            sellingPrice: 20,
            costPrice: 8,
            profit: 12,
            icon: "🛍️",
            category: "General",
            imageUrl: ""
        };
        handleUpdateStore(store.id, { ...store, products: [...store.products, newProd] });
    };

    const handleUpdateProduct = (store: KidStore, index: number, updatedProd: KidProduct) => {
        const pCopy = [...store.products];
        // Automatic profit math
        updatedProd.profit = updatedProd.sellingPrice - updatedProd.costPrice;
        pCopy[index] = updatedProd;
        handleUpdateStore(store.id, { ...store, products: pCopy });
    };

    const handleDeleteProduct = (store: KidStore, index: number) => {
        const pCopy = store.products.filter((_, i) => i !== index);
        handleUpdateStore(store.id, { ...store, products: pCopy });
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
                        <Store className="w-7 h-7 text-orange-500" />
                        <span>{isArabic ? "إدارة متاجر الأطفال ومنتجات البازار (Magic Bazar CMS)" : "Magic Bazar: Kid Stores & Retail Products CMS"}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {isArabic
                            ? "مراجعة وتعديل أسماء ومتاجر الطلاب في البازار، تعديل هوامش الأرباح، ورفع الصور الواقعية لكل منتج وغلاف لكل متجر."
                            : "Moderate junior entrepreneurial storefronts, adjust costing & product margins, and attach real item photography to student stores."}
                    </p>
                </div>
                <button
                    onClick={handleAddStore}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    <span>{isArabic ? "إضافة متجر طالب جديد" : "Create Kid Store"}</span>
                </button>
            </div>

            {savedNotice && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-lg text-center">
                    {isArabic ? "✅ تم حفظ التعديلات على متاجر وصور البازار بنجاح!" : "✅ Kid store updates and product photo galleries saved live!"}
                </motion.div>
            )}

            <div className="grid gap-6">
                {stores.map((store) => {
                    const isEditing = editingStoreId === store.id;
                    return (
                        <div key={store.id} className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                            isEditing ? "border-2 border-orange-500 shadow-xl" : "border-gray-100 shadow-sm hover:border-gray-200"
                        }`}>
                            {/* Store Header Row */}
                            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-gray-50 to-orange-50/10">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl p-3 bg-white rounded-2xl shadow-md border border-gray-100 shrink-0">{store.logo || "🛍️"}</div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-black text-lg text-gray-900">{isArabic ? store.storeNameAr : store.storeNameEn}</h3>
                                            <span className="text-[11px] font-black px-2.5 py-0.5 bg-purple-100 text-purple-700 rounded-full">CEO: {store.childName}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium mt-1">
                                            {store.products.length} {isArabic ? "منتجات مسجلة بأرباح محسوبة" : "listed products"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-center">
                                    <button
                                        onClick={() => setEditingStoreId(isEditing ? null : store.id)}
                                        className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all ${
                                            isEditing 
                                                ? "bg-gray-900 text-white shadow-md"
                                                : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                                        }`}
                                    >
                                        {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                                        <span>{isEditing ? (isArabic ? "إغلاق التعديل" : "Close Store Editor") : (isArabic ? "إدارة المتجر وصور المنتجات" : "Manage Products & Photos")}</span>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteStore(store.id)}
                                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Expandable Store & Product Editor */}
                            <AnimatePresence>
                                {isEditing && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="p-8 border-t border-gray-100 space-y-8 bg-white">
                                        {/* Store Core Info */}
                                        <div className="space-y-4 bg-gray-50/60 p-6 rounded-3xl border border-gray-200/70">
                                            <h4 className="font-extrabold text-sm text-gray-800 flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-orange-500" />
                                                <span>{isArabic ? "بيانات المتجر والطفل" : "Store Profile & CEO Details"}</span>
                                            </h4>
                                            <div className="grid md:grid-cols-3 gap-3">
                                                <div>
                                                    <label className="block text-[11px] font-bold text-gray-700">Child CEO Name</label>
                                                    <input
                                                        type="text"
                                                        value={store.childName}
                                                        onChange={e => handleUpdateStore(store.id, { ...store, childName: e.target.value })}
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-gray-700">Store Name (EN)</label>
                                                    <input
                                                        type="text"
                                                        value={store.storeNameEn}
                                                        onChange={e => handleUpdateStore(store.id, { ...store, storeNameEn: e.target.value })}
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-gray-700">اسم المتجر (عربي)</label>
                                                    <input
                                                        type="text"
                                                        value={store.storeNameAr}
                                                        onChange={e => handleUpdateStore(store.id, { ...store, storeNameAr: e.target.value })}
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-right"
                                                    />
                                                </div>
                                            </div>

                                            <PhotoUploader
                                                labelEn={`Store Banner Photo: ${store.storeNameEn}`}
                                                labelAr={`صورة الغلاف والبنر العُلوي لمتجر: ${store.storeNameAr}`}
                                                isArabic={isArabic}
                                                value={store.bannerUrl || ""}
                                                onChange={(val: string) => handleUpdateStore(store.id, { ...store, bannerUrl: val })}
                                                helperTextEn="Upload a wide storefront or branded banner image for this kid's bazar profile."
                                                helperTextAr="ارفع صورة غلاف عريضة ومبهرة لصفحة متجر هذا الرائد الصغير."
                                            />
                                        </div>

                                        {/* Products Manager */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                                <h4 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                                                    <Package className="w-5 h-5 text-emerald-600" />
                                                    <span>{isArabic ? "قائمة المنتجات وصور المعروضات (Products Catalog)" : "Store Products & Real Photo Uploaders"}</span>
                                                </h4>
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddProduct(store)}
                                                    className="px-4 py-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                    <span>{isArabic ? "أضف منتجًا جديدًا للمتجر" : "Add Product Item"}</span>
                                                </button>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                {store.products.map((prod, pIdx) => (
                                                    <div key={prod.id} className="p-5 bg-white rounded-2xl border border-gray-200/90 shadow-sm space-y-4 relative">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteProduct(store, pIdx)}
                                                            className="absolute top-4 right-4 p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                                            title="Remove Product"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>

                                                        <div className="pr-8">
                                                            <label className="block text-xs font-bold text-gray-700 mb-1">Product Title / الاسم باللغتين</label>
                                                            <input
                                                                type="text"
                                                                value={prod.title}
                                                                onChange={e => handleUpdateProduct(store, pIdx, { ...prod, title: e.target.value })}
                                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800"
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-3 gap-2">
                                                            <div>
                                                                <label className="block text-[11px] font-bold text-gray-600">Selling Price ($)</label>
                                                                <input
                                                                    type="number"
                                                                    value={prod.sellingPrice}
                                                                    onChange={e => handleUpdateProduct(store, pIdx, { ...prod, sellingPrice: Number(e.target.value) })}
                                                                    className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-black text-emerald-600"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[11px] font-bold text-gray-600">Cost Price ($)</label>
                                                                <input
                                                                    type="number"
                                                                    value={prod.costPrice}
                                                                    onChange={e => handleUpdateProduct(store, pIdx, { ...prod, costPrice: Number(e.target.value) })}
                                                                    className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-500"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[11px] font-extrabold text-orange-600">Net Profit</label>
                                                                <div className="w-full px-2.5 py-1.5 bg-orange-50 border border-orange-200 rounded-lg text-xs font-black text-orange-700 text-center">
                                                                    +${prod.sellingPrice - prod.costPrice}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Product Photo Uploader */}
                                                        <PhotoUploader
                                                            labelEn="Product Photo / Real Picture"
                                                            labelAr="صورة المنتج الحقيقية في البازار"
                                                            isArabic={isArabic}
                                                            value={prod.imageUrl || ""}
                                                            onChange={(val: string) => handleUpdateProduct(store, pIdx, { ...prod, imageUrl: val })}
                                                            helperTextEn="Upload actual photo of handmade craft or AI model."
                                                            helperTextAr="ارفع صورة حقيقية للمنتج لتظهر في سلة الشراء ومتجر الطفل."
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() => {
                                                    setEditingStoreId(null);
                                                    setSavedNotice(true);
                                                    setTimeout(() => setSavedNotice(false), 3000);
                                                }}
                                                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                                            >
                                                <Save className="w-4 h-4" />
                                                <span>{isArabic ? "حفظ التعديلات وإغلاق متجر " + store.childName : "Done Editing " + store.childName + "'s Store"}</span>
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

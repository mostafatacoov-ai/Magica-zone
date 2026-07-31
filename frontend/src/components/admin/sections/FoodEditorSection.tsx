"use client";

import { useState } from "react";
import { useCMSData, FoodMeal } from "@/lib/cms/contentStore";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { Plus, Trash2, Edit3, Save, Utensils, Flame, Tag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FoodEditorSection({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const { data, updateSection } = useCMSData();
    const [food, setFood] = useState<FoodMeal[]>([...data.food]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [savedNotice, setSavedNotice] = useState(false);

    const handleSaveAll = (updatedList: FoodMeal[]) => {
        setFood(updatedList);
        updateSection("food", updatedList);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    const handleAddNew = () => {
        const newMeal: FoodMeal = {
            id: `meal-${Date.now()}`,
            titleEn: "Organic Brain Power Fruit Salad & Yogurt",
            titleAr: "سلطة الفواكه الطبيعية مع اللبن المحفزة للطاقة",
            categoryEn: "Snacks & Refreshment",
            categoryAr: "وجبات خفيفة ومشروبات",
            calories: "150 kcal",
            descEn: "Fresh strawberries, apples, chia seeds and prebiotic natural yogurt to nourish cognitive focus.",
            descAr: "تشكيلة الفراولة الطازجة، التفاح، بذور الشيا واللبن الطبيعي لدعم اليقظة وحيوية الأطفال.",
            imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
        };
        const updated = [newMeal, ...food];
        handleSaveAll(updated);
        setEditingIndex(0);
    };

    const handleDelete = (index: number) => {
        if (!confirm(isArabic ? "هل أنت متأكد من حذف هذه الوجبة من قائمة ماجيكا فود؟" : "Delete this meal item?")) return;
        const updated = food.filter((_, i) => i !== index);
        if (editingIndex === index) setEditingIndex(null);
        handleSaveAll(updated);
    };

    const handleUpdateField = (index: number, field: keyof FoodMeal, val: any) => {
        const copy = [...food];
        copy[index] = { ...copy[index], [field]: val };
        setFood(copy);
        updateSection("food", copy);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
                        <Utensils className="w-7 h-7 text-orange-500" />
                        <span>{isArabic ? "إدارة وجبات وقوائم ماجيكا فود (Magic Food CMS)" : "Magic Food & Brain Nutrition Menu CMS"}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {isArabic ? "أضف أشهى الوجبات الصحية وعصائر الابتكار، عدل القيم الغذائية السعرات، وارفع الصور الحية للأطعمة." : "Manage daily nutritional menus, snack ingredients, calorie details, and appetizing food photography."}
                    </p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    <span>{isArabic ? "إضافة وجبة صحية جديدة" : "Add Meal Item"}</span>
                </button>
            </div>

            {savedNotice && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-lg text-center">
                    {isArabic ? "✅ تم حفظ التعديلات وصور وجبة الطعام بنجاح!" : "✅ Meal details and food photography successfully updated!"}
                </motion.div>
            )}

            <div className="grid gap-6">
                {food.map((meal, idx) => {
                    const isEditing = editingIndex === idx;
                    return (
                        <div key={meal.id} className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                            isEditing ? "border-2 border-orange-500 shadow-xl" : "border-gray-100 shadow-sm hover:border-gray-200"
                        }`}>
                            {/* Card Header */}
                            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-gray-50 to-orange-50/10">
                                <div className="flex items-center gap-4">
                                    {meal.imageUrl ? (
                                        <img src={meal.imageUrl} alt="Meal" className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-white shrink-0" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xl shrink-0">🥗</div>
                                    )}
                                    <div>
                                        <h3 className="font-black text-lg text-gray-900">{isArabic ? meal.titleAr : meal.titleEn}</h3>
                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mt-1">
                                            <span className="text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full text-[11px] font-black">{isArabic ? meal.categoryAr : meal.categoryEn}</span>
                                            <span className="flex items-center gap-1 text-emerald-600 font-black"><Flame className="w-3.5 h-3.5" />{meal.calories}</span>
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
                                        <span>{isEditing ? (isArabic ? "إغلاق التعديل" : "Close Editor") : (isArabic ? "تعديل الوجبة والصورة" : "Edit Meal & Photo")}</span>
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
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Meal Name (EN)</label>
                                                <input
                                                    type="text"
                                                    value={meal.titleEn}
                                                    onChange={e => handleUpdateField(idx, "titleEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">اسم الوجبة الصحيّة (عربي)</label>
                                                <input
                                                    type="text"
                                                    value={meal.titleAr}
                                                    onChange={e => handleUpdateField(idx, "titleAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-right"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Category (EN)</label>
                                                    <input
                                                        type="text"
                                                        value={meal.categoryEn}
                                                        onChange={e => handleUpdateField(idx, "categoryEn", e.target.value)}
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">التصنيف (عربي: وجبة رئيسية)</label>
                                                    <input
                                                        type="text"
                                                        value={meal.categoryAr}
                                                        onChange={e => handleUpdateField(idx, "categoryAr", e.target.value)}
                                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Energy & Calories (e.g. 380 kcal)</label>
                                                <input
                                                    type="text"
                                                    value={meal.calories}
                                                    onChange={e => handleUpdateField(idx, "calories", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-black text-emerald-600"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Nutritional Benefits & Ingredients (EN)</label>
                                                <textarea
                                                    rows={3}
                                                    value={meal.descEn}
                                                    onChange={e => handleUpdateField(idx, "descEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs resize-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">الفوائد الصحية للمخ والتركيز (عربي)</label>
                                                <textarea
                                                    rows={3}
                                                    value={meal.descAr}
                                                    onChange={e => handleUpdateField(idx, "descAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right resize-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Photo Uploader for Meal */}
                                        <PhotoUploader
                                            labelEn={`Appetizing Meal Photo: ${meal.titleEn}`}
                                            labelAr={`صورة الوجبة اللذيذة والطازجة: ${meal.titleAr}`}
                                            isArabic={isArabic}
                                            value={meal.imageUrl || ""}
                                            onChange={(val: string) => handleUpdateField(idx, "imageUrl", val)}
                                            helperTextEn="Upload a delicious vibrant photo of this brain-fuel organic dish or drink."
                                            helperTextAr="ارفع صورة شهية وملونة لهذه الوجبة أو المشروب لتجعلها محبوبة للأطفال في قائمة الطعام."
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
                                                <span>{isArabic ? "حفظ وإغلاق تفاصيل الوجبة" : "Save Meal Details"}</span>
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

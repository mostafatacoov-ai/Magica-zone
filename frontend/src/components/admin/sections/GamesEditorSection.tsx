"use client";

import { useState } from "react";
import { useCMSData, GameItem } from "@/lib/cms/contentStore";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { Plus, Trash2, Edit3, Save, Gamepad2, Trophy, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GamesEditorSection({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const { data, updateSection } = useCMSData();
    const [games, setGames] = useState<GameItem[]>([...data.games]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [savedNotice, setSavedNotice] = useState(false);

    const handleSaveAll = (updatedList: GameItem[]) => {
        setGames(updatedList);
        updateSection("games", updatedList);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    const handleAddNew = () => {
        const newGame: GameItem = {
            id: `game-${Date.now()}`,
            titleEn: "Bazar Tycoon & Supply Chain Master",
            titleAr: "إمبراطور البازار وسيد إدارة الموارد التجارية",
            categoryEn: "Economy & Negotiation",
            categoryAr: "الاقتصاد والتفاوض",
            pointsReward: "100 Points & CEO Medal",
            descEn: "Simulate real market fluctuations, price negotiations, and supply chain logistics in an exciting 3D strategy game.",
            descAr: "محاكاة واقعية لتقلبات أسعار البازار، التفاوض التجاري الذكي، وإدارة المخزون في لعبة تخطيط استراتيجية ممتعة.",
            imageUrl: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&q=80&w=600"
        };
        const updated = [newGame, ...games];
        handleSaveAll(updated);
        setEditingIndex(0);
    };

    const handleDelete = (index: number) => {
        if (!confirm(isArabic ? "هل أنت متأكد من حذف هذه اللعبة التعليمية؟" : "Delete this educational game?")) return;
        const updated = games.filter((_, i) => i !== index);
        if (editingIndex === index) setEditingIndex(null);
        handleSaveAll(updated);
    };

    const handleUpdateField = (index: number, field: keyof GameItem, val: any) => {
        const copy = [...games];
        copy[index] = { ...copy[index], [field]: val };
        setGames(copy);
        updateSection("games", copy);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
                        <Gamepad2 className="w-7 h-7 text-orange-500" />
                        <span>{isArabic ? "إدارة ألعاب الذكاء الاستراتيجي والمحاكاة (Magic Games CMS)" : "Magic Games & Mind Logic Challenges CMS"}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {isArabic ? "أضف ألعاب الشطرنج وتحديات المنطق وإدارة الأعمال، عدل المكافآت والنقاط، وارفع صور لقطات الشاشة للألعاب." : "Manage financial simulation quests, chess tournaments, XP rewards, and gameplay screenshots."}
                    </p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    <span>{isArabic ? "إضافة لعبة ذكاء جديدة" : "Add Logic Game"}</span>
                </button>
            </div>

            {savedNotice && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-lg text-center">
                    {isArabic ? "✅ تم حفظ التعديلات وصور الألعاب بنجاح!" : "✅ Game quests and gameplay thumbnails saved live!"}
                </motion.div>
            )}

            <div className="grid gap-6">
                {games.map((g, idx) => {
                    const isEditing = editingIndex === idx;
                    return (
                        <div key={g.id} className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                            isEditing ? "border-2 border-orange-500 shadow-xl" : "border-gray-100 shadow-sm hover:border-gray-200"
                        }`}>
                            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-gray-50 to-orange-50/10">
                                <div className="flex items-center gap-4">
                                    {g.imageUrl ? (
                                        <img src={g.imageUrl} alt="Game thumbnail" className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-white shrink-0" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xl shrink-0">🎮</div>
                                    )}
                                    <div>
                                        <h3 className="font-black text-lg text-gray-900">{isArabic ? g.titleAr : g.titleEn}</h3>
                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mt-1">
                                            <span className="text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full text-[11px] font-black">{isArabic ? g.categoryAr : g.categoryEn}</span>
                                            <span className="flex items-center gap-1 text-amber-600 font-black"><Trophy className="w-3.5 h-3.5" />{g.pointsReward}</span>
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
                                        <span>{isEditing ? (isArabic ? "إغلاق التعديل" : "Close Editor") : (isArabic ? "تعديل اللعبة وصور العرض" : "Edit Game & Photo")}</span>
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
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Game Title (EN)</label>
                                                <input
                                                    type="text"
                                                    value={g.titleEn}
                                                    onChange={e => handleUpdateField(idx, "titleEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">اسم اللعبة (عربي)</label>
                                                <input
                                                    type="text"
                                                    value={g.titleAr}
                                                    onChange={e => handleUpdateField(idx, "titleAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-right"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Category (EN)</label>
                                                    <input
                                                        type="text"
                                                        value={g.categoryEn}
                                                        onChange={e => handleUpdateField(idx, "categoryEn", e.target.value)}
                                                        className="w-full px-2.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Reward (e.g. 50 Points)</label>
                                                    <input
                                                        type="text"
                                                        value={g.pointsReward}
                                                        onChange={e => handleUpdateField(idx, "pointsReward", e.target.value)}
                                                        className="w-full px-2.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-black text-amber-600"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Gameplay Mechanics & Objectives (EN)</label>
                                                <textarea
                                                    rows={3}
                                                    value={g.descEn}
                                                    onChange={e => handleUpdateField(idx, "descEn", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs resize-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">أهداف المحاكاة وقواعد اللعبة (عربي)</label>
                                                <textarea
                                                    rows={3}
                                                    value={g.descAr}
                                                    onChange={e => handleUpdateField(idx, "descAr", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-right resize-none"
                                                />
                                            </div>
                                        </div>

                                        <PhotoUploader
                                            labelEn="Gameplay Screenshot / Card Banner"
                                            labelAr="صورة لقطة الشاشة أو الغلاف التفاعلي للعبة"
                                            isArabic={isArabic}
                                            value={g.imageUrl || ""}
                                            onChange={(val: string) => handleUpdateField(idx, "imageUrl", val)}
                                            helperTextEn="Upload captivating gameplay screenshot or 3D puzzle graphic."
                                            helperTextAr="ارفع صورة مشوهة للعبة الشطرنج أو ألغاز الابتكار لتحميس الأطفال للعب."
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
                                                <span>{isArabic ? "حفظ وإغلاق تفاصيل اللعبة" : "Save Game Details"}</span>
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

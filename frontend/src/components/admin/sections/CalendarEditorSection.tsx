"use client";

import { useState } from "react";
import { useCMSData, ScheduleEvent } from "@/lib/cms/contentStore";
import { Plus, Trash2, Edit3, Save, Calendar, Clock, MapPin, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CalendarEditorSection({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const { data, updateSection } = useCMSData();
    const [events, setEvents] = useState<ScheduleEvent[]>([...(data.events || [])]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [savedNotice, setSavedNotice] = useState(false);

    const handleSaveAll = (updatedList: ScheduleEvent[]) => {
        setEvents(updatedList);
        updateSection("events", updatedList);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    const handleAddNew = () => {
        const newEvent: ScheduleEvent = {
            id: `ev-${Date.now()}`,
            titleEn: "New Event Title",
            titleAr: "عنوان الفعالية الجديدة",
            date: new Date().toISOString().split('T')[0],
            timeEn: "10:00 AM - 12:00 PM",
            timeAr: "١٠:٠٠ صباحًا - ١٢:٠٠ ظهرًا",
            category: "course",
            locationEn: "Main Campus",
            locationAr: "المقر الرئيسي",
            locationMode: "offline",
            statusEn: "Registration Open",
            statusAr: "مفتوح للتسجيل",
        };
        const updated = [newEvent, ...events];
        handleSaveAll(updated);
        setEditingIndex(0);
    };

    const handleDelete = (index: number) => {
        if (!confirm(isArabic ? "هل أنت متأكد من حذف هذه الفعالية من التقويم؟" : "Delete this event?")) return;
        const updated = events.filter((_, i) => i !== index);
        if (editingIndex === index) setEditingIndex(null);
        handleSaveAll(updated);
    };

    const handleUpdateField = (index: number, field: keyof ScheduleEvent, val: any) => {
        const copy = [...events];
        copy[index] = { ...copy[index], [field]: val };
        setEvents(copy);
        updateSection("events", copy);
    };

    return (
        <div className="space-y-8 animate-fadeIn" dir={isArabic ? "rtl" : "ltr"}>
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
                        <Calendar className="w-7 h-7 text-blue-500" />
                        {isArabic ? "محرر التقويم والفعاليات" : "Calendar & Events Editor"}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 font-medium">
                        {isArabic ? "قم بإدارة المواعيد، الجداول الخاصة بالكورسات، والمعسكرات" : "Manage schedules, course dates, and camp timelines"}
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {savedNotice && (
                        <motion.span 
                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                            className="text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100"
                        >
                            {isArabic ? "تم الحفظ التلقائي ✓" : "Saved Automatically ✓"}
                        </motion.span>
                    )}
                    <button 
                        onClick={handleAddNew}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-2xl font-black text-sm transition-all shadow-md shadow-gray-900/20"
                    >
                        <Plus className="w-4 h-4" />
                        {isArabic ? "إضافة موعد جديد" : "Add Event"}
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="grid gap-6">
                <AnimatePresence>
                    {events.map((ev, idx) => (
                        <motion.div 
                            key={ev.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
                                editingIndex === idx ? "border-blue-300 shadow-xl shadow-blue-900/5" : "border-gray-200 hover:border-blue-200 hover:shadow-lg"
                            }`}
                        >
                            {/* Summary Bar (Always Visible) */}
                            <div 
                                className="p-5 flex items-center justify-between cursor-pointer group"
                                onClick={() => setEditingIndex(editingIndex === idx ? null : idx)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex flex-col items-center justify-center shrink-0">
                                        <span className="text-xs font-black text-blue-400">{ev.date.split('-')[2]}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                                            {isArabic ? ev.titleAr : ev.titleEn}
                                        </h3>
                                        <div className="flex items-center gap-3 text-xs font-bold text-gray-400 mt-1">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" /> {isArabic ? ev.timeAr : ev.timeEn}
                                            </span>
                                            <span className="flex items-center gap-1 uppercase tracking-wider text-orange-500">
                                                {ev.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setEditingIndex(editingIndex === idx ? null : idx); }}
                                        className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                    >
                                        {editingIndex === idx ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleDelete(idx); }}
                                        className="p-2.5 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Editor Form (Expanded) */}
                            {editingIndex === idx && (
                                <div className="border-t border-gray-100 bg-gray-50/50 p-6 space-y-6">
                                    {/* Row 1: Titles */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Event Title (EN)</label>
                                            <input
                                                type="text"
                                                value={ev.titleEn}
                                                onChange={e => handleUpdateField(idx, "titleEn", e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">اسم الفعالية (عربي)</label>
                                            <input
                                                type="text"
                                                value={ev.titleAr}
                                                onChange={e => handleUpdateField(idx, "titleAr", e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-right"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: Date & Time */}
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Date</label>
                                            <input
                                                type="date"
                                                value={ev.date}
                                                onChange={e => handleUpdateField(idx, "date", e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Time (EN)</label>
                                            <input
                                                type="text"
                                                value={ev.timeEn}
                                                onChange={e => handleUpdateField(idx, "timeEn", e.target.value)}
                                                placeholder="e.g. 10:00 AM - 12:00 PM"
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">التوقيت (عربي)</label>
                                            <input
                                                type="text"
                                                value={ev.timeAr}
                                                onChange={e => handleUpdateField(idx, "timeAr", e.target.value)}
                                                placeholder="مثال: ١٠:٠٠ صباحًا"
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-right"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Category & Mode */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                                            <select
                                                value={ev.category}
                                                onChange={e => handleUpdateField(idx, "category", e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
                                            >
                                                <option value="course">Course / Programme</option>
                                                <option value="camp">Camp</option>
                                                <option value="workshop">Workshop</option>
                                                <option value="game">Tournament / Game</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Delivery Mode (Online/Offline)</label>
                                            <select
                                                value={ev.locationMode || "offline"}
                                                onChange={e => handleUpdateField(idx, "locationMode", e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
                                            >
                                                <option value="offline">Offline (Campus/Physical)</option>
                                                <option value="online">Online (Zoom/Live)</option>
                                                <option value="hybrid">Hybrid</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 4: Location */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Location / Link (EN)</label>
                                            <input
                                                type="text"
                                                value={ev.locationEn}
                                                onChange={e => handleUpdateField(idx, "locationEn", e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">المكان / الرابط (عربي)</label>
                                            <input
                                                type="text"
                                                value={ev.locationAr}
                                                onChange={e => handleUpdateField(idx, "locationAr", e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-right"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 5: Status */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Status (EN)</label>
                                            <input
                                                type="text"
                                                value={ev.statusEn}
                                                onChange={e => handleUpdateField(idx, "statusEn", e.target.value)}
                                                placeholder="e.g. Confirmed & Open"
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">الحالة (عربي)</label>
                                            <input
                                                type="text"
                                                value={ev.statusAr}
                                                onChange={e => handleUpdateField(idx, "statusAr", e.target.value)}
                                                placeholder="مثال: مؤكد ومفتوح للتسجيل"
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-right"
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                            )}
                        </motion.div>
                    ))}
                    {events.length === 0 && (
                        <div className="p-12 bg-gray-50 rounded-3xl border border-dashed border-gray-300 text-center">
                            <p className="text-gray-500 font-bold mb-4">No events found in calendar.</p>
                            <button onClick={handleAddNew} className="text-blue-600 font-black hover:underline">
                                Add your first event
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

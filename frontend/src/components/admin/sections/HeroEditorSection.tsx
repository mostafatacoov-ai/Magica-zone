"use client";

import { useState } from "react";
import { useCMSData, HeroSectionContent, TestimonialItem } from "@/lib/cms/contentStore";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { Save, Plus, Trash2, Globe, Sparkles, User, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroEditorSection({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const { data, updateSection } = useCMSData();
    const [form, setForm] = useState<HeroSectionContent>({ ...data.hero });
    const [savedNotice, setSavedNotice] = useState(false);

    // Sync state if external store loaded later
    const handleSave = () => {
        updateSection("hero", form);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    const handleAddTestimonial = () => {
        const newT: TestimonialItem = {
            id: `t-${Date.now()}`,
            nameEn: "New Parent / Student",
            nameAr: "اسم ولي الأمر أو الرائد",
            roleEn: "Parent / CEO",
            roleAr: "ولي أمر رائد أعمال",
            quoteEn: "Share an inspiring testimony about Magica Academy...",
            quoteAr: "اكتب شهادة ملهمة وتجربة أثر ماجيكا على طفلك...",
            avatarUrl: ""
        };
        setForm({ ...form, testimonials: [...(form.testimonials || []), newT] });
    };

    const handleUpdateTestimonial = (index: number, updated: TestimonialItem) => {
        const copy = [...form.testimonials];
        copy[index] = updated;
        setForm({ ...form, testimonials: copy });
    };

    const handleDeleteTestimonial = (index: number) => {
        const copy = form.testimonials.filter((_, i) => i !== index);
        setForm({ ...form, testimonials: copy });
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Top Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
                        <Globe className="w-7 h-7 text-orange-500" />
                        <span>{isArabic ? "إدارة الصفحة الرئيسية والعناوين الكبرى (Hero Section)" : "Homepage Hero & Main Showcase Management"}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {isArabic ? "قم بتعديل العناوين الترحيبية، صورة الخلفية الرئيسية، ألبوم الصور المباشر، وتوصيات الأهالي مع صورهم التعبيرية." : "Edit landing page titles, hero background banner photo, campus gallery photography, and testimonial stories."}
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all shrink-0"
                >
                    <Save className="w-5 h-5" />
                    <span>{isArabic ? "حفظ وتوثيق التعديلات" : "Save Changes Instant"}</span>
                </button>
            </div>

            {savedNotice && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-lg text-center">
                    {isArabic ? "✅ تم حفظ التعديلات ونشرها بنجاح على الصفحة الرئيسية للموقع!" : "✅ Hero banner and gallery photos successfully saved and published!"}
                </motion.div>
            )}

            {/* Main Text Content & Hero Photo Uploader */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-5">
                    <h3 className="font-extrabold text-lg text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-orange-500" />
                        <span>{isArabic ? "النصوص الرئيسية والإعلانية" : "Main Headlines & Slogans"}</span>
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Title (English) / العنوان الإنجليزي</label>
                            <input
                                type="text"
                                value={form.titleEn}
                                onChange={e => setForm({ ...form, titleEn: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Title (Arabic) / العنوان الرئيسي بالعربية</label>
                            <input
                                type="text"
                                value={form.titleAr}
                                onChange={e => setForm({ ...form, titleAr: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-800 text-right focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Subtitle (English) / الوصف المختصر الإنجليزي</label>
                            <textarea
                                rows={3}
                                value={form.subtitleEn}
                                onChange={e => setForm({ ...form, subtitleEn: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 focus:outline-none focus:border-orange-500 focus:bg-white transition-all resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Subtitle (Arabic) / الوصف المختصر بالعربية</label>
                            <textarea
                                rows={3}
                                value={form.subtitleAr}
                                onChange={e => setForm({ ...form, subtitleAr: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 text-right focus:outline-none focus:border-orange-500 focus:bg-white transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Hero Photo & Gallery Uploaders */}
                <div className="space-y-6">
                    <PhotoUploader
                        labelEn="Main Hero Background Photo"
                        labelAr="صورة الغلاف الرئيسية في واجهة الاستقبال"
                        isArabic={isArabic}
                        value={form.heroBgPhoto || ""}
                        onChange={(val: string) => setForm({ ...form, heroBgPhoto: val })}
                        helperTextEn="Upload a stunning high-resolution campus photo or action shot of Magica students."
                        helperTextAr="ارفع صورة واضحة وعالية الدقة لأنشطة الطلاب في أكاديمية ومعسكر ماجيكا."
                    />

                    <PhotoUploader
                        labelEn="Homepage Photo Gallery Studio (Multi-Photo)"
                        labelAr="ألبوم الصور الشامل في واجهة الموقع (يدعم صور متعددة)"
                        isArabic={isArabic}
                        isGallery={true}
                        values={form.galleryPhotos || []}
                        onChange={(vals: string[]) => setForm({ ...form, galleryPhotos: vals })}
                        helperTextEn="Add multiple photos showing campus activities, Bazar stands, and student graduation smiling faces."
                        helperTextAr="ارفع صوراً متعددة تعرض حياة الطلاب داخل البازار وأفواج التخرج وسعادة الأطفال."
                    />
                </div>
            </div>

            {/* Testimonials Management with Photo Avatars */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-orange-500" />
                            <span>{isArabic ? "تجارب وتوصيات الأهالي والطلاب (مع صور الأشخاص)" : "Parent & Student Testimonial Stories"}</span>
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {isArabic ? "يمكنك إضافة أو حذف التوصيات وتخصيص الصورة التعبيرية لكل شخصيّة." : "Showcase authentic success stories with profile pictures to build parental trust."}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleAddTestimonial}
                        className="px-5 py-2.5 bg-orange-100 text-orange-700 hover:bg-orange-200 font-extrabold text-xs rounded-2xl transition-all flex items-center gap-1.5 shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{isArabic ? "إضافة توصية جديدة" : "Add Testimonial Story"}</span>
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {(form.testimonials || []).map((t, idx) => (
                        <div key={t.id} className="p-6 bg-gray-50/70 rounded-3xl border border-gray-200/80 space-y-4 relative">
                            <button
                                type="button"
                                onClick={() => handleDeleteTestimonial(idx)}
                                className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-xl font-bold transition-all"
                                title="Delete Testimonial"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="grid grid-cols-2 gap-3 pr-10">
                                <div>
                                    <label className="block text-[11px] font-extrabold text-gray-700">Name (EN)</label>
                                    <input
                                        type="text"
                                        value={t.nameEn}
                                        onChange={e => handleUpdateTestimonial(idx, { ...t, nameEn: e.target.value })}
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-extrabold text-gray-700">الاسم (عربي)</label>
                                    <input
                                        type="text"
                                        value={t.nameAr}
                                        onChange={e => handleUpdateTestimonial(idx, { ...t, nameAr: e.target.value })}
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-right"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-extrabold text-gray-700">Role / Parent (EN)</label>
                                    <input
                                        type="text"
                                        value={t.roleEn}
                                        onChange={e => handleUpdateTestimonial(idx, { ...t, roleEn: e.target.value })}
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-extrabold text-gray-700">الصيغة / القرابة (عربي)</label>
                                    <input
                                        type="text"
                                        value={t.roleAr}
                                        onChange={e => handleUpdateTestimonial(idx, { ...t, roleAr: e.target.value })}
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-right"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[11px] font-extrabold text-gray-700">Quote (EN)</label>
                                    <textarea
                                        rows={2}
                                        value={t.quoteEn}
                                        onChange={e => handleUpdateTestimonial(idx, { ...t, quoteEn: e.target.value })}
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-extrabold text-gray-700">التوصية (عربي)</label>
                                    <textarea
                                        rows={2}
                                        value={t.quoteAr}
                                        onChange={e => handleUpdateTestimonial(idx, { ...t, quoteAr: e.target.value })}
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-right resize-none"
                                    />
                                </div>
                            </div>

                            {/* Avatar Photo Uploader for Testimonial */}
                            <PhotoUploader
                                labelEn="Person Avatar / Photo"
                                labelAr="صورة الشخص المصرح بالشهادة"
                                isArabic={isArabic}
                                value={t.avatarUrl || ""}
                                onChange={(val: string) => handleUpdateTestimonial(idx, { ...t, avatarUrl: val })}
                                helperTextEn="Attach smiling photo of child or parent."
                                helperTextAr="أضف صورة مبتسمة لولي الأمر أو الرائد الصغير لتعزيز الثقة."
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

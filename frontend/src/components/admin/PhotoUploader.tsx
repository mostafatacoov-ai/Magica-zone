"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Image as ImageIcon, Upload, Link as LinkIcon, Trash2, Plus, Check, AlertCircle, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoUploaderProps {
    labelEn?: string;
    labelAr?: string;
    isArabic?: boolean;
    value?: string;           // Single image mode
    values?: string[];        // Gallery mode
    isGallery?: boolean;
    onChange: (val: any) => void;
    helperTextEn?: string;
    helperTextAr?: string;
}

export default function PhotoUploader({
    labelEn = "Section Photo / Banner Image",
    labelAr = "صورة القسم / الغلاف المخصص",
    isArabic = false,
    value = "",
    values = [],
    isGallery = false,
    onChange,
    helperTextEn = "Upload an image file from your device or paste a direct image URL.",
    helperTextAr = "قم برفع صورة مباشرة من جهازك أو ضع رابط عنوان الصورة على شبكة الإنترنت."
}: PhotoUploaderProps) {
    const [mode, setMode] = useState<"upload" | "url">("upload");
    const [urlInput, setUrlInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (isGallery) {
            const newArray = [...(values || [])];
            let loadedCount = 0;

            Array.from(files).forEach(file => {
                if (!file.type.startsWith("image/")) {
                    setError(isArabic ? "يرجى اختيار ملف صور صالح (JPG, PNG, WEBP)." : "Please select valid image files (JPG, PNG, WEBP).");
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result) {
                        newArray.push(event.target.result as string);
                        loadedCount++;
                        if (loadedCount === files.length) {
                            onChange(newArray);
                        }
                    }
                };
                reader.readAsDataURL(file);
            });
        } else {
            const file = files[0];
            if (!file.type.startsWith("image/")) {
                setError(isArabic ? "يرجى اختيار ملف صورة صالح (JPG, PNG, WEBP)." : "Please select a valid image file (JPG, PNG, WEBP).");
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    onChange(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
        // Reset ref so same file can be chosen again if removed
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleAddUrl = () => {
        if (!urlInput.trim()) return;
        // Simple URL validation
        if (!urlInput.startsWith("http://") && !urlInput.startsWith("https://") && !urlInput.startsWith("data:image")) {
            setError(isArabic ? "يرجى التأكد من كتابة رابط صورة يبدأ بـ http:// أو https://" : "Please provide a valid image URL starting with http:// or https://");
            return;
        }
        setError(null);
        if (isGallery) {
            onChange([...(values || []), urlInput.trim()]);
        } else {
            onChange(urlInput.trim());
        }
        setUrlInput("");
    };

    const handleRemoveSingle = () => {
        onChange("");
    };

    const handleRemoveFromArray = (index: number) => {
        const newArr = (values || []).filter((_, i) => i !== index);
        onChange(newArr);
    };

    const label = isArabic ? labelAr : labelEn;
    const helper = isArabic ? helperTextAr : helperTextEn;
    const hasImage = isGallery ? (values && values.length > 0) : Boolean(value);

    return (
        <div className="space-y-3 bg-gradient-to-br from-gray-50 to-orange-50/20 p-5 rounded-3xl border border-gray-200/80 shadow-sm transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <label className="block text-sm font-black text-gray-800 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-orange-500 shrink-0" />
                        <span>{label}</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-0.5">{helper}</p>
                </div>
                
                {/* Mode Selector */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 text-xs self-start sm:self-auto">
                    <button
                        type="button"
                        onClick={() => { setMode("upload"); setError(null); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                            mode === "upload"
                                ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isArabic ? "رفع من الجهاز" : "Upload File"}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => { setMode("url"); setError(null); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                            mode === "url"
                                ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span>{isArabic ? "رابط إنترنت" : "Image URL"}</span>
                    </button>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-100 animate-pulse">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Upload Box or URL Box */}
            {mode === "upload" ? (
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple={isGallery}
                        onChange={handleFileUpload}
                        className="hidden"
                        id={`photo-upload-${label.replace(/\s+/g, '-')}`}
                    />
                    <label
                        htmlFor={`photo-upload-${label.replace(/\s+/g, '-')}`}
                        className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-orange-300 hover:border-orange-500 bg-orange-50/40 hover:bg-orange-50/80 rounded-2xl cursor-pointer transition-all group"
                    >
                        <div className="p-3 bg-orange-500 text-white rounded-full shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform mb-2">
                            <Upload className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-black text-gray-700">
                            {isArabic ? "اضغط هنا لاختيار الصورة أو اسحبها وأفلتها" : "Click here to choose photo or drag & drop"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            {isGallery
                                ? (isArabic ? "يمكنك اختيار أكثر من صورة معًا لأستوديو الصور" : "You can select multiple photos for the gallery")
                                : (isArabic ? "يدعم صيغ JPG, PNG, WEBP فائقة الجودة" : "Supports high quality JPG, PNG, WEBP")}
                        </p>
                    </label>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                        <LinkIcon className="absolute top-3.5 left-3.5 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder={isArabic ? "الصق رابط عنوان الصورة هنا (https://...)" : "Paste direct image URL here (https://...)"}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleAddUrl}
                        className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-black rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5 shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{isArabic ? "إضافة الصورة" : "Add Photo"}</span>
                    </button>
                </div>
            )}

            {/* Live Previews */}
            {hasImage && (
                <div className="mt-4 pt-4 border-t border-gray-200/60">
                    <p className="text-xs font-black text-gray-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{isArabic ? "معاينة الصور المرفقة الحالية:" : "Current Attached Photo Preview:"}</span>
                    </p>

                    {isGallery ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            <AnimatePresence>
                                {(values || []).map((img, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="relative group rounded-2xl overflow-hidden aspect-video border-2 border-white shadow-md bg-gray-900"
                                    >
                                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFromArray(idx)}
                                                title={isArabic ? "حذف الصورة" : "Delete photo"}
                                                className="p-2 bg-red-600 text-white rounded-xl shadow-lg hover:bg-red-700 transition-colors transform scale-90 hover:scale-100"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-bold backdrop-blur-sm">
                                            #{idx + 1}
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="relative inline-block group rounded-2xl overflow-hidden max-w-sm max-h-56 border-2 border-white shadow-lg bg-gray-900">
                            <img src={value} alt="Preview" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-4">
                                <button
                                    type="button"
                                    onClick={handleRemoveSingle}
                                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-1.5"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>{isArabic ? "حذف الصورة وإزالتها" : "Remove & Delete Photo"}</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

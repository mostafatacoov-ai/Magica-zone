"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Store, ShoppingCart, CheckCircle, ArrowLeft, ArrowRight, Star, Sparkles, Trophy, Heart, ShieldCheck, Tag, Plus, Trash2 } from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";
import { getStoreById, getKidStores, KidStore, KidProduct } from "@/lib/bazar/kidStores";

export default function KidMiniStorePage({ params: { lang, id } }: { params: { lang: string; id: string } }) {
    const isArabic = lang === "ar";
    const [store, setStore] = useState<KidStore | undefined>(undefined);
    const [cart, setCart] = useState<KidProduct[]>([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        const fetchStoreData = async () => {
            const found = await getStoreById(id);
            if (found) {
                setStore(found);
            } else {
                // Check if state updated later
                const all = await getKidStores();
                setStore(all.find(s => s.id === id));
            }
        };
        fetchStoreData();
    }, [id]);

    const addToCart = (product: KidProduct) => {
        setCart(prev => [...prev, product]);
        setOrderPlaced(false);
    };

    const removeFromCart = (index: number) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const handleSupportOrder = () => {
        if (cart.length === 0) return;
        setOrderPlaced(true);
        setCart([]);
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.sellingPrice, 0);

    if (!store) {
        return (
            <main className="min-h-screen pt-36 pb-24 px-6 flex flex-col items-center justify-center text-center relative font-[family-name:var(--font-inter)]">
                <MagicalBackground />
                <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full border border-gray-100 z-10">
                    <div className="text-6xl mb-4">🏪</div>
                    <h2 className="text-2xl font-black text-gray-800 mb-2">
                        {isArabic ? "المتجر غير موجود أو قيد التجهيز!" : "Mini-Store Not Found!"}
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">
                        {isArabic ? "هذا المتجر ربما لم يقم الرائد الصغير بنشره بعد على ماجيكا بازار." : "This mini-store might still be under development by our champion entrepreneur."}
                    </p>
                    <Link
                        href={`/${lang}/magic-bazar`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-black rounded-full shadow-md hover:bg-orange-600 transition-colors"
                    >
                        <span>{isArabic ? "العودة إلى معرض المتاجر" : "Back to Stores Gallery"}</span>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 font-[family-name:var(--font-inter)] text-gray-800 relative overflow-hidden">
            <MagicalBackground />

            <div className="max-w-7xl mx-auto relative z-10 space-y-12">
                {/* Navigation Back */}
                <div className="flex items-center justify-between">
                    <Link
                        href={`/${lang}/magic-bazar#kid-stores-gallery`}
                        className="inline-flex items-center gap-2 text-sm font-extrabold text-gray-600 hover:text-orange-600 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-gray-200 transition-all"
                    >
                        <ArrowLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                        <span>{isArabic ? "العودة لمعرض ماجيكا بازار" : "Back to Magica Bazar Gallery"}</span>
                    </Link>
                </div>

                {/* Store Executive Header Banner */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-gray-200/80 border border-gray-100 relative overflow-hidden"
                >
                    <div className={`absolute top-0 left-0 right-0 h-4 bg-gradient-to-r ${store.colorTheme || "from-orange-500 to-purple-600"}`} />
                    <Sparkles className="absolute right-10 bottom-10 w-48 h-48 text-orange-500/5 pointer-events-none" />

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-start gap-6 max-w-3xl">
                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-tr from-purple-50 via-orange-50 to-amber-50 flex items-center justify-center text-7xl shadow-xl border border-white shrink-0"
                            >
                                {store.logo}
                            </motion.div>

                            <div>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 text-orange-600 font-extrabold text-xs border border-orange-200 shadow-2xs">
                                        <Trophy className="w-3.5 h-3.5 text-orange-500" />
                                        <span>{isArabic ? `المؤسس والرائد الصغير: ${store.childName}` : `Founder Champion: ${store.childName}`}</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        <span>{isArabic ? "متجر معتمد في ماجيكا" : "Verified Magica Brand"}</span>
                                    </span>
                                </div>

                                <h1 className="text-3xl md:text-5xl font-black text-gray-950 mb-4 leading-tight">
                                    {isArabic ? store.storeNameAr : store.storeNameEn}
                                </h1>

                                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">
                                    {isArabic ? store.descriptionAr : store.descriptionEn}
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50/90 p-6 rounded-3xl border border-gray-100 min-w-[240px] text-center shrink-0 w-full lg:w-auto flex lg:flex-col justify-around gap-4">
                            <div>
                                <span className="text-xs font-extrabold text-gray-400 block uppercase">{isArabic ? "معروضات المتجر" : "Catalog Items"}</span>
                                <span className="text-3xl font-black text-gray-900 font-mono">{store.products.length}</span>
                            </div>
                            <div className="h-px bg-gray-200 hidden lg:block" />
                            <div>
                                <span className="text-xs font-extrabold text-gray-400 block uppercase">{isArabic ? "الشفافية والابتكار" : "Entrepreneur Score"}</span>
                                <div className="flex items-center justify-center gap-1 text-amber-500 font-black text-sm mt-1">
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Store Layout: Catalog + Shopping Basket */}
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Catalog Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2">
                                <Store className="w-7 h-7 text-orange-500" />
                                <span>{isArabic ? "قائمة المنتجات والمعروضات" : "Available Products & Creations"}</span>
                            </h3>
                            <span className="text-xs text-gray-500 font-bold bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                                {isArabic ? "اضغط للشراء أو الدعم 🛍️" : "Select items to support 🛍️"}
                            </span>
                        </div>

                        {store.products.length === 0 ? (
                            <div className="bg-white p-12 rounded-3xl border text-center text-gray-400">
                                <Tag className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p className="text-lg font-black">{isArabic ? "لا توجد منتجات مدرجة في هذا المتجر حتى الآن" : "No products have been listed in this store yet."}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {store.products.map((prod, index) => (
                                    <motion.div
                                        key={prod.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl hover:border-orange-200 transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="w-16 h-16 bg-gradient-to-tr from-gray-50 to-orange-50/40 rounded-2xl flex items-center justify-center text-4xl mb-5 border border-gray-100 shadow-sm">
                                                {prod.icon}
                                            </div>
                                            <span className="text-[11px] font-black uppercase tracking-wider bg-purple-50 text-purple-700 px-3 py-1 rounded-full mb-2 inline-block">
                                                {prod.category || "Magica Brand Item"}
                                            </span>
                                            <h4 className="text-xl font-black text-gray-900 mb-2 leading-snug">
                                                {prod.title}
                                            </h4>
                                        </div>

                                        <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                                            <div>
                                                <span className="text-[10px] uppercase font-bold text-gray-400 block">{isArabic ? "سعر الشراء" : "Price"}</span>
                                                <span className="text-2xl font-black text-orange-600 font-mono">${prod.sellingPrice}</span>
                                            </div>
                                            <button
                                                onClick={() => addToCart(prod)}
                                                className="px-5 py-3 bg-gray-900 text-white font-black rounded-2xl text-sm hover:bg-orange-500 transition-colors inline-flex items-center gap-2 shadow-lg active:scale-95"
                                            >
                                                <Plus className="w-4 h-4 text-emerald-400" />
                                                <span>{isArabic ? "أضف للسلة" : "Add to Cart"}</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Interactive Store Basket Widget */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl shadow-gray-200/80 border border-gray-100 sticky top-28">
                        <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                                    <ShoppingCart className="w-5 h-5" />
                                </div>
                                <h4 className="font-black text-xl text-gray-900">{isArabic ? "سلة مشتريات البازار" : "Bazar Shopping Basket"}</h4>
                            </div>
                            <span className="bg-orange-500 text-white font-black text-xs px-2.5 py-1 rounded-full">{cart.length}</span>
                        </div>

                        <AnimatePresence mode="wait">
                            {orderPlaced ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="py-10 text-center space-y-4"
                                >
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h5 className="font-black text-xl text-gray-900">
                                        {isArabic ? "شكرًا لدعمك الرائد الصغير! 🎉" : "Thank You For Supporting Our Entrepreneur! 🎉"}
                                    </h5>
                                    <p className="text-gray-500 text-xs leading-relaxed max-w-xs mx-auto">
                                        {isArabic
                                            ? `تم إرسال طلب الدعم والمحاكاة إلى متجر ${store.childName}. هذا الدعم يعزز ثقة الطفل ومهارته في سوق العمل الحقيقي!`
                                            : `Your supportive order simulation was transmitted to ${store.childName}'s store. Your patronage inspires future leaders!`}
                                    </p>
                                    <button
                                        onClick={() => setOrderPlaced(false)}
                                        className="px-6 py-2.5 bg-gray-100 text-gray-800 font-bold rounded-xl text-xs hover:bg-gray-200 transition-colors"
                                    >
                                        {isArabic ? "شراء المزيد من المتجر" : "Continue Browsing Store"}
                                    </button>
                                </motion.div>
                            ) : cart.length === 0 ? (
                                <div className="py-12 text-center text-gray-400 space-y-3">
                                    <ShoppingCart className="w-12 h-12 mx-auto opacity-30" />
                                    <p className="text-sm font-extrabold">{isArabic ? "سلتك فارغة حاليًا" : "Your cart is currently empty"}</p>
                                    <p className="text-xs text-gray-400">{isArabic ? "اختر من منتجات الرائد الصغير أعلاه لدعمه وشراء منتجاته السحرية." : "Select items from above to support our champion's entrepreneurial dream."}</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                                        {cart.map((item, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={i}
                                                className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{item.icon}</span>
                                                    <div>
                                                        <h6 className="font-extrabold text-xs text-gray-900 line-clamp-1">{item.title.split("/")[0]}</h6>
                                                        <span className="font-mono text-xs font-black text-orange-600">${item.sellingPrice}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(i)}
                                                    className="text-gray-300 hover:text-red-500 p-1.5 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 space-y-4">
                                        <div className="flex items-center justify-between font-black text-lg text-gray-900">
                                            <span>{isArabic ? "المجموع الكلي:" : "Total Amount:"}</span>
                                            <span className="text-2xl font-mono text-purple-600">${totalAmount}</span>
                                        </div>

                                        <button
                                            onClick={handleSupportOrder}
                                            className="w-full py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-purple-600 text-white font-black text-base rounded-2xl shadow-xl shadow-orange-500/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Heart className="w-5 h-5 fill-current text-white animate-bounce" />
                                            <span>{isArabic ? "تأكيد الدعم وشراء المجموعة 🚀" : "Support Entrepreneur & Buy 🚀"}</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Educational Note */}
                        <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-400 text-center leading-relaxed">
                            {isArabic ? "* التفاعل والشراء في هذا المتجر هو جزء من المحاكاة التعليمية في ماجيكا بازار لتأهيل الأطفال تجاريًا وماليًا." : "* Interacting and ordering here is part of Magica Bazar's practical simulation teaching financial & retail fluency."}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

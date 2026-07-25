"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Trophy, Gamepad2, Sparkles, Map, Brain, FlaskConical, BookOpen, Shapes, Play, Award, ChevronRight, ShoppingBag, Plus, DollarSign, TrendingUp, Tag, Trash2, Globe, Store, AlertTriangle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getKidGameScores, getTotalMagicPoints, ALL_GAMES_INFO, GameScore } from "@/lib/games/gameScores";
import { getChildPersonalStore, createKidStore, addProductToStore, removeProductFromStore, KidStore, KidProduct } from "@/lib/bazar/kidStores";

export default function ChildDashboard({ lang }: { lang: string }) {
    const isArabic = lang === "ar";
    const [points, setPoints] = useState(350);
    const [gameScores, setGameScores] = useState<Record<string, GameScore>>({});
    const [myStore, setMyStore] = useState<KidStore | null>(null);

    // Modals states
    const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    // New Store Form State
    const [storeForm, setStoreForm] = useState({
        childName: "Champion Kid",
        storeNameEn: "",
        storeNameAr: "",
        logo: "🛍️",
        descriptionEn: "",
        descriptionAr: "",
        colorTheme: "from-orange-500 to-purple-600",
        bgGradient: "bg-orange-500/10 border-orange-500/20 text-orange-600"
    });

    // New Product Form State
    const [prodForm, setProdForm] = useState({
        title: "",
        sellingPrice: 30,
        costPrice: 12,
        icon: "🎨",
        category: "Handcrafted"
    });

    const loadData = () => {
        setPoints(getTotalMagicPoints());
        setGameScores(getKidGameScores());
        setMyStore(getChildPersonalStore());
    };

    useEffect(() => {
        loadData();
        const handleUpdate = () => loadData();
        window.addEventListener("magica-scores-updated", handleUpdate);
        return () => window.removeEventListener("magica-scores-updated", handleUpdate);
    }, []);

    const nextLevelPoints = Math.ceil((points + 1) / 500) * 500 || 500;
    const progress = Math.min((points % 500 / 500) * 100, 100);

    const renderGameIcon = (name: string) => {
        switch (name) {
            case "Brain": return <Brain className="w-6 h-6" />;
            case "FlaskConical": return <FlaskConical className="w-6 h-6" />;
            case "Sparkles": return <Sparkles className="w-6 h-6" />;
            case "BookOpen": return <BookOpen className="w-6 h-6" />;
            case "Shapes": return <Shapes className="w-6 h-6" />;
            default: return <Gamepad2 className="w-6 h-6" />;
        }
    };

    const storeLogosList = ["🛍️", "🎨", "🤖", "🧁", "🍪", "🚀", "🪄", "🎪", "💎", "🧸", "📚", "⚙️"];
    const productIconsList = ["🎨", "🪄", "🧸", "🍪", "🧁", "💎", "🧢", "📓", "👕", "🤖", "🎲", "🚀", "👑", "⚽"];

    const handleCreateStoreSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const created = createKidStore({
            childName: storeForm.childName,
            storeNameEn: storeForm.storeNameEn || (isArabic ? storeForm.storeNameAr : "My Magica Store"),
            storeNameAr: storeForm.storeNameAr || storeForm.storeNameEn,
            logo: storeForm.logo,
            descriptionEn: storeForm.descriptionEn || "Welcome to my official mini-store in Magica Bazar!",
            descriptionAr: storeForm.descriptionAr || storeForm.descriptionEn || "مرحباً بكم في متجري السحري على ماجيكا بازار!",
            colorTheme: storeForm.colorTheme,
            bgGradient: storeForm.bgGradient
        });
        setMyStore(created);
        setIsStoreModalOpen(false);
    };

    const handleAddProductSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!myStore) return;
        addProductToStore(myStore.id, {
            title: prodForm.title,
            sellingPrice: Number(prodForm.sellingPrice),
            costPrice: Number(prodForm.costPrice),
            icon: prodForm.icon,
            category: prodForm.category
        });
        setIsProductModalOpen(false);
        setProdForm({ title: "", sellingPrice: 35, costPrice: 15, icon: "🪄", category: "Magica Item" });
    };

    const calculatedProfit = Number(prodForm.sellingPrice) - Number(prodForm.costPrice);

    // Calculate overall store metrics
    let totalRevenuePotential = 0;
    let totalProfitEarned = 0;
    if (myStore && myStore.products) {
        myStore.products.forEach(p => {
            totalRevenuePotential += p.sellingPrice;
            totalProfitEarned += p.profit;
        });
    }

    return (
        <div className="space-y-12 pb-12">
            {/* Top Stat and Quick Action Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Main Points Card */}
                <motion.div 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="p-10 bg-gradient-to-br from-green-500 to-lime-500 text-white rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between"
                >
                    <Sparkles className="absolute top-4 right-4 w-28 h-28 text-white opacity-10 pointer-events-none animate-pulse" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-lg border border-white/30">
                            <Star className="w-10 h-10 text-yellow-300 fill-current animate-bounce" />
                        </div>
                        <h3 className="text-3xl font-extrabold mb-2">{isArabic ? "نقاطي السحرية" : "My Magic Points"}</h3>
                        <p className="text-7xl font-black drop-shadow-md tracking-tight my-2">{points}</p>
                        
                        <div className="w-full mt-8">
                            <div className="flex justify-between text-sm font-bold mb-2">
                                <span>{isArabic ? "المستوى الحالي" : "Current Level"}</span>
                                <span>{nextLevelPoints - points} {isArabic ? "نقطة للمستوى القادم" : "pts to Next Level"}</span>
                            </div>
                            <div className="w-full h-4 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full shadow-inner"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-4 flex-1">
                    <Link href={`/${lang}/magic-games`} className="w-full">
                        <motion.div 
                            whileHover={{ scale: 1.03, y: -2 }} 
                            whileTap={{ scale: 0.97 }} 
                            className="bg-white p-6 rounded-3xl shadow-lg shadow-orange-500/5 border-2 border-orange-100 flex flex-col items-center justify-center gap-4 group h-full cursor-pointer hover:border-orange-400 transition-all"
                        >
                            <div className="w-16 h-16 bg-gradient-to-tr from-orange-400 to-amber-500 text-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                <Gamepad2 className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <span className="font-extrabold text-gray-800 text-lg block">{isArabic ? "الألعاب الذهنية" : "Mind Games"}</span>
                                <span className="text-xs text-orange-500 font-bold">{isArabic ? "5 ألعاب سحرية" : "5 Magic Games"}</span>
                            </div>
                        </motion.div>
                    </Link>

                    <Link href={`/${lang}/magic-bazar`} className="w-full">
                        <motion.div 
                            whileHover={{ scale: 1.03, y: -2 }} 
                            whileTap={{ scale: 0.97 }} 
                            className="bg-white p-6 rounded-3xl shadow-lg shadow-purple-500/5 border-2 border-purple-100 flex flex-col items-center justify-center gap-4 group h-full cursor-pointer hover:border-purple-400 transition-all"
                        >
                            <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                <ShoppingBag className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <span className="font-extrabold text-gray-800 text-lg block">{isArabic ? "ماجيكا بازار" : "Magica Bazar"}</span>
                                <span className="text-xs text-purple-600 font-bold">{isArabic ? "سوق الأبطال" : "Champions Marketplace"}</span>
                            </div>
                        </motion.div>
                    </Link>
                    
                    <motion.div className="col-span-2 bg-gradient-to-r from-orange-400 via-amber-500 to-red-500 p-6 rounded-3xl shadow-xl text-white flex items-center justify-between relative overflow-hidden border border-white/20">
                        <Sparkles className="absolute right-2 bottom-2 w-20 h-20 text-white/10 pointer-events-none" />
                        <div className="z-10">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 inline-block">
                                {isArabic ? "تحدي الأبطال اليومي" : "Daily Hero Challenge"}
                            </span>
                            <h4 className="font-black text-xl md:text-2xl mb-1">{isArabic ? "شارة الذكاء الخارق متاحة!" : "Prodigy Badge Available!"}</h4>
                            <p className="opacity-90 text-sm font-semibold">{isArabic ? "العب جولتين من كيمياء الأرقام لتحصيل مكافأتك" : "Play two Math Alchemy games today to earn 100 extra points!"}</p>
                        </div>
                        <Trophy className="w-14 h-14 text-yellow-300 drop-shadow-lg shrink-0 z-10 animate-pulse" />
                    </motion.div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* KID MINI-STORE SUITE IN MAGICA BAZAR */}
            {/* ========================================================= */}
            <section className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-gray-100/80 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-50 via-orange-50/40 to-transparent rounded-bl-full pointer-events-none" />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-8">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-black mb-2 border border-purple-100">
                                <Store className="w-4 h-4 text-purple-600" />
                                <span>{isArabic ? "ريادة الأعمال والتطبيق العملي" : "Real Entrepreneurship & Financial Literacy"}</span>
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2.5">
                                <ShoppingBag className="w-8 h-8 text-orange-500" />
                                <span>{isArabic ? "متجري السحري في ماجيكا بازار" : "My Magica Bazar Mini-Store"}</span>
                            </h3>
                            <p className="text-gray-500 text-sm md:text-base mt-1 font-medium">
                                {isArabic
                                    ? "أنشئ متجرك الخاص، حدد شعارك، وأضف منتجاتك بحساب دقيق لسعر التكلفة وسعر البيع لحساب أرباحك الحقيقية!"
                                    : "Create your brand store, pick an emblem, and add items with calculated cost & selling prices to master real profit evaluation!"}
                            </p>
                        </div>

                        {myStore && (
                            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => setIsProductModalOpen(true)}
                                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-black text-sm shadow-lg shadow-orange-500/30 hover:brightness-105 transition-all flex-1 md:flex-initial justify-center"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>{isArabic ? "أضف منتجاً جديداً" : "Add New Product"}</span>
                                </button>
                                <Link
                                    href={`/${lang}/magic-bazar/store/${myStore.id}`}
                                    className="flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-full font-black text-sm shadow-md hover:bg-gray-800 transition-all flex-1 md:flex-initial justify-center"
                                >
                                    <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
                                    <span>{isArabic ? "زيارة المتجر المباشر" : "View Live Storefront"}</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Content Area */}
                    {!myStore ? (
                        /* Onboarding Banner to Create Store */
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-purple-900 via-indigo-900 to-gray-900 text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-purple-500/30 shadow-2xl"
                        >
                            <Sparkles className="absolute top-6 right-6 w-32 h-32 text-purple-400 opacity-10 animate-spin" style={{ animationDuration: '15s' }} />
                            <div className="w-24 h-24 bg-gradient-to-tr from-orange-400 to-purple-500 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-6 shadow-xl transform hover:scale-110 transition-transform">
                                🎪
                            </div>
                            <h4 className="text-3xl font-black mb-4">
                                {isArabic ? "لم تقم بإنشاء متجرك في البازار بعد!" : "You Haven't Created Your Bazar Store Yet!"}
                            </h4>
                            <p className="text-purple-200 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
                                {isArabic
                                    ? "انضم الآن إلى قائمة المتاجر الحية في ماجيكا بازار! اختر اسم متجرك الخاص، اختر الشعار المفضل، وابدأ بإضافة منتجاتك وأفكارك لتعلم فن التجارة وإدارة الأرباح."
                                    : "Join the live champions marketplace! Pick your store title and logo emblem, add your innovative goods, and learn real financial arithmetic & sales mastery."}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsStoreModalOpen(true)}
                                className="px-10 py-5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-gray-950 font-black text-xl rounded-full shadow-2xl shadow-orange-500/40 hover:brightness-110 transition-all inline-flex items-center gap-3"
                            >
                                <Store className="w-6 h-6 text-gray-950" />
                                <span>{isArabic ? "أنشئ متجرك الخاص الآن 🚀" : "Build My Mini-Store Now 🚀"}</span>
                            </motion.button>
                        </motion.div>
                    ) : (
                        /* Executive Store Overview & Products Inventory */
                        <div className="space-y-8">
                            {/* Executive Bar */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50/80 p-6 rounded-3xl border border-gray-100">
                                <div className="md:col-span-1 flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-purple-600 text-white flex items-center justify-center text-4xl shadow-md shrink-0">
                                        {myStore.logo}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 text-lg leading-tight">
                                            {isArabic ? myStore.storeNameAr : myStore.storeNameEn}
                                        </h4>
                                        <span className="text-xs text-emerald-600 font-extrabold flex items-center gap-1 mt-1">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            <span>{isArabic ? "منشور في ماجيكا بازار" : "Live in Magica Bazar"}</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 bg-white rounded-2xl border border-gray-100 text-center flex flex-col justify-center">
                                    <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">{isArabic ? "عدد المنتجات" : "Total Products"}</span>
                                    <span className="text-2xl font-black text-gray-800">{myStore.products.length} {isArabic ? "منتج" : "Items"}</span>
                                </div>

                                <div className="p-4 bg-white rounded-2xl border border-gray-100 text-center flex flex-col justify-center">
                                    <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">{isArabic ? "إجمالي قيمة المنتجات" : "Total Inventory Value"}</span>
                                    <span className="text-2xl font-black text-purple-600 font-mono">${totalRevenuePotential}</span>
                                </div>

                                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-center flex flex-col justify-center">
                                    <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                        <span>{isArabic ? "مجموع أرباح المتجر" : "Calculated Net Profit"}</span>
                                    </span>
                                    <span className="text-2xl font-black text-emerald-700 font-mono">+${totalProfitEarned} 💰</span>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div>
                                <h4 className="text-lg font-black text-gray-800 mb-4 flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <Tag className="w-5 h-5 text-orange-500" />
                                        {isArabic ? "منتجاتي المدرجة للبيع في البازار:" : "My Products Listed for Sale:"}
                                    </span>
                                    <span className="text-xs font-bold text-gray-400">{isArabic ? "الربح = سعر البيع - التكلفة" : "Profit = Sell Price - Cost"}</span>
                                </h4>

                                {myStore.products.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                        <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500 font-black text-lg mb-2">{isArabic ? "متجرك جاهز لكنه فارغ الآن!" : "Your store is ready but empty!"}</p>
                                        <p className="text-gray-400 text-xs mb-6">{isArabic ? "أضف أول منتج الآن ليظهر في صفحتك الخاصة داخل ماجيكا بازار." : "Add your first item now to appear on your official storefront."}</p>
                                        <button
                                            onClick={() => setIsProductModalOpen(true)}
                                            className="px-6 py-3 bg-orange-500 text-white font-black rounded-full text-sm shadow-md hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>{isArabic ? "أضف منتجك الأول الآن" : "Add Your First Product"}</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {myStore.products.map((p) => (
                                            <div
                                                key={p.id}
                                                className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between relative group"
                                            >
                                                <button
                                                    onClick={() => removeProductFromStore(myStore.id, p.id)}
                                                    className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                    title={isArabic ? "حذف المنتج" : "Remove item"}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>

                                                <div>
                                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-inner border border-gray-100">
                                                        {p.icon}
                                                    </div>
                                                    <h5 className="font-black text-gray-900 text-lg mb-1 leading-snug">{p.title}</h5>
                                                    <span className="text-[11px] font-extrabold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full block w-fit mb-4">
                                                        {p.category || "Magica Bazar Item"}
                                                    </span>
                                                </div>

                                                <div className="pt-4 border-t border-gray-100">
                                                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                                        <div className="bg-gray-50 p-2 rounded-xl">
                                                            <span className="text-gray-400 block font-bold">{isArabic ? "التكلفة (المواد):" : "Cost (Materials):"}</span>
                                                            <span className="font-black text-gray-700 font-mono text-sm">${p.costPrice}</span>
                                                        </div>
                                                        <div className="bg-gray-50 p-2 rounded-xl">
                                                            <span className="text-gray-400 block font-bold">{isArabic ? "سعر البيع:" : "Selling Price:"}</span>
                                                            <span className="font-black text-gray-900 font-mono text-sm">${p.sellingPrice}</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className={`p-2.5 rounded-xl font-extrabold text-xs flex items-center justify-between ${
                                                        p.profit > 0 ? "bg-emerald-500/10 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"
                                                    }`}>
                                                        <span>{isArabic ? "الربح الصافي:" : "Net Profit:"}</span>
                                                        <span className="text-sm font-black font-mono">
                                                            {p.profit >= 0 ? `+$${p.profit} 🚀` : `-$${Math.abs(p.profit)} ⚠️`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Dedicated Mind Games Scores Section */}
            <div className="space-y-6 pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div>
                        <h3 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                            <Sparkles className="w-7 h-7 text-orange-500" />
                            {isArabic ? "ألعابي ونتائجي الذهنية السحرية" : "My Mind Games & High Scores"}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                            {isArabic ? "تابع أفضل نتائجك ونجومك في التحديات الخمسة لبناء ذكائك الريادي:" : "Track your best scores, stars, and developed intelligence across the 5 games:"}
                        </p>
                    </div>
                    <Link
                        href={`/${lang}/magic-games`}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-black shadow-lg shadow-orange-500/30 hover:brightness-105 transition-all shrink-0"
                    >
                        <Play className="w-4 h-4 fill-current" />
                        <span>{isArabic ? "انتقل إلى غرفة الألعاب" : "Enter Games Arena"}</span>
                        <ChevronRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ALL_GAMES_INFO.map((game, idx) => {
                        const scoreData = gameScores[game.id] || { bestScore: 0, stars: 0, playsCount: 0, lastPlayed: "Never" };
                        
                        return (
                            <motion.div
                                key={game.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-100/80 border border-gray-100 flex flex-col justify-between hover:border-orange-200 transition-all relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-full -z-0 group-hover:from-orange-50/60 transition-colors" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${game.bgGradient} shadow-sm`}>
                                            {renderGameIcon(game.iconName)}
                                        </div>
                                        <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
                                            {isArabic ? `لعبت ${scoreData.playsCount} مرات` : `Played ${scoreData.playsCount}x`}
                                        </span>
                                    </div>

                                    <h4 className="text-xl font-black text-gray-800 mb-1">
                                        {isArabic ? game.titleAr : game.titleEn}
                                    </h4>
                                    <p className="text-xs text-gray-400 font-semibold mb-4 flex items-center gap-1.5">
                                        <Award className="w-4 h-4 text-orange-500 shrink-0" />
                                        <span>{isArabic ? game.skillAr : game.skillEn}</span>
                                    </p>
                                </div>

                                <div className="relative z-10 pt-4 border-t border-gray-100 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-400 font-bold block">{isArabic ? "أعلى النقاط" : "Best Score"}</span>
                                            <span className="text-2xl font-black text-gray-800">{scoreData.bestScore}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs text-gray-400 font-bold mb-1">{isArabic ? "التصنيف" : "Star Rating"}</span>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, sIdx) => (
                                                    <Star
                                                        key={sIdx}
                                                        className={`w-4 h-4 ${
                                                            sIdx < scoreData.stars
                                                                ? "text-yellow-400 fill-current"
                                                                : "text-gray-200"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <Link href={`/${lang}/magic-games`} className="w-full block">
                                        <button className="w-full py-2.5 bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-600 font-black text-sm rounded-2xl transition-colors border border-gray-200/60 hover:border-orange-200 flex items-center justify-center gap-2">
                                            <Play className="w-4 h-4 fill-current text-orange-500" />
                                            <span>{isArabic ? "ابدأ اللعبة" : "Play Game"}</span>
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* ========================================================= */}
            {/* MODAL 1: CREATE STORE SETUP */}
            {/* ========================================================= */}
            <AnimatePresence>
                {isStoreModalOpen && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl border border-gray-100 my-8"
                        >
                            <h3 className="text-2xl font-black text-gray-900 mb-2 flex items-center gap-2">
                                <Store className="w-7 h-7 text-orange-500" />
                                <span>{isArabic ? "تأسيس متجري السحري في البازار" : "Build Your Magica Mini-Store"}</span>
                            </h3>
                            <p className="text-xs text-gray-500 font-bold mb-6">
                                {isArabic ? "اختر أسم متجرك والشعار المناسب لتبدأ عرض منتجاتك وإدارة أرباحك في ماجيكا بازار:" : "Configure your branding identity to list products and track profits in Magica Bazar:"}
                            </p>

                            <form onSubmit={handleCreateStoreSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-black text-gray-700 mb-1">{isArabic ? "اسم مؤسس المتجر (طفل ماجيكا)" : "Founder Name"}</label>
                                    <input
                                        required
                                        type="text"
                                        value={storeForm.childName}
                                        onChange={e => setStoreForm({ ...storeForm, childName: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 outline-none font-bold text-gray-800"
                                        placeholder="e.g. Youssef Khaled"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-black text-gray-700 mb-1">{isArabic ? "اسم المتجر في البازار" : "Store Name in Bazar"}</label>
                                    <input
                                        required
                                        type="text"
                                        value={storeForm.storeNameEn}
                                        onChange={e => setStoreForm({ ...storeForm, storeNameEn: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 outline-none font-bold text-gray-800"
                                        placeholder={isArabic ? "مثال: عالم يوسف للابتكار والألعاب السحرية" : "e.g. Youssef's Tech Lab & Magic Gadgets"}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-black text-gray-700 mb-2">{isArabic ? "اختر شعار المتجر (Emblem Logo)" : "Choose Store Logo Emblem"}</label>
                                    <div className="flex flex-wrap gap-2">
                                        {storeLogosList.map((emoji) => (
                                            <button
                                                type="button"
                                                key={emoji}
                                                onClick={() => setStoreForm({ ...storeForm, logo: emoji })}
                                                className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center transition-all ${
                                                    storeForm.logo === emoji
                                                        ? "bg-gray-900 text-white shadow-lg scale-110 ring-2 ring-orange-500"
                                                        : "bg-gray-50 hover:bg-orange-50 border border-gray-200"
                                                }`}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-black text-gray-700 mb-1">{isArabic ? "وصف ومجال متجرك (ماذا تبيع وتصنع؟)" : "Store Bio & What You Sell"}</label>
                                    <textarea
                                        rows={3}
                                        value={storeForm.descriptionEn}
                                        onChange={e => setStoreForm({ ...storeForm, descriptionEn: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 outline-none font-medium resize-none text-sm"
                                        placeholder={isArabic ? "صف متجرك بكلمات مشوقة ليقبل عليه الزوار في ماجيكا بازار!" : "Describe your store engagingly to attract customers in Magica Bazar!"}
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsStoreModalOpen(false)}
                                        className="px-6 py-3 text-gray-500 font-bold hover:text-gray-800"
                                    >
                                        {isArabic ? "إلغاء" : "Cancel"}
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-extrabold rounded-2xl shadow-xl hover:brightness-110 transition-all text-base"
                                    >
                                        {isArabic ? "تأكيد ونشر المتجر في البازار 🚀" : "Publish Store to Magica Bazar 🚀"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ========================================================= */}
            {/* MODAL 2: ADD PRODUCT & FINANCIAL LITERACY CALCULATOR */}
            {/* ========================================================= */}
            <AnimatePresence>
                {isProductModalOpen && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl border border-gray-100 my-8"
                        >
                            <h3 className="text-2xl font-black text-gray-900 mb-1 flex items-center gap-2">
                                <DollarSign className="w-7 h-7 text-emerald-600" />
                                <span>{isArabic ? "إضافة منتج وتحليل الأرباح" : "Add Product & Calculate Profit"}</span>
                            </h3>
                            <p className="text-xs text-gray-500 font-bold mb-6">
                                {isArabic
                                    ? "تعلم الذكاء المالي! قم بإدخال التكلفة الأساسية وسعر البيع لترى هامش الربح المحقق في البازار:"
                                    : "Master financial intelligence! Enter material cost & selling price to evaluate your net profit margin:"}
                            </p>

                            <form onSubmit={handleAddProductSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-black text-gray-700 mb-1">{isArabic ? "اسم ومواصفات المنتج" : "Product Title"}</label>
                                    <input
                                        required
                                        type="text"
                                        value={prodForm.title}
                                        onChange={e => setProdForm({ ...prodForm, title: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 outline-none font-bold text-gray-800"
                                        placeholder={isArabic ? "مثال: سوار طاقة من الحبل والأحجار اليدوية" : "e.g. Handmade Energy Rope Bracelet"}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-black text-gray-700 mb-2">{isArabic ? "اختر أيقونة المنتج (Product Icon)" : "Choose Product Icon"}</label>
                                    <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
                                        {productIconsList.map((icon) => (
                                            <button
                                                type="button"
                                                key={icon}
                                                onClick={() => setProdForm({ ...prodForm, icon: icon })}
                                                className={`w-11 h-11 rounded-2xl text-2xl flex items-center justify-center transition-all ${
                                                    prodForm.icon === icon
                                                        ? "bg-gray-900 text-white shadow-md scale-110 ring-2 ring-emerald-500"
                                                        : "bg-gray-50 hover:bg-orange-50 border border-gray-200"
                                                }`}
                                            >
                                                {icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-gray-600 mb-1 uppercase">
                                            {isArabic ? "التكلفة (ثمن المواد)" : "Cost Price (Materials)"} ($)
                                        </label>
                                        <input
                                            required
                                            type="number"
                                            min="0"
                                            value={prodForm.costPrice}
                                            onChange={e => setProdForm({ ...prodForm, costPrice: Number(e.target.value) })}
                                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 outline-none font-black text-lg font-mono text-gray-800 text-center"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-orange-600 mb-1 uppercase">
                                            {isArabic ? "سعر البيع للجمهور" : "Selling Price"} ($)
                                        </label>
                                        <input
                                            required
                                            type="number"
                                            min="1"
                                            value={prodForm.sellingPrice}
                                            onChange={e => setProdForm({ ...prodForm, sellingPrice: Number(e.target.value) })}
                                            className="w-full px-4 py-3 rounded-2xl border-2 border-orange-300 focus:border-orange-500 outline-none font-black text-lg font-mono text-gray-900 text-center bg-orange-50/30"
                                        />
                                    </div>
                                </div>

                                {/* Interactive Financial Literacy Box */}
                                <div className={`p-4 rounded-2xl border flex items-center justify-between transition-colors ${
                                    calculatedProfit > 0
                                        ? "bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/20"
                                        : "bg-red-500 text-white border-red-600 shadow-lg shadow-red-500/20"
                                }`}>
                                    <div>
                                        <span className="text-xs uppercase tracking-wider font-black block opacity-90">
                                            {isArabic ? "التحليل المالي السريع (الربح الصافي):" : "Financial Evaluation (Net Profit Margin):"}
                                        </span>
                                        <span className="text-sm font-extrabold flex items-center gap-1 mt-0.5">
                                            {calculatedProfit > 0 ? (
                                                <><span>{isArabic ? "ممتاز! أنت رائد أعمال ذكي 💡" : "Excellent! You are building profitable equity! 💡"}</span></>
                                            ) : (
                                                <><AlertTriangle className="w-4 h-4 shrink-0" /><span>{isArabic ? "احذر! لا يمكنك البيع بخسارة أو بدون ربح ⚠️" : "Warning: Selling below cost generates zero profit ⚠️"}</span></>
                                            )}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-black font-mono tracking-tight shrink-0 bg-black/20 px-3.5 py-1.5 rounded-xl border border-white/20">
                                        {calculatedProfit >= 0 ? `+$${calculatedProfit}` : `-$${Math.abs(calculatedProfit)}`}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsProductModalOpen(false)}
                                        className="px-6 py-3 text-gray-500 font-bold hover:text-gray-800"
                                    >
                                        {isArabic ? "إلغاء" : "Cancel"}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={calculatedProfit < 0}
                                        className={`px-8 py-3.5 font-extrabold rounded-2xl shadow-xl transition-all text-base ${
                                            calculatedProfit >= 0
                                                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110 shadow-emerald-500/30"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                    >
                                        {isArabic ? "إدراج المنتج في متجر البازار 🛍️" : "Add to Live Storefront 🛍️"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

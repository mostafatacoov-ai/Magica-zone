"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
    Package, PenTool, BookOpen, Compass, Sparkles, Star, ArrowRight, CheckCircle, 
    ShoppingBag, ShoppingCart, Filter, Search, Tag, Check, X, Plus, Minus, Phone, MapPin, User
} from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";
import { useCMSData, SupplyKit } from "@/lib/cms/contentStore";

const CATEGORIES = [
    { id: "ALL", en: "All Supplies & Store", ar: "جميع المنتجات والمتجر", icon: "🏬" },
    { id: "Bags & Backpacks", en: "Bags & Backpacks", ar: "الحقائب والحزم المدرسية", icon: "🎒", highlight: true },
    { id: "Robotics & AI Kits", en: "Robotics & AI Kits", ar: "أطقم الروبوت والذكاء الاصطناعي", icon: "🤖" },
    { id: "Stationery & Tools", en: "Stationery & Tools", ar: "الأدوات والقرطاسية الذكية", icon: "✏️" },
];

export default function MagicSuppliesPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';
    const { data } = useCMSData();
    const products = data.supplies || [];

    // Storefront States
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [cart, setCart] = useState<{ item: SupplyKit; count: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);

    // Checkout Form State
    const [customerName, setCustomerName] = useState<string>("");
    const [customerPhone, setCustomerPhone] = useState<string>("");
    const [customerAddress, setCustomerAddress] = useState<string>("");

    // Filter Products by Category and Search Query
    const filteredProducts = useMemo(() => {
        return products.filter(item => {
            const matchesCategory = selectedCategory === "ALL" || 
                item.categoryEn === selectedCategory || 
                item.categoryAr === (CATEGORIES.find(c => c.id === selectedCategory)?.ar || selectedCategory);

            const matchesSearch = !searchQuery.trim() || 
                (item.titleEn?.toLowerCase().includes(searchQuery.toLowerCase())) || 
                (item.titleAr?.toLowerCase().includes(searchQuery.toLowerCase())) || 
                (item.descEn?.toLowerCase().includes(searchQuery.toLowerCase())) || 
                (item.descAr?.toLowerCase().includes(searchQuery.toLowerCase()));

            return matchesCategory && matchesSearch;
        });
    }, [products, selectedCategory, searchQuery]);

    const handleAddToCart = (item: SupplyKit) => {
        setCart(prev => {
            const idx = prev.findIndex(c => c.item.id === item.id);
            if (idx !== -1) {
                const copy = [...prev];
                copy[idx] = { ...copy[idx], count: copy[idx].count + 1 };
                return copy;
            }
            return [...prev, { item, count: 1 }];
        });
        setIsCartOpen(true);
        setOrderSubmitted(false);
    };

    const updateCartCount = (id: string, delta: number) => {
        setCart(prev => prev.map(c => {
            if (c.item.id === id) {
                const nextCount = c.count + delta;
                return nextCount > 0 ? { ...c, count: nextCount } : null;
            }
            return c;
        }).filter(Boolean) as { item: SupplyKit; count: number }[]);
    };

    const removeCartItem = (id: string) => {
        setCart(prev => prev.filter(c => c.item.id !== id));
    };

    const totalCartItems = cart.reduce((sum, c) => sum + c.count, 0);
    const totalEgp = cart.reduce((sum, c) => sum + ((c.item.price || 0) * c.count), 0);

    const handleSubmitOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setOrderSubmitted(true);
        setCart([]);
    };

    const features = [
        {
            icon: PenTool,
            color: "text-rose-500",
            bg: "bg-rose-500/15",
            title: isArabic ? "مصممة للإبداع" : "Designed for Creativity",
            desc: isArabic
                ? "أدوات تشجع الطفل على الرسم، البناء، الكتابة — ليس فقط الحفظ."
                : "Tools that encourage children to draw, build, write — not just memorize.",
        },
        {
            icon: BookOpen,
            color: "text-pink-500",
            bg: "bg-pink-500/15",
            title: isArabic ? "رفيق التعلم اليومي" : "Daily Learning Companion",
            desc: isArabic
                ? "كل أداة مصممة لتجعل التعلم أكثر متعة وأعمق أثرًا في الحياة اليومية."
                : "Every tool is designed to make learning more enjoyable and impactful in daily life.",
        },
        {
            icon: Package,
            color: "text-rose-600",
            bg: "bg-rose-600/15",
            title: isArabic ? "جودة لا تُقارن" : "Unmatched Quality",
            desc: isArabic
                ? "أدوات تتحمل الاستخدام اليومي المكثف — لأن الطفل الجاد يستحق أدوات جادة."
                : "Tools that withstand intensive daily use — because a serious child deserves serious tools.",
        },
        {
            icon: Compass,
            color: "text-pink-600",
            bg: "bg-pink-600/15",
            title: isArabic ? "للطفل الطموح" : "For the Ambitious Child",
            desc: isArabic
                ? "مجموعة كاملة تناسب من يؤمن أن التفاصيل الصغيرة تصنع النتائج الكبيرة."
                : "A complete collection for those who believe small details create big results.",
        },
        {
            icon: Star,
            color: "text-rose-400",
            bg: "bg-rose-400/15",
            title: isArabic ? "تصاميم ملهمة" : "Inspiring Designs",
            desc: isArabic
                ? "بألوان وتصاميم ماجيكا زون — كل أداة تذكّر الطفل بمن يريد أن يكون."
                : "With Magica Zone colors and designs — every tool reminds children of who they want to become.",
        },
        {
            icon: Sparkles,
            color: "text-pink-400",
            bg: "bg-pink-400/15",
            title: isArabic ? "كاملة ومتكاملة" : "Complete & Comprehensive",
            desc: isArabic
                ? "من القلم إلى الكتاب إلى الدفتر — كل ما يحتاجه الطفل في مكان واحد."
                : "From pen to book to notebook — everything a child needs in one place.",
        },
    ];

    return (
        <main className="min-h-screen font-[family-name:var(--font-inter)] text-gray-800 overflow-hidden relative pb-24">
            <MagicalBackground />

            {/* Hero Section */}
            <section className="relative pt-36 pb-20 px-6 z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-rose-200 shadow-sm mb-8"
                    >
                        <span className="text-2xl">🏬</span>
                        <span className="text-sm font-black text-rose-600 uppercase tracking-widest">
                            {isArabic ? "المتجر الإلكتروني المباشر (Magica Store)" : "Magica Online Store"}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-7xl font-black text-gray-800 mb-6 leading-tight"
                    >
                        {isArabic ? (
                            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">متجر ماجيكا</span> للحقائب والأدوات</>
                        ) : (
                            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Magica Online Store</span> for Bags & Tools</>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed font-semibold"
                    >
                        {isArabic
                            ? "تصفح أحدث التشكيلات الرسمية للحقائب المدرسية، صناديق الروبوت، ومستلزمات القيادة بالجنيه المصري (ج.م)."
                            : "Browse the official collection of school backpacks, robotics boxes, and entrepreneurship tools priced in Egyptian Pounds (EGP)."}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-4 mt-8"
                    >
                        <a
                            href="#online-store"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-rose-500/30"
                        >
                            <ShoppingBag className="w-6 h-6" />
                            <span>{isArabic ? "تصفح قسم الحقائب والمنتجات" : "Shop Bags & Products Now"}</span>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Online Storefront Section */}
            <section id="online-store" className="relative z-10 py-16 px-6 bg-gradient-to-b from-rose-50/30 via-white/80 to-rose-50/20 border-y border-rose-100/60 backdrop-blur-md">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Store Header & Category Filter Pills */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-rose-100 pb-8">
                        <div className="text-start w-full md:w-auto">
                            <h2 className="text-3xl font-black text-gray-900 flex items-center gap-2.5">
                                <span className="p-2.5 bg-rose-500 text-white rounded-2xl shadow-md">🎒</span>
                                <span>{isArabic ? "كتالوج منتجات ماجيكا سبلايز" : "Magica Supplies Catalog"}</span>
                            </h2>
                            <p className="text-sm font-bold text-gray-500 mt-1">
                                {isArabic ? "جميع الأسعار معروضة بالجنيه المصري (ج.م) وشاملة ضمان الجودة." : "All prices are in Egyptian Pounds (EGP) with guaranteed premium durability."}
                            </p>
                        </div>

                        {/* Search Box */}
                        <div className="relative w-full md:w-80">
                            <Search className={`absolute ${isArabic ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder={isArabic ? "ابحث عن حقيبة، صندوق روبوت..." : "Search bag, robotics kit..."}
                                className={`w-full ${isArabic ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4'} py-3 bg-white border border-gray-200 focus:border-rose-500 rounded-2xl text-sm font-bold shadow-sm outline-none transition-all`}
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-xs text-gray-400 font-bold bg-gray-100 hover:bg-gray-200 p-1 rounded-lg`}>
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-12">
                        {CATEGORIES.map((cat) => {
                            const isActive = selectedCategory === cat.id || selectedCategory === cat.en;
                            const count = cat.id === "ALL" 
                                ? products.length 
                                : products.filter(p => p.categoryEn === cat.en || p.categoryAr === cat.ar).length;

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm border ${
                                        isActive 
                                            ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white border-transparent shadow-lg shadow-rose-500/20 scale-105" 
                                            : "bg-white text-gray-700 border-gray-200 hover:border-rose-300 hover:bg-rose-50/30"
                                    }`}
                                >
                                    <span className="text-base">{cat.icon}</span>
                                    <span>{isArabic ? cat.ar : cat.en}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 p-8">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-xl font-black text-gray-800 mb-2">{isArabic ? "لم يتم العثور على منتجات مطابقة" : "No Matching Products Found"}</h3>
                            <p className="text-gray-500 text-sm font-medium">{isArabic ? "جرب البحث بكلمات أخرى أو اختر قسمًا آخر." : "Try searching with different keywords or switch categories."}</p>
                            <button onClick={() => { setSelectedCategory("ALL"); setSearchQuery(""); }} className="mt-4 px-6 py-2.5 bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md">
                                {isArabic ? "عرض جميع المنتجات" : "View All Products"}
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                            {filteredProducts.map((item, idx) => {
                                const isPriceHidden = !item.price || item.price <= 0;

                                return (
                                    <motion.div
                                        key={item.id || idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (idx % 3) * 0.08 }}
                                        whileHover={{ y: -6 }}
                                        className="bg-white/95 backdrop-blur-md rounded-3xl border border-rose-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                                    >
                                        <div>
                                            {/* Image Section */}
                                            <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-rose-50 to-gray-50 flex items-center justify-center">
                                                {item.imageUrl ? (
                                                    <img 
                                                        src={item.imageUrl} 
                                                        alt={isArabic ? item.titleAr : item.titleEn} 
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <span className="text-7xl animate-pulse">🎒</span>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                                                
                                                {/* Price Chip in EGP */}
                                                {!isPriceHidden ? (
                                                    <div className="absolute bottom-3 right-3 bg-rose-600 text-white font-black text-sm px-4 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-1">
                                                        <span>{item.price}</span>
                                                        <span className="text-xs font-extrabold">{isArabic ? "ج.م" : "EGP"}</span>
                                                    </div>
                                                ) : (
                                                    <div className="absolute bottom-3 right-3 bg-gray-900/90 text-amber-300 font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg border border-white/10 backdrop-blur-md">
                                                        {isArabic ? "السعر عند الطلب" : "Price Upon Inquiry"}
                                                    </div>
                                                )}

                                                {/* Badge */}
                                                {(item.badgeEn || item.badgeAr) && (
                                                    <span className="absolute top-3 left-3 bg-white/95 text-rose-600 font-black text-xs px-3 py-1 rounded-full shadow-md backdrop-blur-md border border-rose-100">
                                                        {isArabic ? item.badgeAr : item.badgeEn}
                                                    </span>
                                                )}

                                                {/* Category Chip */}
                                                <span className="absolute bottom-3 left-3 bg-black/60 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg backdrop-blur-md">
                                                    {isArabic ? (item.categoryAr || "حقائب مدرسية") : (item.categoryEn || "Bags & Backpacks")}
                                                </span>
                                            </div>

                                            {/* Details Section */}
                                            <div className="p-6 text-start">
                                                <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-rose-600 transition-colors line-clamp-1">
                                                    {isArabic ? item.titleAr : item.titleEn}
                                                </h3>
                                                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 min-h-[3.8rem]">
                                                    {isArabic ? item.descAr : item.descEn}
                                                </p>
                                                
                                                {(item.featuresEn || item.featuresAr) && (
                                                    <div className="border-t border-rose-100/60 pt-3">
                                                        <div className="text-[10px] font-black uppercase text-gray-400 mb-1.5">
                                                            {isArabic ? "أهم المميزات المضمونة:" : "Guaranteed Highlights:"}
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {(isArabic ? (item.featuresAr || item.featuresEn) : item.featuresEn)?.map((feat, i) => (
                                                                <span key={i} className="bg-rose-50 text-rose-700 font-extrabold text-[11px] px-2.5 py-0.5 rounded-lg border border-rose-100/80">
                                                                    ✦ {feat}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="px-6 pb-6 pt-2">
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                className="w-full py-3 bg-gray-900 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-600 text-white font-black text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 group/btn active:scale-95"
                                            >
                                                <ShoppingCart className="w-4 h-4 text-rose-400 group-hover/btn:text-white transition-colors" />
                                                <span>{isArabic ? "إضافة لسلة التسوق" : "Add to Cart"}</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Magica Supplies */}
            <section className="relative z-10 py-24 px-6 bg-white/40 backdrop-blur-sm border-y border-gray-200/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-gray-800">
                            {isArabic ? "لماذا ماجيكا سبلايز؟" : "Why Magica Supplies?"}
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                whileHover={{ y: -6 }}
                                className="p-7 rounded-3xl bg-white/90 border border-rose-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-5`}>
                                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                                </div>
                                <h3 className="text-xl font-black mb-3 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Floating Shopping Cart Widget Button */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-6 right-6 z-40 flex items-center gap-2"
            >
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="px-6 py-4 bg-gray-900 text-white rounded-full font-black text-sm shadow-2xl hover:scale-105 border-2 border-rose-500 flex items-center gap-3 transition-all"
                >
                    <div className="relative">
                        <ShoppingBag className="w-6 h-6 text-rose-400" />
                        {totalCartItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                                {totalCartItems}
                            </span>
                        )}
                    </div>
                    <div className="text-start">
                        <div className="text-xs text-gray-300 uppercase leading-none font-bold">
                            {isArabic ? "سلة المتجر المباشر" : "Store Cart"}
                        </div>
                        <div className="text-sm font-black text-rose-400">
                            {totalEgp} {isArabic ? "ج.م" : "EGP"}
                        </div>
                    </div>
                </button>
            </motion.div>

            {/* Shopping Cart Drawer / Modal */}
            <AnimatePresence>
                {isCartOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="w-full max-w-lg h-full bg-white shadow-2xl flex flex-col justify-between p-6 md:p-8 overflow-y-auto"
                        >
                            {/* Header */}
                            <div>
                                <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2.5 bg-rose-50 text-rose-600 rounded-2xl">
                                            <ShoppingBag className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-900">
                                                {isArabic ? "سلة متجر ماجيكا سبلايز" : "Your Magica Cart"}
                                            </h3>
                                            <p className="text-xs text-gray-400 font-bold">
                                                {isArabic ? `${totalCartItems} منتج في السلة` : `${totalCartItems} items in cart`}
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsCartOpen(false)} className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {orderSubmitted ? (
                                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-16 text-center">
                                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-md">
                                            🎉
                                        </div>
                                        <h4 className="text-2xl font-black text-gray-900 mb-2">
                                            {isArabic ? "تم استلام طلبك بنجاح!" : "Order Placed Successfully!"}
                                        </h4>
                                        <p className="text-gray-500 text-sm max-w-xs mx-auto font-medium mb-8">
                                            {isArabic
                                                ? "شكراً لتسوقك من ماجيكا سبلايز. سيقوم فريق الخدمات واللوجستيات بالتواصل معكم قريباً لتأكيد الشحن وتوصيل الحقائب."
                                                : "Thank you for choosing Magica Supplies. Our logistics team will contact you shortly to confirm delivery details."}
                                        </p>
                                        <button onClick={() => { setIsCartOpen(false); setOrderSubmitted(false); }} className="px-8 py-3.5 bg-gray-900 text-white font-black text-sm rounded-2xl hover:bg-rose-600 transition-colors shadow-lg">
                                            {isArabic ? "العودة لتصفح الحقائب" : "Back to Catalog"}
                                        </button>
                                    </motion.div>
                                ) : cart.length === 0 ? (
                                    <div className="py-20 text-center">
                                        <div className="w-20 h-20 bg-rose-50 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                            🎒
                                        </div>
                                        <h4 className="font-black text-gray-700 text-lg mb-1">{isArabic ? "سلة التسوق فارغة حاليًا" : "Your Cart is Empty"}</h4>
                                        <p className="text-gray-400 text-xs font-medium mb-6">{isArabic ? "اختر حقائبك الميكانيكية المفضلة وأطقم الروبوت للبدء." : "Add some backpacks or AI kits to get started."}</p>
                                        <button onClick={() => setIsCartOpen(false)} className="px-6 py-3 bg-rose-500 text-white text-xs font-black rounded-xl shadow-md">
                                            {isArabic ? "استعرض قسم الحقائب الآن" : "Browse Bags & Backpacks"}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-6 space-y-4 max-h-[40vh] overflow-y-auto pr-1">
                                        {cart.map((c, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
                                                {c.item.imageUrl ? (
                                                    <img src={c.item.imageUrl} alt="Bag" className="w-16 h-16 object-cover rounded-xl border border-white shadow-sm shrink-0" />
                                                ) : (
                                                    <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-xl flex items-center justify-center text-2xl shrink-0">🎒</div>
                                                )}
                                                <div className="flex-grow text-start">
                                                    <h5 className="font-black text-sm text-gray-900 line-clamp-1">{isArabic ? c.item.titleAr : c.item.titleEn}</h5>
                                                    <div className="text-xs font-black text-rose-600 mt-1">
                                                        {(c.item.price || 0)} {isArabic ? "ج.م" : "EGP"}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-gray-200 shadow-xs shrink-0">
                                                    <button onClick={() => updateCartCount(c.item.id, -1)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 font-bold">
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="font-black text-xs w-5 text-center">{c.count}</span>
                                                    <button onClick={() => updateCartCount(c.item.id, 1)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 font-bold">
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                                <button onClick={() => removeCartItem(c.item.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Checkout Actions */}
                            {!orderSubmitted && cart.length > 0 && (
                                <form onSubmit={handleSubmitOrder} className="pt-6 border-t border-gray-100 mt-auto space-y-4">
                                    <div className="space-y-3 bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
                                        <div className="text-xs font-black text-gray-700 mb-1 flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5 text-rose-500" />
                                            <span>{isArabic ? "بيانات استلام الطلب والشحن:" : "Delivery Information:"}</span>
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={customerName}
                                            onChange={e => setCustomerName(e.target.value)}
                                            placeholder={isArabic ? "الاسم الكامل للطالب أو ولي الأمر" : "Student or Parent Full Name"}
                                            className={`w-full ${isArabic ? 'text-right' : ''} px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold shadow-sm outline-none focus:border-rose-500`}
                                        />
                                        <div className="flex gap-2">
                                            <input
                                                type="tel"
                                                required
                                                value={customerPhone}
                                                onChange={e => setCustomerPhone(e.target.value)}
                                                placeholder={isArabic ? "رقم الهاتف / وتساب للتواصل" : "Phone / WhatsApp Number"}
                                                className={`w-1/2 ${isArabic ? 'text-right' : ''} px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold shadow-sm outline-none focus:border-rose-500`}
                                            />
                                            <input
                                                type="text"
                                                required
                                                value={customerAddress}
                                                onChange={e => setCustomerAddress(e.target.value)}
                                                placeholder={isArabic ? "العنوان بالتفصيل (المحافظة والمنطقة)" : "Detailed Address (City / Area)"}
                                                className={`w-1/2 ${isArabic ? 'text-right' : ''} px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold shadow-sm outline-none focus:border-rose-500`}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-2xl shadow-md">
                                        <div>
                                            <span className="text-xs font-medium text-gray-400 block">{isArabic ? "المبلغ الإجمالي للدفع عند الاستلام:" : "Total Cash on Delivery Amount:"}</span>
                                            <span className="text-2xl font-black text-rose-400">{totalEgp} {isArabic ? "ج.م" : "EGP"}</span>
                                        </div>
                                        <button type="submit" className="px-6 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:brightness-110 text-white rounded-xl font-black text-sm shadow-lg shadow-rose-500/30 transition-all active:scale-95">
                                            {isArabic ? "تأكيد وإرسال الطلب" : "Confirm Order"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}

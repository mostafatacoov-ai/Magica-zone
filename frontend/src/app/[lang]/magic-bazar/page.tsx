"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import bazarLogo from "../../../../public/magica-bazar-print.png";
import { ShoppingBag, TrendingUp, Users, DollarSign, Lightbulb, Star, ArrowRight, CheckCircle, Store, Sparkles, ChevronRight } from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";
import { useState, useEffect } from "react";
import { getKidStores, KidStore } from "@/lib/bazar/kidStores";
import { useCMSData } from "@/lib/cms/contentStore";

export default function MagicBazarPage({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';
    const { data: cmsData } = useCMSData();
    const [stores, setStores] = useState<KidStore[]>([]);

    useEffect(() => {
        setStores(getKidStores());
        const handleUpdate = () => setStores(getKidStores());
        window.addEventListener("magica-stores-updated", handleUpdate);
        return () => window.removeEventListener("magica-stores-updated", handleUpdate);
    }, []);

    const features = [
        {
            icon: ShoppingBag,
            color: "text-magica-orange-500",
            bg: "bg-magica-orange-500/15",
            title: isArabic ? "العرض والبيع" : "Pitch & Sell",
            desc: isArabic
                ? "يتعلم الطفل كيف يعرض منتجه بثقة، ويقنع الآخرين بقيمته."
                : "Children learn how to present their product with confidence and convince others of its value.",
        },
        {
            icon: DollarSign,
            color: "text-magica-orange-600",
            bg: "bg-magica-orange-600/15",
            title: isArabic ? "إدارة المال" : "Money Management",
            desc: isArabic
                ? "مقدمة عملية لمفاهيم التسعير، الربح، والتكلفة — بطريقة يفهمها الأطفال."
                : "A practical introduction to pricing, profit, and cost concepts — in a way children understand.",
        },
        {
            icon: TrendingUp,
            color: "text-magica-purple-500",
            bg: "bg-magica-purple-500/15",
            title: isArabic ? "التفاوض" : "Negotiation",
            desc: isArabic
                ? "فن الوصول إلى اتفاق يُرضي الطرفين — مهارة يحتاجها كل إنسان ناجح."
                : "The art of reaching a mutually beneficial agreement — a skill every successful person needs.",
        },
        {
            icon: Lightbulb,
            color: "text-magica-yellow-500",
            bg: "bg-magica-yellow-500/15",
            title: isArabic ? "التفكير الريادي" : "Entrepreneurial Thinking",
            desc: isArabic
                ? "من فكرة إلى منتج إلى بيع — الطفل يعيش دورة ريادة الأعمال كاملة."
                : "From idea to product to sale — children live the complete entrepreneurship cycle.",
        },
        {
            icon: Users,
            color: "text-magica-orange-700",
            bg: "bg-magica-orange-700/15",
            title: isArabic ? "خدمة العملاء" : "Customer Service",
            desc: isArabic
                ? "كيف تتعامل مع الزبون؟ كيف تبني علاقة؟ كيف تخدم بامتياز؟"
                : "How do you deal with a customer? How do you build a relationship? How do you serve with excellence?",
        },
        {
            icon: Star,
            color: "text-magica-purple-600",
            bg: "bg-magica-purple-600/15",
            title: isArabic ? "بناء الثقة" : "Building Confidence",
            desc: isArabic
                ? "السوق الحقيقي يمنح الطفل ثقة حقيقية — ليس من الكتب، بل من التجربة المباشرة."
                : "The real market gives children real confidence — not from books, but from direct experience.",
        },
    ];

    const steps = [
        { num: "01", title: isArabic ? "اختر منتجك" : "Choose Your Product", desc: isArabic ? "كل طفل يقرر ماذا يريد أن يبيع" : "Every child decides what they want to sell" },
        { num: "02", title: isArabic ? "جهّز كشكك" : "Set Up Your Stall", desc: isArabic ? "صمّم، رتّب، واعرض بطريقتك" : "Design, arrange, and display your way" },
        { num: "03", title: isArabic ? "ابدأ البيع" : "Start Selling", desc: isArabic ? "تفاوض، أقنع، وأتمّ الصفقة" : "Negotiate, convince, and close the deal" },
        { num: "04", title: isArabic ? "احسب الأرباح" : "Count Your Profits", desc: isArabic ? "تعلّم من النتائج وابدأ من جديد" : "Learn from results and start again" },
    ];

    return (
        <main className="min-h-screen font-[family-name:var(--font-inter)] text-gray-800 overflow-hidden relative pb-20">
            <MagicalBackground />

            {/* Hero */}
            <section className="relative pt-36 pb-20 px-6 z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="mb-8"
                    >
                        <Image src={bazarLogo} alt="Magica Bazar" className="h-32 w-auto mx-auto object-contain drop-shadow-md" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black text-gray-800 mb-6 leading-tight"
                    >
                        {isArabic ? (
                            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-magica-orange-500 to-magica-purple-600">اشتري. بيع.</span> تعلّم. انجح.</>
                        ) : (
                            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-magica-orange-500 to-magica-purple-600">Buy. Sell.</span> Learn. Succeed.</>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed"
                    >
                        {isArabic
                            ? "هنا لا يكون الطفل زائرًا — بل صاحب عمل ومتجر مستقل."
                            : "Here, the child isn't a visitor — they're an official business & store owner."}
                    </motion.p>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        {isArabic
                            ? "ماجيكا بازار هو أول سوق حقيقي يتعلم فيه الطفل كيف يعرض، يبيع، يتفاوض، ويدير متجره المصغر بأرباحه وتكلفته الفعلية!"
                            : "Magica Bazar is the first real marketplace where children learn to pitch, sell, negotiate, and manage their mini-stores with computed cost & profits!"}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <Link
                            href="#kid-stores-gallery"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-magica-orange-500 to-magica-purple-600 text-white rounded-full font-black text-lg hover:scale-105 transition-transform shadow-xl shadow-magica-orange-500/30"
                        >
                            <Store className="w-5 h-5" />
                            <span>{isArabic ? "تصفح متاجر الأطفال الحية" : "Explore Live Kid Stores"}</span>
                        </Link>
                        <Link
                            href={`/${lang}/login`}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-full font-black text-lg shadow-md hover:border-magica-orange-500 transition-all"
                        >
                            <span>{isArabic ? "أنشئ متجرك من لوحتي" : "Build Store in Dashboard"}</span>
                            <ArrowRight className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* FEATURED CMS BAZAR MARKETPLACE & PHOTO GALLERY */}
            {/* ========================================================= */}
            {cmsData.bazar && cmsData.bazar.length > 0 && (
                <section className="relative z-10 py-16 px-6 max-w-7xl mx-auto border-t border-b border-gray-100 mb-16 bg-gradient-to-b from-orange-50/20 via-white to-purple-50/20 rounded-3xl">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-500/10 text-purple-600 font-extrabold text-xs uppercase tracking-wider mb-4 border border-purple-500/20">
                            <ShoppingBag className="w-4 h-4 text-purple-500" />
                            <span>{isArabic ? "المنتجات المميزة في السوق" : "Featured Marketplace Products"}</span>
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
                            {isArabic ? "أحدث منتجات أبطالنا بالصور الحية" : "Latest Products with Live Photography"}
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base font-medium">
                            {isArabic ? "تصفح أحدث المنتجات المضافة مباشرة من إدارة السوق والمؤسسين الصغار" : "Browse latest merchandise listed directly by our marketplace management & young founders"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cmsData.bazar.map((item, idx) => (
                            <motion.div
                                key={item.id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="relative h-56 w-full bg-gradient-to-tr from-purple-50 to-orange-50 overflow-hidden flex items-center justify-center">
                                        {item.imageUrl ? (
                                            <img src={item.imageUrl} alt={isArabic ? item.titleAr : item.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <span className="text-6xl">🛍️</span>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <span className="absolute bottom-3 right-3 bg-orange-500 text-white font-black text-sm px-3.5 py-1 rounded-full shadow-md">
                                            ${item.price}
                                        </span>
                                        {item.category && (
                                            <span className="absolute top-3 left-3 bg-white/90 text-purple-700 font-black text-xs px-3 py-1 rounded-full shadow backdrop-blur-md">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-6 text-start">
                                        {(item.storeName || item.childName) && (
                                            <div className="text-xs font-black uppercase text-orange-500 tracking-wide mb-1.5 flex items-center gap-1.5">
                                                <span>🏬 {item.storeName}</span>
                                                {item.childName && <span>• 👤 {item.childName}</span>}
                                            </div>
                                        )}
                                        <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                            {isArabic ? item.titleAr : item.titleEn}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            {isArabic ? item.descAr : item.descEn}
                                        </p>
                                    </div>
                                </div>

                                <div className="px-6 pb-6">
                                    <Link href="#kid-stores-gallery" className="block w-full">
                                        <button className="w-full py-3 bg-gray-900 hover:bg-orange-500 text-white rounded-2xl font-black text-sm transition-colors flex items-center justify-center gap-2 shadow">
                                            <span>{isArabic ? "تصفح المتجر للشراء" : "Browse Store to Support"} 🛍️</span>
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* ========================================================= */}
            {/* LIVE KID MINI-STORES GALLERY SECTION */}
            {/* ========================================================= */}
            <section id="kid-stores-gallery" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500/10 text-orange-600 font-extrabold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        <span>{isArabic ? "المعرض الحصري لممتلكات الأبطال" : "Champions Marketplace Showcase"}</span>
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                        {isArabic ? "المتاجر المصغرة لرواد ماجيكا الصغار" : "Magica Champions Live Mini-Stores"}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed">
                        {isArabic
                            ? "كل طفل هنا أنشأ متجره الخاص، حدد منتجاته الابتكارية، وقام بحساب أسعار التكلفة والبيع. اضغط على أي متجر لزيارة صفحته الخاصة والتفاعل معه!"
                            : "Every child has built their brand storefront, crafted products, and analyzed cost vs profit arithmetic. Click any store to visit its dedicated live storefront!"}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stores.map((store, idx) => (
                        <motion.div
                            key={store.id}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 hover:border-orange-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
                        >
                            {/* Top Accent Bar */}
                            <div className={`h-3.5 bg-gradient-to-r ${store.colorTheme || "from-orange-500 to-purple-600"} w-full`} />

                            <div className="p-8 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between gap-4 mb-6">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-gray-50 to-purple-50 flex items-center justify-center text-5xl shadow-sm border border-gray-100 transform group-hover:scale-110 transition-transform">
                                            {store.logo}
                                        </div>
                                        <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-purple-50 text-purple-700 border border-purple-100 shadow-sm flex items-center gap-1">
                                            <CheckCircle className="w-3.5 h-3.5 text-purple-600" />
                                            <span>{store.products.length} {isArabic ? "منتجات" : "Products"}</span>
                                        </span>
                                    </div>

                                    <div className="text-xs font-black uppercase text-orange-500 tracking-wide mb-1">
                                        {isArabic ? `المؤسس الصغير: ${store.childName}` : `Founder Champion: ${store.childName}`}
                                    </div>

                                    <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-orange-600 transition-colors leading-snug">
                                        {isArabic ? store.storeNameAr : store.storeNameEn}
                                    </h3>

                                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3">
                                        {isArabic ? store.descriptionAr : store.descriptionEn}
                                    </p>
                                </div>

                                <div>
                                    {/* Products Preview Chips */}
                                    {store.products && store.products.length > 0 && (
                                        <div className="mb-6 pt-4 border-t border-gray-100/80">
                                            <span className="text-[11px] font-extrabold text-gray-400 block uppercase tracking-wider mb-2">
                                                {isArabic ? "عينة من المعروضات:" : "Top Featured Goods:"}
                                            </span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {store.products.slice(0, 3).map((prod) => (
                                                    <span key={prod.id} className="bg-gray-100 text-gray-800 text-xs font-extrabold px-3 py-1 rounded-xl flex items-center gap-1">
                                                        <span>{prod.icon}</span>
                                                        <span className="truncate max-w-[110px]">{prod.title.split("/")[0]}</span>
                                                        <span className="text-orange-600 font-mono font-black">${prod.sellingPrice}</span>
                                                    </span>
                                                ))}
                                                {store.products.length > 3 && (
                                                    <span className="bg-orange-50 text-orange-600 font-black text-xs px-2.5 py-1 rounded-xl">
                                                        +{store.products.length - 3} {isArabic ? "آخرين" : "more"}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Visit Dedicated Storefront CTA */}
                                    <Link href={`/${lang}/magic-bazar/store/${store.id}`} className="block w-full">
                                        <button className={`w-full py-4 rounded-2xl font-black text-white shadow-lg bg-gradient-to-r ${store.colorTheme || "from-orange-500 to-purple-600"} hover:brightness-110 transition-all flex items-center justify-center gap-2 text-base`}>
                                            <Store className="w-5 h-5" />
                                            <span>{isArabic ? "زيارة المتجر والشراء 🛍️" : "Visit Storefront 🛍️"}</span>
                                            <ChevronRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Build Your Own Promo Card */}
                    <motion.div
                        whileHover={{ y: -8 }}
                        className="bg-gradient-to-br from-gray-900 to-indigo-950 text-white rounded-3xl p-8 shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden border border-white/10"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-5xl mb-6 animate-pulse">
                            🏪
                        </div>
                        <h3 className="text-2xl font-black mb-3 leading-snug">
                            {isArabic ? "هل تريد إنشاء متجرك هنا؟" : "Want Your Own Store Here?"}
                        </h3>
                        <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-8 font-medium">
                            {isArabic
                                ? "انضم الآن إلى قائمة المتاجر الملكية في ماجيكا بازار! سجل الدخول إلى لوحة الطفل وابدأ بإضافة أفكارك ومنتجاتك فورًا."
                                : "Launch your entrepreneurial journey! Log into the Child Dashboard, set your store name, logo, and list items with calculated profits!"}
                        </p>
                        <Link href={`/${lang}/login`} className="w-full">
                            <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/30 hover:brightness-110 transition-all text-base">
                                {isArabic ? "اذهب للوحة التحكم الآن 🚀" : "Go to Dashboard Now 🚀"}
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Quote Banner */}
            <section className="relative z-10 py-12 bg-gradient-to-r from-magica-orange-500 to-magica-purple-600">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-white text-2xl md:text-3xl font-black">
                        {isArabic
                            ? "\"أفضل درس في ريادة الأعمال لا يُدرَّس في فصل — بل يُعاش في السوق.\""
                            : "\"The best entrepreneurship lesson isn't taught in a classroom — it's lived in the market.\""}
                    </p>
                </div>
            </section>

            {/* How It Works */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-800 mb-4">
                            {isArabic ? "كيف يعمل البازار؟" : "How the Bazar Works?"}
                        </h2>
                        <p className="text-gray-500 text-lg max-w-xl mx-auto">
                            {isArabic ? "أربع خطوات بسيطة، درس لا يُنسى في الأرباح وإدارة التجارة" : "Four simple steps, an unforgettable lesson in profit & commerce"}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/80 backdrop-blur-md p-7 rounded-3xl border border-magica-orange-100 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group"
                            >
                                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-magica-yellow-400 to-magica-orange-600 mb-4 group-hover:scale-110 transition-transform inline-block">{step.num}</div>
                                <h3 className="text-lg font-black text-gray-800 mb-2">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Grid */}
            <section className="relative z-10 py-24 px-6 bg-white/40 backdrop-blur-sm border-y border-gray-200/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-gray-800 mb-4">
                            {isArabic ? "ما يتعلمه طفلك في متجر البازار" : "What Your Child Learns in Their Mini-Store"}
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
                                className="p-7 rounded-3xl bg-white/90 border border-magica-orange-100 shadow-sm hover:shadow-xl transition-all duration-300"
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
        </main>
    );
}

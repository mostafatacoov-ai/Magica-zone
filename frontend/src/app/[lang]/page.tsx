"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, TrendingUp, Target, CheckCircle2 } from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCMSData } from "@/lib/cms/contentStore";
import { getKidStores } from "@/lib/bazar/kidStores";

import campLogo from "../../../public/magica-camp-print.png";
import bazarLogo from "../../../public/magica-bazar-print.png";
import foodLogo from "../../../public/magica-food-print.png";
import podcastLogo from "../../../public/magica-Podcast-print.png";
import uniformLogo from "../../../public/magica-Uniform-print.png";
import suppliesLogo from "../../../public/magica-Supplies-print.png";
import coursesLogo from "../../../public/magica-Courses-print.png";
import gamesLogo from "../../../public/magica-games-print.png";

interface PreviewItem {
    id: string;
    title: string;
    subtitle?: string;
    badge?: string;
    imageUrl?: string;
    icon?: string;
}

const STATS = (isArabic: boolean) => [
    { value: "500+", label: isArabic ? "طفل ورائد صغير" : "Young Founders" },
    { value: "8", label: isArabic ? "قطاعات وبرامج متكاملة" : "Core Sectors & Programs" },
    { value: "100%", label: isArabic ? "بيئة آمنة وتجهيز للمستقبل" : "Future-Ready Safe Space" },
];

export default function MagicaZoneHome({ params: { lang } }: { params: { lang: string } }) {
    const isArabic = lang === 'ar';
    const { data: cmsData } = useCMSData();
    const [kidStores, setKidStores] = useState<any[]>([]);
    const stats = STATS(isArabic);

    useEffect(() => {
        setKidStores(getKidStores());
    }, []);

    const SUB_BRANDS = [
        {
            id: "courses",
            emoji: "🎓",
            logoImg: coursesLogo,
            title: isArabic ? "ماجيكا كورسات" : "Magica Courses",
            shortName: isArabic ? "الكورسات التدريبية" : "Courses",
            tagline: isArabic ? "مهارات الغد، تصنع اليوم" : "Tomorrow's Skills, Today.",
            desc: isArabic
                ? "مسارات قيادية، تقنية وتجارة إلكترونية متطورة تبني قادة المستقبل ونخبة المبتكرين في بيئة علمية ممتعة."
                : "Leadership, technology, and e-commerce tracks that empower tomorrow's innovators in a highly engaging scientific environment.",
            href: `/${lang}/magic-courses`,
            from: "from-amber-500",
            to: "to-orange-600",
            border: "border-orange-200",
            bg: "bg-orange-50",
            text: "text-orange-600",
            badgeBg: "bg-orange-100/80 text-orange-800 border-orange-200",
            shadowHover: "hover:shadow-orange-500/20",
            offerings: isArabic
                ? ["مسارات القيادة وإدارة المشروعات", "التجارة الإلكترونية والتسويق", "الروبوتات والذكاء الاصطناعي", "برمجة وبناء العقول القيادية"]
                : ["Leadership & Project Management", "E-Commerce & Digital Marketing", "Robotics & Artificial Intelligence", "Executive Mindset & Coding"],
            previewHeader: isArabic ? "💡 نبذة من المسارات والدورات التدريبية المتاحة:" : "💡 Preview of Featured Training Tracks:",
            previewItems: (cmsData.courses || []).slice(0, 3).map(c => ({
                id: c.id,
                title: isArabic ? c.titleAr : c.titleEn,
                subtitle: isArabic ? c.ageAr : c.ageEn,
                badge: isArabic ? (c.badgeAr || "دورة معتمدة") : (c.badgeEn || "Certified Track"),
                icon: "🎓"
            })) as PreviewItem[]
        },
        {
            id: "supplies",
            emoji: "🎒",
            logoImg: suppliesLogo,
            title: isArabic ? "ماجيكا سبلايز" : "Magica Supplies",
            shortName: isArabic ? "الحقائب والأدوات" : "Supplies & Bags",
            tagline: isArabic ? "جهّز نفسك. جهّز مستقبلك." : "Equip Yourself. Equip Your Future.",
            desc: isArabic
                ? "حقائب مدرسية طبية فائقة التحمل وأدوات ابتكار متطورة مصممة لعقول تريد أن تبني وتبتكر وتقود في المدرسة والمعسكرات."
                : "Ergonomic, water-resistant school bags and innovation toolkits designed for young leaders who want to organize, experiment, and succeed.",
            href: `/${lang}/magic-supplies`,
            from: "from-amber-500",
            to: "to-rose-600",
            border: "border-amber-200",
            bg: "bg-amber-50",
            text: "text-amber-700",
            badgeBg: "bg-amber-100/80 text-amber-900 border-amber-200",
            shadowHover: "hover:shadow-amber-500/20",
            offerings: isArabic
                ? ["حقائب ظهر مدرسية تنفيذية", "أقسام مخصصة للتابلت والأدوات", "تصميم طبي مدعم لحماية الظهر", "مقاومة للماء ومجهود المدرسة"]
                : ["Executive CEO School Backpacks", "Dedicated Tablet & Tech Compartments", "Ergonomic Spine Support", "Water-Resistant Heavy-Duty Fabric"],
            previewHeader: isArabic ? "🎒 نماذج من حقائبنا وأدواتنا الذكية (السعر عند الطلب):" : "🎒 Preview of Smart Executive Bags (Price Upon Inquiry):",
            previewItems: (cmsData.supplies || []).slice(0, 3).map(s => ({
                id: s.id,
                title: isArabic ? s.titleAr : s.titleEn,
                subtitle: isArabic ? "حقيبة مدرسية طبية مقاومة للماء" : "Waterproof Ergonomic School Bag",
                badge: isArabic ? "السعر عند الطلب" : "Price Upon Inquiry",
                icon: "🎒",
                imageUrl: s.imageUrl || s.galleryPhotos?.[0]
            })) as PreviewItem[]
        },
        {
            id: "games",
            emoji: "🎮",
            logoImg: gamesLogo,
            title: isArabic ? "ماجيكا ألعاب" : "Magica Games",
            shortName: isArabic ? "الألعاب الذهنية" : "Mind Games",
            tagline: isArabic ? "العب، فكّر، وطوّر ذكاءك" : "Play, Think & Grow Your IQ",
            desc: isArabic
                ? "ألعاب وتحديات ذكاء ورياضيات مالية تبني الحنكة والتفكير الاستراتيجي والقدرة الفريدة على حل المعضلات والمشاكل."
                : "Interactive mind challenges and financial mathematics puzzles that sharpen analytical intuition, quick thinking, and IQ.",
            href: `/${lang}/magic-games`,
            from: "from-purple-500",
            to: "to-indigo-600",
            border: "border-purple-200",
            bg: "bg-purple-50",
            text: "text-purple-600",
            badgeBg: "bg-purple-100/80 text-purple-900 border-purple-200",
            shadowHover: "hover:shadow-purple-500/20",
            offerings: isArabic
                ? ["تحديات الذكاء الرياضي والمنطق", "محاكي التجارة والمبادلات", "ألغاز الابتكار والتفكير النافذ", "نظام النقاط والمكافآت المستمرة"]
                : ["Analytical Logic & IQ Challenges", "Live Trading & Exchange Simulator", "Creative Problem-Solving Puzzles", "Dynamic Points & Reward System"],
            previewHeader: isArabic ? "🎮 لمحة من تحدياتنا وألعابنا الذهنية:" : "🎮 Preview of Interactive Mind Challenges:",
            previewItems: (cmsData.games || []).slice(0, 3).map(g => ({
                id: g.id,
                title: isArabic ? g.titleAr : g.titleEn,
                subtitle: isArabic ? g.categoryAr : g.categoryEn,
                badge: isArabic ? (g.difficultyAr || "تحدي ذكاء") : (g.difficultyEn || "Brain Challenge"),
                icon: "🧩",
                imageUrl: g.imageUrl
            })) as PreviewItem[]
        },
        {
            id: "camp",
            emoji: "🏕️",
            logoImg: campLogo,
            title: isArabic ? "ماجيكا كامب" : "Magica Camp",
            shortName: isArabic ? "معسكرات ماجيكا" : "Summer Camps",
            tagline: isArabic ? "صيف واحد يغيّر كل شيء" : "One Summer Changes Everything",
            desc: isArabic
                ? "أكثر من مجرد معسكر صيفي — تجربة تحول حقيقية تُعيد تشكيل شخصية طفلك، تبني ثقته بنفسه وتغرس الاعتماد على الذات."
                : "More than just a summer camp — a transformative practical experience that reshapes character, leadership, and independence.",
            href: `/${lang}/magic-camp`,
            from: "from-teal-500",
            to: "to-emerald-700",
            border: "border-teal-200",
            bg: "bg-teal-50",
            text: "text-teal-700",
            badgeBg: "bg-teal-100/80 text-teal-900 border-teal-200",
            shadowHover: "hover:shadow-teal-500/20",
            offerings: isArabic
                ? ["معسكرات صيفية وميدانية شاملة", "أنشطة المغامرات وبناء روح الفريق", "ورش عمل تطبيقية حية في الطبيعة", "تعزيز الثقة بالذات والاعتماد الكامل"]
                : ["Comprehensive Summer & Holiday Camps", "Outdoor Adventures & Team Building", "Hands-On Practical Workshops", "Confidence & Independence Cultivation"],
            previewHeader: isArabic ? "🏕️ أبرز برامج ومعسكرات الموسم:" : "🏕️ Featured Camp Programs & Events:",
            previewItems: (cmsData.camps || []).slice(0, 3).map(m => ({
                id: m.id,
                title: isArabic ? m.titleAr : m.titleEn,
                subtitle: isArabic ? m.locationAr : m.locationEn,
                badge: isArabic ? "معسكر ميداني" : "Live Camp",
                icon: "⛺",
                imageUrl: m.imageUrl || m.galleryPhotos?.[0]
            })) as PreviewItem[]
        },
        {
            id: "bazar",
            emoji: "🛍️",
            logoImg: bazarLogo,
            title: isArabic ? "ماجيكا بازار" : "Magica Bazar",
            shortName: isArabic ? "سوق البازار" : "Bazar Market",
            tagline: isArabic ? "اشتري. بيع. تعلّم. انجح." : "Buy. Sell. Learn. Succeed.",
            desc: isArabic
                ? "أول سوق حقيقي وتجربة محاكاة تجارية يتعلم فيها الطفل كيف ينشئ متجره الخاص، يعرض منتجاته بثقة، يفاوض ويدير أرباحه."
                : "The premier real marketplace where children build their own brand, pitch products with confidence, negotiate deals, and manage actual profit.",
            href: `/${lang}/magic-bazar`,
            from: "from-orange-500",
            to: "to-amber-600",
            border: "border-orange-200",
            bg: "bg-orange-50",
            text: "text-orange-600",
            badgeBg: "bg-amber-100/80 text-amber-900 border-amber-200",
            shadowHover: "hover:shadow-orange-500/20",
            offerings: isArabic
                ? ["متاجر حقيقية يديرها الأطفال بأنفسهم", "تعلم فنون التسعير وإتقان التفاوض", "تسوق منتجات الابتكار والحرف اليدوية", "تجارب حية لإدارة المال ورأس المال"]
                : ["Kid-Run Authentic Online & Live Stores", "Pricing Mastery & Negotiation Skills", "Innovative Tech & Handmade Products", "Real-world Capital & Profit Management"],
            previewHeader: isArabic ? "🛍️ لمحة من متاجر أبطالنا ومنتجاتهم بالبازار:" : "🛍️ Sneak Peek into Live Kid Stores & Marketplace:",
            previewItems: (kidStores.length > 0 ? kidStores.slice(0, 3).map(s => ({
                id: s.id,
                title: isArabic ? (s.storeNameAr || s.nameAr) : (s.storeNameEn || s.nameEn),
                subtitle: isArabic ? `المالك: ${s.nameAr || "رائد صغير"}` : `Founder: ${s.nameEn || "Young Founder"}`,
                badge: isArabic ? (s.categoryAr || "متجر مميز") : (s.categoryEn || "Featured Store"),
                icon: "🛒",
                imageUrl: s.logoUrl || s.products?.[0]?.imageUrl
            })) : [
                { id: "b1", title: isArabic ? "متجر سارة للابتكارات" : "Sara's Innovation Shop", subtitle: isArabic ? "أدوات ومشروعات إبداعية" : "Creative Tools & Projects", badge: isArabic ? "الأكثر مبيعاً" : "Best Seller", icon: "🎨" },
                { id: "b2", title: isArabic ? "متجر عمر للروبوتات والتكنولوجيا" : "Omar Robotics & Tech Store", subtitle: isArabic ? "قطع وألعاب برمجية ذكية" : "Smart Coding & AI Kits", badge: isArabic ? "متجر معتمد" : "Verified Store", icon: "🤖" },
                { id: "b3", title: isArabic ? "ركن الفن والحرف اليدوية" : "Art & Crafts Corner", subtitle: isArabic ? "منتجات بأيدي أبطالنا" : "Handmade by Young Founders", badge: isArabic ? "عرض خاص" : "Special Offer", icon: "✨" }
            ]) as PreviewItem[]
        },
        {
            id: "food",
            emoji: "🍱",
            logoImg: foodLogo,
            title: isArabic ? "ماجيكا فود" : "Magica Food",
            shortName: isArabic ? "الوجبات والتغذية" : "Smart Food",
            tagline: isArabic ? "أكل صح = تفكير صح" : "Eat Right = Think Right",
            desc: isArabic
                ? "وجبات وصناديق غداء مدرسية مصممة علميًا من قبل خبراء التغذية لدعم تركيز الأطفال، نشاطهم البدني وطاقتهم الذهنية طوال اليوم."
                : "Scientifically tailored kid meals and smart Bento box lunch kits engineered by nutritionists to boost daily focus, energy, and overall health.",
            href: `/${lang}/magic-food`,
            from: "from-blue-600",
            to: "to-cyan-600",
            border: "border-blue-200",
            bg: "bg-blue-50",
            text: "text-blue-700",
            badgeBg: "bg-blue-100/80 text-blue-900 border-blue-200",
            shadowHover: "hover:shadow-blue-500/20",
            offerings: isArabic
                ? ["وجبات ذكاء لتعزيز الطاقة والتركيز", "صناديق غداء Bento Boxes صحية", "مكونات طبيعية طازجة خالية من المواد الحافظة", "خطط غذائية تناسب أيام الدراسة والمعسكرات"]
                : ["High-Energy Brain & Focus Meals", "Custom Nutritious School Bento Boxes", "100% Natural Preservative-Free Ingredients", "Meal Plans Tailored for School & Camp"],
            previewHeader: isArabic ? "🍱 لمحة من قائمتنا الغذائية الذكية للأطفال:" : "🍱 Preview of Our Smart Kid Meal Menu:",
            previewItems: (cmsData.food || []).slice(0, 3).map(f => ({
                id: f.id,
                title: isArabic ? f.titleAr : f.titleEn,
                subtitle: isArabic ? f.categoryAr : f.categoryEn,
                badge: f.calories ? `${f.calories}` : (isArabic ? "وجبة صحية" : "Healthy Meal"),
                icon: "🥗",
                imageUrl: f.imageUrl || f.galleryPhotos?.[0]
            })) as PreviewItem[]
        },
        {
            id: "podcast",
            emoji: "🎙️",
            logoImg: podcastLogo,
            title: isArabic ? "ماجيكا بودكاست" : "Magica Podcast",
            shortName: isArabic ? "الإذاعة والبودكاست" : "Podcasts & Radio",
            tagline: isArabic ? "كلام بيفرق ويصنع وعي" : "Words That Matter",
            desc: isArabic
                ? "منصتنا الصوتية الموجهة للأطفال والأهالي — حوارات تربوية، استشارات ونصائح ملهمة تبني القادة وتغذي العقول بالفضول والشغف."
                : "Our pioneering audio station for kids and parents — empowering talks, practical parenting interviews, and youth stories that broaden perspectives.",
            href: `/${lang}/magic-podcast`,
            from: "from-purple-600",
            to: "to-fuchsia-700",
            border: "border-purple-200",
            bg: "bg-purple-50",
            text: "text-purple-700",
            badgeBg: "bg-purple-100/80 text-purple-900 border-purple-200",
            shadowHover: "hover:shadow-purple-500/20",
            offerings: isArabic
                ? ["حوارات تربوية ونفسية مع أهم الخبراء", "نصائح تطبيقية للأهالي لبناء شخصية القيادي", "تجارب وقصص نجاح حية يحكيها أطفالنا", "بث صوتي متاح على مدار الساعة والمنصات"]
                : ["In-depth Educational & Psychology Discussions", "Actionable Advice for Parent & Child Mentorship", "Inspirational Stories Hosted by Kids & Youth", "On-Demand Audio Streaming on All Devices"],
            previewHeader: isArabic ? "🎙️ مقتطفات من أحدث الحلقات الصوتية والبرامج:" : "🎙️ Snippets of Featured Audio Episodes:",
            previewItems: (cmsData.podcasts || []).slice(0, 3).map(p => ({
                id: p.id,
                title: isArabic ? p.titleAr : p.titleEn,
                subtitle: isArabic ? (p.hostAr || "حوار تربوي") : (p.hostEn || "Educational Talk"),
                badge: p.duration ? `${p.duration}` : (isArabic ? "حلقة صوتية" : "Audio Episode"),
                icon: "🎧",
                imageUrl: p.imageUrl
            })) as PreviewItem[]
        },
        {
            id: "uniform",
            emoji: "👕",
            logoImg: uniformLogo,
            title: isArabic ? "ماجيكا يونيفورم" : "Magica Uniform",
            shortName: isArabic ? "الملابس والأزياء" : "Official Apparel",
            tagline: isArabic ? "البس هويتك واعتز بفريقك" : "Wear Your Identity",
            desc: isArabic
                ? "الزي في ماجيكا ليس مجرد ملابس — بل هوية وانتماء وشعور بالفخر والقيادة، مصنوع بخامات قطنية طبية فائقة الجودة للمدرسة والنشاط."
                : "In Magica, attire is an identity — fostering teamwork, confidence, and belonging, crafted from breathable premium active fabrics for school and field.",
            href: `/${lang}/magic-uniform`,
            from: "from-teal-500",
            to: "to-cyan-600",
            border: "border-teal-200",
            bg: "bg-teal-50",
            text: "text-teal-700",
            badgeBg: "bg-teal-100/80 text-teal-900 border-teal-200",
            shadowHover: "hover:shadow-teal-500/20",
            offerings: isArabic
                ? ["تيشرتات وهوديز رسمية بشعار ماجيكا", "أقمشة قطنية طبية ومقاومة للمجهود البدني", "تصميمات شبابية عصرية تشعر الطفل بالفخر", "مقاسات متكاملة تناسب جميع المراحل العمرية"]
                : ["Official Magica Hoodies, Tees, and Caps", "Breathable Ultra-Comfort Active Cotton", "Modern Designs Fostering Leadership Pride", "Complete Range of Sizes for All Age Groups"],
            previewHeader: isArabic ? "👕 لمحة من أزياء ماجيكا الرسمية:" : "👕 Preview of Magica Official Apparel:",
            previewItems: (cmsData.uniforms || []).slice(0, 3).map(u => ({
                id: u.id,
                title: isArabic ? u.titleAr : u.titleEn,
                subtitle: isArabic ? u.descAr.substring(0, 42) + "..." : u.descEn.substring(0, 42) + "...",
                badge: isArabic ? (u.badgeAr || "خامة فاخرة") : (u.badgeEn || "Premium Wear"),
                icon: "🎽",
                imageUrl: u.imageUrl || u.galleryPhotos?.[0]
            })) as PreviewItem[]
        },
    ];

    return (
        <main className="min-h-screen font-[family-name:var(--font-inter)] text-gray-800 overflow-hidden relative pb-24 pt-24">
            <MagicalBackground />

            {/* Hero Section */}
            <header className="relative z-10 py-16 md:py-24 px-6 text-center flex flex-col justify-center items-center">
                {/* Floating sparkles */}
                <motion.div
                    animate={{ y: [0, -25, 0], rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="absolute top-12 left-[5%] md:left-[10%] text-orange-400 opacity-90 drop-shadow-lg pointer-events-none"
                >
                    <Sparkles className="w-12 h-12 md:w-16 md:h-16" />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 35, 0], rotate: [0, -20, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                    className="absolute bottom-20 right-[5%] md:right-[10%] text-purple-500 opacity-90 drop-shadow-lg pointer-events-none"
                >
                    <Sparkles className="w-16 h-16 md:w-20 md:h-20" />
                </motion.div>

                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center justify-center gap-6 relative max-w-5xl mx-auto"
                >
                    {/* Glowing background aura */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/15 via-purple-500/15 to-teal-500/15 blur-[120px] rounded-full w-full h-full -z-10" />

                    <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-lg text-gray-800 font-extrabold text-sm md:text-base">
                        <span className="text-orange-500 animate-spin" style={{ animationDuration: "8s" }}>
                            <Sparkles className="w-5 h-5" />
                        </span>
                        <span>{isArabic ? "حيث يبدأ بناء الإنسان وصناعة القادة" : "Where Human Excellence & Leadership Begin"}</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-purple-600 to-teal-600 tracking-tighter drop-shadow-sm pb-2 leading-none">
                        {isArabic ? "ماجيكا زون" : "Magica Zone"}
                    </h1>

                    <p className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">
                        {isArabic ? "هنا يُصنع قادة الغد." : "Where Children Become Leaders."}
                    </p>

                    <p className="text-base md:text-lg text-gray-600 max-w-2xl text-center leading-relaxed font-medium">
                        {isArabic
                            ? "مهمتنا ليست التسلية المؤقتة — بل التجهيز الشامل للمستقبل. نزوّد الأطفال بمهارات القيادة، الذكاء المالي، ريادة الأعمال، والأدوات الحية التي يحتاجها الإنسان الناجح."
                            : "Our mission isn't passive entertainment — it's comprehensive life preparation. We equip youth with financial literacy, entrepreneurship, leadership, and hands-on skills for life."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse" />
                            <Link
                                href="#sectors-showcase"
                                className="relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl hover:shadow-orange-500/40 w-full sm:w-auto"
                            >
                                <span>{isArabic ? "اكتشف قطاعات ومنتجات ماجيكا" : "Explore Sectors & Offerings"}</span>
                                <span>{isArabic ? "↓" : "↓"}</span>
                            </Link>
                        </div>
                        <Link
                            href={`/${lang}/login`}
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-md border-2 border-gray-200 text-gray-800 rounded-full font-extrabold text-lg hover:border-orange-400 hover:text-orange-600 transition-all shadow-md w-full sm:w-auto"
                        >
                            {isArabic ? "بوابة الأهالي والطلاب" : "Parent & Student Portal"}
                        </Link>
                    </div>
                </motion.div>

                {/* Stats Bar */}
                <div className="mt-16 pt-8 border-t border-gray-200/60 w-full max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center px-4">
                            <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{stat.value}</div>
                            <div className="text-sm md:text-base font-bold text-gray-600 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </header>

            {/* Philosophy Section */}
            <section className="relative z-10 max-w-5xl mx-auto px-6 py-12 text-center">
                <div className="bg-gradient-to-br from-white/90 via-white/80 to-amber-50/70 backdrop-blur-lg border border-orange-100 rounded-3xl p-8 md:p-14 shadow-xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-extrabold text-sm mb-6">
                        <Target className="w-4 h-4" />
                        <span>{isArabic ? "فلسفتنا ومهمتنا" : "Our Philosophy & Mission"}</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-snug">
                        {isArabic ? "نؤمن أن كل طفل يحمل داخله طاقات وإمكانات قيادية لا حدود لها." : "We believe every child possesses boundless entrepreneurial & leadership potential."}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
                        {isArabic
                            ? "في ماجيكا زون، نوفر بيئة متكاملة تضم 8 قطاعات تخصصية — من البازار الحقيقي والكورسات إلى التغذية السليمة والحقائب الابتكارية — لتطوير طفل واثق، قيادي، ومستعد بقوة لفرص المستقبل."
                            : "At Magica Zone, we provide an integrated ecosystem of 8 dynamic sectors — from real kid marketplaces and STEM tracks to nutrition and executive equipment — shaping youth into confident future leaders."}
                    </p>
                </div>
            </section>

            {/* Sectors & Offerings Showcase Section (2-Column Expanded Layout) */}
            <section id="sectors-showcase" className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-50 border border-teal-200 text-teal-700 font-extrabold text-sm mb-4">
                        <TrendingUp className="w-4 h-4" />
                        <span>{isArabic ? "عالم ماجيكا المتكامل" : "Our Comprehensive World"}</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
                        {isArabic ? "تعرّف على قطاعات ماجيكا وما نقدمه لأطفالنا" : "Discover All Magica Sectors & What We Offer"}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg font-medium">
                        {isArabic 
                            ? "تصفح الأقسام الثمانية أدناه لمعرفة الخدمات والعناصر المتاحة في كل قطاع مع نماذج وأمثلة حية من منتجاتنا وبرامجنا:"
                            : "Explore our 8 specialized divisions below to discover core offerings along with live previews of featured items and programs:"}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                    {SUB_BRANDS.map((brand, idx) => (
                        <div 
                            key={brand.id || idx} 
                            className={`flex flex-col h-full p-6 md:p-8 rounded-3xl bg-white/90 backdrop-blur-md border ${brand.border} shadow-lg hover:shadow-2xl ${brand.shadowHover} transition-all duration-300 relative overflow-hidden group`}
                        >
                            {/* Top colored highlight line */}
                            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${brand.from} ${brand.to}`} />
                            
                            {/* Background ambient glow inside card */}
                            <div className={`absolute -right-10 -top-10 w-44 h-44 rounded-full bg-gradient-to-br ${brand.from} ${brand.to} opacity-10 pointer-events-none group-hover:scale-125 transition-transform duration-700`} />

                            {/* Sector Header Area */}
                            <div className="flex items-start gap-4 md:gap-6 mb-6 relative z-10">
                                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${brand.bg} border ${brand.border} flex items-center justify-center text-4xl shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
                                    {brand.logoImg ? (
                                        <Image src={brand.logoImg} alt={brand.title} className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-sm" />
                                    ) : (
                                        <span>{brand.emoji}</span>
                                    )}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <span className={`text-xs md:text-sm font-black uppercase tracking-wider ${brand.text} block mb-1`}>
                                        {brand.tagline}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                                        {brand.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Sector Detailed Description */}
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium mb-6 relative z-10">
                                {brand.desc}
                            </p>

                            {/* What This Sector Offers (Feature Badges) */}
                            <div className="mb-6 relative z-10">
                                <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                                    <span>{isArabic ? "ماذا يقدم هذا القسم؟" : "What This Sector Offers:"}</span>
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {brand.offerings.map((offering, oIndex) => (
                                        <span key={oIndex} className={`text-xs md:text-sm font-extrabold px-3 py-1.5 rounded-xl border shadow-xs ${brand.badgeBg}`}>
                                            ✓ {offering}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Live Product / Item Hints Box */}
                            <div className="flex-grow flex flex-col justify-end relative z-10">
                                <div className="bg-gray-50/90 border border-gray-200/80 rounded-2xl p-4 md:p-5 mb-6 shadow-inner">
                                    <h5 className="text-xs md:text-sm font-black text-gray-800 mb-3.5 flex items-center gap-1.5">
                                        <span>{brand.previewHeader}</span>
                                    </h5>

                                    {brand.previewItems && brand.previewItems.length > 0 ? (
                                        <div className="space-y-2.5">
                                            {brand.previewItems.map((item, itemIdx) => (
                                                <div 
                                                    key={item.id || itemIdx} 
                                                    className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-gray-200/70 shadow-xs hover:border-gray-300 transition-colors"
                                                >
                                                    <div className="w-11 h-11 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xl shrink-0 overflow-hidden">
                                                        {item.imageUrl ? (
                                                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span>{item.icon || brand.emoji}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-grow min-w-0 text-start">
                                                        <div className="font-black text-sm text-gray-900 truncate">{item.title}</div>
                                                        {item.subtitle && (
                                                            <div className="text-xs font-semibold text-gray-500 truncate mt-0.5">{item.subtitle}</div>
                                                        )}
                                                    </div>
                                                    {item.badge && (
                                                        <span className="shrink-0 text-[11px] font-black px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 border border-gray-200">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-sm text-gray-500 font-bold bg-white rounded-xl border border-dashed border-gray-200">
                                            {isArabic ? "يتم إضافة وتحديث العناصر والمنتجات حالياً في هذا القسم..." : "Items are actively being updated in this sector..."}
                                        </div>
                                    )}
                                </div>

                                {/* Call To Action Action Button */}
                                <Link href={brand.href} className="block w-full">
                                    <div className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r ${brand.from} ${brand.to} text-white font-black text-base shadow-md hover:shadow-xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.99]`}>
                                        <span>{isArabic ? `تصفح جميع العناصر في ${brand.shortName || brand.title}` : `Explore All in ${brand.shortName || brand.title}`}</span>
                                        <span className="text-xl font-bold">{isArabic ? "←" : "→"}</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom Footer Call to Action Banner */}
            <section className="relative z-10 max-w-5xl mx-auto px-6 mt-6">
                <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl text-center border border-gray-700 relative overflow-hidden">
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
                    
                    <h3 className="text-2xl sm:text-4xl font-black mb-4">
                        {isArabic ? "هل تريد إشراك طفلك في هذا العالم الساحر؟" : "Ready to Enroll Your Child in This Transformational World?"}
                    </h3>
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-8 font-medium">
                        {isArabic
                            ? "سجل حسابك الآن وافتح أبواب الريادة والابتكار وتطوير الذات لأطفالك بضغطة زر واحدة."
                            : "Create an account now and open the doors of leadership, STEM innovation, and financial intelligence for your children."}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href={`/${lang}/register`}
                            className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-black text-lg shadow-xl hover:scale-105 transition-transform"
                        >
                            {isArabic ? "سجل طفلك الآن" : "Register Your Child Now"}
                        </Link>
                        <Link
                            href={`/${lang}/about`}
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition-colors"
                        >
                            {isArabic ? "تعرف على قصتنا" : "Learn More About Us"}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

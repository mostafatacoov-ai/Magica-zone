"use client";

import { useState, useEffect } from "react";
import { ALL_BAG_PHOTOS } from "./bagPhotos";

const generatedBags = ALL_BAG_PHOTOS.map((filename, index) => {
    const titlesEn = [
        "Magica Executive CEO School Bag",
        "Innovation Explorer Camp & School Backpack",
        "Robotics & Tech Equipment Handbag",
        "Magica Scholar Premium Laptop & Kit Bag",
        "Young Founder Sport & Field Adventure Bag",
        "Magica Daily Adventure School Pack",
        "Pro Leader Ergonomic School Backpack",
        "Smart STEM Explorer Expedition Pack",
        "Junior Entrepreneur Executive Backpack",
        "Magica Future Star Premium Bag"
    ];
    const titlesAr = [
        "حقيبة ماجيكا التنفيذية المدرسية",
        "حقيبة المستكشف والمبتكر للمعسكرات والمدرسة",
        "حقيبة المعدات التكنولوجية وأدوات الروبوت",
        "حقيبة الباحث الصغير الفاخرة للتابلت والأدوات",
        "حقيبة الرائد الرياضي للمغامرات والأنشطة",
        "حقيبة مغامرات ماجيكا المدرسية اليومية",
        "حقيبة الرائد الملكية المدعمة طبًيا",
        "حقيبة المستكشف العلمي والابتكار",
        "حقيبة رائد الأعمال التنفيذية للأطفال",
        "حقيبة نجم المستقبل الفاخرة من ماجيكا"
    ];
    const badgesEn = ["Best Seller 🌟", "New Release 🚀", "Tech Edition ⚙️", "Trending ⚡", "Premium ✨", "Sport Edition 🏃‍♂️", "Limited Offer 🔥"];
    const badgesAr = ["الأكثر مبيًعا 🌟", "إصدار حديث 🚀", "النسخة التقنية ⚙️", "الأكثر طلًبا ⚡", "جودة ملكية ✨", "النسخة الرياضية 🏃‍♂️", "عرض مميز 🔥"];
    
    // Varying price between 850 and 1750 EGP, some without price (0) to demonstrate inquiry option
    const priceOptions = [1250, 950, 1400, 850, 1100, 1350, 1500, 1650, 900, 1200, 0];
    
    const titleIndex = index % titlesEn.length;
    const badgeIndex = index % badgesEn.length;
    const priceIndex = index % priceOptions.length;
    
    return {
        id: `sup-bag-${index + 1}`,
        titleEn: `${titlesEn[titleIndex]} #${index + 1}`,
        titleAr: `${titlesAr[titleIndex]} (${index + 1}#)`,
        categoryEn: "Bags & Backpacks",
        categoryAr: "الحقائب والحزم المدرسية",
        price: priceOptions[priceIndex],
        itemsCount: 1,
        descEn: "Ergonomic, waterproof school backpack designed with dedicated compartments for smart tablets, science kits, and daily learning notebooks.",
        descAr: "حقيبة مدرسية طبية مقاومة للماء والمجهود، مصممة بأقسام خاصة للتابلت الذكي، أدوات العلوم، ودفاتر الملاحظات اليومية.",
        imageUrl: `/supplies/${filename}`,
        badgeEn: badgesEn[badgeIndex],
        badgeAr: badgesAr[badgeIndex],
        featuresEn: ["Water Resistant", "Tablet Pocket", "Ergonomic Support", "Durable Fabric"],
        featuresAr: ["مقاومة للماء", "جيب مخصص للتابلت", "دعم طبي للظهر", "نسيج فائق التحمل"]
    };
});

// --- Data Types for all Website Sections ---
export interface TestimonialItem {
    id: string;
    nameEn: string;
    nameAr: string;
    roleEn: string;
    roleAr: string;
    quoteEn: string;
    quoteAr: string;
    avatarUrl?: string;
}

export interface HeroSectionContent {
    titleEn: string;
    titleAr: string;
    subtitleEn: string;
    subtitleAr: string;
    heroBgPhoto?: string;
    promoVideoUrl?: string;
    galleryPhotos: string[];
    testimonials: TestimonialItem[];
}

export interface CourseItem {
    id: string;
    titleEn: string;
    titleAr: string;
    badgeEn?: string;
    badgeAr?: string;
    price: number;
    datesEn: string;
    datesAr: string;
    ageEn: string;
    ageAr: string;
    hours: number;
    sessionsCount: number;
    descEn: string;
    descAr: string;
    skillsEn: string[];
    skillsAr: string[];
    color?: string;
    bgGradient?: string;
    imageUrl?: string;
}

export interface CampProgram {
    id: string;
    titleEn: string;
    titleAr: string;
    price: number;
    datesEn: string;
    datesAr: string;
    locationEn: string;
    locationAr: string;
    ageEn: string;
    ageAr: string;
    descEn: string;
    descAr: string;
    highlightsEn: string[];
    highlightsAr: string[];
    imageUrl?: string;
    galleryPhotos: string[];
}

export interface FoodMeal {
    id: string;
    titleEn: string;
    titleAr: string;
    categoryEn: string;
    categoryAr: string;
    calories: string;
    descEn: string;
    descAr: string;
    imageUrl?: string;
}

export interface UniformItem {
    id: string;
    titleEn: string;
    titleAr: string;
    price: number;
    sizesEn: string[];
    sizesAr: string[];
    descEn: string;
    descAr: string;
    imageUrl?: string;
}

export interface SupplyKit {
    id: string;
    titleEn: string;
    titleAr: string;
    price?: number;
    categoryEn?: string;
    categoryAr?: string;
    itemsCount?: number;
    descEn: string;
    descAr: string;
    imageUrl?: string;
    badgeEn?: string;
    badgeAr?: string;
    featuresEn?: string[];
    featuresAr?: string[];
}

export type SupplyItem = SupplyKit;

export interface PodcastEpisode {
    id: string;
    titleEn: string;
    titleAr: string;
    duration: string;
    tagEn: string;
    tagAr: string;
    tagColor: string;
    descEn?: string;
    descAr?: string;
    audioUrl?: string;
    imageUrl?: string;
}

export interface MindGame {
    id: string;
    titleEn: string;
    titleAr: string;
    difficultyEn: string;
    difficultyAr: string;
    categoryEn: string;
    categoryAr: string;
    points: number;
    descEn: string;
    descAr: string;
    imageUrl?: string;
}

export interface BazarItem {
    id: string;
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
    price: number;
    category?: string;
    storeName?: string;
    childName?: string;
    imageUrl?: string;
}

export interface CompleteCMSData {
    hero: HeroSectionContent;
    courses: CourseItem[];
    camps: CampProgram[];
    food: FoodMeal[];
    uniforms: UniformItem[];
    supplies: SupplyKit[];
    podcasts: PodcastEpisode[];
    games: MindGame[];
    bazar?: BazarItem[];
}

// --- Initial Seed Data ---
const INITIAL_CMS_DATA: CompleteCMSData = {
    hero: {
        titleEn: "Magica Kamp & Academy",
        titleAr: "أكاديمية ومعسكر ماجيكا",
        subtitleEn: "Where imaginative play meets real financial literacy, entrepreneurship, and leadership for next-gen stars.",
        subtitleAr: "حيث يلتقي الخيال بالمحاكاة الواقعية لريادة الأعمال، الذكاء المالي، والقيادة لنجوم الغد.",
        heroBgPhoto: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200",
        galleryPhotos: [
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800"
        ],
        testimonials: [
            {
                id: "t1",
                nameEn: "Sara's Mother (Mona)",
                nameAr: "والدة سارة (منى)",
                roleEn: "Parent of 9yo CEO",
                roleAr: "ولي أمر رائدة أعمال (9 سنوات)",
                quoteEn: "Magica completely transformed Sara! She built her own mini-store and negotiated her product prices like a true executive.",
                quoteAr: "ماجيكا غيرت سارة تمامًا! قامت بإنشاء متجرها الصغير وتفاوضت على أسعار منتجاتها بذكاء وثقة استثنائية.",
                avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
            },
            {
                id: "t2",
                nameEn: "Omar Youssef",
                nameAr: "عمر يوسف",
                roleEn: "11yo Student & Inventor",
                roleAr: "رائد مبتكر (11 سنة)",
                quoteEn: "I love the Bazar and Mind Games! Earning magic profit while learning AI and stage speaking is the best experience ever.",
                quoteAr: "أحب البازار والألعاب الذهنية! تحقيق الأرباح في ماجيكا أثناء تعلم الروبوتات وفن التحدث هو أمتع تجربة عشتها.",
                avatarUrl: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&q=80&w=200"
            }
        ]
    },
    courses: [
        {
            id: "course-ceo-bootcamp",
            titleEn: "Junior CEO & Financial Literacy Bootcamp",
            titleAr: "معسكر الرائد الصغير والذكاء المالي",
            badgeEn: "Most Popular 🔥",
            badgeAr: "الأكثر طلبًا 🔥",
            price: 150,
            datesEn: "Starts August 15 (Weekly Saturday Cohort)",
            datesAr: "يبدأ في 15 أغسطس (أفواج كل أسبوعين)",
            ageEn: "8 - 14 Years",
            ageAr: "8 - 14 سنة",
            hours: 16,
            sessionsCount: 8,
            descEn: "Turn pocket money into smart investments! Kids learn pricing, budgeting, profit margins, and negotiation through immersive simulations and practical real-world challenges.",
            descAr: "حول مصروف الجيب إلى استثمارات ذكية! يتعلم الأطفال تسعير المنتجات، إعداد الميزانية، هوامش الربح، وفن التفاوض من خلال المحاكاة التفاعلية والتحديات الواقعية الممتعة.",
            skillsEn: ["Financial Fluency", "Profit Calculation", "Smart Budgeting", "Negotiation Techniques"],
            skillsAr: ["الذكاء المالي", "حساب هوامش الربح", "إدارة الميزانية", "مهارات التفاوض والإقناع"],
            color: "from-orange-500 to-amber-600",
            bgGradient: "bg-orange-500/10 border-orange-500/20 text-orange-600",
            imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: "course-public-speaking",
            titleEn: "Charismatic Leader & Stage Presence Studio",
            titleAr: "استوديو القائد الجذاب وفن التحدث أمام الجمهور",
            price: 130,
            datesEn: "Starts August 20 (Intensive Weekend Classes)",
            datesAr: "يبدأ في 20 أغسطس (جلسات عطلة نهاية الأسبوع)",
            ageEn: "7 - 13 Years",
            ageAr: "7 - 13 سنة",
            hours: 12,
            sessionsCount: 6,
            descEn: "Overcome stage fright and develop genuine vocal presence! Inspired by Magica Podcast, this course coaches children on confidence, speech structuring, eye contact, and emotional intelligence.",
            descAr: "اكسر حاجز الخوف وابنِ حضورًا مقنعًا وصوتًا قياديًا مميزًا! مستوحى من تجربة ماجيكا بودكاست لتدريب الأطفال على لغة الجسد، ترتيب الخطاب، والثقة العالية بالنفس.",
            skillsEn: ["Stage Presence", "Storytelling", "Body Language Mastery", "Emotional Intelligence"],
            skillsAr: ["الحضور والجاذبية", "فن رواية القصص", "لغة الجسد المؤثرة", "الذكاء العاطفي والاجتماعي"],
            color: "from-emerald-500 to-teal-600",
            bgGradient: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600",
            imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: "course-bazar-maker",
            titleEn: "Bazar Entrepreneur & Retail Innovator Program",
            titleAr: "برنامج رواد البازار وصناع المبادرات التجاريين",
            price: 175,
            datesEn: "Starts September 1 (Includes Real Bazar Day)",
            datesAr: "يبدأ في 1 سبتمبر (يتطلب التدريب الميداني في البازار)",
            ageEn: "9 - 15 Years",
            ageAr: "9 - 15 سنة",
            hours: 20,
            sessionsCount: 10,
            descEn: "The ultimate practical incubator! Students create their own brand icon, produce handmade or curated goods, build a marketing strategy, and operate a live commercial booth at Magica Bazar.",
            descAr: "حاضنة الأعمال التطبيقة الشاملة! يصمم الطفل علامته التجارية الخاصة، ويبتكر منتجاته، ويبني استراتيجية التسويق، ويدير متجره الفردي الحيوي في يوم ماجيكا بازار الكبير.",
            skillsEn: ["Brand Creation", "Customer Service", "Sales Pitching", "Store Management"],
            skillsAr: ["بناء الهوية والعلامة", "خدمة العملاء", "عروض البيع الساحرة", "إدارة وتجميل المتجر"],
            color: "from-indigo-500 to-purple-600",
            bgGradient: "bg-indigo-500/10 border-indigo-500/20 text-indigo-600",
            imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600"
        }
    ],
    camps: [
        {
            id: "camp-summer-2026",
            titleEn: "Magica Summer Adventure & Innovation Camp 2026",
            titleAr: "معسكر ماجيكا الصيفي للمغامرات والابتكار 2026",
            price: 350,
            datesEn: "July 1 - August 30 (2-Week Sessions Available)",
            datesAr: "1 يوليو - 30 أغسطس (متاح التسجيل لجولات الأسبوعين)",
            locationEn: "Magica Royal Valley Campsite & Tech Village",
            locationAr: "وادي ماجيكا الملكي وميدان التجارب التقنية",
            ageEn: "6 - 15 Years",
            ageAr: "6 - 15 سنة",
            descEn: "An all-day immersive outdoor & tech experience combining teamwork sports, business challenges, survival skills, science experiments, and creative leadership drills.",
            descAr: "تجربة صيفية متكاملة تدمج بين الأنشطة الخارجية والتحديات الرياضية والذهنية، وتطبيقات التجارة الحية، وتجارب العلوم، وبناء الروح القيادية في بيئة آمنة وملهمة.",
            highlightsEn: ["Daily Organic Brain Fuel Meals", "Official Magica Explorer Uniform included", "Access to Royal Bazar Day Booth", "Weekly Personalized Assessment Report for Parents"],
            highlightsAr: ["وجبات طعام صحية ومحفزة للتركيز يوميًا", "يشمل الزي الرسمي الخاص برواد معسكر ماجيكا", "جناح مخصص للطفل في يوم البازار الختامي", "تقرير تقييم مهارات دوري متاح فورًا للأهالي"],
            imageUrl: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&q=80&w=800",
            galleryPhotos: [
                "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600"
            ]
        }
    ],
    food: [
        {
            id: "food-super-focus",
            titleEn: "Brain Power Salmon & Quinoa Bowl",
            titleAr: "وعاء السلمون والكينوا المحفز للتركيز",
            categoryEn: "Lunch / Warm Meals",
            categoryAr: "وجبات الغداء الرئيسية",
            calories: "420 kcal",
            descEn: "Rich in Omega-3 acids and slow-release proteins to keep children focused and high-energy during complex cognitive challenges and active sports.",
            descAr: "غني بأحماض أوميغا 3 والبروتينات متوازنة الطاقة للحفاظ على يقظة وحيويّة الطلاب أثناء التحديات المنطقية والألعاب الرياضية الحيوية.",
            imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: "food-elixir-shake",
            titleEn: "Magica Berry Antioxidant Smoothie",
            titleAr: "عصير التوت الإعجابي المضاد للأكسدة من ماجيكا",
            categoryEn: "Drinks & Refreshments",
            categoryAr: "المشروبات الطبيعية المنعشة",
            calories: "180 kcal",
            descEn: "Fresh blueberries, strawberries, chia seeds, and raw almond milk blended into an electrifying violet drink loved by every junior creator!",
            descAr: "مزيج التوت البري، الفراولة، بذور الشيا، וחليب اللوز العضوي المنعش المحضر خصيصًا ليمنح أبطال المعسكر انتعاشاً ولذة استثنائية دون سكريات مضافة.",
            imageUrl: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: "food-energy-bites",
            titleEn: "Golden Oat & Honey Energy Balls",
            titleAr: "كرات الطاقة بالشوفان والعسل الملكي",
            categoryEn: "Snacks & Fuel",
            categoryAr: "وجبات خفيفة ومحفزات طاقة",
            calories: "210 kcal",
            descEn: "Handmade oat clusters bound with mountain honey, pumpkin seeds, and dark chocolate chips. Perfect snack between bazar sessions!",
            descAr: "قطع حصرية محضرة يدويًا من الشوفان والعسل الطبيعي وبذور القرع ورقائق الشوكولاتة الداكنة. الوجبة الخفيفة المثالية بين فترات التدريب!",
            imageUrl: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=600"
        }
    ],
    uniforms: [
        {
            id: "uni-explorer-tee",
            titleEn: "Magica Official Explorer Polo & Cap Set",
            titleAr: "طقم البოლო الملكي والقبعة الخاصة بمكتشف ماجيكا",
            price: 45,
            sizesEn: ["Kids XS (6-8 yrs)", "Kids M (9-11 yrs)", "Youth L (12-14 yrs)"],
            sizesAr: ["صغير XS (6-8 سنوات)", "وسط M (9-11 سنة)", "كبير L (12-14 سنة)"],
            descEn: "Crafted from breathable, anti-stain soft cotton blend. Designed to empower children with professional confidence from day one.",
            descAr: "مصنوع من مزيج القطن الصيفي الفائق المقاوم للبقع ولطيف التهوية. يمنح الطفل شعورًا بالجدية والاحترافية والاعتزاز بالانتباه.",
            imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: "uni-ceo-hoodie",
            titleEn: "Junior Founder Premium Hoodie",
            titleAr: "هودي رائد الأعمال المؤسس الملكي",
            price: 60,
            sizesEn: ["Kids M (9-11 yrs)", "Youth L (12-14 yrs)", "Teen XL (15+ yrs)"],
            sizesAr: ["وسط M (9-11 سنة)", "كبير L (12-14 سنة)", "شباب XL (15+ سنة)"],
            descEn: "Warm, stylish fleece hoodie with embroidered golden Magica emblem and secret zipper pocket for notebook & trade notes.",
            descAr: "هودي فاخر ودافئ مطرز بشعار ماجيكا الذهبي الأنيق، مزود بجيوب مريحة ومصنوع بمهارة ليناسب المؤتمرات والأمسيات البازارية.",
            imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600"
        }
    ],
    supplies: [
        ...(generatedBags as any),
        {
            id: "sup-ceo-planner",
            titleEn: "The Young Entrepreneur Toolkit & LED Wand Pen",
            titleAr: "حقيبة الرائد الصغير التنفيذية وقلم العصا الذكية",
            categoryEn: "Stationery & Tools",
            categoryAr: "الأدوات والقرطاسية الذكية",
            price: 650,
            itemsCount: 6,
            descEn: "Includes hardbound CEO finance ledger, innovation stickers, solar negotiation calculator, and magical glowing stylus.",
            descAr: "تتضمن دفتر الحسابات والميزانيات المقوى، ملصقات التحفيز، آلة حاسبة شمسية، وقلم العصا الذكي المنير للأفكار.",
            imageUrl: "/supplies/WhatsApp Image 2026-07-28 at 3.31.36 AM.jpeg",
            badgeEn: "Complete Set 🎒",
            badgeAr: "طقم متكامل 🎒"
        },
        {
            id: "sup-maker-kit",
            titleEn: "Bazar Craft & Prototype Presentation Box",
            titleAr: "صندوق ابتكار وتصميم منتجات البازار الفوري",
            categoryEn: "Robotics & AI Kits",
            categoryAr: "أطقم الروبوت والذكاء الاصطناعي",
            price: 1800,
            itemsCount: 15,
            descEn: "Everything a creative student needs to craft jewelry, prototypes, and customized labels for their booth on Bazar Day.",
            descAr: "كل ما يحتاجه الرائد المبتكر لصياغة وتغليف وتجديد منتجاته وتصميم لوحات عرض الأسعار لمتجره في البازار الكبير.",
            imageUrl: "/supplies/WhatsApp Image 2026-07-28 at 3.31.37 AM.jpeg",
            badgeEn: "Maker Favorite 🎨",
            badgeAr: "المفضلة للمبدعين 🎨"
        },
        {
            id: "sup-ai-lab",
            titleEn: "Smart IoT Automation & Robotics Starter Lab",
            titleAr: "مختبر وحقيبة الذكاء الاصطناعي وروبوتات إنترنت الأشياء",
            categoryEn: "Robotics & AI Kits",
            categoryAr: "أطقم الروبوت والذكاء الاصطناعي",
            price: 2500,
            itemsCount: 24,
            descEn: "Comprehensive robotics prototyping lab kit featuring Wi-Fi microcontrollers, environmental sensors, servomotors, and circuit instruction cards.",
            descAr: "طقم مختبر الابتكار التفاعلي الشامل، يحتوي على متحكمات الواي فاي الدقيقة، مستشعرات البيئة، محركات ذكية، وبطاقات التوصيل المصورة.",
            imageUrl: "/supplies/WhatsApp Image 2026-07-28 at 3.31.38 AM.jpeg",
            badgeEn: "STEM Master 🤖",
            badgeAr: "عبقري التكنولوجيا 🤖",
            featuresEn: ["Wi-Fi Microcontroller", "24 Sensors & Motors", "Illustrated Guides"],
            featuresAr: ["لوحة تحكم واي فاي", "24 مستشعر ومحرك", "أدلة توصيل مبسطة"]
        }
    ],
    podcasts: [
        {
            id: "pod-ep1",
            titleEn: "The Child Who Was Afraid, Then Became a Leader",
            titleAr: "الطفل الذي خاف ثم أصبح قائدًا",
            duration: "28 min",
            tagEn: "Leadership",
            tagAr: "قيادة وتأثير",
            tagColor: "bg-purple-100 text-purple-600",
            descEn: "A heartfelt episode recounting the journey of a shy camper who uncovered his voice through public speaking simulations and led his squad to victory.",
            descAr: "حلقة ملهمة تروي رحلة تحول طفل خجول إلى رائد مؤثر يدير النقاش وينجح في قادة فريقه بذكاء وثقة بعد تجربة استوديو الخطابة في ماجيكا.",
            imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=600",
            audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_rain_day_quiet.ogg"
        },
        {
            id: "pod-ep2",
            titleEn: "How to Teach Financial Fluency at Home: For Parents",
            titleAr: "كيف نبني الذكاء المالي في المنزل: حلقة خاصة للأهالي",
            duration: "35 min",
            tagEn: "Parenting",
            tagAr: "إرشادات للأهالي",
            tagColor: "bg-amber-100 text-amber-700",
            descEn: "Actionable advice for mothers and fathers on transforming weekly allowances into practical entrepreneurial lessons without making it feel like chores.",
            descAr: "خطوات عمالية مبسطة للآباء والأمهات حول كيفية استغلال مصروف الجيب والتجارب اليومية لبناء عقلية استثمارية مسؤولة لدى طفلك بحب ومرونة.",
            imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=600",
            audioUrl: "https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"
        }
    ],
    games: [
        {
            id: "game-profit-puzzle",
            titleEn: "Merchant's Logic: Margin Mastery",
            titleAr: "لغز التاجر الحكيم: حساب هوامش الأرباح",
            difficultyEn: "Medium ⚡",
            difficultyAr: "متوسط ⚡",
            categoryEn: "Financial Math",
            categoryAr: "الحسابات المالية والذكاء التجاري",
            points: 150,
            descEn: "Analyze raw material costs and customer demand in a virtual market square to set the perfect selling price without losing customers!",
            descAr: "حلل تكاليف المواد الخام وحركة الطلب في سوق المحاكاة لتختار تسعيرة البيع الذهبية التي تضمن أعلى نسبة ربح ورضا تام للمستهلك!",
            imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: "game-negotiation-quest",
            titleEn: "Diplomat & CEO Negotiation Quest",
            titleAr: "تحدي التفاوض والإقناع الدبلوماسي الملكي",
            difficultyEn: "Advanced 🔥",
            difficultyAr: "متقدم 🔥",
            categoryEn: "Social & Emotional AI",
            categoryAr: "الذكاء العاطفي والتفاوضي",
            points: 250,
            descEn: "Navigate dialogue choices and read body language expressions to strike win-win investment deals with virtual mentor investors.",
            descAr: "اقرأ لغة الجسد واختر الاستجابة السلوكية الأمثل لإقناع المستثمر والمورد باتفاق مشترك ورابح للطرفين دون صدام أو خسارة ميزة تنافسية.",
            imageUrl: "https://images.unsplash.com/photo-1580894732244-8aefc5f5b865?auto=format&fit=crop&q=80&w=600"
        }
    ]
};

const STORAGE_KEY = "magica_cms_data_v1";
const UPDATE_EVENT = "magica_cms_update_event";

// --- Helper Storage Methods ---
export function getCMSData(): CompleteCMSData {
    if (typeof window === "undefined") return INITIAL_CMS_DATA;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CMS_DATA));
            return INITIAL_CMS_DATA;
        }
        const parsed = JSON.parse(stored);
        if (!parsed.supplies || parsed.supplies.length < 50) {
            parsed.supplies = INITIAL_CMS_DATA.supplies;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        }
        // Merge with defaults to guarantee all keys exist if structure grew
        return {
            hero: { ...INITIAL_CMS_DATA.hero, ...(parsed.hero || {}) },
            courses: parsed.courses || INITIAL_CMS_DATA.courses,
            camps: parsed.camps || INITIAL_CMS_DATA.camps,
            food: parsed.food || INITIAL_CMS_DATA.food,
            uniforms: parsed.uniforms || INITIAL_CMS_DATA.uniforms,
            supplies: parsed.supplies || INITIAL_CMS_DATA.supplies,
            podcasts: parsed.podcasts || INITIAL_CMS_DATA.podcasts,
            games: parsed.games || INITIAL_CMS_DATA.games,
        };
    } catch (e) {
        console.error("Failed to read CMS data from storage:", e);
        return INITIAL_CMS_DATA;
    }
}

export function saveCMSData(data: CompleteCMSData): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: data }));
    } catch (e) {
        console.error("Failed to save CMS data:", e);
    }
}

export function updateCMSSection<K extends keyof CompleteCMSData>(section: K, value: CompleteCMSData[K]): void {
    const current = getCMSData();
    current[section] = value;
    saveCMSData(current);
}

export function resetCMSDataToDefault(): void {
    if (typeof window === "undefined") return;
    saveCMSData(INITIAL_CMS_DATA);
}

// --- Reactive React Hook ---
export function useCMSData() {
    const [data, setData] = useState<CompleteCMSData>(INITIAL_CMS_DATA);

    useEffect(() => {
        setData(getCMSData());

        const handleUpdate = () => {
            setData(getCMSData());
        };

        window.addEventListener(UPDATE_EVENT, handleUpdate);
        window.addEventListener("storage", handleUpdate);

        return () => {
            window.removeEventListener(UPDATE_EVENT, handleUpdate);
            window.removeEventListener("storage", handleUpdate);
        };
    }, []);

    return {
        data,
        saveData: saveCMSData,
        updateSection: updateCMSSection,
        resetToDefault: resetCMSDataToDefault
    };
}

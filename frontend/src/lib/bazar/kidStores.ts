export interface KidProduct {
    id: string;
    title: string;
    sellingPrice: number;
    costPrice: number;
    profit: number;
    icon: string;
    category?: string;
}

export interface KidStore {
    id: string;
    childName: string;
    storeNameEn: string;
    storeNameAr: string;
    logo: string;
    descriptionEn: string;
    descriptionAr: string;
    colorTheme: string;
    bgGradient: string;
    products: KidProduct[];
    isOwnStore?: boolean;
    createdAt: string;
}

const STORAGE_KEY = "magica_kid_stores_v1";

const INITIAL_SEED_STORES: KidStore[] = [
    {
        id: "omar-tech-hub",
        childName: "Omar",
        storeNameEn: "Omar's Tech Lab & Robotics",
        storeNameAr: "مختبر عمر للتقنية والروبوتات",
        logo: "🤖",
        descriptionEn: "Welcome to my innovation hub! I design custom AI robot mini-figures, logic game puzzle pieces, and 3D printed magic wands!",
        descriptionAr: "مرحباً بكم في مختبر الابتكار! أقوم بتصميم مجسمات الروبوت الذكية، قطع ألعاب المنطق والمكعبات السحرية المطبوعة ثلاثية الأبعاد!",
        colorTheme: "from-purple-600 to-indigo-600",
        bgGradient: "bg-purple-500/10 border-purple-500/20 text-purple-600",
        createdAt: "2026-07-01",
        products: [
            { id: "p1", title: "Smart AI Wand Model / مجسم العصا الذكية", sellingPrice: 45, costPrice: 20, profit: 25, icon: "🪄", category: "Tech" },
            { id: "p2", title: "Mini Robot Rover / الروبوت الجوال الصغير", sellingPrice: 60, costPrice: 35, profit: 25, icon: "🤖", category: "Robotics" },
            { id: "p3", title: "Logic Puzzle Cube / مكعب الألغاز المنطقية", sellingPrice: 25, costPrice: 10, profit: 15, icon: "🎲", category: "Games" }
        ]
    },
    {
        id: "laila-art-studio",
        childName: "Laila",
        storeNameEn: "Laila's Magic Crafts & Jewelry",
        storeNameAr: "استوديو ليلى للمجوهرات والحرف السحرية",
        logo: "🎨",
        descriptionEn: "Handcrafted crystal bracelets, enchanted notebooks, and personalized fabric tote bags made with love and Magica creativity!",
        descriptionAr: "أساور بلورية يدوية الصنع، دفاتر ملاحظات سحرية، وحقائب قماشية مصممة بألوان ولمسات ماجيكا الفنية الإبداعية!",
        colorTheme: "from-orange-500 to-amber-600",
        bgGradient: "bg-orange-500/10 border-orange-500/20 text-orange-600",
        createdAt: "2026-07-05",
        products: [
            { id: "p4", title: "Crystal Gem Bracelet / سوار الأحجار البلورية", sellingPrice: 30, costPrice: 12, profit: 18, icon: "💎", category: "Jewelry" },
            { id: "p5", title: "Enchanted Sketchbook / دفتر الرسم السحري", sellingPrice: 20, costPrice: 8, profit: 12, icon: "📓", category: "Stationery" },
            { id: "p6", title: "Custom Embroidered Cap / قبعة مطرزة بأسلوبك", sellingPrice: 35, costPrice: 15, profit: 20, icon: "🧢", category: "Apparel" }
        ]
    },
    {
        id: "yassin-magic-bakery",
        childName: "Yassin",
        storeNameEn: "Yassin's Magic Snacks & Cookies",
        storeNameAr: "مخبز يس لحلويات ماجيكا اللذيذة",
        logo: "🍪",
        descriptionEn: "Delicious healthy energy bars, chocolate star cookies, and refreshing fruit elixir blends brewed for energetic Magica campers!",
        descriptionAr: "لوحات الطاقة الصحية، كوكيز النجوم بالشوكولاتة، ومشروبات الفاكهة الطبيعية المنعشة المحضرة خصيصاً لأبطال معسكر ماجيكا!",
        colorTheme: "from-emerald-500 to-teal-600",
        bgGradient: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600",
        createdAt: "2026-07-10",
        products: [
            { id: "p7", title: "Chocolate Star Cookies / كوكيز النجوم بالشوكولاتة", sellingPrice: 15, costPrice: 5, profit: 10, icon: "🍪", category: "Snacks" },
            { id: "p8", title: "Hero Energy Cupcakes / كب كيك الطاقة البطل", sellingPrice: 20, costPrice: 8, profit: 12, icon: "🧁", category: "Bakery" },
            { id: "p9", title: "Tropical Fruit Smoothie / عصير الفاكهة المنعش", sellingPrice: 18, costPrice: 7, profit: 11, icon: "🧃", category: "Drinks" }
        ]
    }
];

export function getKidStores(): KidStore[] {
    if (typeof window === "undefined") return INITIAL_SEED_STORES;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
        // Save initial seed if empty
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_STORES));
        return INITIAL_SEED_STORES;
    } catch (e) {
        console.error("Error reading kid stores from localStorage", e);
        return INITIAL_SEED_STORES;
    }
}

export function getStoreById(id: string): KidStore | undefined {
    const stores = getKidStores();
    return stores.find(s => s.id === id);
}

export function getChildPersonalStore(): KidStore | null {
    const stores = getKidStores();
    // Return the store created by the active child in their browser
    return stores.find(s => s.isOwnStore === true) || null;
}

export function createKidStore(data: {
    childName: string;
    storeNameEn: string;
    storeNameAr: string;
    logo: string;
    descriptionEn: string;
    descriptionAr: string;
    colorTheme?: string;
    bgGradient?: string;
}): KidStore {
    const stores = getKidStores();
    const id = data.storeNameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `store-${Date.now()}`;

    const newStore: KidStore = {
        id: `${id}-${Date.now().toString().slice(-4)}`,
        childName: data.childName || "Magica Champion",
        storeNameEn: data.storeNameEn,
        storeNameAr: data.storeNameAr,
        logo: data.logo || "🛍️",
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        colorTheme: data.colorTheme || "from-orange-500 to-purple-600",
        bgGradient: data.bgGradient || "bg-orange-500/10 border-orange-500/20 text-orange-600",
        products: [],
        isOwnStore: true,
        createdAt: new Date().toISOString().split("T")[0]
    };

    // Replace old personal store if one already existed or append
    const existingIndex = stores.findIndex(s => s.isOwnStore === true);
    let updatedStores = [...stores];
    if (existingIndex >= 0) {
        newStore.products = updatedStores[existingIndex].products; // keep existing products if rebuilding profile
        updatedStores[existingIndex] = newStore;
    } else {
        updatedStores = [newStore, ...stores];
    }

    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStores));
        window.dispatchEvent(new CustomEvent("magica-stores-updated"));
    }

    return newStore;
}

export function addProductToStore(storeId: string, productData: {
    title: string;
    sellingPrice: number;
    costPrice: number;
    icon: string;
    category?: string;
}): KidProduct | null {
    const stores = getKidStores();
    const index = stores.findIndex(s => s.id === storeId);
    if (index === -1) return null;

    const profit = Number(productData.sellingPrice) - Number(productData.costPrice);
    const newProduct: KidProduct = {
        id: `prod-${Date.now()}-${Math.floor(Math.random()*1000)}`,
        title: productData.title,
        sellingPrice: Number(productData.sellingPrice),
        costPrice: Number(productData.costPrice),
        profit: isNaN(profit) ? 0 : profit,
        icon: productData.icon || "🎁",
        category: productData.category || "Magica Item"
    };

    stores[index].products.unshift(newProduct);

    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
        window.dispatchEvent(new CustomEvent("magica-stores-updated"));
    }

    return newProduct;
}

export function removeProductFromStore(storeId: string, productId: string): boolean {
    const stores = getKidStores();
    const index = stores.findIndex(s => s.id === storeId);
    if (index === -1) return false;

    stores[index].products = stores[index].products.filter(p => p.id !== productId);

    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
        window.dispatchEvent(new CustomEvent("magica-stores-updated"));
    }

    return true;
}

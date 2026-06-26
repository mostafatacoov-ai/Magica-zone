"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ShoppingCart, Package, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const PRODUCTS = [
    { id: "1", nameEn: "Magic Camp T-Shirt", nameAr: "تيشيرت المخيم السحري", price: 25, image: "👕" },
    { id: "2", nameEn: "Wizard Cap", nameAr: "قبعة الساحر", price: 15, image: "🧢" },
    { id: "3", nameEn: "Spell Book Notebook", nameAr: "دفتر تعويذات", price: 10, image: "📓" },
    { id: "4", nameEn: "Magic Wand Pen", nameAr: "قلم عصا سحرية", price: 5, image: "🪄" },
];

export default function ShopPage({ params: { lang } }: { params: { lang: string } }) {
    const { user } = useAuth();
    const isArabic = lang === 'ar';
    const [cart, setCart] = useState<any[]>([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const addToCart = (product: any) => {
        setCart(prev => [...prev, product]);
    };

    const removeFromCart = (index: number) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handleCheckout = async () => {
        if (!user || cart.length === 0) return;
        setIsCheckingOut(true);
        try {
            await addDoc(collection(db, "orders"), {
                userId: user.uid,
                items: cart,
                total,
                status: "pending",
                createdAt: serverTimestamp()
            });
            setCart([]);
            setOrderPlaced(true);
            setTimeout(() => setOrderPlaced(false), 5000);
        } catch (error) {
            console.error("Failed to place order", error);
        }
        setIsCheckingOut(false);
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Products Grid */}
            <div className="flex-1 space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    {isArabic ? "متجر المخيم" : "Camp Shop"}
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {PRODUCTS.map(product => (
                        <div key={product.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:border-orange-200 transition-colors">
                            <div className="text-6xl mb-4">{product.image}</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {isArabic ? product.nameAr : product.nameEn}
                            </h3>
                            <p className="text-orange-500 font-bold text-lg mb-4">${product.price}</p>
                            <button 
                                onClick={() => addToCart(product)}
                                className="w-full py-2 bg-orange-100 text-orange-600 font-bold rounded-xl hover:bg-orange-200 transition-colors"
                            >
                                {isArabic ? "إضافة للسلة" : "Add to Cart"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cart Widget */}
            <div className="w-full md:w-80 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 sticky top-10">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <ShoppingCart className="w-6 h-6 text-gray-800" />
                    <h2 className="text-xl font-bold text-gray-800">
                        {isArabic ? "سلة المشتريات" : "Your Cart"}
                    </h2>
                </div>

                {orderPlaced ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 text-green-500">
                        <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                        <p className="font-bold">{isArabic ? "تم استلام طلبك!" : "Order placed successfully!"}</p>
                    </motion.div>
                ) : cart.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>{isArabic ? "السلة فارغة" : "Your cart is empty"}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="max-h-60 overflow-y-auto space-y-2">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">{isArabic ? item.nameAr : item.nameEn}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold">${item.price}</span>
                                        <button onClick={() => removeFromCart(idx)} className="text-red-500 text-xs hover:underline">
                                            {isArabic ? "حذف" : "Remove"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center font-bold text-lg">
                            <span>{isArabic ? "المجموع:" : "Total:"}</span>
                            <span>${total}</span>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
                        >
                            {isCheckingOut 
                                ? (isArabic ? "جاري الإرسال..." : "Processing...") 
                                : (isArabic ? "تأكيد الطلب" : "Place Order Request")}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

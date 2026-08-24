import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id: String,
    title: String,
    sellingPrice: Number,
    costPrice: Number,
    profit: Number,
    icon: String,
    category: String,
    imageUrl: String
}, { _id: false });

const StoreSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Store ID
    userId: String,
    childName: String,
    storeNameEn: String,
    storeNameAr: String,
    logo: String,
    descriptionEn: String,
    descriptionAr: String,
    colorTheme: String,
    bgGradient: String,
    products: [ProductSchema],
    bannerUrl: String,
    createdAt: { type: String, default: () => new Date().toISOString().split("T")[0] },
}, { strict: false });

export const Store = mongoose.models.Store || mongoose.model("Store", StoreSchema);

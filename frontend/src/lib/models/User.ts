import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true }, // Firebase UID
    email: { type: String, required: true },
    displayName: String,
    role: { type: String, enum: ["admin", "teacher", "parent", "child"], default: "parent" },
    status: { type: String, enum: ["pending_approval", "approved", "rejected"], default: "pending_approval" },
    createdAt: { type: Date, default: Date.now },
}, { strict: false });

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

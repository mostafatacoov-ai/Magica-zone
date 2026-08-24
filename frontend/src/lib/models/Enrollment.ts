import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
    childId: { type: String, required: true },
    courseId: { type: String, required: true },
    titleEn: String,
    titleAr: String,
    status: { type: String, enum: ["active", "completed"], default: "active" },
    createdAt: { type: Date, default: Date.now },
}, { strict: false });

export const Enrollment = mongoose.models.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);

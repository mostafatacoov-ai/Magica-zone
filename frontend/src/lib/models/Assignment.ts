import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
    courseId: { type: String, required: true },
    teacherId: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    maxScore: { type: Number, default: 100 },
    createdAt: { type: Date, default: Date.now },
}, { strict: false });

export const Assignment = mongoose.models.Assignment || mongoose.model("Assignment", AssignmentSchema);

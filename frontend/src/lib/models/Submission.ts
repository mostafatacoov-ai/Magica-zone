import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
    assignmentId: { type: String, required: true },
    childId: { type: String, required: true },
    courseId: { type: String, required: true },
    content: String,
    link: String,
    score: { type: Number, default: null },
    feedback: { type: String, default: null },
    status: { type: String, enum: ["submitted", "graded"], default: "submitted" },
    createdAt: { type: Date, default: Date.now },
}, { strict: false });

export const Submission = mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema);

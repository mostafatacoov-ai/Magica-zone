import mongoose from "mongoose";

const CMSContentSchema = new mongoose.Schema({
    updatedAt: { type: Date, default: Date.now },
    hero: mongoose.Schema.Types.Mixed,
    courses: mongoose.Schema.Types.Mixed,
    camps: mongoose.Schema.Types.Mixed,
    food: mongoose.Schema.Types.Mixed,
    uniforms: mongoose.Schema.Types.Mixed,
    supplies: mongoose.Schema.Types.Mixed,
    podcasts: mongoose.Schema.Types.Mixed,
    games: mongoose.Schema.Types.Mixed,
    events: mongoose.Schema.Types.Mixed,
    bazar: mongoose.Schema.Types.Mixed,
}, { strict: false });

// Ensure we only compile the model once (Next.js hot reload safety)
export const CMSContent = mongoose.models.CMSContent || mongoose.model("CMSContent", CMSContentSchema);

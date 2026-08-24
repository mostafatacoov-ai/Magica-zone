// src/components/ui/SectorBadge.tsx
import React from "react";
import {
    GraduationCap, Tent, ShoppingBag, Gamepad2,
    Store, UtensilsCrossed, Mic, Shirt, Music2
} from "lucide-react";

export type SectorType =
    | "courses"
    | "camp"
    | "supplies"
    | "games"
    | "bazar"
    | "food"
    | "podcast"
    | "uniform"
    | "songs";

interface SectorBadgeProps {
    sector: SectorType;
    lang?: string;
    customLabel?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const SECTOR_CONFIG: Record<
    SectorType,
    { labelEn: string; labelAr: string; icon: React.ElementType; styles: string }
> = {
    courses: {
        labelEn: "Magica Courses",
        labelAr: "دورات ماجيكا",
        icon: GraduationCap,
        styles: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
    camp: {
        labelEn: "Magica Camp",
        labelAr: "مخيم ماجيكا",
        icon: Tent,
        styles: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    supplies: {
        labelEn: "Magica Supplies",
        labelAr: "مستلزمات ماجيكا",
        icon: ShoppingBag,
        styles: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    },
    games: {
        labelEn: "Mind Games",
        labelAr: "ألعاب التفكير",
        icon: Gamepad2,
        styles: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    },
    bazar: {
        labelEn: "Magica Bazar",
        labelAr: "بازار ماجيكا",
        icon: Store,
        styles: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
    food: {
        labelEn: "Magica Food",
        labelAr: "أغذية ماجيكا",
        icon: UtensilsCrossed,
        styles: "bg-green-500/10 text-green-400 border-green-500/30",
    },
    podcast: {
        labelEn: "Magica Podcast",
        labelAr: "بودكاست ماجيكا",
        icon: Mic,
        styles: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    },
    uniform: {
        labelEn: "Magica Uniform",
        labelAr: "زي ماجيكا الرسمي",
        icon: Shirt,
        styles: "bg-blue-900/30 text-blue-300 border-blue-400/30",
    },
    songs: {
        labelEn: "Songs & Anthems",
        labelAr: "الأناشيد والأغاني",
        icon: Music2,
        styles: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
    },
};

export default function SectorBadge({
    sector,
    lang = "en",
    customLabel,
    size = "md",
    className = "",
}: SectorBadgeProps) {
    const isArabic = lang === "ar";
    const config = SECTOR_CONFIG[sector];
    const Icon = config.icon;

    const sizeClasses = {
        sm: "px-2.5 py-0.5 text-xs gap-1.5",
        md: "px-3 py-1 text-xs font-semibold gap-2",
        lg: "px-4 py-1.5 text-sm font-bold gap-2.5",
    };

    const label = customLabel || (isArabic ? config.labelAr : config.labelEn);

    return (
        <span
            className={`inline-flex items-center rounded-full border backdrop-blur-md transition-all ${config.styles} ${sizeClasses[size]} ${className}`}
        >
            <Icon className={size === "sm" ? "w-3 h-3" : size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5"} />
            <span>{label}</span>
        </span>
    );
}
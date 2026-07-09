import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/logo.png";

const SUB_BRANDS = (lang: string, isArabic: boolean) => [
    { emoji: "🏕️", label: isArabic ? "ماجيك كامب" : "Magic Camp", href: `/${lang}/magic-camp`, tagline: isArabic ? "صيف واحد يغيّر كل شيء" : "One Summer Changes Everything" },
    { emoji: "🛍️", label: isArabic ? "ماجيك بازار" : "Magic Bazar", href: `/${lang}/magic-bazar`, tagline: isArabic ? "اشتري. بيع. تعلّم. انجح." : "Buy. Sell. Learn. Succeed." },
    { emoji: "🍱", label: isArabic ? "ماجيك فود" : "Magic Food", href: `/${lang}/magic-food`, tagline: isArabic ? "أكل صح = تفكير صح" : "Eat Right = Think Right" },
    { emoji: "🎙️", label: isArabic ? "ماجيك بودكاست" : "Magic Podcast", href: `/${lang}/magic-podcast`, tagline: isArabic ? "كلام بيفرق" : "Words That Matter" },
    { emoji: "👕", label: isArabic ? "ماجيك يونيفورم" : "Magic Uniform", href: `/${lang}/magic-uniform`, tagline: isArabic ? "البس هويتك" : "Wear Your Identity" },
    { emoji: "🎒", label: isArabic ? "ماجيك سبلايز" : "Magic Supplies", href: `/${lang}/magic-supplies`, tagline: isArabic ? "جهّز نفسك. جهّز مستقبلك." : "Equip Yourself. Equip Your Future." },
];

export default function Footer({ lang }: { lang: string }) {
    const isArabic = lang === 'ar';
    const brands = SUB_BRANDS(lang, isArabic);

    return (
        <footer className="relative z-10 bg-gray-900 text-white mt-auto">
            {/* Top gradient separator */}
            <div className="h-1 bg-gradient-to-r from-orange-500 via-purple-500 to-green-500" />

            <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href={`/${lang}`} className="inline-block mb-4 hover:opacity-80 transition-opacity">
                            <Image src={logoImg} alt="Magica Zone Logo" className="h-16 w-auto object-contain brightness-0 invert" />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            {isArabic
                                ? "حيث يبدأ بناء الإنسان. نجهّز الأطفال بالمهارات والخبرات التي يحتاجها الإنسان الناجح."
                                : "Where human excellence begins. We equip children with the skills and experiences successful people need."}
                        </p>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400 font-black text-sm">
                            {isArabic ? "هنا يُصنع الجيل." : "Where Children Become Leaders."}
                        </p>
                    </div>

                    {/* Our World Column */}
                    <div className="lg:col-span-2">
                        <h3 className="font-black text-white mb-5 text-sm uppercase tracking-widest">
                            {isArabic ? "عالمنا" : "Our World"}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {brands.map((brand, idx) => (
                                <Link
                                    key={idx}
                                    href={brand.href}
                                    className="group flex items-start gap-2.5 py-2 hover:text-orange-400 transition-colors"
                                >
                                    <span className="text-lg shrink-0 mt-0.5">{brand.emoji}</span>
                                    <div>
                                        <div className="text-sm font-bold text-gray-300 group-hover:text-orange-400 transition-colors">{brand.label}</div>
                                        <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors leading-tight">{brand.tagline}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h3 className="font-black text-white mb-5 text-sm uppercase tracking-widest">
                            {isArabic ? "روابط سريعة" : "Quick Links"}
                        </h3>
                        <div className="flex flex-col gap-3">
                            <Link href={`/${lang}`} className="text-gray-400 hover:text-orange-400 transition-colors text-sm font-semibold">
                                {isArabic ? "الرئيسية" : "Home"}
                            </Link>
                            <Link href={`/${lang}/about`} className="text-gray-400 hover:text-orange-400 transition-colors text-sm font-semibold">
                                {isArabic ? "عن ماجيكا زون" : "About Magica Zone"}
                            </Link>
                            <Link href={`/${lang}/register`} className="text-gray-400 hover:text-orange-400 transition-colors text-sm font-semibold">
                                {isArabic ? "سجّل الآن" : "Register Now"}
                            </Link>
                            <Link href={`/${lang}/login`} className="text-gray-400 hover:text-orange-400 transition-colors text-sm font-semibold">
                                {isArabic ? "بوابة الأهالي" : "Parent Portal"}
                            </Link>
                        </div>

                        <h3 className="font-black text-white mt-8 mb-4 text-sm uppercase tracking-widest">
                            {isArabic ? "تواصل معنا" : "Contact Us"}
                        </h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-400">
                            <span>📧 hello@magicazone.com</span>
                            <span>📱 {isArabic ? "واتساب" : "WhatsApp"}: +966 500 000 000</span>
                            <span>📍 {isArabic ? "المملكة العربية السعودية" : "Saudi Arabia"}</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Magica Zone.{" "}
                        {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">{isArabic ? "متوفر بـ" : "Available in"}</span>
                        <Link href="/en" className="text-xs font-bold text-gray-500 hover:text-orange-400 transition-colors">EN</Link>
                        <span className="text-gray-700">|</span>
                        <Link href="/ar" className="text-xs font-bold text-gray-500 hover:text-orange-400 transition-colors">عربي</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

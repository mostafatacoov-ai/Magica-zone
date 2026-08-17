"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const acceptLanguage = navigator.language || '';
        const targetLang = acceptLanguage.toLowerCase().includes('en') && !acceptLanguage.toLowerCase().startsWith('ar') ? 'en' : 'ar';
        router.push(`/${targetLang}`);
    }, [router]);

    if (!mounted) return null;

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50 text-gray-800 font-sans">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold">جارٍ التوجيه إلى ماجيكا... / Redirecting to Magica...</p>
            </div>
        </div>
    );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MagicaLoader from '@/components/ui/MagicaLoader';

export default function RootPage() {
    const router = useRouter();

    useEffect(() => {
        // Automatically route visitors entering magica-group.com directly to the home page
        const userLang = typeof window !== 'undefined' && navigator.language ? navigator.language : 'ar';
        const targetLang = userLang.toLowerCase().startsWith('ar') ? 'ar' : 'en';
        
        router.replace(`/${targetLang}`);
    }, [router]);

    return (
        <MagicaLoader 
            fullScreen={true} 
            text="MAGICA GROUP" 
            subText="مرحباً بكم في عالم ماجيكا / Welcome to Magica..." 
        />
    );
}

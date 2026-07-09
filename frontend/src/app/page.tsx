'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
    const router = useRouter();

    useEffect(() => {
        // Detect browser language
        const userLang = navigator.language;
        const targetLang = userLang.startsWith('ar') ? 'ar' : 'en';
        
        router.replace(`/${targetLang}`);
    }, [router]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
            <p>Loading...</p>
        </div>
    );
}

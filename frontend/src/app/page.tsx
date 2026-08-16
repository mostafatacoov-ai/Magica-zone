import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default function RootPage() {
    // Read the user's preferred language from the headers
    const headersList = headers();
    const acceptLanguage = headersList.get('accept-language') || '';
    
    // Default to Arabic unless English is preferred
    const targetLang = acceptLanguage.toLowerCase().includes('en') && !acceptLanguage.toLowerCase().startsWith('ar') ? 'en' : 'ar';
    
    // Instantly redirect on the server
    redirect(`/${targetLang}`);
}

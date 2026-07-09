import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { idToken, role } = await request.json();
        
        if (!idToken || !role) {
            return NextResponse.json({ error: 'Missing idToken or role' }, { status: 400 });
        }

        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const uid = decodedToken.uid;
        
        await adminAuth.setCustomUserClaims(uid, { role });
        
        return NextResponse.json({ success: true, message: `Role ${role} set for user ${uid}` });
    } catch (error: any) {
        console.error('Error setting custom claims:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

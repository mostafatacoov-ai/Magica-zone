import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { idToken, email, password, name, age } = await request.json();

        if (!idToken || !email || !password || !name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const parentUid = decodedToken.uid;
        
        if (decodedToken.role !== 'parent' && decodedToken.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const userRecord = await adminAuth.createUser({
            email,
            password,
            displayName: name,
        });

        const childUid = userRecord.uid;

        await adminAuth.setCustomUserClaims(childUid, { role: 'child' });

        await adminDb.collection('users').doc(childUid).set({
            email,
            role: 'child',
            status: 'approved',
            name,
            age,
            parentUid,
            createdAt: FieldValue.serverTimestamp(),
        });

        await adminDb.collection('users').doc(parentUid).set({
            children: FieldValue.arrayUnion(childUid)
        }, { merge: true });

        return NextResponse.json({ success: true, message: 'Child created', childUid });
    } catch (error: any) {
        console.error('Error creating child:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

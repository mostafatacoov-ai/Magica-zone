import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: Request) {
    try {
        const { idToken, email, password, name, age } = await request.json();

        // Verify the request is from an authenticated user (Parent or Admin)
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const parentUid = decodedToken.uid;
        
        if (decodedToken.role !== 'parent' && decodedToken.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // Create the child user in Firebase Auth
        const userRecord = await adminAuth.createUser({
            email,
            password,
            displayName: name,
        });

        const childUid = userRecord.uid;

        // Set custom claim 'child'
        await adminAuth.setCustomUserClaims(childUid, { role: 'child' });

        // Save child data in Firestore 'users' collection
        await adminDb.collection('users').doc(childUid).set({
            email,
            role: 'child',
            status: 'approved', // children are instantly approved
            name,
            age,
            parentUid,
            createdAt: FieldValue.serverTimestamp(),
        });

        // Link child to Parent's document
        await adminDb.collection('users').doc(parentUid).set({
            children: FieldValue.arrayUnion(childUid)
        }, { merge: true });

        return NextResponse.json({ success: true, message: `Child created`, childUid });

    } catch (error: any) {
        console.error('Error creating child:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

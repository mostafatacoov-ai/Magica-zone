import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export async function POST(request: Request) {
    try {
        const { idToken, role, uid, email } = await request.json();

        // 1. Verify the ID token first to ensure the request is from an authenticated user
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const requestUid = decodedToken.uid;

        // Security check: Either the user is setting their own initial role (e.g., Parent registration)
        // OR the user making the request is an Admin.
        const isSelf = requestUid === uid;
        const isAdmin = decodedToken.role === 'admin';

        if (!isSelf && !isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // 2. Set the custom claim
        await adminAuth.setCustomUserClaims(uid, { role });

        // 3. Update Firestore
        // Since parents default to 'pending_approval', we set it here.
        // Admins can be approved immediately (though admins should ideally be set manually in FB console)
        const status = role === 'admin' ? 'approved' : 'pending_approval';

        await adminDb.collection('users').doc(uid).set({
            email,
            role,
            status,
            updatedAt: new Date(),
        }, { merge: true });

        return NextResponse.json({ success: true, message: `Role ${role} set for user ${uid}` });

    } catch (error: any) {
        console.error('Error setting custom claims:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

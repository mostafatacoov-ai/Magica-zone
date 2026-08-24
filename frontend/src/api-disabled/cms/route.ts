import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = getAdminDb();
        const docRef = db.collection('cms_content').doc('main');
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({ success: true, data: null });
        }

        return NextResponse.json({ success: true, data: docSnap.data() });
    } catch (error: any) {
        console.error('Error fetching CMS data from Firestore:', error);
        return NextResponse.json({ success: false, error: error.message, data: null }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { section, data } = body;

        if (!data) {
            return NextResponse.json({ success: false, error: 'Missing data payload' }, { status: 400 });
        }

        const db = getAdminDb();
        const docRef = db.collection('cms_content').doc('main');

        let updatePayload: Record<string, any> = {
            updatedAt: new Date().toISOString()
        };

        if (section) {
            updatePayload[section] = data;
        } else if (typeof data === 'object') {
            updatePayload = {
                ...data,
                updatedAt: new Date().toISOString()
            };
        }

        await docRef.set(updatePayload, { merge: true });

        return NextResponse.json({
            success: true,
            message: section ? `CMS section ${section} updated successfully` : 'CMS data updated successfully',
            updatedAt: updatePayload.updatedAt
        });
    } catch (error: any) {
        console.error('Error saving CMS data to Firestore:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

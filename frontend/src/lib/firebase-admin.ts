import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
    try {
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID || 'dummy-project-id',
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL || 'dummy@example.com',
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '-----BEGIN PRIVATE KEY-----\n-----END PRIVATE KEY-----\n',
            })
        });
    } catch (error) {
        console.warn('Firebase admin initialization failed (this is expected during build if env vars are missing).');
    }
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();

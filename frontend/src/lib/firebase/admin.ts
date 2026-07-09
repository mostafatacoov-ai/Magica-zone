import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

const firebaseConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!getApps().length) {
    if (firebaseConfig.projectId && firebaseConfig.privateKey) {
        try {
            initializeApp({
                credential: cert(firebaseConfig),
            });
        } catch (error: any) {
            console.error('Firebase admin initialization error', error.stack);
        }
    } else {
        console.warn('Firebase Admin environment variables missing. Skipping initialization (expected during build).');
    }
}

// Use getter functions to guarantee getAuth() and getFirestore() are not called at build-time by Webpack inspection
export const getAdminAuth = () => {
    return getAuth();
};

export const getAdminDb = () => {
    return getFirestore();
};

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

// Use getters via Proxies so getAuth() and getFirestore() are not called at build-time
export const adminAuth = new Proxy({} as Auth, {
    get: (target, prop) => {
        const auth = getAuth();
        const value = auth[prop as keyof Auth];
        return typeof value === 'function' ? value.bind(auth) : value;
    }
});

export const adminDb = new Proxy({} as Firestore, {
    get: (target, prop) => {
        const db = getFirestore();
        const value = db[prop as keyof Firestore];
        return typeof value === 'function' ? value.bind(db) : value;
    }
});

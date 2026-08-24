import { doc, setDoc } from 'firebase/firestore';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from 'firebase/auth';
import { auth, db } from './firebase';

export const registerParent = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Set user role in Firestore directly instead of using Admin API
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
            email: user.email,
            role: 'parent',
            createdAt: new Date().toISOString()
        });

        // Trigger token refresh to propagate auth state
        await user.getIdToken(true);

        return user;
    } catch (error) {
        console.error("Error registering parent:", error);
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

import { auth } from './firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from 'firebase/auth';

export const registerParent = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Force token refresh to get a fresh token to send to our API
        const idToken = await user.getIdToken(true);

        // Call our API route to set the custom claim to "parent" and create Firestore doc
        const res = await fetch(`/api/auth/setCustomClaims`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken,
                role: 'parent',
                uid: user.uid,
                email: user.email
            })
        });

        if (!res.ok) {
            throw new Error('Failed to set parent role');
        }

        // Refresh token again so the client has the claim locally
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

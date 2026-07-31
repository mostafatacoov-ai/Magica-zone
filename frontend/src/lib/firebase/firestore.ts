import { db } from "./firebase";
import { collection, query, where, getDocs, doc, updateDoc, getDoc, setDoc, serverTimestamp, addDoc, onSnapshot, deleteDoc } from "firebase/firestore";

// --- Admin User Management Helpers ---
export async function getAllUsers() {
    try {
        const q = query(collection(db, "users"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error("Error fetching users from firestore:", e);
        return [];
    }
}

export async function updateUserRole(uid: string, role: string) {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, { role, updatedAt: serverTimestamp() });
    } catch (e) {
        console.error("Error updating user role:", e);
    }
}

export async function updateUserStatus(uid: string, status: string) {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, { status, updatedAt: serverTimestamp() });
    } catch (e) {
        console.error("Error updating user status:", e);
    }
}

export async function createAdminUserDoc(userData: any) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            ...userData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (e) {
        console.error("Error creating user doc in firestore:", e);
        return null;
    }
}

export async function deleteUserDoc(uid: string) {
    try {
        const userRef = doc(db, "users", uid);
        await deleteDoc(userRef);
    } catch (e) {
        console.error("Error deleting user doc from firestore:", e);
    }
}

// --- Admin Approvals Helpers ---
export async function getPendingParents() {
    const q = query(
        collection(db, "users"), 
        where("role", "==", "parent"), 
        where("status", "==", "pending_approval")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function approveParent(uid: string) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { status: "approved" });
}

// --- Chat Helpers ---
export async function getAssignedTeachers(parentUid: string) {
    const q = query(collection(db, "users"), where("role", "==", "teacher"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getOrCreateChat(user1Uid: string, user2Uid: string) {
    const chatId = user1Uid < user2Uid ? `${user1Uid}_${user2Uid}` : `${user2Uid}_${user1Uid}`;
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
        await setDoc(chatRef, {
            participants: [user1Uid, user2Uid],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            lastMessage: ""
        });
    }
    
    return chatId;
}

export async function sendMessage(chatId: string, senderId: string, text: string) {
    const chatRef = doc(db, "chats", chatId);
    const messagesRef = collection(chatRef, "messages");
    
    await addDoc(messagesRef, {
        senderId,
        text,
        createdAt: serverTimestamp()
    });

    await updateDoc(chatRef, {
        lastMessage: text,
        updatedAt: serverTimestamp()
    });
}

// --- Gamification Helpers ---
export async function getAllStudents() {
    // For MVP, Teacher sees all children
    const q = query(collection(db, "users"), where("role", "==", "child"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function awardPoints(childId: string, teacherId: string, amount: number) {
    const pointsRef = collection(db, "points");
    await addDoc(pointsRef, {
        childId,
        teacherId,
        amount,
        createdAt: serverTimestamp()
    });
}

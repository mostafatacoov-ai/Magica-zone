"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, IdTokenResult } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase/firebase";

interface AuthContextType {
    user: User | null;
    role: "admin" | "teacher" | "parent" | "child" | null;
    status: "pending_approval" | "approved" | "rejected" | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    status: null,
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<AuthContextType["role"]>(null);
    const [status, setStatus] = useState<AuthContextType["status"]>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    // First, check Custom Claims (from token)
                    const tokenResult: IdTokenResult = await currentUser.getIdTokenResult();
                    
                    // Then fetch the Firestore document to get immediate UI status updates
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const data = userDocSnap.data();
                        setRole(data.role || tokenResult.claims.role || null);
                        setStatus(data.status || null);
                    } else {
                        setRole((tokenResult.claims.role as any) || null);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setRole(null);
                setStatus(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, status, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

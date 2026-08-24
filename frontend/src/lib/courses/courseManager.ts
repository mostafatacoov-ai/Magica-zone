import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, doc, setDoc, addDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { awardPoints } from "../firebase/firestore";

// --- Types ---
export interface Enrollment {
    id: string;
    childId: string;
    courseId: string;
    titleEn: string;
    titleAr: string;
    status: "active" | "completed";
    createdAt: any;
}

export interface Assignment {
    id: string;
    courseId: string;
    teacherId: string;
    title: string;
    description: string;
    maxScore: number;
    createdAt: any;
}

export interface Submission {
    id: string;
    assignmentId: string;
    childId: string;
    courseId: string;
    content: string;
    link: string; // URL for Google Drive, Canva, etc.
    score: number | null;
    feedback: string | null;
    status: "submitted" | "graded";
    createdAt: any;
}

// --- Enrollments ---
export async function enrollChildInCourse(childId: string, courseId: string, titleEn: string, titleAr: string): Promise<boolean> {
    try {
        // Check if already enrolled
        const q = query(collection(db, "enrollments"), where("childId", "==", childId), where("courseId", "==", courseId));
        const snap = await getDocs(q);
        if (!snap.empty) {
            return true; // Already enrolled
        }

        await addDoc(collection(db, "enrollments"), {
            childId,
            courseId,
            titleEn,
            titleAr,
            status: "active",
            createdAt: serverTimestamp()
        });
        return true;
    } catch (e) {
        console.error("Error enrolling child:", e);
        return false;
    }
}

export async function getChildEnrollments(childId: string): Promise<Enrollment[]> {
    try {
        const q = query(collection(db, "enrollments"), where("childId", "==", childId));
        const snap = await getDocs(q);
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Enrollment));
    } catch (e) {
        console.error("Error fetching enrollments:", e);
        return [];
    }
}

export async function getCourseEnrollments(courseId: string): Promise<Enrollment[]> {
    try {
        const q = query(collection(db, "enrollments"), where("courseId", "==", courseId));
        const snap = await getDocs(q);
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Enrollment));
    } catch (e) {
        console.error("Error fetching course enrollments:", e);
        return [];
    }
}

// --- Assignments ---
export async function createAssignment(courseId: string, teacherId: string, title: string, description: string, maxScore: number): Promise<boolean> {
    try {
        await addDoc(collection(db, "assignments"), {
            courseId,
            teacherId,
            title,
            description,
            maxScore,
            createdAt: serverTimestamp()
        });
        return true;
    } catch (e) {
        console.error("Error creating assignment:", e);
        return false;
    }
}

export async function getCourseAssignments(courseId: string): Promise<Assignment[]> {
    try {
        const q = query(collection(db, "assignments"), where("courseId", "==", courseId));
        const snap = await getDocs(q);
        // Sort manually if no index exists, or just return as is (client can sort)
        const assignments = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Assignment));
        return assignments.sort((a, b) => {
            const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
            const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
            return timeB - timeA;
        });
    } catch (e) {
        console.error("Error fetching assignments:", e);
        return [];
    }
}

// --- Submissions ---
export async function submitAssignment(assignmentId: string, childId: string, courseId: string, content: string, link: string): Promise<boolean> {
    try {
        // Check if already submitted
        const q = query(collection(db, "submissions"), where("assignmentId", "==", assignmentId), where("childId", "==", childId));
        const snap = await getDocs(q);
        
        if (!snap.empty) {
            // Update existing submission if it hasn't been graded yet
            const existingDoc = snap.docs[0];
            const data = existingDoc.data() as Submission;
            if (data.status === "graded") return false; // Can't update graded
            
            await updateDoc(doc(db, "submissions", existingDoc.id), {
                content,
                link,
                createdAt: serverTimestamp()
            });
            return true;
        }

        await addDoc(collection(db, "submissions"), {
            assignmentId,
            childId,
            courseId,
            content,
            link,
            score: null,
            feedback: null,
            status: "submitted",
            createdAt: serverTimestamp()
        });
        return true;
    } catch (e) {
        console.error("Error submitting assignment:", e);
        return false;
    }
}

export async function getAssignmentSubmissions(assignmentId: string): Promise<Submission[]> {
    try {
        const q = query(collection(db, "submissions"), where("assignmentId", "==", assignmentId));
        const snap = await getDocs(q);
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Submission));
    } catch (e) {
        console.error("Error fetching submissions:", e);
        return [];
    }
}

export async function getCourseSubmissions(courseId: string): Promise<Submission[]> {
    try {
        const q = query(collection(db, "submissions"), where("courseId", "==", courseId));
        const snap = await getDocs(q);
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Submission));
    } catch (e) {
        console.error("Error fetching course submissions:", e);
        return [];
    }
}

export async function getChildSubmissions(childId: string): Promise<Submission[]> {
    try {
        const q = query(collection(db, "submissions"), where("childId", "==", childId));
        const snap = await getDocs(q);
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Submission));
    } catch (e) {
        console.error("Error fetching child submissions:", e);
        return [];
    }
}

export async function gradeSubmission(submissionId: string, score: number, feedback: string, teacherId: string, childId: string): Promise<boolean> {
    try {
        const subRef = doc(db, "submissions", submissionId);
        await updateDoc(subRef, {
            score,
            feedback,
            status: "graded"
        });

        // Award points to child automatically!
        if (score > 0) {
            await awardPoints(childId, teacherId, score);
        }
        
        return true;
    } catch (e) {
        console.error("Error grading submission:", e);
        return false;
    }
}

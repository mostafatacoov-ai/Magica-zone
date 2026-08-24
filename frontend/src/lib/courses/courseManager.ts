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
        const res = await fetch("/api/enrollments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ childId, courseId, titleEn, titleAr, status: "active" })
        });
        const data = await res.json();
        return data.success;
    } catch (e) {
        console.error("Error enrolling child:", e);
        return false;
    }
}

export async function getChildEnrollments(childId: string): Promise<Enrollment[]> {
    try {
        const res = await fetch(`/api/enrollments?childId=${childId}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error("Error fetching enrollments:", e);
        return [];
    }
}

export async function getCourseEnrollments(courseId: string): Promise<Enrollment[]> {
    try {
        const res = await fetch(`/api/enrollments?courseId=${courseId}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error("Error fetching course enrollments:", e);
        return [];
    }
}

// --- Assignments ---
export async function createAssignment(courseId: string, teacherId: string, title: string, description: string, maxScore: number): Promise<boolean> {
    try {
        const res = await fetch("/api/assignments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId, teacherId, title, description, maxScore })
        });
        const data = await res.json();
        return data.success;
    } catch (e) {
        console.error("Error creating assignment:", e);
        return false;
    }
}

export async function getCourseAssignments(courseId: string): Promise<Assignment[]> {
    try {
        const res = await fetch(`/api/assignments?courseId=${courseId}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error("Error fetching assignments:", e);
        return [];
    }
}

// --- Submissions ---
export async function submitAssignment(assignmentId: string, childId: string, courseId: string, content: string, link: string): Promise<boolean> {
    try {
        const res = await fetch("/api/submissions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ assignmentId, childId, courseId, content, link })
        });
        const data = await res.json();
        return data.success;
    } catch (e) {
        console.error("Error submitting assignment:", e);
        return false;
    }
}

export async function getAssignmentSubmissions(assignmentId: string): Promise<Submission[]> {
    try {
        const res = await fetch(`/api/submissions?assignmentId=${assignmentId}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error("Error fetching submissions:", e);
        return [];
    }
}

export async function getCourseSubmissions(courseId: string): Promise<Submission[]> {
    try {
        const res = await fetch(`/api/submissions?courseId=${courseId}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error("Error fetching course submissions:", e);
        return [];
    }
}

export async function getChildSubmissions(childId: string): Promise<Submission[]> {
    try {
        const res = await fetch(`/api/submissions?childId=${childId}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error("Error fetching child submissions:", e);
        return [];
    }
}

export async function gradeSubmission(submissionId: string, score: number, feedback: string, teacherId: string, childId: string): Promise<boolean> {
    try {
        const res = await fetch("/api/submissions", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ submissionId, score, feedback })
        });
        
        // Award points to child automatically!
        if (score > 0) {
            // we should call the users API to add points
            const userRes = await fetch(`/api/users/${childId}`);
            if (userRes.ok) {
                const user = await userRes.json();
                const currentPoints = user.points || 0;
                await fetch(`/api/users/${childId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ points: currentPoints + score })
                });
            }
        }
        
        const data = await res.json();
        return data.success;
    } catch (e) {
        console.error("Error grading submission:", e);
        return false;
    }
}

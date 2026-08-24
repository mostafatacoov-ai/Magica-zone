import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { Submission } from "@/lib/models/Submission";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const assignmentId = searchParams.get("assignmentId");
        const courseId = searchParams.get("courseId");
        const childId = searchParams.get("childId");

        let query: any = {};
        if (assignmentId) query.assignmentId = assignmentId;
        if (courseId) query.courseId = courseId;
        if (childId) query.childId = childId;

        const submissions = await Submission.find(query);
        return NextResponse.json(submissions.map(s => ({ id: s._id.toString(), ...s.toObject() })));
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const data = await request.json();
        
        // Check if already submitted
        const existing = await Submission.findOne({ assignmentId: data.assignmentId, childId: data.childId });
        
        if (existing) {
            if (existing.status === "graded") return NextResponse.json({ success: false, message: "Already graded" });
            
            existing.content = data.content;
            existing.link = data.link;
            existing.createdAt = new Date();
            await existing.save();
            return NextResponse.json({ success: true, id: existing._id.toString() });
        }

        const submission = new Submission({ ...data, createdAt: new Date() });
        await submission.save();

        return NextResponse.json({ success: true, id: submission._id.toString() });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const data = await request.json();
        const { submissionId, score, feedback } = data;

        const sub = await Submission.findById(submissionId);
        if (!sub) return NextResponse.json({ success: false, error: "Not found" });

        sub.score = score;
        sub.feedback = feedback;
        sub.status = "graded";
        await sub.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

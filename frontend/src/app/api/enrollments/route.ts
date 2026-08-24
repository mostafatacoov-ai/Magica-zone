import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { Enrollment } from "@/lib/models/Enrollment";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const childId = searchParams.get("childId");
        const courseId = searchParams.get("courseId");

        let query: any = {};
        if (childId) query.childId = childId;
        if (courseId) query.courseId = courseId;

        const enrollments = await Enrollment.find(query);
        // Map _id to id
        return NextResponse.json(enrollments.map(e => ({ id: e._id.toString(), ...e.toObject() })));
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const data = await request.json();
        
        // Check if already enrolled
        const existing = await Enrollment.findOne({ childId: data.childId, courseId: data.courseId });
        if (existing) {
            return NextResponse.json({ success: true, alreadyEnrolled: true });
        }

        const enrollment = new Enrollment({ ...data, createdAt: new Date() });
        await enrollment.save();

        return NextResponse.json({ success: true, id: enrollment._id.toString() });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { Assignment } from "@/lib/models/Assignment";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const courseId = searchParams.get("courseId");

        let query: any = {};
        if (courseId) query.courseId = courseId;

        const assignments = await Assignment.find(query).sort({ createdAt: -1 });
        return NextResponse.json(assignments.map(a => ({ id: a._id.toString(), ...a.toObject() })));
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const data = await request.json();
        
        const assignment = new Assignment({ ...data, createdAt: new Date() });
        await assignment.save();

        return NextResponse.json({ success: true, id: assignment._id.toString() });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

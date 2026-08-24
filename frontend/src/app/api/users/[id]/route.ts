import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { User } from "@/lib/models/User";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const user = await User.findOne({ uid: params.id });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user from MongoDB:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const data = await request.json();
        
        let user = await User.findOne({ uid: params.id });
        if (!user) {
            user = new User({ uid: params.id, email: "placeholder@example.com" });
        }

        // Update fields safely
        if (data.role) user.role = data.role;
        if (data.status) user.status = data.status;
        if (data.gameScores) user.gameScores = data.gameScores;
        if (data.points !== undefined) user.points = data.points;
        
        await user.save();
        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error("Error updating user in MongoDB:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

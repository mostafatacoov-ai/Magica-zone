import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { Store } from "@/lib/models/Store";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const store = await Store.findOne({ id: params.id });
        if (!store) {
            return NextResponse.json({ error: "Store not found" }, { status: 404 });
        }
        return NextResponse.json(store);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const data = await request.json();
        const store = await Store.findOneAndUpdate({ id: params.id }, data, { new: true });
        return NextResponse.json({ success: true, store });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        await Store.findOneAndDelete({ id: params.id });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

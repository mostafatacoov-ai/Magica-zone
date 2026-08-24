import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { Store } from "@/lib/models/Store";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        let query: any = {};
        if (userId) query.userId = userId;

        const stores = await Store.find(query);
        // Map _id to id and ensure backward compatibility
        return NextResponse.json(stores.map(s => {
            const obj = s.toObject();
            return { ...obj, _id: obj._id.toString() };
        }));
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const data = await request.json();
        
        const store = new Store({ ...data });
        await store.save();

        return NextResponse.json({ success: true, id: store.id });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

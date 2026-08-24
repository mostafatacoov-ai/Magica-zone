import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { CMSContent } from "@/lib/models/CMSContent";

export async function GET() {
    try {
        await dbConnect();
        // Since there is only one main CMS document, we fetch the first one or create it if missing
        let cmsDoc = await CMSContent.findOne({});
        if (!cmsDoc) {
            return NextResponse.json({ error: "CMS Content not found" }, { status: 404 });
        }
        return NextResponse.json(cmsDoc);
    } catch (error) {
        console.error("Error fetching CMS data from MongoDB:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { section, data } = body;
        
        let cmsDoc = await CMSContent.findOne({});
        if (!cmsDoc) {
            cmsDoc = new CMSContent({});
        }

        if (section) {
            cmsDoc[section] = data;
        } else if (data && typeof data === 'object') {
            // Update the whole document
            Object.keys(data).forEach(key => {
                if (key !== '_id' && key !== '__v') {
                    cmsDoc[key] = data[key];
                }
            });
        }
        
        cmsDoc.updatedAt = new Date();
        await cmsDoc.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating CMS data in MongoDB:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

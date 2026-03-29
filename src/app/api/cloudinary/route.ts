import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder");

    if (!folder) {
        return NextResponse.json({ error: "Folder is required" }, { status: 400 });
    }

    try {
        const safeFolder = folder.replace(/'/g, "\\'");

        const result = await cloudinary.search
            .expression(`folder:"${safeFolder}/*" OR folder:"${safeFolder}"`)
            .sort_by("created_at", "desc")
            .max_results(6)
            .execute();

        console.log("Folder searched:", safeFolder);
        console.log("Results found:", result.resources.length);

        const images = result.resources.map((resource: any) => ({
            public_id: resource.public_id,
            secure_url: resource.secure_url,
            width: resource.width,
            height: resource.height,
        }));

        return NextResponse.json({ images });
    } catch (error) {
        console.error("Cloudinary error:", error);
        return NextResponse.json({
            error: "Failed to fetch images",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getAllFolderPaths(rootFolder: string): Promise<string[]> {
  const paths: string[] = [rootFolder];
  
  async function recurse(folder: string) {
    try {
      const result = await cloudinary.api.sub_folders(folder);
      for (const sub of result.folders || []) {
        paths.push(sub.path);
        await recurse(sub.path);
      }
    } catch {
      // No subfolders or folder doesn't exist
    }
  }

  await recurse(rootFolder);
  return paths;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder");

  if (!folder) {
    return NextResponse.json({ error: "Folder is required" }, { status: 400 });
  }

  try {
    const allFolders = await getAllFolderPaths(folder);

    const expression = allFolders
      .map((f) => `folder="${f}"`)
      .join(" OR ");

    const result = await cloudinary.search
      .expression(expression)
      .sort_by("created_at", "desc")
      .max_results(30) // fetch more so we have enough after filtering
      .execute();

    // Only keep actual images, exclude .mov, .mp4, .avi etc.
    const IMAGE_FORMATS = ["jpg", "jpeg", "png", "gif", "webp", "avif", "heic", "svg"];
    
    const images = result.resources
      .filter((resource: any) => IMAGE_FORMATS.includes(resource.format?.toLowerCase()))
      .slice(0, 6) // keep only 6 after filtering
      .map((resource: any) => ({
        public_id: resource.public_id,
        secure_url: resource.secure_url,
        width: resource.width,
        height: resource.height,
      }));

    console.log("Results after filtering:", images.length);

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Cloudinary error:", error);
    return NextResponse.json({
      error: "Failed to fetch images",
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
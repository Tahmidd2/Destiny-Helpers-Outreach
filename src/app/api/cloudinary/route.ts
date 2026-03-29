import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Recursively get all folder paths under a root folder
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
    // Get every folder path at every depth
    const allFolders = await getAllFolderPaths(folder);
    console.log("All folders found:", allFolders);

    // Build one big OR expression across all folders
    const expression = allFolders
      .map((f) => `folder="${f}"`)
      .join(" OR ");

    const result = await cloudinary.search
      .expression(expression)
      .sort_by("created_at", "desc")
      .max_results(6)
      .execute();

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
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
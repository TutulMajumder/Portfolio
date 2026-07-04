import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/api-auth";
import config from "@/config";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (
    !config.cloudinary_cloud_name ||
    !config.cloudinary_api_key ||
    !config.cloudinary_api_secret
  ) {
    return NextResponse.json(
      {
        error:
          "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to your environment variables.",
      },
      { status: 500 },
    );
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const isPdf = file.type === "application/pdf";

  const uploadResult = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "portfolio",
          resource_type: isPdf ? "raw" : "image",
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result as { secure_url: string });
        },
      );
      uploadStream.end(buffer);
    },
  );

  return NextResponse.json({ url: uploadResult.secure_url });
}

import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import {
  generateResumeKey,
  getResumeUploadUrl,
  createResume,
  validateResumeFile,
} from "@/lib/aws";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, fileName, fileType, fileSize } = body;

    // Validate required fields
    if (!userId || !fileName || !fileType || !fileSize) {
      return NextResponse.json(
        { error: "Missing required fields: userId, fileName, fileType, fileSize" },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateResumeFile({ type: fileType, size: fileSize });
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Generate resume ID and S3 key
    const resumeId = uuidv4();
    const fileKey = generateResumeKey(userId, fileName);

    // Get presigned upload URL
    const uploadUrlResult = await getResumeUploadUrl(fileKey, fileType);
    if (!uploadUrlResult.success) {
      return NextResponse.json(
        { error: uploadUrlResult.error },
        { status: 500 }
      );
    }

    // Create resume record in DynamoDB
    const resumeRecord = {
      id: resumeId,
      userId,
      fileName,
      fileKey,
      fileSize,
      fileType,
      uploadedAt: new Date().toISOString(),
    };

    const createResult = await createResume(resumeRecord);
    if (!createResult.success) {
      return NextResponse.json(
        { error: createResult.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      resumeId,
      uploadUrl: uploadUrlResult.url,
      fileKey,
    });
  } catch (error) {
    console.error("Resume upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

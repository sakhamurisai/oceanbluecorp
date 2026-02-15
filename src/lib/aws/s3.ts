import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { awsConfig, s3Config } from "./config";

// Initialize S3 Client
const s3Client = new S3Client({
  region: s3Config.region,
  credentials: awsConfig.credentials,
  ...(s3Config.endpoint && { endpoint: s3Config.endpoint }),
});

// Resume file types allowed
export const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Maximum file size (5MB)
export const MAX_RESUME_SIZE = 5 * 1024 * 1024;

// Generate a unique key for the resume
export function generateResumeKey(userId: string, fileName: string): string {
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  return `resumes/${userId}/${timestamp}-${sanitizedFileName}`;
}

// Upload resume to S3
export async function uploadResume(
  file: Buffer,
  key: string,
  contentType: string
): Promise<{ success: boolean; key?: string; error?: string }> {
  try {
    const command = new PutObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
      Body: file,
      ContentType: contentType,
      Metadata: {
        uploadedAt: new Date().toISOString(),
      },
    });

    await s3Client.send(command);

    return { success: true, key };
  } catch (error) {
    console.error("Error uploading resume to S3:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload resume",
    };
  }
}

// Get a signed URL for downloading a resume
export async function getResumeDownloadUrl(
  key: string,
  expiresIn: number = 3600 // 1 hour default
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const command = new GetObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn });

    return { success: true, url };
  } catch (error) {
    console.error("Error generating download URL:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate download URL",
    };
  }
}

// Get a signed URL for uploading a resume (client-side upload)
export async function getResumeUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 300 // 5 minutes default
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const command = new PutObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn });

    return { success: true, url };
  } catch (error) {
    console.error("Error generating upload URL:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate upload URL",
    };
  }
}

// Delete a resume from S3
export async function deleteResume(
  key: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
    });

    await s3Client.send(command);

    return { success: true };
  } catch (error) {
    console.error("Error deleting resume from S3:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete resume",
    };
  }
}

// Check if a resume exists
export async function resumeExists(
  key: string
): Promise<{ exists: boolean; error?: string }> {
  try {
    const command = new HeadObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
    });

    await s3Client.send(command);

    return { exists: true };
  } catch (error) {
    if ((error as { name?: string }).name === "NotFound") {
      return { exists: false };
    }
    console.error("Error checking resume existence:", error);
    return {
      exists: false,
      error: error instanceof Error ? error.message : "Failed to check resume",
    };
  }
}

// Validate resume file
export function validateResumeFile(
  file: { type: string; size: number }
): { valid: boolean; error?: string } {
  if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload a PDF or Word document.",
    };
  }

  if (file.size > MAX_RESUME_SIZE) {
    return {
      valid: false,
      error: "File too large. Maximum size is 5MB.",
    };
  }

  return { valid: true };
}

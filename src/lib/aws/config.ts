// AWS Configuration
// This file contains the base AWS configuration used by all AWS services

export const awsConfig = {
  region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
};

// S3 Configuration
export const s3Config = {
  bucketName: process.env.AWS_S3_BUCKET_NAME || "oceanblue-resumes",
  region: process.env.AWS_S3_BUCKET_REGION || process.env.NEXT_PUBLIC_AWS_REGION || "us-east-2",
  endpoint: process.env.AWS_S3_ENDPOINT, // Optional: for S3-compatible storage
};

// DynamoDB Configuration
export const dynamoDBConfig = {
  tables: {
    resumes: process.env.AWS_DYNAMODB_TABLE_RESUMES || "oceanblue-resumes",
    applications: process.env.AWS_DYNAMODB_TABLE_APPLICATIONS || "oceanblue-applications",
    jobs: process.env.AWS_DYNAMODB_TABLE_JOBS || "oceanblue-jobs",
    candidates: process.env.AWS_DYNAMODB_TABLE_CANDIDATES || "oceanblue-candidates",
  },
  endpoint: process.env.AWS_DYNAMODB_ENDPOINT, // Optional: for DynamoDB Local
};

// Validate required environment variables
export function validateAwsConfig(): { valid: boolean; missing: string[] } {
  const required = [
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_S3_BUCKET_NAME",
  ];

  const missing = required.filter((key) => !process.env[key]);

  return {
    valid: missing.length === 0,
    missing,
  };
}

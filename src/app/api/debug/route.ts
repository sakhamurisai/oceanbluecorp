import { NextResponse } from "next/server";

// GET /api/debug - Debug environment variables (remove after debugging)
export async function GET() {
  const envCheck = {
    NEXT_AWS_ACCESS_KEY_ID: process.env.NEXT_AWS_ACCESS_KEY_ID ? `SET (${process.env.NEXT_AWS_ACCESS_KEY_ID.substring(0, 4)}...)` : "NOT SET",
    NEXT_AWS_SECRET_ACCESS_KEY: process.env.NEXT_AWS_SECRET_ACCESS_KEY ? `SET (${process.env.NEXT_AWS_SECRET_ACCESS_KEY.length} chars)` : "NOT SET",
    NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION || "NOT SET",
    NEXT_AWS_DYNAMODB_TABLE_JOBS: process.env.NEXT_AWS_DYNAMODB_TABLE_JOBS || "NOT SET",
    NEXT_AWS_DYNAMODB_TABLE_APPLICATIONS: process.env.NEXT_AWS_DYNAMODB_TABLE_APPLICATIONS || "NOT SET",
    NEXT_AWS_DYNAMODB_TABLE_CONTACTS: process.env.NEXT_AWS_DYNAMODB_TABLE_CONTACTS || "NOT SET",
    NODE_ENV: process.env.NODE_ENV || "NOT SET",
  };

  return NextResponse.json({
    message: "Environment variable check",
    env: envCheck,
    timestamp: new Date().toISOString()
  });
}

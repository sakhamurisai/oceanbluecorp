import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly pass environment variables to the runtime
  env: {
    NEXT_AWS_ACCESS_KEY_ID: process.env.NEXT_AWS_ACCESS_KEY_ID,
    NEXT_AWS_SECRET_ACCESS_KEY: process.env.NEXT_AWS_SECRET_ACCESS_KEY,
    NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
    NEXT_AWS_S3_BUCKET_NAME: process.env.NEXT_AWS_S3_BUCKET_NAME,
    NEXT_AWS_S3_BUCKET_REGION: process.env.NEXT_AWS_S3_BUCKET_REGION,
    NEXT_AWS_DYNAMODB_TABLE_RESUMES: process.env.NEXT_AWS_DYNAMODB_TABLE_RESUMES,
    NEXT_AWS_DYNAMODB_TABLE_APPLICATIONS: process.env.NEXT_AWS_DYNAMODB_TABLE_APPLICATIONS,
    NEXT_AWS_DYNAMODB_TABLE_JOBS: process.env.NEXT_AWS_DYNAMODB_TABLE_JOBS,
    NEXT_AWS_DYNAMODB_TABLE_CONTACTS: process.env.NEXT_AWS_DYNAMODB_TABLE_CONTACTS,
    NEXT_AWS_DYNAMODB_TABLE_CANDIDATES: process.env.NEXT_AWS_DYNAMODB_TABLE_CANDIDATES,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oceanbluecorp.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "www.oceanbluecorp.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.inytes.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

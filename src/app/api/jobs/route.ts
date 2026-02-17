import { NextRequest, NextResponse } from "next/server";
import { getAllJobs, createJob, Job } from "@/lib/aws/dynamodb";
import { v4 as uuidv4 } from "uuid";

// GET /api/jobs - Get all jobs (optionally filter by status)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as Job["status"] | null;

    const result = await getAllJobs(status || undefined);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to fetch jobs" },
        { status: 500 }
      );
    }

    // Sort by createdAt descending (newest first)
    const jobs = (result.data || []).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/jobs - Create a new job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["title", "department", "location", "type", "description"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const job: Job = {
      id: uuidv4(),
      title: body.title,
      department: body.department,
      location: body.location,
      type: body.type,
      description: body.description,
      requirements: body.requirements || [],
      responsibilities: body.responsibilities || [],
      salary: body.salary,
      status: body.status || "draft",
      createdAt: new Date().toISOString(),
      createdBy: body.createdBy || "system",
      applicationsCount: 0,
    };

    const result = await createJob(job);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to create job" },
        { status: 500 }
      );
    }

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

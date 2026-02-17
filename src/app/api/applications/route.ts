import { NextRequest, NextResponse } from "next/server";
import {
  getAllApplications,
  getApplicationsByJob,
  getApplicationsByUser,
  createApplication,
  Application,
  getJob,
  updateJob,
} from "@/lib/aws/dynamodb";
import { v4 as uuidv4 } from "uuid";

// GET /api/applications - Get applications (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const jobId = searchParams.get("jobId");

    let result;

    if (userId) {
      result = await getApplicationsByUser(userId);
    } else if (jobId) {
      result = await getApplicationsByJob(jobId);
    } else {
      result = await getAllApplications();
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to fetch applications" },
        { status: 500 }
      );
    }

    // Sort by appliedAt descending (newest first)
    const applications = (result.data || []).sort(
      (a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
    );

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/applications - Create a new application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["jobId", "name", "email"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check if job exists and is active
    const jobResult = await getJob(body.jobId);
    if (!jobResult.success || !jobResult.data) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    if (jobResult.data.status !== "active") {
      return NextResponse.json(
        { error: "This job is no longer accepting applications" },
        { status: 400 }
      );
    }

    const application: Application = {
      id: uuidv4(),
      userId: body.userId || "anonymous",
      jobId: body.jobId,
      resumeId: body.resumeId || "",
      status: "pending",
      appliedAt: new Date().toISOString(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      skills: body.skills,
      experience: body.experience,
      coverLetter: body.coverLetter,
    };

    const result = await createApplication(application);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to create application" },
        { status: 500 }
      );
    }

    // Increment applications count on the job
    const currentCount = jobResult.data.applicationsCount || 0;
    await updateJob(body.jobId, { applicationsCount: currentCount + 1 });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

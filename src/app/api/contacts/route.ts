import { NextRequest, NextResponse } from "next/server";
import { getAllContacts, createContact, Contact } from "@/lib/aws/dynamodb";
import { v4 as uuidv4 } from "uuid";

// GET /api/contacts - Get all contacts (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as Contact["status"] | null;

    const result = await getAllContacts(status || undefined);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to fetch contacts" },
        { status: 500 }
      );
    }

    // Sort by createdAt descending (newest first)
    const contacts = (result.data || []).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/contacts - Create a new contact submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "company", "inquiryType", "message"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const contact: Contact = {
      id: uuidv4(),
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || undefined,
      company: body.company.trim(),
      jobTitle: body.jobTitle?.trim() || undefined,
      inquiryType: body.inquiryType,
      message: body.message.trim(),
      status: "new",
      createdAt: new Date().toISOString(),
    };

    const result = await createContact(contact);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to submit contact form" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Contact form submitted successfully", contact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

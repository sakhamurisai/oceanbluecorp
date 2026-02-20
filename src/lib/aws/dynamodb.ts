import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { awsConfig, dynamoDBConfig } from "./config";

// Check if AWS credentials are configured
const isAwsConfigured = (): boolean => {
  return !!(
    awsConfig.credentials.accessKeyId &&
    awsConfig.credentials.secretAccessKey &&
    awsConfig.credentials.accessKeyId !== "" &&
    awsConfig.credentials.secretAccessKey !== ""
  );
};

// Initialize DynamoDB Client (only if configured)
let dynamoClient: DynamoDBClient | null = null;
let docClient: DynamoDBDocumentClient | null = null;

if (isAwsConfigured()) {
  dynamoClient = new DynamoDBClient({
    region: awsConfig.region,
    credentials: awsConfig.credentials,
    ...(dynamoDBConfig.endpoint && { endpoint: dynamoDBConfig.endpoint }),
  });

  // Document client for easier operations
  docClient! = DynamoDBDocumentClient.from(dynamoClient, {
    marshallOptions: {
      removeUndefinedValues: true,
    },
  });
}

// Helper to check if DB is available
const checkDbAvailable = (): { available: boolean; error?: string } => {
  if (!isAwsConfigured()) {
    return {
      available: false,
      error: "AWS credentials not configured. Please set NEXT_AWS_ACCESS_KEY_ID and NEXT_AWS_SECRET_ACCESS_KEY environment variables.",
    };
  }
  if (!docClient!) {
    return {
      available: false,
      error: "DynamoDB client not initialized",
    };
  }
  return { available: true };
};

// ===========================================
// Types
// ===========================================

export interface Resume {
  id: string; // PK
  userId: string; // User ID (GSI)
  fileName: string;
  fileKey: string; // S3 key
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  updatedAt?: string;
}

export interface Application {
  id: string; // PK
  userId: string; // User ID (GSI)
  jobId: string; // Job ID (GSI)
  resumeId: string;
  status: "pending" | "reviewing" | "interview" | "offered" | "hired" | "rejected";
  appliedAt: string;
  updatedAt?: string;
  notes?: string;
  rating?: number;
  // Applicant info
  name: string;
  email: string;
  phone?: string;
  skills?: string[];
  experience?: string;
  coverLetter?: string;
}

export interface Job {
  id: string; // PK
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  status: "active" | "paused" | "closed" | "draft";
  createdAt: string;
  updatedAt?: string;
  createdBy: string;
  applicationsCount?: number;
}

export interface Contact {
  id: string; // PK
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  jobTitle?: string;
  inquiryType: string;
  message: string;
  status: "new" | "read" | "responded" | "archived";
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

// ===========================================
// Resume Operations
// ===========================================

export async function createResume(resume: Resume): Promise<{ success: boolean; error?: string }> {
  const dbCheck = checkDbAvailable();
  if (!dbCheck.available) {
    return { success: false, error: dbCheck.error };
  }

  try {
    await docClient!!.send(
      new PutCommand({
        TableName: dynamoDBConfig.tables.resumes,
        Item: resume,
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error creating resume:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create resume",
    };
  }
}

export async function getResume(id: string): Promise<{ success: boolean; data?: Resume; error?: string }> {
  try {
    const result = await docClient!.send(
      new GetCommand({
        TableName: dynamoDBConfig.tables.resumes,
        Key: { id },
      })
    );
    return { success: true, data: result.Item as Resume | undefined };
  } catch (error) {
    console.error("Error getting resume:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get resume",
    };
  }
}

export async function getResumesByUser(userId: string): Promise<{ success: boolean; data?: Resume[]; error?: string }> {
  try {
    const result = await docClient!.send(
      new QueryCommand({
        TableName: dynamoDBConfig.tables.resumes,
        IndexName: "userId-index",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
    );
    return { success: true, data: result.Items as Resume[] };
  } catch (error) {
    console.error("Error getting resumes by user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get resumes",
    };
  }
}

export async function deleteResume(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await docClient!.send(
      new DeleteCommand({
        TableName: dynamoDBConfig.tables.resumes,
        Key: { id },
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error deleting resume:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete resume",
    };
  }
}

// ===========================================
// Application Operations
// ===========================================

export async function createApplication(application: Application): Promise<{ success: boolean; error?: string }> {
  try {
    await docClient!.send(
      new PutCommand({
        TableName: dynamoDBConfig.tables.applications,
        Item: application,
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error creating application:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create application",
    };
  }
}

export async function getApplication(id: string): Promise<{ success: boolean; data?: Application; error?: string }> {
  try {
    const result = await docClient!.send(
      new GetCommand({
        TableName: dynamoDBConfig.tables.applications,
        Key: { id },
      })
    );
    return { success: true, data: result.Item as Application | undefined };
  } catch (error) {
    console.error("Error getting application:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get application",
    };
  }
}

export async function getApplicationsByUser(userId: string): Promise<{ success: boolean; data?: Application[]; error?: string }> {
  try {
    const result = await docClient!.send(
      new QueryCommand({
        TableName: dynamoDBConfig.tables.applications,
        IndexName: "userId-index",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
    );
    return { success: true, data: result.Items as Application[] };
  } catch (error) {
    console.error("Error getting applications by user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get applications",
    };
  }
}

export async function getApplicationsByJob(jobId: string): Promise<{ success: boolean; data?: Application[]; error?: string }> {
  try {
    const result = await docClient!.send(
      new QueryCommand({
        TableName: dynamoDBConfig.tables.applications,
        IndexName: "jobId-index",
        KeyConditionExpression: "jobId = :jobId",
        ExpressionAttributeValues: {
          ":jobId": jobId,
        },
      })
    );
    return { success: true, data: result.Items as Application[] };
  } catch (error) {
    console.error("Error getting applications by job:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get applications",
    };
  }
}

export async function getAllApplications(): Promise<{ success: boolean; data?: Application[]; error?: string }> {
  const dbCheck = checkDbAvailable();
  if (!dbCheck.available) {
    console.warn("DynamoDB not available:", dbCheck.error);
    return { success: true, data: [] }; // Return empty array instead of error
  }

  try {
    const result = await docClient!!.send(
      new ScanCommand({
        TableName: dynamoDBConfig.tables.applications,
      })
    );
    return { success: true, data: result.Items as Application[] };
  } catch (error) {
    console.error("Error getting all applications:", error);
    // Return empty array for read operations to allow the app to function
    return { success: true, data: [] };
  }
}

export async function updateApplicationStatus(
  id: string,
  status: Application["status"],
  notes?: string,
  rating?: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const updateExpressions: string[] = ["#status = :status", "updatedAt = :updatedAt"];
    const expressionAttributeValues: Record<string, unknown> = {
      ":status": status,
      ":updatedAt": new Date().toISOString(),
    };
    const expressionAttributeNames: Record<string, string> = {
      "#status": "status",
    };

    if (notes !== undefined) {
      updateExpressions.push("notes = :notes");
      expressionAttributeValues[":notes"] = notes;
    }

    if (rating !== undefined) {
      updateExpressions.push("rating = :rating");
      expressionAttributeValues[":rating"] = rating;
    }

    await docClient!.send(
      new UpdateCommand({
        TableName: dynamoDBConfig.tables.applications,
        Key: { id },
        UpdateExpression: `SET ${updateExpressions.join(", ")}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error updating application status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update application",
    };
  }
}

// ===========================================
// Job Operations
// ===========================================

export async function createJob(job: Job): Promise<{ success: boolean; error?: string }> {
  try {
    await docClient!.send(
      new PutCommand({
        TableName: dynamoDBConfig.tables.jobs,
        Item: job,
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error creating job:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create job",
    };
  }
}

export async function getJob(id: string): Promise<{ success: boolean; data?: Job; error?: string }> {
  try {
    const result = await docClient!!.send(
      new GetCommand({
        TableName: dynamoDBConfig.tables.jobs,
        Key: { id },
      })
    );
    return { success: true, data: result.Item as Job | undefined };
  } catch (error) {
    console.error("Error getting job:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get job",
    };
  }
}

export async function getAllJobs(status?: Job["status"]): Promise<{ success: boolean; data?: Job[]; error?: string }> {
  const dbCheck = checkDbAvailable();
  if (!dbCheck.available) {
    console.warn("DynamoDB not available:", dbCheck.error);
    return { success: true, data: [] }; // Return empty array instead of error
  }

  try {
    let result;

    if (status) {
      result = await docClient!.send(
        new ScanCommand({
          TableName: dynamoDBConfig.tables.jobs,
          FilterExpression: "#status = :status",
          ExpressionAttributeNames: {
            "#status": "status",
          },
          ExpressionAttributeValues: {
            ":status": status,
          },
        })
      );
    } else {
      result = await docClient!!.send(
        new ScanCommand({
          TableName: dynamoDBConfig.tables.jobs,
        })
      );
    }

    return { success: true, data: result.Items as Job[] };
  } catch (error) {
    console.error("Error getting jobs:", error);
    // Return empty array for read operations to allow the app to function
    return { success: true, data: [] };
  }
}

export async function updateJob(
  id: string,
  updates: Partial<Omit<Job, "id" | "createdAt" | "createdBy">>
): Promise<{ success: boolean; error?: string }> {
  try {
    const updateExpressions: string[] = ["updatedAt = :updatedAt"];
    const expressionAttributeValues: Record<string, unknown> = {
      ":updatedAt": new Date().toISOString(),
    };
    const expressionAttributeNames: Record<string, string> = {};

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        // Handle reserved words
        if (key === "status") {
          expressionAttributeNames["#status"] = "status";
          updateExpressions.push("#status = :status");
        } else {
          updateExpressions.push(`${key} = :${key}`);
        }
        expressionAttributeValues[`:${key}`] = value;
      }
    });

    await docClient!.send(
      new UpdateCommand({
        TableName: dynamoDBConfig.tables.jobs,
        Key: { id },
        UpdateExpression: `SET ${updateExpressions.join(", ")}`,
        ...(Object.keys(expressionAttributeNames).length > 0 && {
          ExpressionAttributeNames: expressionAttributeNames,
        }),
        ExpressionAttributeValues: expressionAttributeValues,
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error updating job:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update job",
    };
  }
}

export async function deleteJob(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await docClient!.send(
      new DeleteCommand({
        TableName: dynamoDBConfig.tables.jobs,
        Key: { id },
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error deleting job:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete job",
    };
  }
}

// ===========================================
// Contact Operations
// ===========================================

export async function createContact(contact: Contact): Promise<{ success: boolean; error?: string }> {
  try {
    await docClient!.send(
      new PutCommand({
        TableName: dynamoDBConfig.tables.contacts,
        Item: contact,
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error creating contact:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create contact",
    };
  }
}

export async function getContact(id: string): Promise<{ success: boolean; data?: Contact; error?: string }> {
  try {
    const result = await docClient!.send(
      new GetCommand({
        TableName: dynamoDBConfig.tables.contacts,
        Key: { id },
      })
    );
    return { success: true, data: result.Item as Contact | undefined };
  } catch (error) {
    console.error("Error getting contact:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get contact",
    };
  }
}

export async function getAllContacts(status?: Contact["status"]): Promise<{ success: boolean; data?: Contact[]; error?: string }> {
  const dbCheck = checkDbAvailable();
  if (!dbCheck.available) {
    console.warn("DynamoDB not available:", dbCheck.error);
    return { success: true, data: [] };
  }

  try {
    let result;

    if (status) {
      result = await docClient!!.send(
        new ScanCommand({
          TableName: dynamoDBConfig.tables.contacts,
          FilterExpression: "#status = :status",
          ExpressionAttributeNames: {
            "#status": "status",
          },
          ExpressionAttributeValues: {
            ":status": status,
          },
        })
      );
    } else {
      result = await docClient!!.send(
        new ScanCommand({
          TableName: dynamoDBConfig.tables.contacts,
        })
      );
    }

    return { success: true, data: result.Items as Contact[] };
  } catch (error) {
    console.error("Error getting contacts:", error);
    return { success: true, data: [] };
  }
}

export async function updateContactStatus(
  id: string,
  status: Contact["status"],
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const updateExpressions: string[] = ["#status = :status", "updatedAt = :updatedAt"];
    const expressionAttributeValues: Record<string, unknown> = {
      ":status": status,
      ":updatedAt": new Date().toISOString(),
    };
    const expressionAttributeNames: Record<string, string> = {
      "#status": "status",
    };

    if (notes !== undefined) {
      updateExpressions.push("notes = :notes");
      expressionAttributeValues[":notes"] = notes;
    }

    await docClient!.send(
      new UpdateCommand({
        TableName: dynamoDBConfig.tables.contacts,
        Key: { id },
        UpdateExpression: `SET ${updateExpressions.join(", ")}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error updating contact status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update contact",
    };
  }
}

export async function deleteContact(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await docClient!.send(
      new DeleteCommand({
        TableName: dynamoDBConfig.tables.contacts,
        Key: { id },
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error deleting contact:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete contact",
    };
  }
}

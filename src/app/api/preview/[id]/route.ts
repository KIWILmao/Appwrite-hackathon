import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/appwrite/appwriteServer"
import { DbResponse } from "@/appwrite/types"

interface ProjectDocument {
  name: string
  description: string
  userId: string
  style: { type: "image" | "gradient"; value: string }
  fields: FormField[]
  live: boolean
}

interface FormField {
  id: string
  name: string
  type: "string" | "number" | "email" | "textarea" | "stars"
  required: boolean
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<DbResponse<ProjectDocument>>> {
  const id = params.id

  const { databases } = await createAdminClient()

  try {
    const project = await databases.getDocument(
      "6711f9e0000696e9fc21",
      "6711fa430021998ea7ca",
      id,
    )
    console.log(project, "Awdadawdad")

    return NextResponse.json({
      success: true,
      payload: {
        name: project.name,
        description: project.description,
        userId: project.userId,
        style: JSON.parse(project.image),
        fields: JSON.parse(project.fields),
        live: project.live,
      },
      message: "successful",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Project not found",
      },
      { status: 404 },
    )
  }
}

//api/projects/route.js
import dbConnect from "@/lib/db";
import Project from "@/models/projects";
import { NextResponse } from "next/server";

// GET all projects
export async function GET() {
  await dbConnect();
  const projects = await Project.find().sort({ createdAt: -1 });

  return NextResponse.json({ success: true, projects });
}

// ADD project
export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const project = await Project.create(body);

    return NextResponse.json({ success: true, project });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
//api/projects/[id]/route.js
import dbConnect from "@/lib/db";
import Project from "@/models/projects";
import { NextResponse } from "next/server";

// UPDATE
export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const body = await req.json();
    const project = await Project.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    return NextResponse.json({ success: true, project });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}

// DELETE
export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    await Project.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
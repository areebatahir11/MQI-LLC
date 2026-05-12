// api/projects/[id]/route.js
import dbConnect from "@/lib/db";
import Project from "@/models/projects";
import { uploadImage, deleteImage } from "../../../../lib/cloundinary";
import { NextResponse } from "next/server";

// UPDATE
export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const body = await req.json();

    if (body.image && !body.image.startsWith("http")) {
      const existing = await Project.findById(id);
      if (existing?.image) await deleteImage(existing.image);
      body.image = await uploadImage(body.image);
    }

    const project = await Project.findByIdAndUpdate(id, body, { new: true });
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
  const { id } = await params;

  try {
    const existing = await Project.findById(id);
    if (existing?.image) await deleteImage(existing.image);

    await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
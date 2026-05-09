// api/projects/[id]/route.js
import dbConnect from "@/lib/db";
import Project from "@/models/projects";
import { uploadImage, deleteImage } from "../../../../lib/cloundinary";
import { NextResponse } from "next/server";

// UPDATE
export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const body = await req.json();

    // Agar nai image aayi (base64) toh purani delete karo aur nai upload karo
    if (body.image && !body.image.startsWith("http")) {
      const existing = await Project.findById(params.id);
      if (existing?.image) await deleteImage(existing.image);
      body.image = await uploadImage(body.image);
    }

    const project = await Project.findByIdAndUpdate(params.id, body, {
      new: true,
    });

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
    const existing = await Project.findById(params.id);
    // Cloudinary se image bhi hatao
    if (existing?.image) await deleteImage(existing.image);

    await Project.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
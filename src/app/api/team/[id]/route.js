// api/team/[id]/route.js
import dbConnect from "@/lib/db";
import Team from "@/models/team";
import { uploadImage, deleteImage } from "../../../../lib/cloundinary";
import { NextResponse } from "next/server";

// UPDATE
export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const body = await req.json();

    if (body.image && !body.image.startsWith("http")) {
      const existing = await Team.findById(id);
      if (existing?.image) await deleteImage(existing.image);
      body.image = await uploadImage(body.image);
    }

    const team = await Team.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, team });
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
    const existing = await Team.findById(id);
    if (existing?.image) await deleteImage(existing.image);

    await Team.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
// api/team/[id]/route.js
import dbConnect from "@/lib/db";
import Team from "@/models/team";
import { uploadImage, deleteImage } from "../../../../lib/cloundinary";
import { NextResponse } from "next/server";

// UPDATE
export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const body = await req.json();

    // Nai base64 image aayi toh purani Cloudinary wali delete karo
    if (body.image && !body.image.startsWith("http")) {
      const existing = await Team.findById(params.id);
      if (existing?.image) await deleteImage(existing.image);
      body.image = await uploadImage(body.image);
    }

    const team = await Team.findByIdAndUpdate(params.id, body, { new: true });
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

  try {
    const existing = await Team.findById(params.id);
    if (existing?.image) await deleteImage(existing.image);

    await Team.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
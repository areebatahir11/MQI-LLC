//api/team/[id]/route.js
import dbConnect from "@/lib/db";
import Team from "@/models/team";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const body = await req.json();
    const team = await Team.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    return NextResponse.json({ success: true, team });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    await Team.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
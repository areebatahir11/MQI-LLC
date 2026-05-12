import dbConnect from "@/lib/db";
import Service from "@/models/service";
import { NextResponse } from "next/server";

// UPDATE
export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const { id } = await params; // ✅ FIX

    const body = await req.json();

    const service = await Service.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json({ success: true, service });
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
    const { id } = await params; // ✅ FIX

    await Service.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
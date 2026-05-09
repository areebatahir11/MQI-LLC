// api/team/route.js
import dbConnect from "@/lib/db";
import Team from "@/models/team";
import { uploadImage } from "../../../lib/cloundinary";
import { NextResponse } from "next/server";

// GET all team members
export async function GET() {
  await dbConnect();
  const teams = await Team.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, teams });
}

// ADD team member
export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();

    // Image ko Cloudinary pe upload karo
    if (body.image) {
      body.image = await uploadImage(body.image);
    }

    const team = await Team.create(body);
    return NextResponse.json({ success: true, team });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
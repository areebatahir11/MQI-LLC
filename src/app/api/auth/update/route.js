import dbConnect from "@/lib/db";
import Admin from "@/models/admin";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ success: false, message: "All fields required" }, { status: 400 });

  try {
    const admin = await Admin.findOne();
    if (!admin) return NextResponse.json({ success: false, message: "Admin not found" }, { status: 404 });

    admin.email = email;
    admin.password = password;
    await admin.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
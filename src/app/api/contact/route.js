import dbConnect from "@/lib/db";
import Contact from "@/models/contact"; 
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, contacts });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const contact = await Contact.create(body);
    return NextResponse.json({ success: true, contact });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
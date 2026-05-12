// api/services/route.js
import dbConnect from "@/lib/db";
import Service from "@/models/service";
import { NextResponse } from "next/server";

// GET all services
export async function GET() {
  await dbConnect();
  const services = await Service.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, services });
}

// ADD service
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const service = await Service.create(body);
    return NextResponse.json({ success: true, service });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}
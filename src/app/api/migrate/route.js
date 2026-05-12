// app/api/migrate/route.js
import dbConnect from "@/lib/db";
import Project from "@/models/projects";
import { uploadImage } from "@/lib/cloundinary";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  
  const projects = await Project.find({ image: /^data:image/ });
  
  if (projects.length === 0) {
    return NextResponse.json({ message: "Koi base64 image nahi mili!" });
  }

  const results = [];
  
  for (const proj of projects) {
    try {
      const url = await uploadImage(proj.image);
      await Project.findByIdAndUpdate(proj._id, { image: url });
      results.push({ title: proj.title, status: "✅ Done", url });
    } catch (err) {
      results.push({ title: proj.title, status: "❌ Failed", error: err.message });
    }
  }

  return NextResponse.json({ success: true, results });
}
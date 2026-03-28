// api/auth/update/route.js
import dbConnect from "@/lib/db";
import Admin from "@/models/admin";

export async function POST(req) {
  await dbConnect();

  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json({
      success: false,
      message: "All fields required",
    });
  }

  try {
    let admin = await Admin.findOne();

    if (!admin) {
      await Admin.create({ email, password });
      return Response.json({
        success: true,
        message: "Admin created (first time)",
      });
    }

    admin.email = email;
    admin.password = password; // auto hashed by schema

    await admin.save();

    return Response.json({
      success: true,
      message: "Updated successfully",
    });
  } catch (err) {
    return Response.json({
      success: false,
      message: err.message,
    });
  }
}
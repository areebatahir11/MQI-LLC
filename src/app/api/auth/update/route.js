// api/auth/update/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import Session from "@/models/session";

export async function POST(req) {
  try {
    await dbConnect();

    // Session se current admin verify karo
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - Login karo pehle" },
        { status: 401 }
      );
    }

    const session = await Session.findOne({ token }).populate("adminId");
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Session invalid hai" },
        { status: 401 }
      );
    }

    const { oldEmail, newEmail, password } = await req.json();

    if (!oldEmail || !newEmail || !password) {
      return NextResponse.json(
        { success: false, message: "Sab fields required hain" },
        { status: 400 }
      );
    }

    // Old email verify karo — logged in admin ki email se match honi chahiye
    const admin = await Admin.findById(session.adminId);

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin nahi mila" },
        { status: 404 }
      );
    }

    if (admin.email !== oldEmail) {
      return NextResponse.json(
        { success: false, message: "Purani email galat hai" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password kam az kam 6 characters ka hona chahiye" },
        { status: 400 }
      );
    }

    // New email already kisi aur ki toh nahi?
    if (newEmail !== oldEmail) {
      const existing = await Admin.findOne({ email: newEmail });
      if (existing) {
        return NextResponse.json(
          { success: false, message: "Ye email already use ho rahi hai" },
          { status: 400 }
        );
      }
    }

    const hashed = await bcrypt.hash(password, 10);
    admin.email = newEmail;
    admin.password = hashed;
    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Credentials successfully update ho gaye!",
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
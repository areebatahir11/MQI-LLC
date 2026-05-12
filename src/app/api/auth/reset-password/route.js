// api/auth/reset-password/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();

    const { token, newPassword, confirmPassword } = await req.json();

    if (!token || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Sab fields required hain" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password kam az kam 6 characters ka hona chahiye" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords match nahi kar rahe" },
        { status: 400 }
      );
    }

    // Token aur expiry check karo
    const admin = await Admin.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }, // abhi bhi valid ho
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Token invalid ya expire ho gaya hai" },
        { status: 400 }
      );
    }

    // Password update karo aur token clear karo
    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;
    admin.resetToken = null;
    admin.resetTokenExpiry = null;
    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Password successfully reset ho gaya!",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
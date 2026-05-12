// //api/auth/forgetpassword
// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import Admin from "@/models/admin";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   try {
//     await dbConnect();

//     const { email, newPassword } = await req.json();

//     const admin = await Admin.findOne({ email });

//     if (!admin) {
//       return NextResponse.json(
//         { success: false, message: "Email not found" },
//         { status: 404 }
//       );
//     }

//     const hashed = await bcrypt.hash(newPassword, 10);

//     admin.password = hashed;
//     await admin.save();

//     return NextResponse.json({
//       success: true,
//       message: "Password updated successfully",
//     });

//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }

// api/auth/forgot-password/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Admin from "@/models/admin";
import { sendResetEmail } from "@/lib/sendEmail";
import crypto from "crypto";

export async function POST(req) {
  try {
    await dbConnect();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required hai" },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ email });

    // Security: same response chahe email mile ya na mile
    if (!admin) {
      return NextResponse.json({
        success: true,
        message: "Agar ye email registered hai, reset token bhej diya gaya hai",
      });
    }

    // 6-digit numeric token generate karo (easy to type)
    const token = crypto.randomInt(100000, 999999).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    admin.resetToken = token;
    admin.resetTokenExpiry = expiry;
    await admin.save();

    await sendResetEmail(email, token);

    return NextResponse.json({
      success: true,
      message: "Reset token tumhari email par bhej diya gaya hai",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
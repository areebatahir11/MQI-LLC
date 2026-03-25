import { NextResponse } from "next/server";
import { getAdminEmail, updateAdminCredentials } from "@/lib/auth";

let adminEmail = getAdminEmail(); 

export async function POST(req) {
  try {
    const { email, newPassword } = await req.json();

    if (email !== adminEmail) {
      return NextResponse.json(
        { success: false, message: "Email not found" },
        { status: 404 }
      );
    }

    updateAdminCredentials(email, newPassword);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

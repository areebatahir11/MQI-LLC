//auth/login/route.js
import { NextResponse } from "next/server";
import { login } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const result = await login(email, password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// import dbConnect from "@/lib/db";
// import Admin from "@/models/admin";
// import { NextResponse } from "next/server";
// import { randomUUID } from "crypto";
// import { cookies } from "next/headers";

// let activeSessions = {}; 

// export async function POST(req) {
//   await dbConnect();
//   const { email, password } = await req.json();

//   const admin = await Admin.findOne({ email });
//   if (!admin) return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });

//   const isMatch = await admin.matchPassword(password);
//   if (!isMatch) return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });

//   const token = randomUUID();
//   activeSessions[token] = { email, createdAt: Date.now() };

//   const cookieStore = await cookies();
//   cookieStore.set("session", token, { httpOnly: true, path: "/" });

//   return NextResponse.json({ success: true });
// }

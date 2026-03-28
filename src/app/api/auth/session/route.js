//api/auth/session/route.js
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Session from "@/models/session";

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return Response.json({ authenticated: false });
    }

    const session = await Session.findOne({ token });

    if (!session) {
      return Response.json({ authenticated: false });
    }

    return Response.json({
      authenticated: true,
      user: session.adminId,
    });

  } catch (error) {
    return Response.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}
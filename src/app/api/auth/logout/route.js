//api/auth/logout/route.js
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Session from "@/models/session";

export async function POST() {
  await dbConnect();

  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (token) {
    await Session.deleteOne({ token });
  }

  cookieStore.set("session", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return Response.json({ success: true });
}
//auth/session/route.js
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();

  return NextResponse.json({
    authenticated: !!session,
    user: session || null,
  });
}
// import { getSession } from "@/lib/auth";

// export async function GET(req) {
//   try {
//     const session = await getSession();

//     if (session) {
//       return new Response(
//         JSON.stringify({ authenticated: true, user: session }),
//         { status: 200, headers: { "Content-Type": "application/json" } }
//       );
//     } else {
//       return new Response(
//         JSON.stringify({ authenticated: false }),
//         { status: 200, headers: { "Content-Type": "application/json" } }
//       );
//     }
//   } catch (err) {
//     console.error("Session API error:", err);
//     return new Response(
//       JSON.stringify({ authenticated: false, error: err.message }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
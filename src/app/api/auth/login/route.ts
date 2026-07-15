import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = "Sadafal@1924";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      // Set an HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set("admin_token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

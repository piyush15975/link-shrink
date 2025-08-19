import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const db = await connectDB();
    return NextResponse.json({ status: "success", ready: db.connection.readyState });
  } catch (error) {
    return NextResponse.json({ status: "error", message: (error as Error).message }, { status: 500 });
  }
}

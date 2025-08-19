import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; 
import Url from "@/models/Url";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { longUrl, customId } = await req.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    if (customId) {
      const existingCustom = await Url.findOne({ shortId: customId });
      if (existingCustom) {
        return NextResponse.json(
          { error: "Custom ID is already taken" },
          { status: 400 }
        );
      }

      const newUrl = new Url({
        shortId: customId,
        longUrl,
      });

      await newUrl.save();
      return NextResponse.json({ shortUrl: `${baseUrl}/${customId}` });
    }
    const existing = await Url.findOne({ longUrl });
    if (existing) {
      return NextResponse.json({ shortUrl: `${baseUrl}/${existing.shortId}` });
    }

    const shortId = nanoid(7);

    const newUrl = new Url({
      shortId,
      longUrl,
    });

    await newUrl.save();

    return NextResponse.json({ shortUrl: `${baseUrl}/${shortId}` });
  } catch (error: unknown) {
    console.error("Error shortening URL:", error);
    return NextResponse.json(
      { error: "Failed to shorten URL" },
      { status: 500 }
    );
  }
}

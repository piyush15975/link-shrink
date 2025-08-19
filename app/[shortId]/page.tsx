import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import Url from "@/models/Url";
import Link from "next/link";

interface Props {
  params: Promise<{ shortId: string }>;
}

export default async function ShortRedirectPage({ params }: Props) {
  const { shortId } = await params;

  await connectDB();

  const urlDoc = await Url.findOneAndUpdate(
    { shortId },
    { $inc: { clicks: 1 } },
    { new: true }
  );

  if (!urlDoc) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center gap-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
          ⚠️ Link Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
          The link you tried to access doesn’t exist or has been removed. You
          can create your own shortened URL instantly!
        </p>

        <Link
          href="/"
          className="px-6 py-3 my-3 bg-purple-600/80 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700/90 transition flex items-center gap-2"
        >
          Create Your Own Short URL
        </Link>
      </div>
    );
  }

  let finalUrl = urlDoc.longUrl;
  if (!/^https?:\/\//i.test(finalUrl)) {
    finalUrl = "https://" + finalUrl;
  }

  redirect(finalUrl);
}

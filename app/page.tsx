"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [customId, setCustomId] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLCanvasElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl, customId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to shorten URL");
        setLoading(false);
        return;
      }
      setShortUrl(`${data.shortUrl}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownloadQR = () => {
    if (!qrRef.current) return;
    const url = qrRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    a.click();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 px-4">
      <div className="my-2 bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col items-center gap-6 transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🔗 Link Shortener</h1>
        <p className="text-gray-500 text-center">
          Paste your URL below and get a short link instantly. Optional: add a custom ID.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="url"
            required
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter your long URL (https://example.com)"
            className="px-4 py-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />

          <input
            type="text"
            value={customId}
            onChange={(e) => setCustomId(e.target.value)}
            placeholder="Custom ID (optional)"
            className="px-4 py-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 w-full font-semibold"
          >
            {loading ? "Shortening..." : "Shorten"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {shortUrl && (
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="break-all text-center font-medium text-gray-700">
              Short URL:{" "}
              <a href={shortUrl} target="_blank" className="text-purple-600 underline">
                {shortUrl}
              </a>
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={handleDownloadQR}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Download QR
              </button>
            </div>

            <QRCodeCanvas ref={qrRef} value={shortUrl} size={160} className="mt-2 rounded-lg shadow-md" />
          </div>
        )}
      </div>

      <footer className="mt-8 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} Built with ❤️ 
      </footer>
    </main>
  );
}

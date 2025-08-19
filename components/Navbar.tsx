"use client"

import { Link as Icon } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-center md:justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="p-2 bg-purple-600 rounded-lg flex items-center justify-center">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-purple-700">
            LinkShrink
          </h1>
        </Link>
      </div>
    </nav>
  )
}

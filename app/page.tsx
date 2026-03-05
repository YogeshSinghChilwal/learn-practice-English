"use client";

import Link from "next/link";
import { BookOpen, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          English Vocabulary Master
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Learn English vocabulary systematically through root words. Designed
          for Indian Government Exam Students.
        </p>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Learn Button */}
          <Link href="/vocabulary">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all hover:shadow-lg hover:scale-105 flex items-center justify-center gap-3 group">
              <BookOpen className="h-6 w-6 group-hover:animate-bounce" />
              Learn Vocabulary
            </button>
          </Link>

          {/* Practice Button */}
          <Link href="/quiz">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all hover:shadow-lg hover:scale-105 flex items-center justify-center gap-3 group">
              <Zap className="h-6 w-6 group-hover:animate-pulse" />
              Practice Vocabulary
            </button>
          </Link>
        </div>

        {/* Feature callout */}
        <p className="text-gray-600 mt-8 text-sm">
          💡 Choose to practice all vocabulary or only the ones you&apos;ve
          already studied for focused revision
        </p>

        {/* Admin Link */}
        <Link href="/admin">
          <p className="text-blue-600 hover:text-blue-700 text-xs mt-6 underline cursor-pointer">
            Admin Panel
          </p>
        </Link>
      </div>
    </main>
  );
}

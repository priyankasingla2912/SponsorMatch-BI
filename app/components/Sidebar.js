"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed left-0 top-0">

      <h1 className="text-2xl font-bold mb-8">
        SponsorMatch BI
      </h1>

      <div className="flex flex-col gap-4">

        <Link
          href="/dashboard"
          className="hover:bg-gray-700 p-3 rounded"
        >
          Dashboard
        </Link>

        <Link
          href="/create"
          className="hover:bg-gray-700 p-3 rounded"
        >
          Add Creator
        </Link>

        <Link
          href="/analytics"
          className="hover:bg-gray-700 p-3 rounded"
        >
          Analytics
        </Link>

        <Link
          href="/profile"
          className="hover:bg-gray-700 p-3 rounded"
        >
          Profile
        </Link>

      </div>
    </div>
  );
}
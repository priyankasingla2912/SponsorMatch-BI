"use client";

import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Profile() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      setEmail(session.user.email);
    }
  }

  return (
    <main className="ml-64 p-10">
      <Sidebar />

      <h1 className="text-4xl font-bold mb-8">
        Profile
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-8 w-[500px]">

        <h2 className="text-2xl font-bold mb-4">
          👤 User Details
        </h2>

        <p className="mb-3">
          <strong>Name:</strong> Priyanka Singla
        </p>

        <p className="mb-3">
          <strong>Email:</strong> {email}
        </p>

        <p className="mb-3">
          <strong>Role:</strong> Data Analyst
        </p>

        <p>
          <strong>Project:</strong> SponsorMatch BI
        </p>

      </div>
    </main>
  );
}
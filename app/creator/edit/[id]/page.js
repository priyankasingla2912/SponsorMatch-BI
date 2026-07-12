"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

export default function EditCreator() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [creatorName, setCreatorName] = useState("");
  const [followers, setFollowers] = useState("");
  const [niche, setNiche] = useState("");

  useEffect(() => {
    fetchCreator();
  }, []);

  async function fetchCreator() {
    const { data, error } = await supabase
      .from("creator_profiles")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) {
      console.log(error);
    } else {
      setCreatorName(data.creator_name);
      setFollowers(data.followers);
      setNiche(data.niche);
    }
  }

  async function updateCreator() {
    const { error } = await supabase
      .from("creator_profiles")
      .update({
        creator_name: creatorName,
        followers: followers,
        niche: niche,
      })
      .eq("id", Number(id));

    if (error) {
      alert(error.message);
    } else {
      alert("Creator updated successfully!");
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-8">
        Edit Creator
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <input
          className="w-full border p-3 mb-4 rounded"
          value={creatorName}
          onChange={(e) => setCreatorName(e.target.value)}
          placeholder="Creator Name"
        />

        <input
          className="w-full border p-3 mb-4 rounded"
          value={followers}
          onChange={(e) => setFollowers(e.target.value)}
          placeholder="Followers"
        />

        <input
          className="w-full border p-3 mb-6 rounded"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Niche"
        />

        <button
          onClick={updateCreator}
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Update Creator
        </button>

      </div>

    </main>
  );
}
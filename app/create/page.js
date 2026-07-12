"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function CreateCreator() {
  const router = useRouter();

  const [creatorName, setCreatorName] = useState("");
  const [followers, setFollowers] = useState("");
  const [niche, setNiche] = useState("");
  const [engagement, setEngagement] = useState("");
  const [postsPerWeek, setPostsPerWeek] = useState("");

  function calculateScore() {
    let total = 0;

    if (Number(followers) >= 50000) {
      total += 40;
    }

    if (Number(engagement) >= 5) {
      total += 30;
    }

    if (Number(postsPerWeek) >= 5) {
      total += 30;
    }

    return total;
  }

  async function createCreator() {
    const calculatedScore = calculateScore();

    let status = "Beginner";

    if (calculatedScore >= 90) {
      status = "Premium Partner";
    } else if (calculatedScore >= 70) {
      status = "Sponsorship Ready";
    }

    const { error } = await supabase
      .from("creator_profiles")
      .insert([
        {
          creator_name: creatorName,
          followers: Number(followers),
          niche: niche,
          engagement_rate: Number(engagement),
          posts_per_week: Number(postsPerWeek),
          score: calculatedScore,
          status: status,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Creator added successfully!");
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        Add Creator
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <input
          className="w-full border p-3 mb-4 rounded"
          placeholder="Creator Name"
          value={creatorName}
          onChange={(e) => setCreatorName(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-4 rounded"
          placeholder="Followers"
          value={followers}
          onChange={(e) => setFollowers(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-4 rounded"
          placeholder="Niche"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-4 rounded"
          placeholder="Engagement Rate (%)"
          value={engagement}
          onChange={(e) => setEngagement(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-6 rounded"
          placeholder="Posts Per Week"
          value={postsPerWeek}
          onChange={(e) => setPostsPerWeek(e.target.value)}
        />

        <button
          onClick={createCreator}
          className="bg-green-500 text-white px-6 py-3 rounded"
        >
          Create Creator
        </button>

      </div>
    </main>
  );
}
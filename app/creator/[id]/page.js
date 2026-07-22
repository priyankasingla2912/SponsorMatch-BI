"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function CreatorProfile() {
  const params = useParams();
  const id = params.id;

  const [creator, setCreator] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCreator();
    }
  }, [id]);

  async function fetchCreator() {
    const { data, error } = await supabase
      .from("creator_profiles")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      setCreator(data);
    }
  }

  if (!creator) {
    return (
      <div className="p-10">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
  <main className="min-h-screen bg-gray-100 p-10">

    <h1 className="text-5xl font-bold text-center mb-10">
      {creator.creator_name}
    </h1>

    <div className="flex justify-center">

      <div className="bg-white border rounded-xl shadow-lg p-8 w-[800px]">

        <p className="mb-4">
          <strong>Followers:</strong> {creator.followers}
        </p>

        <p className="mb-4">
          <strong>Engagement:</strong> {creator.engagement_rate}%
        </p>

        <p className="mb-4">
          <strong>Niche:</strong> {creator.niche}
        </p>

        <p className="mb-4">
          <strong>Posts per week:</strong> {creator.posts_per_week}
        </p>

        <p className="mb-4">
          <strong>Score:</strong> {creator.score}
        </p>

        <p className="mb-4">
          <strong>Status:</strong>

          <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
            {creator.status}
          </span>
        </p>

        <p className="mb-4">
          <strong>Revenue:</strong> {creator.estimated_revenue}
        </p>

        <p className="mb-4">
          <strong>Price:</strong> {creator.estimated_price}
        </p>

        <p className="mb-4">
          <strong>Brands:</strong> {creator.recommended_brands}
        </p>
        <p className="mb-4">
  <strong>Instagram:</strong>

  <a
    href={creator.instagram_url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 ml-2 underline"
  >
    Open Instagram
  </a>
</p>

<p className="mb-4">
  <strong>YouTube:</strong>

  <a
    href={creator.youtube_url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 ml-2 underline"
  >
    Open YouTube
  </a>
</p>

<p className="mb-4">
  <strong>TikTok:</strong>

  <a
    href={creator.tiktok_url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 ml-2 underline"
  >
    Open TikTok
  </a>
</p>

<p className="mb-4">
  <strong>LinkedIn:</strong>

  <a
    href={creator.linkedin_url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 ml-2 underline"
  >
    Open LinkedIn
  </a>
</p>


        <p className="mb-2">
          <strong>Recommendation:</strong>
        </p>

        <p>{creator.recommendation}</p>

      </div>

    </div>

  </main>
);
}
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
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

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
    let estimatedRevenue = 0;
let estimatedPrice = 0;

let recommendedBrands = "";
let recommendation = "";
const creatorNiche = niche.toLowerCase();

    if (calculatedScore >= 90) {
      status = "Premium Partner";
    } else if (calculatedScore >= 70) {
      status = "Sponsorship Ready";
    }
    estimatedRevenue = Math.round(Number(followers) * 0.02);
estimatedPrice = Math.round(Number(followers) * 0.01);
if (creatorNiche === "fitness") {
  recommendedBrands = "Nike, Adidas, Gymshark";

  recommendation =
    "Strong engagement. Partner with fitness and wellness brands.";
}

else if (creatorNiche === "food") {
  recommendedBrands = "Starbucks, Chipotle, Domino's";

  recommendation =
    "Increase posting frequency to attract restaurant collaborations.";
}

else if (creatorNiche === "travel") {
  recommendedBrands = "Airbnb, Expedia, Booking.com";

  recommendation =
    "Excellent audience reach. Collaborate with travel companies.";
}

else if (creatorNiche === "technology") {
  recommendedBrands = "Apple, Samsung, Dell";

  recommendation =
    "Focus on product reviews and tutorials.";
}

else if (creatorNiche === "fashion") {
  recommendedBrands = "Zara, H&M, Uniqlo";

  recommendation =
    "Increase short-form video content to improve engagement.";
}

else if (creatorNiche === "sustainability") {
  recommendedBrands = "Patagonia, Tesla, IKEA";

  recommendation =
    "Focus on eco-friendly campaigns and sustainability partnerships.";
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

estimated_revenue: estimatedRevenue,
estimated_price: estimatedPrice,

recommended_brands: recommendedBrands,
recommendation: recommendation,

instagram_url: instagramUrl,
youtube_url: youtubeUrl,
tiktok_url: tiktokUrl,
linkedin_url: linkedinUrl,
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
        <input
        className="w-full border p-3 mb-4 rounded"
  type="text"
  placeholder="Instagram URL"
  value={instagramUrl}
  onChange={(e) => setInstagramUrl(e.target.value)}
/>

<input
className="w-full border p-3 mb-4 rounded"
  type="text"
  placeholder="YouTube URL"
  value={youtubeUrl}
  onChange={(e) => setYoutubeUrl(e.target.value)}
/>

<input
className="w-full border p-3 mb-4 rounded"
  type="text"
  placeholder="TikTok URL"
  value={tiktokUrl}
  onChange={(e) => setTiktokUrl(e.target.value)}
/>

<input
className="w-full border p-3 mb-4 rounded"
  type="text"
  placeholder="LinkedIn URL"
  value={linkedinUrl}
  onChange={(e) => setLinkedinUrl(e.target.value)}
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
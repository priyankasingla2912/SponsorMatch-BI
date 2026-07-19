"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { jsPDF} from "jspdf";
import Link from "next/link";

export default function Home() {
const [followers, setFollowers] = useState("");
const [creatorName, setCreatorName] = useState("");
const [engagementRate, setEngagementRate] = useState("");
const [niche, setNiche] = useState("");
const [postsPerWeek, setPostsPerWeek] = useState("");
const [score, setScore] = useState(0);
const [status, setStatus]=useState("");
const [estimatedPrice, setEstimatedPrice] = useState("");
const [recommendedBrands, setRecommendedBrands] = useState("");
const [estimatedRevenue, setEstimatedRevenue] = useState("");
const [recommendation, setRecommendation] =useState("");
const [outreachEmail, setOutreachEmail] = useState("");
const [pitch, setPitch] = useState("");
async function generateScore() {

  if (
  !creatorName ||
  !followers ||
  !engagementRate ||
  !niche ||
  !postsPerWeek
) {
  alert("Please fill all fields.");
  return;
}

let calculatedScore = 0;


const followerCount = Number(followers);
const engagement = Number(engagementRate);
const posts = Number(postsPerWeek);

// Followers Score (40 points)
if (followerCount >= 50000) {
  calculatedScore += 40;
} else if (followerCount >= 10000) {
  calculatedScore += 25;
} else {
  calculatedScore += 10;
}

// Engagement Score (40 points)
if (engagement >= 5) {
  calculatedScore += 40;
} else if (engagement >= 3) {
  calculatedScore += 25;
} else {
  calculatedScore += 10;
}

// Posting Consistency (20 points)
if (posts >= 5) {
  calculatedScore += 20;
} else if (posts >= 3) {
  calculatedScore += 10;
}

setScore(calculatedScore);

let currentStatus = "";

if (calculatedScore <= 39) {
  currentStatus = "Not Ready";
} else if (calculatedScore <= 69) {
  currentStatus = "Emerging Creator";
} else if (calculatedScore <= 89) {
  currentStatus = "Sponsorship Ready";
} else {
  currentStatus = "Premium Partner";
}
setStatus(currentStatus);
// Estimate Sponsorship Price
let currentPrice = "";

if (followerCount < 10000) {
  currentPrice = "$50 - $100";
} else if (followerCount <= 25000) {
  currentPrice = "$150 - $300";
} else if (followerCount <= 50000) {
  currentPrice = "$300 - $600";
} else if (followerCount <= 100000) {
  currentPrice = "$600 - $1,000";
} else {
  currentPrice = "$1,000+";
}

setEstimatedPrice(currentPrice);

// Recommend Brands
let currentBrands = "";

if (niche === "Fitness") {
  currentBrands = "Nike, Adidas, Gymshark";
} else if (niche === "Food") {
  currentBrands = "Uber Eats, HelloFresh, DoorDash";
} else if (niche === "Travel") {
  currentBrands = "Airbnb, Booking.com, Expedia";
} else if (niche === "Technology") {
  currentBrands = "Samsung, Dell, Logitech";
} else if (niche === "Lifestyle") {
  currentBrands = "IKEA, Sephora, Target";
} else {
  currentBrands = "No recommendations available";
}

setRecommendedBrands(currentBrands);
// Estimate Monthly Revenue
let currentRevenue = "";

if (followerCount < 10000) {
  currentRevenue = "$300 per month";
} else if (followerCount <= 25000) {
  currentRevenue = "$900 per month";
} else if (followerCount <= 50000) {
  currentRevenue = "$1,800 per month";
} else if (followerCount <= 100000) {
  currentRevenue = "$3,200 per month";
} else {
  currentRevenue = "$4,800+ per month";
}

setEstimatedRevenue(currentRevenue);
/// Generate Recommendation
let advice = "";

if (engagement < 3) {
  advice += "Increase engagement by creating more interactive content. ";
} else if (engagement >= 5) {
  advice += "Excellent engagement! Maintain your current strategy. ";
}

if (posts < 3) {
  advice += "Post more frequently to improve visibility. ";
} else if (posts >= 5) {
  advice += "Great posting consistency. ";
}

if (calculatedScore >= 70) {
  advice += "You are ready to approach brands for sponsorship opportunities.";
} else {
  advice += "Continue growing your audience before approaching major brands.";
}

const currentRecommendation = advice;
setRecommendation(currentRecommendation);

const { error } = await supabase
  .from("creator_profiles")
  .insert([
    {
      creator_name: creatorName,
      followers: Number(followers),
      engagement_rate: Number(engagementRate),
      niche: niche,
      posts_per_week: Number(postsPerWeek),
      score: calculatedScore,
      status: currentStatus,
      estimated_price: currentPrice,
      recommended_brands: currentBrands,
      estimated_revenue: currentRevenue,
      recommendation: currentRecommendation,
    },
  ]);
  

if (error) {
  console.error(error);
  alert(error.message);
} else {
  alert("Profile saved successfully!");
}


}
function downloadPDF() {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("SponsorMatch BI", 20, 20);

  doc.setFontSize(16);
  doc.text("Creator Media Kit", 20, 35);

  doc.setFontSize(12);

  doc.text(`Creator Name: ${creatorName}`, 20, 50);
  doc.text(`Niche: ${niche}`, 20, 60);
  doc.text(`Followers: ${followers}`, 20, 70);
  doc.text(`Engagement Rate: ${engagementRate}%`, 20, 80);
  doc.text(`Posts Per Week: ${postsPerWeek}`, 20, 90);

  doc.text(`Sponsorship Score: ${score}`, 20, 110);
  doc.text(`Status: ${status}`, 20, 120);
  doc.text(`Estimated Price: ${estimatedPrice}`, 20, 130);
  doc.text(`Estimated Revenue: ${estimatedRevenue}`, 20, 140);

  doc.text("Recommended Brands:", 20, 160);
  doc.text(recommendedBrands, 20, 170);

  doc.text("Recommendation:", 20, 190);

  const splitRecommendation = doc.splitTextToSize(recommendation, 170);
  doc.text(splitRecommendation, 20, 200);

  doc.save(`${creatorName}_SponsorMatch_Media_Kit.pdf`);
}
function generateOutreachEmail() {

  const brand = recommendedBrands.split(",")[0];

  const email = `Subject: Collaboration Opportunity with ${brand}

Dear ${brand} Partnerships Team,

My name is ${creatorName}, and I am a ${niche} content creator with ${followers} followers and an engagement rate of ${engagementRate}%.

I create engaging content for a highly active audience and believe my content aligns well with ${brand}.

My Sponsorship Readiness Score is ${score}, and I consistently publish high-quality content that connects with my audience.

I would love the opportunity to collaborate with ${brand} on sponsored campaigns, product reviews, or promotional content that creates value for both of our audiences.

Please find my media kit attached for your review. I would be happy to discuss campaign ideas and partnership opportunities.

Thank you for your time and consideration.

Best regards,

${creatorName}`;
  
  setOutreachEmail(email);
}
function generatePitch() {
  const brand = recommendedBrands.split(",")[0];

  const proposal = `
Professional Sponsorship Proposal

Brand:
${brand}

Creator:
${creatorName}

Campaign Objective:
Promote ${brand} products to my ${niche} audience.

Deliverables:
• 2 Instagram Reels
• 3 Stories
• 1 Product Review
• 1 Carousel Post

Audience:
Followers: ${followers}
Engagement: ${engagementRate}%

Campaign Duration:
2 Weeks

Estimated Budget:
${estimatedPrice}

Why Partner With Me?

I consistently publish high-quality ${niche} content and maintain a Sponsorship Readiness Score of ${score}. My audience is highly engaged and trusts my recommendations.

Expected Outcome:

Increase brand awareness, engagement, and product visibility through authentic creator content.

Thank you!

${creatorName}
`;

  setPitch(proposal);
}
return (
  <main className="min-h-screen flex flex-col items-center p-10">
    <h1 className="text-4xl font-bold mb-8">
      SponsorMatch BI
    </h1>
    <Link href="/dashboard">
  <button
    type="button"
    className="mb-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
  >
    View Creator Dashboard
  </button>
</Link>
<div className="flex gap-4 mt-6">
  <Link href="/login">
    <button 
    type="button"
    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
      Login
    </button>
  </Link>

  <Link href="/signup">
    <button
    type="button"
    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
      Sign Up
    </button>
  </Link>
</div>

    <form className="w-full max-w-md space-y-4">

    <input
      type="text"
      placeholder="Creator Name"
      value={creatorName}
      onChange={(e) => setCreatorName(e.target.value)}
      className="w-full border p-3 rounded"
    />

    <input
      type="number"
      placeholder="Followers"
      value={followers}
      onChange={(e) => setFollowers(e.target.value)}
      className="w-full border p-3 rounded"
    />

    <input
      type="number"
      placeholder="Engagement Rate (%)"
      value={engagementRate}
      onChange={(e) => setEngagementRate(e.target.value)}
      className="w-full border p-3 rounded"
    />

    <select
      value={niche}
      onChange={(e) => setNiche(e.target.value)}
      className="w-full border p-3 rounded"
    >
      <option value="">Select Niche</option>
      <option value="Fitness">Fitness</option>
      <option value="Food">Food</option>
      <option value="Travel">Travel</option>
      <option value="Lifestyle">Lifestyle</option>
      <option value="Technology">Technology</option>
    </select>

    <input
      type="number"
      placeholder="Posts Per Week"
      value={postsPerWeek}
      onChange={(e) => setPostsPerWeek(e.target.value)}
      className="w-full border p-3 rounded"
    />

    <button
      type="button"
      onClick={generateScore}
      className="w-full bg-blue-600 text-white p-3 rounded"
    >
      Generate Score
    </button>
    {score > 0 && (
  <div className="mt-8 w-full max-w-2xl border rounded-lg shadow-lg p-6 bg-white">

    <h2 className="text-3xl font-bold text-center mb-6">
      Creator Media Kit
    </h2>
    <div className="grid grid-cols-2 gap-4 mb-6">

  <div className="border rounded-lg p-4 text-center bg-blue-50">
    <h3 className="font-bold">Followers</h3>
    <p className="text-2xl">{followers}</p>
  </div>

  <div className="border rounded-lg p-4 text-center bg-green-50">
    <h3 className="font-bold">Engagement</h3>
    <p className="text-2xl">{engagementRate}%</p>
  </div>

  <div className="border rounded-lg p-4 text-center bg-yellow-50">
    <h3 className="font-bold">Score</h3>
    <p className="text-2xl">{score}</p>
  </div>

  <div className="border rounded-lg p-4 text-center bg-purple-50">
    <h3 className="font-bold">Revenue</h3>
    <p className="text-xl">{estimatedRevenue}</p>
  </div>

</div>

    <div className="space-y-3">

      <p><strong>Creator Name:</strong> {creatorName}</p>
      <p><strong>Niche:</strong> {niche}</p>
      <p><strong>Followers:</strong> {followers}</p>
      <p><strong>Engagement Rate:</strong> {engagementRate}%</p>
      <p><strong>Posts Per Week:</strong> {postsPerWeek}</p>

      <hr />

      <p><strong>Sponsorship Readiness Score:</strong> {score}</p>
      <div className="w-full bg-gray-300 rounded-full h-4 mt-2">

  <div
    className="bg-green-500 h-4 rounded-full"
    style={{ width: `${score}%` }}
  ></div>

</div>
      
      <p>

<strong>Status:</strong>

<span
className={
status==="Premium Partner"
?"text-green-600 font-bold":
status==="Sponsorship Ready"
?"text-blue-600 font-bold":
"text-orange-600 font-bold"
}
>

 {status}

</span>

</p>

      <p><strong>Estimated Sponsorship Price:</strong> {estimatedPrice}</p>
      <p><strong>Estimated Monthly Revenue:</strong> {estimatedRevenue}</p>
      

      <p><strong>Recommendation:</strong></p>

      <div>

<strong>Recommended Brands</strong>

<div className="flex flex-wrap gap-2 mt-2">

{recommendedBrands.split(",").map((brand,index)=>(

<span

key={index}

className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"

>

{brand.trim()}

</span>

))}

</div>

</div>
      <p>{recommendation}</p>
      <button
  type="button"
  onClick={downloadPDF}
  className="mt-6 w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
>
  Download Media Kit PDF
</button>

<button
  type="button"
  onClick={generateOutreachEmail}
  className="mt-4 w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700"
>
  Generate Outreach Email
</button>
<button
  type="button"
  onClick={generatePitch}
  className="mt-4 w-full bg-orange-600 text-white p-3 rounded hover:bg-orange-700"
>
  Generate Sponsorship Pitch
</button>

{outreachEmail && (
  <div className="mt-6 p-4 border rounded-lg bg-gray-100">
    <h3 className="text-xl font-bold mb-3">
      Outreach Email
    </h3>

    <pre className="whitespace-pre-wrap">
      {outreachEmail}
    </pre>
  </div>
)}
{pitch && (
  <div className="mt-6 p-4 border rounded-lg bg-yellow-50">
    <h3 className="text-xl font-bold mb-3">
      Sponsorship Pitch
    </h3>

    <pre className="whitespace-pre-wrap">
      {pitch}
    </pre>
  </div>
)}

</div>   {/* closes space-y-3 */}

</div>   

)}
</form>
</main>
);
}
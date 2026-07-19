"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import DashboardChart from "../components/DashboardChart";
import StatusPieChart from "../components/StatusPieChart";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import {
  Users,
  Star,
  DollarSign,
  Award
} from "lucide-react";

export default function Dashboard() {
  const [creators, setCreators] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("All");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
const topCreator = creators.reduce(
  (best, creator) =>
    creator.followers > (best?.followers || 0)
      ? creator
      : best,
  {}
);

const highestScoreCreator = creators.reduce(
  (best, creator) =>
    creator.score > (best?.score || 0)
      ? creator
      : best,
  {}
);

  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

const creatorsPerPage = 5;
useEffect(() => {
  checkUser();
}, []);
const totalFollowers = creators.reduce(
  (sum, creator) => sum + creator.followers,
  0
);


  

  async function fetchCreators() {
    const { data, error } = await supabase
      .from("creator_profiles")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      setCreators(data);
    }
  }

  async function deleteCreator(id) {
    const { error } = await supabase
      .from("creator_profiles")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Error deleting creator");
    } else {
      alert("Creator deleted successfully!");

      setCreators(
        creators.filter((creator) => creator.id !== id)
      );
    }
  }
 

async function checkUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    router.replace("/login");
    return;
  }
  setUserEmail(session.user.email);

  fetchCreators();
}
function exportToCSV() {
  const headers = [
    "Creator",
    "Followers",
    "Niche",
    "Score",
    "Status",
  ];

  const rows = creators.map((creator) => [
  creator.creator_name ?? "N/A",
  creator.followers ?? "N/A",
  creator.niche ?? "N/A",
  creator.score ?? "N/A",
  creator.status ?? "N/A",
]);
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob(
    [csvContent],
    { type: "text/csv" }
  );

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "creators.csv";

  a.click();

  window.URL.revokeObjectURL(url);
}
const filteredCreators = creators
  .filter((creator) => {
    const matchesSearch = creator.creator_name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesNiche =
      selectedNiche === "All" ||
      creator.niche === selectedNiche;

    return matchesSearch && matchesNiche;
  })
  .sort((a, b) => {
    if (sortBy === "followersHigh") {
      return b.followers - a.followers;
    }

    if (sortBy === "followersLow") {
      return a.followers - b.followers;
    }

    if (sortBy === "scoreHigh") {
      return b.score - a.score;
    }

    return b.id - a.id;
  });

const indexOfLastCreator =
  currentPage * creatorsPerPage;

const indexOfFirstCreator =
  indexOfLastCreator - creatorsPerPage;

const currentCreators =
  filteredCreators.slice(
    indexOfFirstCreator,
    indexOfLastCreator
  );

const totalPages = Math.ceil(
  filteredCreators.length / creatorsPerPage
);
  return (
    <main className="ml-64 p-10">
      <Sidebar />

      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-8">

          <div>
  <h1 className="text-4xl font-bold">
    Creator Dashboard
  </h1>

  <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
    👤 Welcome, {userEmail}
  </p>
</div>

          <input
            type="text"
            placeholder="Search creator..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg w-72"
          />

          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="All">All Niches</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Technology">Technology</option>
            <option value="Fitness">Fitness</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
          <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="border p-3 rounded-lg"
>
  <option value="latest">Latest</option>
  <option value="followersHigh">
    Followers ↓
  </option>
  <option value="followersLow">
    Followers ↑
  </option>
  <option value="scoreHigh">
    Score ↓
  </option>
</select>

        </div>

        <div className="flex gap-3">

  <button
    onClick={exportToCSV}
    className="bg-blue-500 text-white px-5 py-3 rounded-lg shadow"
  >
    Export CSV
  </button>

  <Link href="/create">
    <button className="bg-green-500 text-white px-5 py-3 rounded-lg shadow">
      + Add Creator
    </button>
  </Link>

  <button
    onClick={async () => {
      await supabase.auth.signOut();
      router.replace("/login");
    }}
    className="bg-red-500 text-white px-5 py-3 rounded-lg shadow"
  >
    Logout
  </button>

</div>

      </div>
      {/* KPI Cards */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

  <div className="bg-blue-100 p-6 rounded-xl shadow">
    <div className ="flex justify-between items-center">
        <div>
    <h2 className="text-xl font-bold">
      Total Creators
    </h2>

    <p className="text-3xl mt-2">
      {creators.length}
    </p>
  </div>

   <Users size ={40} />
  </div>
</div>

  <div className="bg-green-100 p-6 rounded-xl shadow">

  <div className="flex justify-between items-center">

    <div>

      <h2 className="text-xl font-bold">
        Total Followers
      </h2>

      <p className="text-3xl mt-2">
        {totalFollowers.toLocaleString()}
      </p>

    </div>

    <Users size={40} />

  </div>

</div>
  <div className="bg-yellow-100 p-6 rounded-xl shadow">

  <div className="flex justify-between items-center">

    <div>

      <h2 className="text-xl font-bold">
        Average Score
      </h2>

      <p className="text-3xl mt-2">
        {
          creators.length > 0
            ? Math.round(
                creators.reduce(
                  (sum, creator) =>
                    sum + (creator.score || 0),
                  0
                ) / creators.length
              )
            : 0
        }
      </p>

    </div>

    <Star size={40} />

  </div>

</div>
  <div className="bg-purple-100 p-6 rounded-xl shadow">

  <div className="flex justify-between items-center">

    <div>

      <h2 className="text-xl font-bold">
        Total Revenue
      </h2>

      <p className="text-3xl mt-2">

        $
        {
          creators.reduce((sum, creator) => {

            const revenue = parseInt(
              creator.estimated_revenue
                ?.replace("$", "")
                ?.replace(",", "")
            );

            return sum + (revenue || 0);

          }, 0)
          .toLocaleString()
        }

      </p>

    </div>

    <DollarSign size={40} />

  </div>

</div>
</div>
{/* Insights */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

  <div className="bg-blue-100 p-6 rounded-xl shadow">

    <h2 className="text-xl font-bold">
      🏆 Top Creator
    </h2>

    <p className="text-2xl mt-2">
      {topCreator.creator_name}
    </p>

    <p>
      Followers: {topCreator.followers}
    </p>

  </div>

  <div className="bg-green-100 p-6 rounded-xl shadow">

    <h2 className="text-xl font-bold">
      ⭐ Highest Score
    </h2>

    <p className="text-2xl mt-2">
      {highestScoreCreator.creator_name}
    </p>

    <p>
      Score: {highestScoreCreator.score}
    </p>

  </div>

</div>

      

<DashboardChart creators={creators} />

<StatusPieChart creators={creators} />




 <div className="overflow-x-auto">  </div>

  <table className="w-full border">
    
    

     

        


        <thead className="bg-gray-200">

          <tr>
            <th className="border p-3">Creator</th>
            <th className="border p-3">Followers</th>
            <th className="border p-3">Niche</th>
            <th className="border p-3">Score</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Actions</th>
          </tr>

        </thead>

        <tbody>

  {currentCreators.map((creator) => (

    <tr key={creator.id}>

      <td className="border p-3">
        {creator.creator_name}
      </td>

      <td className="border p-3">
        {creator.followers}
      </td>

      <td className="border p-3">
        {creator.niche}
      </td>

      <td className="border p-3">
        {creator.score ?? "N/A"}
      </td>

      <td className="border p-3">
        {creator.status ?? "N/A"}
      </td>

      <td className="border p-3">

        <Link href={`/creator/${creator.id}`}>
          <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
            View
          </button>
        </Link>

        <Link href={`/creator/edit/${creator.id}`}>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
            Edit
          </button>
        </Link>

        <button
          onClick={() => {
  if (
    window.confirm(
      "Are you sure you want to delete this creator?"
    )
  ) {
    deleteCreator(creator.id);
  }
}}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

      </td>

    </tr>

  ))}

</tbody>

      </table>
      <div className="flex justify-center items-center gap-4 mt-6">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="font-bold">
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Next
  </button>

</div>

    </main>
  );
}
"use client";

import Sidebar from "../components/Sidebar";
import DashboardChart from "../components/DashboardChart";
import StatusPieChart from "../components/StatusPieChart";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Analytics() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    fetchCreators();
  }, []);

  async function fetchCreators() {
    const { data } = await supabase
      .from("creator_profiles")
      .select("*");

    setCreators(data || []);
  }

  return (
    <main className="ml-64 p-10">
      <Sidebar />

      <h1 className="text-4xl font-bold mb-8">
        Analytics
      </h1>

      <DashboardChart creators={creators} />

      <div className="mt-10">
        <StatusPieChart creators={creators} />
      </div>
    </main>
  );
}
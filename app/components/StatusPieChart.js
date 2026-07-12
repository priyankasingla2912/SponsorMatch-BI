"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function StatusPieChart({ creators }) {

  const premiumCount = creators.filter(
    (creator) => creator.status === "Premium Partner"
  ).length;

  const sponsorshipCount = creators.filter(
    (creator) => creator.status === "Sponsorship Ready"
  ).length;

  const data = {
    labels: [
      "Premium Partner",
      "Sponsorship Ready",
    ],

    datasets: [
      {
        data: [
          premiumCount,
          sponsorshipCount,
        ],

        backgroundColor: [
          "#10b981",
          "#f59e0b",
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Creator Status
      </h2>

      <div className="w-96 mx-auto">
        <Pie data={data} />
      </div>
    </div>
  );
}
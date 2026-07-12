"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardChart({ creators }) {
  const data = {
    labels: creators.map(
      (creator) => creator.creator_name
    ),

    datasets: [
      {
        label: "Followers",
        data: creators.map(
          (creator) => Number(creator.followers)
        ),

        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
          "#ec4899",
          "#84cc16",
          "#6366f1",
          "#14b8a6",
        ],

        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRation:false,

    plugins: {
      legend: {
        position: "top",
      },

      title: {
        display: true,
        text: "Followers by Creator",
        font: {
          size: 22,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        title: {
          display: true,
          text: "Followers",
        },
      },

      x: {
        title: {
          display: true,
          text: "Creators",
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8 h-[500px]">
      <Bar data={data} options={options} />
    </div>
  );
}
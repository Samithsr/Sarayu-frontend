import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TestChart = () => {
  const chartRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 390, height: 844 });

  const updateDimensions = () => {
    const width = window.innerWidth < 390 ? window.innerWidth : 390;
    const height = window.innerHeight < 844 ? window.innerHeight : 844;
    setDimensions({ width, height });
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3, 10, 8, 9, 15, 20, 30],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      style={{
        width: dimensions.width,
        height: dimensions.height,
        overflowX: "scroll",
      }}
    >
      {/* Set a wider width for the chart to allow horizontal scrolling */}
      <div style={{ width: "1500px", height: "100%" }}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default TestChart;

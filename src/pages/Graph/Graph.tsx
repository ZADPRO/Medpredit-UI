import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

interface GraphProps {
  data: Array<{ refIVDDate: string; refIVDScore: number }> | null; // Include refIVDScore
  label: string;
}

const Graph: React.FC<GraphProps> = ({ data, label }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Handle null or empty data
    if (!data || data.length === 0) {
      setChartData({});
      return;
    }

    // Extract X-axis (dates) and Y-axis (scores) from data
    const labels = data.map(
      (item) => new Date(item.refIVDDate).toISOString().split("T")[0]
    );
    const scores = data.map((item) => item.refIVDScore);

    // Dynamically fetch CSS variables
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    // Set chart data
    const updatedData = {
      labels, // X-axis labels
      datasets: [
        {
          label: label, // Dataset label
          data: scores, // Y-axis values
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
      ],
    };

    // Set chart options
    const updatedOptions = {
      maintainAspectRatio: false, // Allow custom height
      responsive: true, // Ensure the chart is responsive
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(updatedData);
    setChartOptions(updatedOptions);
  }, [data]); // Recalculate chart data when `data` changes

  return (
    <div className="card" style={{ height: '10rem' }}> {/* Set fixed height here */}
      {data && data.length > 0 ? (
        <Chart type="line" data={chartData} options={chartOptions} />
      ) : (
        <p>No data available to display the chart.</p> // Fallback message
      )}
    </div>
  );
};

export default Graph;
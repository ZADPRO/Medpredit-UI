import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

interface GraphProps {
    data: Array<{ refIVDDate: string; refIVDScore: number; ref1hrs: number; ref2hrs: number }> | null; // Include refIVDScore, ref1hrs, and ref2hrs
    label: string;
}

const GraphThree: React.FC<GraphProps> = ({ data, label }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        console.log("line 14------------",label)
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
        const ref1hrs = data.map((item) => item.ref1hrs);
        const ref2hrs = data.map((item) => item.ref2hrs);

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
                    label: "Starter", // Dataset label for refIVDScore
                    data: scores, // Y-axis values for refIVDScore
                    fill: false,
                    borderColor: documentStyle.getPropertyValue("--blue-500"),
                    tension: 0.4,
                },
                {
                    label: '1 Hrs', // Dataset label for ref1hrs
                    data: ref1hrs, // Y-axis values for ref1hrs
                    fill: false,
                    borderColor: documentStyle.getPropertyValue("--green-500"), // Change color as needed
                    tension: 0.4,
                },
                {
                    label: '2 Hrs', // Dataset label for ref2hrs
                    data: ref2hrs, // Y-axis values for ref2hrs
                    fill: false,
                    borderColor: documentStyle.getPropertyValue("--red-500"), // Change color as needed
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

export default GraphThree;
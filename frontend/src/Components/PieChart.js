// src/Components/PieChart.js
import React from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';

const PieChart = () => {
    const options = {
        animationEnabled: true,
        title: {
            text: "Distribution of Sales by Region"
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: [
                { y: 40, label: "North America" },
                { y: 30, label: "Europe" },
                { y: 20, label: "Asia" },
                { y: 10, label: "Others" }
            ]
        }]
    };

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
};

export default PieChart;

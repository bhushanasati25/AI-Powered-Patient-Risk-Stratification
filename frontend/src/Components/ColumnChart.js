// src/Components/ColumnChart.js
import React from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';

const ColumnChart = () => {
    const options = {
        animationEnabled: true,
        title: {
            text: "Monthly Revenue"
        },
        axisY: {
            title: "Revenue in USD",
            prefix: "$",
            includeZero: false
        },
        data: [{
            type: "column",
            yValueFormatString: "$#,##0.00",
            dataPoints: [
                { label: "January", y: 12000 },
                { label: "February", y: 15000 },
                { label: "March", y: 13000 },
                { label: "April", y: 17000 },
                { label: "May", y: 14000 }
            ]
        }]
    };

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
};

export default ColumnChart;

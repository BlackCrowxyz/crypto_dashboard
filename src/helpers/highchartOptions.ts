import { numberWithCommas } from "@/helpers/index"

interface PriceDataItem {
    // timestamp, value
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

function getName(name: string) {
    if (name == 'prices') return "Prices"
    else if (name == 'market_caps') return "Market Caps"
    else if (name == 'total_volumes') return "Total Volumes"
}

export const getChartOptions = (data: PriceDataItem, name: "prices" | "market_caps" | "total_volumes") => ({
    chart: {
        zoomType: "xy", // Enables zooming along both axes
        backgroundColor: "#212121", // Background color of the chart
    },
    title: {
        text: getName(name),
        align: "left",
        style: {
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
        },
    },
    xAxis: [
        {
            type: "datetime",
            crosshair: true, // Enables a crosshair for following the points along the axis
            labels: {
                style: {
                    color: "white",
                },
            },
        },
    ],
    yAxis: [
        {
            // Primary yAxis for price
            labels: {
                formatter: function () {
                    return '$' + numberWithCommas(this.value);
                },
                style: {
                    color: "white",
                },
            },
            opposite: true
        }
    ],
    tooltip: {
        shared: true,
    },
    series: [
        {
            name: name,
            type: "spline", // For a smooth line chart
            color: '#cccccc',
            data: data[name].map(([time, price]) => [time, price]),
            yAxis: 0,
            tooltip: {
                valuePrefix: " $ ",
            },
            marker: {
                enabled: false,
            },
        },
    ],
    responsive: {
        rules: [
            {
                condition: {
                    maxWidth: 500,
                },
                chartOptions: {
                    legend: {
                        layout: "horizontal",
                        align: "center",
                        verticalAlign: "bottom",
                    },
                },
            },
        ],
    },
})
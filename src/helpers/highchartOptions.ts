interface PriceDataItem {
    // timestamp, value
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

export const getChartOptions = (data: PriceDataItem, name: "prices" | "market_caps" | "total_volumes") => ({
    chart: {
        zoomType: "xy", // Enables zooming along both axes
        backgroundColor: "#f3f3f3", // Background color of the chart
    },
    title: {
        text: "",
        align: "left",
        style: {
            color: "#333333",
            fontWeight: "bold",
            fontSize: "16px",
        },
    },
    xAxis: [
        {
            type: "datetime",
            crosshair: true, // Enables a crosshair for following the points along the axis
        },
    ],
    yAxis: [
        {
            // Primary yAxis for price
            labels: {
                format: "${value}",
                style: {
                    color: "green",
                },
            },
            // title: {
            //     text: "Price",
            //     style: {
            //         color: "yellow",
            //     },
            // },
            opposite: true, // This will put the Price yAxis on the right side
        },
        {
            // Secondary yAxis for volume
            title: {
                text: "Value",
                style: {
                    color: "primary",
                },
            },
            labels: {
                format: "{value} units",
                style: {
                    color: "blue",
                },
            },
            opposite: false, // This will put the Volume yAxis on the left side
        },
    ],
    tooltip: {
        shared: true,
    },
    series: [
        // {
        //   name: "Volume",
        //   type: "column", // This will create bars
        //   data: fakeChart.map((point, i) => [i, point[0]]), // Assuming volume is the third value in your array
        //   yAxis: 1,
        //   tooltip: {
        //     valueSuffix: " units",
        //   },
        // },
        {
            name: name,
            type: "spline", // For a smooth line chart
            // data: fakeChart.map(([time, price]) => [time, price]),
            data: data[name].map(([time, price]) => [time, price]),
            yAxis: 0,
            tooltip: {
                valueSuffix: " $",
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
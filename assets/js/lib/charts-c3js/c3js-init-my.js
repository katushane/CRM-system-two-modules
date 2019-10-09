function donutInit() {
    var donutChartIncome = c3.generate({
        bindto: '#donut-chart-income',
        data: {
            columns: [
                ['data1', 10],
                ['data2', 10],
                ['data3', 10],
                ['data4', 30],
                ['data5', 60],
                ['data6', 120]
            ],
            type : 'donut'
        },
        donut: {
            title: "Income cashflows"
        }
    });
    var donutChartOutcome = c3.generate({
        bindto: '#donut-chart-outcome',
        data: {
            columns: [
                ['data1', 20],
                ['data2', 20],
                ['data3', 30],
                ['data4', 40],
                ['data5', 80],
                ['data6', 120]
            ],
            type : 'donut'
        },
        donut: {
            title: "Outcome cashflows"
        }
    });
};

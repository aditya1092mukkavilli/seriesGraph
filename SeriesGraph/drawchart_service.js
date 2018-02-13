var drawChartService = angular.module('grapapp');

drawChartService.service('drawchart', [function(){
/*Passing convereted data to Graph format so that it will render in markup*/
    this.loadChart = function (convertedvalues) {
        let displaySeriesData = [];
        for(let i =0;i<convertedvalues.length; i++)
        {
            displaySeriesData.push({ name: "SERIES"+(i+1),
            type: "spline",
            xvalueFormatString: "####",
            showInLegend: true,
            dataPoints: convertedvalues[i]['SERIES'+(i+1)].data
        });
        }

        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title:{
                text: "Yearly Graphs"
            },
            axisX: {
                title:"year",
                valueFormatString: "####"
            },
            axisY: {
                title: "value",
              
            },
            legend:{
                cursor: "pointer",
                fontSize: 16,
                itemclick: toggleDataSeries
            },
            toolTip:{
                shared: true
            },
            data: displaySeriesData
        });
        chart.render();
        
        function toggleDataSeries(e){
            if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else{
                e.dataSeries.visible = true;
            }
            chart.render();
        }
        
        }

}]);
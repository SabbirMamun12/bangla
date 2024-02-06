/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 12.0, "series": [{"data": [[0.0, 4.0], [300.0, 1.0], [5300.0, 1.0], [700.0, 1.0], [200.0, 3.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Homepage-10", "isController": false}, {"data": [[0.0, 1.0], [1200.0, 3.0], [600.0, 1.0], [2600.0, 1.0], [2900.0, 1.0], [800.0, 2.0], [1000.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Homepage-11", "isController": false}, {"data": [[4500.0, 1.0], [4700.0, 2.0], [2600.0, 2.0], [2700.0, 1.0], [2800.0, 1.0], [3000.0, 2.0], [3600.0, 1.0], [3700.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Get Career Info", "isController": false}, {"data": [[1100.0, 2.0], [1300.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [400.0, 2.0], [1600.0, 1.0], [800.0, 1.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Homepage-32", "isController": false}, {"data": [[0.0, 1.0], [1100.0, 1.0], [1200.0, 2.0], [800.0, 2.0], [1800.0, 1.0], [500.0, 4.0], [1000.0, 1.0]], "isOverall": false, "label": "Homepage-33", "isController": false}, {"data": [[0.0, 1.0], [1100.0, 1.0], [300.0, 3.0], [1400.0, 1.0], [700.0, 1.0], [800.0, 1.0], [100.0, 1.0], [200.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Homepage-30", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [600.0, 1.0], [200.0, 2.0], [800.0, 2.0], [400.0, 2.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Homepage-31", "isController": false}, {"data": [[0.0, 10.0], [200.0, 2.0]], "isOverall": false, "label": "Get Career Info-9", "isController": false}, {"data": [[0.0, 11.0], [200.0, 1.0]], "isOverall": false, "label": "Get Career Info-8", "isController": false}, {"data": [[0.0, 10.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Get Career Info-7", "isController": false}, {"data": [[0.0, 5.0], [10100.0, 1.0], [11400.0, 1.0], [11800.0, 2.0], [3000.0, 1.0], [200.0, 3.0], [14300.0, 1.0], [18500.0, 1.0], [5200.0, 1.0], [100.0, 2.0], [6400.0, 1.0], [7400.0, 2.0], [1800.0, 1.0], [7700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get about-3", "isController": false}, {"data": [[0.0, 6.0], [300.0, 4.0], [100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Get about-54", "isController": false}, {"data": [[0.0, 5.0], [2300.0, 1.0], [2600.0, 2.0], [3000.0, 1.0], [200.0, 3.0], [3200.0, 1.0], [3900.0, 1.0], [4000.0, 1.0], [16100.0, 1.0], [1400.0, 1.0], [5900.0, 1.0], [1500.0, 1.0], [100.0, 3.0], [1600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Get about-2", "isController": false}, {"data": [[0.0, 4.0], [300.0, 5.0], [700.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get about-53", "isController": false}, {"data": [[0.0, 7.0], [100.0, 2.0], [200.0, 3.0]], "isOverall": false, "label": "Get contact Info-9", "isController": false}, {"data": [[0.0, 3.0], [2200.0, 1.0], [300.0, 1.0], [200.0, 2.0], [100.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "Get about-5", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [200.0, 3.0], [800.0, 1.0], [400.0, 1.0], [900.0, 2.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get about-56", "isController": false}, {"data": [[0.0, 4.0], [33500.0, 1.0], [35600.0, 1.0], [37100.0, 2.0], [200.0, 2.0], [17200.0, 1.0], [24800.0, 1.0], [100.0, 4.0], [25700.0, 1.0], [400.0, 1.0], [1600.0, 1.0], [27100.0, 1.0], [28900.0, 1.0], [30600.0, 1.0], [30400.0, 1.0], [32400.0, 1.0]], "isOverall": false, "label": "Get about-4", "isController": false}, {"data": [[0.0, 7.0], [300.0, 3.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get about-55", "isController": false}, {"data": [[0.0, 4.0], [200.0, 5.0], [100.0, 2.0], [1700.0, 1.0]], "isOverall": false, "label": "Get about-7", "isController": false}, {"data": [[2300.0, 1.0], [9800.0, 1.0], [5100.0, 1.0], [21100.0, 1.0], [5500.0, 1.0], [5600.0, 1.0], [5400.0, 1.0], [5800.0, 1.0], [6100.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [13900.0, 1.0]], "isOverall": false, "label": "Get about-58", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Get contact Info-6", "isController": false}, {"data": [[0.0, 4.0], [200.0, 3.0], [100.0, 3.0], [1600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get about-6", "isController": false}, {"data": [[2100.0, 1.0], [9200.0, 1.0], [2200.0, 1.0], [4900.0, 1.0], [6000.0, 2.0], [3200.0, 1.0], [3500.0, 2.0], [7200.0, 1.0], [3700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Get about-57", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "Get contact Info-5", "isController": false}, {"data": [[0.0, 8.0], [300.0, 1.0], [100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "Get about-9", "isController": false}, {"data": [[0.0, 8.0], [1200.0, 2.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Get contact Info-8", "isController": false}, {"data": [[0.0, 5.0], [300.0, 1.0], [100.0, 2.0], [200.0, 4.0]], "isOverall": false, "label": "Get about-8", "isController": false}, {"data": [[0.0, 10.0], [1200.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Get contact Info-7", "isController": false}, {"data": [[0.0, 3.0], [1200.0, 1.0], [600.0, 1.0], [1300.0, 2.0], [100.0, 3.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Homepage-29", "isController": false}, {"data": [[0.0, 9.0], [200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Get Career Info-6", "isController": false}, {"data": [[0.0, 9.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Get Career Info-5", "isController": false}, {"data": [[0.0, 8.0], [700.0, 1.0], [200.0, 1.0], [100.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Homepage-27", "isController": false}, {"data": [[0.0, 10.0], [200.0, 2.0]], "isOverall": false, "label": "Get Career Info-4", "isController": false}, {"data": [[0.0, 6.0], [1300.0, 1.0], [100.0, 3.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Homepage-28", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "Get Career Info-3", "isController": false}, {"data": [[0.0, 7.0], [600.0, 1.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "Homepage-25", "isController": false}, {"data": [[0.0, 8.0], [200.0, 2.0], [100.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "Get about-50", "isController": false}, {"data": [[0.0, 10.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Get Career Info-2", "isController": false}, {"data": [[0.0, 9.0], [600.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "Homepage-26", "isController": false}, {"data": [[0.0, 10.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Get Career Info-1", "isController": false}, {"data": [[0.0, 2.0], [1200.0, 1.0], [600.0, 1.0], [300.0, 2.0], [700.0, 2.0], [800.0, 2.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Homepage-23", "isController": false}, {"data": [[0.0, 7.0], [8700.0, 1.0], [9900.0, 1.0], [9800.0, 1.0], [10800.0, 1.0], [12400.0, 1.0], [12800.0, 1.0], [200.0, 1.0], [13800.0, 1.0], [14000.0, 1.0], [5500.0, 1.0], [5700.0, 1.0], [1500.0, 1.0], [100.0, 3.0], [6900.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "Get about-1", "isController": false}, {"data": [[0.0, 9.0], [100.0, 3.0]], "isOverall": false, "label": "Get about-52", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [700.0, 5.0], [800.0, 2.0], [1800.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Get Career Info-0", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [700.0, 2.0], [800.0, 2.0], [100.0, 1.0], [200.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "Homepage-24", "isController": false}, {"data": [[2300.0, 1.0], [9000.0, 1.0], [700.0, 1.0], [2900.0, 2.0], [3000.0, 1.0], [3100.0, 1.0], [800.0, 1.0], [3200.0, 1.0], [3600.0, 1.0], [3700.0, 1.0], [900.0, 1.0], [4000.0, 1.0], [4600.0, 1.0], [1200.0, 2.0], [5200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [1600.0, 2.0], [1900.0, 3.0]], "isOverall": false, "label": "Get about-0", "isController": false}, {"data": [[0.0, 9.0], [700.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Get about-51", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [600.0, 1.0], [100.0, 5.0], [800.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Homepage-21", "isController": false}, {"data": [[0.0, 4.0], [2300.0, 1.0], [600.0, 1.0], [700.0, 1.0], [100.0, 3.0], [400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Homepage-22", "isController": false}, {"data": [[0.0, 8.0], [1100.0, 1.0], [600.0, 1.0], [100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Homepage-20", "isController": false}, {"data": [[33700.0, 1.0], [33500.0, 1.0], [35600.0, 1.0], [36400.0, 2.0], [36200.0, 1.0], [35900.0, 1.0], [38900.0, 1.0], [36900.0, 1.0], [39800.0, 1.0], [40600.0, 1.0], [32300.0, 1.0]], "isOverall": false, "label": "Get about", "isController": false}, {"data": [[0.0, 10.0], [200.0, 2.0]], "isOverall": false, "label": "Get contact Info-2", "isController": false}, {"data": [[0.0, 9.0], [600.0, 1.0], [700.0, 2.0], [800.0, 1.0], [1000.0, 1.0], [1100.0, 2.0], [1300.0, 1.0], [1400.0, 1.0], [100.0, 1.0], [1600.0, 1.0], [1700.0, 3.0], [1800.0, 3.0], [1900.0, 1.0], [2100.0, 3.0], [2300.0, 2.0], [2500.0, 2.0], [2600.0, 3.0], [2700.0, 1.0], [2900.0, 2.0], [3000.0, 2.0], [3100.0, 1.0], [3300.0, 1.0], [200.0, 2.0], [4300.0, 1.0], [4700.0, 1.0]], "isOverall": false, "label": "Get contact Info-1", "isController": false}, {"data": [[0.0, 8.0], [100.0, 1.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Get contact Info-4", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Get contact Info-3", "isController": false}, {"data": [[2300.0, 1.0], [2400.0, 2.0], [600.0, 3.0], [700.0, 6.0], [2800.0, 2.0], [2900.0, 2.0], [3200.0, 1.0], [900.0, 6.0], [1000.0, 3.0], [4000.0, 1.0], [1100.0, 3.0], [300.0, 8.0], [1300.0, 2.0], [1400.0, 3.0], [1600.0, 1.0], [400.0, 2.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Get contact Info-0", "isController": false}, {"data": [[0.0, 6.0], [600.0, 1.0], [800.0, 1.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "Homepage-18", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0], [200.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Homepage-19", "isController": false}, {"data": [[0.0, 4.0], [300.0, 2.0], [600.0, 1.0], [700.0, 1.0], [200.0, 1.0], [100.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Homepage-16", "isController": false}, {"data": [[0.0, 8.0], [1500.0, 1.0], [200.0, 1.0], [100.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Homepage-17", "isController": false}, {"data": [[0.0, 2.0], [600.0, 2.0], [300.0, 1.0], [700.0, 1.0], [400.0, 2.0], [100.0, 2.0], [200.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Homepage-14", "isController": false}, {"data": [[0.0, 1.0], [2400.0, 1.0], [1200.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [200.0, 1.0], [400.0, 1.0], [1800.0, 1.0], [1000.0, 2.0], [500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Homepage-15", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 2.0], [2400.0, 1.0], [5200.0, 1.0], [2700.0, 1.0], [3100.0, 1.0], [1600.0, 1.0], [6600.0, 1.0], [3400.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Homepage-12", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [5000.0, 1.0], [2500.0, 1.0], [1300.0, 2.0], [2700.0, 1.0], [5500.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [3100.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "Homepage-13", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "Get Career Info-27", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0]], "isOverall": false, "label": "Get contact Info-23", "isController": false}, {"data": [[300.0, 2.0], [600.0, 2.0], [700.0, 2.0], [100.0, 2.0], [400.0, 2.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get Career Info-28", "isController": false}, {"data": [[0.0, 9.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "Get contact Info-24", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [2500.0, 1.0], [1400.0, 1.0], [1600.0, 4.0], [1700.0, 1.0], [1800.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "Get Career Info-29", "isController": false}, {"data": [[0.0, 10.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Get contact Info-21", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "Get contact Info-22", "isController": false}, {"data": [[2300.0, 2.0], [4500.0, 1.0], [2400.0, 1.0], [2800.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [3500.0, 1.0], [3700.0, 2.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Homepage-50", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "Get Career Info-23", "isController": false}, {"data": [[2100.0, 1.0], [4100.0, 1.0], [2200.0, 1.0], [4800.0, 1.0], [5400.0, 1.0], [2700.0, 1.0], [3100.0, 1.0], [3300.0, 1.0], [1600.0, 1.0], [3400.0, 1.0], [3700.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Homepage-51", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "Get Career Info-24", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Get contact Info-20", "isController": false}, {"data": [[0.0, 10.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Get Career Info-25", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "Get Career Info-26", "isController": false}, {"data": [[2100.0, 1.0], [300.0, 1.0], [1300.0, 2.0], [1400.0, 1.0], [800.0, 1.0], [400.0, 1.0], [100.0, 1.0], [1600.0, 1.0], [1900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Get about-39", "isController": false}, {"data": [[0.0, 1.0], [300.0, 5.0], [600.0, 1.0], [400.0, 2.0], [200.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get Career Info-20", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "Get Career Info-21", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0]], "isOverall": false, "label": "Get contact Info-29", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "Get Career Info-22", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "Get contact Info-27", "isController": false}, {"data": [[0.0, 9.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "Get contact Info-28", "isController": false}, {"data": [[0.0, 1.0], [600.0, 2.0], [300.0, 1.0], [1500.0, 2.0], [100.0, 2.0], [1700.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Get contact Info-25", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "Get contact Info-26", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [600.0, 1.0], [2400.0, 1.0], [800.0, 2.0], [1700.0, 1.0], [500.0, 3.0], [8000.0, 1.0]], "isOverall": false, "label": "Get about-32", "isController": false}, {"data": [[4100.0, 1.0], [4200.0, 1.0], [600.0, 1.0], [4900.0, 1.0], [5100.0, 1.0], [2600.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [3000.0, 1.0], [3200.0, 1.0], [1700.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "Get about-31", "isController": false}, {"data": [[4300.0, 2.0], [4200.0, 1.0], [1100.0, 1.0], [4600.0, 1.0], [2300.0, 1.0], [300.0, 1.0], [3200.0, 1.0], [3500.0, 1.0], [900.0, 1.0], [3800.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "Get about-34", "isController": false}, {"data": [[4300.0, 2.0], [4600.0, 1.0], [2300.0, 1.0], [600.0, 1.0], [1400.0, 1.0], [3300.0, 2.0], [3200.0, 1.0], [3400.0, 1.0], [7800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Get about-33", "isController": false}, {"data": [[9300.0, 1.0], [11500.0, 2.0], [11700.0, 1.0], [11600.0, 1.0], [12400.0, 1.0], [3100.0, 1.0], [6500.0, 1.0], [14100.0, 1.0], [15200.0, 1.0], [7800.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Get about-36", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [2200.0, 1.0], [2400.0, 1.0], [1400.0, 1.0], [2700.0, 1.0], [2800.0, 1.0], [3100.0, 1.0], [3800.0, 2.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Homepage-9", "isController": false}, {"data": [[8600.0, 1.0], [9700.0, 1.0], [9500.0, 1.0], [9900.0, 1.0], [5400.0, 1.0], [11600.0, 1.0], [3000.0, 2.0], [12700.0, 1.0], [12500.0, 1.0], [7000.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "Get about-35", "isController": false}, {"data": [[47400.0, 1.0], [53800.0, 1.0], [59200.0, 1.0], [57400.0, 1.0], [59500.0, 1.0], [59900.0, 1.0], [62700.0, 1.0], [62600.0, 1.0], [62500.0, 1.0], [62000.0, 1.0], [65000.0, 2.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[0.0, 1.0], [300.0, 5.0], [700.0, 1.0], [200.0, 1.0], [800.0, 1.0], [100.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Homepage-8", "isController": false}, {"data": [[1200.0, 2.0], [300.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [3000.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [1000.0, 1.0], [2000.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Get about-38", "isController": false}, {"data": [[0.0, 3.0], [1100.0, 1.0], [300.0, 1.0], [1200.0, 1.0], [600.0, 1.0], [1300.0, 1.0], [200.0, 2.0], [1800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Homepage-7", "isController": false}, {"data": [[8600.0, 1.0], [1100.0, 1.0], [2300.0, 1.0], [4500.0, 1.0], [4700.0, 1.0], [700.0, 1.0], [2700.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "Get about-37", "isController": false}, {"data": [[0.0, 1.0], [2200.0, 1.0], [300.0, 2.0], [200.0, 3.0], [100.0, 2.0], [400.0, 1.0], [800.0, 2.0]], "isOverall": false, "label": "Homepage-6", "isController": false}, {"data": [[0.0, 1.0], [1100.0, 1.0], [300.0, 2.0], [400.0, 2.0], [900.0, 1.0], [1000.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Homepage-5", "isController": false}, {"data": [[2300.0, 1.0], [1200.0, 1.0], [2600.0, 2.0], [1300.0, 1.0], [2700.0, 1.0], [1500.0, 1.0], [100.0, 1.0], [1600.0, 2.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Homepage-4", "isController": false}, {"data": [[1200.0, 1.0], [2500.0, 1.0], [700.0, 1.0], [400.0, 1.0], [200.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Homepage-49", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [1400.0, 1.0], [700.0, 1.0], [100.0, 1.0], [800.0, 3.0], [1700.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Homepage-3", "isController": false}, {"data": [[0.0, 1.0], [2300.0, 1.0], [600.0, 2.0], [2400.0, 1.0], [2500.0, 2.0], [2600.0, 1.0], [700.0, 1.0], [800.0, 1.0], [900.0, 2.0], [1000.0, 2.0], [1100.0, 4.0], [1400.0, 1.0], [1500.0, 2.0], [400.0, 1.0], [1700.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Homepage-2", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [700.0, 1.0], [800.0, 1.0], [400.0, 4.0], [100.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Homepage-47", "isController": false}, {"data": [[0.0, 9.0], [2200.0, 1.0], [600.0, 2.0], [2400.0, 1.0], [2700.0, 1.0], [200.0, 1.0], [800.0, 1.0], [900.0, 1.0], [300.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [100.0, 1.0], [1700.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "Homepage-1", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [800.0, 2.0], [400.0, 2.0], [200.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Homepage-48", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [600.0, 1.0], [2700.0, 1.0], [700.0, 2.0], [2800.0, 1.0], [200.0, 1.0], [800.0, 1.0], [3600.0, 1.0], [1000.0, 1.0], [1100.0, 1.0], [4400.0, 1.0], [300.0, 1.0], [4800.0, 1.0], [1200.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [400.0, 1.0], [1700.0, 1.0], [1800.0, 2.0], [500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Homepage-0", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0]], "isOverall": false, "label": "Homepage-45", "isController": false}, {"data": [[2400.0, 1.0], [4800.0, 1.0], [5400.0, 1.0], [2800.0, 2.0], [400.0, 1.0], [1600.0, 1.0], [3700.0, 1.0], [900.0, 1.0], [3800.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Get about-30", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 1.0], [800.0, 1.0], [400.0, 4.0], [100.0, 2.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Homepage-46", "isController": false}, {"data": [[0.0, 2.0], [2300.0, 1.0], [600.0, 1.0], [300.0, 2.0], [100.0, 3.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Homepage-43", "isController": false}, {"data": [[4200.0, 1.0], [2100.0, 1.0], [1100.0, 1.0], [2200.0, 1.0], [4400.0, 1.0], [600.0, 1.0], [11500.0, 1.0], [5700.0, 1.0], [3200.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Get contact Info-12", "isController": false}, {"data": [[0.0, 7.0], [1200.0, 1.0], [300.0, 1.0], [700.0, 1.0], [800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Homepage-44", "isController": false}, {"data": [[2100.0, 1.0], [4600.0, 1.0], [2400.0, 1.0], [1400.0, 1.0], [3000.0, 1.0], [3300.0, 1.0], [800.0, 1.0], [3700.0, 1.0], [1900.0, 1.0], [3900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Get contact Info-13", "isController": false}, {"data": [[2700.0, 1.0], [700.0, 3.0], [800.0, 3.0], [1600.0, 1.0], [3700.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Homepage-41", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Get contact Info-10", "isController": false}, {"data": [[0.0, 6.0], [600.0, 2.0], [300.0, 1.0], [200.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Homepage-42", "isController": false}, {"data": [[0.0, 8.0], [2200.0, 1.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Get contact Info-11", "isController": false}, {"data": [[0.0, 5.0], [700.0, 1.0], [200.0, 2.0], [100.0, 2.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Homepage-40", "isController": false}, {"data": [[2300.0, 1.0], [2500.0, 2.0], [2700.0, 1.0], [1500.0, 1.0], [1600.0, 2.0], [3200.0, 1.0], [1700.0, 1.0], [1800.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "Get Career Info-30", "isController": false}, {"data": [[4100.0, 1.0], [4800.0, 1.0], [2400.0, 1.0], [5000.0, 1.0], [1400.0, 2.0], [2800.0, 1.0], [3400.0, 1.0], [3600.0, 1.0], [3700.0, 1.0], [4000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Get contact Info-18", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "Get contact Info-19", "isController": false}, {"data": [[1100.0, 1.0], [4800.0, 1.0], [4900.0, 1.0], [2600.0, 1.0], [1300.0, 1.0], [3000.0, 1.0], [3500.0, 1.0], [7100.0, 1.0], [3600.0, 1.0], [1900.0, 1.0], [2000.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Get contact Info-16", "isController": false}, {"data": [[4100.0, 1.0], [2300.0, 1.0], [4800.0, 1.0], [4900.0, 2.0], [2500.0, 1.0], [1300.0, 1.0], [2800.0, 2.0], [5400.0, 1.0], [3100.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Get contact Info-17", "isController": false}, {"data": [[0.0, 9.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Get contact Info-14", "isController": false}, {"data": [[2400.0, 1.0], [2500.0, 1.0], [6400.0, 1.0], [800.0, 1.0], [400.0, 1.0], [3500.0, 1.0], [900.0, 2.0], [7400.0, 1.0], [7800.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get contact Info-15", "isController": false}, {"data": [[0.0, 9.0], [100.0, 2.0], [3700.0, 1.0]], "isOverall": false, "label": "Get about-43", "isController": false}, {"data": [[4200.0, 1.0], [4100.0, 1.0], [2100.0, 1.0], [2300.0, 1.0], [2500.0, 1.0], [1400.0, 1.0], [2700.0, 1.0], [5800.0, 1.0], [6700.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "Get about-42", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Get about-45", "isController": false}, {"data": [[0.0, 10.0], [200.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "Get about-44", "isController": false}, {"data": [[0.0, 9.0], [2300.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Get about-47", "isController": false}, {"data": [[0.0, 9.0], [200.0, 1.0], [100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Get about-46", "isController": false}, {"data": [[0.0, 7.0], [1300.0, 1.0], [400.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "Get about-49", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 4.0], [100.0, 1.0], [6400.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get about-48", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [100.0, 3.0], [200.0, 3.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Homepage-38", "isController": false}, {"data": [[300.0, 1.0], [1300.0, 1.0], [700.0, 2.0], [400.0, 4.0], [200.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Homepage-39", "isController": false}, {"data": [[0.0, 5.0], [300.0, 3.0], [1300.0, 1.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Homepage-36", "isController": false}, {"data": [[300.0, 2.0], [1500.0, 1.0], [800.0, 1.0], [1600.0, 1.0], [100.0, 5.0], [200.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Homepage-37", "isController": false}, {"data": [[600.0, 3.0], [300.0, 1.0], [2500.0, 1.0], [700.0, 2.0], [1500.0, 2.0], [800.0, 2.0], [1600.0, 1.0]], "isOverall": false, "label": "Homepage-34", "isController": false}, {"data": [[2100.0, 2.0], [4600.0, 1.0], [2200.0, 1.0], [2300.0, 1.0], [1400.0, 1.0], [800.0, 2.0], [100.0, 1.0], [1600.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get about-41", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Homepage-35", "isController": false}, {"data": [[2200.0, 1.0], [2300.0, 3.0], [1100.0, 1.0], [4800.0, 1.0], [600.0, 1.0], [2400.0, 2.0], [1500.0, 1.0], [800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Get about-40", "isController": false}, {"data": [[34800.0, 1.0], [34500.0, 1.0], [33600.0, 1.0], [33700.0, 1.0], [37900.0, 1.0], [37500.0, 1.0], [38500.0, 1.0], [26200.0, 1.0], [29500.0, 1.0], [28800.0, 1.0], [32300.0, 1.0], [32500.0, 1.0]], "isOverall": false, "label": "Get about-18", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0]], "isOverall": false, "label": "Get about-17", "isController": false}, {"data": [[0.0, 3.0], [4200.0, 1.0], [1100.0, 1.0], [1500.0, 1.0], [200.0, 2.0], [800.0, 1.0], [1700.0, 1.0], [3600.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "Get about-19", "isController": false}, {"data": [[0.0, 5.0], [300.0, 1.0], [700.0, 1.0], [200.0, 2.0], [400.0, 1.0], [100.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "Get about-10", "isController": false}, {"data": [[4600.0, 2.0], [4400.0, 1.0], [4500.0, 1.0], [3100.0, 1.0], [12400.0, 1.0], [800.0, 1.0], [1800.0, 1.0], [3800.0, 1.0], [1000.0, 1.0], [2000.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "Get about-12", "isController": false}, {"data": [[0.0, 6.0], [300.0, 2.0], [1300.0, 1.0], [1500.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "Get about-11", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [600.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [1500.0, 1.0], [3100.0, 1.0], [400.0, 1.0], [3600.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Get about-14", "isController": false}, {"data": [[2300.0, 1.0], [300.0, 1.0], [5000.0, 1.0], [1300.0, 1.0], [2900.0, 1.0], [400.0, 1.0], [900.0, 2.0], [1800.0, 1.0], [4000.0, 1.0], [1000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Get about-13", "isController": false}, {"data": [[300.0, 1.0], [1200.0, 1.0], [9500.0, 1.0], [5000.0, 1.0], [6100.0, 1.0], [1500.0, 1.0], [6800.0, 1.0], [3600.0, 1.0], [3700.0, 1.0], [7600.0, 2.0], [4000.0, 1.0]], "isOverall": false, "label": "Get about-16", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [3000.0, 1.0], [3100.0, 1.0], [1600.0, 1.0], [800.0, 1.0], [3400.0, 1.0], [500.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Get about-15", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "Get Career Info-16", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [4500.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2700.0, 1.0], [1400.0, 1.0], [6000.0, 1.0], [3400.0, 1.0], [1700.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "Get contact Info-34", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "Get Career Info-17", "isController": false}, {"data": [[5100.0, 1.0], [2500.0, 1.0], [5500.0, 1.0], [2800.0, 1.0], [3200.0, 1.0], [3400.0, 1.0], [3600.0, 1.0], [1800.0, 2.0], [1900.0, 1.0], [2000.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Get contact Info-35", "isController": false}, {"data": [[8400.0, 1.0], [10200.0, 2.0], [10900.0, 1.0], [11300.0, 1.0], [11700.0, 1.0], [12200.0, 1.0], [12700.0, 2.0], [14100.0, 1.0], [14000.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Homepage", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "Get Career Info-18", "isController": false}, {"data": [[1200.0, 1.0], [200.0, 2.0], [800.0, 1.0], [100.0, 2.0], [1700.0, 1.0], [900.0, 1.0], [500.0, 3.0], [1000.0, 1.0]], "isOverall": false, "label": "Get contact Info-32", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "Get Career Info-19", "isController": false}, {"data": [[600.0, 2.0], [300.0, 2.0], [400.0, 1.0], [100.0, 1.0], [900.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Get contact Info-33", "isController": false}, {"data": [[600.0, 5.0], [700.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Career Info-12", "isController": false}, {"data": [[0.0, 7.0], [300.0, 2.0], [800.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Get contact Info-30", "isController": false}, {"data": [[300.0, 5.0], [600.0, 2.0], [1200.0, 1.0], [700.0, 1.0], [400.0, 1.0], [1700.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Get Career Info-13", "isController": false}, {"data": [[0.0, 9.0], [200.0, 3.0]], "isOverall": false, "label": "Get contact Info-31", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "Get Career Info-14", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "Get Career Info-15", "isController": false}, {"data": [[4400.0, 1.0], [2500.0, 2.0], [2600.0, 2.0], [6200.0, 1.0], [3100.0, 2.0], [400.0, 1.0], [800.0, 2.0], [3600.0, 1.0]], "isOverall": false, "label": "Get about-29", "isController": false}, {"data": [[4300.0, 1.0], [2300.0, 2.0], [4900.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [200.0, 1.0], [3300.0, 2.0], [900.0, 1.0], [2000.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "Get about-28", "isController": false}, {"data": [[0.0, 10.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get Career Info-10", "isController": false}, {"data": [[0.0, 10.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Get Career Info-11", "isController": false}, {"data": [[0.0, 1.0], [2100.0, 1.0], [1100.0, 1.0], [700.0, 3.0], [1400.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [6900.0, 1.0]], "isOverall": false, "label": "Get about-21", "isController": false}, {"data": [[0.0, 1.0], [1100.0, 1.0], [2400.0, 2.0], [2500.0, 1.0], [2800.0, 1.0], [200.0, 1.0], [900.0, 3.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get about-20", "isController": false}, {"data": [[4200.0, 1.0], [8900.0, 1.0], [1400.0, 1.0], [3000.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [3800.0, 1.0], [500.0, 2.0], [2000.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get about-23", "isController": false}, {"data": [[0.0, 1.0], [1200.0, 2.0], [1600.0, 1.0], [800.0, 3.0], [200.0, 1.0], [100.0, 1.0], [900.0, 1.0], [3600.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get about-22", "isController": false}, {"data": [[4100.0, 2.0], [4300.0, 1.0], [2200.0, 1.0], [1100.0, 1.0], [2600.0, 1.0], [2900.0, 1.0], [5700.0, 1.0], [3200.0, 1.0], [6400.0, 1.0], [3500.0, 1.0], [7600.0, 1.0]], "isOverall": false, "label": "Get about-25", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [600.0, 1.0], [1200.0, 1.0], [2500.0, 1.0], [1400.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [200.0, 1.0], [1700.0, 1.0], [3600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get about-24", "isController": false}, {"data": [[1200.0, 1.0], [4900.0, 1.0], [5500.0, 1.0], [700.0, 1.0], [2700.0, 1.0], [6200.0, 1.0], [1600.0, 1.0], [1800.0, 2.0], [1900.0, 1.0], [3900.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Get about-27", "isController": false}, {"data": [[4200.0, 1.0], [1100.0, 1.0], [4400.0, 1.0], [4700.0, 1.0], [5100.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [6300.0, 1.0], [1600.0, 1.0], [3900.0, 1.0], [2000.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Get about-26", "isController": false}, {"data": [[4100.0, 1.0], [4500.0, 1.0], [10200.0, 1.0], [10400.0, 1.0], [12500.0, 1.0], [13500.0, 1.0], [6700.0, 1.0], [6800.0, 2.0], [14000.0, 1.0], [7100.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "Get contact Info", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 65000.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 3.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1232.0, "series": [{"data": [[0.0, 1232.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 461.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 656.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 3.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.70716302E12, "maxY": 6.0, "series": [{"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.70716308E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-26", "isController": false}, {"data": [[1.70716308E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-27", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-46", "isController": false}, {"data": [[1.70716308E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-24", "isController": false}, {"data": [[1.70716308E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-25", "isController": false}, {"data": [[1.70716308E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-8", "isController": false}, {"data": [[1.70716302E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-9", "isController": false}, {"data": [[1.70716308E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-6", "isController": false}, {"data": [[1.70716308E12, 6.0], [1.7071632E12, 1.0], [1.70716302E12, 5.921013412816693], [1.70716314E12, 5.268421052631579]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-4", "isController": false}, {"data": [[1.70716302E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-5", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-3", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-52", "isController": false}, {"data": [[1.70716308E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-50", "isController": false}, {"data": [[1.70716302E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-11", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-33", "isController": false}, {"data": [[1.70716302E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-12", "isController": false}, {"data": [[1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-34", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-37", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-16", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-13", "isController": false}, {"data": [[1.70716308E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-14", "isController": false}, {"data": [[1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-58", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-19", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-39", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-18", "isController": false}, {"data": [[1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-62", "isController": false}, {"data": [[1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-41", "isController": false}, {"data": [[1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-66", "isController": false}, {"data": [[1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-67", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-42", "isController": false}, {"data": [[1.70716308E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-43", "isController": false}, {"data": [[1.70716314E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-65", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7071632E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 15.0, "minX": 0.0, "maxY": 62093.0, "series": [{"data": [[5.0, 97.0], [6.0, 772.090909090909]], "isOverall": false, "label": "Homepage-10", "isController": false}, {"data": [[5.916666666666667, 715.8333333333333]], "isOverall": false, "label": "Homepage-10-Aggregated", "isController": false}, {"data": [[5.0, 36.0], [6.0, 1315.6363636363637]], "isOverall": false, "label": "Homepage-11", "isController": false}, {"data": [[5.916666666666667, 1209.0]], "isOverall": false, "label": "Homepage-11-Aggregated", "isController": false}, {"data": [[5.0, 2649.0], [6.0, 3618.4545454545455]], "isOverall": false, "label": "Get Career Info", "isController": false}, {"data": [[5.916666666666667, 3537.6666666666665]], "isOverall": false, "label": "Get Career Info-Aggregated", "isController": false}, {"data": [[5.0, 457.0], [6.0, 1078.909090909091]], "isOverall": false, "label": "Homepage-32", "isController": false}, {"data": [[5.916666666666667, 1027.0833333333333]], "isOverall": false, "label": "Homepage-32-Aggregated", "isController": false}, {"data": [[5.0, 84.0], [6.0, 940.7272727272727]], "isOverall": false, "label": "Homepage-33", "isController": false}, {"data": [[5.916666666666667, 869.3333333333333]], "isOverall": false, "label": "Homepage-33-Aggregated", "isController": false}, {"data": [[5.0, 28.0], [6.0, 656.2727272727274]], "isOverall": false, "label": "Homepage-30", "isController": false}, {"data": [[5.916666666666667, 603.9166666666666]], "isOverall": false, "label": "Homepage-30-Aggregated", "isController": false}, {"data": [[5.0, 27.0], [6.0, 595.9090909090909]], "isOverall": false, "label": "Homepage-31", "isController": false}, {"data": [[5.916666666666667, 548.5]], "isOverall": false, "label": "Homepage-31-Aggregated", "isController": false}, {"data": [[5.0, 57.0], [6.0, 84.81818181818183]], "isOverall": false, "label": "Get Career Info-9", "isController": false}, {"data": [[5.916666666666667, 82.50000000000001]], "isOverall": false, "label": "Get Career Info-9-Aggregated", "isController": false}, {"data": [[5.0, 51.0], [6.0, 72.63636363636364]], "isOverall": false, "label": "Get Career Info-8", "isController": false}, {"data": [[5.916666666666667, 70.83333333333334]], "isOverall": false, "label": "Get Career Info-8-Aggregated", "isController": false}, {"data": [[5.0, 56.0], [6.0, 76.54545454545453]], "isOverall": false, "label": "Get Career Info-7", "isController": false}, {"data": [[5.916666666666667, 74.83333333333331]], "isOverall": false, "label": "Get Career Info-7-Aggregated", "isController": false}, {"data": [[0.0, 9637.166666666666], [6.0, 308.91666666666663]], "isOverall": false, "label": "Get about-3", "isController": false}, {"data": [[3.0, 4973.041666666668]], "isOverall": false, "label": "Get about-3-Aggregated", "isController": false}, {"data": [[6.0, 242.41666666666666]], "isOverall": false, "label": "Get about-54", "isController": false}, {"data": [[6.0, 242.41666666666666]], "isOverall": false, "label": "Get about-54-Aggregated", "isController": false}, {"data": [[0.0, 4096.666666666666], [6.0, 259.3333333333333]], "isOverall": false, "label": "Get about-2", "isController": false}, {"data": [[3.0, 2178.0000000000005]], "isOverall": false, "label": "Get about-2-Aggregated", "isController": false}, {"data": [[6.0, 296.91666666666663]], "isOverall": false, "label": "Get about-53", "isController": false}, {"data": [[6.0, 296.91666666666663]], "isOverall": false, "label": "Get about-53-Aggregated", "isController": false}, {"data": [[4.0, 25.0], [2.0, 22.0], [1.0, 57.0], [5.0, 56.0], [6.0, 145.42857142857142], [3.0, 100.0]], "isOverall": false, "label": "Get contact Info-9", "isController": false}, {"data": [[4.75, 106.5]], "isOverall": false, "label": "Get contact Info-9-Aggregated", "isController": false}, {"data": [[6.0, 371.41666666666663]], "isOverall": false, "label": "Get about-5", "isController": false}, {"data": [[6.0, 371.41666666666663]], "isOverall": false, "label": "Get about-5-Aggregated", "isController": false}, {"data": [[6.0, 639.6666666666667]], "isOverall": false, "label": "Get about-56", "isController": false}, {"data": [[6.0, 639.6666666666667]], "isOverall": false, "label": "Get about-56-Aggregated", "isController": false}, {"data": [[0.0, 30078.333333333332], [6.0, 291.9166666666667]], "isOverall": false, "label": "Get about-4", "isController": false}, {"data": [[3.0, 15185.124999999998]], "isOverall": false, "label": "Get about-4-Aggregated", "isController": false}, {"data": [[6.0, 198.75000000000003]], "isOverall": false, "label": "Get about-55", "isController": false}, {"data": [[6.0, 198.75000000000003]], "isOverall": false, "label": "Get about-55-Aggregated", "isController": false}, {"data": [[6.0, 297.41666666666663]], "isOverall": false, "label": "Get about-7", "isController": false}, {"data": [[6.0, 297.41666666666663]], "isOverall": false, "label": "Get about-7-Aggregated", "isController": false}, {"data": [[6.0, 7289.333333333332]], "isOverall": false, "label": "Get about-58", "isController": false}, {"data": [[6.0, 7289.333333333332]], "isOverall": false, "label": "Get about-58-Aggregated", "isController": false}, {"data": [[4.0, 55.0], [2.0, 59.0], [1.0, 58.0], [5.0, 27.0], [6.0, 121.14285714285714], [3.0, 491.0]], "isOverall": false, "label": "Get contact Info-6", "isController": false}, {"data": [[4.75, 128.16666666666666]], "isOverall": false, "label": "Get contact Info-6-Aggregated", "isController": false}, {"data": [[6.0, 324.0833333333333]], "isOverall": false, "label": "Get about-6", "isController": false}, {"data": [[6.0, 324.0833333333333]], "isOverall": false, "label": "Get about-6-Aggregated", "isController": false}, {"data": [[6.0, 4500.0]], "isOverall": false, "label": "Get about-57", "isController": false}, {"data": [[6.0, 4500.0]], "isOverall": false, "label": "Get about-57-Aggregated", "isController": false}, {"data": [[4.0, 53.0], [2.0, 21.0], [1.0, 60.0], [5.0, 23.0], [6.0, 112.42857142857142], [3.0, 284.0]], "isOverall": false, "label": "Get contact Info-5", "isController": false}, {"data": [[4.75, 102.33333333333333]], "isOverall": false, "label": "Get contact Info-5-Aggregated", "isController": false}, {"data": [[6.0, 137.58333333333334]], "isOverall": false, "label": "Get about-9", "isController": false}, {"data": [[6.0, 137.58333333333334]], "isOverall": false, "label": "Get about-9-Aggregated", "isController": false}, {"data": [[4.0, 52.0], [2.0, 55.0], [1.0, 20.0], [5.0, 54.0], [6.0, 252.8571428571429], [3.0, 1292.0]], "isOverall": false, "label": "Get contact Info-8", "isController": false}, {"data": [[4.75, 270.25]], "isOverall": false, "label": "Get contact Info-8-Aggregated", "isController": false}, {"data": [[6.0, 174.83333333333331]], "isOverall": false, "label": "Get about-8", "isController": false}, {"data": [[6.0, 174.83333333333331]], "isOverall": false, "label": "Get about-8-Aggregated", "isController": false}, {"data": [[4.0, 53.0], [2.0, 57.0], [1.0, 51.0], [5.0, 55.0], [6.0, 254.28571428571433], [3.0, 98.0]], "isOverall": false, "label": "Get contact Info-7", "isController": false}, {"data": [[4.75, 174.50000000000006]], "isOverall": false, "label": "Get contact Info-7-Aggregated", "isController": false}, {"data": [[5.0, 22.0], [6.0, 563.1818181818181]], "isOverall": false, "label": "Homepage-29", "isController": false}, {"data": [[5.916666666666667, 518.0833333333333]], "isOverall": false, "label": "Homepage-29-Aggregated", "isController": false}, {"data": [[5.0, 58.0], [6.0, 91.45454545454545]], "isOverall": false, "label": "Get Career Info-6", "isController": false}, {"data": [[5.916666666666667, 88.66666666666667]], "isOverall": false, "label": "Get Career Info-6-Aggregated", "isController": false}, {"data": [[5.0, 59.0], [6.0, 97.27272727272728]], "isOverall": false, "label": "Get Career Info-5", "isController": false}, {"data": [[5.916666666666667, 94.08333333333334]], "isOverall": false, "label": "Get Career Info-5-Aggregated", "isController": false}, {"data": [[5.0, 22.0], [6.0, 335.8181818181818]], "isOverall": false, "label": "Homepage-27", "isController": false}, {"data": [[5.916666666666667, 309.6666666666667]], "isOverall": false, "label": "Homepage-27-Aggregated", "isController": false}, {"data": [[5.0, 54.0], [6.0, 78.72727272727273]], "isOverall": false, "label": "Get Career Info-4", "isController": false}, {"data": [[5.916666666666667, 76.66666666666667]], "isOverall": false, "label": "Get Career Info-4-Aggregated", "isController": false}, {"data": [[5.0, 25.0], [6.0, 263.6363636363636]], "isOverall": false, "label": "Homepage-28", "isController": false}, {"data": [[5.916666666666667, 243.75]], "isOverall": false, "label": "Homepage-28-Aggregated", "isController": false}, {"data": [[5.0, 65.0], [6.0, 54.63636363636364]], "isOverall": false, "label": "Get Career Info-3", "isController": false}, {"data": [[5.916666666666667, 55.5]], "isOverall": false, "label": "Get Career Info-3-Aggregated", "isController": false}, {"data": [[5.0, 29.0], [6.0, 162.7272727272727]], "isOverall": false, "label": "Homepage-25", "isController": false}, {"data": [[5.916666666666667, 151.58333333333334]], "isOverall": false, "label": "Homepage-25-Aggregated", "isController": false}, {"data": [[6.0, 263.91666666666663]], "isOverall": false, "label": "Get about-50", "isController": false}, {"data": [[6.0, 263.91666666666663]], "isOverall": false, "label": "Get about-50-Aggregated", "isController": false}, {"data": [[5.0, 57.0], [6.0, 77.90909090909092]], "isOverall": false, "label": "Get Career Info-2", "isController": false}, {"data": [[5.916666666666667, 76.16666666666667]], "isOverall": false, "label": "Get Career Info-2-Aggregated", "isController": false}, {"data": [[5.0, 24.0], [6.0, 265.09090909090907]], "isOverall": false, "label": "Homepage-26", "isController": false}, {"data": [[5.916666666666667, 245.00000000000003]], "isOverall": false, "label": "Homepage-26-Aggregated", "isController": false}, {"data": [[5.0, 25.0], [6.0, 66.36363636363636]], "isOverall": false, "label": "Get Career Info-1", "isController": false}, {"data": [[5.916666666666667, 62.916666666666664]], "isOverall": false, "label": "Get Career Info-1-Aggregated", "isController": false}, {"data": [[5.0, 28.0], [6.0, 605.2727272727273]], "isOverall": false, "label": "Homepage-23", "isController": false}, {"data": [[5.916666666666667, 557.1666666666667]], "isOverall": false, "label": "Homepage-23-Aggregated", "isController": false}, {"data": [[0.0, 9869.0], [6.0, 229.25]], "isOverall": false, "label": "Get about-1", "isController": false}, {"data": [[3.0, 5049.125]], "isOverall": false, "label": "Get about-1-Aggregated", "isController": false}, {"data": [[6.0, 99.25]], "isOverall": false, "label": "Get about-52", "isController": false}, {"data": [[6.0, 99.25]], "isOverall": false, "label": "Get about-52-Aggregated", "isController": false}, {"data": [[5.0, 777.0], [6.0, 1016.2727272727273]], "isOverall": false, "label": "Get Career Info-0", "isController": false}, {"data": [[5.916666666666667, 996.3333333333333]], "isOverall": false, "label": "Get Career Info-0-Aggregated", "isController": false}, {"data": [[5.0, 22.0], [6.0, 505.99999999999994]], "isOverall": false, "label": "Homepage-24", "isController": false}, {"data": [[5.916666666666667, 465.66666666666663]], "isOverall": false, "label": "Homepage-24-Aggregated", "isController": false}, {"data": [[0.0, 3294.6666666666665], [6.0, 2135.0833333333335]], "isOverall": false, "label": "Get about-0", "isController": false}, {"data": [[3.0, 2714.8749999999995]], "isOverall": false, "label": "Get about-0-Aggregated", "isController": false}, {"data": [[6.0, 146.58333333333334]], "isOverall": false, "label": "Get about-51", "isController": false}, {"data": [[6.0, 146.58333333333334]], "isOverall": false, "label": "Get about-51-Aggregated", "isController": false}, {"data": [[5.0, 23.0], [6.0, 318.1818181818182]], "isOverall": false, "label": "Homepage-21", "isController": false}, {"data": [[5.916666666666667, 293.5833333333333]], "isOverall": false, "label": "Homepage-21-Aggregated", "isController": false}, {"data": [[5.0, 24.0], [6.0, 519.2727272727274]], "isOverall": false, "label": "Homepage-22", "isController": false}, {"data": [[5.916666666666667, 478.00000000000006]], "isOverall": false, "label": "Homepage-22-Aggregated", "isController": false}, {"data": [[5.0, 24.0], [6.0, 304.6363636363636]], "isOverall": false, "label": "Homepage-20", "isController": false}, {"data": [[5.916666666666667, 281.25]], "isOverall": false, "label": "Homepage-20-Aggregated", "isController": false}, {"data": [[6.0, 36397.083333333336]], "isOverall": false, "label": "Get about", "isController": false}, {"data": [[6.0, 36397.083333333336]], "isOverall": false, "label": "Get about-Aggregated", "isController": false}, {"data": [[4.0, 55.0], [2.0, 69.0], [1.0, 53.0], [5.0, 22.0], [6.0, 99.14285714285715], [3.0, 96.0]], "isOverall": false, "label": "Get contact Info-2", "isController": false}, {"data": [[4.75, 82.41666666666669]], "isOverall": false, "label": "Get contact Info-2-Aggregated", "isController": false}, {"data": [[0.0, 2173.2777777777774], [4.0, 20.0], [2.0, 60.0], [1.0, 26.0], [5.0, 22.0], [6.0, 93.28571428571429], [3.0, 279.0]], "isOverall": false, "label": "Get contact Info-1", "isController": false}, {"data": [[1.1874999999999996, 1652.0416666666667]], "isOverall": false, "label": "Get contact Info-1-Aggregated", "isController": false}, {"data": [[4.0, 22.0], [2.0, 56.0], [1.0, 58.0], [5.0, 22.0], [6.0, 147.85714285714283], [3.0, 267.0]], "isOverall": false, "label": "Get contact Info-4", "isController": false}, {"data": [[4.75, 121.66666666666664]], "isOverall": false, "label": "Get contact Info-4-Aggregated", "isController": false}, {"data": [[4.0, 59.0], [2.0, 65.0], [1.0, 65.0], [5.0, 28.0], [6.0, 141.42857142857144], [3.0, 95.0]], "isOverall": false, "label": "Get contact Info-3", "isController": false}, {"data": [[4.75, 108.50000000000001]], "isOverall": false, "label": "Get contact Info-3-Aggregated", "isController": false}, {"data": [[0.0, 1184.6944444444448], [4.0, 1178.0], [2.0, 983.0], [1.0, 790.0], [5.0, 969.0], [6.0, 1963.5714285714284], [3.0, 1055.0]], "isOverall": false, "label": "Get contact Info-0", "isController": false}, {"data": [[1.1874999999999996, 1278.5208333333337]], "isOverall": false, "label": "Get contact Info-0-Aggregated", "isController": false}, {"data": [[5.0, 83.0], [6.0, 228.27272727272728]], "isOverall": false, "label": "Homepage-18", "isController": false}, {"data": [[5.916666666666667, 216.16666666666669]], "isOverall": false, "label": "Homepage-18-Aggregated", "isController": false}, {"data": [[5.0, 23.0], [6.0, 183.1818181818182]], "isOverall": false, "label": "Homepage-19", "isController": false}, {"data": [[5.916666666666667, 169.83333333333337]], "isOverall": false, "label": "Homepage-19-Aggregated", "isController": false}, {"data": [[5.0, 26.0], [6.0, 380.09090909090907]], "isOverall": false, "label": "Homepage-16", "isController": false}, {"data": [[5.916666666666667, 350.58333333333337]], "isOverall": false, "label": "Homepage-16-Aggregated", "isController": false}, {"data": [[5.0, 78.0], [6.0, 329.8181818181818]], "isOverall": false, "label": "Homepage-17", "isController": false}, {"data": [[5.916666666666667, 308.8333333333333]], "isOverall": false, "label": "Homepage-17-Aggregated", "isController": false}, {"data": [[5.0, 41.0], [6.0, 433.9090909090909]], "isOverall": false, "label": "Homepage-14", "isController": false}, {"data": [[5.916666666666667, 401.16666666666674]], "isOverall": false, "label": "Homepage-14-Aggregated", "isController": false}, {"data": [[5.0, 37.0], [6.0, 1202.2727272727273]], "isOverall": false, "label": "Homepage-15", "isController": false}, {"data": [[5.916666666666667, 1105.1666666666667]], "isOverall": false, "label": "Homepage-15-Aggregated", "isController": false}, {"data": [[5.0, 1197.0], [6.0, 2947.0909090909095]], "isOverall": false, "label": "Homepage-12", "isController": false}, {"data": [[5.916666666666667, 2801.2499999999995]], "isOverall": false, "label": "Homepage-12-Aggregated", "isController": false}, {"data": [[5.0, 1150.0], [6.0, 2888.0]], "isOverall": false, "label": "Homepage-13", "isController": false}, {"data": [[5.916666666666667, 2743.1666666666665]], "isOverall": false, "label": "Homepage-13-Aggregated", "isController": false}, {"data": [[5.0, 15.0], [6.0, 37.72727272727273]], "isOverall": false, "label": "Get Career Info-27", "isController": false}, {"data": [[5.916666666666667, 35.833333333333336]], "isOverall": false, "label": "Get Career Info-27-Aggregated", "isController": false}, {"data": [[4.0, 106.0], [2.0, 20.0], [1.0, 48.0], [5.0, 70.0], [6.0, 99.42857142857143], [3.0, 83.0]], "isOverall": false, "label": "Get contact Info-23", "isController": false}, {"data": [[4.75, 85.25]], "isOverall": false, "label": "Get contact Info-23-Aggregated", "isController": false}, {"data": [[5.0, 364.0], [6.0, 505.81818181818187]], "isOverall": false, "label": "Get Career Info-28", "isController": false}, {"data": [[5.916666666666667, 494.00000000000006]], "isOverall": false, "label": "Get Career Info-28-Aggregated", "isController": false}, {"data": [[4.0, 92.0], [2.0, 40.0], [1.0, 40.0], [5.0, 264.0], [6.0, 76.71428571428571], [3.0, 85.0]], "isOverall": false, "label": "Get contact Info-24", "isController": false}, {"data": [[4.75, 88.16666666666669]], "isOverall": false, "label": "Get contact Info-24-Aggregated", "isController": false}, {"data": [[5.0, 1633.0], [6.0, 1899.090909090909]], "isOverall": false, "label": "Get Career Info-29", "isController": false}, {"data": [[5.916666666666667, 1876.9166666666665]], "isOverall": false, "label": "Get Career Info-29-Aggregated", "isController": false}, {"data": [[4.0, 90.0], [2.0, 16.0], [1.0, 35.0], [5.0, 51.0], [6.0, 105.0], [3.0, 214.0]], "isOverall": false, "label": "Get contact Info-21", "isController": false}, {"data": [[4.75, 95.08333333333333]], "isOverall": false, "label": "Get contact Info-21-Aggregated", "isController": false}, {"data": [[4.0, 100.0], [2.0, 21.0], [1.0, 31.0], [5.0, 60.0], [6.0, 76.71428571428571], [3.0, 71.0]], "isOverall": false, "label": "Get contact Info-22", "isController": false}, {"data": [[4.75, 68.33333333333333]], "isOverall": false, "label": "Get contact Info-22-Aggregated", "isController": false}, {"data": [[5.0, 3246.0], [6.0, 2978.9999999999995]], "isOverall": false, "label": "Homepage-50", "isController": false}, {"data": [[5.916666666666667, 3001.2500000000005]], "isOverall": false, "label": "Homepage-50-Aggregated", "isController": false}, {"data": [[5.0, 27.0], [6.0, 29.181818181818183]], "isOverall": false, "label": "Get Career Info-23", "isController": false}, {"data": [[5.916666666666667, 29.0]], "isOverall": false, "label": "Get Career Info-23-Aggregated", "isController": false}, {"data": [[5.0, 3481.0], [6.0, 3218.363636363636]], "isOverall": false, "label": "Homepage-51", "isController": false}, {"data": [[5.916666666666667, 3240.25]], "isOverall": false, "label": "Homepage-51-Aggregated", "isController": false}, {"data": [[5.0, 23.0], [6.0, 32.36363636363637]], "isOverall": false, "label": "Get Career Info-24", "isController": false}, {"data": [[5.916666666666667, 31.583333333333336]], "isOverall": false, "label": "Get Career Info-24-Aggregated", "isController": false}, {"data": [[4.0, 88.0], [2.0, 52.0], [1.0, 31.0], [5.0, 80.0], [6.0, 129.71428571428572], [3.0, 83.0]], "isOverall": false, "label": "Get contact Info-20", "isController": false}, {"data": [[4.75, 103.5]], "isOverall": false, "label": "Get contact Info-20-Aggregated", "isController": false}, {"data": [[5.0, 35.0], [6.0, 64.63636363636364]], "isOverall": false, "label": "Get Career Info-25", "isController": false}, {"data": [[5.916666666666667, 62.16666666666667]], "isOverall": false, "label": "Get Career Info-25-Aggregated", "isController": false}, {"data": [[5.0, 16.0], [6.0, 102.63636363636363]], "isOverall": false, "label": "Get Career Info-26", "isController": false}, {"data": [[5.916666666666667, 95.41666666666666]], "isOverall": false, "label": "Get Career Info-26-Aggregated", "isController": false}, {"data": [[6.0, 1064.6666666666667]], "isOverall": false, "label": "Get about-39", "isController": false}, {"data": [[6.0, 1064.6666666666667]], "isOverall": false, "label": "Get about-39-Aggregated", "isController": false}, {"data": [[5.0, 306.0], [6.0, 341.45454545454544]], "isOverall": false, "label": "Get Career Info-20", "isController": false}, {"data": [[5.916666666666667, 338.5]], "isOverall": false, "label": "Get Career Info-20-Aggregated", "isController": false}, {"data": [[5.0, 21.0], [6.0, 30.000000000000004]], "isOverall": false, "label": "Get Career Info-21", "isController": false}, {"data": [[5.916666666666667, 29.250000000000004]], "isOverall": false, "label": "Get Career Info-21-Aggregated", "isController": false}, {"data": [[4.0, 98.0], [2.0, 21.0], [1.0, 22.0], [5.0, 68.0], [6.0, 69.57142857142857], [3.0, 89.0]], "isOverall": false, "label": "Get contact Info-29", "isController": false}, {"data": [[4.75, 65.41666666666666]], "isOverall": false, "label": "Get contact Info-29-Aggregated", "isController": false}, {"data": [[5.0, 22.0], [6.0, 33.727272727272734]], "isOverall": false, "label": "Get Career Info-22", "isController": false}, {"data": [[5.916666666666667, 32.75000000000001]], "isOverall": false, "label": "Get Career Info-22-Aggregated", "isController": false}, {"data": [[4.0, 81.0], [2.0, 21.0], [1.0, 22.0], [5.0, 97.0], [6.0, 62.42857142857142], [3.0, 86.0]], "isOverall": false, "label": "Get contact Info-27", "isController": false}, {"data": [[4.75, 61.99999999999999]], "isOverall": false, "label": "Get contact Info-27-Aggregated", "isController": false}, {"data": [[4.0, 84.0], [2.0, 20.0], [1.0, 24.0], [5.0, 296.0], [6.0, 67.57142857142857], [3.0, 89.0]], "isOverall": false, "label": "Get contact Info-28", "isController": false}, {"data": [[4.75, 82.16666666666666]], "isOverall": false, "label": "Get contact Info-28-Aggregated", "isController": false}, {"data": [[4.0, 603.0], [2.0, 578.0], [1.0, 306.0], [5.0, 152.0], [6.0, 759.5714285714286], [3.0, 1588.0]], "isOverall": false, "label": "Get contact Info-25", "isController": false}, {"data": [[4.75, 712.0]], "isOverall": false, "label": "Get contact Info-25-Aggregated", "isController": false}, {"data": [[4.0, 71.0], [2.0, 20.0], [1.0, 24.0], [5.0, 96.0], [6.0, 77.14285714285715], [3.0, 97.0]], "isOverall": false, "label": "Get contact Info-26", "isController": false}, {"data": [[4.75, 70.66666666666667]], "isOverall": false, "label": "Get contact Info-26-Aggregated", "isController": false}, {"data": [[6.0, 1414.25]], "isOverall": false, "label": "Get about-32", "isController": false}, {"data": [[6.0, 1414.25]], "isOverall": false, "label": "Get about-32-Aggregated", "isController": false}, {"data": [[6.0, 2961.0]], "isOverall": false, "label": "Get about-31", "isController": false}, {"data": [[6.0, 2961.0]], "isOverall": false, "label": "Get about-31-Aggregated", "isController": false}, {"data": [[6.0, 3094.8333333333335]], "isOverall": false, "label": "Get about-34", "isController": false}, {"data": [[6.0, 3094.8333333333335]], "isOverall": false, "label": "Get about-34-Aggregated", "isController": false}, {"data": [[6.0, 3412.1666666666665]], "isOverall": false, "label": "Get about-33", "isController": false}, {"data": [[6.0, 3412.1666666666665]], "isOverall": false, "label": "Get about-33-Aggregated", "isController": false}, {"data": [[6.0, 10273.833333333336]], "isOverall": false, "label": "Get about-36", "isController": false}, {"data": [[6.0, 10273.833333333336]], "isOverall": false, "label": "Get about-36-Aggregated", "isController": false}, {"data": [[5.0, 2330.0], [6.0, 2533.2727272727275]], "isOverall": false, "label": "Homepage-9", "isController": false}, {"data": [[5.916666666666667, 2516.333333333333]], "isOverall": false, "label": "Homepage-9-Aggregated", "isController": false}, {"data": [[6.0, 8424.583333333334]], "isOverall": false, "label": "Get about-35", "isController": false}, {"data": [[6.0, 8424.583333333334]], "isOverall": false, "label": "Get about-35-Aggregated", "isController": false}, {"data": [[4.0, 62093.0], [2.0, 57446.0], [1.0, 47468.0], [5.0, 59583.0], [6.0, 61573.42857142857], [3.0, 59973.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[4.75, 59798.083333333336]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[5.0, 48.0], [6.0, 502.90909090909093]], "isOverall": false, "label": "Homepage-8", "isController": false}, {"data": [[5.916666666666667, 465.0]], "isOverall": false, "label": "Homepage-8-Aggregated", "isController": false}, {"data": [[6.0, 1711.0833333333333]], "isOverall": false, "label": "Get about-38", "isController": false}, {"data": [[6.0, 1711.0833333333333]], "isOverall": false, "label": "Get about-38-Aggregated", "isController": false}, {"data": [[5.0, 24.0], [6.0, 768.8181818181818]], "isOverall": false, "label": "Homepage-7", "isController": false}, {"data": [[5.916666666666667, 706.75]], "isOverall": false, "label": "Homepage-7-Aggregated", "isController": false}, {"data": [[6.0, 3402.5]], "isOverall": false, "label": "Get about-37", "isController": false}, {"data": [[6.0, 3402.5]], "isOverall": false, "label": "Get about-37-Aggregated", "isController": false}, {"data": [[5.0, 96.0], [6.0, 565.4545454545454]], "isOverall": false, "label": "Homepage-6", "isController": false}, {"data": [[5.916666666666667, 526.3333333333333]], "isOverall": false, "label": "Homepage-6-Aggregated", "isController": false}, {"data": [[5.0, 95.0], [6.0, 698.9090909090909]], "isOverall": false, "label": "Homepage-5", "isController": false}, {"data": [[5.916666666666667, 648.5833333333334]], "isOverall": false, "label": "Homepage-5-Aggregated", "isController": false}, {"data": [[5.0, 115.0], [6.0, 1768.6363636363635]], "isOverall": false, "label": "Homepage-4", "isController": false}, {"data": [[5.916666666666667, 1630.8333333333335]], "isOverall": false, "label": "Homepage-4-Aggregated", "isController": false}, {"data": [[5.0, 577.0], [6.0, 919.1818181818182]], "isOverall": false, "label": "Homepage-49", "isController": false}, {"data": [[5.916666666666667, 890.6666666666666]], "isOverall": false, "label": "Homepage-49-Aggregated", "isController": false}, {"data": [[5.0, 110.0], [6.0, 999.4545454545454]], "isOverall": false, "label": "Homepage-3", "isController": false}, {"data": [[5.916666666666667, 925.3333333333334]], "isOverall": false, "label": "Homepage-3-Aggregated", "isController": false}, {"data": [[0.0, 1260.8333333333335], [5.0, 41.0], [6.0, 1586.4545454545455]], "isOverall": false, "label": "Homepage-2", "isController": false}, {"data": [[2.9583333333333335, 1359.25]], "isOverall": false, "label": "Homepage-2-Aggregated", "isController": false}, {"data": [[5.0, 889.0], [6.0, 597.0909090909091]], "isOverall": false, "label": "Homepage-47", "isController": false}, {"data": [[5.916666666666667, 621.4166666666667]], "isOverall": false, "label": "Homepage-47-Aggregated", "isController": false}, {"data": [[0.0, 1570.5833333333335], [5.0, 92.0], [6.0, 113.36363636363637]], "isOverall": false, "label": "Homepage-1", "isController": false}, {"data": [[2.9583333333333335, 841.0833333333334]], "isOverall": false, "label": "Homepage-1-Aggregated", "isController": false}, {"data": [[5.0, 635.0], [6.0, 622.0]], "isOverall": false, "label": "Homepage-48", "isController": false}, {"data": [[5.916666666666667, 623.0833333333334]], "isOverall": false, "label": "Homepage-48-Aggregated", "isController": false}, {"data": [[0.0, 877.25], [5.0, 1858.0], [6.0, 2654.1818181818185]], "isOverall": false, "label": "Homepage-0", "isController": false}, {"data": [[2.9583333333333335, 1732.5416666666665]], "isOverall": false, "label": "Homepage-0-Aggregated", "isController": false}, {"data": [[5.0, 40.0], [6.0, 86.27272727272727]], "isOverall": false, "label": "Homepage-45", "isController": false}, {"data": [[5.916666666666667, 82.41666666666667]], "isOverall": false, "label": "Homepage-45-Aggregated", "isController": false}, {"data": [[6.0, 2746.5833333333335]], "isOverall": false, "label": "Get about-30", "isController": false}, {"data": [[6.0, 2746.5833333333335]], "isOverall": false, "label": "Get about-30-Aggregated", "isController": false}, {"data": [[5.0, 790.0], [6.0, 463.3636363636364]], "isOverall": false, "label": "Homepage-46", "isController": false}, {"data": [[5.916666666666667, 490.58333333333337]], "isOverall": false, "label": "Homepage-46-Aggregated", "isController": false}, {"data": [[5.0, 110.0], [6.0, 480.2727272727272]], "isOverall": false, "label": "Homepage-43", "isController": false}, {"data": [[5.916666666666667, 449.41666666666674]], "isOverall": false, "label": "Homepage-43-Aggregated", "isController": false}, {"data": [[4.0, 1723.0], [2.0, 959.0], [1.0, 625.0], [5.0, 4498.0], [6.0, 4326.857142857143], [3.0, 1864.0]], "isOverall": false, "label": "Get contact Info-12", "isController": false}, {"data": [[4.75, 3329.7500000000005]], "isOverall": false, "label": "Get contact Info-12-Aggregated", "isController": false}, {"data": [[5.0, 49.0], [6.0, 426.2727272727273]], "isOverall": false, "label": "Homepage-44", "isController": false}, {"data": [[5.916666666666667, 394.8333333333333]], "isOverall": false, "label": "Homepage-44-Aggregated", "isController": false}, {"data": [[4.0, 3073.0], [2.0, 1033.0], [1.0, 853.0], [5.0, 3728.0], [6.0, 2724.5714285714284], [3.0, 1998.0]], "isOverall": false, "label": "Get contact Info-13", "isController": false}, {"data": [[4.75, 2479.75]], "isOverall": false, "label": "Get contact Info-13-Aggregated", "isController": false}, {"data": [[5.0, 835.0], [6.0, 1458.3636363636365]], "isOverall": false, "label": "Homepage-41", "isController": false}, {"data": [[5.916666666666667, 1406.4166666666667]], "isOverall": false, "label": "Homepage-41-Aggregated", "isController": false}, {"data": [[4.0, 51.0], [2.0, 18.0], [1.0, 24.0], [5.0, 20.0], [6.0, 113.71428571428572], [3.0, 166.0]], "isOverall": false, "label": "Get contact Info-10", "isController": false}, {"data": [[4.75, 89.58333333333333]], "isOverall": false, "label": "Get contact Info-10-Aggregated", "isController": false}, {"data": [[5.0, 83.0], [6.0, 281.72727272727275]], "isOverall": false, "label": "Homepage-42", "isController": false}, {"data": [[5.916666666666667, 265.1666666666667]], "isOverall": false, "label": "Homepage-42-Aggregated", "isController": false}, {"data": [[4.0, 53.0], [2.0, 50.0], [1.0, 25.0], [5.0, 59.0], [6.0, 421.7142857142857], [3.0, 193.0]], "isOverall": false, "label": "Get contact Info-11", "isController": false}, {"data": [[4.75, 277.66666666666663]], "isOverall": false, "label": "Get contact Info-11-Aggregated", "isController": false}, {"data": [[5.0, 235.0], [6.0, 306.81818181818176]], "isOverall": false, "label": "Homepage-40", "isController": false}, {"data": [[5.916666666666667, 300.8333333333333]], "isOverall": false, "label": "Homepage-40-Aggregated", "isController": false}, {"data": [[5.0, 1674.0], [6.0, 2190.1818181818185]], "isOverall": false, "label": "Get Career Info-30", "isController": false}, {"data": [[5.916666666666667, 2147.166666666667]], "isOverall": false, "label": "Get Career Info-30-Aggregated", "isController": false}, {"data": [[4.0, 4828.0], [2.0, 2037.0], [1.0, 1451.0], [5.0, 5074.0], [6.0, 3342.142857142857], [3.0, 2448.0]], "isOverall": false, "label": "Get contact Info-18", "isController": false}, {"data": [[4.75, 3269.4166666666665]], "isOverall": false, "label": "Get contact Info-18-Aggregated", "isController": false}, {"data": [[4.0, 68.0], [2.0, 35.0], [1.0, 21.0], [5.0, 299.0], [6.0, 123.85714285714286], [3.0, 94.0]], "isOverall": false, "label": "Get contact Info-19", "isController": false}, {"data": [[4.75, 115.33333333333334]], "isOverall": false, "label": "Get contact Info-19-Aggregated", "isController": false}, {"data": [[4.0, 3040.0], [2.0, 1961.0], [1.0, 1185.0], [5.0, 1392.0], [6.0, 4126.714285714285], [3.0, 4029.0]], "isOverall": false, "label": "Get contact Info-16", "isController": false}, {"data": [[4.75, 3374.5]], "isOverall": false, "label": "Get contact Info-16-Aggregated", "isController": false}, {"data": [[4.0, 4967.0], [2.0, 1853.0], [1.0, 1338.0], [5.0, 4807.0], [6.0, 3583.571428571429], [3.0, 3136.0]], "isOverall": false, "label": "Get contact Info-17", "isController": false}, {"data": [[4.75, 3432.166666666667]], "isOverall": false, "label": "Get contact Info-17-Aggregated", "isController": false}, {"data": [[4.0, 22.0], [2.0, 24.0], [1.0, 20.0], [5.0, 21.0], [6.0, 106.71428571428571], [3.0, 174.0]], "isOverall": false, "label": "Get contact Info-14", "isController": false}, {"data": [[4.75, 84.0]], "isOverall": false, "label": "Get contact Info-14-Aggregated", "isController": false}, {"data": [[4.0, 2411.0], [2.0, 454.0], [1.0, 901.0], [5.0, 847.0], [6.0, 3836.5714285714284], [3.0, 3592.0]], "isOverall": false, "label": "Get contact Info-15", "isController": false}, {"data": [[4.75, 2921.75]], "isOverall": false, "label": "Get contact Info-15-Aggregated", "isController": false}, {"data": [[6.0, 403.3333333333333]], "isOverall": false, "label": "Get about-43", "isController": false}, {"data": [[6.0, 403.3333333333333]], "isOverall": false, "label": "Get about-43-Aggregated", "isController": false}, {"data": [[6.0, 4011.4999999999995]], "isOverall": false, "label": "Get about-42", "isController": false}, {"data": [[6.0, 4011.4999999999995]], "isOverall": false, "label": "Get about-42-Aggregated", "isController": false}, {"data": [[6.0, 129.66666666666666]], "isOverall": false, "label": "Get about-45", "isController": false}, {"data": [[6.0, 129.66666666666666]], "isOverall": false, "label": "Get about-45-Aggregated", "isController": false}, {"data": [[6.0, 244.24999999999997]], "isOverall": false, "label": "Get about-44", "isController": false}, {"data": [[6.0, 244.24999999999997]], "isOverall": false, "label": "Get about-44-Aggregated", "isController": false}, {"data": [[6.0, 291.1666666666667]], "isOverall": false, "label": "Get about-47", "isController": false}, {"data": [[6.0, 291.1666666666667]], "isOverall": false, "label": "Get about-47-Aggregated", "isController": false}, {"data": [[6.0, 177.00000000000003]], "isOverall": false, "label": "Get about-46", "isController": false}, {"data": [[6.0, 177.00000000000003]], "isOverall": false, "label": "Get about-46-Aggregated", "isController": false}, {"data": [[6.0, 261.41666666666663]], "isOverall": false, "label": "Get about-49", "isController": false}, {"data": [[6.0, 261.41666666666663]], "isOverall": false, "label": "Get about-49-Aggregated", "isController": false}, {"data": [[6.0, 1385.5]], "isOverall": false, "label": "Get about-48", "isController": false}, {"data": [[6.0, 1385.5]], "isOverall": false, "label": "Get about-48-Aggregated", "isController": false}, {"data": [[5.0, 101.0], [6.0, 322.72727272727275]], "isOverall": false, "label": "Homepage-38", "isController": false}, {"data": [[5.916666666666667, 304.24999999999994]], "isOverall": false, "label": "Homepage-38-Aggregated", "isController": false}, {"data": [[5.0, 743.0], [6.0, 603.2727272727273]], "isOverall": false, "label": "Homepage-39", "isController": false}, {"data": [[5.916666666666667, 614.9166666666667]], "isOverall": false, "label": "Homepage-39-Aggregated", "isController": false}, {"data": [[5.0, 95.0], [6.0, 299.09090909090907]], "isOverall": false, "label": "Homepage-36", "isController": false}, {"data": [[5.916666666666667, 282.0833333333333]], "isOverall": false, "label": "Homepage-36-Aggregated", "isController": false}, {"data": [[5.0, 810.0], [6.0, 524.7272727272727]], "isOverall": false, "label": "Homepage-37", "isController": false}, {"data": [[5.916666666666667, 548.5]], "isOverall": false, "label": "Homepage-37-Aggregated", "isController": false}, {"data": [[5.0, 1593.0], [6.0, 1031.9090909090908]], "isOverall": false, "label": "Homepage-34", "isController": false}, {"data": [[5.916666666666667, 1078.6666666666665]], "isOverall": false, "label": "Homepage-34-Aggregated", "isController": false}, {"data": [[6.0, 1707.4166666666667]], "isOverall": false, "label": "Get about-41", "isController": false}, {"data": [[6.0, 1707.4166666666667]], "isOverall": false, "label": "Get about-41-Aggregated", "isController": false}, {"data": [[5.0, 50.0], [6.0, 151.00000000000003]], "isOverall": false, "label": "Homepage-35", "isController": false}, {"data": [[5.916666666666667, 142.58333333333331]], "isOverall": false, "label": "Homepage-35-Aggregated", "isController": false}, {"data": [[6.0, 2087.333333333333]], "isOverall": false, "label": "Get about-40", "isController": false}, {"data": [[6.0, 2087.333333333333]], "isOverall": false, "label": "Get about-40-Aggregated", "isController": false}, {"data": [[6.0, 33375.083333333336]], "isOverall": false, "label": "Get about-18", "isController": false}, {"data": [[6.0, 33375.083333333336]], "isOverall": false, "label": "Get about-18-Aggregated", "isController": false}, {"data": [[6.0, 84.91666666666666]], "isOverall": false, "label": "Get about-17", "isController": false}, {"data": [[6.0, 84.91666666666666]], "isOverall": false, "label": "Get about-17-Aggregated", "isController": false}, {"data": [[6.0, 1489.2500000000002]], "isOverall": false, "label": "Get about-19", "isController": false}, {"data": [[6.0, 1489.2500000000002]], "isOverall": false, "label": "Get about-19-Aggregated", "isController": false}, {"data": [[6.0, 351.4166666666667]], "isOverall": false, "label": "Get about-10", "isController": false}, {"data": [[6.0, 351.4166666666667]], "isOverall": false, "label": "Get about-10-Aggregated", "isController": false}, {"data": [[6.0, 4302.416666666667]], "isOverall": false, "label": "Get about-12", "isController": false}, {"data": [[6.0, 4302.416666666667]], "isOverall": false, "label": "Get about-12-Aggregated", "isController": false}, {"data": [[6.0, 370.6666666666667]], "isOverall": false, "label": "Get about-11", "isController": false}, {"data": [[6.0, 370.6666666666667]], "isOverall": false, "label": "Get about-11-Aggregated", "isController": false}, {"data": [[6.0, 1827.6666666666665]], "isOverall": false, "label": "Get about-14", "isController": false}, {"data": [[6.0, 1827.6666666666665]], "isOverall": false, "label": "Get about-14-Aggregated", "isController": false}, {"data": [[6.0, 1939.75]], "isOverall": false, "label": "Get about-13", "isController": false}, {"data": [[6.0, 1939.75]], "isOverall": false, "label": "Get about-13-Aggregated", "isController": false}, {"data": [[6.0, 4805.916666666667]], "isOverall": false, "label": "Get about-16", "isController": false}, {"data": [[6.0, 4805.916666666667]], "isOverall": false, "label": "Get about-16-Aggregated", "isController": false}, {"data": [[6.0, 1701.0]], "isOverall": false, "label": "Get about-15", "isController": false}, {"data": [[6.0, 1701.0]], "isOverall": false, "label": "Get about-15-Aggregated", "isController": false}, {"data": [[5.0, 19.0], [6.0, 34.54545454545455]], "isOverall": false, "label": "Get Career Info-16", "isController": false}, {"data": [[5.916666666666667, 33.25]], "isOverall": false, "label": "Get Career Info-16-Aggregated", "isController": false}, {"data": [[4.0, 2481.0], [2.0, 1413.0], [1.0, 1755.0], [5.0, 2088.0], [6.0, 3406.285714285714], [3.0, 1763.0]], "isOverall": false, "label": "Get contact Info-34", "isController": false}, {"data": [[4.75, 2778.6666666666665]], "isOverall": false, "label": "Get contact Info-34-Aggregated", "isController": false}, {"data": [[5.0, 21.0], [6.0, 35.63636363636363]], "isOverall": false, "label": "Get Career Info-17", "isController": false}, {"data": [[5.916666666666667, 34.416666666666664]], "isOverall": false, "label": "Get Career Info-17-Aggregated", "isController": false}, {"data": [[4.0, 2522.0], [2.0, 1865.0], [1.0, 1991.0], [5.0, 3232.0], [6.0, 3816.0], [3.0, 1892.0]], "isOverall": false, "label": "Get contact Info-35", "isController": false}, {"data": [[4.75, 3184.5]], "isOverall": false, "label": "Get contact Info-35-Aggregated", "isController": false}, {"data": [[5.0, 8012.0], [6.0, 11741.000000000002]], "isOverall": false, "label": "Homepage", "isController": false}, {"data": [[5.916666666666667, 11430.25]], "isOverall": false, "label": "Homepage-Aggregated", "isController": false}, {"data": [[5.0, 22.0], [6.0, 37.72727272727273]], "isOverall": false, "label": "Get Career Info-18", "isController": false}, {"data": [[5.916666666666667, 36.416666666666664]], "isOverall": false, "label": "Get Career Info-18-Aggregated", "isController": false}, {"data": [[4.0, 891.0], [2.0, 137.0], [1.0, 127.0], [5.0, 202.0], [6.0, 811.8571428571429], [3.0, 1245.0]], "isOverall": false, "label": "Get contact Info-32", "isController": false}, {"data": [[4.75, 690.4166666666666]], "isOverall": false, "label": "Get contact Info-32-Aggregated", "isController": false}, {"data": [[5.0, 23.0], [6.0, 34.63636363636363]], "isOverall": false, "label": "Get Career Info-19", "isController": false}, {"data": [[5.916666666666667, 33.666666666666664]], "isOverall": false, "label": "Get Career Info-19-Aggregated", "isController": false}, {"data": [[4.0, 946.0], [2.0, 382.0], [1.0, 367.0], [5.0, 646.0], [6.0, 539.4285714285714], [3.0, 178.0]], "isOverall": false, "label": "Get contact Info-33", "isController": false}, {"data": [[4.75, 524.5833333333333]], "isOverall": false, "label": "Get contact Info-33-Aggregated", "isController": false}, {"data": [[5.0, 616.0], [6.0, 925.7272727272729]], "isOverall": false, "label": "Get Career Info-12", "isController": false}, {"data": [[5.916666666666667, 899.9166666666667]], "isOverall": false, "label": "Get Career Info-12-Aggregated", "isController": false}, {"data": [[4.0, 81.0], [2.0, 16.0], [1.0, 50.0], [5.0, 192.0], [6.0, 266.4285714285714], [3.0, 67.0]], "isOverall": false, "label": "Get contact Info-30", "isController": false}, {"data": [[4.75, 189.24999999999997]], "isOverall": false, "label": "Get contact Info-30-Aggregated", "isController": false}, {"data": [[5.0, 654.0], [6.0, 759.8181818181818]], "isOverall": false, "label": "Get Career Info-13", "isController": false}, {"data": [[5.916666666666667, 751.0]], "isOverall": false, "label": "Get Career Info-13-Aggregated", "isController": false}, {"data": [[4.0, 86.0], [2.0, 36.0], [1.0, 40.0], [5.0, 254.0], [6.0, 112.57142857142857], [3.0, 72.0]], "isOverall": false, "label": "Get contact Info-31", "isController": false}, {"data": [[4.75, 106.33333333333333]], "isOverall": false, "label": "Get contact Info-31-Aggregated", "isController": false}, {"data": [[5.0, 24.0], [6.0, 40.36363636363637]], "isOverall": false, "label": "Get Career Info-14", "isController": false}, {"data": [[5.916666666666667, 39.0]], "isOverall": false, "label": "Get Career Info-14-Aggregated", "isController": false}, {"data": [[5.0, 21.0], [6.0, 42.27272727272727]], "isOverall": false, "label": "Get Career Info-15", "isController": false}, {"data": [[5.916666666666667, 40.5]], "isOverall": false, "label": "Get Career Info-15-Aggregated", "isController": false}, {"data": [[6.0, 2779.4166666666665]], "isOverall": false, "label": "Get about-29", "isController": false}, {"data": [[6.0, 2779.4166666666665]], "isOverall": false, "label": "Get about-29-Aggregated", "isController": false}, {"data": [[6.0, 3056.5]], "isOverall": false, "label": "Get about-28", "isController": false}, {"data": [[6.0, 3056.5]], "isOverall": false, "label": "Get about-28-Aggregated", "isController": false}, {"data": [[5.0, 49.0], [6.0, 100.27272727272727]], "isOverall": false, "label": "Get Career Info-10", "isController": false}, {"data": [[5.916666666666667, 96.0]], "isOverall": false, "label": "Get Career Info-10-Aggregated", "isController": false}, {"data": [[5.0, 20.0], [6.0, 90.0909090909091]], "isOverall": false, "label": "Get Career Info-11", "isController": false}, {"data": [[5.916666666666667, 84.25]], "isOverall": false, "label": "Get Career Info-11-Aggregated", "isController": false}, {"data": [[6.0, 1923.9999999999998]], "isOverall": false, "label": "Get about-21", "isController": false}, {"data": [[6.0, 1923.9999999999998]], "isOverall": false, "label": "Get about-21-Aggregated", "isController": false}, {"data": [[6.0, 1471.4166666666667]], "isOverall": false, "label": "Get about-20", "isController": false}, {"data": [[6.0, 1471.4166666666667]], "isOverall": false, "label": "Get about-20-Aggregated", "isController": false}, {"data": [[6.0, 2537.6666666666665]], "isOverall": false, "label": "Get about-23", "isController": false}, {"data": [[6.0, 2537.6666666666665]], "isOverall": false, "label": "Get about-23-Aggregated", "isController": false}, {"data": [[6.0, 1081.6666666666665]], "isOverall": false, "label": "Get about-22", "isController": false}, {"data": [[6.0, 1081.6666666666665]], "isOverall": false, "label": "Get about-22-Aggregated", "isController": false}, {"data": [[6.0, 4035.6666666666665]], "isOverall": false, "label": "Get about-25", "isController": false}, {"data": [[6.0, 4035.6666666666665]], "isOverall": false, "label": "Get about-25-Aggregated", "isController": false}, {"data": [[6.0, 1730.25]], "isOverall": false, "label": "Get about-24", "isController": false}, {"data": [[6.0, 1730.25]], "isOverall": false, "label": "Get about-24-Aggregated", "isController": false}, {"data": [[6.0, 3067.333333333333]], "isOverall": false, "label": "Get about-27", "isController": false}, {"data": [[6.0, 3067.333333333333]], "isOverall": false, "label": "Get about-27-Aggregated", "isController": false}, {"data": [[6.0, 3511.083333333334]], "isOverall": false, "label": "Get about-26", "isController": false}, {"data": [[6.0, 3511.083333333334]], "isOverall": false, "label": "Get about-26-Aggregated", "isController": false}, {"data": [[4.0, 6850.0], [2.0, 4152.0], [1.0, 3988.0], [5.0, 7136.0], [6.0, 10313.857142857143], [3.0, 6874.0]], "isOverall": false, "label": "Get contact Info", "isController": false}, {"data": [[4.75, 8433.083333333334]], "isOverall": false, "label": "Get contact Info-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 6.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 1405.95, "minX": 1.70716302E12, "maxY": 2670183.7666666666, "series": [{"data": [[1.70716308E12, 2670183.7666666666], [1.7071632E12, 99012.8], [1.70716302E12, 1679098.8666666667], [1.70716314E12, 2490441.216666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.70716308E12, 35405.63333333333], [1.7071632E12, 1405.95], [1.70716302E12, 21138.366666666665], [1.70716314E12, 24533.25]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7071632E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 20.0, "minX": 1.70716302E12, "maxY": 63593.2, "series": [{"data": [[1.70716308E12, 291.8333333333333], [1.70716302E12, 1139.8333333333333]], "isOverall": false, "label": "Homepage-10", "isController": false}, {"data": [[1.70716308E12, 1674.1666666666665], [1.70716302E12, 743.8333333333333]], "isOverall": false, "label": "Homepage-11", "isController": false}, {"data": [[1.70716308E12, 2996.0], [1.70716314E12, 4079.333333333333]], "isOverall": false, "label": "Get Career Info", "isController": false}, {"data": [[1.70716308E12, 1076.1666666666667], [1.70716302E12, 978.0]], "isOverall": false, "label": "Homepage-32", "isController": false}, {"data": [[1.70716308E12, 1064.1666666666665], [1.70716302E12, 674.5]], "isOverall": false, "label": "Homepage-33", "isController": false}, {"data": [[1.70716308E12, 689.3333333333333], [1.70716302E12, 518.5]], "isOverall": false, "label": "Homepage-30", "isController": false}, {"data": [[1.70716308E12, 517.6666666666666], [1.70716302E12, 579.3333333333334]], "isOverall": false, "label": "Homepage-31", "isController": false}, {"data": [[1.70716308E12, 42.5], [1.70716314E12, 122.5]], "isOverall": false, "label": "Get Career Info-9", "isController": false}, {"data": [[1.70716308E12, 47.0], [1.70716314E12, 94.66666666666667]], "isOverall": false, "label": "Get Career Info-8", "isController": false}, {"data": [[1.70716308E12, 41.0], [1.70716314E12, 108.66666666666667]], "isOverall": false, "label": "Get Career Info-7", "isController": false}, {"data": [[1.70716308E12, 1949.1111111111113], [1.70716302E12, 5670.500000000001], [1.70716314E12, 11255.0]], "isOverall": false, "label": "Get about-3", "isController": false}, {"data": [[1.70716308E12, 69.0], [1.70716302E12, 355.16666666666663], [1.70716314E12, 141.8]], "isOverall": false, "label": "Get about-54", "isController": false}, {"data": [[1.70716308E12, 1260.2727272727273], [1.70716302E12, 2981.833333333333], [1.70716314E12, 2627.0]], "isOverall": false, "label": "Get about-2", "isController": false}, {"data": [[1.70716308E12, 93.0], [1.70716302E12, 337.83333333333337], [1.70716314E12, 288.6]], "isOverall": false, "label": "Get about-53", "isController": false}, {"data": [[1.70716308E12, 165.83333333333331], [1.7071632E12, 57.0], [1.70716314E12, 45.2]], "isOverall": false, "label": "Get contact Info-9", "isController": false}, {"data": [[1.70716308E12, 246.0], [1.70716302E12, 158.33333333333331], [1.70716314E12, 2277.0]], "isOverall": false, "label": "Get about-5", "isController": false}, {"data": [[1.70716308E12, 989.0], [1.70716302E12, 689.0], [1.70716314E12, 510.6]], "isOverall": false, "label": "Get about-56", "isController": false}, {"data": [[1.70716308E12, 12086.3], [1.70716302E12, 9192.625], [1.70716314E12, 28339.833333333336]], "isOverall": false, "label": "Get about-4", "isController": false}, {"data": [[1.70716308E12, 89.0], [1.70716302E12, 186.16666666666666], [1.70716314E12, 235.8]], "isOverall": false, "label": "Get about-55", "isController": false}, {"data": [[1.70716308E12, 130.2], [1.70716302E12, 193.83333333333334], [1.70716314E12, 1755.0]], "isOverall": false, "label": "Get about-7", "isController": false}, {"data": [[1.70716308E12, 2318.0], [1.70716302E12, 9895.333333333332], [1.70716314E12, 5156.4]], "isOverall": false, "label": "Get about-58", "isController": false}, {"data": [[1.70716308E12, 137.66666666666666], [1.7071632E12, 58.0], [1.70716314E12, 130.8]], "isOverall": false, "label": "Get contact Info-6", "isController": false}, {"data": [[1.70716308E12, 502.16666666666674], [1.70716302E12, 146.0]], "isOverall": false, "label": "Get about-6", "isController": false}, {"data": [[1.70716308E12, 2219.0], [1.70716302E12, 5051.333333333334], [1.70716314E12, 4294.6]], "isOverall": false, "label": "Get about-57", "isController": false}, {"data": [[1.70716308E12, 127.66666666666666], [1.7071632E12, 60.0], [1.70716314E12, 80.4]], "isOverall": false, "label": "Get contact Info-5", "isController": false}, {"data": [[1.70716308E12, 148.2], [1.70716302E12, 98.0], [1.70716314E12, 322.0]], "isOverall": false, "label": "Get about-9", "isController": false}, {"data": [[1.70716308E12, 286.33333333333337], [1.7071632E12, 20.0], [1.70716314E12, 301.0]], "isOverall": false, "label": "Get contact Info-8", "isController": false}, {"data": [[1.70716308E12, 165.8], [1.70716302E12, 156.83333333333331], [1.70716314E12, 328.0]], "isOverall": false, "label": "Get about-8", "isController": false}, {"data": [[1.70716308E12, 288.33333333333337], [1.7071632E12, 51.0], [1.70716314E12, 62.6]], "isOverall": false, "label": "Get contact Info-7", "isController": false}, {"data": [[1.70716308E12, 536.0], [1.70716302E12, 500.16666666666663]], "isOverall": false, "label": "Homepage-29", "isController": false}, {"data": [[1.70716308E12, 49.0], [1.70716314E12, 128.33333333333334]], "isOverall": false, "label": "Get Career Info-6", "isController": false}, {"data": [[1.70716308E12, 51.0], [1.70716314E12, 137.16666666666669]], "isOverall": false, "label": "Get Career Info-5", "isController": false}, {"data": [[1.70716308E12, 202.33333333333334], [1.70716302E12, 417.0]], "isOverall": false, "label": "Homepage-27", "isController": false}, {"data": [[1.70716308E12, 40.666666666666664], [1.70716314E12, 112.66666666666667]], "isOverall": false, "label": "Get Career Info-4", "isController": false}, {"data": [[1.70716308E12, 392.8333333333333], [1.70716302E12, 94.66666666666667]], "isOverall": false, "label": "Homepage-28", "isController": false}, {"data": [[1.70716308E12, 34.333333333333336], [1.70716314E12, 76.66666666666667]], "isOverall": false, "label": "Get Career Info-3", "isController": false}, {"data": [[1.70716308E12, 124.83333333333334], [1.70716302E12, 178.33333333333334]], "isOverall": false, "label": "Homepage-25", "isController": false}, {"data": [[1.70716308E12, 84.0], [1.70716302E12, 124.5], [1.70716314E12, 467.2]], "isOverall": false, "label": "Get about-50", "isController": false}, {"data": [[1.70716308E12, 43.333333333333336], [1.70716314E12, 109.0]], "isOverall": false, "label": "Get Career Info-2", "isController": false}, {"data": [[1.70716308E12, 227.83333333333331], [1.70716302E12, 262.16666666666663]], "isOverall": false, "label": "Homepage-26", "isController": false}, {"data": [[1.70716308E12, 33.0], [1.70716314E12, 92.83333333333334]], "isOverall": false, "label": "Get Career Info-1", "isController": false}, {"data": [[1.70716308E12, 520.8333333333334], [1.70716302E12, 593.5]], "isOverall": false, "label": "Homepage-23", "isController": false}, {"data": [[1.70716308E12, 1950.0], [1.70716302E12, 5277.416666666667], [1.70716314E12, 10562.5]], "isOverall": false, "label": "Get about-1", "isController": false}, {"data": [[1.70716308E12, 92.0], [1.70716302E12, 102.66666666666666], [1.70716314E12, 96.6]], "isOverall": false, "label": "Get about-52", "isController": false}, {"data": [[1.70716308E12, 879.8333333333334], [1.70716314E12, 1112.8333333333333]], "isOverall": false, "label": "Get Career Info-0", "isController": false}, {"data": [[1.70716308E12, 540.0], [1.70716302E12, 391.33333333333337]], "isOverall": false, "label": "Homepage-24", "isController": false}, {"data": [[1.70716308E12, 2366.0], [1.70716302E12, 2509.916666666667], [1.70716314E12, 9012.0]], "isOverall": false, "label": "Get about-0", "isController": false}, {"data": [[1.70716308E12, 84.0], [1.70716302E12, 95.16666666666667], [1.70716314E12, 220.8]], "isOverall": false, "label": "Get about-51", "isController": false}, {"data": [[1.70716308E12, 241.0], [1.70716302E12, 346.1666666666667]], "isOverall": false, "label": "Homepage-21", "isController": false}, {"data": [[1.70716308E12, 723.3333333333334], [1.70716302E12, 232.66666666666666]], "isOverall": false, "label": "Homepage-22", "isController": false}, {"data": [[1.70716308E12, 411.6666666666667], [1.70716302E12, 150.83333333333334]], "isOverall": false, "label": "Homepage-20", "isController": false}, {"data": [[1.70716308E12, 36735.25], [1.70716302E12, 39388.5], [1.70716314E12, 35174.5]], "isOverall": false, "label": "Get about", "isController": false}, {"data": [[1.70716308E12, 112.16666666666667], [1.7071632E12, 53.0], [1.70716314E12, 52.6]], "isOverall": false, "label": "Get contact Info-2", "isController": false}, {"data": [[1.70716308E12, 1958.291666666667], [1.7071632E12, 560.5], [1.70716314E12, 1502.8500000000001]], "isOverall": false, "label": "Get contact Info-1", "isController": false}, {"data": [[1.70716308E12, 168.83333333333331], [1.7071632E12, 58.0], [1.70716314E12, 77.8]], "isOverall": false, "label": "Get contact Info-4", "isController": false}, {"data": [[1.70716308E12, 161.66666666666669], [1.7071632E12, 65.0], [1.70716314E12, 53.4]], "isOverall": false, "label": "Get contact Info-3", "isController": false}, {"data": [[1.70716308E12, 1470.5833333333333], [1.7071632E12, 636.25], [1.70716314E12, 1176.4999999999998]], "isOverall": false, "label": "Get contact Info-0", "isController": false}, {"data": [[1.70716308E12, 184.0], [1.70716302E12, 248.33333333333334]], "isOverall": false, "label": "Homepage-18", "isController": false}, {"data": [[1.70716308E12, 246.5], [1.70716302E12, 93.16666666666667]], "isOverall": false, "label": "Homepage-19", "isController": false}, {"data": [[1.70716308E12, 378.6666666666667], [1.70716302E12, 322.5]], "isOverall": false, "label": "Homepage-16", "isController": false}, {"data": [[1.70716308E12, 341.5], [1.70716302E12, 276.16666666666663]], "isOverall": false, "label": "Homepage-17", "isController": false}, {"data": [[1.70716308E12, 507.66666666666663], [1.70716302E12, 294.66666666666663]], "isOverall": false, "label": "Homepage-14", "isController": false}, {"data": [[1.70716308E12, 1118.0], [1.70716302E12, 1092.3333333333335]], "isOverall": false, "label": "Homepage-15", "isController": false}, {"data": [[1.70716308E12, 3177.3333333333335], [1.70716302E12, 2425.1666666666665]], "isOverall": false, "label": "Homepage-12", "isController": false}, {"data": [[1.70716308E12, 3167.5], [1.70716302E12, 2318.833333333333]], "isOverall": false, "label": "Homepage-13", "isController": false}, {"data": [[1.70716308E12, 32.5], [1.70716314E12, 39.166666666666664]], "isOverall": false, "label": "Get Career Info-27", "isController": false}, {"data": [[1.70716308E12, 85.33333333333333], [1.7071632E12, 48.0], [1.70716314E12, 92.6]], "isOverall": false, "label": "Get contact Info-23", "isController": false}, {"data": [[1.70716308E12, 372.6666666666667], [1.70716314E12, 615.3333333333334]], "isOverall": false, "label": "Get Career Info-28", "isController": false}, {"data": [[1.70716308E12, 72.83333333333333], [1.7071632E12, 40.0], [1.70716314E12, 116.2]], "isOverall": false, "label": "Get contact Info-24", "isController": false}, {"data": [[1.70716308E12, 1841.0], [1.70716314E12, 1912.8333333333333]], "isOverall": false, "label": "Get Career Info-29", "isController": false}, {"data": [[1.70716308E12, 106.66666666666667], [1.7071632E12, 35.0], [1.70716314E12, 93.2]], "isOverall": false, "label": "Get contact Info-21", "isController": false}, {"data": [[1.70716308E12, 77.66666666666666], [1.7071632E12, 31.0], [1.70716314E12, 64.6]], "isOverall": false, "label": "Get contact Info-22", "isController": false}, {"data": [[1.70716308E12, 3184.166666666667], [1.70716302E12, 2818.3333333333335]], "isOverall": false, "label": "Homepage-50", "isController": false}, {"data": [[1.70716308E12, 21.5], [1.70716314E12, 36.5]], "isOverall": false, "label": "Get Career Info-23", "isController": false}, {"data": [[1.70716308E12, 3489.5], [1.70716302E12, 2991.0]], "isOverall": false, "label": "Homepage-51", "isController": false}, {"data": [[1.70716308E12, 26.5], [1.70716314E12, 36.666666666666664]], "isOverall": false, "label": "Get Career Info-24", "isController": false}, {"data": [[1.70716308E12, 109.5], [1.7071632E12, 31.0], [1.70716314E12, 110.8]], "isOverall": false, "label": "Get contact Info-20", "isController": false}, {"data": [[1.70716308E12, 30.166666666666664], [1.70716314E12, 94.16666666666667]], "isOverall": false, "label": "Get Career Info-25", "isController": false}, {"data": [[1.70716308E12, 33.5], [1.70716314E12, 157.33333333333331]], "isOverall": false, "label": "Get Career Info-26", "isController": false}, {"data": [[1.70716308E12, 149.0], [1.70716302E12, 1092.8333333333335], [1.70716314E12, 1214.0]], "isOverall": false, "label": "Get about-39", "isController": false}, {"data": [[1.70716308E12, 251.16666666666669], [1.70716314E12, 425.83333333333337]], "isOverall": false, "label": "Get Career Info-20", "isController": false}, {"data": [[1.70716308E12, 20.5], [1.70716314E12, 38.0]], "isOverall": false, "label": "Get Career Info-21", "isController": false}, {"data": [[1.70716308E12, 70.83333333333333], [1.7071632E12, 22.0], [1.70716314E12, 67.6]], "isOverall": false, "label": "Get contact Info-29", "isController": false}, {"data": [[1.70716308E12, 29.0], [1.70716314E12, 36.5]], "isOverall": false, "label": "Get Career Info-22", "isController": false}, {"data": [[1.70716308E12, 63.33333333333333], [1.7071632E12, 22.0], [1.70716314E12, 68.4]], "isOverall": false, "label": "Get contact Info-27", "isController": false}, {"data": [[1.70716308E12, 68.83333333333333], [1.7071632E12, 24.0], [1.70716314E12, 109.8]], "isOverall": false, "label": "Get contact Info-28", "isController": false}, {"data": [[1.70716308E12, 865.1666666666666], [1.7071632E12, 306.0], [1.70716314E12, 609.4]], "isOverall": false, "label": "Get contact Info-25", "isController": false}, {"data": [[1.70716308E12, 79.66666666666667], [1.7071632E12, 24.0], [1.70716314E12, 69.2]], "isOverall": false, "label": "Get contact Info-26", "isController": false}, {"data": [[1.70716308E12, 1056.5], [1.70716302E12, 546.0], [1.70716314E12, 2895.5]], "isOverall": false, "label": "Get about-32", "isController": false}, {"data": [[1.70716308E12, 1873.5], [1.70716302E12, 2668.666666666667], [1.70716314E12, 3943.25]], "isOverall": false, "label": "Get about-31", "isController": false}, {"data": [[1.70716308E12, 2649.5], [1.70716302E12, 2813.333333333333], [1.70716314E12, 3739.75]], "isOverall": false, "label": "Get about-34", "isController": false}, {"data": [[1.70716308E12, 1967.5], [1.70716302E12, 4235.666666666667], [1.70716314E12, 2899.25]], "isOverall": false, "label": "Get about-33", "isController": false}, {"data": [[1.70716308E12, 3131.0], [1.70716302E12, 9944.666666666668], [1.70716314E12, 12097.4]], "isOverall": false, "label": "Get about-36", "isController": false}, {"data": [[1.70716308E12, 3070.0], [1.70716302E12, 1962.6666666666665]], "isOverall": false, "label": "Homepage-9", "isController": false}, {"data": [[1.70716308E12, 3018.0], [1.70716302E12, 7772.333333333333], [1.70716314E12, 10288.6]], "isOverall": false, "label": "Get about-35", "isController": false}, {"data": [[1.70716308E12, 63593.2], [1.70716302E12, 53805.0], [1.70716314E12, 57634.33333333333]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.70716308E12, 592.3333333333333], [1.70716302E12, 337.66666666666663]], "isOverall": false, "label": "Homepage-8", "isController": false}, {"data": [[1.70716308E12, 1180.5], [1.70716302E12, 1641.3333333333335], [1.70716314E12, 2081.0]], "isOverall": false, "label": "Get about-38", "isController": false}, {"data": [[1.70716308E12, 559.8333333333334], [1.70716302E12, 853.6666666666666]], "isOverall": false, "label": "Homepage-7", "isController": false}, {"data": [[1.70716308E12, 1826.5], [1.70716302E12, 3617.1666666666665], [1.70716314E12, 3868.5]], "isOverall": false, "label": "Get about-37", "isController": false}, {"data": [[1.70716308E12, 465.16666666666663], [1.70716302E12, 587.5]], "isOverall": false, "label": "Homepage-6", "isController": false}, {"data": [[1.70716308E12, 539.8333333333333], [1.70716302E12, 757.3333333333334]], "isOverall": false, "label": "Homepage-5", "isController": false}, {"data": [[1.70716308E12, 1761.8333333333333], [1.70716302E12, 1499.8333333333333]], "isOverall": false, "label": "Homepage-4", "isController": false}, {"data": [[1.70716308E12, 885.8333333333334], [1.70716302E12, 895.5]], "isOverall": false, "label": "Homepage-49", "isController": false}, {"data": [[1.70716308E12, 892.5], [1.70716302E12, 958.1666666666666]], "isOverall": false, "label": "Homepage-3", "isController": false}, {"data": [[1.70716308E12, 1425.75], [1.70716302E12, 1292.75]], "isOverall": false, "label": "Homepage-2", "isController": false}, {"data": [[1.70716308E12, 585.6666666666667], [1.70716302E12, 657.1666666666666]], "isOverall": false, "label": "Homepage-47", "isController": false}, {"data": [[1.70716308E12, 976.4999999999999], [1.70716302E12, 705.6666666666666]], "isOverall": false, "label": "Homepage-1", "isController": false}, {"data": [[1.70716308E12, 575.3333333333333], [1.70716302E12, 670.8333333333334]], "isOverall": false, "label": "Homepage-48", "isController": false}, {"data": [[1.70716308E12, 1997.6666666666667], [1.70716302E12, 1467.4166666666667]], "isOverall": false, "label": "Homepage-0", "isController": false}, {"data": [[1.70716308E12, 84.66666666666667], [1.70716302E12, 80.16666666666667]], "isOverall": false, "label": "Homepage-45", "isController": false}, {"data": [[1.70716308E12, 1291.5], [1.70716302E12, 2953.1666666666665], [1.70716314E12, 3164.25]], "isOverall": false, "label": "Get about-30", "isController": false}, {"data": [[1.70716308E12, 463.3333333333333], [1.70716302E12, 517.8333333333334]], "isOverall": false, "label": "Homepage-46", "isController": false}, {"data": [[1.70716308E12, 616.5], [1.70716302E12, 282.3333333333333]], "isOverall": false, "label": "Homepage-43", "isController": false}, {"data": [[1.70716308E12, 4693.0], [1.7071632E12, 625.0], [1.70716314E12, 2234.8]], "isOverall": false, "label": "Get contact Info-12", "isController": false}, {"data": [[1.70716308E12, 718.6666666666667], [1.70716302E12, 71.0]], "isOverall": false, "label": "Homepage-44", "isController": false}, {"data": [[1.70716308E12, 2774.1666666666665], [1.7071632E12, 853.0], [1.70716314E12, 2451.8]], "isOverall": false, "label": "Get contact Info-13", "isController": false}, {"data": [[1.70716308E12, 1453.6666666666667], [1.70716302E12, 1359.1666666666667]], "isOverall": false, "label": "Homepage-41", "isController": false}, {"data": [[1.70716308E12, 124.16666666666667], [1.7071632E12, 24.0], [1.70716314E12, 61.2]], "isOverall": false, "label": "Get contact Info-10", "isController": false}, {"data": [[1.70716308E12, 320.0], [1.70716302E12, 210.33333333333334]], "isOverall": false, "label": "Homepage-42", "isController": false}, {"data": [[1.70716308E12, 483.3333333333333], [1.7071632E12, 25.0], [1.70716314E12, 81.4]], "isOverall": false, "label": "Get contact Info-11", "isController": false}, {"data": [[1.70716308E12, 361.1666666666667], [1.70716302E12, 240.5]], "isOverall": false, "label": "Homepage-40", "isController": false}, {"data": [[1.70716308E12, 1849.6666666666667], [1.70716314E12, 2444.666666666667]], "isOverall": false, "label": "Get Career Info-30", "isController": false}, {"data": [[1.70716308E12, 3417.6666666666665], [1.7071632E12, 1451.0], [1.70716314E12, 3455.2]], "isOverall": false, "label": "Get contact Info-18", "isController": false}, {"data": [[1.70716308E12, 105.5], [1.7071632E12, 21.0], [1.70716314E12, 146.0]], "isOverall": false, "label": "Get contact Info-19", "isController": false}, {"data": [[1.70716308E12, 4365.5], [1.7071632E12, 1185.0], [1.70716314E12, 2623.2]], "isOverall": false, "label": "Get contact Info-16", "isController": false}, {"data": [[1.70716308E12, 3712.3333333333335], [1.7071632E12, 1338.0], [1.70716314E12, 3514.8]], "isOverall": false, "label": "Get contact Info-17", "isController": false}, {"data": [[1.70716308E12, 120.99999999999999], [1.7071632E12, 20.0], [1.70716314E12, 52.4]], "isOverall": false, "label": "Get contact Info-14", "isController": false}, {"data": [[1.70716308E12, 4056.0], [1.7071632E12, 901.0], [1.70716314E12, 1964.8]], "isOverall": false, "label": "Get contact Info-15", "isController": false}, {"data": [[1.70716308E12, 96.0], [1.70716302E12, 707.9999999999999], [1.70716314E12, 99.2]], "isOverall": false, "label": "Get about-43", "isController": false}, {"data": [[1.70716308E12, 1461.0], [1.70716302E12, 4638.166666666667], [1.70716314E12, 3769.6]], "isOverall": false, "label": "Get about-42", "isController": false}, {"data": [[1.70716308E12, 78.0], [1.70716302E12, 165.16666666666669], [1.70716314E12, 97.4]], "isOverall": false, "label": "Get about-45", "isController": false}, {"data": [[1.70716308E12, 80.0], [1.70716302E12, 375.16666666666663], [1.70716314E12, 120.0]], "isOverall": false, "label": "Get about-44", "isController": false}, {"data": [[1.70716308E12, 80.0], [1.70716302E12, 464.0], [1.70716314E12, 126.0]], "isOverall": false, "label": "Get about-47", "isController": false}, {"data": [[1.70716308E12, 79.0], [1.70716302E12, 116.16666666666667], [1.70716314E12, 269.6]], "isOverall": false, "label": "Get about-46", "isController": false}, {"data": [[1.70716308E12, 95.0], [1.70716302E12, 155.83333333333334], [1.70716314E12, 421.4]], "isOverall": false, "label": "Get about-49", "isController": false}, {"data": [[1.70716308E12, 649.0], [1.70716302E12, 961.5], [1.70716314E12, 2041.6]], "isOverall": false, "label": "Get about-48", "isController": false}, {"data": [[1.70716308E12, 340.3333333333333], [1.70716302E12, 268.16666666666663]], "isOverall": false, "label": "Homepage-38", "isController": false}, {"data": [[1.70716308E12, 690.6666666666666], [1.70716302E12, 539.1666666666667]], "isOverall": false, "label": "Homepage-39", "isController": false}, {"data": [[1.70716308E12, 194.16666666666666], [1.70716302E12, 370.0]], "isOverall": false, "label": "Homepage-36", "isController": false}, {"data": [[1.70716308E12, 558.0], [1.70716302E12, 539.0]], "isOverall": false, "label": "Homepage-37", "isController": false}, {"data": [[1.70716308E12, 1274.6666666666665], [1.70716302E12, 882.6666666666666]], "isOverall": false, "label": "Homepage-34", "isController": false}, {"data": [[1.70716308E12, 189.0], [1.70716302E12, 1849.8333333333333], [1.70716314E12, 1840.2]], "isOverall": false, "label": "Get about-41", "isController": false}, {"data": [[1.70716308E12, 110.66666666666666], [1.70716302E12, 174.5]], "isOverall": false, "label": "Homepage-35", "isController": false}, {"data": [[1.70716308E12, 626.0], [1.70716302E12, 2287.333333333333], [1.70716314E12, 2139.6]], "isOverall": false, "label": "Get about-40", "isController": false}, {"data": [[1.70716308E12, 33271.5], [1.70716302E12, 37750.0], [1.70716314E12, 31985.833333333332]], "isOverall": false, "label": "Get about-18", "isController": false}, {"data": [[1.70716308E12, 73.2], [1.70716302E12, 92.33333333333333], [1.70716314E12, 99.0]], "isOverall": false, "label": "Get about-17", "isController": false}, {"data": [[1.70716308E12, 1573.6], [1.70716302E12, 1007.5000000000001], [1.70716314E12, 3958.0]], "isOverall": false, "label": "Get about-19", "isController": false}, {"data": [[1.70716308E12, 221.16666666666666], [1.70716302E12, 481.6666666666667]], "isOverall": false, "label": "Get about-10", "isController": false}, {"data": [[1.70716308E12, 2871.8], [1.70716302E12, 4138.166666666667], [1.70716314E12, 12441.0]], "isOverall": false, "label": "Get about-12", "isController": false}, {"data": [[1.70716308E12, 150.6], [1.70716302E12, 564.0], [1.70716314E12, 311.0]], "isOverall": false, "label": "Get about-11", "isController": false}, {"data": [[1.70716308E12, 1409.2], [1.70716302E12, 2162.5], [1.70716314E12, 1911.0]], "isOverall": false, "label": "Get about-14", "isController": false}, {"data": [[1.70716308E12, 2197.4], [1.70716302E12, 1744.1666666666667], [1.70716314E12, 1825.0]], "isOverall": false, "label": "Get about-13", "isController": false}, {"data": [[1.70716308E12, 2924.5], [1.70716302E12, 5382.0], [1.70716314E12, 6840.5]], "isOverall": false, "label": "Get about-16", "isController": false}, {"data": [[1.70716308E12, 2062.8], [1.70716302E12, 1533.6666666666665], [1.70716314E12, 896.0]], "isOverall": false, "label": "Get about-15", "isController": false}, {"data": [[1.70716308E12, 26.333333333333332], [1.70716314E12, 40.166666666666664]], "isOverall": false, "label": "Get Career Info-16", "isController": false}, {"data": [[1.70716308E12, 3540.833333333333], [1.7071632E12, 1755.0], [1.70716314E12, 2068.8]], "isOverall": false, "label": "Get contact Info-34", "isController": false}, {"data": [[1.70716308E12, 24.333333333333332], [1.70716314E12, 44.5]], "isOverall": false, "label": "Get Career Info-17", "isController": false}, {"data": [[1.70716308E12, 3978.5], [1.7071632E12, 1991.0], [1.70716314E12, 2470.4]], "isOverall": false, "label": "Get contact Info-35", "isController": false}, {"data": [[1.70716308E12, 12417.5], [1.70716302E12, 10443.0]], "isOverall": false, "label": "Homepage", "isController": false}, {"data": [[1.70716308E12, 26.833333333333332], [1.70716314E12, 46.0]], "isOverall": false, "label": "Get Career Info-18", "isController": false}, {"data": [[1.70716308E12, 901.5], [1.7071632E12, 127.0], [1.70716314E12, 549.8]], "isOverall": false, "label": "Get contact Info-32", "isController": false}, {"data": [[1.70716308E12, 22.333333333333336], [1.70716314E12, 45.0]], "isOverall": false, "label": "Get Career Info-19", "isController": false}, {"data": [[1.70716308E12, 540.5], [1.7071632E12, 367.0], [1.70716314E12, 537.0]], "isOverall": false, "label": "Get contact Info-33", "isController": false}, {"data": [[1.70716308E12, 695.6666666666666], [1.70716314E12, 1104.1666666666665]], "isOverall": false, "label": "Get Career Info-12", "isController": false}, {"data": [[1.70716308E12, 285.3333333333333], [1.7071632E12, 50.0], [1.70716314E12, 101.8]], "isOverall": false, "label": "Get contact Info-30", "isController": false}, {"data": [[1.70716308E12, 605.8333333333333], [1.70716314E12, 896.1666666666667]], "isOverall": false, "label": "Get Career Info-13", "isController": false}, {"data": [[1.70716308E12, 123.5], [1.7071632E12, 40.0], [1.70716314E12, 99.0]], "isOverall": false, "label": "Get contact Info-31", "isController": false}, {"data": [[1.70716308E12, 31.833333333333332], [1.70716314E12, 46.16666666666667]], "isOverall": false, "label": "Get Career Info-14", "isController": false}, {"data": [[1.70716308E12, 21.166666666666664], [1.70716314E12, 59.83333333333333]], "isOverall": false, "label": "Get Career Info-15", "isController": false}, {"data": [[1.70716308E12, 820.0], [1.70716302E12, 3269.1666666666665], [1.70716314E12, 3024.5]], "isOverall": false, "label": "Get about-29", "isController": false}, {"data": [[1.70716308E12, 1606.5], [1.70716302E12, 2441.5], [1.70716314E12, 4704.0]], "isOverall": false, "label": "Get about-28", "isController": false}, {"data": [[1.70716308E12, 33.833333333333336], [1.70716314E12, 158.16666666666666]], "isOverall": false, "label": "Get Career Info-10", "isController": false}, {"data": [[1.70716308E12, 43.0], [1.70716314E12, 125.5]], "isOverall": false, "label": "Get Career Info-11", "isController": false}, {"data": [[1.70716308E12, 1699.4], [1.70716302E12, 2196.5], [1.70716314E12, 1412.0]], "isOverall": false, "label": "Get about-21", "isController": false}, {"data": [[1.70716308E12, 1056.2], [1.70716302E12, 1662.1666666666667], [1.70716314E12, 2403.0]], "isOverall": false, "label": "Get about-20", "isController": false}, {"data": [[1.70716308E12, 1662.2], [1.70716302E12, 3044.1666666666665], [1.70716314E12, 3876.0]], "isOverall": false, "label": "Get about-23", "isController": false}, {"data": [[1.70716308E12, 1251.8], [1.70716302E12, 939.8333333333334], [1.70716314E12, 1082.0]], "isOverall": false, "label": "Get about-22", "isController": false}, {"data": [[1.70716308E12, 1724.0], [1.70716302E12, 4035.5], [1.70716314E12, 5191.75]], "isOverall": false, "label": "Get about-25", "isController": false}, {"data": [[1.70716308E12, 1188.0], [1.70716302E12, 1699.1666666666665], [1.70716314E12, 2908.0]], "isOverall": false, "label": "Get about-24", "isController": false}, {"data": [[1.70716308E12, 1624.3333333333335], [1.70716302E12, 2791.833333333333], [1.70716314E12, 5061.333333333333]], "isOverall": false, "label": "Get about-27", "isController": false}, {"data": [[1.70716308E12, 2592.3333333333335], [1.70716302E12, 3831.0], [1.70716314E12, 3790.0]], "isOverall": false, "label": "Get about-26", "isController": false}, {"data": [[1.70716308E12, 10903.166666666666], [1.7071632E12, 3988.0], [1.70716314E12, 6358.0]], "isOverall": false, "label": "Get contact Info", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7071632E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.70716302E12, "maxY": 7538.0, "series": [{"data": [[1.70716308E12, 209.16666666666666], [1.70716302E12, 1108.0]], "isOverall": false, "label": "Homepage-10", "isController": false}, {"data": [[1.70716308E12, 462.33333333333337], [1.70716302E12, 159.66666666666669]], "isOverall": false, "label": "Homepage-11", "isController": false}, {"data": [[1.70716308E12, 552.8333333333334], [1.70716314E12, 578.5]], "isOverall": false, "label": "Get Career Info", "isController": false}, {"data": [[1.70716308E12, 243.83333333333331], [1.70716302E12, 129.16666666666666]], "isOverall": false, "label": "Homepage-32", "isController": false}, {"data": [[1.70716308E12, 341.33333333333337], [1.70716302E12, 177.16666666666669]], "isOverall": false, "label": "Homepage-33", "isController": false}, {"data": [[1.70716308E12, 238.83333333333331], [1.70716302E12, 83.33333333333333]], "isOverall": false, "label": "Homepage-30", "isController": false}, {"data": [[1.70716308E12, 167.0], [1.70716302E12, 193.0]], "isOverall": false, "label": "Homepage-31", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-9", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-8", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-7", "isController": false}, {"data": [[1.70716308E12, 273.2222222222223], [1.70716302E12, 1611.0833333333335], [1.70716314E12, 3592.6666666666665]], "isOverall": false, "label": "Get about-3", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-54", "isController": false}, {"data": [[1.70716308E12, 564.7272727272727], [1.70716302E12, 2213.0], [1.70716314E12, 1681.0]], "isOverall": false, "label": "Get about-2", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-53", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-9", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-5", "isController": false}, {"data": [[1.70716308E12, 985.0], [1.70716302E12, 566.0], [1.70716314E12, 330.2]], "isOverall": false, "label": "Get about-56", "isController": false}, {"data": [[1.70716308E12, 1995.4], [1.70716302E12, 456.875], [1.70716314E12, 2503.6666666666665]], "isOverall": false, "label": "Get about-4", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-55", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-7", "isController": false}, {"data": [[1.70716308E12, 608.0], [1.70716302E12, 1645.5], [1.70716314E12, 1015.2]], "isOverall": false, "label": "Get about-58", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-6", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "Get about-6", "isController": false}, {"data": [[1.70716308E12, 461.0], [1.70716302E12, 1294.6666666666667], [1.70716314E12, 1031.4]], "isOverall": false, "label": "Get about-57", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-5", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-9", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-8", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-8", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-7", "isController": false}, {"data": [[1.70716308E12, 263.3333333333333], [1.70716302E12, 262.3333333333333]], "isOverall": false, "label": "Homepage-29", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-6", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-5", "isController": false}, {"data": [[1.70716308E12, 199.66666666666669], [1.70716302E12, 84.16666666666666]], "isOverall": false, "label": "Homepage-27", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-4", "isController": false}, {"data": [[1.70716308E12, 256.33333333333337], [1.70716302E12, 87.33333333333333]], "isOverall": false, "label": "Homepage-28", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-3", "isController": false}, {"data": [[1.70716308E12, 124.0], [1.70716302E12, 178.0]], "isOverall": false, "label": "Homepage-25", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-50", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-2", "isController": false}, {"data": [[1.70716308E12, 226.66666666666669], [1.70716302E12, 241.66666666666666]], "isOverall": false, "label": "Homepage-26", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-1", "isController": false}, {"data": [[1.70716308E12, 148.5], [1.70716302E12, 268.1666666666667]], "isOverall": false, "label": "Homepage-23", "isController": false}, {"data": [[1.70716308E12, 561.0], [1.70716302E12, 1387.9999999999998], [1.70716314E12, 1348.5]], "isOverall": false, "label": "Get about-1", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-52", "isController": false}, {"data": [[1.70716308E12, 552.8333333333334], [1.70716314E12, 578.5]], "isOverall": false, "label": "Get Career Info-0", "isController": false}, {"data": [[1.70716308E12, 381.66666666666663], [1.70716302E12, 256.0]], "isOverall": false, "label": "Homepage-24", "isController": false}, {"data": [[1.70716308E12, 1175.5454545454547], [1.70716302E12, 1174.6666666666667], [1.70716314E12, 7538.0]], "isOverall": false, "label": "Get about-0", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-51", "isController": false}, {"data": [[1.70716308E12, 215.16666666666666], [1.70716302E12, 89.83333333333334]], "isOverall": false, "label": "Homepage-21", "isController": false}, {"data": [[1.70716308E12, 173.16666666666669], [1.70716302E12, 83.33333333333333]], "isOverall": false, "label": "Homepage-22", "isController": false}, {"data": [[1.70716308E12, 390.5], [1.70716302E12, 150.5]], "isOverall": false, "label": "Homepage-20", "isController": false}, {"data": [[1.70716308E12, 773.25], [1.70716302E12, 627.0], [1.70716314E12, 686.0]], "isOverall": false, "label": "Get about", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-2", "isController": false}, {"data": [[1.70716308E12, 798.25], [1.7071632E12, 370.5], [1.70716314E12, 874.6000000000001]], "isOverall": false, "label": "Get contact Info-1", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-4", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-3", "isController": false}, {"data": [[1.70716308E12, 1046.2083333333335], [1.7071632E12, 573.0], [1.70716314E12, 920.1500000000001]], "isOverall": false, "label": "Get contact Info-0", "isController": false}, {"data": [[1.70716308E12, 79.16666666666667], [1.70716302E12, 103.83333333333333]], "isOverall": false, "label": "Homepage-18", "isController": false}, {"data": [[1.70716308E12, 146.0], [1.70716302E12, 81.66666666666666]], "isOverall": false, "label": "Homepage-19", "isController": false}, {"data": [[1.70716308E12, 197.0], [1.70716302E12, 74.5]], "isOverall": false, "label": "Homepage-16", "isController": false}, {"data": [[1.70716308E12, 305.83333333333337], [1.70716302E12, 123.83333333333333]], "isOverall": false, "label": "Homepage-17", "isController": false}, {"data": [[1.70716308E12, 237.16666666666669], [1.70716302E12, 106.33333333333334]], "isOverall": false, "label": "Homepage-14", "isController": false}, {"data": [[1.70716308E12, 158.33333333333334], [1.70716302E12, 458.66666666666663]], "isOverall": false, "label": "Homepage-15", "isController": false}, {"data": [[1.70716308E12, 531.5], [1.70716302E12, 888.6666666666667]], "isOverall": false, "label": "Homepage-12", "isController": false}, {"data": [[1.70716308E12, 611.0], [1.70716302E12, 771.3333333333333]], "isOverall": false, "label": "Homepage-13", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-27", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-23", "isController": false}, {"data": [[1.70716308E12, 357.5], [1.70716314E12, 613.3333333333333]], "isOverall": false, "label": "Get Career Info-28", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-24", "isController": false}, {"data": [[1.70716308E12, 557.5], [1.70716314E12, 512.6666666666667]], "isOverall": false, "label": "Get Career Info-29", "isController": false}, {"data": [[1.70716308E12, 18.833333333333336], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-21", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-22", "isController": false}, {"data": [[1.70716308E12, 577.5], [1.70716302E12, 640.3333333333334]], "isOverall": false, "label": "Homepage-50", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-23", "isController": false}, {"data": [[1.70716308E12, 709.5], [1.70716302E12, 655.5]], "isOverall": false, "label": "Homepage-51", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-24", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-20", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-25", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-26", "isController": false}, {"data": [[1.70716308E12, 140.0], [1.70716302E12, 912.0], [1.70716314E12, 478.6]], "isOverall": false, "label": "Get about-39", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-20", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-21", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-29", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-22", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-27", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-28", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-25", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-26", "isController": false}, {"data": [[1.70716308E12, 369.0], [1.70716302E12, 236.0], [1.70716314E12, 2219.5]], "isOverall": false, "label": "Get about-32", "isController": false}, {"data": [[1.70716308E12, 168.5], [1.70716302E12, 458.6666666666667], [1.70716314E12, 1288.25]], "isOverall": false, "label": "Get about-31", "isController": false}, {"data": [[1.70716308E12, 255.5], [1.70716302E12, 276.6666666666667], [1.70716314E12, 905.75]], "isOverall": false, "label": "Get about-34", "isController": false}, {"data": [[1.70716308E12, 516.0], [1.70716302E12, 495.3333333333333], [1.70716314E12, 330.5]], "isOverall": false, "label": "Get about-33", "isController": false}, {"data": [[1.70716308E12, 121.0], [1.70716302E12, 522.3333333333334], [1.70716314E12, 725.2]], "isOverall": false, "label": "Get about-36", "isController": false}, {"data": [[1.70716308E12, 267.1666666666667], [1.70716302E12, 100.16666666666666]], "isOverall": false, "label": "Homepage-9", "isController": false}, {"data": [[1.70716308E12, 145.0], [1.70716302E12, 733.1666666666667], [1.70716314E12, 729.4]], "isOverall": false, "label": "Get about-35", "isController": false}, {"data": [[1.70716308E12, 3323.4], [1.70716302E12, 2987.0], [1.70716314E12, 2621.5]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.70716308E12, 379.3333333333333], [1.70716302E12, 139.16666666666669]], "isOverall": false, "label": "Homepage-8", "isController": false}, {"data": [[1.70716308E12, 576.5], [1.70716302E12, 453.3333333333333], [1.70716314E12, 802.75]], "isOverall": false, "label": "Get about-38", "isController": false}, {"data": [[1.70716308E12, 388.83333333333337], [1.70716302E12, 569.0]], "isOverall": false, "label": "Homepage-7", "isController": false}, {"data": [[1.70716308E12, 89.0], [1.70716302E12, 1286.3333333333335], [1.70716314E12, 766.75]], "isOverall": false, "label": "Get about-37", "isController": false}, {"data": [[1.70716308E12, 422.33333333333337], [1.70716302E12, 579.6666666666666]], "isOverall": false, "label": "Homepage-6", "isController": false}, {"data": [[1.70716308E12, 312.33333333333337], [1.70716302E12, 253.5]], "isOverall": false, "label": "Homepage-5", "isController": false}, {"data": [[1.70716308E12, 349.5], [1.70716302E12, 482.3333333333333]], "isOverall": false, "label": "Homepage-4", "isController": false}, {"data": [[1.70716308E12, 883.5], [1.70716302E12, 807.3333333333334]], "isOverall": false, "label": "Homepage-49", "isController": false}, {"data": [[1.70716308E12, 295.1666666666667], [1.70716302E12, 442.6666666666667]], "isOverall": false, "label": "Homepage-3", "isController": false}, {"data": [[1.70716308E12, 806.8333333333333], [1.70716302E12, 514.25]], "isOverall": false, "label": "Homepage-2", "isController": false}, {"data": [[1.70716308E12, 204.66666666666666], [1.70716302E12, 352.6666666666667]], "isOverall": false, "label": "Homepage-47", "isController": false}, {"data": [[1.70716308E12, 794.75], [1.70716302E12, 609.9166666666666]], "isOverall": false, "label": "Homepage-1", "isController": false}, {"data": [[1.70716308E12, 573.3333333333334], [1.70716302E12, 594.1666666666667]], "isOverall": false, "label": "Homepage-48", "isController": false}, {"data": [[1.70716308E12, 541.0833333333333], [1.70716302E12, 626.3333333333334]], "isOverall": false, "label": "Homepage-0", "isController": false}, {"data": [[1.70716308E12, 84.16666666666666], [1.70716302E12, 80.0]], "isOverall": false, "label": "Homepage-45", "isController": false}, {"data": [[1.70716308E12, 232.0], [1.70716302E12, 1004.0], [1.70716314E12, 407.75]], "isOverall": false, "label": "Get about-30", "isController": false}, {"data": [[1.70716308E12, 215.33333333333334], [1.70716302E12, 328.1666666666667]], "isOverall": false, "label": "Homepage-46", "isController": false}, {"data": [[1.70716308E12, 302.83333333333337], [1.70716302E12, 226.16666666666669]], "isOverall": false, "label": "Homepage-43", "isController": false}, {"data": [[1.70716308E12, 1788.3333333333333], [1.7071632E12, 258.0], [1.70716314E12, 811.0]], "isOverall": false, "label": "Get contact Info-12", "isController": false}, {"data": [[1.70716308E12, 347.3333333333333], [1.70716302E12, 67.83333333333334]], "isOverall": false, "label": "Homepage-44", "isController": false}, {"data": [[1.70716308E12, 377.66666666666663], [1.7071632E12, 565.0], [1.70716314E12, 633.2]], "isOverall": false, "label": "Get contact Info-13", "isController": false}, {"data": [[1.70716308E12, 780.6666666666667], [1.70716302E12, 1040.8333333333333]], "isOverall": false, "label": "Homepage-41", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-10", "isController": false}, {"data": [[1.70716308E12, 278.1666666666667], [1.70716302E12, 111.33333333333333]], "isOverall": false, "label": "Homepage-42", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-11", "isController": false}, {"data": [[1.70716308E12, 132.66666666666669], [1.70716302E12, 215.0]], "isOverall": false, "label": "Homepage-40", "isController": false}, {"data": [[1.70716308E12, 560.0], [1.70716314E12, 546.6666666666666]], "isOverall": false, "label": "Get Career Info-30", "isController": false}, {"data": [[1.70716308E12, 716.3333333333334], [1.7071632E12, 757.0], [1.70716314E12, 1201.4]], "isOverall": false, "label": "Get contact Info-18", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-19", "isController": false}, {"data": [[1.70716308E12, 1189.8333333333335], [1.7071632E12, 373.0], [1.70716314E12, 769.0]], "isOverall": false, "label": "Get contact Info-16", "isController": false}, {"data": [[1.70716308E12, 1441.1666666666667], [1.7071632E12, 614.0], [1.70716314E12, 1169.4]], "isOverall": false, "label": "Get contact Info-17", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-14", "isController": false}, {"data": [[1.70716308E12, 330.5], [1.7071632E12, 23.0], [1.70716314E12, 34.8]], "isOverall": false, "label": "Get contact Info-15", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-43", "isController": false}, {"data": [[1.70716308E12, 238.0], [1.70716302E12, 980.1666666666667], [1.70716314E12, 699.6]], "isOverall": false, "label": "Get about-42", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-45", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 299.5], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-44", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-47", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-46", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-49", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-48", "isController": false}, {"data": [[1.70716308E12, 239.33333333333334], [1.70716302E12, 97.16666666666666]], "isOverall": false, "label": "Homepage-38", "isController": false}, {"data": [[1.70716308E12, 186.5], [1.70716302E12, 144.16666666666666]], "isOverall": false, "label": "Homepage-39", "isController": false}, {"data": [[1.70716308E12, 193.33333333333334], [1.70716302E12, 369.16666666666663]], "isOverall": false, "label": "Homepage-36", "isController": false}, {"data": [[1.70716308E12, 110.33333333333334], [1.70716302E12, 240.5]], "isOverall": false, "label": "Homepage-37", "isController": false}, {"data": [[1.70716308E12, 290.0], [1.70716302E12, 162.66666666666666]], "isOverall": false, "label": "Homepage-34", "isController": false}, {"data": [[1.70716308E12, 83.0], [1.70716302E12, 1043.1666666666665], [1.70716314E12, 740.4]], "isOverall": false, "label": "Get about-41", "isController": false}, {"data": [[1.70716308E12, 110.5], [1.70716302E12, 174.5]], "isOverall": false, "label": "Homepage-35", "isController": false}, {"data": [[1.70716308E12, 159.0], [1.70716302E12, 613.1666666666666], [1.70716314E12, 567.0]], "isOverall": false, "label": "Get about-40", "isController": false}, {"data": [[1.70716308E12, 2110.5], [1.70716302E12, 653.5], [1.70716314E12, 2725.5]], "isOverall": false, "label": "Get about-18", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-17", "isController": false}, {"data": [[1.70716308E12, 463.0], [1.70716302E12, 271.33333333333337], [1.70716314E12, 2357.0]], "isOverall": false, "label": "Get about-19", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "Get about-10", "isController": false}, {"data": [[1.70716308E12, 538.0], [1.70716302E12, 656.0], [1.70716314E12, 205.0]], "isOverall": false, "label": "Get about-12", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-11", "isController": false}, {"data": [[1.70716308E12, 818.4], [1.70716302E12, 1659.3333333333333], [1.70716314E12, 1194.0]], "isOverall": false, "label": "Get about-14", "isController": false}, {"data": [[1.70716308E12, 1920.4], [1.70716302E12, 1402.1666666666665], [1.70716314E12, 1098.0]], "isOverall": false, "label": "Get about-13", "isController": false}, {"data": [[1.70716308E12, 412.5], [1.70716302E12, 1044.6666666666667], [1.70716314E12, 1266.5]], "isOverall": false, "label": "Get about-16", "isController": false}, {"data": [[1.70716308E12, 1380.4], [1.70716302E12, 1272.3333333333333], [1.70716314E12, 718.0]], "isOverall": false, "label": "Get about-15", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-16", "isController": false}, {"data": [[1.70716308E12, 521.1666666666666], [1.7071632E12, 483.0], [1.70716314E12, 659.4]], "isOverall": false, "label": "Get contact Info-34", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-17", "isController": false}, {"data": [[1.70716308E12, 486.5], [1.7071632E12, 510.0], [1.70716314E12, 755.0]], "isOverall": false, "label": "Get contact Info-35", "isController": false}, {"data": [[1.70716308E12, 815.0], [1.70716302E12, 1152.5]], "isOverall": false, "label": "Homepage", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-18", "isController": false}, {"data": [[1.70716308E12, 841.0], [1.7071632E12, 126.0], [1.70716314E12, 501.8]], "isOverall": false, "label": "Get contact Info-32", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-19", "isController": false}, {"data": [[1.70716308E12, 503.83333333333337], [1.7071632E12, 366.0], [1.70716314E12, 535.8]], "isOverall": false, "label": "Get contact Info-33", "isController": false}, {"data": [[1.70716308E12, 375.8333333333333], [1.70716314E12, 628.8333333333333]], "isOverall": false, "label": "Get Career Info-12", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-30", "isController": false}, {"data": [[1.70716308E12, 260.5], [1.70716314E12, 341.8333333333333]], "isOverall": false, "label": "Get Career Info-13", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-31", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-14", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-15", "isController": false}, {"data": [[1.70716308E12, 126.0], [1.70716302E12, 1158.5], [1.70716314E12, 277.25]], "isOverall": false, "label": "Get about-29", "isController": false}, {"data": [[1.70716308E12, 120.0], [1.70716302E12, 343.33333333333337], [1.70716314E12, 844.0]], "isOverall": false, "label": "Get about-28", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-10", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-11", "isController": false}, {"data": [[1.70716308E12, 368.2], [1.70716302E12, 97.5], [1.70716314E12, 105.0]], "isOverall": false, "label": "Get about-21", "isController": false}, {"data": [[1.70716308E12, 124.4], [1.70716302E12, 116.0], [1.70716314E12, 101.0]], "isOverall": false, "label": "Get about-20", "isController": false}, {"data": [[1.70716308E12, 363.79999999999995], [1.70716302E12, 470.5], [1.70716314E12, 860.0]], "isOverall": false, "label": "Get about-23", "isController": false}, {"data": [[1.70716308E12, 190.8], [1.70716302E12, 107.66666666666667], [1.70716314E12, 172.0]], "isOverall": false, "label": "Get about-22", "isController": false}, {"data": [[1.70716308E12, 142.0], [1.70716302E12, 385.1666666666667], [1.70716314E12, 269.25]], "isOverall": false, "label": "Get about-25", "isController": false}, {"data": [[1.70716308E12, 87.0], [1.70716302E12, 363.16666666666663], [1.70716314E12, 152.0]], "isOverall": false, "label": "Get about-24", "isController": false}, {"data": [[1.70716308E12, 185.0], [1.70716302E12, 247.16666666666666], [1.70716314E12, 1683.6666666666667]], "isOverall": false, "label": "Get about-27", "isController": false}, {"data": [[1.70716308E12, 687.3333333333334], [1.70716302E12, 200.0], [1.70716314E12, 439.0]], "isOverall": false, "label": "Get about-26", "isController": false}, {"data": [[1.70716308E12, 837.5], [1.7071632E12, 548.0], [1.70716314E12, 540.8]], "isOverall": false, "label": "Get contact Info", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7071632E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.70716302E12, "maxY": 6991.0, "series": [{"data": [[1.70716308E12, 131.16666666666669], [1.70716302E12, 1018.1666666666666]], "isOverall": false, "label": "Homepage-10", "isController": false}, {"data": [[1.70716308E12, 292.66666666666663], [1.70716302E12, 83.5]], "isOverall": false, "label": "Homepage-11", "isController": false}, {"data": [[1.70716308E12, 10.0], [1.70716314E12, 5.166666666666667]], "isOverall": false, "label": "Get Career Info", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-32", "isController": false}, {"data": [[1.70716308E12, 108.49999999999999], [1.70716302E12, 13.333333333333334]], "isOverall": false, "label": "Homepage-33", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-30", "isController": false}, {"data": [[1.70716308E12, 19.5], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-31", "isController": false}, {"data": [[1.70716308E12, 20.666666666666668], [1.70716314E12, 74.5]], "isOverall": false, "label": "Get Career Info-9", "isController": false}, {"data": [[1.70716308E12, 23.5], [1.70716314E12, 46.33333333333333]], "isOverall": false, "label": "Get Career Info-8", "isController": false}, {"data": [[1.70716308E12, 15.0], [1.70716314E12, 65.0]], "isOverall": false, "label": "Get Career Info-7", "isController": false}, {"data": [[1.70716308E12, 468.44444444444446], [1.70716302E12, 1513.1666666666665], [1.70716314E12, 3375.6666666666665]], "isOverall": false, "label": "Get about-3", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 215.83333333333334], [1.70716314E12, 49.2]], "isOverall": false, "label": "Get about-54", "isController": false}, {"data": [[1.70716308E12, 527.0], [1.70716302E12, 2140.0833333333335], [1.70716314E12, 1535.0]], "isOverall": false, "label": "Get about-2", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 246.33333333333334], [1.70716314E12, 138.8]], "isOverall": false, "label": "Get about-53", "isController": false}, {"data": [[1.70716308E12, 104.16666666666667], [1.7071632E12, 34.0], [1.70716314E12, 6.199999999999999]], "isOverall": false, "label": "Get contact Info-9", "isController": false}, {"data": [[1.70716308E12, 123.8], [1.70716302E12, 33.0], [1.70716314E12, 2179.0]], "isOverall": false, "label": "Get about-5", "isController": false}, {"data": [[1.70716308E12, 405.0], [1.70716302E12, 351.83333333333337], [1.70716314E12, 95.8]], "isOverall": false, "label": "Get about-56", "isController": false}, {"data": [[1.70716308E12, 2124.2], [1.70716302E12, 443.75], [1.70716314E12, 2320.666666666667]], "isOverall": false, "label": "Get about-4", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 43.166666666666664], [1.70716314E12, 86.8]], "isOverall": false, "label": "Get about-55", "isController": false}, {"data": [[1.70716308E12, 45.2], [1.70716302E12, 89.5], [1.70716314E12, 1649.0]], "isOverall": false, "label": "Get about-7", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 913.6666666666667], [1.70716314E12, 277.8]], "isOverall": false, "label": "Get about-58", "isController": false}, {"data": [[1.70716308E12, 67.83333333333334], [1.7071632E12, 36.0], [1.70716314E12, 49.0]], "isOverall": false, "label": "Get contact Info-6", "isController": false}, {"data": [[1.70716308E12, 104.16666666666667], [1.70716302E12, 59.83333333333333]], "isOverall": false, "label": "Get about-6", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 473.0], [1.70716314E12, 287.2]], "isOverall": false, "label": "Get about-57", "isController": false}, {"data": [[1.70716308E12, 61.33333333333333], [1.7071632E12, 35.0], [1.70716314E12, 42.4]], "isOverall": false, "label": "Get contact Info-5", "isController": false}, {"data": [[1.70716308E12, 77.8], [1.70716302E12, 17.166666666666664], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-9", "isController": false}, {"data": [[1.70716308E12, 227.33333333333334], [1.7071632E12, 0.0], [1.70716314E12, 263.4]], "isOverall": false, "label": "Get contact Info-8", "isController": false}, {"data": [[1.70716308E12, 78.6], [1.70716302E12, 86.83333333333334], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-8", "isController": false}, {"data": [[1.70716308E12, 234.0], [1.7071632E12, 29.0], [1.70716314E12, 24.4]], "isOverall": false, "label": "Get contact Info-7", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 188.83333333333334]], "isOverall": false, "label": "Homepage-29", "isController": false}, {"data": [[1.70716308E12, 23.666666666666664], [1.70716314E12, 58.166666666666664]], "isOverall": false, "label": "Get Career Info-6", "isController": false}, {"data": [[1.70716308E12, 27.5], [1.70716314E12, 87.16666666666666]], "isOverall": false, "label": "Get Career Info-5", "isController": false}, {"data": [[1.70716308E12, 116.16666666666667], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-27", "isController": false}, {"data": [[1.70716308E12, 15.333333333333332], [1.70716314E12, 66.83333333333333]], "isOverall": false, "label": "Get Career Info-4", "isController": false}, {"data": [[1.70716308E12, 75.5], [1.70716302E12, 23.666666666666668]], "isOverall": false, "label": "Homepage-28", "isController": false}, {"data": [[1.70716308E12, 10.833333333333332], [1.70716314E12, 24.666666666666668]], "isOverall": false, "label": "Get Career Info-3", "isController": false}, {"data": [[1.70716308E12, 32.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-25", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 334.8]], "isOverall": false, "label": "Get about-50", "isController": false}, {"data": [[1.70716308E12, 20.5], [1.70716314E12, 60.33333333333333]], "isOverall": false, "label": "Get Career Info-2", "isController": false}, {"data": [[1.70716308E12, 145.66666666666669], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-26", "isController": false}, {"data": [[1.70716308E12, 11.666666666666666], [1.70716314E12, 44.83333333333333]], "isOverall": false, "label": "Get Career Info-1", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-23", "isController": false}, {"data": [[1.70716308E12, 572.75], [1.70716302E12, 989.9166666666666], [1.70716314E12, 4354.5]], "isOverall": false, "label": "Get about-1", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-52", "isController": false}, {"data": [[1.70716308E12, 10.0], [1.70716314E12, 5.166666666666667]], "isOverall": false, "label": "Get Career Info-0", "isController": false}, {"data": [[1.70716308E12, 30.5], [1.70716302E12, 49.83333333333333]], "isOverall": false, "label": "Homepage-24", "isController": false}, {"data": [[1.70716308E12, 638.6363636363635], [1.70716302E12, 583.1666666666667], [1.70716314E12, 6991.0]], "isOverall": false, "label": "Get about-0", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 121.0]], "isOverall": false, "label": "Get about-51", "isController": false}, {"data": [[1.70716308E12, 47.0], [1.70716302E12, 20.166666666666668]], "isOverall": false, "label": "Homepage-21", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-22", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-20", "isController": false}, {"data": [[1.70716308E12, 36.75], [1.70716302E12, 15.0], [1.70716314E12, 33.0]], "isOverall": false, "label": "Get about", "isController": false}, {"data": [[1.70716308E12, 57.16666666666667], [1.7071632E12, 32.0], [1.70716314E12, 14.0]], "isOverall": false, "label": "Get contact Info-2", "isController": false}, {"data": [[1.70716308E12, 482.12500000000006], [1.7071632E12, 240.75], [1.70716314E12, 492.9000000000001]], "isOverall": false, "label": "Get contact Info-1", "isController": false}, {"data": [[1.70716308E12, 81.0], [1.7071632E12, 34.0], [1.70716314E12, 41.2]], "isOverall": false, "label": "Get contact Info-4", "isController": false}, {"data": [[1.70716308E12, 82.5], [1.7071632E12, 34.0], [1.70716314E12, 13.6]], "isOverall": false, "label": "Get contact Info-3", "isController": false}, {"data": [[1.70716308E12, 558.1666666666667], [1.7071632E12, 196.0], [1.70716314E12, 446.65]], "isOverall": false, "label": "Get contact Info-0", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 33.0]], "isOverall": false, "label": "Homepage-18", "isController": false}, {"data": [[1.70716308E12, 21.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-19", "isController": false}, {"data": [[1.70716308E12, 25.833333333333332], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-16", "isController": false}, {"data": [[1.70716308E12, 215.0], [1.70716302E12, 33.0]], "isOverall": false, "label": "Homepage-17", "isController": false}, {"data": [[1.70716308E12, 140.33333333333334], [1.70716302E12, 39.0]], "isOverall": false, "label": "Homepage-14", "isController": false}, {"data": [[1.70716308E12, 54.0], [1.70716302E12, 355.3333333333333]], "isOverall": false, "label": "Homepage-15", "isController": false}, {"data": [[1.70716308E12, 315.8333333333333], [1.70716302E12, 692.0]], "isOverall": false, "label": "Homepage-12", "isController": false}, {"data": [[1.70716308E12, 399.3333333333333], [1.70716302E12, 575.0]], "isOverall": false, "label": "Homepage-13", "isController": false}, {"data": [[1.70716308E12, 16.666666666666664], [1.70716314E12, 5.333333333333334]], "isOverall": false, "label": "Get Career Info-27", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 24.6]], "isOverall": false, "label": "Get contact Info-23", "isController": false}, {"data": [[1.70716308E12, 119.33333333333334], [1.70716314E12, 321.6666666666667]], "isOverall": false, "label": "Get Career Info-28", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 32.6]], "isOverall": false, "label": "Get contact Info-24", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-29", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 26.8]], "isOverall": false, "label": "Get contact Info-21", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-22", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 25.0]], "isOverall": false, "label": "Homepage-50", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-23", "isController": false}, {"data": [[1.70716308E12, 132.66666666666666], [1.70716302E12, 21.166666666666664]], "isOverall": false, "label": "Homepage-51", "isController": false}, {"data": [[1.70716308E12, 5.166666666666667], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-24", "isController": false}, {"data": [[1.70716308E12, 30.0], [1.7071632E12, 0.0], [1.70716314E12, 41.8]], "isOverall": false, "label": "Get contact Info-20", "isController": false}, {"data": [[1.70716308E12, 12.0], [1.70716314E12, 55.166666666666664]], "isOverall": false, "label": "Get Career Info-25", "isController": false}, {"data": [[1.70716308E12, 16.833333333333332], [1.70716314E12, 119.33333333333333]], "isOverall": false, "label": "Get Career Info-26", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 321.0], [1.70716314E12, 36.2]], "isOverall": false, "label": "Get about-39", "isController": false}, {"data": [[1.70716308E12, 165.83333333333331], [1.70716314E12, 313.33333333333337]], "isOverall": false, "label": "Get Career Info-20", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-21", "isController": false}, {"data": [[1.70716308E12, 11.833333333333332], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-29", "isController": false}, {"data": [[1.70716308E12, 8.333333333333332], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-22", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-27", "isController": false}, {"data": [[1.70716308E12, 5.166666666666666], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-28", "isController": false}, {"data": [[1.70716308E12, 738.1666666666666], [1.7071632E12, 231.0], [1.70716314E12, 471.2]], "isOverall": false, "label": "Get contact Info-25", "isController": false}, {"data": [[1.70716308E12, 9.666666666666666], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-26", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 483.99999999999994]], "isOverall": false, "label": "Get about-32", "isController": false}, {"data": [[1.70716308E12, 80.0], [1.70716302E12, 0.0], [1.70716314E12, 555.0]], "isOverall": false, "label": "Get about-31", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 102.16666666666666], [1.70716314E12, 250.00000000000003]], "isOverall": false, "label": "Get about-34", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 120.5]], "isOverall": false, "label": "Get about-33", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 247.66666666666666], [1.70716314E12, 426.8]], "isOverall": false, "label": "Get about-36", "isController": false}, {"data": [[1.70716308E12, 95.5], [1.70716302E12, 26.666666666666668]], "isOverall": false, "label": "Homepage-9", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 509.6666666666667], [1.70716314E12, 224.2]], "isOverall": false, "label": "Get about-35", "isController": false}, {"data": [[1.70716308E12, 607.2], [1.70716302E12, 279.0], [1.70716314E12, 62.5]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.70716308E12, 134.83333333333334], [1.70716302E12, 56.5]], "isOverall": false, "label": "Homepage-8", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 582.75]], "isOverall": false, "label": "Get about-38", "isController": false}, {"data": [[1.70716308E12, 261.16666666666663], [1.70716302E12, 451.3333333333333]], "isOverall": false, "label": "Homepage-7", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 975.1666666666667], [1.70716314E12, 340.75]], "isOverall": false, "label": "Get about-37", "isController": false}, {"data": [[1.70716308E12, 178.0], [1.70716302E12, 503.0]], "isOverall": false, "label": "Homepage-6", "isController": false}, {"data": [[1.70716308E12, 210.83333333333334], [1.70716302E12, 168.33333333333331]], "isOverall": false, "label": "Homepage-5", "isController": false}, {"data": [[1.70716308E12, 61.0], [1.70716302E12, 396.5]], "isOverall": false, "label": "Homepage-4", "isController": false}, {"data": [[1.70716308E12, 500.1666666666667], [1.70716302E12, 503.33333333333337]], "isOverall": false, "label": "Homepage-49", "isController": false}, {"data": [[1.70716308E12, 182.66666666666666], [1.70716302E12, 335.3333333333333]], "isOverall": false, "label": "Homepage-3", "isController": false}, {"data": [[1.70716308E12, 628.3333333333334], [1.70716302E12, 344.50000000000006]], "isOverall": false, "label": "Homepage-2", "isController": false}, {"data": [[1.70716308E12, 122.0], [1.70716302E12, 273.6666666666667]], "isOverall": false, "label": "Homepage-47", "isController": false}, {"data": [[1.70716308E12, 632.6666666666667], [1.70716302E12, 474.49999999999994]], "isOverall": false, "label": "Homepage-1", "isController": false}, {"data": [[1.70716308E12, 194.66666666666666], [1.70716302E12, 413.1666666666667]], "isOverall": false, "label": "Homepage-48", "isController": false}, {"data": [[1.70716308E12, 57.416666666666664], [1.70716302E12, 167.0]], "isOverall": false, "label": "Homepage-0", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-45", "isController": false}, {"data": [[1.70716308E12, 161.0], [1.70716302E12, 421.0], [1.70716314E12, 207.0]], "isOverall": false, "label": "Get about-30", "isController": false}, {"data": [[1.70716308E12, 135.5], [1.70716302E12, 250.33333333333334]], "isOverall": false, "label": "Homepage-46", "isController": false}, {"data": [[1.70716308E12, 171.33333333333331], [1.70716302E12, 42.0]], "isOverall": false, "label": "Homepage-43", "isController": false}, {"data": [[1.70716308E12, 1078.0], [1.7071632E12, 0.0], [1.70716314E12, 621.4]], "isOverall": false, "label": "Get contact Info-12", "isController": false}, {"data": [[1.70716308E12, 145.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-44", "isController": false}, {"data": [[1.70716308E12, 183.83333333333331], [1.7071632E12, 326.0], [1.70716314E12, 433.8]], "isOverall": false, "label": "Get contact Info-13", "isController": false}, {"data": [[1.70716308E12, 597.8333333333334], [1.70716302E12, 909.6666666666667]], "isOverall": false, "label": "Homepage-41", "isController": false}, {"data": [[1.70716308E12, 75.33333333333334], [1.7071632E12, 0.0], [1.70716314E12, 30.4]], "isOverall": false, "label": "Get contact Info-10", "isController": false}, {"data": [[1.70716308E12, 96.16666666666667], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-42", "isController": false}, {"data": [[1.70716308E12, 415.6666666666667], [1.7071632E12, 0.0], [1.70716314E12, 42.8]], "isOverall": false, "label": "Get contact Info-11", "isController": false}, {"data": [[1.70716308E12, 28.166666666666664], [1.70716302E12, 24.333333333333332]], "isOverall": false, "label": "Homepage-40", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-30", "isController": false}, {"data": [[1.70716308E12, 365.5], [1.7071632E12, 412.0], [1.70716314E12, 722.2]], "isOverall": false, "label": "Get contact Info-18", "isController": false}, {"data": [[1.70716308E12, 37.166666666666664], [1.7071632E12, 0.0], [1.70716314E12, 32.4]], "isOverall": false, "label": "Get contact Info-19", "isController": false}, {"data": [[1.70716308E12, 675.6666666666666], [1.7071632E12, 0.0], [1.70716314E12, 295.4]], "isOverall": false, "label": "Get contact Info-16", "isController": false}, {"data": [[1.70716308E12, 985.8333333333333], [1.7071632E12, 342.0], [1.70716314E12, 769.0]], "isOverall": false, "label": "Get contact Info-17", "isController": false}, {"data": [[1.70716308E12, 55.0], [1.7071632E12, 0.0], [1.70716314E12, 21.6]], "isOverall": false, "label": "Get contact Info-14", "isController": false}, {"data": [[1.70716308E12, 211.0], [1.7071632E12, 0.0], [1.70716314E12, 5.800000000000001]], "isOverall": false, "label": "Get contact Info-15", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 614.3333333333333], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-43", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 219.33333333333331], [1.70716314E12, 289.2]], "isOverall": false, "label": "Get about-42", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 48.333333333333336], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-45", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-44", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 371.33333333333337], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-47", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 173.00000000000003]], "isOverall": false, "label": "Get about-46", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 325.8]], "isOverall": false, "label": "Get about-49", "isController": false}, {"data": [[1.70716308E12, 487.0], [1.70716302E12, 802.6666666666667], [1.70716314E12, 1280.2]], "isOverall": false, "label": "Get about-48", "isController": false}, {"data": [[1.70716308E12, 50.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-38", "isController": false}, {"data": [[1.70716308E12, 40.16666666666667], [1.70716302E12, 45.5]], "isOverall": false, "label": "Homepage-39", "isController": false}, {"data": [[1.70716308E12, 115.5], [1.70716302E12, 294.3333333333333]], "isOverall": false, "label": "Homepage-36", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-37", "isController": false}, {"data": [[1.70716308E12, 131.16666666666669], [1.70716302E12, 27.833333333333332]], "isOverall": false, "label": "Homepage-34", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 498.50000000000006], [1.70716314E12, 319.2]], "isOverall": false, "label": "Get about-41", "isController": false}, {"data": [[1.70716308E12, 28.999999999999996], [1.70716302E12, 0.0]], "isOverall": false, "label": "Homepage-35", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 191.83333333333331], [1.70716314E12, 170.60000000000002]], "isOverall": false, "label": "Get about-40", "isController": false}, {"data": [[1.70716308E12, 1509.0], [1.70716302E12, 392.5], [1.70716314E12, 2303.0]], "isOverall": false, "label": "Get about-18", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 6.5], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-17", "isController": false}, {"data": [[1.70716308E12, 222.2], [1.70716302E12, 0.0], [1.70716314E12, 2131.0]], "isOverall": false, "label": "Get about-19", "isController": false}, {"data": [[1.70716308E12, 97.83333333333334], [1.70716302E12, 314.0]], "isOverall": false, "label": "Get about-10", "isController": false}, {"data": [[1.70716308E12, 340.6], [1.70716302E12, 433.83333333333337], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-12", "isController": false}, {"data": [[1.70716308E12, 61.4], [1.70716302E12, 461.6666666666667], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-11", "isController": false}, {"data": [[1.70716308E12, 606.8], [1.70716302E12, 1449.8333333333333], [1.70716314E12, 983.0]], "isOverall": false, "label": "Get about-14", "isController": false}, {"data": [[1.70716308E12, 1602.2], [1.70716302E12, 853.1666666666666], [1.70716314E12, 877.0]], "isOverall": false, "label": "Get about-13", "isController": false}, {"data": [[1.70716308E12, 209.25], [1.70716302E12, 846.1666666666666], [1.70716314E12, 1021.0]], "isOverall": false, "label": "Get about-16", "isController": false}, {"data": [[1.70716308E12, 1133.0], [1.70716302E12, 1062.1666666666665], [1.70716314E12, 483.0]], "isOverall": false, "label": "Get about-15", "isController": false}, {"data": [[1.70716308E12, 10.333333333333334], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-16", "isController": false}, {"data": [[1.70716308E12, 48.0], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-34", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-17", "isController": false}, {"data": [[1.70716308E12, 5.166666666666666], [1.7071632E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info-35", "isController": false}, {"data": [[1.70716308E12, 19.333333333333332], [1.70716302E12, 307.3333333333333]], "isOverall": false, "label": "Homepage", "isController": false}, {"data": [[1.70716308E12, 4.666666666666666], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-18", "isController": false}, {"data": [[1.70716308E12, 335.0], [1.7071632E12, 0.0], [1.70716314E12, 272.8]], "isOverall": false, "label": "Get contact Info-32", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-19", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.7071632E12, 235.0], [1.70716314E12, 273.0]], "isOverall": false, "label": "Get contact Info-33", "isController": false}, {"data": [[1.70716308E12, 241.0], [1.70716314E12, 466.1666666666667]], "isOverall": false, "label": "Get Career Info-12", "isController": false}, {"data": [[1.70716308E12, 215.0], [1.7071632E12, 34.0], [1.70716314E12, 40.2]], "isOverall": false, "label": "Get contact Info-30", "isController": false}, {"data": [[1.70716308E12, 121.33333333333334], [1.70716314E12, 184.66666666666669]], "isOverall": false, "label": "Get Career Info-13", "isController": false}, {"data": [[1.70716308E12, 48.0], [1.7071632E12, 20.0], [1.70716314E12, 36.4]], "isOverall": false, "label": "Get contact Info-31", "isController": false}, {"data": [[1.70716308E12, 10.666666666666668], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get Career Info-14", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716314E12, 13.666666666666666]], "isOverall": false, "label": "Get Career Info-15", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 821.5], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-29", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 612.75]], "isOverall": false, "label": "Get about-28", "isController": false}, {"data": [[1.70716308E12, 17.333333333333336], [1.70716314E12, 124.33333333333334]], "isOverall": false, "label": "Get Career Info-10", "isController": false}, {"data": [[1.70716308E12, 21.666666666666664], [1.70716314E12, 72.0]], "isOverall": false, "label": "Get Career Info-11", "isController": false}, {"data": [[1.70716308E12, 238.6], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-21", "isController": false}, {"data": [[1.70716308E12, 37.2], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-20", "isController": false}, {"data": [[1.70716308E12, 268.0], [1.70716302E12, 370.8333333333333], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-23", "isController": false}, {"data": [[1.70716308E12, 35.4], [1.70716302E12, 0.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-22", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 105.0], [1.70716314E12, 113.5]], "isOverall": false, "label": "Get about-25", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 170.16666666666666], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get about-24", "isController": false}, {"data": [[1.70716308E12, 0.0], [1.70716302E12, 0.0], [1.70716314E12, 1584.0]], "isOverall": false, "label": "Get about-27", "isController": false}, {"data": [[1.70716308E12, 58.0], [1.70716302E12, 27.5], [1.70716314E12, 340.66666666666663]], "isOverall": false, "label": "Get about-26", "isController": false}, {"data": [[1.70716308E12, 205.66666666666666], [1.7071632E12, 30.0], [1.70716314E12, 0.0]], "isOverall": false, "label": "Get contact Info", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7071632E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 14.0, "minX": 1.70716302E12, "maxY": 40619.0, "series": [{"data": [[1.70716308E12, 40619.0], [1.7071632E12, 3988.0], [1.70716302E12, 39862.0], [1.70716314E12, 36482.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.70716308E12, 3120.6000000000004], [1.7071632E12, 1405.8000000000002], [1.70716302E12, 4685.5], [1.70716314E12, 4813.300000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.70716308E12, 29033.609999999997], [1.7071632E12, 3988.0], [1.70716302E12, 20397.650000000114], [1.70716314E12, 33679.77]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.70716308E12, 4558.65], [1.7071632E12, 1943.7999999999993], [1.70716302E12, 8318.75], [1.70716314E12, 8572.299999999985]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.70716308E12, 14.0], [1.7071632E12, 20.0], [1.70716302E12, 16.0], [1.70716314E12, 15.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.70716308E12, 350.0], [1.7071632E12, 58.0], [1.70716302E12, 647.0], [1.70716314E12, 260.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7071632E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 25.0, "minX": 1.0, "maxY": 35393.5, "series": [{"data": [[2.0, 1254.5], [33.0, 339.0], [32.0, 156.5], [34.0, 600.5], [36.0, 25.0], [39.0, 74.0], [42.0, 50.0], [3.0, 3988.0], [4.0, 1762.5], [5.0, 3958.0], [6.0, 3028.5], [7.0, 1917.5], [8.0, 2268.5], [9.0, 2069.5], [10.0, 2089.0], [11.0, 1013.0], [12.0, 1040.0], [13.0, 382.0], [14.0, 274.5], [15.0, 387.0], [16.0, 259.0], [1.0, 2094.5], [17.0, 448.0], [18.0, 237.5], [19.0, 330.0], [20.0, 633.5], [21.0, 172.5], [22.0, 68.0], [23.0, 549.0], [24.0, 198.0], [25.0, 66.5], [26.0, 679.5], [27.0, 261.0], [28.0, 27.5], [29.0, 53.0], [30.0, 102.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 35393.5], [5.0, 12479.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 42.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 1451.0, "series": [{"data": [[2.0, 451.0], [33.0, 91.0], [32.0, 0.0], [34.0, 158.0], [36.0, 0.0], [39.0, 0.0], [42.0, 0.0], [3.0, 661.0], [4.0, 467.0], [5.0, 1451.0], [6.0, 574.5], [7.0, 409.0], [8.0, 594.0], [9.0, 484.5], [10.0, 330.0], [11.0, 419.0], [12.0, 251.0], [13.0, 105.0], [14.0, 0.0], [15.0, 134.0], [16.0, 0.0], [1.0, 524.5], [17.0, 93.0], [18.0, 82.5], [19.0, 62.0], [20.0, 191.5], [21.0, 25.0], [22.0, 0.0], [23.0, 181.5], [24.0, 68.5], [25.0, 56.5], [26.0, 239.0], [27.0, 86.0], [28.0, 0.0], [29.0, 0.0], [30.0, 74.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 659.5], [5.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 42.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.70716296E12, "maxY": 17.016666666666666, "series": [{"data": [[1.70716308E12, 17.016666666666666], [1.7071632E12, 0.6833333333333333], [1.70716302E12, 12.066666666666666], [1.70716296E12, 0.03333333333333333], [1.70716314E12, 9.4]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7071632E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.70716302E12, "maxY": 10.15, "series": [{"data": [[1.70716308E12, 10.15], [1.7071632E12, 0.3], [1.70716302E12, 9.416666666666666], [1.70716314E12, 4.366666666666666]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: javax.net.ssl.SSLHandshakeException", "isController": false}, {"data": [[1.70716308E12, 6.283333333333333], [1.7071632E12, 0.4166666666666667], [1.70716302E12, 2.4833333333333334], [1.70716314E12, 5.766666666666667]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7071632E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.70716302E12, "maxY": 0.4, "series": [{"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-6-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-48-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-23-success", "isController": false}, {"data": [[1.70716308E12, 0.03333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.06666666666666667]], "isOverall": false, "label": "Get about-31-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-35-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-24-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-5-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-37-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-27-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-31-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-29-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Get about-6-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-22-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-35-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-33-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-14-success", "isController": false}, {"data": [[1.70716308E12, 0.4], [1.7071632E12, 0.06666666666666667], [1.70716314E12, 0.3333333333333333]], "isOverall": false, "label": "Get contact Info-1-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-16-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-18-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-39-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-20-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-17-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-25-success", "isController": false}, {"data": [[1.70716308E12, 0.06666666666666667], [1.70716302E12, 0.03333333333333333], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-success", "isController": false}, {"data": [[1.70716308E12, 0.03333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.06666666666666667]], "isOverall": false, "label": "Get about-25-success", "isController": false}, {"data": [[1.70716308E12, 0.2], [1.70716302E12, 0.2]], "isOverall": false, "label": "Homepage-2-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-47-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-58-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-53-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-28-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-13-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-14-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-44-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-13-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-6-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-9-success", "isController": false}, {"data": [[1.70716308E12, 0.03333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.06666666666666667]], "isOverall": false, "label": "Get about-29-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-3-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-10-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-43-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-10-success", "isController": false}, {"data": [[1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Test-failure", "isController": true}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-49-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-32-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-19-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-4-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-38-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-7-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-21-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-19-success", "isController": false}, {"data": [[1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-1-failure", "isController": false}, {"data": [[1.70716308E12, 0.03333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.06666666666666667]], "isOverall": false, "label": "Get about-30-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-15-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-22-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-5-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-36-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-34-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-28-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-21-success", "isController": false}, {"data": [[1.70716308E12, 0.4], [1.7071632E12, 0.06666666666666667], [1.70716314E12, 0.3333333333333333]], "isOverall": false, "label": "Get contact Info-0-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-17-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-9-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-9-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-51-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-49-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-41-success", "isController": false}, {"data": [[1.70716308E12, 0.2], [1.70716302E12, 0.2]], "isOverall": false, "label": "Homepage-1-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-30-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-57-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-13-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-54-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-24-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-29-success", "isController": false}, {"data": [[1.70716308E12, 0.03333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.06666666666666667]], "isOverall": false, "label": "Get about-28-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-28-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-12-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-46-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-30-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-13-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-21-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-8-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-45-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-5-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-25-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-42-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-4-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-12-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-50-success", "isController": false}, {"data": [[1.70716308E12, 0.18333333333333332], [1.70716302E12, 0.2], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-2-success", "isController": false}, {"data": [[1.70716308E12, 0.06666666666666667], [1.70716302E12, 0.1], [1.70716314E12, 0.03333333333333333]], "isOverall": false, "label": "Get about-16-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-22-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-18-success", "isController": false}, {"data": [[1.70716308E12, 0.03333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.06666666666666667]], "isOverall": false, "label": "Get about-33-success", "isController": false}, {"data": [[1.70716308E12, 0.06666666666666667], [1.70716302E12, 0.03333333333333333], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-18-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-25-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-33-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-39-success", "isController": false}, {"data": [[1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-18-failure", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-8-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-3-success", "isController": false}, {"data": [[1.70716308E12, 0.16666666666666666], [1.70716302E12, 0.13333333333333333], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get about-4-success", "isController": false}, {"data": [[1.70716308E12, 0.18333333333333332], [1.70716302E12, 0.2], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-0-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-8-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-21-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-14-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-29-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-20-success", "isController": false}, {"data": [[1.70716308E12, 0.03333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.06666666666666667]], "isOverall": false, "label": "Get about-37-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-42-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-50-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-0-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-48-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-35-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-16-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-8-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Get about-10-success", "isController": false}, {"data": [[1.70716308E12, 0.06666666666666667], [1.70716302E12, 0.1], [1.70716314E12, 0.03333333333333333]], "isOverall": false, "label": "Get about-24-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-56-success", "isController": false}, {"data": [[1.70716308E12, 0.2], [1.70716302E12, 0.2]], "isOverall": false, "label": "Homepage-0-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-45-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-11-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-16-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-27-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-31-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-19-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-23-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-1-success", "isController": false}, {"data": [[1.70716308E12, 0.05], [1.70716302E12, 0.1], [1.70716314E12, 0.05]], "isOverall": false, "label": "Get about-27-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-15-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-12-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-20-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-41-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-51-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-11-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-5-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-12-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-46-success", "isController": false}, {"data": [[1.70716308E12, 0.15], [1.70716302E12, 0.2], [1.70716314E12, 0.05]], "isOverall": false, "label": "Get about-3-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-4-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-7-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-26-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-24-success", "isController": false}, {"data": [[1.70716308E12, 0.03333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.06666666666666667]], "isOverall": false, "label": "Get about-32-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-success", "isController": false}, {"data": [[1.70716308E12, 0.03333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.06666666666666667]], "isOverall": false, "label": "Get about-34-success", "isController": false}, {"data": [[1.70716308E12, 0.13333333333333333], [1.70716302E12, 0.2], [1.70716314E12, 0.05]], "isOverall": false, "label": "Get about-1-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-17-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-9-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-36-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-26-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-30-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-23-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-7-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-40-success", "isController": false}, {"data": [[1.70716308E12, 0.03333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.06666666666666667]], "isOverall": false, "label": "Get about-38-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-7-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-43-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-19-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-20-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-23-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-15-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-2-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-55-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-17-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-34-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-15-success", "isController": false}, {"data": [[1.70716308E12, 0.05], [1.70716302E12, 0.1], [1.70716314E12, 0.05]], "isOverall": false, "label": "Get about-26-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-40-success", "isController": false}, {"data": [[1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-failure", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-18-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-44-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-10-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-22-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-32-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-2-success", "isController": false}, {"data": [[1.70716308E12, 0.08333333333333333], [1.70716302E12, 0.1], [1.70716314E12, 0.016666666666666666]], "isOverall": false, "label": "Get about-14-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-27-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-11-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-52-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716314E12, 0.1]], "isOverall": false, "label": "Get Career Info-11-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-6-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.70716302E12, 0.1]], "isOverall": false, "label": "Homepage-3-success", "isController": false}, {"data": [[1.70716308E12, 0.1], [1.7071632E12, 0.016666666666666666], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get contact Info-26-success", "isController": false}, {"data": [[1.70716308E12, 0.016666666666666666], [1.70716302E12, 0.1], [1.70716314E12, 0.08333333333333333]], "isOverall": false, "label": "Get about-47-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7071632E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.70716302E12, "maxY": 16.516666666666666, "series": [{"data": [[1.70716308E12, 16.516666666666666], [1.7071632E12, 0.7166666666666667], [1.70716302E12, 11.916666666666666], [1.70716314E12, 10.183333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.70716314E12, 0.06666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7071632E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

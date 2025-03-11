<template>
  <div id="pollutionChart" style="width:100%;height: 90%"></div>
</template>
  
<script>
import { getProvincePollutedParallel } from "@/request/api";
import { getCityPollutedParallel } from "@/request/api";
export default {
  data() {
    return {
      renderData: []
    };
  },
  props: {
    date: String,
    name: String,
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      getProvincePollutedParallel({
        date: this.date
      }).then(res => {
        this.renderData = res.data;
        this.mapFn();
      });
    },
    initData2() {
      getCityPollutedParallel({
        date: this.date,
        province: this.name,
      }).then(res => {
        this.renderData = res.data;
        this.mapFn();
      });
    },
    mapFn() {
      var mapChart = this.$echarts.getInstanceByDom(
        document.getElementById("pollutionChart")
      );
      // var mapChart = this.$echarts.init(
      //   document.getElementById("pollutionChart")
      // );
      if (mapChart == null) {
        mapChart = this.$echarts.init(
          document.getElementById("pollutionChart")
        );
      }
      // Schema:
      // AQI,PM2.5,PM10,CO,NO2,SO2,O3,
      var dataSH = [
        [1, 91, 45, 125, 0.82, 34, 23, "良"],
        [2, 65, 27, 78, 0.86, 45, 29, "良"],
        [3, 83, 60, 84, 1.09, 73, 27, "良"],
        [4, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
        [5, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
        [6, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
        [7, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
        [8, 89, 65, 78, 0.86, 51, 26, "良"],
        [9, 53, 33, 47, 0.64, 50, 17, "良"],
        [10, 80, 55, 80, 1.01, 75, 24, "良"],
        [11, 117, 81, 124, 1.03, 45, 24, "轻度污染"],
        [12, 99, 71, 142, 1.1, 62, 42, "良"],
        [13, 95, 69, 130, 1.28, 74, 50, "良"],
        [14, 116, 87, 131, 1.47, 84, 40, "轻度污染"],
        [15, 108, 80, 121, 1.3, 85, 37, "轻度污染"],
        [16, 134, 83, 167, 1.16, 57, 43, "轻度污染"],
        [17, 79, 43, 107, 1.05, 59, 37, "良"],
        [18, 71, 46, 89, 0.86, 64, 25, "良"],
        [19, 97, 71, 113, 1.17, 88, 31, "良"],
        [20, 84, 57, 91, 0.85, 55, 31, "良"],
        [21, 87, 63, 101, 0.9, 56, 41, "良"],
        [22, 104, 77, 119, 1.09, 73, 48, "轻度污染"],
        [23, 87, 62, 100, 1, 72, 28, "良"],
        [24, 168, 128, 172, 1.49, 97, 56, "中度污染"],
        [25, 65, 45, 51, 0.74, 39, 17, "良"],
        [26, 39, 24, 38, 0.61, 47, 17, "优"],
        [27, 39, 24, 39, 0.59, 50, 19, "优"],
        [28, 93, 68, 96, 1.05, 79, 29, "良"],
        [29, 188, 143, 197, 1.66, 99, 51, "中度污染"],
        [30, 174, 131, 174, 1.55, 108, 50, "中度污染"],
        [31, 187, 143, 201, 1.39, 89, 53, "中度污染"]
      ];
      var schema = [
        { name: "AQI", index: 0, text: "AQI" },
        { name: "PM2.5", index: 1, text: "PM2.5" },
        { name: "PM10", index: 2, text: "PM10" },
        { name: "CO", index: 3, text: " CO" },
        { name: "NO2", index: 4, text: "NO2" },
        { name: "SO2", index: 5, text: "SO2" },
        { name: "O3", index: 6, text: "O3" },
        { name: "等级", index: 7, text: "等级" }
      ];
      var lineStyle = {
        width: 1.5,
        opacity: 0.5
      };

      var option = {
        backgroundColor: "",
        grid: {
          show: true,
          left: "1%",
          top: "1%",
          right: "1%",
          bottom: "1%"
        },
        tooltip: {
          padding: 10,
          borderWidth: 1
        },
        parallelAxis: [
          {
            dim: 0,
            name: schema[0].text
          },
          { dim: 1, name: schema[1].text },
          { dim: 2, name: schema[2].text },
          { dim: 3, name: schema[3].text },
          { dim: 4, name: schema[4].text },
          { dim: 5, name: schema[5].text },
          { dim: 6, name: schema[6].text },
          {
            dim: 7,
            name: schema[7].text,
            type: "category",
            data: ["优", "良", "轻度污染", "中度污染", "重度污染", "严重污染"]
          }
        ],
        visualMap: {
          show: false,
          min: 0,
          max: 150,
          dimension: 2,
          inRange: {
            color: ["#d94e5d", "#eac736", "#50a3ba"].reverse()
          }
        },
        parallel: {
          left: "5%",
          right: "18%",
          top: 40,
          bottom: 10,
          parallelAxisDefault: {
            type: "value",
            name: "AQI指数",
            nameLocation: "end",
            nameGap: 20,
            nameRotate: 14,
            nameTextStyle: {
              fontSize: 12
            },
            axisLine: {
              lineStyle: {}
            },
            axisTick: {
              lineStyle: {}
            },
            splitLine: {
              show: false
            },
            axisLabel: {}
          }
        },
        series: [
          {
            name: "allProvinces",
            type: "parallel",
            lineStyle: lineStyle,
            data: this.renderData
          }
        ]
      };
      mapChart.setOption(option);

      window.addEventListener("resize", () => {
        // 自动渲染echarts
        mapChart.resize();
        console.log("dataSH", dataSH);
        console.log("this.renderData", this.renderData);
      });
    }
  },
  watch: {
    date: function(newVal, oldVal) {
      console.log(newVal, oldVal);
      if(this.name == '中国'){
        this.initData();
      }
      else{
        this.initData2();
      }
    },
    name: function(){
      if(this.name == '中国'){
        this.initData();
      }
      else{
        this.initData2();
      }
    }
  }
};
</script>
  
<style scoped>
</style>
  
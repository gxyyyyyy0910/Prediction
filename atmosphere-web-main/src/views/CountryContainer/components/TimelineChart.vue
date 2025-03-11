<template>
  <div id="timelineChart" style="width:100%; height: 79%"></div>
</template>
    
<script>
import { getTimeline } from "../../../request/api";
export default {
  data() {
    return {
      renderData: [],
      good: [],
      moderate: [],
      little: [],
      unhelthy: [],
      dangerous: [],
      hazardous: [],
      dates: [],
      year: "2016",
    };
  },
  props: {
    date: String,
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.mapFn();
      getTimeline({
        year: this.year,
      }).then(res => {
        this.renderData = res.data;
        this.good = res.data.good;
        this.moderate = res.data.moderate;
        this.little = res.data.little;
        this.unhealthy = res.data.unhealthy;
        this.dangerous = res.data.dangerous;
        this.hazardous = res.data.hazardous;
        this.dates = res.data.date_list;
        this.mapFn();
      });
    },
    mapFn() {
      var _this = this;
      var myChart = this.$echarts.init(
        document.getElementById("timelineChart")
      );

      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {
          show: false
        },
        grid: {
          show: true,
          left: "0.2%",
          right: "0.2%",
          top: "1%",
          bottom: "1%",
          containLabel: false
        },
        xAxis: {
          show: false,
          type: "category",
          data: this.dates
        },
        yAxis: {
          show: false,
          type: "value",
          max: 34
        },
        dataZoom: [
          {
            orient: "horizontal",
            show: true, //控制滚动条显示隐藏
            realtime: true, //拖动滚动条时是否动态的更新图表数据
            height: 15, //滚动条高度
            start: 0, //滚动条开始位置（共100等份）
            end: this.endValue, //滚动条结束位置
            bottom: "4%",
            zoomLock: true //控制面板是否进行缩放
          },
          {
            type: "inside",
            brushSelect: true,
            start: 0,
            end: 100,
            xAxisIndex: [0]
          }
        ],
        series: [
          {
            name: "优",
            type: "bar",
            stack: "total",
            label: {
              //   show: true
            },
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#55AA00"
            },
            data: this.good
          },
          {
            name: "良",
            type: "bar",
            stack: "total",
            label: {
              //   show: true
            },
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#BBFF00"
            },
            data: this.moderate
          },
          {
            name: "轻度污染",
            type: "bar",
            stack: "total",
            label: {
              //   show: true
            },
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#FFFF00"
            },
            data: this.little
          },
          {
            name: "中度污染",
            type: "bar",
            stack: "total",
            label: {
              //   show: true
            },
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#FFCC22"
            },
            data: this.unhealthy
          },
          {
            name: "重度污染",
            type: "bar",
            stack: "total",
            label: {
              //   show: true
            },
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "OrangeRed"
            },
            data: this.dangerous
          },
          {
            name: "严重污染",
            type: "bar",
            stack: "total",
            label: {
              // show: true
            },
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "Red"
            },
            data: this.hazardous
          }
        ]
      };
      myChart.setOption(option);

      myChart.on("click", function(params) {
        var date = params.name;
        _this.$emit("getDate", date);
      });

      window.addEventListener("resize", () => {
        // 自动渲染echarts
        myChart.resize();
      });
    }
  },
  watch: {
    date: function(newVal, oldVal) {
      console.log(newVal, oldVal);
      console.log("有没有在watch啊data取year");
      this.year = newVal.slice(0,4);
      this.initData();
    },
  }
};
</script>
    
<style scoped>
</style>
    
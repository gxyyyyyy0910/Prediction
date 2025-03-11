<template>
  <div id="ringGauge" style="width:100%;height: 88%;z-index:2"></div>
</template>
    
<script>
import { getProvinceGauge } from "@/request/api";
import { getCityGauge } from "@/request/api";
export default {
  data() {
    return {
      renderData: []
    };
  },
  props: {
    date: String,
    name: String,
    hovername: String
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      getProvinceGauge({
        date: this.date,
        province: this.hovername,
      }).then(res => {
        // console.log("平行坐标的res", res.data);
        this.renderData = res.data;
        this.mapFn();
      });
    },
    initData2() {
      getCityGauge({
        date: this.date,
        city: this.hovername,
      }).then(res => {
        // console.log("平行坐标的res", res.data);
        this.renderData = res.data;
        this.mapFn();
      });
    },
    mapFn() {
      var _this = this;
      var myChart = this.$echarts.getInstanceByDom(
        document.getElementById("ringGauge")
      );
      if (myChart == null) {
        myChart = this.$echarts.init(document.getElementById("ringGauge"));
      }
      // Schema:
      // PM2.5,PM10,CO,NO2,SO2,O3,
      var gaugeData = [
        {
          value: (this.renderData[1] / 150) * 100,
          name: "PM2.5",
          title: {
            offsetCenter: ["-200%", "-70%"]
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["-200%", "-45%"],
            formatter: function() {
              return _this.renderData[1].toFixed(1);
            }
          }
        },
        {
          value: (this.renderData[2] / 350) * 100,
          name: "PM10",
          title: {
            offsetCenter: ["-200%", "0%"]
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["-200%", "25%"],
            formatter: function() {
              return _this.renderData[2].toFixed(1);
            }
          }
        },
        {
          value: (this.renderData[3] / 800) * 100,
          name: "SO2",
          title: {
            offsetCenter: ["-200%", "70%"]
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["-200%", "95%"],
            formatter: function() {
              return _this.renderData[3].toFixed(1);
            }
          }
        },
        {
          value: (this.renderData[4] / 280) * 100,
          name: "NO2",
          title: {
            offsetCenter: ["200%", "-70%"]
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["200%", "-45%"],
            formatter: function() {
              return _this.renderData[4].toFixed(1);
            }
          }
        },
        {
          value: (this.renderData[5] / 24) * 100,
          name: "CO",
          title: {
            offsetCenter: ["200%", "0%"]
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["200%", "25%"],
            formatter: function() {
              return _this.renderData[5].toFixed(1);
            }
          }
        },
        {
          value: (this.renderData[6] / 265) * 100,
          name: "O3",
          title: {
            offsetCenter: ["200%", "70%"]
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["200%", "95%"],
            formatter: function() {
              return _this.renderData[6].toFixed(1);
            }
          }
        }
      ];

      var option = {
        grid: {
          show: false,
          left: "0.2%",
          right: "0.2%",
          top: "1%",
          bottom: "1%",
          containLabel: false
        },
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              itemStyle: {
                borderWidth: 1,
                borderColor: "#464646"
              }
            },
            axisLine: {
              lineStyle: {
                width: 35
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              distance: 50
            },
            data: gaugeData,
            title: {
              fontSize: 14
            },
            detail: {
              width: 30,
              height: 10,
              fontSize: 18,
              color: "inherit",
              borderColor: "inherit",
              borderRadius: 25,
              borderWidth: 1
            }
          }
        ]
      };
      myChart.setOption(option);

      myChart.on("click", function(params) {
        // var date = params.name;
        console.log(params);
        // _this.$emit("getDate", date);
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
      console.log("有没有在watch啊");
      if(this.name == '中国'){
        this.initData();
      }
      else{
        this.initData2();
      }
    },
    hovername: function(newVal, oldVal) {
      console.log(newVal, oldVal);
      console.log("有没有在watch啊");
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
    
<template>
  <div ref="char" class="char"></div>
</template>

<script>
import { getProvinceMap } from "../../../request/api";
import * as echarts from "echarts";
import china from "@/assets/China.json";
echarts.registerMap("china", china);
let pinyin = require("js-pinyin");
pinyin.setOptions({ checkPolyphone: true, charCase: 1 });
export default {
  name: "China",
  data() {
    return {
      titledata: [],
      citydata: [],
      resultdata0: [],
      yMax: 1000,
      dataShadow: [],
      option: {
        tooltip: {
          trigger: "item"
        },
        legend: {
          show: false
        },
        grid: {
          // 仅仅控制条形图的位置
          show: false,
          containLabel: false,
          top: "center",
          right: 0,
          width: "20%",
          height: "40%"
        },
        visualMap: {
          show:false,
          type: "piecewise",
          right: 530,
          top: 400
        },
        toolbox: {
          show: false
        },
        xAxis: [
          {
            type: "value",
            position: "top",
            inside: false,
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            margin: 10
          }
        ],
        yAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              show: false
            },
            axisLabel: {
              align: "right",
              color: "#000",
              margin: 10,
              showMaxLabel: true
            },
            axisTick: {
              show: false
            },
            data: this.titledata
          }
        ],
        series: [
          {
            name: "数值",
            type: "map",
            mapType: "china",
            left: "8%",
            right: "8%",
            top: "15%",
            bottom: "8%",
            roam: "move",
            mapValueCalculation: "sum",
            zoom: 1,
            selectedMode: false,
            showLegendSymbol: false,
            label: {
              normal: {
                textStyle: {
                  color: "#000000",
                  fontSize: 8
                },
                show: true
              },
              emphasis: {
                textStyle: {
                  color: "#234EA5"
                }
              }
            },
            itemStyle: {
              normal: {
                areaColor: "#ef6548",
                borderColor: "#d7301f"
              },
              emphasis: {
                areaColor: "#fdbb84"
              }
            },
            data: this.citydata
          }
        ]
      }
    };
  },
  props: {
    date: String,
    pollu: String
  },
  methods: {
    initData() {
      getProvinceMap({ date: this.date }).then(resp => {
        var temp = [];
        console.log(resp)
        // if(this.pollu=='AQI')
        // {
        //   for (let i = 0; i < resp.data.length; i++) {
        //     temp.push({ name: resp.data[i][7], value: resp.data[i][0] });
        //   }

        this.citydata = temp;
        temp.sort((a, b) => {
          return b.value - a.value;
        });
        this.$emit("chinadata", temp);
      });
      this.init();
    },
    init() {
      var _this = this;
      this.myChart = echarts.init(this.$refs.char);
      this.myChart.setOption(this.option);
      this.myChart.on("click", function(params) {
        var ename = pinyin.getFullChars(params.name);
        if (params.name == "内蒙古") {
          ename = "neimenggu";
        } else if (params.name == "西藏") {
          ename = "xizang";
        } else if (params.name == "陕西") {
          ename = "shanxi1";
        } else if(params.name == "重庆"){
          ename = "chongqing";
        }
        _this.$emit("getdrill", true);
        _this.$emit("getname", params.name);
        _this.$emit("getename", ename);
      });
      this.myChart.on("mouseover", function(params) {
        _this.$emit("getname", params.name);
      });
    }
  },
  mounted() {
    this.initData();
  },
  created() {},
  watch: {
    titledata(value) {
      this.option.yAxis[0].data = value;
      this.myChart.setOption(this.option);
    },
    citydata(value) {
      this.option.series[0].data = value;
      this.myChart.setOption(this.option);
    },
    dataShadow(value) {
      this.option.series[1].data = value;
      this.myChart.setOption(this.option);
    },
    date: function() {
      this.initData();
    },
    pollu:function (){
      this.initData();
    }
  }
};
</script>

<style scoped>
.char {
  width: 100%;
  height: 85%;
}
</style>

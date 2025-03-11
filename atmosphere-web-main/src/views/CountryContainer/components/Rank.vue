<template>
  <div class="echart" id="ranking" :style="myChartStyle"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Rank",
  data() {
    return {
      xData: [], //数据
      yData: [], //坐标
      myChartStyle: { float: "left", width: "100%", height: "100%" }, //图表样式
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '1%',
          left: '10%',
          right: '10%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          show: true,
          axisLabel: {
            formatter: '{value} ',
            show: true
          },
          splitLine: { show: false },
          axisLine: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          inverse: true, // 倒叙
          axisLabel: {
            color: 'black',
            formatter: (val) => {
              return `${val}`;
            }
          },
          axisLine: {
            show: false // 轴线
          },
          axisTick: {
            show: false // 刻度线
          },
          data:this.yData
        },
        series: [
          {
            name: 'AQI',
            type: 'bar',
            barWidth: 10,
            showBackground: true,
            barMaxWidth: 20,
            barMinWidth: 5,
            itemStyle: {
              borderRadius: [0, 10, 10, 0],
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: 'red' },
                { offset: 1, color: 'yellow' }
              ]),
              borderWidth: 1,
              borderColor: "black"
            },
            data: this.xData
          }
        ]
      },
    };
  },
  mounted() {
    this.initEcharts();
    this.initdata();
  },
  props: {
    data:[]
  },
  watch:{
    data: function (){
      this.initdata();
    }
  },
  methods: {
    initdata(){
      console.log("rank")
      var tempx=[];
      var tempy=[];
      var k=10;
      if(this.data.length<10){
        k=this.data.length;
      }
      for(let i=0;i<k;i++)
      {
        tempy.push(this.data[i].name);
        tempx.push(this.data[i].value);
      }
      this.xData=tempx;
      this.yData=tempy;
      this.option.series[0].data=this.xData;
      this.option.yAxis.data=this.yData;
      this.myChart.setOption(this.option);
    },
    initEcharts() {
      this.myChart = echarts.init(document.getElementById("ranking"));
      this.myChart.setOption(this.option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    }
  }
}
</script>

<style scoped>

</style>

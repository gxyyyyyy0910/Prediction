<template>
  <div id="main" style="width: 100%;height: 250px; top:5%"></div>
</template>

<script>
import * as echarts from "echarts";
import { getProvinceTempa} from "@/request/api";
import { getCityTempa } from "@/request/api";
export default {
  name: "TempA",
  data(){
    return{
      charts: '',
      xdata: ["d1","d2","d3","d4","d5","d6","d7"],
      adata: [0,0,0,0,0,0,0],
      bdata: [0,0,0,0,0,0,0]
    }
  },
  methods:{
    initData1() {
      getProvinceTempa({
        date: this.date,
        province: this.hovername,
      }).then(res => {
        // console.log("平行坐标的res", res.data);
        var tempa=[]
        var tempb=[]
        for(var i=0;i<7;i++)
      {
        tempa.push(res.data[i][0])
        tempb.push(res.data[i][1])
      }
      this.adata=tempa
      this.bdata=tempb
        this.initData('main');
      });
    },
    initData2() {
      getCityTempa({
        date: this.date,
        city: this.hovername,
      }).then(res => {
        // console.log("平行坐标的res", res.data);
        var tempa=[]
        var tempb=[]
        for(var i=0;i<7;i++)
      {
        tempa.push(res.data[i][0])
        tempb.push(res.data[i][1])
      }
      this.adata=tempa
      this.bdata=tempb
        this.initData('main');
      });
    },
    initData(id){
      this.charts = echarts.init(document.getElementById(id))
				this.charts.setOption({
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['AQI','temperature']//图例
					},
					grid: {
						left: '3%',
						right: '15%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {//横坐标
            name: "日期",
						type: 'category',
						boundaryGap: false,
            data: this.xdata

					},
					yAxis: [{
            name: "值",
						type: 'value'
					},{
            name: "值",
						type: 'value',
            position: 'top'
					}],
					//三条折线就有三种series，可以更改type以改变是否为折线
					series: [{
						name: 'AQI',
						type: 'line',
						data: this.adata,
            yAxisIndex: 0,
            z: 2
					},{
						name: 'temperature',
						type: 'line',
						data: this.bdata,
            yAxisIndex: 1,
             z: 3
					}]
				})
			}

  },
  mounted() {
    this.$nextTick(function() {
      this.initData('main');
    })
  },
  props: {
    date: String,
    name: String,
    hovername: String
  },
  watch:{
    // resultlist:function (){
    //   console.log("hello")
    //   var tempa=[]
    //   var tempb=[]
    //   var tempc=[]
    //   for(var i=0;i<3;i++)
    //   {
    //     tempa.push(this.resultlist[i][2])
    //     tempb.push(this.resultlist[i][3])
    //     tempc.push(this.resultlist[i][1])
    //   }
    //   this.adata=tempa
    //   this.bdata=tempb
    //   this.cdata=tempc
    //   this.initData('main')
    // }
    date: function() {
      if(this.name == '中国'){
        this.initData1();
      }
      else{
        this.initData2();
      }
    },
    hovername: function() {
      if(this.name == '中国'){
        this.initData1();
      }
      else{
        this.initData2();
      }
    }
  }
}
</script>

<style scoped>

</style>
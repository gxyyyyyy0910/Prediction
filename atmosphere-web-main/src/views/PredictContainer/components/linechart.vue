<template>
  <div id="main" style="width: 95%;height: 300px; top:5%"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "line",
  data(){
    return{
      charts: '',
      xdata: ["2019-01-01","2019-01-02","2019-01-03"],
      adata: [0,0,0],
      bdata: [0,0,0],
      cdata: [0,0,0 ]
    }
  },
  methods:{
    initData(id){
      this.charts = echarts.init(document.getElementById(id))
				this.charts.setOption({
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['PM2.5','O3','AQI']//图例
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
					yAxis: {
            name: "值",
						type: 'value'
					},
					//三条折线就有三种series，可以更改type以改变是否为折线
					series: [{
						name: 'PM2.5',
						type: 'line',
						data: this.adata,
					},{
						name: 'O3',
						type: 'line',
						data: this.bdata
					},{
						name: 'AQI',
						type: 'line',
						data: this.cdata
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
    resultlist:[]
  },
  watch:{
    resultlist:function (){
      console.log("hello")
      var tempa=[]
      var tempb=[]
      var tempc=[]
      for(var i=0;i<3;i++)
      {
        tempa.push(this.resultlist[i][2])
        tempb.push(this.resultlist[i][3])
        tempc.push(this.resultlist[i][1])
      }
      this.adata=tempa
      this.bdata=tempb
      this.cdata=tempc
      this.initData('main')
    }
  }

}
</script>

<style scoped>

</style>
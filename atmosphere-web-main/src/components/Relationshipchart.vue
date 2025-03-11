<template>
  <div style="width:100%;height: 100% ">
    <div class="selectBox" style="width: 100%;height: 10%">
      <div class="selectBox_show">
        <select @change="resetParam1">
          <option  v-for="p in selectData1" v-bind:key="p in selectData1">{{ p.param1 }}</option>
        </select>
        <select @change="resetParam2">
          <option  v-for="p in selectData2" v-bind:key="p in selectData2">{{ p.param2 }}</option>
        </select>
      </div>
    </div>
    <div  id="relaChart" style="width:100%;height: 100% "></div>
  </div>


</template>

<script>
import {getTwoParamsRelationship} from "@/request/api";

export default {
  computed:{
    renderData: function (){
      return [
        [10.0, 8.04],
        [8.0, 6.95],
        [13.0, 7.58],
        [9.0, 8.81],
        [11.0, 8.33],
        [14.0, 9.96],
        [6.0, 7.24],
        [4.0, 4.26],
        [12.0, 10.84],
        [7.0, 4.82],
        [5.0, 5.68]
      ];
    }
  },
  mounted() {
    this.mapFn();
  },
  data(){
    return{
      showParam1:"PM2.5",
      showParam2:"风速",
      selectData1:[
        {param1: "PM2.5"},
        {param1: "PM10"},
        {param1: "SO2"},
        {param1: "NO2"},
        {param1: "CO"},
        {param1: "O3"},
      ],
      selectData2:[
        {param2: "风速", value: "V"},
        {param2: "气温", value: "TEMP"},
        {param2: "相对湿度", value: "RH"},
        {param2: "地面压强", value: "PSFC"},
      ],
    }
  },
  methods:{
    resetParam1(e){
      // let paramList = [e.target.value , this.$store.state.param2]
      this.showParam1 = e.target.value
      getTwoParamsRelationship({
        province:"浙江",
        paramList:["PM2.5","U"]
      }).then( res=>{
        this.commit("changeLeftTopData",res)
        this.mapFn()
      })
    },
    resetParam2(e){
      // let paramList = [e.target.value , this.$store.state.param2]
      for( var i = 0; i < this.selectData2.length; i++){
        if(this.selectData2[i].param2 === e.target.value){
          this.showParam2 = e.target.value
          //this.state.paramList[1] = this.selectData2[i].value
          break
        }
      }
      //console.log("update后的")
      //console.log(this.state.paramList[0])
      //console.log(this.state.paramList[1])
      getTwoParamsRelationship({
        province:"浙江",
        paramList:["PM2.5","U"]
      }).then( res=>{
        this.commit("changeLeftTopData",res)
        this.mapFn()
      })

    },
    mapFn(){
      var mapChart = this.$echarts.init(document.getElementById("relaChart") );
      var option = {
        xAxis: {name: this.showParam1},
        yAxis: {name: this.showParam2},
        title: {
          text: this.showParam1 + "与" + this.showParam2 + "关系图",
        },
        textStyle:{
          color: "#ffffff",
          fontFamily: "Microsoft YaHei",
          fontSize: "12",
          fontStyle: "normal",
          fontWeight: "normal"
        },
        series: [{
          symbolSize: 5,
          data: this.renderData,
          type: 'scatter'
        },
          {
            type: "line",
            name: "111",
            data: this.renderData,
          }
        ]
        // color: [
        //   "#37a2da",
        //   "#32c5e9",
        //   "#9fe6b8",
        //   "#ffdb5c",
        //   "#ff9f7f",
        //   "#fb7293",
        //   "#e7bcf3",
        //   "#8378ea"
        // ],
        // textStyle:{
        //   color: "#ffffff",
        //   fontFamily: "Microsoft YaHei",
        //   fontSize: "12",
        //   fontStyle: "normal",
        //   fontWeight: "normal"
        // },
        // xAxis: {
        //   type: 'category',
        //   data: ['8点', '12点', '14点', '16点', '18点', '20点']
        // },
        // yAxis: {
        //   type: 'value',
        //   splitLine:{
        //     show:false
        //   }
        // },
        // series: [
        //   {
        //     data: [150, 230, 224, 218, 135, 147],
        //     type: 'line'
        //   }
        // ]
      };
      mapChart.setOption(option);
    }
  },
  watch:{
    "renderData"() {
      console.log("更新了Data")
    },
  }
}
</script>

<style scoped>

</style>

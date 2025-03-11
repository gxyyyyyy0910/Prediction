<template>
  <div class="parent">
    <div class="div1">
      <small-title title="地图面板" />
      <mapc-chart @getname="changename"/>
    </div>
    <div class="div2">
      <small-title title="表格面板" />
      <table-chart :resultlist="resultlist"/>
    </div>
    <div class="div3">
      <small-title title="折线图面板" />
      <line-chart :resultlist="resultlist"/>
    </div>
  </div>
</template>

<script>
import { getPrediction } from "../../request/api";
import smallTitle from "@/components/smallTitle";
import mapcChart from "./components/China";
import tableChart from"./components/table";
import lineChart from "./components/linechart";
export default {
  components: {
    smallTitle,
    mapcChart,
    tableChart,
    lineChart

  },
  data(){
    return{
      resultlist:[ ['2019-01-01', 88.53641510009766, 63.31958770751953, 29.770278930664062, '山东'],['2019-01-02', 94.0699234008789, 71.01244354248047, 30.877880096435547, '山东'], ['2019-01-03', 94.04104614257812, 71.25420379638672, 32.232017517089844, '山东']]
    }
  },
  methods:{
    changename(hovername){
      this.hovername=hovername
      var temp=[]
      for(let i=0;i<this.datalist.length;i++){
        if(this.datalist[i][4]==this.hovername){
          temp.push(this.datalist[i])
        }
      }
      this.resultlist=temp
      console.log("result")
      console.log(this.resultlist)
    }
  },
  mounted() {
     getPrediction({ }).then(resp => {
       this.datalist=resp.data
     })
  }
};
</script>

<style scoped>
.parent {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
}

.div1 {
  grid-area: 1 / 1 / 3 / 2;
  background-color: whitesmoke;
  box-shadow: 0 2px 2px 0 rgba(67, 67, 67, 0.2),
    0 6px 20px 0 rgba(80, 80, 80, 0.19);
  border-radius: 3px;
}
.div2 {
  grid-area: 1 / 2 / 2 / 3;
  background-color: whitesmoke;
  box-shadow: 0 2px 2px 0 rgba(67, 67, 67, 0.2),
    0 6px 20px 0 rgba(80, 80, 80, 0.19);
  border-radius: 3px;
}
.div3 {
  grid-area: 2 / 2 / 3 / 3;
  background-color: whitesmoke;
  box-shadow: 0 2px 2px 0 rgba(67, 67, 67, 0.2),
    0 6px 20px 0 rgba(80, 80, 80, 0.19);
  border-radius: 3px;
}
</style>
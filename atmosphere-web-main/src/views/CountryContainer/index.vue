<template>
  <div class="parent">
    <div class="map">
      <small-title title="地图面板" />
      <select-year @getYear="changeYear" />
      <mapc-chart v-show="drill==false" :date="date" :pollu="pollu" @getname="changename" @getename="changeename" @getdrill="changeDrill" @chinadata="chinaData" @gethovername="changeHoverName"/>
      <mapp-chart v-show="drill==true" :date="date" :ename="ename" :name="name" :pollu="pollu" @getname="changename" @getdrill="changeDrill" @provincedata="provinceData" @gethovername="changeHoverName"/>
    </div>
    <div class="timeline">
      <small-title title="时间轴面板" />
      <timeline-chart @getDate="changeDate" :date="date"/>
    </div>
    <div class="parallel">
      <small-title title="平行坐标" />
      <pollution-chart :date="date" :name="name"/>
    </div>
    <div class="ranking">
      <small-title title="污染TOP10排名"/>
      <ranking :data="chinadata"/>
    </div>
    <div class="relationship">
      <small-title title="温度与AQI关系图" />
      <TempA :date="date" :name="name" :hovername="hovername"/>
    </div>
    <div class="pollunum">
      <small-title :title="`${this.hovername}数值显示`" />
      <radio-box @getPollu="changePollu"/>
      <ring-gauge :date="date" :name="name" :hovername="hovername"/>
    </div>
    <div class="weathernum">
      <small-title title="气象指标数值显示" />
      <weather-table :date="date" :name="name" :hovername="hovername"/>
    </div>
  </div>
</template>

<script>
import smallTitle from "@/components/smallTitle";
import selectYear from "@/components/SelectYear";
import mapcChart from "./components/China";
import RadioBox from "@/components/RadioBox";
import mappChart from "./components/Province";
import pollutionChart from "./components/pollutionChart";
import ranking from "./components/Rank";
import timelineChart from "./components/TimelineChart";
import RingGauge from "./components/RingGauge";
import WeatherTable from "./components/WeatherTable";
import TempA from "@/views/CountryContainer/components/TempA";
export default {
  name: "index",
  components: {
    pollutionChart,
    smallTitle,
    selectYear,
    RadioBox,
    ranking,
    timelineChart,
    mapcChart,
    mappChart,
    RingGauge,
    WeatherTable,
    TempA
  },
  data() {
    return {
      hovername: "浙江",
      pollu: "AQI",
      drill:false,
      rankc:false,
      date: "2016-01-01",
      ename:"zhejiang",
      name:"中国",
      chinadata:[{"name":"天津","value":"244"},{"name":"北京","value":"186.06"},{"name":"山东","value":"170.31"},{"name":"河南","value":"165.85"},{"name":"河北","value":"154.54"},{"name":"安徽","value":"144.47"},{"name":"重庆","value":"143.98"},{"name":"辽宁","value":"142.05"},{"name":"江苏","value":"135.29"},{"name":"湖北","value":"130.12"}],
      tempdata:[{"name":"天津","value":"244"},{"name":"北京","value":"186.06"},{"name":"山东","value":"170.31"},{"name":"河南","value":"165.85"},{"name":"河北","value":"154.54"},{"name":"安徽","value":"144.47"},{"name":"重庆","value":"143.98"},{"name":"辽宁","value":"142.05"},{"name":"江苏","value":"135.29"},{"name":"湖北","value":"130.12"}]
    };
  },
  methods: {
    changeHoverName(hovername) {
      this.hovername = hovername;
    },
    changeYear(year){
      this.date = year.toString() ;
    },
    changeDate(date) {
      this.date = date;
    },
    changePollu(pollu){
      this.pollu = pollu;
    },
    changeDrill(drill){
      this.drill=drill;
    },
    changename(name){
      this.name=name;
      if(name=='中国'){
        this.chinadata=this.tempdata;
      }
    },
    changeename(ename){
      this.ename=ename;
    },
    chinaData(china){
      this.chinadata=china;
      this.tempdata=china;
    },
    provinceData(province){
      this.provincedata=province;
      this.chinadata=province;
    },
  }
  // components: { smallTitle }
};
</script>

<style scoped>
/* div {
  box-shadow: 0 4px 8px 0 rgba(67, 67, 67, 0.2), 0 6px 20px 0 rgba(80, 80, 80, 0.19);
  border-radius: 3px;
} */
.parent {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
}

.map {
  grid-area: 1 / 4 / 9 / 10;
  background-color: whitesmoke;
  box-shadow: 0 2px 2px 0 rgba(67, 67, 67, 0.2),
    0 6px 20px 0 rgba(80, 80, 80, 0.19);
  border-radius: 3px;
}
.timeline {
  grid-area: 9 / 4 / 11 / 10;
  background-color: whitesmoke;
  box-shadow: 0 2px 2px 0 rgba(67, 67, 67, 0.2),
    0 6px 20px 0 rgba(80, 80, 80, 0.19);
  border-radius: 3px;
}
.parallel {
  position: relative;
  grid-area: 7 /10 / 11 / 13;
  background-color: whitesmoke;
  box-shadow: 0 2px 2px 0 rgba(67, 67, 67, 0.2),
    0 6px 20px 0 rgba(80, 80, 80, 0.19);
  border-radius: 3px;
  /* width: 500px;
  height: 500px; */
}
.ranking {
  grid-area: 1 / 10 / 7 / 13;
  background-color: whitesmoke;
  box-shadow: 0 2px 2px 0 rgba(67, 67, 67, 0.2),
    0 6px 20px 0 rgba(80, 80, 80, 0.19);
  border-radius: 3px;
}
.relationship {
  grid-area: 7 / 1 / 11 / 4;
  background-color: whitesmoke;
  box-shadow: 0 2px 2px 0 rgba(67, 67, 67, 0.2),
    0 6px 20px 0 rgba(80, 80, 80, 0.19);
  border-radius: 4px;
}
.pollunum {
  /* display: relative; */
  grid-area: 1 / 1 / 4 / 4;
  background-color: whitesmoke;
  box-shadow: 0 2px 2px 0 rgba(67, 67, 67, 0.2),
    0 6px 20px 0 rgba(80, 80, 80, 0.19);
  border-radius: 3px;
}
.weathernum {
  grid-area: 4 / 1 / 7 / 4;
  background-color: whitesmoke;
  box-shadow: 0 2px 2px 0 rgba(67, 67, 67, 0.2),
    0 6px 20px 0 rgba(80, 80, 80, 0.19);
  border-radius: 3px;
}
</style>

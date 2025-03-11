<template>
  <div class="parent">
    <a-spin :spinning="spinning" size="small">
      <div class="switchtime">
        <DateSelect />
      </div>
      <div class="leaflet" id="map" style="margin:0 auto;width: 100%;height: 740px;"></div>
    </a-spin>
  </div>
</template>

<script>
import DateSelect from "@/components/DateSelect";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-velocity/dist/leaflet-velocity.css";
import "leaflet-velocity/dist/leaflet-velocity";
import "leaflet.chinatmsproviders";
import datas from "./wind-global.json";
import { getWind } from "@/request/api";
//  注：this.datas为风场数据 格式类型可参照wind-js-server 的grib2json格式
//  至此结束，风场数据已经可以展示在地图中！
export default {
  components: {
    DateSelect
  },
  data() {
    return {
      u: [],
      v: []
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // var Esri_WorldImagery = L.tileLayer(
      //   "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      //   {
      //     attribution:
      //       "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, " +
      //       "AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      //   }
      // );
      var normalm = L.tileLayer.chinaProvider("Google.Normal.Map");
      var gray = L.tileLayer.chinaProvider("Geoq.Normal.Gray");
      var satellite = L.tileLayer.chinaProvider("Google.Satellite.Map");
      var baseLayers = {
        Google: normalm,
        "Grey Canvas": gray,
        Satellite: satellite
      };

      //生成风场实例
      var velocityLayer = L.velocityLayer({
        displayValues: true,
        displayOptions: {
          velocityType: "GBR Wind",
          displayPosition: "bottomleft",
          // no data at cursor
          emptyString: "No velocity data",
          // see explanation below
          angleConvention: "bearingCW",
          // display cardinal direction alongside degrees
          showCardinal: false,
          // one of: ['ms', 'k/h', 'mph', 'kt']
          speedUnit: "m/s",
          // direction label prefix
          directionString: "Direction",
          // speed label prefix
          speedString: "Speed"
        },
        data: datas, //风场数据
        minVelocity: 0, //Velocity：速率
        maxVelocity: 10,
        velocityScale: 0.015,
        particleMultiplier: 1 / 100, //粒子的数量
        lineWidth: 2, //粒子的粗细
        frameRate: 15, //定义每秒执行的次数
        colorScale: [
          "rgb(63,114,167)",
          "rgb(161,211,162)",
          "rgb(244,250,204)",
          "rgb(221,122,90)",
          "rgb(140,21,53)"
        ]
        // OPTIONAL
        // minVelocity: 0, // used to align color scale
        // maxVelocity: 10, // used to align color scale
        // velocityScale: 0.005, // modifier for particle animations, arbitrarily defaults to 0.005
        // colorScale: [], // define your own array of hex/rgb colors
        // onAdd: null, // callback function
        // onRemove: null, // callback function
        // opacity: 0.97 // layer opacity, default 0.97
      });
      //添加风场样式至地图中
      this.map = L.map("map", {
        center: [33.59, 107.29],
        zoom: 5,
        maxZoom: 20,
        minZoom: 5,
        layers: [normalm]
      });
      // 风场实例添加到地图上
      velocityLayer.addTo(this.map);
      var layerControl = L.control.layers(baseLayers);
      layerControl.addTo(this.map);
      this.vl = velocityLayer;
    },
    dateChange(obj) {
      console.log(obj.year + "-" + obj.month + "-" + obj.day);
      getWind({
        year: obj.year,
        month: obj.month,
        day: obj.day
      }).then(res => {
        var alldata = res.data;
        this.u = alldata[0].split(',').map(Number);
        this.v = alldata[1].split(',').map(Number);
        console.log(datas[0].data);
        console.log(datas[1].data);
        datas[0].data = this.u;
        datas[1].data = this.v;
        console.log(datas);
      });
      this.vl.setData(datas);
      console.log(this.vl);
    }
  }
};
</script>

<style scoped>
.parent {
  position: relative;
}
.switchtime {
  position: absolute;
  z-index: 2;
  left: 38%;
}
.leaflet {
  position: absolute;
  z-index: 1;
}
</style>
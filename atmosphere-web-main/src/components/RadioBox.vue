<template>
  <div class="radioBox" style="position:absolute;z-index:1;margin-left:10px;">
    地图面板展示的：
    <label v-for="(item,index) in radioData" :key="index">
      <input type="radio" :value="item.value" :id="item.id" :checked="item.checked" @click="getRadioVal(item.value)" name="pollutant"/>
      {{item.value}}
    </label>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radioData: [
        { value: "AQI", id: "AQI", checked: "true"},
        { value: "SO2", id: "SO2" },
        { value: "PM2.5", id: "PM2.5" },
      ]
    };
  },
  methods: {
    getRadioVal(pollu) {
      console.log(pollu);
      this.$emit("getPollu", pollu);
    }
  }
};
</script>

<template>
  <div id="app">
    <div style="margin-bottom:4px;">
    <pageHeader/></div>
    <router-view></router-view>
  </div>
</template>

<script>

import Header from './components/Header.vue';
export default {
  name: 'App',
  components: {
    "pageHeader": Header,
  }
}
</script>

<style>
html,body{
  height: 95%;
  background-color: whitesmoke; 
}

#app {
  height: 100%;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50; 
  /*margin-top: 60px;*/
}
</style>

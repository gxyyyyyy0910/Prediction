<template>
  <div id="index">
  </div>
</template>
<script>
// import CountryContainer from "./CountryContainer";
export default {
  name: "index",
  components: {
    // CountryContainer
  },
  data() {
    return {
      loading: true,
      menuIndex: 3
    };
  },
  mounted() {
    this.cancelLoading();
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/index.scss";
</style>
  
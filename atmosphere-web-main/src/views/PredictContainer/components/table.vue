<template>
  <el-table
            :data="tableData"
            :key="tableKey"
            stripe="true"
            style="width: 120%;top:20%;">
      <el-table-column
                       prop="date"
                       label="名称">
      </el-table-column>
      <el-table-column
                       prop="PM25"
                       label="PM2.5">
      </el-table-column>
      <el-table-column
                       prop="O3"
                       label="O3">
      </el-table-column>
      <el-table-column
                       prop="AQI"
                       label="AQI">
      </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "table",
  data(){
        return {
          tableKey:0,
            tableData: [
            {
                date: '2019-01-01',
                PM25: 100,
                O3: 100,
                AQI: 100
            },{
                date: '2019-01-02',
                PM25: 100,
                O3: 100,
                AQI: 100
            },{
                date: '2019-01-03',
                PM25: 100,
                O3: 100,
                AQI: 100
            },

            ]
        }
  },
  props: {
    resultlist:[]
  },
  watch:{
    resultlist:function (){
      this.re=this.resultlist
      this.tableData=[
            {
                date: '2019-01-01',
                PM25: this.re[0][2],
                O3: this.re[0][3],
                AQI: this.re[0][1]
            },{
                date: '2019-01-02',
                PM25: this.re[1][2],
                O3: this.re[1][3],
                AQI: this.re[1][1]
            },{
                date: '2019-01-03',
                PM25: this.re[2][2],
                O3: this.re[2][3],
                AQI: this.re[2][1]
            },
            ]
      this.tableKey = Math.random()
    }
  }
}
</script>

<style scoped>

</style>
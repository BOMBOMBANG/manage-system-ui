<template>
  <div id="base-bar" class="base-bar"></div>
</template>

<script>
import echarts from 'echarts'
import barOption from './baseOption'
export default {
  /**
   * @param option type Object
   */
  props: {
    option: {
      type: Object,
      default() {
        return undefined
      }
    }
  },
  methods: {
    createBar() {
      const myEl = document.getElementById('base-bar')
      let myEcharts = echarts.init(myEl)
      // console.log(barOption);
      myEcharts.setOption(barOption(this.option)); 
      window.addEventListener('resize',function() {
        myEcharts.resize()
      })
    }
  },
  mounted() {
    this.createBar()
  }
}
</script>

<style scoped>
  .base-bar{
    min-width: 500px;
    min-height: 500px;
  }
</style>
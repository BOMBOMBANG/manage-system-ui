<template>
  <div class="pie-controller">
  </div>
</template>

<script>
// import echarts from 'echarts'

export default {
  props: {
    dataList: {
      type: Array,
      default() {
        return []
      }
    },
    name: ''
  },
  computed: {
    pieData() {
      let arr = []
      for(let item of this.dataList) {
        arr.push({
          value: item.value,
          name: item.label
        })
      }
      return arr
    }
  },
  methods: {
    createdPie() {
      
      var myChart = echarts.init(document.getElementsByClassName('pie-controller')[0])
      let option = {
        title : {
          subtext: this.name,
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          formatter: function (name) {
            return echarts.format.truncateText(name, 70, '14px Microsoft Yahei', '…');
          }
        },
        series : [
          {
            name: this.name,
            type: 'pie',
            radius : '55%',
            center: ['50%', '40%'],
            data: this.pieData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option);
      window.addEventListener('resize',function() {
        myChart.resize()
      })
    }
  },
  mounted() {
    this.createdPie()
  }
}
</script>

<style lang="scss" scoped>
.pie-controller{
  min-height: 4.61rem;
  width: 100%
}
</style>

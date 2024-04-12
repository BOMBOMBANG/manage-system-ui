<template>
  <div class="echarts-box" style="width:100%;height:100%" :id="_id"></div>
</template>

<script>
export default {
  props: {
    res: {
      type: Object,
      default: () => {
        return {};
      }
    },
    myId: {
      type: String,
      default: () => "default"
    },
    ecData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    keyName: {
      type: String,
      default: () => ""
    }
  },
  computed: {
    _id() {
      return "reason-analysis-" + this.myId;
    },
    _ecData() {
      return this.ecData.reverse();
    },
    yAxis() {
      return this.res.classes || [];
    },
    barData() {
      return this.res.data || [];
    },
    option() {
      const option = {
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis",
          formatter: item => {
            return item[0].axisValueLabel + ":" + item[0].value;
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效ƒ
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false,
          data: ["人数"]
        },
        grid: [
          {
            bottom: 0,
            top: 0,
            left: 140,
            right: 50
          }
        ],
        xAxis: [
          {
            show: false
          },
          {
            show: false,
            max: 1
          }
        ],
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisPointer: {
              label: {
                show: true,
                margin: 13
              }
            },
            data: this.yAxis,
            axisLabel: {
              margin: 100,
              fontSize: 14,
              align: "left",
              color: "#333",
              rich: {
                a1: {
                  color: "#fff",
                  backgroundColor: this.colorList[0],
                  width: 13,
                  height: 13,
                  align: "center",
                  borderRadius: 2
                },
                a2: {
                  color: "#fff",
                  backgroundColor: this.colorList[1],
                  width: 13,
                  height: 13,
                  align: "center",
                  borderRadius: 2
                },
                a3: {
                  color: "#fff",
                  backgroundColor: this.colorList[2],
                  width: 13,
                  height: 13,
                  align: "center",
                  borderRadius: 2
                },
                b: {
                  color: "#fff",
                  backgroundColor: this.colorList[3],
                  width: 13,
                  height: 13,
                  align: "center",
                  borderRadius: 2
                }
              },
              formatter: function(params, index) {
                if (index == 11) {
                  index = 0;
                }
                index++;
                if (index - 1 < 3) {
                  return [
                    "{a" + index + "|" + index + "}" + "  " + params
                  ].join("\n");
                } else {
                  return ["{b|" + index + "}" + "  " + params].join("\n");
                }
              }
            }
          }
        ],
        series: [
          {
            stack: "1",
            name: "成功率(万笔)",
            type: "bar",
            barWidth: 10,
            label: {
              show: true,
              position: "insideRight",
              fontSize: 10,
              borderWidth: 0
            },
            itemStyle: {
              barBorderRadius: 6,
              color: "#278BDD",
              barWidth: 10
            },
            zlevel: 1,
            data: this.barData
          },
          {
            stack: "1",
            name: "底色",
            type: "bar",
            xAxisIndex: 1,
            barWidth: 10,
            label: {
              show: false,
              position: "right"
            },
            itemStyle: {
              barBorderRadius: 0,
              opacity: 0.5,
              color: "#e3e3e3",
              barWidth: 10
            },
            zlevel: -1,
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1]
          }
        ]
      };
      // option.series[0].data = this.barData;
      // option.series[1].data = this.barData.map(i => {
      //   return 1;
      // });
      // option.yAxis[0].data = this.yAxis;
      return option;
    }
  },
  data() {
    return {
      colorList: ["#f36c6c", "#e6cf4e", "#20d180", "#0093ff"]
    };
  },
  watch: {
    option: function(to) {
      this.renderEchart();
    },
    res() {
    }
  },
  methods: {
    renderEchart() {
      const myEchart = this.$echarts.init(document.getElementById(this._id));
      myEchart.setOption(this.option);
      window.addEventListener("resize", () => {
        myEchart.resize();
      });
      myEchart.resize();
    }
  },
  mounted() {
    this.renderEchart();
  }
};
</script>
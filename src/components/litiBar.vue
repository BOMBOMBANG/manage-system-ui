<template>
  <div style="width:1000px;height:300px" :id="myId"></div>
</template>
<script>
import echarts from "echarts";

const CubeLeft = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint;
    const c0 = [shape.x, shape.y];
    const c1 = [shape.x - 20, shape.y - 4];
    const c2 = [xAxisPoint[0] - 20, xAxisPoint[1] - 4];
    const c3 = [xAxisPoint[0], xAxisPoint[1]];
    ctx
      .moveTo(c0[0], c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .closePath();
  },
});
const CubeRight = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint;
    const c1 = [shape.x, shape.y];
    const c2 = [xAxisPoint[0], xAxisPoint[1]];
    const c3 = [xAxisPoint[0] + 8, xAxisPoint[1] - 4];
    const c4 = [shape.x + 8, shape.y - 4];
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath();
  },
});
const CubeTop = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    // 逆时针 角 y 负数向上  X 负数向左
    const c1 = [shape.x, shape.y];
    const c2 = [shape.x + 8, shape.y - 4];
    const c3 = [shape.x - 11, shape.y - 8];
    const c4 = [shape.x - 20, shape.y - 4];
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath();
  },
});
echarts.graphic.registerShape("CubeLeft", CubeLeft);
echarts.graphic.registerShape("CubeRight", CubeRight);
echarts.graphic.registerShape("CubeTop", CubeTop);

export default {
  props: {
    myId: {
      type: String,
      default: "my-id",
    },
    data: {
      type: Array,
      default: () => {
        return [
          {
            label: "北京",
            mobile: 120,
            telecom: 130,
            unicom: 140,
          },
          {
            label: "上海",
            mobile: 200,
            telecom: 210,
            unicom: 220,
          },
          {
            label: "杭州",
            mobile: 230,
            telecom: 240,
            unicom: 250,
          },
          {
            label: "苏州",
            mobile: 280,
            telecom: 290,
            unicom: 300,
          },
          {
            label: "西安",
            mobile: 300,
            telecom: 310,
            unicom: 320,
          },
          {
            label: "重庆",
            mobile: 200,
            telecom: 210,
            unicom: 220,
          },
          {
            label: "成都",
            mobile: 130,
            telecom: 140,
            unicom: 150,
          },
        ];
      },
    },
  },
  data() {
    return {
      params: ''
    };
  },
  computed: {
    option() {
      return {
        legend: {
          type: "scroll",
          show: true,
          top: 2,
          left: "center",
          textStyle: {
            color: "#fff",
          },
          itemWidth: 25,
          itemHeight: 14,
        },
        tooltip: {
          trigger: "axis",
          confine: true,
          position: "top",
          textStyle: {
            fontSize: 12,
          },
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              color: "#A3D9FF",
              opacity: 0.2,
            },
          },
          formatter: (params) => {
            this.params = params;
            return '';
          },
        },
        grid: {
          left: 20,
          right: 20,
          bottom: 30,
          top: 50,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.data.map((i) => i.label),
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgb(100,110,137)",
            },
          },
          offset: 10,
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 12,
            color: "rgb(137,196,251)",
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dotted",
              color: "rgb(101,113,142)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 12,
            color: "rgb(144,199,246)",
          },
          boundaryGap: ["20%", "20%"],
        },
        series: [
          this.getSeries("mobile", "移动", [-20, 0]),
          this.getSeries(
            "telecom",
            "电信",
            [10, 0],
            ["#61ce94", "#009380"],
            ["#61ce94", "#009380"],
            ["#7af2b5", "#7af0b3"]
          ),
          this.getSeries(
            "unicom",
            "联通",
            [40, 0],
            ["#ea7643", "#9c4635"],
            ["#ea7643", "#9c4635"],
            ["#ea7643", "#fcac71"]
          ),
        ],
      };
    },
  },
  methods: {
    getSeries(
      key,
      name,
      position,
      CubeLeftColor = ["#249ffd", "#2e43c0"],
      CubeRightColor = ["#00B0D0", "#002E75"],
      CubeTopColor = ["#4dc0ff", "#4fbcfd"]
    ) {
      return {
        type: "custom",
        name: key,
        color: CubeLeftColor[1],
        name: name,
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)]);
          return {
            type: "group",
            position: position,
            children: [
              {
                type: "CubeLeft",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 1,
                      color: CubeLeftColor[1],
                    },
                    {
                      offset: 0,
                      color: CubeLeftColor[0],
                    },
                  ]),
                },
              },
              {
                type: "CubeRight",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 1,
                      color: CubeRightColor[1], // 底部
                    },
                    {
                      offset: 0,
                      color: CubeRightColor[0], // 顶部
                    },
                  ]),
                },
              },
              {
                type: "CubeTop",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 1,
                      color: CubeTopColor[1],
                    },
                    {
                      offset: 0,
                      color: CubeTopColor[0],
                    },
                  ]),
                },
              },
            ],
          };
        },
        data: this.data.map((i) => i[key]),
      };
    },
    renderEchart() {
      const ec = echarts.init(document.getElementById(this.myId));
      ec.setOption(this.option);
      window.addEventListener("resize", () => {
        ec.resize();
      });
      ec.getZr().on("click", (e) => {
        console.log(this.params);
        this.$emit("on-click-area", this.params);
      });
    },
  },
  mounted() {
    this.renderEchart();
  },
};
</script>
<template>
  <div style="height:300px;width:500px" :id="id"></div>
</template>
<script>
import Highcharts from "highcharts";
import Highcharts3D from "highcharts/highcharts-3d";
Highcharts3D(Highcharts);
var each = Highcharts.each,
  round = Math.round,
  cos = Math.cos,
  sin = Math.sin,
  deg2rad = Math.deg2rad;
Highcharts.wrap(Highcharts.seriesTypes.pie.prototype, "translate", function (
  proceed
) {
  proceed.apply(this, [].slice.call(arguments, 1));
  // Do not do this if the chart is not 3D
  if (!this.chart.is3d()) {
    return;
  }
  var series = this,
    chart = series.chart,
    options = chart.options,
    seriesOptions = series.options,
    depth = seriesOptions.depth || 0,
    options3d = options.chart.options3d,
    alpha = options3d.alpha,
    beta = options3d.beta,
    z = seriesOptions.stacking
      ? (seriesOptions.stack || 0) * depth
      : series._i * depth;
  z += depth / 2;
  if (seriesOptions.grouping !== false) {
    z = 0;
  }
  each(series.data, function (point) {
    var shapeArgs = point.shapeArgs,
      angle;
    point.shapeType = "arc3d";
    var ran = point.options.h;
    shapeArgs.z = z;
    shapeArgs.depth = depth * 0.75 + ran;
    shapeArgs.alpha = alpha;
    shapeArgs.beta = beta;
    shapeArgs.center = series.center;
    shapeArgs.ran = ran;
    angle = (shapeArgs.end + shapeArgs.start) / 2;
    point.slicedTranslation = {
      translateX: round(
        cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
      ),
      translateY: round(
        sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
      ),
    };
  });
});
(function (H) {
  H.wrap(Highcharts.SVGRenderer.prototype, "arc3dPath", function (proceed) {
    // Run original proceed method
    var ret = proceed.apply(this, [].slice.call(arguments, 1));
    ret.zTop = (ret.zOut + 0.5) / 100;
    return ret;
  });
})(Highcharts);
export default {
  props: {
    id: {
      type: String,
      default: "liti-pie-id",
    },
    data: {
      type: Array,
      default: () => [
        { name: "移动", y: 572, h: 40 },
        { name: "电信", y: 229, h: 20 },
        { name: "联通", y: 199, h: 30 },
      ],
    },
  },
  methods: {
    renderHighchart() {
      const hc = Highcharts.chart(
        document.getElementById(this.id),
        this.option
      );
      this.$nextTick(() => {
        const arr =
          document.getElementsByClassName("highcharts-text-outline") || [];
        arr.forEach((item) => {
          console.log(item);
          item.setAttribute("stroke-width", "0px");
        });
      });
    },
  },
  mounted() {
    this.renderHighchart();
  },
  computed: {
    option() {
      return {
        colors: [
          "rgba(24,121,192,.8)",
          "rgba(7,160,190,.8)",
          "rgba(190,110,70,.8)",
        ],
        title: {
          text: "",
        },
        chart: {
          events: {
            load: function () {
              var each = Highcharts.each,
                points = this.series[0].points;
              each(points, function (p, i) {
                p.graphic.attr({
                  translateY: -p.shapeArgs.ran,
                });
                p.graphic.side1.attr({
                  translateY: -p.shapeArgs.ran,
                });
                p.graphic.side2.attr({
                  translateY: -p.shapeArgs.ran,
                });
              });
            },
          },
          type: "pie",
          borderColor: "rgba(0,0,0,0)",
          backgroundColor: "rgba(0,0,0,0)",
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0,
          },
        },
        tooltip: {
          pointFormat: "<p style='font-size:14px'>{series.name}: {point.y}</p>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            depth: 20,
            dataLabels: {
              enabled: true,
              formatter: function (e) {
                // console.log(this);
                //this 为当前的点（扇区）对象，可以通过  console.log(this) 来查看详细信息
                return `
                  <p style="font-weight:500;font-size:15px;color:#fff">${
                    this.key
                  }</p><br/>
                  <p style="font-weight:500;font-size:15px;color:${
                    this.color
                  }">${this.percentage.toFixed(2)}%</p>
                `;
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            name: "数量",
            events: {
              click: function (e) {
                throw "控制饼图";
              },
            },
            data: this.data,
          },
        ],
      };
    },
  },
};
</script>

<style>
.highcharts-background {
  background: #000;
}
</style>
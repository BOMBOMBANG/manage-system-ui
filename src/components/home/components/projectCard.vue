<template>
  <div class="project-card">
    <h1 class="title">{{name}}</h1>
    <ul>
      <li v-if="subtitle">{{subtitle}}</li>
      <li v-if="score">业绩积分：{{score}}</li>
      <li v-if="status">状态：{{status}}</li>
      <li v-if="createTime">{{createTime}}</li>
    </ul>
    <!-- <canvas id="canvas" class="canvas"></canvas> -->
    <div :style="backgroundColor" class="wave">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    createTime: {
      type: [String, Date],
      default: '2019.6.15'
    },
    score: {
      type: [String, Number],
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    backgroundColor() {
      var rad = parseInt(Math.random()*255)
      var rad2 = parseInt(Math.random()*255)
      var rad3 = parseInt(Math.random()*255)
      // console.log(rad, rad2);
      return `background-image: -webkit-linear-gradient( rgba(${rad2}, ${rad3}, ${rad}, 0.5), rgba(${rad}, ${rad2}, ${rad3}, 0.5));background-image: linear-gradient( rgba(${rad2}, ${rad3}, ${rad}, 0.5), rgba(${rad}, ${rad2}, ${rad3}, 0.5));`
    }
  },
  methods: {
    createdAM() {
      var c = document.getElementById('canvas') /* canvas element */ ,
      w /* canvas width */ , h /* canvas height */ ,
      ctx = c.getContext('2d') /* canvas context */ ,
      /* previous & current coordinates */
      x0, y0, x, y,
      t = 0,
      t_step = 1 / 10,
      tmp,
      /* just me being lazy */
      exp = Math.exp,
      pow = Math.pow,
      sqrt = Math.sqrt,
      PI = Math.PI,
      sin = Math.sin,
      cos = Math.cos;
      /* FUNCTIONS */
      /* a random number between min & max */
      var rand = function(max, min) {
        var b = (max === 0 || max) ? max : 1,
            a = min || 0;
        return a + (b - a) * Math.random();
      };
      var trimUnit = function(input_str, unit) {
        return parseInt(input_str.split(unit)[0], 10);
      };
      var initCanvas = function() {
        var s = getComputedStyle(c);
        w = c.width = trimUnit(s.width, 'px');
        h = c.height = trimUnit(s.height, 'px');
      };
      var wave = function() {
        x0 = -1, y0 = h / 1;
        ctx.clearRect(0, 0, w, h);
        tmp = pow(t, 1.75) / 10; /* keep computation out of loop */
        for (x = 0; x < w; x = x + 3) {
          y = 9 * sqrt(x) * sin(x / 45 / PI + t / 3 + sin(x / 29 + t)) +
            32 * sin(t) * cos(x / 19 + t / 7) +
            16 * cos(t) * sin(sqrt(x) + rand(3, 2) * tmp) + h / 2;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x, y);
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'hsl(' + (2 * x / w + t) * 180 + ', 100%, 65%)';
          ctx.stroke();
          x0 = x;
          y0 = y;
        }
        t += t_step;
        requestAnimationFrame(wave);
      };
      /* START THE MADNESS */
      setTimeout(function() {
        initCanvas();
        wave();
        /* fix looks on resize */
        addEventListener('resize', initCanvas, false);
      }, 15);
    },
    createdAM_2() {
      setTimeout(function() {
        var canvasEl = document.getElementById('canvas');
        var width = canvasEl.width;
        var height = canvasEl.height;
    
        var canvasCtx = canvasEl.getContext('2d');
        var fundamental = 300;
        var amplitude = height / 2 - 10;
        var waveCount = 6;
        var colorStepSize = 360 / (waveCount + 1);
        var waveforms = Array.apply(undefined, Array(waveCount)).map(function(_, index) {
            var n = (index + 1) * 2 - 1;
            var color = 'hsl(' + Math.floor(colorStepSize * (index + 1)) + ', 50%, 30%)';
            return waveformFactory.create(color, amplitude / n, fundamental / n);
        });
        var waveformVisualizer = waveformVisualizerFactory.create(fundamental);
        animate(0, canvasCtx, width, height, waveformVisualizer, waveforms);
      }, 0);
    
      function animate(iteration, ctx, width, height, waveformVisualizer, waveforms) {
        ctx.clearRect(0, 0, width, height);
        waveformVisualizer.render(ctx, iteration, waveforms);
        requestAnimationFrame(function() {
            animate(iteration + 1, ctx, width, height, waveformVisualizer, waveforms);
        });
      }
    
      var waveformFactory = {
        create: function create(color, amplitude, wavelength) {
        var offsetTheta = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

        var state = {
            color: color,
            amplitude: amplitude,
            wavelength: wavelength,
            offsetTheta: offsetTheta
        };
        return state;
        }
      };
    
      var waveformVisualizerFactory = {
        create: function create(stepCount) {
          var state = {
              stepCount: stepCount,
              render: function render(ctx, iteration, waveforms) {
                  return waveformVisualizerFactory.render(state, ctx, iteration, waveforms);
              }
          };
          return state;
        },
  
        drawMidline: function drawMidline(ctx, width, height) {
          ctx.strokeStyle = 'hsl(0, 80%, 60%)';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(0, height / 2);
          ctx.lineTo(width, height / 2);
          ctx.stroke();
          ctx.closePath();
        },
  
        drawWave: function drawWave(ctx, iteration, width, height, stepCount, _ref) {
          var amplitude = _ref.amplitude;
          var wavelength = _ref.wavelength;
          var color = _ref.color;
          var offsetTheta = _ref.offsetTheta;
  
          var stepSize = width / stepCount;
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.strokeStyle = color;
          var hasMoved = false;
          Array.apply(undefined, Array(stepCount + 1)).forEach(function(_, index) {
              var theta = ((1 - (index + iteration) / wavelength % 1) * Math.PI * 2 + offsetTheta) % (Math.PI * 2);
              var y = amplitude * Math.sin(theta);
              if (!hasMoved) {
                  ctx.moveTo(stepSize * index, y + height / 2);
                  hasMoved = true;
              } else {
                  ctx.lineTo(stepSize * index, y + height / 2);
              }
          });
          ctx.stroke();
          ctx.closePath();
        },
  
        drawSignal: function drawSignal(ctx, iteration, width, height, stepCount, waveforms) {
          var stepSize = width / stepCount;
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.strokeStyle = '#fff';
          ctx.moveTo(0, height / 2);
          var hasMoved = false;
          Array.apply(undefined, Array(stepCount + 1)).forEach(function(_, index) {
              var y = 0;
              waveforms.forEach(function(_ref2, waveformIndex) {
                  var wavelength = _ref2.wavelength;
                  var amplitude = _ref2.amplitude;
                  var offsetTheta = _ref2.offsetTheta;
  
                  var theta = ((1 - (index + iteration) / wavelength % 1) * Math.PI * 2 + offsetTheta) % (Math.PI * 2);
                  y += amplitude * Math.sin(theta);
              });
              if (!hasMoved) {
                  ctx.moveTo(stepSize * index, y + height / 2);
                  hasMoved = true;
              } else {
                  ctx.lineTo(stepSize * index, y + height / 2);
              }
          });
          ctx.stroke();
          ctx.closePath();
        },
  
        render: function render(state, ctx, iteration, waveforms) {
          var _ctx$canvas = ctx.canvas;
          var width = _ctx$canvas.width;
          var height = _ctx$canvas.height;
  
          waveformVisualizerFactory.drawMidline(ctx, width, height);
          waveforms.forEach(function(waveform) {
              waveformVisualizerFactory.drawWave(ctx, iteration, width, height, state.stepCount, waveform);
          });
          waveformVisualizerFactory.drawSignal(ctx, iteration, width, height, state.stepCount, waveforms);
        }
      };
    }
  },
  mounted() {
    // this.createdAM()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/index';

.project-card{
  overflow: hidden;
  position: relative;
  width: 100%;
  min-width: 1.69rem*1.8;
  max-width: 1.69rem*3;
  height: 1.11rem*1.8;
  box-shadow: 0 0 8px #ddd;
  padding: $base-padding;
  border-radius: 3px;
  font-weight: 600;
  .title{
    position: relative;
    z-index: 100;
    font-size: 0.15rem;
    margin-bottom: $base-margin;
  }
  ul>li{
    position: relative;
    z-index: 100;
    list-style: none;
    color: $text-color;
  }
  .canvas{
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}

.wave,
.wave::before,
.wave::after {
    content: '';
    overflow: hidden;
    position: absolute;
    top: 0;
    left: -50%;
    width: 38vw;
    height: 30vw;
    margin-left: -12.5vw;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    // background-image: -webkit-linear-gradient( rgba(150, 255, 255, 0.5), rgba(240, 240, 100, 0.5));
    // background-image: linear-gradient( rgba(150, 255, 255, 0.5), rgba(240, 240, 100, 0.5));
    border-radius: 38% 42%;
    box-shadow: inset 0 0 10vw rgba(255, 255, 255, 0.5);
    // -webkit-animation: spin 7s infinite linear;
    // animation: spin 7s infinite linear;
}
.wave::before {
    width: 105%;
    height: 95%;
    margin-top: -125vw;
    -webkit-transform-origin: 49% 51%;
    transform-origin: 49% 51%;
    background-image: -webkit-linear-gradient( rgba(255, 180, 150, 0.5), rgba(180, 200, 255, 0.5));
    background-image: linear-gradient( rgba(255, 180, 150, 0.5), rgba(180, 200, 255, 0.5));
    border-radius: 40% 38%;
    -webkit-animation: spin 5s infinite linear;
    animation: spin 5s infinite linear;
}
.wave::after {
    width: 102%;
    height: 98%;
    margin-top: -125vw;
    -webkit-transform-origin: 51% 49%;
    transform-origin: 51% 49%;
    background-image: -webkit-linear-gradient( rgba(100, 240, 150, 0.5), rgba(80, 200, 255, 0.5));
    background-image: linear-gradient( rgba(100, 240, 150, 0.5), rgba(80, 200, 255, 0.5));
    border-radius: 48% 42%;
    -webkit-animation: spin 2s infinite linear;
    animation: spin 2s infinite linear;
}
@-webkit-keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>

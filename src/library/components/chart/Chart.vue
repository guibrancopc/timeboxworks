<template>
  <div
    ref="container"
    class="tw-chart">
    <canvas
      ref="canvas">
    </canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';
import {
  getBase64Image,
  getCanvasWithBackgroundColor,
} from '../../services/canvas/canvasService';

export default {
  name: 'TwChart',
  data() {
    return {
      chart: null,
    };
  },
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['line'].includes(value);
      },
    },
    labels: {
      type: Array,
      default: () => [],
    },
    datasets: {
      type: Array,
      required: true,
    },
    tooltipsSetup: {
      type: Object,
      default: () => ({}),
    },
    axeXType: {
      type: String,
      default: 'linear',
      validator(value) {
        return ['time', 'linear'].includes(value);
      },
    },
    axeYBeginAtZero: Boolean,
  },
  watch: {
    datasets: {
      deep: true,
      async handler() {
        this.chart.update();
      },
    },
  },
  methods: {
    chartSetup() {
      this.chart = new Chart(this.$refs.canvas, {
        type: this.type,
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          tooltips: {
            ...this.tooltipsSetup,
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: this.axeYBeginAtZero,
              },
            }],
            xAxes: [{
              type: this.axeXType,
            }],
          },
        },
      });
    },
    getBase64Image() {
      const canvasWithWhiteBackground = getCanvasWithBackgroundColor(this.$refs.canvas, '#FFF');
      return getBase64Image(canvasWithWhiteBackground);
    },
    public() {
      return {
        getBase64Image: this.getBase64Image,
      };
    },
  },
  mounted() {
    this.chartSetup();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>

<style lang="scss">
  .tw-chart {
    position: relative;
  }
</style>

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
import { installShowAllTooltipsPlugin } from './chartService';

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
    showAllTooltips: Boolean,
    axeXType: {
      type: String,
      default: 'linear',
      validator(value) {
        return ['time', 'linear'].includes(value);
      },
    },
    axeYBeginAtZero: Boolean,
  },
  mounted() {
    this.chartSetup();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
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
      installShowAllTooltipsPlugin(Chart);
      this.chart = new Chart(this.$refs.canvas, {
        type: this.type,
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          showAllTooltips: this.showAllTooltips,
          tooltips: {
            ...this.tooltipsSetup,
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Remaining Effort',
              },
              ticks: {
                beginAtZero: this.axeYBeginAtZero,
                stepSize: 1,
              },
              gridLines: {
                color: '#F8F8F8',
              },
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Event Interval',
              },
              type: this.axeXType,
              time: {
                tooltipFormat: 'ddd, MMM Do YYYY, HH:mm\\h',
                displayFormats: {
                  second: 'HH:mm\\h',
                  minute: 'HH:mm\\h',
                  hour: 'HH:mm\\h',
                  day: 'MMM DD',
                },
              },
              ticks: {
                maxTicksLimit: 20,
              },
              gridLines: {
                color: '#F8F8F8',
              },
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
};
</script>

<style lang="scss">
  .tw-chart {
    position: relative;
  }
</style>

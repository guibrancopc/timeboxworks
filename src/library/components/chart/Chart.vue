<template>
  <div
    ref="container"
    class="tw-chart">
    <canvas
      ref="chart"
      :class="canvasClasses">
    </canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

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
    getImageAndDestroyComponent: Boolean,
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
  computed: {
    canvasClasses() {
      return {
        'tw-u-display--none': this.getImageAndDestroyComponent,
      };
    },
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
      this.chart = new Chart(this.$refs.chart, {
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
    imageGetterHandler() {
      if (this.getImageAndDestroyComponent) {
        setTimeout(() => {
          this.$emit('image-generated', this.chart.toBase64Image());
          this.$refs.container.remove();
          this.$destroy();
        }, 2000);
      }
    },
  },
  mounted() {
    this.chartSetup();
    this.imageGetterHandler();
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

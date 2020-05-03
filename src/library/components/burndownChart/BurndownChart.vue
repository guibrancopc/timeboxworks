<template>
  <tw-chart
    ref="chart"
    type="line"
    axe-x-type="time"
    axe-y-begin-at-zero
    :tooltips-setup="customTooltips"
    :labels="labels"
    :datasets="getDatasets()" />
</template>

<script>
import {
  getLabels, getCustomLabels, updateProgressData,
} from './BurndownChartService';
import { momentFactory, getTimestampOf, getNow } from '../../services/timeService/timeService';

const scaleX = 10;
const projectionUpdateInterval = 60 * 1000;

export default {
  name: 'TwBurndownChart',
  data() {
    return {
      progressData: [],
      timeNow: getNow(),
      projectionData: [],
      intervalId: null,
      datasetsFromChart: null,
    };
  },
  props: {
    startTime: {
      type: [String, Number, Object],
      required: true,
    },
    endTime: {
      type: [String, Number, Object],
      required: true,
    },
    dataset: {
      type: Array,
      required: true,
    },
    showProjection: Boolean,
  },
  watch: {
    dataset(value) {
      updateProgressData(value, this.progressData);
      this.updateProjectionData();
    },
    showProjection(shouldShowProjection) {
      this.updateProjectionDatasetExibition(shouldShowProjection);
      if (shouldShowProjection) {
        setTimeout(() => {
          this.updateProjectionData();
        });
      }
    },
  },
  computed: {
    totalItems() {
      return this.dataset.length;
    },
    totalCompletedItens() {
      return this.dataset.filter(data => data.finishedAt).length;
    },
    labels() {
      return getLabels({
        startTimestamp: getTimestampOf(this.startTime),
        endTimestamp: getTimestampOf(this.endTime),
        scaleX,
      });
    },
    customTooltips() {
      return getCustomLabels({ totalTasks: this.dataset.length });
    },
  },
  methods: {
    getDatasets() {
      const datasets = [
        this.getTendencyDataset(),
        this.getProgressDataset(),
      ];

      if (this.showProjection) {
        datasets.push(this.getProjectionDataset());
      }

      return datasets;
    },
    getTendencyDataset() {
      return {
        label: 'Tendency',
        data: this.getTendencyData(),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        spanGaps: true,
      };
    },
    getTendencyData() {
      const data = [];
      data[0] = this.totalItems;
      data[scaleX] = 0;
      return data;
    },
    getProgressDataset() {
      return {
        label: 'Your progress',
        data: this.progressData,
        backgroundColor: 'rgba(0, 0, 200, 0.2)',
        borderColor: 'rgba(99, 99, 255, 1)',
        borderWidth: 1,
      };
    },
    getProjectionDataset() {
      return {
        label: 'Projection',
        data: this.projectionData,
        backgroundColor: 'rgba(0, 200, 0, 0.2)',
        borderColor: 'rgba(99, 255, 99, 1)',
        borderWidth: 1,
      };
    },
    insertFirstDotInProgressData() {
      this.progressData.push({
        id: 'first-dot',
        title: 'No task is done yet.',
        x: momentFactory(this.startTime),
        y: this.totalItems,
      });
    },
    initProjection() {
      this.updateProjectionData();
      this.intervalId = setInterval(this.updateProjectionData, projectionUpdateInterval);
    },
    updateProjectionData() {
      this.timeNow = getNow();
      cleanUpArray(this.projectionData);

      const progressDataLastItem = getArrayLastItem(this.progressData);
      if (!this.showProjection || allItensAreDone(progressDataLastItem)) { return; }

      this.projectionData.push(progressDataLastItem);
      this.projectionData.push({
        id: '_projection-now',
        title: 'Projection',
        x: this.timeNow,
        y: progressDataLastItem.y - 1,
      });
    },
    updateProjectionDatasetExibition(shouldShowProjection) {
      if (shouldShowProjection) {
        this.datasetsFromChart.push(this.getProjectionDataset());
      } else {
        this.datasetsFromChart.splice(2, 1);
      }
    },
    stopCounter() {
      clearInterval(this.intervalId);
    },
  },
  beforeMount() {
    this.insertFirstDotInProgressData();
    updateProgressData(this.dataset, this.progressData);
    this.initProjection();
  },
  mounted() {
    this.datasetsFromChart = this.$refs.chart.datasets;
  },
  beforeDestroy() {
    this.stopCounter();
  },
};

function cleanUpArray(array) {
  array.splice(0, array.length);
}

function getArrayLastItem(array) {
  return array[array.length - 1];
}

function allItensAreDone(item) {
  return item?.y === 0;
}
</script>

<template>
  <tw-chart
    type="line"
    axe-x-type="time"
    axe-y-begin-at-zero
    :tooltips-setup="getCustomTooltipsSetup()"
    :labels="labels"
    :datasets="datasets" />
</template>

<script>
import {
  getLabels, updateProgressData,
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
    disableProjection: Boolean,
  },
  watch: {
    dataset(value) {
      updateProgressData(value, this.progressData);
      this.updatePojectionData();
    },
    disableProjection() {
      this.updatePojectionData();
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
    datasets() {
      return [
        this.getTendencyDataset(),
        this.getProgressDataset(),
        this.getProjectionDataset(),
      ];
    },
  },
  methods: {
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
    getCustomTooltipsSetup() {
      const TOTAL_TASKS = this.dataset.length;
      const TENDENCY_DATASET = 0;
      const PROGRESS_DATASET = 1;
      const PROJECTION_DATASET = 2;

      return {
        callbacks: {
          title(tooltipItem, data) {
            const { index, datasetIndex } = tooltipItem[0];
            if (datasetIndex === TENDENCY_DATASET) {
              return index === 0 ? 'Tendency begin' : 'Tendency end';
            }
            if (datasetIndex === PROGRESS_DATASET) {
              const { title } = data.datasets[1].data[index];
              return title;
            }
            if (datasetIndex === PROJECTION_DATASET) {
              return index === 0 ? 'Last item done' : 'Next target';
            }
            return '';
          },
          beforeBody(tooltipItem) {
            const { datasetIndex, label } = tooltipItem[0];
            if (datasetIndex === TENDENCY_DATASET) { return ''; }
            return label;
          },
          label(tooltipItem) {
            const { index, datasetIndex } = tooltipItem;
            if (datasetIndex === TENDENCY_DATASET) {
              return index === 0 ? 'Start point' : 'Your deadline';
            }
            if (datasetIndex === PROGRESS_DATASET) {
              return `Your progress: ${index}/${TOTAL_TASKS}`;
            }
            if (datasetIndex === PROJECTION_DATASET) {
              return index === 0 ? 'Projection begin' : 'Projection end';
            }
            return '';
          },
        },
        bodySpacing: 5,
      };
    },
    initProjection() {
      this.updatePojectionData();
      this.intervalId = setInterval(this.updatePojectionData, projectionUpdateInterval);
    },
    updatePojectionData() {
      this.timeNow = getNow();
      cleanUpArray(this.projectionData);

      const progressDataLastItem = getArrayLastItem(this.progressData);
      if (progressDataLastItem.y === 0 || this.disableProjection) { return; }

      this.projectionData.push(progressDataLastItem);
      this.projectionData.push({
        id: '_projection-now',
        title: 'Projection',
        x: this.timeNow,
        y: progressDataLastItem.y - 1,
      });
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
  beforeDestroy() {
    this.stopCounter();
  },
};

function cleanUpArray(array) {
  while (array.length > 0) {
    array.pop();
  }
}

function getArrayLastItem(array) {
  return array[array.length - 1];
}
</script>

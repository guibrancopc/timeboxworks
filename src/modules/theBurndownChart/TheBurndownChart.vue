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
} from './TheBurndownChartService';
import { momentFactory, getTimestampOf } from '../../services/timeService/timeService';

const scaleX = 10;

export default {
  name: 'TwTheBurndownChart',
  data() {
    return {
      progressData: [],
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
  },
  watch: {
    dataset(value) {
      updateProgressData(value, this.progressData);
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
    insertFirstDotInProgressData() {
      this.progressData.push({
        id: 'first-dot',
        title: 'No task is done yet.',
        x: momentFactory(this.startTime),
        y: this.totalItems,
      });
    },
    getCustomTooltipsSetup() {
      return {
        callbacks: {
          title(tooltipItem, data) {
            const { index, datasetIndex } = tooltipItem[0];
            if (datasetIndex === 0) {
              return index === 0 ? 'Tendency begin' : 'Tendency end';
            }
            const { title } = data.datasets[1].data[index];
            return title;
          },
          beforeBody(tooltipItem) {
            const { datasetIndex, label } = tooltipItem[0];
            if (datasetIndex === 0) { return ''; }
            return label;
          },
          label(tooltipItem, data) {
            const { index, datasetIndex } = tooltipItem;
            if (datasetIndex === 0) {
              return index === 0 ? 'Start point' : 'Your deadline';
            }
            const { length } = data.datasets[1].data;
            const totalTasks = length - 1;
            return `Your progress: ${index}/${totalTasks}`;
          },
        },
        bodySpacing: 5,
      };
    },
  },
  beforeMount() {
    this.insertFirstDotInProgressData();
    updateProgressData(this.dataset, this.progressData);
  },
};
</script>

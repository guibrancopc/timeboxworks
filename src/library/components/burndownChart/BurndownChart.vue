<template>
  <div class="tw-burndown-chart tw-u-position--relative">
    <tw-chart
      ref="chart"
      type="line"
      axe-x-type="time"
      axe-y-begin-at-zero
      :tooltips-setup="customTooltips"
      :labels="labels"
      v-bind="$attrs"
      v-on="$listeners"
      :datasets="getDatasets()" />
      <tw-info-button
        class="tw-burndown-chart__info-button"
        @click="onInfoButtonClick">&#8505;</tw-info-button>
    </div>
</template>

<script>
import {
  getLabels, getCustomLabels, getTotalWeight, updateProgressData,
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
    totalWeight() {
      return getTotalWeight(this.dataset);
    },
    totalCompletedItens() {
      return this.dataset
        .filter(data => data.finishedAt).length;
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
      data[0] = this.totalWeight;
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
        y: this.totalWeight,
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
        y: progressDataLastItem.y - getAvgOfRemainingGoalWeights(this.dataset),
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
    onInfoButtonClick() {
      this.$twDialog.alert({
        title: 'This is your Burndown Chart 📉👀',
        text: `It helps you to know wether you are on track or not.
        Each dot of Your Progress line represents a complete goals.
        Tendency line is just a reference, to let you know when event tend do be late or not.
        Projection line is just a supposition of next goal to be finished.
        Vertical axis is the remaining goal's weight and horizontal is the event interval in time.
        As soon as a goal is finished above tendency line, the event tend do be late. So, you can decide to speed up next goals or even inform participants in advance that some goal(s) will not be completed.`,
        buttonText: 'Got it',
        closeOnOverlayClick: true,
      });
    },
  },
};

function getAvgOfRemainingGoalWeights(dataset = []) {
  return getAvgOfNumberList(dataset
    .filter(item => !item.finishedAt)
    .map(item => item.weight));
}

function getAvgOfNumberList(list = []) {
  return list.length && list.reduce((acc, item) => acc + item) / list.length;
}

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

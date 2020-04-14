import Time from '../../services/timeService/timeService';

export function getTimeDefaultModel(value) {
  return new Time(value);
}

export function getTimeMomentModel(value) {
  return new Time(value).time;
}

export function getLabels({ startTimestamp, endTimestamp, scaleX }) {
  const labels = [];
  const timeOffset = getTimeOffset(startTimestamp, endTimestamp, scaleX);

  for (let i = 0; i <= scaleX; i += 1) {
    const timestamp = startTimestamp + timeOffset * i;
    labels[i] = getTimeMomentModel(timestamp);
  }

  return labels;
}

function getTimeOffset(startTimestamp, endTimestamp, scaleX) {
  return (endTimestamp - startTimestamp) / scaleX;
}

export function updateProgressData(dataset, progressData) {
  const orderedDatasetByEndTime = getOrderedDatasetByEndTime([...dataset]);
  let finishedTaskCounter = dataset.length;

  orderedDatasetByEndTime
    .forEach(datasetItem => {
      if (!datasetItem.finishedAt) {
        removeItemFromProgressData(progressData, datasetItem.id);
      } else {
        finishedTaskCounter -= 1;
        const { id, title, finishedAt } = datasetItem;
        const item = getProgressDataItemById(progressData, id);
        if (item) {
          updateProgressDataItem(item, finishedAt, finishedTaskCounter);
        } else {
          addNewProgressDataItem(progressData, id, title, finishedAt, finishedTaskCounter);
        }
      }
    });
}

function getOrderedDatasetByEndTime(dataset) {
  return dataset
    .sort((a, b) => getValidTimestamp(a.finishedAt) - getValidTimestamp(b.finishedAt));
}

function getValidTimestamp(time) {
  return time ? new Time(time).timestamp() : 0;
}

function removeItemFromProgressData(progressData, datasetItemId) {
  progressData.forEach((progressDataItem, index) => {
    if (datasetItemId === progressDataItem.id) {
      progressData.splice(index, 1);
    }
  });
}

function getProgressDataItemById(progressData, id) {
  return progressData.filter(progressDataItem => progressDataItem.id === id)[0];
}

function updateProgressDataItem(progressDataItem, finishedAt, finishedTaskCounter) {
  progressDataItem.x = getTimeMomentModel(finishedAt);
  progressDataItem.y = finishedTaskCounter;
}

function addNewProgressDataItem(progressData, id, title, finishedAt, finishedTaskCounter) {
  progressData.push({
    id,
    title,
    x: getTimeMomentModel(finishedAt),
    y: finishedTaskCounter,
  });
}

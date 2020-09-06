import { buildApi } from '../config/api';

const api = buildApi();

export function getAllEvents() {
  return api({
    method: 'get',
    url: '/events',
  });
}

export function getEvent({ eventId }) {
  return api({
    method: 'get',
    url: `/events/${eventId}`,
  });
}

export function postEvent({
  eventId,
  name,
  description,
  expectedStartDate,
  expectedEndDate,
  realStartDate,
  realEndDate,
  goals,
}) {
  return api({
    method: 'post',
    url: `/events/${eventId}`,
    data: {
      name,
      description,
      expectedStartDate,
      expectedEndDate,
      realStartDate,
      realEndDate,
      goals,
    },
  });
}

export function updateEvent({
  eventId,
  name,
  description,
  expectedStartDate,
  expectedEndDate,
  realStartDate,
  realEndDate,
  goals,
}) {
  return api.put(`/events/${eventId}`, {
    name,
    description,
    expectedStartDate,
    expectedEndDate,
    realStartDate,
    realEndDate,
    goals,
  });
}

export function deleteEvent({ eventId }) {
  return api({
    method: 'delete',
    url: `/events/${eventId}`,
  });
}

export function updateGoal({ goalId }) {
  return api({
    method: 'put',
    url: `/events/${goalId}`,
  });
}

export function postSideTopic({ description }) {
  return api({
    method: 'post',
    url: '/side-topics/',
    data: {
      description,
    },
  });
}

export function updateSideTopic({ idSideTopic, description }) {
  return api({
    method: 'put',
    url: `/side-topics/${idSideTopic}`,
    data: {
      description,
    },
  });
}

export function deleteSideTopic({ idSideTopic }) {
  return api({
    method: 'delete',
    url: `/side-topics/${idSideTopic}`,
  });
}

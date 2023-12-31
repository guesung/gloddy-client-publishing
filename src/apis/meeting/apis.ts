import {
  MeetingHostingResponse,
  MeetingNotEstimatedResponse,
  MeetingParticipatingResponse,
  MeetingRejectedResponse,
  MeetingScrapResponse,
  MeetingWaitingResponse,
} from '.';
import privateApi from '../config/privateApi';

/* 참여 중 */
export const getMeetingParticipating = () =>
  privateApi.get<MeetingParticipatingResponse>('/users/groups/participating');

export const getMeetingHosting = () =>
  privateApi.get<MeetingHostingResponse>('/users/groups/hosting');

/* 대기 중 */

export const getMeetingWaiting = () =>
  privateApi.get<MeetingWaitingResponse>('/users/groups/waiting');

export const getMeetingRejected = () =>
  privateApi.get<MeetingRejectedResponse>('/users/groups/rejected');

export const postMeetingRejected = (applyId: number) => privateApi.post(`/applies/${applyId}`);

/* 평가 */

export const getMeetingNotEstimated = () =>
  privateApi.get<MeetingNotEstimatedResponse>('/users/groups/notEstimated');

/* 찜한 모임 */
export const getMeetingScrap = () => privateApi.get<MeetingScrapResponse>('/scraps');

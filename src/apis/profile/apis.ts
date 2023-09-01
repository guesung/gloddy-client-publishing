import privateApi from '../config/privateApi';

import type { MatesResponse, FeedbacksResponse, ProfileRequest, ProfileResponse } from './type';

export const getProfile = () => privateApi.get<ProfileResponse>('/me/page');

export const getFeedbacks = () => privateApi.get<FeedbacksResponse>('/me/feedbacks');

export const patchProfile = (profileData: ProfileRequest) =>
  privateApi.patch('/me/info', profileData);

export const getMates = () => privateApi.get<MatesResponse>('/me/mates');

export const deleteMate = (mateId: number) => privateApi.delete(`/me/mate/${mateId}`);

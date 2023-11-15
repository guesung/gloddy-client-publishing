import { FCMTokenRequest } from '.';
import { NotificationResponse } from '.';
import privateApi from '../config/privateApi';
import { privateApiNotification } from '../config/privateApiNotification';

export const postFCMToken = ({ token }: FCMTokenRequest) =>
  privateApi.post('/notifications/tokens', { token });

export const getNotification = () =>
  privateApiNotification.get<NotificationResponse>('/notifications');

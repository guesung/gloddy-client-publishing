import { Keys, getNotification } from '.';
import { useQuery } from '@tanstack/react-query';

export const useGetNotifications = () => useQuery(Keys.getNotifications(), getNotification);

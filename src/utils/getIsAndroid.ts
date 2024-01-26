import { getIsServer } from './getIsServer';

export const getIsAndroid = () => {
  const isServer = getIsServer();
  if (isServer) return false;
  alert(navigator.userAgent);

  return navigator.userAgent.match(/Android/i) != null;
};

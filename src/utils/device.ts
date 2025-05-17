import { DeviceType } from '../types';

export function detectMobileMode(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();

  const mobileKeywords = [
    'mobile',
    'android',
    'iphone',
    'ipad',
    'ipod',
    'blackberry',
    'windows phone',
    'webos',
  ];

  const isEdgeMobile =
    userAgent.includes('edg') && userAgent.includes('mobile');

  const hasMobileKeyword = mobileKeywords.some((keyword) =>
    userAgent.includes(keyword)
  );

  const isSmallScreen = window.innerWidth <= 768;

  return isEdgeMobile || hasMobileKeyword || isSmallScreen;
}

export function detectDeviceType(): DeviceType {
  const width = window.innerWidth;

  if (width <= 767) {
    return 'mobile';
  } else if (width <= 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

export const getDeviceZoom = () => {
  const deviceType = detectDeviceType();
  switch (deviceType) {
    case 'mobile':
      return 4; // Most zoomed out for mobile
    case 'tablet':
      return 3; // Medium zoom for tablet
    case 'desktop':
      return 2; // Closest zoom for desktop
    default:
      return 2.5; // Fallback
  }
};

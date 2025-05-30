import { DeviceType } from '../types';

export function detectDeviceType(): DeviceType {
  const width = window.innerWidth;
  const userAgent = navigator.userAgent.toLowerCase();

  const mobileKeywords = [
    'mobile',
    'android',
    'iphone',
    'ipod',
    'blackberry',
    'windows phone',
    'webos',
  ];
  const tabletKeywords = [
    'ipad',
    'tablet',
    'kindle',
    'playbook',
    'silk',
    'nexus 7',
    'nexus 10',
    'sm-t', // Samsung tablets
  ];

  const isEdgeMobile =
    userAgent.includes('edg') && userAgent.includes('mobile');
  const hasMobileKeyword = mobileKeywords.some((keyword) =>
    userAgent.includes(keyword)
  );
  const hasTabletKeyword = tabletKeywords.some((keyword) =>
    userAgent.includes(keyword)
  );

  if (isEdgeMobile || hasMobileKeyword || width <= 767) {
    return 'mobile';
  } else if (hasTabletKeyword || (width > 767 && width <= 1024)) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

export const getDeviceZoom = () => {
  const deviceType = detectDeviceType();
  switch (deviceType) {
    case 'mobile':
      return 4; //  mobile
    case 'tablet':
      return 3; //  tablet
    case 'desktop':
      return 2; //  desktop
    default:
      return 2.5; // fallback
  }
};

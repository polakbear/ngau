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

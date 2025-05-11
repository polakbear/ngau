export function detectMobileMode(): boolean {
  // Get user agent string
  const userAgent = navigator.userAgent.toLowerCase();

  // Check for common mobile keywords
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

  // Check for Edge mobile
  const isEdgeMobile =
    userAgent.includes('edg') && userAgent.includes('mobile');

  // Check if any mobile keywords are present
  const hasMobileKeyword = mobileKeywords.some((keyword) =>
    userAgent.includes(keyword)
  );

  // Check screen size as fallback
  const isSmallScreen = window.innerWidth <= 768;

  return isEdgeMobile || hasMobileKeyword || isSmallScreen;
}

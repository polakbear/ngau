export function detectMobileMode(): boolean {
  // Check for mobile or tablet devices using regex
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileRegex = /(android|iphone|ipad|ipod|blackberry|windows phone)/;
  return mobileRegex.test(userAgent);
}

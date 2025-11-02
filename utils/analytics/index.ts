declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
 }
  
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Track icon exports
export const trackIconExported = (iconName: string, format: string) => {
  trackEvent('icon_exported', {
    icon_name: iconName,
    format: format, // 'svg', 'png', or 'copied'
    value: 1,
  });
};

// Track icon views (when user opens an icon page)
export const trackIconViewed = (iconName: string) => {
  trackEvent('icon_viewed', {
    icon_name: iconName,
  });
};

// Track icon customizations
export const trackIconCustomized = (iconName: string, action: string) => {
  trackEvent('icon_customized', {
    icon_name: iconName,
    action: action, // 'color_changed', 'size_changed', etc.
  });
};
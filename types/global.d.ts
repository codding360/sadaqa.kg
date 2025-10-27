declare global {
  interface Window {
    // Meta Pixel (Facebook)
    fbq?: (
      action: 'track' | 'trackCustom',
      eventName: string,
      parameters?: Record<string, any>
    ) => void;
    
    // Umami Analytics
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

export {};


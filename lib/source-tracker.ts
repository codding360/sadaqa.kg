export interface SourceInfo {
  source: string;
  platform: 'instagram' | 'threads' | 'whatsapp' | 'internal' | 'direct' | 'unknown';
  referrer?: string;
  timestamp: string;
  userAgent?: string;
  url: string;
}

export class SourceTracker {
  private static instance: SourceTracker;
  
  private constructor() {}
  
  public static getInstance(): SourceTracker {
    if (!SourceTracker.instance) {
      SourceTracker.instance = new SourceTracker();
    }
    return SourceTracker.instance;
  }

  /**
   * Parse the current page URL and referrer to determine traffic source
   */
  public parseSource(): SourceInfo {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const referrer = typeof document !== 'undefined' ? document.referrer : '';
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    
    const sourceInfo: SourceInfo = {
      source: this.determineSource(referrer, url),
      platform: this.determinePlatform(referrer, url),
      referrer: referrer || undefined,
      timestamp: new Date().toISOString(),
      userAgent: userAgent || undefined,
      url: url
    };

    return sourceInfo;
  }

  /**
   * Determine the traffic source based on referrer and URL
   */
  private determineSource(referrer: string, currentUrl: string): string {
    if (!referrer) {
      return 'direct';
    }

    // Instagram sources
    if (referrer.includes('instagram.com') || referrer.includes('ig.me')) {
      return 'Instagram';
    }

    // Threads sources
    if (referrer.includes('threads.net')) {
      return 'Threads';
    }

    // WhatsApp sources
    if (referrer.includes('whatsapp.com') || referrer.includes('wa.me')) {
      return 'WhatsApp';
    }

    // Internal links (same domain)
    try {
      const referrerUrl = new URL(referrer);
      const currentUrlObj = new URL(currentUrl);
      
      if (referrerUrl.hostname === currentUrlObj.hostname) {
        return 'Internal';
      }
    } catch (e) {
      // Invalid URL, continue with other checks
    }

    // Other external sources
    try {
      const referrerUrl = new URL(referrer);
      return referrerUrl.hostname;
    } catch (e) {
      return 'unknown';
    }
  }

  /**
   * Determine the platform type based on referrer and URL
   */
  private determinePlatform(referrer: string, currentUrl: string): SourceInfo['platform'] {
    if (!referrer) {
      return 'direct';
    }

    // Instagram
    if (referrer.includes('instagram.com') || referrer.includes('ig.me')) {
      return 'instagram';
    }

    // Threads
    if (referrer.includes('threads.net')) {
      return 'threads';
    }

    // WhatsApp
    if (referrer.includes('whatsapp.com') || referrer.includes('wa.me')) {
      return 'whatsapp';
    }

    // Internal links
    try {
      const referrerUrl = new URL(referrer);
      const currentUrlObj = new URL(currentUrl);
      
      if (referrerUrl.hostname === currentUrlObj.hostname) {
        return 'internal';
      }
    } catch (e) {
      // Invalid URL, continue with other checks
    }

    return 'unknown';
  }

  /**
   * Log source information to console with detailed formatting
   */
  public logSourceInfo(sourceInfo: SourceInfo): void {
    const { source, platform, referrer, timestamp, url } = sourceInfo;
    
    console.group('🔍 Traffic Source Analysis');
    console.log('📊 Source:', source);
    console.log('🏷️ Platform:', platform);
    console.log('🔗 Referrer:', referrer || 'Direct access');
    console.log('⏰ Timestamp:', timestamp);
    console.log('🌐 Current URL:', url);
    
    // Platform-specific styling
    switch (platform) {
      case 'instagram':
        console.log('%c📸 Instagram Traffic Detected!', 'color: #E4405F; font-weight: bold; font-size: 14px;');
        break;
      case 'threads':
        console.log('%c🧵 Threads Traffic Detected!', 'color: #000000; font-weight: bold; font-size: 14px;');
        break;
      case 'whatsapp':
        console.log('%c💬 WhatsApp Traffic Detected!', 'color: #25D366; font-weight: bold; font-size: 14px;');
        break;
      case 'internal':
        console.log('%c🏠 Internal Navigation Detected!', 'color: #3B82F6; font-weight: bold; font-size: 14px;');
        break;
      case 'direct':
        console.log('%c🎯 Direct Access Detected!', 'color: #10B981; font-weight: bold; font-size: 14px;');
        break;
      default:
        console.log('%c❓ Unknown Source Detected!', 'color: #6B7280; font-weight: bold; font-size: 14px;');
    }
    
    console.groupEnd();
  }

  /**
   * Track and log source information
   */
  public track(): SourceInfo {
    const sourceInfo = this.parseSource();
    this.logSourceInfo(sourceInfo);
    return sourceInfo;
  }
}

// Export singleton instance
export const sourceTracker = SourceTracker.getInstance();

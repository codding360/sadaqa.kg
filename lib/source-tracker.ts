export interface SourceInfo {
  source: string;
  platform: string;
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
   * Determine the traffic source based on URL parameter
   */
  private determineSource(referrer: string, currentUrl: string): string {
    // Parse URL to get source parameter
    try {
      const urlObj = new URL(currentUrl);
      const sourceParam = urlObj.searchParams.get('source');
      
      if (sourceParam) {
        return sourceParam;
      }
    } catch (e) {
      // Invalid URL, return direct
    }

    return 'direct';
  }

  /**
   * Determine the platform type based on URL parameter
   */
  private determinePlatform(referrer: string, currentUrl: string): string {
    // Parse URL to get source parameter
    try {
      const urlObj = new URL(currentUrl);
      const sourceParam = urlObj.searchParams.get('source');
      
      if (sourceParam) {
        return sourceParam;
      }
    } catch (e) {
      // Invalid URL, return direct
    }

    return 'direct';
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
    
    // Dynamic platform styling based on source parameter
    if (platform === 'direct') {
      console.log('%c🎯 Direct Access Detected!', 'color: #10B981; font-weight: bold; font-size: 14px;');
    } else {
      console.log(`%c🎯 Traffic from: ${platform}`, 'color: #3B82F6; font-weight: bold; font-size: 14px;');
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

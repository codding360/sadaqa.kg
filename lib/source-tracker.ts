export interface SourceInfo {
  source: string;
  platform: string;
  referrer?: string;
  timestamp: string;
  userAgent?: string;
  url: string;
  sessionDuration?: number; // in seconds
  sessionStartTime?: string;
  sessionId?: string; // unique session identifier
}

export class SourceTracker {
  private static instance: SourceTracker;
  private sessionStartTime: number = 0;
  private sessionId: string = '';
  
  private constructor() {
    // Initialize session start time when the tracker is created
    this.sessionStartTime = Date.now();
    // Generate unique session ID
    this.sessionId = this.generateSessionId();
  }

  /**
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    return `session_${timestamp}_${random}`;
  }
  
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
    const currentTime = Date.now();
    const sessionDuration = Math.floor((currentTime - this.sessionStartTime) / 1000); // Convert to seconds
    
    const sourceInfo: SourceInfo = {
      source: this.determineSource(referrer, url),
      platform: this.determinePlatform(referrer, url),
      referrer: referrer || undefined,
      timestamp: new Date().toISOString(),
      userAgent: userAgent || undefined,
      url: url,
      sessionDuration: sessionDuration,
      sessionStartTime: new Date(this.sessionStartTime).toISOString(),
      sessionId: this.sessionId
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
    const { source, platform, referrer, timestamp, url, sessionDuration, sessionStartTime, sessionId } = sourceInfo;
    
    console.group('🔍 Traffic Source Analysis');
    console.log('🆔 Session ID:', sessionId);
    console.log('📊 Source:', source);
    console.log('🏷️ Platform:', platform);
    console.log('🔗 Referrer:', referrer || 'Direct access');
    console.log('⏰ Timestamp:', timestamp);
    console.log('🌐 Current URL:', url);
    console.log('⏱️ Session Duration:', `${sessionDuration}s`);
    console.log('🚀 Session Started:', sessionStartTime);
    
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

  /**
   * Track specific user actions with session duration
   */
  public trackAction(action: string, additionalData?: any): SourceInfo {
    const sourceInfo = this.parseSource();
    const actionInfo = {
      ...sourceInfo,
      source: `${action} - ${sourceInfo.source}`,
      action: action,
      additionalData: additionalData
    };
    
    console.group(`🎯 User Action: ${action}`);
    console.log('⏱️ Session Duration:', `${sourceInfo.sessionDuration}s`);
    console.log('📊 Action:', action);
    if (additionalData) {
      console.log('📋 Additional Data:', additionalData);
    }
    console.groupEnd();
    
    return actionInfo;
  }
}

// Export singleton instance
export const sourceTracker = SourceTracker.getInstance();

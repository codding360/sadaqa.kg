'use client';

import { useEffect } from 'react';
import { sourceTracker, type SourceInfo } from '@/lib/source-tracker';

interface SourceAnalyticsProps {
  enableConsoleLogging?: boolean;
}

export function sendToTelegram(sourceInfo: SourceInfo, useBeacon = false) {
  try {
    const source = sourceInfo.source;
    const platform = sourceInfo.platform;
    const timestamp = sourceInfo.timestamp;
    const sessionDuration = sourceInfo.sessionDuration || 0;
    const sessionStartTime = sourceInfo.sessionStartTime;
    const sessionId = sourceInfo.sessionId;
    
    // Format session duration
    const formatDuration = (seconds: number) => {
      if (seconds < 60) return `${seconds}s`;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    };
    
    const message = `🎯 *User Action Alert*
🆔 *Session ID:* ${sessionId}
📍 *Action:* ${source}
🖥️ *Platform:* ${platform}
⏰ *Timestamp:* ${new Date(timestamp).toLocaleString()}
⏱️ *Session Duration:* ${formatDuration(sessionDuration)}
🚀 *Session Started:* ${sessionStartTime ? new Date(sessionStartTime).toLocaleString() : 'Unknown'}

#UserTracking #SessionAnalytics`;

    const url = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

    if (useBeacon && navigator.sendBeacon) {
      // Use sendBeacon for page unload events - more reliable
      navigator.sendBeacon(url);
    } else {
      // Use regular fetch for other events
      fetch(url, { method: 'GET' });
    }
  } catch (error) {
    console.error('Failed to send to Telegram:', error);
  }
}

export function SourceAnalytics({ 
  enableConsoleLogging = false 
}: SourceAnalyticsProps) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Small delay to ensure all page resources are loaded
    const timer = setTimeout(() => {
      try {
        const sourceInfo = sourceTracker.track() as SourceInfo;
        // Only log to console, no Telegram notification
        sendToTelegram(sourceInfo, true)
        if (enableConsoleLogging) {
          console.log('🔍 Source tracking initialized:', sourceInfo);
        }
      } catch (error) {
        console.error('❌ Error in source tracking:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [enableConsoleLogging]);

  // This component doesn't render anything
  return null;
}

// Hook for manual source tracking
export function useSourceTracking() {
  const trackSource = () => {
    if (typeof window === 'undefined') return null;
    return sourceTracker.track();
  };

  const parseSource = () => {
    if (typeof window === 'undefined') return null;
    return sourceTracker.parseSource();
  };

  return {
    trackSource,
    parseSource
  };
}

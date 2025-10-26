'use client';

import { useEffect } from 'react';
import { sourceTracker, type SourceInfo } from '@/lib/source-tracker';

interface SourceAnalyticsProps {
  enableConsoleLogging?: boolean;
}

export function sendToTelegram(sourceInfo: SourceInfo) {
  try {
    const source = sourceInfo.source;
    const platform = sourceInfo.platform;
    const timestamp = sourceInfo.timestamp;
    const message = `🎯 *Source Tracking Alert*
📍 *Source:* ${source}
🖥️ *Platform:* ${platform}
⏰ *Timestamp:* ${new Date(timestamp).toLocaleString()}

#SourceTracking #Analytics`;

    fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`, {
      method: 'GET'
    });
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
        sendToTelegram(sourceInfo);
      } catch (error) {
        console.error('❌ Error in source tracking:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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

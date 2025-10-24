'use client';

import { useEffect } from 'react';
import { sourceTracker, type SourceInfo } from '@/lib/source-tracker';

interface SourceAnalyticsProps {
  enableConsoleLogging?: boolean;
}

function sendToTelegram(sourceInfo: SourceInfo) {
  try {
    const source = sourceInfo.source;
    const timestamp = sourceInfo.timestamp;
    const message = `🎯 *Source Tracking Alert*
📍 *Source:* ${source}
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
  enableConsoleLogging = true 
}: SourceAnalyticsProps) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Small delay to ensure all page resources are loaded
    const timer = setTimeout(() => {
      try {
        const sourceInfo = sourceTracker.track() as SourceInfo;

        if (enableConsoleLogging) {
          console.log('Source info:', sourceInfo);
        }

        sendToTelegram(sourceInfo);
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

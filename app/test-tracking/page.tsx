'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSourceTracking } from '@/components/source-analytics';
import { type SourceInfo } from '@/lib/source-tracker';

export default function TestTrackingPage() {
  const [sourceInfo, setSourceInfo] = useState<SourceInfo | null>(null);
  const { trackSource, parseSource } = useSourceTracking();

  const handleManualTrack = () => {
    const info = trackSource();
    if (info) {
      setSourceInfo(info);
    }
  };

  const handleParseSource = () => {
    const info = parseSource();
    if (info) {
      setSourceInfo(info);
    }
  };

  useEffect(() => {
    // Auto-track on page load
    const info = trackSource();
    if (info) {
      setSourceInfo(info);
    }
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Source Tracking Test</h1>
          <p className="text-gray-600 text-lg">
            This page demonstrates the source tracking functionality. 
            Open the browser console to see detailed source information.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Current Source Info */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Current Source Information</h2>
            {sourceInfo ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Source:</span>
                  <span className="text-blue-600 font-semibold">{sourceInfo.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Platform:</span>
                  <span className="text-green-600 font-semibold">{sourceInfo.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Referrer:</span>
                  <span className="text-gray-600 text-sm break-all">
                    {sourceInfo.referrer || 'Direct access'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Timestamp:</span>
                  <span className="text-gray-600 text-sm">{sourceInfo.timestamp}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No source information available</p>
            )}
          </Card>

          {/* Test Actions */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Test Actions</h2>
            <div className="space-y-4">
              <Button onClick={handleManualTrack} className="w-full">
                🔍 Track Source Again
              </Button>
              <Button onClick={handleParseSource} variant="outline" className="w-full">
                📊 Parse Source Info
              </Button>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">How to Test:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Open browser console (F12)</li>
                <li>• Navigate from Instagram/Threads/WhatsApp</li>
                <li>• Use internal links within the site</li>
                <li>• Access directly via URL</li>
                <li>• Check console for detailed source logs</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Source Types Explanation */}
        <Card className="mt-6 p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Supported Source Types</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 bg-pink-50 rounded-lg">
              <h3 className="font-semibold text-pink-800 mb-2">📸 Instagram</h3>
              <p className="text-sm text-pink-700">
                Detects traffic from Instagram posts, stories, and links
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">🧵 Threads</h3>
              <p className="text-sm text-gray-700">
                Detects traffic from Threads posts and shares
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">💬 WhatsApp</h3>
              <p className="text-sm text-green-700">
                Detects traffic from WhatsApp messages and links
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">🏠 Internal</h3>
              <p className="text-sm text-blue-700">
                Detects navigation within the same domain
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}

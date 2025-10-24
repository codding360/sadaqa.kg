# Source Tracking System

This system automatically tracks and logs where visitors are coming from, specifically detecting traffic from Instagram, Threads, WhatsApp, internal links, and direct access.

## Features

- 🔍 **Automatic Source Detection**: Automatically detects traffic sources on page load
- 📊 **Console Logging**: Detailed console logs with color-coded platform identification
- 🎯 **Multiple Platform Support**: Instagram, Threads, WhatsApp, internal links, direct access
- 🔧 **Manual Tracking**: Hook for manual source tracking when needed
- 📈 **Analytics Integration**: Easy integration with analytics services

## How It Works

### 1. Automatic Tracking
The system automatically tracks sources when users visit any page. It analyzes:
- **Referrer URL**: Where the user came from
- **Current URL**: The page they're visiting
- **User Agent**: Browser information
- **Timestamp**: When the tracking occurred

### 2. Source Detection Logic

```typescript
// Instagram detection
if (referrer.includes('instagram.com') || referrer.includes('ig.me')) {
  return 'instagram';
}

// Threads detection
if (referrer.includes('threads.net')) {
  return 'threads';
}

// WhatsApp detection
if (referrer.includes('whatsapp.com') || referrer.includes('wa.me')) {
  return 'whatsapp';
}

// Internal links (same domain)
if (referrerUrl.hostname === currentUrlObj.hostname) {
  return 'internal';
}
```

### 3. Console Output

When a source is detected, you'll see detailed console logs like:

```
🔍 Traffic Source Analysis
📊 Source: Instagram
🏷️ Platform: instagram
🔗 Referrer: https://instagram.com/p/ABC123
⏰ Timestamp: 2024-01-15T10:30:00.000Z
🌐 Current URL: https://yoursite.com/patient-slug
📸 Instagram Traffic Detected!
```

## Usage

### Basic Integration

The system is already integrated into your layout. It will automatically track sources on all pages.

### Manual Tracking

If you need to manually track sources in components:

```typescript
import { useSourceTracking } from '@/components/source-analytics';

function MyComponent() {
  const { trackSource, parseSource } = useSourceTracking();
  
  const handleTrack = () => {
    const sourceInfo = trackSource();
    console.log('Manual tracking:', sourceInfo);
  };
  
  return <button onClick={handleTrack}>Track Source</button>;
}
```

### Custom Source Detection

You can extend the source detection logic by modifying the `SourceTracker` class:

```typescript
// Add new platform detection
private determinePlatform(referrer: string, currentUrl: string): SourceInfo['platform'] {
  // Add your custom logic here
  if (referrer.includes('tiktok.com')) {
    return 'tiktok';
  }
  // ... existing logic
}
```

## Testing

### Test Page
Visit `/test-tracking` to see the source tracking in action and test different scenarios.

### Manual Testing
1. Open browser console (F12)
2. Navigate to your site from different sources:
   - Instagram post/story
   - Threads post
   - WhatsApp message
   - Internal link within your site
   - Direct URL access
3. Check console for source detection logs

### URL Parameters for Testing
You can simulate different referrers by adding URL parameters:

```
?utm_source=instagram&utm_medium=social
?utm_source=threads&utm_medium=social
?utm_source=whatsapp&utm_medium=chat
```

## Console Output Examples

### Instagram Traffic
```
🔍 Traffic Source Analysis
📊 Source: Instagram
🏷️ Platform: instagram
🔗 Referrer: https://instagram.com/p/ABC123
⏰ Timestamp: 2024-01-15T10:30:00.000Z
🌐 Current URL: https://yoursite.com/
📸 Instagram Traffic Detected!
```

### WhatsApp Traffic
```
🔍 Traffic Source Analysis
📊 Source: WhatsApp
🏷️ Platform: whatsapp
🔗 Referrer: https://wa.me/1234567890
⏰ Timestamp: 2024-01-15T10:30:00.000Z
🌐 Current URL: https://yoursite.com/
💬 WhatsApp Traffic Detected!
```

### Internal Navigation
```
🔍 Traffic Source Analysis
📊 Source: Internal
🏷️ Platform: internal
🔗 Referrer: https://yoursite.com/previous-page
⏰ Timestamp: 2024-01-15T10:30:00.000Z
🌐 Current URL: https://yoursite.com/current-page
🏠 Internal Navigation Detected!
```

## Integration with Analytics

The system provides a callback function for integration with analytics services:

```typescript
<SourceAnalytics 
  onSourceDetected={(sourceInfo) => {
    // Send to Google Analytics
    gtag('event', 'source_detected', {
      source: sourceInfo.source,
      platform: sourceInfo.platform,
      referrer: sourceInfo.referrer
    });
    
    // Send to custom analytics
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify(sourceInfo)
    });
  }}
/>
```

## File Structure

```
lib/
  source-tracker.ts          # Core tracking logic
components/
  source-analytics.tsx       # React component and hooks
app/
  test-tracking/
    page.tsx                 # Test page for demonstration
```

## Troubleshooting

### No Console Output
- Ensure you're on the client side (not server-side rendering)
- Check browser console is open
- Verify the component is mounted

### Incorrect Source Detection
- Check the referrer URL format
- Verify the detection logic in `SourceTracker`
- Test with different browsers/devices

### Performance Issues
- The tracking runs only once per page load
- Minimal performance impact
- Uses browser APIs efficiently

## Customization

### Adding New Platforms
1. Update the `SourceInfo` interface
2. Modify the `determinePlatform` method
3. Add console styling for the new platform
4. Update the test page if needed

### Styling Console Output
Modify the `logSourceInfo` method to customize console output colors and formatting.

## Security Considerations

- No sensitive data is collected
- Only public referrer information is used
- No cookies or local storage required
- GDPR compliant (no personal data tracking)

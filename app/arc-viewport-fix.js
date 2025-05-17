// This script fixes viewport width issues in Arc browser
// Based on the GitHub issue: https://github.com/vercel/next.js/issues/47839

export function initArcViewportFix() {
  // Only run on client
  if (typeof window === 'undefined') return;

  // Force the viewport width to match the device width
  function fixViewport() {
    // Get the device width
    const deviceWidth = window.innerWidth;
    
    // Find if we're in Arc browser - some detection techniques
    const isArc = /Arc/.test(navigator.userAgent) || 
                (/AppleWebKit/.test(navigator.userAgent) && 
                 /Mobile/.test(navigator.userAgent) &&
                 !/Safari/.test(navigator.userAgent));
    
    // Only apply fixes for Arc browser
    if (isArc) {
      // Force the layout viewport width
      document.documentElement.style.width = deviceWidth + 'px';
      document.body.style.width = deviceWidth + 'px';
      
      // Set min-width on key elements
      document.documentElement.style.minWidth = deviceWidth + 'px';
      document.body.style.minWidth = deviceWidth + 'px';
    }
  }
  
  // Apply immediately
  fixViewport();
  
  // Apply on resize
  window.addEventListener('resize', fixViewport);
  
  // Apply on orientation change
  window.addEventListener('orientationchange', fixViewport);
  
  // Apply on first user interaction (important for some mobile browsers)
  document.addEventListener('touchstart', function onFirstTouch() {
    fixViewport();
    // Remove the event listener after first touch
    document.removeEventListener('touchstart', onFirstTouch, false);
  }, false);
} 
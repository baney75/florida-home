/**
 * Trigger haptic feedback on supported devices
 * Note: iOS Safari has limited vibration support
 * @param type - The intensity of haptic feedback
 * @returns void
 */
export function haptic(type: "light" | "medium" | "heavy" | "success" | "warning" | "error" = "light"): void {
  // Check if we're on iOS - vibration API is not supported on iOS Safari
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && 
                !(window as { MSStream?: unknown }).MSStream;
  
  if (isIOS) {
    // iOS Safari doesn't support navigator.vibrate()
    // Try to use impact haptic if available (limited support)
    return;
  }

  // Check if vibration API is available and supported (Android)
  if (typeof navigator === "undefined" || !navigator.vibrate) {
    return;
  }

  // Vibration patterns for different feedback types
  const patterns: Record<string, number | number[]> = {
    light: 15,           // 15ms subtle tap
    medium: 25,          // 25ms medium tap
    heavy: 40,           // 40ms strong tap
    success: [15, 60, 15],  // Two taps with pause
    warning: [25, 40, 25],  // Two medium taps with pause
    error: [40, 60, 40, 60, 40],  // Three strong taps with pauses
  };

  try {
    // Ensure we're in a user gesture context
    const result = navigator.vibrate(patterns[type]);
    if (!result) {
      // Vibration was blocked or failed
      console.log("Haptic feedback blocked or not supported");
    }
  } catch (err) {
    // Silently fail if vibration is not allowed or fails
    console.log("Haptic error:", err);
  }
}

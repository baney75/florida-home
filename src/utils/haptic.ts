/**
 * Trigger haptic feedback on supported devices
 * @param type - The intensity of haptic feedback
 * @returns void
 */
export function haptic(type: "light" | "medium" | "heavy" | "success" | "warning" | "error" = "light"): void {
  // Check if vibration API is available and supported
  if (typeof navigator === "undefined" || !navigator.vibrate) {
    return;
  }

  // Vibration patterns for different feedback types
  const patterns: Record<string, number | number[]> = {
    light: 10,           // 10ms subtle tap
    medium: 20,          // 20ms medium tap
    heavy: 30,           // 30ms strong tap
    success: [10, 50, 10],  // Two light taps with pause
    warning: [20, 30, 20],  // Two medium taps with pause
    error: [30, 50, 30, 50, 30],  // Three strong taps with pauses
  };

  try {
    navigator.vibrate(patterns[type]);
  } catch {
    // Silently fail if vibration is not allowed or fails
  }
}

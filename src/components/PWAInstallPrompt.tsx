import { usePWA } from "../hooks/usePWA";
import { haptic } from "../utils/haptic";

export function PWAInstallPrompt() {
  const { isStandalone, canInstall, isUpdateAvailable, installPWA, updatePWA } = usePWA();

  // Don't show anything if already in PWA mode
  if (isStandalone) {
    // Show update button if update is available
    if (isUpdateAvailable) {
      return (
        <div className="fixed top-4 left-4 right-4 bg-[#800000] text-white px-4 py-3 rounded-xl shadow-lg z-40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-sm font-medium">Update available</span>
          </div>
          <button
            type="button"
            onClick={() => {
              haptic("success");
              updatePWA();
            }}
            className="bg-white text-[#800000] px-4 py-1.5 rounded-lg text-sm font-semibold active:scale-95 transition-transform"
          >
            Update
          </button>
        </div>
      );
    }
    return null;
  }

  // Show install prompt if can install
  if (canInstall) {
    return (
      <div className="bg-[#800000] text-white rounded-xl p-4 mb-4 shadow-md">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-base">Install Florida Home Access</p>
            <p className="text-sm text-white/80 mt-1">
              Add to your home screen for quick offline access to your codes.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                type="button"
                onClick={() => {
                  haptic("success");
                  installPWA();
                }}
                className="bg-white text-[#800000] px-4 py-2 rounded-lg text-sm font-semibold active:scale-95 transition-transform flex-1"
              >
                Install
              </button>
              <button
                type="button"
                onClick={() => {
                  haptic("light");
                  // Dismiss for this session
                  document.getElementById('install-prompt')?.style.setProperty('display', 'none');
                }}
                className="bg-transparent border border-white/50 text-white px-4 py-2 rounded-lg text-sm active:scale-95 transition-transform"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show iOS install instructions if on iOS but can't install (Safari limitation)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as { MSStream?: unknown }).MSStream;
  
  if (isIOS) {
    return (
      <div className="bg-gradient-to-r from-[#800000] to-[#600000] text-white rounded-xl p-4 mb-4 shadow-md">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-base">Install for Offline Access</p>
            <p className="text-sm text-white/80 mt-1">
              Tap <strong>Share</strong> then <strong>"Add to Home Screen"</strong> to install.
            </p>
            <div className="mt-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs text-white/70">Works offline</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

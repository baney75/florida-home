import { usePWA } from "../hooks/usePWA";
import { haptic } from "../utils/haptic";
import { useEffect, useState } from "react";

export function PWAInstallPrompt() {
  const { isStandalone, canInstall, isUpdateAvailable, installPWA, updatePWA } = usePWA();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hiddenUntil = Number(localStorage.getItem("fh_install_prompt_hidden_until") || "0");
    setHidden(hiddenUntil > Date.now());
  }, []);

  const dismissPrompt = () => {
    haptic("light");
    localStorage.setItem(
      "fh_install_prompt_hidden_until",
      String(Date.now() + 1000 * 60 * 60 * 12),
    );
    setHidden(true);
  };

  if (hidden) {
    return null;
  }

  // Don't show anything if already in PWA mode
  if (isStandalone) {
    // Show update button if update is available
    if (isUpdateAvailable) {
      return (
        <div className="mb-2 rounded-lg border border-[#800000]/25 bg-[#800000] px-3 py-2 text-white shadow-sm">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-xs font-medium">PWA update available</span>
            <button
              type="button"
              onClick={() => {
                haptic("success");
                updatePWA();
              }}
              className="ml-auto rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-[#800000] active:scale-95 transition-transform"
            >
              Update
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  // Show install prompt if can install
  if (canInstall) {
    return (
      <div className="mb-2 rounded-lg border border-[#800000]/20 bg-white px-3 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#800000]/10 text-[#800000]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[#800000]">Install app for offline access</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                haptic("success");
                installPWA();
              }}
              className="rounded-md bg-[#800000] px-2.5 py-1 text-xs font-semibold text-white active:scale-95 transition-transform"
            >
              Install
            </button>
            <button
              type="button"
              onClick={dismissPrompt}
              className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 active:scale-95 transition-transform"
              aria-label="Dismiss install prompt"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show iOS install instructions if on iOS but can't install (Safari limitation)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as { MSStream?: unknown }).MSStream;
  
  if (isIOS) {
    return (
      <div className="mb-2 rounded-lg border border-[#800000]/20 bg-white px-3 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#800000]/10 text-[#800000]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="min-w-0 flex-1 text-xs text-gray-700">
            Tap <span className="font-semibold">Share</span> then <span className="font-semibold">Add to Home Screen</span>
          </p>
          <button
            type="button"
            onClick={dismissPrompt}
            className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 active:scale-95 transition-transform"
          >
            Later
          </button>
          <div className="text-[10px] font-medium text-[#800000]">Offline</div>
        </div>
      </div>
    );
  }

  return null;
}

import CodeCard from "./components/CodeCard";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { useState, useEffect } from "react";
import { haptic } from "./utils/haptic";

declare const __BUILD_TIME__: string;

const codes = [
  {
    label: "Disarm Alarm",
    value: "95321",
  },
  {
    label: "Arm Away Alarm",
    value: "95322",
  },
  {
    label: "Gate PIN",
    value: "085764",
  },
];

const doorCode = "924-392";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Update time every second for real-time display
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const openFullscreen = () => {
    haptic("medium");
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    haptic("light");
    setIsFullscreen(false);
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <main className="mx-auto max-w-full sm:max-w-[448px] lg:max-w-[560px] w-full px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-6 flex flex-col flex-1 pb-[env(safe-area-inset-bottom)]">
        {/* PWA Install Prompt - Only shows in browser */}
        <div id="install-prompt" className="flex-shrink-0">
          <PWAInstallPrompt />
        </div>

        {/* Compact Header with Date and Time */}
        <header className="text-center flex-shrink-0 mb-3 lg:mb-4">
          <div className="flex justify-center mb-1">
            <div className="w-12 h-12 rounded-xl shadow-sm overflow-hidden bg-white">
              <img
                src="/florida-home/logo.png"
                alt="Florida Home"
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
          <h1 className="text-lg font-bold text-[#800000] leading-tight">
            Florida Home
          </h1>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <p className="text-xs text-gray-500 leading-tight">{formattedDate}</p>
            <span className="text-xs text-gray-300">|</span>
            <p className="text-xs text-gray-500 leading-tight font-medium">{formattedTime}</p>
          </div>
        </header>

        {/* Code Cards - Compact */}
        <div className="space-y-2 lg:space-y-3 flex-shrink-0">
          {codes.map((code) => (
            <CodeCard
              key={code.label}
              label={code.label}
              value={code.value}
            />
          ))}
        </div>

        {/* Front Door Code Section - NEW */}
        <section className="mt-2 lg:mt-3 rounded-xl bg-white shadow border-2 border-[#dc2626] p-3 lg:p-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#dc2626] flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-gray-900 leading-tight">Front Door Code</p>
              <p className="text-xs text-gray-500 leading-tight">Digital Lock Access</p>
            </div>
          </div>

          <div className="w-full bg-gray-50 rounded-lg border border-gray-200 p-4 lg:p-5 text-center">
            <p className="text-3xl lg:text-4xl font-bold text-[#dc2626] font-mono tracking-wider leading-tight">
              {doorCode}
            </p>
            <p className="mt-2 text-xs text-gray-500 leading-tight">
              Enter on the door lock keypad to unlock
            </p>
          </div>
        </section>

        {/* Gate QR Code Section - Compact */}
        <section className="mt-2 lg:mt-3 rounded-xl bg-white shadow border-2 border-[#b8960c] p-3 lg:p-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#b8960c] flex items-center justify-center flex-shrink-0">
              <svg 
                className="w-4 h-4 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" 
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-gray-900 leading-tight">Gate QR Code</p>
              <p className="text-xs text-gray-500 leading-tight">Tap to enlarge</p>
            </div>
          </div>
          
          <button
            type="button"
            className="w-full min-h-[44px] flex justify-center p-3 lg:p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer motion-safe:active:scale-95 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#800000] focus-visible:outline-offset-2"
            onClick={openFullscreen}
            aria-label="Tap to enlarge QR code"
          >
            <img
              src="/florida-home/gate-qr-code.png"
              alt="Gate Access QR Code"
              className="w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain rounded bg-white"
              loading="eager"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const errorMsg = document.createElement('div');
                errorMsg.className = 'text-red-500 text-sm p-2';
                errorMsg.textContent = 'QR failed to load';
                target.parentElement?.appendChild(errorMsg);
              }}
            />
          </button>
          
          <p className="mt-2 text-xs lg:text-sm text-center text-gray-400 leading-tight">
            Hold 2-3 inches from scanner
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-auto text-center pt-4 lg:pt-6 pb-2 flex-shrink-0">
          <p className="text-xs text-gray-400">✝︎ Family Access Only</p>
          <button
            type="button"
            onClick={async () => {
              if (confirm('Clear cache and reload to get the latest version?')) {
                // Clear all caches
                if ('caches' in window) {
                  const cacheNames = await caches.keys();
                  await Promise.all(cacheNames.map(name => caches.delete(name)));
                }
                // Unregister service worker
                if ('serviceWorker' in navigator) {
                  const registrations = await navigator.serviceWorker.getRegistrations();
                  await Promise.all(registrations.map(reg => reg.unregister()));
                }
                // Hard reload
                window.location.reload();
              }
            }}
            className="mt-2 text-[10px] lg:text-xs text-gray-300 hover:text-gray-500 transition-colors"
            aria-label="Clear cache and reload"
          >
            v{__BUILD_TIME__?.slice(0, 10) || '1.0'} • Tap to refresh
          </button>
        </footer>
      </main>

      {/* Fullscreen QR Code Overlay */}
      {isFullscreen && (
        <button
          type="button"
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4 cursor-default"
          onClick={closeFullscreen}
          aria-label="Tap to close fullscreen"
        >
          <div className="absolute top-4 left-0 right-0 text-center pointer-events-none">
            <p className="text-white text-lg font-semibold">Gate QR Code</p>
            <p className="text-gray-400 text-sm">Tap anywhere to close</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <img
              src="/florida-home/gate-qr-code.png"
              alt="Gate Access QR Code - Fullscreen"
              className="w-72 h-72 sm:w-80 sm:h-80 object-contain"
            />
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
            <p className="text-gray-400 text-sm">Hold 2-3 inches from scanner</p>
          </div>
        </button>
      )}
    </div>
  );
}

export default App;

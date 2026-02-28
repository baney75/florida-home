import CodeCard from "./components/CodeCard";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { CrossIcon } from "./components/CrossIcon";
import { useState } from "react";
import { haptic } from "./utils/haptic";

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

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function App() {
  const currentDate = formatDate(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = () => {
    haptic("medium");
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    haptic("light");
    setIsFullscreen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <main className="mx-auto max-w-[420px] w-full px-3 py-3 flex flex-col flex-1">
        {/* PWA Install Prompt - Only shows in browser */}
        <div id="install-prompt" className="flex-shrink-0">
          <PWAInstallPrompt />
        </div>

        {/* Compact Header */}
        <header className="text-center flex-shrink-0 mb-2">
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
          <p className="text-[10px] text-gray-400 leading-tight">{currentDate}</p>
        </header>

        {/* Code Cards - Compact */}
        <div className="space-y-2 flex-shrink-0">
          {codes.map((code) => (
            <CodeCard
              key={code.label}
              label={code.label}
              value={code.value}
            />
          ))}
        </div>

        {/* Gate QR Code Section - Compact */}
        <section className="mt-2 rounded-xl bg-white shadow border-2 border-[#b8960c] p-3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-[#b8960c] flex items-center justify-center flex-shrink-0">
              <svg 
                className="w-3 h-3 text-white" 
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
              <p className="text-sm font-bold text-gray-900 leading-tight">Gate QR Code</p>
              <p className="text-[10px] text-gray-500 leading-tight">Tap to enlarge</p>
            </div>
          </div>
          
          <button
            type="button"
            className="w-full flex justify-center p-2 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer active:scale-95 transition-transform"
            onClick={openFullscreen}
            aria-label="Tap to enlarge QR code"
          >
            <img
              src="/florida-home/gate-qr-code.png"
              alt="Gate Access QR Code"
              className="w-32 h-32 object-contain rounded bg-white"
              loading="eager"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const errorMsg = document.createElement('div');
                errorMsg.className = 'text-red-500 text-xs p-2';
                errorMsg.textContent = 'QR failed to load';
                target.parentElement?.appendChild(errorMsg);
              }}
            />
          </button>
          
          <p className="mt-1 text-[10px] text-center text-gray-400 leading-tight">
            Hold 2-3 inches from scanner
          </p>
        </section>

        {/* Compact Footer */}
        <footer className="mt-auto text-center pt-2 flex-shrink-0">
          <p className="text-[10px] text-gray-400 flex items-center justify-center gap-0.5">
            <CrossIcon className="w-2.5 h-2.5" />
            Family Access Only
          </p>
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
              className="w-72 h-72 object-contain"
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

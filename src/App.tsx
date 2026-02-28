import CodeCard from "./components/CodeCard";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { useState } from "react";
import { haptic } from "./utils/haptic";

const codes = [
  {
    label: "Disarm Alarm",
    value: "95321",
    note: "Keypad inside front door",
  },
  {
    label: "Arm Away Alarm",
    value: "95322",
    note: "Keypad inside front door",
  },
  {
    label: "Gate Access PIN",
    value: "085764",
    note: "",
  },
];

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="mx-auto max-w-[420px] px-4 py-6">
        {/* PWA Install Prompt - Only shows in browser */}
        <div id="install-prompt">
          <PWAInstallPrompt />
        </div>

        {/* Header with Logo */}
        <header className="mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-2xl shadow-md overflow-hidden bg-white">
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
          <h1 className="text-xl font-bold text-[#800000]">
            Florida Home Access
          </h1>
          <p className="mt-1 text-xs text-gray-400">{currentDate}</p>
        </header>

        {/* Code Cards */}
        <div className="space-y-3">
          {codes.map((code) => (
            <CodeCard
              key={code.label}
              label={code.label}
              value={code.value}
              note={code.note}
            />
          ))}
        </div>

        {/* Gate QR Code Section */}
        <section className="mt-6 rounded-2xl bg-white shadow-lg border-2 border-[#b8960c] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#b8960c] flex items-center justify-center flex-shrink-0">
              <svg 
                className="w-5 h-5 text-white" 
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
              <p className="text-base font-bold text-gray-900">Gate QR Code</p>
              <p className="text-sm text-gray-500">Tap to enlarge for scanning</p>
            </div>
          </div>
          
          <button
            type="button"
            className="w-full flex justify-center p-4 bg-gray-50 rounded-xl border-2 border-gray-200 cursor-pointer active:scale-95 transition-transform"
            onClick={openFullscreen}
            aria-label="Tap to enlarge QR code"
          >
            <img
              src="/florida-home/gate-qr-code.png"
              alt="Gate Access QR Code"
              className="w-56 h-56 object-contain rounded-lg shadow-md bg-white p-3"
              loading="eager"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const errorMsg = document.createElement('div');
                errorMsg.className = 'text-red-500 text-sm p-4';
                errorMsg.textContent = 'QR code failed to load. Please refresh.';
                target.parentElement?.appendChild(errorMsg);
              }}
            />
          </button>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs">Hold 2-3 inches from scanner</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center pb-4">
          <p className="text-xs text-gray-400">✝ Family Access Only</p>
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
          
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <img
              src="/florida-home/gate-qr-code.png"
              alt="Gate Access QR Code - Fullscreen"
              className="w-80 h-80 object-contain"
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

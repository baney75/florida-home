import CodeCard from "./components/CodeCard";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="mx-auto max-w-[420px] px-4 py-6">
        {/* Header with Logo */}
        <header className="mb-6 text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/florida-home/logo.png"
              alt="Florida Home"
              className="w-20 h-20 object-contain rounded-2xl shadow-sm"
            />
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

        {/* Gate QR Code Section - IMPROVED VISIBILITY */}
        <section className="mt-6 rounded-2xl bg-white shadow-lg border-2 border-[#b8960c] p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#b8960c] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Gate QR Code</p>
              <p className="text-xs text-gray-500">Scan at main gate</p>
            </div>
          </div>
          
          <div className="flex justify-center py-4 bg-gray-50 rounded-xl border border-gray-100">
            <img
              src="/florida-home/gate-qr-code.png"
              alt="Gate Access QR Code"
              className="w-56 h-56 object-contain rounded-lg shadow-sm bg-white p-2"
            />
          </div>
          
          <p className="mt-3 text-xs text-center text-gray-400">
            Hold 2-3 inches from scanner
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-gray-400">✝ Family Access Only</p>
        </footer>
      </main>
    </div>
  );
}

export default App;

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
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-[420px] px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#800000]">
            Florida Home 🏠
          </h1>
          <p className="mt-2 text-sm text-gray-500">{currentDate}</p>
        </header>

        {/* Code Cards */}
        <div className="space-y-4">
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
        <section className="mt-8 rounded-xl bg-white shadow-md border-l-4 border-[#b8960c] p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-4">
            Gate QR Code
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Scan at the main gate for quick entry
          </p>
          <div className="flex justify-center">
            <img
              src="/florida-home/gate-qr-code.png"
              alt="Gate Access QR Code"
              className="w-48 h-48 object-contain rounded-lg border-2 border-gray-100"
            />
          </div>
          <p className="mt-3 text-xs text-center italic text-gray-400">
            Hold QR code 2-3 inches from scanner
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-gray-400">✝ Family Access Only</p>
        </footer>
      </main>
    </div>
  );
}

export default App;

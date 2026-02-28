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

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-gray-400">✝ Family Access Only</p>
        </footer>
      </main>
    </div>
  );
}

export default App;

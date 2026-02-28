interface CodeCardProps {
  label: string;
  value: string;
  note?: string;
}

function CodeCard({ label, value, note }: CodeCardProps) {
  return (
    <div className="rounded-xl bg-white shadow-md border-l-4 border-[#800000] p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">
        {label}
      </p>
      <p className="text-3xl font-bold text-[#1a1a1a] font-mono tracking-wider">
        {value}
      </p>
      {note && (
        <p className="mt-2 text-sm italic text-gray-400">{note}</p>
      )}
    </div>
  );
}

export default CodeCard;

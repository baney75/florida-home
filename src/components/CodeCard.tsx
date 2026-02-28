interface CodeCardProps {
  label: string;
  value: string;
  note?: string;
}

function CodeCard({ label, value }: CodeCardProps) {
  return (
    <div className="rounded-lg bg-white shadow-sm border-l-4 border-[#800000] px-3 py-2">
      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 mb-0.5 leading-tight">
        {label}
      </p>
      <p className="text-2xl font-bold text-[#1a1a1a] font-mono tracking-wider leading-none">
        {value}
      </p>
    </div>
  );
}

export default CodeCard;

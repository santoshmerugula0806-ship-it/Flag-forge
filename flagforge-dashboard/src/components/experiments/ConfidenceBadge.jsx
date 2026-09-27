export default function ConfidenceBadge({ confidence }) {
  let styles = "bg-off-500/10 text-off-400 border-off-500/30";
  if (confidence >= 95) styles = "bg-on-500/10 text-on-400 border-on-500/30";
  else if (confidence >= 90) styles = "bg-warn-500/10 text-warn-400 border-warn-500/30";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles} ${
        confidence >= 95 ? "animate-pulse-ring" : ""
      }`}
    >
      {confidence}% confidence
    </span>
  );
}

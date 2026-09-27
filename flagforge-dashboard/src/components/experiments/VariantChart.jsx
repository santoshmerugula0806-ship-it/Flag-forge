import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function VariantChart({ variantA, variantB }) {
  const rateA = ((variantA.conversions / variantA.visitors) * 100).toFixed(2);
  const rateB = ((variantB.conversions / variantB.visitors) * 100).toFixed(2);

  const data = [
    { name: variantA.name, rate: Number(rateA), fill: "#6d6ef5" },
    { name: variantB.name, rate: Number(rateB), fill: "#10b981" },
  ];

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1b1f33" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
          <Tooltip
            contentStyle={{
              background: "#101220",
              border: "1px solid #22273d",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: "#e2e8f0" }}
            formatter={(value) => [`${value}%`, "Conversion rate"]}
          />
          <Bar dataKey="rate" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={600}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

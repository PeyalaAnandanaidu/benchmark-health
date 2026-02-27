import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AccuracyChart() {
  const data = [
    { node: "Hospital A", accuracy: 82 },
    { node: "Hospital B", accuracy: 78 },
    { node: "Hospital C", accuracy: 91 },
    { node: "Hospital D", accuracy: 85 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        Model Accuracy Across Nodes
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="node" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="accuracy" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

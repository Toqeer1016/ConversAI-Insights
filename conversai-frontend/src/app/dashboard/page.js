"use client";

import { useState } from "react";
import MetricsCard from "../../components/MetricsCard";
import ChartCard from "../../components/ChartCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Dashboard({ metrics }) {
  const [data] = useState(
    metrics || {
      total_conversations: 20,
      total_messages: 150,
      user_messages: 100,
      assistant_messages: 50,
      avg_messages_per_conversation: 7.5,
      active_days: 10,
      messages_per_day: 15,
      dominant_topics: ["Python", "AI", "ML"],
      topic_metrics: {
        Python: { messages: 50, conversations: 10 },
        AI: { messages: 60, conversations: 5 },
        ML: { messages: 40, conversations: 5 }
      },
      learning_behavior: {
        primary_interest: "AI",
        secondary_interest: "Python",
        learning_intensity: "High",
        technical_usage: "Daily",
        learning_consistency: "Regular",
        engagement_depth: "Deep"
      }
    }
  );

  const topicData = Object.entries(data.topic_metrics).map(([topic, info]) => ({
    topic,
    messages: info.messages
  }));

  const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="space-y-3">

      {/* 🔹 Top Metrics (Dense) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        <MetricsCard title="Conversations" value={data.total_conversations} small />
        <MetricsCard title="Messages" value={data.total_messages} small />
        <MetricsCard title="User Msg" value={data.user_messages} small />
        <MetricsCard title="Assistant Msg" value={data.assistant_messages} small />
        <MetricsCard title="Avg/Conv" value={data.avg_messages_per_conversation} small />
        <MetricsCard title="Active Days" value={data.active_days} small />
      </div>

      {/* 🔹 Activity + Topics Inline */}
      <div className="flex flex-wrap items-center justify-between gap-2">

        <div className="grid grid-cols-3 gap-2 flex-1 min-w-[250px]">
          <MetricsCard title="Msgs/Day" value={data.messages_per_day} small />
        </div>

        {/* Inline Topics */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-xs font-semibold text-gray-600">Topics:</span>
          {data.dominant_topics.map((topic, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* 🔹 Learning Behavior (Compressed Grid) */}
      <div>
        <h3 className="text-base font-semibold mb-1 text-gray-700">
          Learning Behavior
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <MetricsCard title="Primary" value={data.learning_behavior.primary_interest} small />
          <MetricsCard title="Secondary" value={data.learning_behavior.secondary_interest} small />
          <MetricsCard title="Intensity" value={data.learning_behavior.learning_intensity} small />
          <MetricsCard title="Usage" value={data.learning_behavior.technical_usage} small />
          <MetricsCard title="Consistency" value={data.learning_behavior.learning_consistency} small />
          <MetricsCard title="Depth" value={data.learning_behavior.engagement_depth} small />
        </div>
      </div>

      {/* 🔹 Charts (Reduced Height) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <ChartCard title="Messages by Topic">
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={topicData}>
              <XAxis dataKey="topic" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="messages" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Topic Distribution">
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={topicData}
                dataKey="messages"
                nameKey="topic"
                cx="50%"
                cy="50%"
                outerRadius={55}
                label={false}
              >
                {topicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

    </div>
  );
}
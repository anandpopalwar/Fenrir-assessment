import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Badge, Card } from "flowbite-react";
import Stats from "./Stats";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";
import { CriticalBadge } from "./Badge";
import SeverityBox from "./SeverityBox";

const topStats = [
  { label: "Org", value: "Project X" },
  { label: "Owner", value: "Nammagiri" },
  { label: "Total Scans", value: "100" },
  { label: "Scheduled", value: "1000" },
  { label: "Rescans", value: "100" },
  { label: "Failed Scans", value: "100" },
];

const severityStats = [
  {
    title: "Critical Severity",
    value: "86",
    badge: "failure",
    trend: "+2% increase than yesterday",
    trendClass: "text-pink-500",
    positive: false,
  },
  {
    title: "High Severity",
    value: "16",
    badge: "warning",
    trend: "+0.9% increase than yesterday",
    trendClass: "text-pink-500",
    positive: false,
  },
  {
    title: "Medium Severity",
    value: "26",
    badge: "warning",
    trend: "+0.9% decrease than yesterday",
    trendClass: "text-green-500",
    positive: true,
  },
  {
    title: "Low Severity",
    value: "16",
    badge: "info",
    trend: "+0.9% increase than yesterday",
    trendClass: "text-green-500",
    positive: true,
  },
];

function DashboardStats() {
  return (
    <div className="rounded-xl border p-4 border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
      <div className="space-y-6">
        <div className="stats_container flex  gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="stats_cards flex-1 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:flex xl:flex-1 xl:items-center xl:justify-between xl:gap-0 xl:divide-x-2 xl:divide-neutral-200 dark:xl:divide-neutral-200">
            {topStats.map((item) => (
              <Stats key={item.label} {...{ ...item }} />
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <ArrowPathIcon className="h-4 w-4 text-[var(--primary)] font-extrabold" />
            <span>10 mins ago</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {severityStats.map((item) => (
            <SeverityBox key={item.title} {...{ ...item }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;

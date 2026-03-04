import React from "react";
import { CriticalBadge, HighBadge, LowBadge, MediumBadge } from "./Badge";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";

const BadgeData = {
  Critical: CriticalBadge,
  High: HighBadge,
  Medium: MediumBadge,
  Low: LowBadge,
};

const SeverityBox = ({ title, value, positive, trend }) => {
  const Badge = BadgeData[title.split(" ")[0]];
  const trendClass = positive ? "text-[var(--low)]" : "text-[var(--critical)]";

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-2)]">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-[var(--muted)]">
          {title}
        </h3>
        {<Badge />}
      </div>
      <div className="severty_stats mt-2 flex items-end gap-3">
        <p className="text-4xl font-extrabold leading-none text-[var(--text)]">
          {value}
        </p>
        <p
          className={`flex items-center gap-1 text-xs font-semibold ${trendClass}`}
        >
          {trend.includes("increase") ? (
            <ArrowUpIcon className={`h-3 w-3 ${trendClass}`} />
          ) : (
            <ArrowDownIcon className={`h-3 w-3 ${trendClass}`} />
          )}
          {trend}
        </p>
      </div>
    </div>
  );
};

export default SeverityBox;

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
  const trendClass = positive ? "text-green-500" : "text-pink-500";

  return (
    <div className="rounded-lg  bg-white p-2 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:shadow-black/20">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-neutral-500 dark:text-neutral-400">
          {title}
        </h3>
        {<Badge />}
      </div>
      <div className="severty_stats mt-2 flex items-end gap-3">
        <p className="text-4xl font-extrabold leading-none text-neutral-900 dark:text-white">
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

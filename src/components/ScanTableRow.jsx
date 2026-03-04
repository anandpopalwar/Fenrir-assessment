import React from "react";
import { formatTime } from "../helpers/helpers";
function statusClass(status) {
  if (status === "Completed") {
    return "bg-[var(--surface-2)] text-[var(--low)] border border-[var(--low)]";
  }
  if (status === "Failed") {
    return "bg-[var(--surface-2)] text-[var(--critical)] border border-[var(--critical)]";
  }
  return "bg-[var(--surface-2)] text-[var(--medium)] border border-[var(--medium)]";
}
const ScanTableRow = ({
  name,
  type,
  status,
  progress,
  vulnerability,
  lastScan,
}) => {
  return (
    <tr
      key={name}
      className="border-b border-[var(--border)] transition hover:bg-[var(--surface-2)]"
    >
      <td className="px-6 py-4 text-sm font-medium text-[var(--text)]">
        {name}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--muted)]">{type}</td>
      <td className="px-6 py-4">
        <span
          className={`rounded-md px-3 py-1 text-sm  ${statusClass(status)}`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-32 rounded-full bg-[var(--surface-2)]">
            <div
              className="h-2 rounded-full bg-[var(--primary)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-[var(--muted)]">{progress}%</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="rounded-md px-2 py-1 text-xs font-semibold  bg-red-500">
            {vulnerability.critical}
          </span>
          <span className="rounded-md px-2 py-1 text-xs font-semibold  bg-orange-500 ">
            {vulnerability.high}
          </span>
          <span className="rounded-md px-2 py-1 text-xs font-semibold  bg-amber-500  ">
            {vulnerability.medium}
          </span>
          <span className="rounded-md px-2 py-1 text-xs font-semibold  bg-green-500  ">
            {vulnerability.low}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-[var(--muted)]">
        {formatTime(lastScan)}
      </td>
    </tr>
  );
};

export default ScanTableRow;

import { formatToHHMMSS } from "../helpers/helpers";

const ScanStatments = ({ timestamp, message }) => {
  return (
    <div className="flex flex-wrap px-4 py-3 text-sm transition-colors hover:bg-[var(--surface-2)]">
      <div className="mr-2 font-medium text-[var(--muted)]">
        {formatToHHMMSS(timestamp)}:
      </div>
      <div className="text-[var(--text)]">{message}</div>
    </div>
  );
};

export default ScanStatments;

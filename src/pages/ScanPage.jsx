import ScanStatments from "../components/ScanStatments.jsx";
import { useScan } from "../context/ScanContext.jsx";
import { formatToHHMMSS } from "../helpers/helpers.js";

function ScanPage() {
  const { isScanRunning, scanData, isScanCompleted } = useScan();

  const statusBadgeClass =
    scanData?.status === "success"
      ? "bg-[var(--surface-2)] text-[var(--primary)]"
      : "bg-[var(--surface-2)] text-[var(--critical)]";

  return (
    <section className="mx-auto  space-y-6 p-2 ">
      <div className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)] overflow-hidden">
        <div className="border-b border-[var(--border)] px-6 py-4">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Scan Monitor
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Real-time execution logs and current scan state.
          </p>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-medium text-[var(--text)]">
              {isScanRunning ? "Scan is Running" : "Scan is not Running"}
            </div>

            {scanData?.status ? (
              <div
                className={`rounded-md px-3 py-1 text-lg font-semibold uppercase ${statusBadgeClass}`}
              >
                {scanData.status}
              </div>
            ) : null}
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-soft)]">
            {scanData.data.length > 0 ? (
              <div className="divide-y divide-[var(--border)]">
                {scanData.data.map((item) => (
                  <ScanStatments key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-sm text-[var(--muted)]">
                Start Scanning
              </div>
            )}
          </div>

          {isScanCompleted && (
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3">
              <div className="text-sm font-semibold text-[var(--text)]">
                Scan Completed
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ScanPage;

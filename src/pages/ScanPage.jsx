import { useScan } from "../context/ScanContext.jsx";
import { formatToHHMMSS } from "../helpers/helpers.js";

function ScanPage() {
  const { isScanRunning, scanData, isScanCompleted } = useScan();

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="w-full rounded-xl border p-4 border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
          {isScanRunning ? (
            <h3>Scan is Running</h3>
          ) : (
            <h3>Scan is not Running</h3>
          )}

          {scanData.data.length > 0 ? (
            scanData.data.map((item) => (
              <div className="text-sm flex flex-wrap" key={item?.id}>
                <div className=" text-slate-400 mr-2">
                  {formatToHHMMSS(item?.timestamp)}:
                </div>
                <div className=" ">{item?.message}</div>
              </div>
            ))
          ) : (
            <h5>Start Scanning</h5>
          )}
          {isScanCompleted && (
            <div className="flex flex-col gap-2">
              <div className="text-lg">Scan Completed</div>
            </div>
          )}

          {scanData?.status && (
            <div className="text-lg flex gap-2">
              Scan Status :
              <div
                className={`badge uppercase text-[var(--${scanData.status === "success" ? "primary" : "critical"})]`}
              >
                {scanData.status}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ScanPage;

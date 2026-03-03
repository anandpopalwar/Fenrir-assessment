import { useParams } from "react-router-dom";

function ScanPage() {
  const { id } = useParams();

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1>Scan {id}</h1>
          <p className="mt-2">
            Detailed execution and risk distribution for this scan run.
          </p>
        </div>
        <span className="chip chip-medium">In progress</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="surface-card p-6 lg:col-span-2">
          <h2 className="text-xl">Progress</h2>
          <p className="mt-2">62% completed. Estimated finish in 8 minutes.</p>
          <div className="mt-5 h-3 w-full rounded-full bg-[var(--surface-2)]">
            <div className="h-3 w-[62%] rounded-full bg-[var(--primary)]" />
          </div>
        </article>

        <article className="surface-card p-6">
          <h2 className="text-xl">Severity Split</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="chip chip-critical">Critical</span>
              <span className="text-sm font-semibold">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="chip chip-high">High</span>
              <span className="text-sm font-semibold">7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="chip chip-medium">Medium</span>
              <span className="text-sm font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="chip chip-low">Low</span>
              <span className="text-sm font-semibold">24</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ScanPage;

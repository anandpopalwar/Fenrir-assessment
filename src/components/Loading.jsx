function Loading({ label = "Loading...", fullScreen = false }) {
  return (
    <div
      className={`flex items-center justify-center ${fullScreen ? "min-h-screen" : "py-10"}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-[var(--primary)] dark:border-neutral-700 dark:border-t-[var(--primary)]" />
        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">{label}</p>
      </div>
    </div>
  );
}

export default Loading;

import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-lg rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-soft)]">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
          Error 404
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-[var(--text)]">Page Not Found</h1>
        <p className="mt-3 text-[var(--muted)]">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
          <Link to="/dashboard" className="btn-neutral">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;

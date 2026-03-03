import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Backdrop from "../components/Backdrop";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { Button } from "flowbite-react";
import { ArrowUpIcon } from "@heroicons/react/16/solid";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const { isScanRunning, toggleScanRunning, logout } = useAuth();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [isSidebarOpen]);
  return (
    <div className="h-screen overflow-hidden bg-[var(--bg)]">
      <div className="flex h-full min-h-0">
        <Sidebar
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={() => logout()}
        />
        <Backdrop
          open={isSidebarOpen}
          onClick={() => setIsSidebarOpen(false)}
        />

        <div className="flex min-w-0 min-h-0 flex-1 flex-col ">
          <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur">
            <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 lg:px-8">
              <div className="flex w-full items-center gap-3">
                <button
                  type="button"
                  aria-label="Open sidebar"
                  onClick={() => setIsSidebarOpen((v) => !v)}
                  className="btn-neutral p-2 md:hidden"
                >
                  <Bars3Icon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </button>
                <div className="flex w-full align-content-center justify-between ">
                  <h2 className="text-lg font-semibold"></h2>
                  <div className="flex flex-row gap-2">
                    <Button className="!flex !gap-2 !rounded-lg !border !border-neutral-300 !bg-white !px-4 !py-2 !text-sm !font-medium !text-neutral-700 hover:!bg-neutral-100 dark:!border-neutral-700 dark:!bg-neutral-900 dark:!text-neutral-200 dark:hover:!bg-neutral-800">
                      <ArrowUpIcon className="w-4 h-4" />
                      Export Report
                    </Button>
                    <Button
                      onClick={toggleScanRunning}
                      className={`!rounded-lg  !px-4 !py-2 !text-sm !font-semibold ${
                        isScanRunning
                          ? "border border-2 border-red-600 !bg-red-100/50  !text-red-600 dark:!bg-red-700/50  "
                          : "border border-2 border-teal-600 !bg-teal-100/50 !text-teal-600 dark:!bg-teal-700/50  "
                      }`}
                    >
                      {isScanRunning ? "Stop Scan" : "Start Scan"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-screen-2xl min-w-0 min-h-0 flex-1 overflow-y-auto px-2 py-4 md:py-4 lg:px-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;

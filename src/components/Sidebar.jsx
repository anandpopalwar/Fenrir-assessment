import { NavLink } from "react-router-dom";
import { MainLogo } from "./Utils/Icons.jsx";
import { useAuth } from "../context/AuthContext";
import {
  BellIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  FolderIcon,
  InformationCircleIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import ThemeToggle from "../ui/ThemeToggle.jsx";
import { Button } from "flowbite-react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/16/solid";

function Sidebar({ open, onClose, onLogout }) {
  const { user } = useAuth();
  const fullName =
    user?.firstName || user?.lastName
      ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
      : "Account";

  const navClass = ({ isActive }) =>
    `block rounded-full px-3 py-2.5 text-sm font-medium transition flex gap-4  ${
      isActive
        ? "bg-[var(--sidebar-active-bg)] text-[var(--primary)]"
        : "text-slate-500 hover:bg-[var(--sidebar-active-bg)] hover:text-[var(--primary)]"
    }`;

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen w-[240px] border-r border-[var(--border)] bg-[var(--surface)] p-4 transition-transform duration-300 md:relative md:translate-x-0 flex flex-col justify-between ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="pb-4">
        <div className="mb-8  w-full inline-flex items-center place-content-between">
          <div className="pointer-events-none inset-0 flex inline-flex  items-center gap-2">
            <MainLogo />
          </div>
          <ThemeToggle />
        </div>

        <nav className="space-y-1.5">
          {sidebarItems.map(({ path, name, icon }) => {
            const SVGIcon = icon;
            return (
              <NavLink
                to={path}
                className={navClass}
                onClick={onClose}
                key={name}
                children={(props) => {
                  const { isActive } = props;
                  return (
                    <div className="flex gap-4">
                      {
                        <SVGIcon
                          className={`h-5 w-5 ${isActive ? "bg-[var(--sidebar-active-bg)]" : "text-slate-500"}  hover:text-[var(--primary)]`}
                        />
                      }
                      {name}
                    </div>
                  );
                }}
              />
            );
          })}
        </nav>
      </div>

      <div className="cursor-pointer rounded-lg p-2 transition flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatarUrl || "https://i.pravatar.cc/96?img=12"}
            alt="User avatar"
            className="h-11 w-11 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
              {user?.email || "No email"}
            </p>
            <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {user?.role || fullName}
            </p>
          </div>
          <ChevronRightIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
        </div>
        <Button
          onClick={onLogout}
          className="!flex !gap-2 !rounded-lg !border !border-neutral-300 !bg-white !px-4 !py-2 !text-sm !font-medium !text-neutral-700 hover:!bg-neutral-100 dark:!border-neutral-700 dark:!bg-neutral-900 dark:!text-neutral-200 dark:hover:!bg-neutral-800"
        >
          <ArrowRightEndOnRectangleIcon className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;

export const sidebarItems = [
  // Main Section
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: SquaresPlusIcon,
    section: "main",
  },
  {
    name: "Projects",
    path: "/projects",
    icon: FolderIcon,
    section: "main",
  },

  {
    name: "Scans",
    path: "/scans",
    icon: ChartBarIcon,
    section: "main",
  },
  {
    name: "Schedule",
    path: "/schedule",
    icon: CalendarDaysIcon,
    section: "main",
  },

  // Secondary Section
  {
    name: "Notifications",
    path: "/notifications",
    icon: BellIcon,
    section: "secondary",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Cog6ToothIcon,
    section: "secondary",
  },
  {
    name: "Support",
    path: "/support",
    icon: InformationCircleIcon,
    section: "secondary",
  },
];

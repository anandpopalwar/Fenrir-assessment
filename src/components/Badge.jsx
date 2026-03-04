import {
  ExclamationTriangleIcon,
  MagnifyingGlassCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/16/solid";

export const CriticalBadge = () => {
  return (
    <div className="grid h-6 w-6 place-items-center rounded-md bg-red-100 ">
      <NoSymbolIcon className="h-4 w-4 text-[var(--critical)]" />
    </div>
  );
};
export const HighBadge = () => {
  return (
    <div className="grid h-6 w-6 place-items-center rounded-md bg-orange-100 ">
      <ExclamationTriangleIcon className="h-4 w-4 text-[var(--high)]" />
    </div>
  );
};
export const MediumBadge = () => {
  return (
    <div className="grid h-6 w-6 place-items-center rounded-md bg-amber-100 ">
      <ExclamationTriangleIcon className="h-4 w-4 text-[var(--medium)]" />
    </div>
  );
};
export const LowBadge = () => {
  return (
    <div className="grid h-6 w-6 place-items-center rounded-md bg-blue-100 ">
      <MagnifyingGlassCircleIcon className="h-4 w-4 text-[var(--low)]" />
    </div>
  );
};

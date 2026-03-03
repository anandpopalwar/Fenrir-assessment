import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ViewColumnsIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { scanRows } from "../data/ScanData";
import { formatTime } from "../helpers/helpers";
import Modal from "./Modal";
import SortOptionsForm from "./Forms/SortOptionsForm";
import Loading from "./Loading";

const TableHeaders = [
  "Scan Name",
  "Type",
  "Status",
  "Progress",
  "Vulnerability",
  "Last Scan",
];

function statusClass(status) {
  if (status === "Completed") {
    return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400 border border-green-700 dark:border-green-400";
  }
  if (status === "Failed") {
    return "bg-red-100 text-red-700 border-red-700 dark:bg-red-900 dark:text-red-400 border dark:border-red-400";
  }
  return "bg-blue-100 text-blue-700 border-blue-700 dark:bg-blue-900 dark:text-blue-300 border dark:border-blue-400";
}

const ITEMS_PER_PAGE = 5;

const ScanTable = () => {
  let timeout = useRef(null);
  const [filterModal, setFilterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  // const [filterdata, setFilterData] = useState([]);
  //   const [items, setItems] = useState(ITEMS_PER_PAGE);
  const [page, setPage] = useState(0); // zero-based index

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const currentData = useMemo(() => {
    let processedData = [...data];

    // 🔍 1️⃣ SEARCH
    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();

      processedData = processedData.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.type.toLowerCase().includes(lower),
      );
    }

    // 🔃 2️⃣ SORT
    switch (filters) {
      case "status":
        processedData.sort((a, b) => a.status.localeCompare(b.status));
        break;

      case "newest":
        processedData.sort((a, b) => b.lastScan - a.lastScan);
        break;

      case "oldest":
        processedData.sort((a, b) => a.lastScan - b.lastScan);
        break;

      case "progress":
        processedData.sort((a, b) => b.progress - a.progress);
        break;

      default:
        break;
    }

    // 📄 3️⃣ PAGINATE
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return processedData.slice(start, end);
  }, [data, page, filters, searchTerm]);
  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (!timeout.current) {
      setIsLoading(true);

      timeout.current = setTimeout(() => {
        setData(scanRows);
        setIsLoading(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout.current);
      timeout.current = null;
    };
  }, []);

  const RenderedDataLength = useMemo(() => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()),
    ).length;
  }, [data, searchTerm]);

  useEffect(() => {
    setPage(0);
  }, [filters]);

  return (
    <section className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex flex-1 flex-col gap-4 border-b border-neutral-200 p-4 lg:flex-row lg:items-center lg:justify-between lg:p-6 dark:border-neutral-700">
        <div className="relative w-full flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0); // reset to first page when searching
            }}
            type="text"
            placeholder="Search scans by name or type..."
            className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-3 text-sm text-neutral-900 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[#0CC8A840] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() => {
              setFilterModal(true);
            }}
            className="!rounded-lg !border !border-neutral-300 !bg-white !px-3 !py-2 !text-sm !font-medium !text-neutral-700 hover:!bg-neutral-50 dark:!border-neutral-700 dark:!bg-neutral-900 dark:!text-neutral-200 dark:hover:!bg-neutral-800"
          >
            <FunnelIcon className="mr-1.5 h-4 w-4" />
            Filter
          </Button>
          <Button className="!rounded-lg !border !border-neutral-300 !bg-white !px-3 !py-2 !text-sm !font-medium !text-neutral-700 hover:!bg-neutral-50 dark:!border-neutral-700 dark:!bg-neutral-900 dark:!text-neutral-200 dark:hover:!bg-neutral-800">
            <ViewColumnsIcon className="mr-1.5 h-4 w-4" />
            Column
          </Button>
          <Button className="!rounded-lg !bg-teal-600 !px-3 !py-2 !text-sm !font-semibold !text-white hover:!bg-teal-600 dark:!bg-teal-500 dark:hover:!bg-teal-600">
            <PlusIcon className="mr-1.5 h-4 w-4" />
            New Scan
          </Button>
        </div>
      </div>

      {isLoading ? (
        <Loading label="Wait scan data is fetching" />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full">
            <thead className="border-b border-neutral-200 dark:border-neutral-700">
              <tr>
                {TableHeaders.map((header) => (
                  <th className="px-6 py-3 text-left text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row) => (
                <tr
                  key={row.name}
                  className="border-b border-neutral-100 transition hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
                >
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900 dark:text-white">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-300">
                    {row.type}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-md px-3 py-1 text-sm  ${statusClass(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-32 rounded-full bg-neutral-200 dark:bg-neutral-700">
                        <div
                          className="h-2 rounded-full bg-teal-600 "
                          style={{ width: `${row.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-neutral-600 dark:text-neutral-300">
                        {row.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 dark:bg-red-900 dark:text-red-400">
                        {row.vulnerability.critical}
                      </span>
                      <span className="rounded-md bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900 dark:text-orange-400">
                        {row.vulnerability.high}
                      </span>
                      <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900 dark:text-amber-400">
                        {row.vulnerability.medium}
                      </span>
                      <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-400">
                        {row.vulnerability.low}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    {formatTime(row.lastScan)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-neutral-200 p-4 md:flex-row md:items-center md:justify-between md:p-6 dark:border-neutral-700">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Showing {ITEMS_PER_PAGE} of {RenderedDataLength} Scans
        </p>
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrev}
            className="!rounded-lg !border !border-neutral-300 !bg-white !px-3 !py-2 !text-sm !font-medium !text-neutral-700 hover:!bg-neutral-50 dark:!border-neutral-700 dark:!bg-neutral-900 dark:!text-neutral-200 dark:hover:!bg-neutral-800"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleNext}
            className="!rounded-lg !border !border-neutral-300 !bg-white !px-3 !py-2 !text-sm !font-medium !text-neutral-700 hover:!bg-neutral-50 dark:!border-neutral-700 dark:!bg-neutral-900 dark:!text-neutral-200 dark:hover:!bg-neutral-800"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Modal
        isOpen={filterModal}
        onClose={() => {
          setFilterModal(false);
        }}
        title="Sort Table Data By"
      >
        <SortOptionsForm
          value={filters}
          onChange={(filter) => {
            setFilters(filter);
            setFilterModal(false);
          }}
        />
      </Modal>
    </section>
  );
};

export default ScanTable;

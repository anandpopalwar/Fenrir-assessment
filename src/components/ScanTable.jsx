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
import { scanRows } from "../mockdata/TableData.js";
import Modal from "./Modal";
import SortOptionsForm from "./Forms/SortOptionsForm";
import Loading from "./Loading";
import ScanTableRow from "./ScanTableRow.jsx";

const TableHeaders = [
  "Scan Name",
  "Type",
  "Status",
  "Progress",
  "Vulnerability",
  "Last Scan",
];

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
    <section className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
      <div className="flex flex-1 flex-col gap-4 border-b border-[var(--border)] p-4 lg:flex-row lg:items-center lg:justify-between lg:p-6">
        <div className="relative w-full flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0); // reset to first page when searching
            }}
            type="text"
            placeholder="Search scans by name or type..."
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-10 pr-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[#0CC8A840]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() => {
              setFilterModal(true);
            }}
            className="!rounded-lg !border !border-[var(--border)] !bg-[var(--surface)] !px-3 !py-2 !text-sm !font-medium !text-[var(--text)] hover:!bg-[var(--surface-2)]"
          >
            <FunnelIcon className="mr-1.5 h-4 w-4" />
            Filter
          </Button>
          <Button className="!rounded-lg !border !border-[var(--border)] !bg-[var(--surface)] !px-3 !py-2 !text-sm !font-medium !text-[var(--text)] hover:!bg-[var(--surface-2)]">
            <ViewColumnsIcon className="mr-1.5 h-4 w-4" />
            Column
          </Button>
          <Button className="!rounded-lg !bg-[var(--primary)] !px-3 !py-2 !text-sm !font-semibold !text-[var(--text)] hover:!bg-[var(--primary-hover)]">
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
            <thead className="border-b border-[var(--border)]">
              <tr>
                {TableHeaders.map((header) => (
                  <th className="px-6 py-3 text-left text-sm font-medium text-[var(--muted)]">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row) => (
                <ScanTableRow key={row.name} {...row} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-[var(--border)] p-4 md:flex-row md:items-center md:justify-between md:p-6">
        <p className="text-sm text-[var(--muted)]">
          Showing {ITEMS_PER_PAGE} of {RenderedDataLength} Scans
        </p>
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrev}
            className="!rounded-lg !border !border-[var(--border)] !bg-[var(--surface)] !px-3 !py-2 !text-sm !font-medium !text-[var(--text)] hover:!bg-[var(--surface-2)]"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleNext}
            className="!rounded-lg !border !border-[var(--border)] !bg-[var(--surface)] !px-3 !py-2 !text-sm !font-medium !text-[var(--text)] hover:!bg-[var(--surface-2)]"
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

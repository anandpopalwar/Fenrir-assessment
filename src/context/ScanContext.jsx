import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { mockData } from "../mockdata/ScanData";

const ScanContext = createContext(null);

export function ScanProvider({ children }) {
  const interVal = useRef(null);
  const [isScanRunning, setIsScanRunning] = useState(false);
  const [isScanCompleted, setIsScanCompleted] = useState(false);
  const [scanData, setScanData] = useState({ status: "", data: [] });

  const StartScanning = () => {
    const Scan = mockData[Math.floor(Math.random() * 3)];
    setScanData({ status: "", data: [] });
    setIsScanCompleted(false);

    let idx = 0;

    interVal.current = setInterval(() => {
      let item = Scan.logs[idx];
      if (!item) {
        clearInterval(interVal.current);
        interVal.current = null;
        setIsScanCompleted(true);
        setIsScanRunning(false);

        setScanData((p) => ({
          ...p,
          status: Scan.status,
        }));
        return;
      }
      setScanData((p) => ({
        ...p,
        data: [...p.data, item],
      }));
      idx++;
    }, 1000);
  };
  const StopScanning = (dontErase = false) => {
    if (dontErase) {
      setScanData({ status: "", data: [] });
      setIsScanRunning(false);
    }
    clearInterval(interVal.current);
    interVal.current = null;
    setIsScanCompleted(false);
  };

  useEffect(() => {
    if (isScanRunning === true) {
      StartScanning();
    } else {
      StopScanning();
    }
  }, [isScanRunning]);

  const value = useMemo(
    () => ({
      isScanRunning,
      setIsScanRunning,
      toggleScanRunning: () => setIsScanRunning((s) => !s),
      scanData,
      setScanData,
      isScanCompleted,
    }),
    [isScanRunning, scanData, isScanCompleted],
  );

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
}

export function useScan() {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error("useScan must be used within ScanProvider");
  }
  return context;
}

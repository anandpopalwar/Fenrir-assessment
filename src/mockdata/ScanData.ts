export type LogLevel = "info" | "success" | "warning" | "error";

export interface ScanLog {
  id: string;
  timestamp: number;
  level: LogLevel;
  message: string;
  phase: "recon" | "enumeration" | "analysis" | "exploit" | "complete";
}

export interface ScanSession {
  scanId: string;
  status: "running" | "success" | "failed";
  startedAt: number;
  completedAt?: number;
  logs: ScanLog[];
}

export const scanSuccessLong: ScanSession = {
  scanId: "scan-001",
  status: "success",
  startedAt: 1709552400000,
  completedAt: 1709552490000,
  logs: [
    {
      id: "1",
      timestamp: 1709552400000,
      level: "info",
      message: "Starting penetration test on helpdesk.democorp.com",
      phase: "recon",
    },
    {
      id: "2",
      timestamp: 1709552405000,
      level: "success",
      message: "Target is online",
      phase: "recon",
    },
    {
      id: "3",
      timestamp: 1709552410000,
      level: "info",
      message: "Performing DNS lookup",
      phase: "recon",
    },
    {
      id: "4",
      timestamp: 1709552415000,
      level: "success",
      message: "Resolved IP: 192.168.1.10",
      phase: "recon",
    },
    {
      id: "5",
      timestamp: 1709552420000,
      level: "info",
      message: "Scanning open ports",
      phase: "enumeration",
    },
    {
      id: "6",
      timestamp: 1709552425000,
      level: "success",
      message: "Port 80 (HTTP) open",
      phase: "enumeration",
    },
    {
      id: "7",
      timestamp: 1709552430000,
      level: "success",
      message: "Port 443 (HTTPS) open",
      phase: "enumeration",
    },
    {
      id: "8",
      timestamp: 1709552435000,
      level: "info",
      message: "Fingerprinting web server",
      phase: "analysis",
    },
    {
      id: "9",
      timestamp: 1709552440000,
      level: "success",
      message: "Apache httpd 2.4.65 detected",
      phase: "analysis",
    },
    {
      id: "10",
      timestamp: 1709552445000,
      level: "info",
      message: "Searching for login endpoints",
      phase: "analysis",
    },
    {
      id: "11",
      timestamp: 1709552450000,
      level: "warning",
      message: "Found exposed test credentials (test:test)",
      phase: "analysis",
    },
    {
      id: "12",
      timestamp: 1709552460000,
      level: "info",
      message: "Testing authentication bypass",
      phase: "exploit",
    },
    {
      id: "13",
      timestamp: 1709552470000,
      level: "success",
      message: "Access granted to dashboard",
      phase: "exploit",
    },
    {
      id: "14",
      timestamp: 1709552480000,
      level: "warning",
      message: "IDOR vulnerability detected via X-UserId header",
      phase: "analysis",
    },
    {
      id: "15",
      timestamp: 1709552490000,
      level: "success",
      message: "Scan completed successfully with 1 critical finding",
      phase: "complete",
    },
  ],
};

export const scanFailedShort: ScanSession = {
  scanId: "scan-002",
  status: "failed",
  startedAt: 1709552600000,
  completedAt: 1709552635000,
  logs: [
    {
      id: "1",
      timestamp: 1709552600000,
      level: "info",
      message: "Starting penetration test on api.democorp.com",
      phase: "recon",
    },
    {
      id: "2",
      timestamp: 1709552605000,
      level: "success",
      message: "Target responded to ping",
      phase: "recon",
    },
    {
      id: "3",
      timestamp: 1709552610000,
      level: "info",
      message: "Scanning open ports",
      phase: "enumeration",
    },
    {
      id: "4",
      timestamp: 1709552615000,
      level: "error",
      message: "Connection timed out during port scan",
      phase: "enumeration",
    },
    {
      id: "5",
      timestamp: 1709552620000,
      level: "warning",
      message: "Retrying scan (attempt 2)",
      phase: "enumeration",
    },
    {
      id: "6",
      timestamp: 1709552630000,
      level: "error",
      message: "Host unreachable",
      phase: "enumeration",
    },
    {
      id: "7",
      timestamp: 1709552635000,
      level: "error",
      message: "Scan aborted due to network failure",
      phase: "complete",
    },
  ],
};

export const scanSuccessMedium: ScanSession = {
  scanId: "scan-003",
  status: "success",
  startedAt: 1709552700000,
  completedAt: 1709552760000,
  logs: [
    {
      id: "1",
      timestamp: 1709552700000,
      level: "info",
      message: "Starting penetration test on portal.internal",
      phase: "recon",
    },
    {
      id: "2",
      timestamp: 1709552705000,
      level: "success",
      message: "Target is online",
      phase: "recon",
    },
    {
      id: "3",
      timestamp: 1709552710000,
      level: "info",
      message: "Enumerating directories",
      phase: "enumeration",
    },
    {
      id: "4",
      timestamp: 1709552720000,
      level: "success",
      message: "Found /admin endpoint",
      phase: "enumeration",
    },
    {
      id: "5",
      timestamp: 1709552730000,
      level: "info",
      message: "Checking authentication mechanisms",
      phase: "analysis",
    },
    {
      id: "6",
      timestamp: 1709552740000,
      level: "warning",
      message: "Weak password policy detected",
      phase: "analysis",
    },
    {
      id: "7",
      timestamp: 1709552750000,
      level: "info",
      message: "Testing privilege escalation",
      phase: "exploit",
    },
    {
      id: "8",
      timestamp: 1709552755000,
      level: "success",
      message: "Privilege escalation successful",
      phase: "exploit",
    },
    {
      id: "9",
      timestamp: 1709552760000,
      level: "success",
      message: "Scan completed with 2 medium findings",
      phase: "complete",
    },
  ],
};

export const scanFailedNetwork: ScanSession = {
  scanId: "scan-004",
  status: "failed",
  startedAt: 1709552800000,
  completedAt: 1709552860000,
  logs: [
    {
      id: "1",
      timestamp: 1709552800000,
      level: "info",
      message: "Starting penetration test on billing.democorp.com",
      phase: "recon",
    },
    {
      id: "2",
      timestamp: 1709552804000,
      level: "success",
      message: "Target resolved to IP 10.0.12.45",
      phase: "recon",
    },
    {
      id: "3",
      timestamp: 1709552810000,
      level: "info",
      message: "Running port scan",
      phase: "enumeration",
    },
    {
      id: "4",
      timestamp: 1709552816000,
      level: "success",
      message: "Port 443 detected open",
      phase: "enumeration",
    },
    {
      id: "5",
      timestamp: 1709552822000,
      level: "info",
      message: "Attempting TLS handshake inspection",
      phase: "analysis",
    },
    {
      id: "6",
      timestamp: 1709552830000,
      level: "warning",
      message: "Unexpected TLS response",
      phase: "analysis",
    },
    {
      id: "7",
      timestamp: 1709552840000,
      level: "info",
      message: "Retrying HTTPS connection",
      phase: "analysis",
    },
    {
      id: "8",
      timestamp: 1709552850000,
      level: "error",
      message: "TLS handshake failed",
      phase: "analysis",
    },
    {
      id: "9",
      timestamp: 1709552855000,
      level: "error",
      message: "Unable to establish stable connection",
      phase: "analysis",
    },
    {
      id: "10",
      timestamp: 1709552860000,
      level: "error",
      message: "Scan terminated due to TLS failure",
      phase: "complete",
    },
  ],
};
export const scanFailedAuth: ScanSession = {
  scanId: "scan-005",
  status: "failed",
  startedAt: 1709552900000,
  completedAt: 1709552950000,
  logs: [
    {
      id: "1",
      timestamp: 1709552900000,
      level: "info",
      message: "Starting penetration test on auth.democorp.com",
      phase: "recon",
    },
    {
      id: "2",
      timestamp: 1709552905000,
      level: "success",
      message: "Target responded to ping",
      phase: "recon",
    },
    {
      id: "3",
      timestamp: 1709552912000,
      level: "info",
      message: "Enumerating authentication endpoints",
      phase: "enumeration",
    },
    {
      id: "4",
      timestamp: 1709552920000,
      level: "success",
      message: "Detected /login and /token endpoints",
      phase: "enumeration",
    },
    {
      id: "5",
      timestamp: 1709552930000,
      level: "info",
      message: "Attempting credential validation tests",
      phase: "analysis",
    },
    {
      id: "6",
      timestamp: 1709552940000,
      level: "warning",
      message: "Rate limit triggered during brute-force test",
      phase: "analysis",
    },
    {
      id: "7",
      timestamp: 1709552945000,
      level: "error",
      message: "API returned repeated 429 responses",
      phase: "analysis",
    },
    {
      id: "8",
      timestamp: 1709552950000,
      level: "error",
      message: "Scan halted due to rate limiting",
      phase: "complete",
    },
  ],
};

export const scanSuccessDeep: ScanSession = {
  scanId: "scan-006",
  status: "success",
  startedAt: 1709553000000,
  completedAt: 1709553090000,
  logs: [
    {
      id: "1",
      timestamp: 1709553000000,
      level: "info",
      message: "Starting penetration test on support.democorp.com",
      phase: "recon",
    },
    {
      id: "2",
      timestamp: 1709553005000,
      level: "success",
      message: "Target reachable",
      phase: "recon",
    },
    {
      id: "3",
      timestamp: 1709553010000,
      level: "info",
      message: "Enumerating subdirectories",
      phase: "enumeration",
    },
    {
      id: "4",
      timestamp: 1709553020000,
      level: "success",
      message: "Found /tickets endpoint",
      phase: "enumeration",
    },
    {
      id: "5",
      timestamp: 1709553030000,
      level: "info",
      message: "Analyzing request headers",
      phase: "analysis",
    },
    {
      id: "6",
      timestamp: 1709553040000,
      level: "warning",
      message: "Detected exposed debug header",
      phase: "analysis",
    },
    {
      id: "7",
      timestamp: 1709553050000,
      level: "info",
      message: "Testing header manipulation",
      phase: "exploit",
    },
    {
      id: "8",
      timestamp: 1709553060000,
      level: "success",
      message: "Access to internal ticket data confirmed",
      phase: "exploit",
    },
    {
      id: "9",
      timestamp: 1709553070000,
      level: "warning",
      message: "Sensitive information exposure detected",
      phase: "analysis",
    },
    {
      id: "10",
      timestamp: 1709553080000,
      level: "info",
      message: "Compiling vulnerability report",
      phase: "analysis",
    },
    {
      id: "11",
      timestamp: 1709553085000,
      level: "success",
      message: "Report generation completed",
      phase: "analysis",
    },
    {
      id: "12",
      timestamp: 1709553090000,
      level: "success",
      message: "Scan completed successfully with 2 findings",
      phase: "complete",
    },
  ],
};

export const mockData = [
  scanSuccessLong,
  scanFailedShort,
  scanSuccessMedium,
  scanFailedNetwork,
  scanFailedAuth,
  scanSuccessDeep,
];

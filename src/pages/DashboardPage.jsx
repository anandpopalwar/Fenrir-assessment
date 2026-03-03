const incidents = [
  { id: 'INC-241', service: 'Payment API', severity: 'critical', status: 'Action required' },
  { id: 'INC-237', service: 'Auth Service', severity: 'high', status: 'Investigating' },
  { id: 'INC-225', service: 'Admin Portal', severity: 'medium', status: 'Mitigated' },
  { id: 'INC-220', service: 'Marketing Site', severity: 'low', status: 'Monitoring' },
]

const metrics = [
  { title: 'Open Alerts', value: '27', tone: 'critical' },
  { title: 'Critical Assets', value: '5', tone: 'high' },
  { title: 'Scan Coverage', value: '93%', tone: 'low' },
]

function severityClass(level) {
  const map = {
    critical: 'chip chip-critical',
    high: 'chip chip-high',
    medium: 'chip chip-medium',
    low: 'chip chip-low',
  }
  return map[level]
}

function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="mt-2">Security posture summary for your current workspace.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((item) => (
          <article key={item.title} className="surface-card p-6">
            <p className="text-sm font-medium text-[var(--muted)]">{item.title}</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-3xl font-bold text-[var(--text)]">{item.value}</p>
              <span className={severityClass(item.tone)}>{item.tone}</span>
            </div>
          </article>
        ))}
      </div>

      <article className="surface-card overflow-hidden">
        <div className="border-b border-[var(--border)] px-6 py-4">
          <h2 className="text-xl font-semibold">Recent Findings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-[var(--surface-2)] text-[var(--muted)]">
              <tr>
                <th className="px-6 py-3 font-medium">Incident</th>
                <th className="px-6 py-3 font-medium">Service</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((item) => (
                <tr key={item.id} className="border-t border-[var(--border)]">
                  <td className="px-6 py-4 font-medium text-[var(--text)]">{item.id}</td>
                  <td className="px-6 py-4 text-[var(--muted)]">{item.service}</td>
                  <td className="px-6 py-4">
                    <span className={severityClass(item.severity)}>{item.severity}</span>
                  </td>
                  <td className="px-6 py-4 text-[var(--muted)]">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}

export default DashboardPage

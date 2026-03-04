const Stats = ({ label, value }) => {
  return (
    <div className="flex justify-center  items-center gap-2 xl:px-4 xl:first:pl-0 xl:last:pr-0">
      <p className="text-sm text-[var(--muted)]">{label}:</p>
      <p className="text-base font-semibold text-[var(--text)]">{value}</p>
    </div>
  );
};

export default Stats;

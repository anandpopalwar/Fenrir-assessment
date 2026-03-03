import { useId } from "react";

type SortOption = "none" | "status" | "newest" | "oldest" | "progress";

type SortOptionsFormProps = {
  value?: string;
  onChange: (value: string) => void;
};

const options: Array<{ value: SortOption; label: string }> = [
  { value: "none", label: "None" },
  { value: "status", label: "Status" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "progress", label: "Progress" },
];

function SortOptionsForm({ value = "none", onChange }: SortOptionsFormProps) {
  const groupId = useId();

  return (
    <div className="rounded-lg bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
      <fieldset className="space-y-3">
        <legend className="sr-only">Sort options</legend>
        {options.map((option) => {
          const id = `${groupId}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1 text-sm font-medium text-[var(--low)] hover:bg-[var(--surface-2)]"
            >
              <input
                id={id}
                type="radio"
                name={groupId}
                value={option.value}
                checked={value === option.value}
                onChange={(event) => onChange(event.target.value)}
                className="!accent-[var(--low)]"
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </fieldset>
    </div>
  );
}

export default SortOptionsForm;

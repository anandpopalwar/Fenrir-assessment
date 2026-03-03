import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";

const Statement = ({ text, icon }) => {
  return (
    <li className="flex items-start gap-3">
      {icon === "check" ? (
        <CheckIcon className="h-5 w-5 text-emerald-300" />
      ) : (
        <XMarkIcon className="h-5 w-5 text-red-300" />
      )}
      <span>{text}</span>
    </li>
  );
};

export default Statement;

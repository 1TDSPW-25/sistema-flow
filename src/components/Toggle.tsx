import { useState } from "react";

type ToggleProps = {
  onToggle: (value: boolean) => void;
  initialValue?: boolean;
};

const Toggle = ({ onToggle, initialValue = false }: ToggleProps) => {
  const [isOn, setIsOn] = useState(initialValue);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`
         inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          isOn
            ? "bg-indigo-600 focus:ring-indigo-500"
            : "bg-gray-200 focus:ring-gray-500"
        }
      `}
      role="switch"
      aria-checked={isOn}
    >
      <span
        aria-hidden="true"
        className={`
          pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
          ${isOn ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  );
};

export default Toggle;

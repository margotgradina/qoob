import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

interface IconButtonProps {
  icon: IconProp;
  label: string; //used for the tooltip and the accessible name
  onClick: () => void;
  className?: string;
  size?: "xs" | "sm" | "lg";
  variant?: "plain" | "filled"; //filled is the round green action button
  active?: boolean;
  disabled?: boolean;
  small?: boolean; //a tad smaller than the default filled button
}

//a real <button> around an icon: reachable with the keyboard, announced by screen readers, 24px minimum target.
//the tooltip is fixed-positioned so the scrolling toolbar can't clip it, and shows on hover and keyboard focus.
const IconButton = ({icon, label, onClick, className = "", size, variant = "plain", active, small, disabled}: IconButtonProps) => {
  const [tip, setTip] = useState<{x: number; y: number} | null>(null);

  const showTip = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setTip({x: r.right + 8, y: r.top + r.height / 2});
  };

  const look =
    variant === "filled"
      ? `${small ? "h-6 w-6 text-[12px]" : "h-8 w-8 text-[14px]"} rounded-[50%] text-white ${active ? "bg-[#14532d]" : "bg-[#2f7d5b]"}`
      : "h-6 min-w-6 rounded-[6px] bg-transparent text-inherit";

  return (
    <>
      <button
        type="button"
        aria-label={label}
        aria-pressed={active}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onMouseEnter={(e) => showTip(e.currentTarget)}
        onMouseLeave={() => setTip(null)}
        onFocus={(e) => e.currentTarget.matches(":focus-visible") && showTip(e.currentTarget)}
        onBlur={() => setTip(null)}
        className={`m-0 flex items-center justify-center border-0 p-0 ${look} ${disabled ? "cursor-default opacity-40" : "cursor-pointer"} ${className}`}
      >
        <FontAwesomeIcon icon={icon} size={size} />
      </button>
      {tip && (
        <span
          role="tooltip"
          className="pointer-events-none fixed z-[2000] -translate-y-1/2 whitespace-nowrap rounded-[6px] bg-[#222] px-2 py-1 font-['Raleway'] text-[12px] font-medium text-white shadow-md"
          style={{left: tip.x, top: tip.y}}
        >
          {label}
        </span>
      )}
    </>
  );
};

export default IconButton;

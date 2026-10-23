import {cloneElement, ReactElement, useState} from "react";

//one tooltip style for the whole app. It is fixed-positioned so a scrolling toolbar can't clip it,
//and shows on hover and on keyboard focus.
export const useTooltip = (label: string) => {
  const [pos, setPos] = useState<{x: number; y: number} | null>(null);

  const show = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setPos({x: r.right + 8, y: r.top + r.height / 2});
  };

  const handlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => show(e.currentTarget),
    onMouseLeave: () => setPos(null),
    onFocus: (e: React.FocusEvent<HTMLElement>) => e.currentTarget.matches(":focus-visible") && show(e.currentTarget),
    onBlur: () => setPos(null),
  };

  const tooltip = pos && (
    <span
      role="tooltip"
      className="pointer-events-none fixed z-[2000] -translate-y-1/2 whitespace-nowrap rounded-[6px] bg-[#222] px-2 py-1 font-['Raleway'] text-[12px] font-medium text-white shadow-md"
      style={{left: pos.x, top: pos.y}}
    >
      {label}
    </span>
  );

  return {handlers, tooltip};
};

//wraps a single element and gives it the tooltip
const Tooltip = ({label, children}: {label: string; children: ReactElement}) => {
  const {handlers, tooltip} = useTooltip(label);
  return (
    <>
      {cloneElement(children, handlers)}
      {tooltip}
    </>
  );
};

export default Tooltip;

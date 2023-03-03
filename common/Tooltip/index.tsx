import { FC, useState, ReactNode, useRef } from "react";
import classes from "./classes.module.css"
import TooltipPortal from "./TooltipPortal";

type TooltipProps = {
  children: ReactNode;
  content?: string | ReactNode;
  display?: boolean;
  displayType?: string;
};


const ToolTip: FC<TooltipProps> = ({ children, content, display = true, displayType, ...props }) => {
  const [visible, setVisibility] = useState<boolean>(false)
  const [styles, setStyles] = useState<Object>({})
  const tooltipRef = useRef<HTMLDivElement>(null!)

  const show = () => {
    const style = { left: 0, top: 0 };

    const dimensions = tooltipRef.current.getBoundingClientRect();

    // center align the tooltip by taking both the target and tooltip widths into account
    style.left = (dimensions.left + 10 + (dimensions.width / 2) );
    style.left = Math.min(style.left, document.body.clientWidth); // or off the right
    
    style.top = dimensions.top + dimensions.height;

    setVisibility(true)
    setStyles(style)
  }

  const hide = () => {
    setVisibility(false)
    setStyles({})
  }

  if (!display) {
    return <span>{children}</span>;
  }

  return (
    <span
      onMouseEnter={show}
      // onClick={show}
      onMouseLeave={hide}
      ref={tooltipRef}
      className="cursor-pointer"
    >
      {children}
      {visible &&
        <TooltipPortal>
          <div style={styles} className={classes.tooltip}>
            {content}
          </div>
        </TooltipPortal>
      }
    </span>
  );
}

export default ToolTip;
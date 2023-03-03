import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
interface Props {
    children: React.ReactNode;
}

const TooltipPortal: FC<Props> = ({ children }) => {
  const mount = document.getElementById("tooltip");
  const el = document.createElement("div");

  useEffect(() => {
    mount?.appendChild(el);
    return () => {
        mount?.removeChild(el);
    }
  }, [el, mount]);

  return createPortal(children, el)
};

export default TooltipPortal;
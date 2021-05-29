import { RefObject, useEffect } from "react";

const useOutsideClick = (
  ref: RefObject<Element> | null,
  callback: () => void
) => {
  const handleClick = (e: any) => {
    if (ref && ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;

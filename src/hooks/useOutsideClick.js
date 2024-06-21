import { useEffect, useRef } from "react";

export function useOutsideClick(callback, listenCapturing = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);
    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [ref, callback, listenCapturing]);
  return ref;
}

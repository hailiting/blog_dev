import { useState, useEffect } from "react";
function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value); // 一定时间之后更新value值
    }, delay);
    return () => {
      clearInterval(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
export default useDebounce;

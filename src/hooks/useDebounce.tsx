import { useState, useEffect } from 'react';

/**
 * debouce 개념을 적용한 custom hook
 * 정해진 시간동안 값에 변화가 없을 때에민 최종값이 확정된다.
 * @param value debounce를 적용할 값
 * @param delay 지연시킬 시간
 * @returns 최종 value
 */
const useDebounce = (value: any, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log('setting new timeout');
      setDebouncedValue(value);
    }, delay);

    return () => {
      console.log('clearing timeout');
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

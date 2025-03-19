import { useEffect, useState } from "react";

function useLocalstorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (key) {
      if (defaultValue instanceof Object) {
        const storageValue = localStorage.getItem(key);
        if (storageValue) {
          const v = JSON.parse(storageValue) as T;
          return v;
        }
        return defaultValue;
      } else {
        const v = String(localStorage.getItem(key) || "") as T;
        return v;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    if (value) {
      if (value instanceof Object) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, String(value));
      }
    }
  }, [key, value]);

  return { value, setValue };
}

export default useLocalstorage;

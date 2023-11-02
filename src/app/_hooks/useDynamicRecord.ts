import { useRef, useState } from 'react';

// Should I use Uncontrolled ?
export const useDynamicRecord = <T extends Record<string, any>>(init = {} as T) => {
  const counterRef = useRef(-1);
  const [map, setMap] = useState<Map<keyof T, unknown>>(() => {
    if (Object.keys.length === 0) return new Map();
    return new Map(Object.entries(init));
  });

  const set = (id: string, val: unknown) => {
    map.set(id, val)
    setMap(new Map(map))
  }
  
  const del = (id: string) => {
    map.delete(id)
    setMap(new Map(map))
  }

  const fromMaptoArray = (m: Map<keyof T, unknown>) => {
    return Array.from(m.values())
  }

  return {
    map,
    set,
    del,
    fromMaptoArray
  }
};
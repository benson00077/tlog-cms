import { useState } from 'react';

// Should I use Uncontrolled ?
export const useDynamicRecord = <T extends Record<string, any>, V>(init = {} as T) => {
  const [map, setMap] = useState<Map<keyof T, V>>(() => {
    if (Object.keys.length === 0) return new Map();
    return new Map(Object.entries(init));
  });

  const set = (id: string, val: V) => {
    map.set(id, val)
    setMap(new Map(map))
  }
  
  const del = (id: string) => {
    map.delete(id)
    setMap(new Map(map))
  }

  const fromMaptoArray = (m: typeof map) => {
    return Array.from(m.values())
  }

  return {
    map,
    set,
    del,
    fromMaptoArray
  }
};
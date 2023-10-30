export function formDataToObject(formData: FormData) {
  const object: Record<string, unknown> = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return object;
}

export function getDirtyFlds<T extends Record<string, unknown>>(oldObj: T, newObj: Partial<T>) {
  const changedFlds: Partial<T> = {};

  return Object.keys(newObj).reduce((changed, key: keyof T) => {
    if (newObj.hasOwnProperty(key)) {
      if (oldObj[key] !== newObj[key]) {
        changed[key] = newObj[key];
      }
    }
    return changed;
  }, changedFlds);
}

export function pruneProperties<T, K extends keyof T>(obj: T, properties: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const prop of properties) {
    delete result[prop];
  }
  return result;
}
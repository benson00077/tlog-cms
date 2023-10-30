/** 
 *  @param timestamp - "2022-03-30T06:09:27.615Z"  
 */
export function timeStampFilter(timestamp: string) {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  const formattedDate = date.toLocaleDateString('zh-TW', options);
  return formattedDate
}

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
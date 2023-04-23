export function stringify(json: any): string {
  return JSON.stringify(json, null, 4);
}

export function removeEmptyValues(arg: Record<string, [] | object>) {
  return Object.fromEntries(
    Object.entries(arg).filter(([_, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return Object.keys(value).length > 0;
    })
  );
}

export function stringify(json: any): string {
  return JSON.stringify(json, null, 4);
}

export function parse(json: any): any {
  try {
    return JSON.parse(json);
  } catch (e) {
    return undefined;
  }
}

export function prettify(json: string) {
  try {
    const parsedJson = JSON.parse(json);
    return JSON.stringify(parsedJson, null, 2);
  } catch (error) {
    return json;
  }
}

export function minify(json: string) {
  try {
    return JSON.stringify(JSON.parse(json));
  } catch (error) {
    return json;
  }
}

export function isJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
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

export function parseIntOrDefault(value: string, fallback: number | undefined) {
  try {
    return parseInt(value);
  } catch (e) {
    return fallback;
  }
}

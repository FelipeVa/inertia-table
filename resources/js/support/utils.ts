export function filterObject(
  obj: Record<string, any>,
  callback: (key: string) => boolean,
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => callback(key)),
  );
}

export function omit(obj: Record<string, any>, keys: string[]) {
  return filterObject(obj, (key) => !keys.includes(key));
}

export function omitNotation(obj: Record<string, any>, keys: string[]) {
  const copyOfObject = { ...obj };

  if (Object.keys(copyOfObject).length === 0) {
    return copyOfObject;
  }

  keys.forEach((key) => {
    const parts = key.split('.');
    const last = parts.pop();

    if (!last) {
      return;
    }

    const parent = parts.reduce((acc, part) => acc[part], copyOfObject);

    if (!parent) {
      return;
    }

    delete parent[last];
  });

  return copyOfObject;
}

export function queryKeyFor(key: string, tableName = 'default') {
  return tableName === 'default' ? key : `${tableName}_${key}`;
}

export const flattenKeyValueParams = (
  obj: Record<string, any>,
  parentKey = '',
): string[] => {
  return Object.entries(obj).flatMap(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      return parentKey
        ? flattenKeyValueParams(value, `${parentKey}[${key}]`)
        : flattenKeyValueParams(value, `${key}`);
    }

    return parentKey ? [`${parentKey}[${key}]=${value}`] : [`${key}=${value}`];
  });
};

export function getParamsObject(url?: string): Record<string, any> {
  const searchParams = new URLSearchParams(url || window.location.search);
  const params = {};

  for (const [key, value] of searchParams.entries()) {
    const keys = key
      .split('[')
      .map((k) => (k.endsWith(']') ? k.slice(0, -1) : k));
    let current: Record<string, any> = params;

    for (let i = 0; i < keys.length; i++) {
      const nestedKey = keys[i];
      if (!current[nestedKey]) {
        if (i === keys.length - 1) {
          current[nestedKey] = value;
        } else {
          current[nestedKey] = {};
        }
      }
      current = current[nestedKey];
    }
  }

  return params;
}

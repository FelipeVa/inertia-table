import { getParamsObject } from "@/support/utils";

export function useParams() {
  const params = getParamsObject();

  const getParam = (
    key: string,
    defaultValue:
      | Record<string, any>
      | undefined
      | string
      | boolean = undefined,
  ) => {
    return params[key] || defaultValue;
  };

  const currentPath = window.location.origin + window.location.pathname;

  return {
    getParam,
    params,
    currentPath,
  };
}

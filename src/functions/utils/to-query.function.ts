export const toQuery = <
  T extends Record<string, any> = Record<string, any>,
>(
  params: T,
): string => {
  const keys = Object.keys(params);
  const hasValues = Object.values(params).filter(Boolean).length > 0;
  if (!hasValues) {
    return "";
  }

  const queryString: string[] = [];
  for (let i = 0, len = keys.length; i < len; ++i) {
    queryString.push(
      `${encodeURIComponent(keys[i])}=${encodeURIComponent(params[keys[i]])}`,
    );
  }

  return "?" + queryString.join("&");
};

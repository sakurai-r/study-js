type ModifyUrlParams = {
  base: string;
  addQuery?: [string, string][];
  path?: string;
};

export function modifyUrl({ base, addQuery, path }: ModifyUrlParams): string {
  const url = new URL(base);

  if (path) {
    url.pathname = new URL(path, url.origin).pathname;
  }

  if (addQuery) {
    const searchParams = new URLSearchParams(url.search);
    for (const [key, value] of addQuery) {
      searchParams.append(key, value);
    }
    url.search = searchParams.toString();
  }

  return url.toString();
}

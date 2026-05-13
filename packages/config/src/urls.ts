export function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export function joinUrl(baseUrl: string, path: string): string {
  const normalizedBaseUrl = trimTrailingSlash(baseUrl);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBaseUrl}${normalizedPath}`;
}

export function createLocalHttpUrl(options: { host?: string; port: number }): string {
  return `http://${options.host ?? "localhost"}:${options.port}`;
}

/** Prepend the configured base path to an internal URL. */
export function base(path: string): string {
  const b = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${b}${path}`;
}

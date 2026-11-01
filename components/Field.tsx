import type { ReactNode } from "react";

// Shown wherever a mock row has no value, so a card never prints a blank or "undefined".
export const FILLER = "Not listed yet";

export function isEmpty(value: unknown): boolean {
  return value === undefined || value === null || (typeof value === "string" && value.trim() === "");
}

// Renders `format(value)` when the value exists, otherwise the filler line.
export function Field<T>({
  value,
  format,
  className,
}: {
  value: T | undefined | null;
  format?: (v: T) => ReactNode;
  className?: string;
}) {
  if (isEmpty(value)) {
    return <span className={`${className ?? ""} text-filler italic`.trim()}>{FILLER}</span>;
  }
  const v = value as T;
  return <span className={className}>{format ? format(v) : String(v)}</span>;
}

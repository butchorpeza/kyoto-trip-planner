const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

// "2025-04-11" -> "Fri 11 Apr"
export function shortDate(iso: string): string {
  const { y, m, d } = parts(iso);
  const day = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", { weekday: "short", timeZone: "UTC" });
  return `${day} ${d} ${MONTHS[m - 1]}`;
}

export function year(iso: string): number {
  return parts(iso).y;
}

export function usd(n: number): string {
  return `$${n} USD`;
}

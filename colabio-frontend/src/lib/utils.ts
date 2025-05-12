import { format } from "date-fns";

export function formatDate(date: Date): string {
  return format(date, "PPP");
}

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

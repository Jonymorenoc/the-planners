import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pastel = {
  rose: "#FDE8E4",
  mint: "#E6F5F1",
  lavender: "#ECE9FF",
  sky: "#E3F2FF",
  sand: "#FFF4E3",
  blush: "#F8EFF7",
  slate: "#414141",
};


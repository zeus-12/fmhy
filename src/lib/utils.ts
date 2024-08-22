import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const devLog = (...args: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`%c[DEV]`, "color: #green; font-weight: bold;", ...args);
  }
};

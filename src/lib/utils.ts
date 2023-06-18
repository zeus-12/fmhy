import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatName(name: string) {
  if (!name) return name;
  let nameArray = name.replaceAll("-", " ").replaceAll("_", " ").split(" ");

  let formattedName = "";
  for (let i = 0; i < nameArray.length; i++) {
    formattedName +=
      nameArray[i][0].toUpperCase() + nameArray[i].slice(1) + " ";
  }
  return formattedName.replaceAll("Ios", "iOS").replaceAll("os", "OS");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function sum(a, b) {
  return a + b;
}

export function objectToFormData(data) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  return formData;
}

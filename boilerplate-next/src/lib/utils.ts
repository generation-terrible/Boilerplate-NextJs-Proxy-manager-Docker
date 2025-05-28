import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sum(a: number, b: number): number {
  return a + b;
}

export function objectToFormData<T extends Record<string, any>>(
  data: T
): FormData {
  const formData = new FormData();
  (Object.keys(data) as Array<keyof T>).forEach((key) => {
    const value = data[key];
    if (value !== undefined && value !== null) {
      formData.append(key as string, String(value));
    }
  });
  return formData;
}

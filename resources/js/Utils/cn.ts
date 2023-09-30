import clsx from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...values: clsx.ClassValue[]) {
    return twMerge(clsx(values))
}

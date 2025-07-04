import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: IProps) {
  return (
    <div className={cn("mx-auto max-w-7xl px-5", className)}>{children}</div>
  );
}

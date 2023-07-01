import { HTMLAttributes, MouseEventHandler } from "react";

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  onPress?: MouseEventHandler<HTMLDivElement>;
  width?: number | string;
  height?: number | string;
}

export default function Card({ onPress, width, height, children, ...props }: ICardProps) {
  return (
    <div
      className={`card relative shadow-lg shadow-[#000]/70 bordered card-compact bg-[#0c0e1e] ${
        onPress ? "cursor-pointer" : "cursor-default"
      }`}
      onClick={onPress}
      style={{ width, height }}
      {...props}
    >
      {children}
    </div>
  );
}

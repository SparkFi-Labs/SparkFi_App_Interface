import { HTMLAttributes, MouseEventHandler } from "react";

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  onPress?: MouseEventHandler<HTMLDivElement>;
  width?: number | string;
  height?: number | string;
  hoverEffect?: boolean;
}

export default function Card({ onPress, width, height, children, hoverEffect, ...props }: ICardProps) {
  return (
    <div
      className={`card relative transition ease-in delay-500 shadow-lg shadow-[#000]/70 card-bordered card-compact bg-[#0c0e1e] ${
        onPress ? "cursor-pointer" : "cursor-default"
      } ${hoverEffect ? "hover:shadow-[#0029ff]" : ""}`}
      onClick={onPress}
      style={{ width, height }}
      {...props}
    >
      {children}
    </div>
  );
}

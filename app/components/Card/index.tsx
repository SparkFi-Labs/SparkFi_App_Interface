import { HTMLAttributes, MouseEventHandler } from "react";

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  onPress?: MouseEventHandler<HTMLDivElement>;
  width?: number | string;
  height?: number | string;
  hoverEffect?: boolean;
}

export default function Card({ onPress, width, height, children, hoverEffect, style, ...props }: ICardProps) {
  return (
    <div
      className={`card relative transition ease-in delay-500 rounded-[inherit] card-compact bg-[#151938] ${
        onPress ? "cursor-pointer" : "cursor-default"
      } ${hoverEffect ? "hover:shadow-[#0029ff]" : ""}`}
      onClick={onPress}
      style={{ width, height, ...(style ?? {}) }}
      {...props}
    >
      {children}
    </div>
  );
}

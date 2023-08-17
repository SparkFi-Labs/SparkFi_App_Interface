import { HTMLAttributes, MouseEventHandler } from "react";

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  onPress?: MouseEventHandler<HTMLDivElement>;
  width?: number | string;
  height?: number | string;
  hoverEffect?: boolean;
  disabled?: boolean;
}

export default function Card({ onPress, width, height, children, hoverEffect, style, disabled, ...props }: ICardProps) {
  return (
    <div
      className={`card relative transition ease-in delay-500 rounded-[inherit] card-compact ${
        !disabled
          ? "bg-[#151938]"
          : "bg-[linear-gradient(166deg,_rgba(172,_230,_255,_0.50)_0%,_rgba(172,_230,_255,_0.00)_100%)] border border-[#0029ff]"
      } ${onPress ? "cursor-pointer" : "cursor-default"} ${hoverEffect ? "hover:shadow-[#0029ff]" : ""}`}
      onClick={onPress}
      style={{ width, height, ...(style ?? {}) }}
      {...props}
    >
      {children}
    </div>
  );
}

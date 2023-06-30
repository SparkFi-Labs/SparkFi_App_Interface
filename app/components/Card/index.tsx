import { HTMLAttributes, MouseEventHandler } from "react";

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  onPress?: MouseEventHandler<HTMLDivElement>;
  width?: number | string;
  height?: number | string;
}

export default function Card({ onPress, width, height, children, ...props }: ICardProps) {
  return (
    <div
      className={`card relative shadow-xl bordered card-compact bg-[#000] ${
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

import { HTMLAttributes, MouseEventHandler } from "react";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  onPress?: MouseEventHandler<HTMLDivElement>;
  width?: number | string;
  height?: number | string;
}

export default function Card({ onPress, width, height, children, ...props }: ICardProps) {
  return (
    <div
      className={onPress ? "bg-[#000] rounded-[7px] cursor-pointer" : "bg-[#000] rounded-[7px]"}
      onClick={onPress}
      style={{ width, height }}
      {...props}
    >
      {children}
    </div>
  );
}

import { monda } from "@/fonts";
import React, { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | ReactNode;
  onPress?: MouseEventHandler<HTMLButtonElement>;
  width?: string | number;
  height?: string | number;
}

export const SkewedButtonPrimary: React.FC<CustomButtonProps> = ({ label, onPress, width, height, ...props }) => (
  <button
    className={`flex justify-center items-center gap-2 border-0 outline-0 w-full h-full px-2 py-2 text-[#fff] bg-[#000] text-sm lg:text-lg font-inter -skew-x-[0.312rad] ${monda.className}`}
    onClick={onPress}
    style={{ width, height }}
    {...props}
  >
    {label}
  </button>
);

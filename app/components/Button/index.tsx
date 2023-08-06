import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | ReactNode;
  onPress?: MouseEventHandler<HTMLButtonElement>;
  width?: string | number;
  height?: string | number;
  isLoading?: boolean;
}

export const CTAPurple = ({ label, onPress, width, height, isLoading, ...props }: IButtonProps) => (
  <button
    className="flex justify-center items-center gap-2 border-0 outline-0 w-full h-full px-2 py-2 text-[#fff] bg-[#0029ff] rounded-[7px] text-[0.8em] font-inter"
    onClick={onPress}
    style={{ width, height }}
    {...props}
  >
    {label}
  </button>
);

export const CTAPurpleOutline = ({ label, onPress, width, height, isLoading, ...props }: IButtonProps) => (
  <button
    className="flex justify-center items-center gap-2 outline-0 w-full h-full px-2 py-2 text-[#fff] bg-[#0c0e1e] border border-[#0029ff] rounded-[7px] text-[0.8em] font-inter"
    onClick={onPress}
    style={{ width, height }}
    {...props}
  >
    {label}
  </button>
);

export const CTAMainBG = ({ label, onPress, width, height, isLoading, ...props }: IButtonProps) => (
  <button
    className="flex justify-center items-center gap-2 outline-0 w-full h-full px-2 py-2 text-[#fff] bg-[#0c0e1e] rounded-[7px] text-[0.8em] font-inter"
    onClick={onPress}
    style={{ width, height }}
    {...props}
  >
    {label}
  </button>
);

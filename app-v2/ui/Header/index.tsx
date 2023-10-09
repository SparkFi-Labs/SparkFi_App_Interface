import Link from "next/link";
import Image from "next/image";
import { inter, manuale } from "@/fonts";
import { FaDiscord } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import { SkewedButtonPrimary } from "@/components/Button";

export default function Header() {
  return (
    <header className="flex justify-between items-start w-full px-2 py-3 md:px-7 md:py-7 z-20">
      <Link href="/" className="flex justify-center gap-1 text-[#000] items-start">
        <Image src="/images/logo.svg" height={30} width={30} alt="logo" />
        <span className={`font-[500] text-xl lg:text-3xl ${manuale.className}`}>SparkFi</span>
      </Link>
      <div
        className={`${inter.className} hidden lg:flex justify-center gap-9 items-center text-[#000] text-lg font-[500] capitalize`}
      >
        <Link href="/">home</Link>
        <Link href="/">pools</Link>
        <Link href="/">staking</Link>
        <Link href="/">apply</Link>
      </div>
      <div className="flex justify-center items-center gap-3">
        <a
          href="https://discord.com/invite/WtBvqvuaTu"
          target="_blank"
          role="button"
          className="btn btn-ghost btn-square"
        >
          <FaDiscord size={30} />
        </a>
        <div className="hidden md:block w-40 h-10">
          <SkewedButtonPrimary width="100%" height="100%" label="Connect" />
        </div>
        <button className="btn md:hidden btn-ghost btn-square btn-sm text-[#000] font-[800]">
          <RiMenu3Line size={28} />
        </button>
      </div>
    </header>
  );
}

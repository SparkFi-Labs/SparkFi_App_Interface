import { CTAPurple } from "@/components/Button";
import { FiMenu, FiUser } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between items-center w-full px-5 py-4 bg-[linear-gradient(90.67deg,_rgba(12,_14,_30,_0.5)_6.48%,_rgba(20,_23,_46,_0.5)_58.12%,_rgba(217,_217,_217,_0)_99.86%)] lg:bg-none">
      <div className="flex justify-center items-center gap-3">
        <button className="flex lg:hidden justify-center items-center gap-2 bg-[#131735] border-0 outline-0 h-full px-2 py-2 text-[#fff] rounded-[7px] text-[1.2em]">
          <FiMenu />
        </button>
        <div className="flex justify-center gap-1 items-center">
          <Image src="/images/sparkfi_logo.svg" height={50} width={50} alt="logo" />
          <span className="hidden lg:block uppercase text-[#fff] font-[500] text-[1.5em]">sparkfi</span>
        </div>
      </div>
      <div className="hidden lg:flex justify-center items-center gap-9 text-[#fff] font-[500] text-[0.95em] capitalize">
        <Link href="/">home</Link>
        <Link href="/">launchpad</Link>
        <Link href="/">staking</Link>
        <Link href="/">roadmap</Link>
        <Link href="/">contact us</Link>
      </div>
      <div className="flex justify-center items-start gap-5">
        <CTAPurple label="connect wallet" />

        <button className="flex justify-center items-center gap-2 bg-[#131735] border-0 outline-0 h-full px-2 py-2 text-[#fff] rounded-[7px] text-[1.2em]">
          <FiUser />
        </button>
      </div>
    </div>
  );
}

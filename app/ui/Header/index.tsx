import { CTAPurple } from "@/components/Button";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Header() {
  const checkRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex justify-between items-center w-full px-5 py-4 bg-[linear-gradient(90.67deg,_rgba(12,_14,_30,_0.5)_6.48%,_rgba(20,_23,_46,_0.5)_58.12%,_rgba(217,_217,_217,_0)_99.86%)] lg:bg-none">
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => {
            if (checkRef.current) checkRef.current.checked = true;
          }}
          className="flex lg:hidden justify-center items-center gap-2 bg-[#131735] border-0 outline-0 h-full px-2 py-2 text-[#fff] rounded-[7px] text-[1.2em]"
        >
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
      <input ref={checkRef} id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side lg:hidden">
        <label htmlFor="sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content capitalize font-[500] text-[0.95em]">
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/">launchpad</Link>
          </li>
          <li>
            <Link href="/">staking</Link>
          </li>
          <li>
            <Link href="/">roadmap</Link>
          </li>
          <li>
            <Link href="/">contact us</Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-start">
        <CTAPurple
          label="apply for launch"
          height={45}
          onPress={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSfydXr1FpS954vGzRTiOhy-U_B5SNYYjMgSHL5Ndz7hl3zd7A/viewform?vc=0&c=0&w=1&flr=0",
              "_blank"
            )
          }
        />
      </div>
    </div>
  );
}

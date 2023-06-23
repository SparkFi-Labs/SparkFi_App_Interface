import { CTAPurple } from "@/components/Button";
import { FiMenu, FiUser } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import WalletConnectModal from "../Modals/WalletConnectModal";
import { useMyEtherBalance } from "@/hooks/wallet";
import { useWeb3React } from "@web3-react/core";
import millify from "millify";
import { FaWallet } from "react-icons/fa";

export default function Header() {
  const sidebarRef = useRef<HTMLInputElement>(null);
  const walletConnectModalRef = useRef<HTMLInputElement>(null);

  const { isActive, connector } = useWeb3React();
  const etherBalance = useMyEtherBalance();
  return (
    <div className="flex justify-between items-center w-full px-5 py-4 bg-[linear-gradient(90.67deg,_rgba(12,_14,_30,_0.5)_6.48%,_rgba(20,_23,_46,_0.5)_58.12%,_rgba(217,_217,_217,_0)_99.86%)]">
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => {
            if (sidebarRef.current) sidebarRef.current.checked = true;
          }}
          className="flex lg:hidden justify-center items-center gap-2 bg-[#131735] border-0 outline-0 h-full px-2 py-2 text-[#fff] rounded-[7px] text-[1.2em]"
        >
          <FiMenu />
        </button>
        <div className="flex justify-center gap-1 items-center">
          <Image src="/images/sparkfi_logo.svg" height={45} width={50} alt="logo" />
          <span className="hidden lg:block uppercase text-[#fff] font-[500] text-[1.5em]">sparkfi</span>
        </div>
      </div>
      <div className="hidden lg:flex justify-center items-center gap-9 text-[#fff] font-[500] text-[0.95em] capitalize">
        <Link href="/">home</Link>
        <Link href="/launchpad">launchpad</Link>
        <Link href="/">staking</Link>
        <Link href="/">swap</Link>
        <Link href="/">contact us</Link>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfydXr1FpS954vGzRTiOhy-U_B5SNYYjMgSHL5Ndz7hl3zd7A/viewform?vc=0&c=0&w=1&flr=0"
          target="_blank"
          rel="noreferrer"
        >
          apply
        </a>
      </div>
      <input ref={sidebarRef} id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side lg:hidden z-20 min-h-screen">
        <label htmlFor="sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-screen bg-base-200 text-base-content capitalize font-[500] text-[0.95em]">
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/launchpad">launchpad</Link>
          </li>
          <li>
            <Link href="/">staking</Link>
          </li>
          <li>
            <Link href="/">swap</Link>
          </li>
          <li>
            <Link href="/">contact us</Link>
          </li>
          <li>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfydXr1FpS954vGzRTiOhy-U_B5SNYYjMgSHL5Ndz7hl3zd7A/viewform?vc=0&c=0&w=1&flr=0"
              target="_blank"
              rel="noreferrer"
            >
              apply
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-start gap-5">
        {!isActive ? (
          <CTAPurple
            label="connect wallet"
            onPress={() => {
              if (walletConnectModalRef.current) walletConnectModalRef.current.checked = true;
            }}
          />
        ) : (
          <div className="flex justify-center items-center gap-4">
            <button className="border border-[#0029ff] rounded-lg flex justify-start items-center p-0">
              <div
                onClick={async () => {
                  if (connector && connector.deactivate) {
                    await connector.deactivate();
                  }
                }}
                className="border-r border-[#0029ff] bg-[#131735] px-2 py-1 flex justify-center items-center h-full cursor-pointer"
              >
                <FaWallet className="text-green-500 " />
              </div>
              <div className="px-5 py-1 text-[#fff] uppercase">{millify(etherBalance, { precision: 3 })} eth</div>
            </button>
          </div>
        )}

        <button className="flex justify-center items-center gap-2 bg-[#131735] border-0 outline-0 h-full px-2 py-2 text-[#fff] rounded-[7px] text-[1.2em]">
          <FiUser />
        </button>
      </div>

      <WalletConnectModal
        ref={walletConnectModalRef}
        close={() => {
          if (walletConnectModalRef.current) walletConnectModalRef.current.checked = false;
        }}
      />
    </div>
  );
}

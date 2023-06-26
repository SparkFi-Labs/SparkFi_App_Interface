import { CTAPurple } from "@/components/Button";
import { FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";
import { MdAccountCircle, MdRocketLaunch } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef } from "react";
import WalletConnectModal from "../Modals/WalletConnectModal";
import { useMyEtherBalance } from "@/hooks/wallet";
import { useWeb3React } from "@web3-react/core";
import millify from "millify";
import { FaWallet } from "react-icons/fa";
import presaleFactoryAbi from "@/assets/abis/PresaleFactory.json";
import { presaleFactoryContracts } from "@/assets/contracts";
import { useContractOwner } from "@/hooks/contracts";

export default function Header() {
  const sidebarRef = useRef<HTMLInputElement>(null);
  const walletConnectModalRef = useRef<HTMLInputElement>(null);

  const { isActive, connector, account } = useWeb3React();
  const etherBalance = useMyEtherBalance();
  const factoryOwner = useContractOwner(presaleFactoryContracts, presaleFactoryAbi);
  return (
    <div className="flex justify-between items-center w-full px-5 py-4 bg-[#0c0e1e]/50 lg:bg-[#0c0e1e]">
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
          <label
            htmlFor="sidebar"
            className="btn btn-square btn-sm btn-neutral px-1 py-1 flex justify-center items-center m-4"
          >
            <FiX className="text-[1em] text-[#fff]" />
          </label>
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
            label="Connect Wallet"
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
                <FaWallet className="text-green-500 text-[1em]" />
              </div>
              <div className="px-5 py-1 text-[#fff] uppercase">{millify(etherBalance, { precision: 3 })} eth</div>
            </button>
          </div>
        )}
        <details className="dropdown dropdown-end mb-1">
          <summary className="flex justify-center items-center gap-2 bg-[#131735] border-0 outline-0 h-full px-2 py-2 text-[#fff] rounded-[7px] text-[1.2em] cursor-pointer">
            <FiUser />
          </summary>
          <ul className="p-2 shadow-xl menu dropdown-content z-[1] bg-base-100 w-52 mt-3">
            <li>
              <Link href="/" className="capitalize flex justify-start items-center gap-1">
                <MdAccountCircle />
                <span>account overview</span>
              </Link>
            </li>
            {account === factoryOwner && (
              <li>
                <Link href="/launchpad/new" className="capitalize flex justify-start items-center gap-1">
                  <MdRocketLaunch />
                  <span>create new launch</span>
                </Link>
              </li>
            )}
            {isActive && (
              <Fragment>
                <div className="divider w-full"></div>
                <li>
                  <a
                    onClick={async () => {
                      if (connector && connector.deactivate) {
                        await connector.deactivate();
                      }
                    }}
                    className="capitalize flex justify-start items-center gap-1"
                  >
                    <FiLogOut />
                    <span>disconnect wallet</span>
                  </a>
                </li>
              </Fragment>
            )}
          </ul>
        </details>
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

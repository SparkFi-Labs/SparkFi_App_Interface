import { CTAPurple, CTAPurpleOutline } from "@/components/Button";
import { FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";
import { MdAccountCircle, MdRocketLaunch } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef } from "react";
import WalletConnectModal from "../Modals/WalletConnectModal";
import { useWeb3React } from "@web3-react/core";
import { formatEthAddress } from "eth-address";
import { FaWallet } from "react-icons/fa";
import presaleFactoryAbi from "@/assets/abis/PresaleFactory.json";
import { presaleFactoryContracts } from "@/assets/contracts";
import { useContractOwner } from "@/hooks/contracts";
import { useAccountIsPresaleFactoryAdmin } from "@/hooks/app/web3/launchpad";
import { isNil } from "lodash";

export default function Header() {
  const sidebarRef = useRef<HTMLInputElement>(null);
  const walletConnectModalRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDetailsElement>(null);

  const { isActive, connector, account } = useWeb3React();
  const factoryOwner = useContractOwner(presaleFactoryContracts, presaleFactoryAbi);
  const isFactoryAdmin = useAccountIsPresaleFactoryAdmin();

  return (
    <div className="flex justify-between items-start w-full px-5 py-5 bg-[#0c0e1e]/50 z-20">
      <div className="flex justify-center items-start gap-3">
        <button
          onClick={() => {
            if (sidebarRef.current) sidebarRef.current.checked = true;
          }}
          className="flex lg:hidden justify-center items-center gap-2 bg-[#131735] border-0 outline-0 h-full px-2 py-2 text-[#fff] rounded-[7px] text-lg z-20"
        >
          <FiMenu />
        </button>
        <Link href="/" className="flex justify-center gap-1 items-start">
          <Image src="/images/logo.svg" height={30} width={30} alt="logo" />
          <span className="text-[#fff] font-[500] text-lg lg:text-2xl font-manuale">SparkFi</span>
        </Link>
      </div>
      <div className="hidden lg:flex justify-center items-start gap-9 text-[#fff] font-[500] text-lg capitalize">
        <Link className="font-inter" href="/">
          home
        </Link>
        <Link className="font-inter" href="/launchpad">
          launchpad
        </Link>
        <Link className="font-inter" href="/staking">
          staking
        </Link>
        {/* <Link className="font-inter" href="/">
          contact us
        </Link> */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfydXr1FpS954vGzRTiOhy-U_B5SNYYjMgSHL5Ndz7hl3zd7A/viewform?vc=0&c=0&w=1&flr=0"
          target="_blank"
          rel="noreferrer"
          className="font-inter"
        >
          apply
        </a>
      </div>
      <input ref={sidebarRef} id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side lg:hidden z-20 min-h-screen">
        <label htmlFor="sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-60 min-h-screen bg-[#0c0e1e] text-base-content capitalize font-[500] text-sm">
          <label
            htmlFor="sidebar"
            className="btn btn-square btn-sm btn-neutral px-1 py-1 flex justify-center items-center m-4"
          >
            <FiX className="text-[1em] text-[#fff]" />
          </label>
          <li>
            <Link
              className="font-inter"
              onClick={() => {
                if (sidebarRef.current) sidebarRef.current.checked = false;
              }}
              href="/"
            >
              home
            </Link>
          </li>
          <li>
            <Link
              className="font-inter"
              onClick={() => {
                if (sidebarRef.current) sidebarRef.current.checked = false;
              }}
              href="/launchpad"
            >
              launchpad
            </Link>
          </li>
          <li>
            <Link
              className="font-inter"
              onClick={() => {
                if (sidebarRef.current) sidebarRef.current.checked = false;
              }}
              href="/staking"
            >
              staking
            </Link>
          </li>
          {/* <li>
            <Link
              className="font-inter"
              onClick={() => {
                if (sidebarRef.current) sidebarRef.current.checked = false;
              }}
              href="/"
            >
              contact us
            </Link>
          </li> */}
          <li>
            <a
              className="font-inter"
              onClick={() => {
                if (sidebarRef.current) sidebarRef.current.checked = false;
              }}
              href="https://docs.google.com/forms/d/e/1FAIpQLSfydXr1FpS954vGzRTiOhy-U_B5SNYYjMgSHL5Ndz7hl3zd7A/viewform?vc=0&c=0&w=1&flr=0"
              target="_blank"
              rel="noreferrer"
            >
              apply
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-start gap-5 z-20">
        {!isActive || isNil(account) ? (
          <CTAPurple
            label="Connect Wallet"
            onPress={() => {
              if (walletConnectModalRef.current) walletConnectModalRef.current.checked = true;
            }}
          />
        ) : (
          <CTAPurpleOutline
            label={
              <div className="flex justify-start items-center gap-2 w-full py-1 px-1">
                <FaWallet size={20} />
                <span className="text-sm lg:text-lg font-[500] font-inter">{formatEthAddress(account, 5)}</span>
              </div>
            }
            onPress={async () => !isNil(connector.deactivate) && (await connector.deactivate())}
          />
        )}
        <details ref={userMenuRef} className="dropdown dropdown-end mb-1 z-20">
          <summary className="flex justify-center items-center gap-2 bg-[#131735] border-0 outline-0 h-full px-2 py-2 text-[#fff] rounded-[7px] text-lg cursor-pointer">
            <FiUser />
          </summary>
          <ul className="p-2 shadow-lg menu dropdown-content z-[1] bg-[#0029ff] w-52 mt-3 shadow-gray-500">
            <li
              onClick={() => {
                if (userMenuRef.current) userMenuRef.current.open = false;
              }}
            >
              <Link href="/profile" className="capitalize flex justify-start items-center gap-1">
                <MdAccountCircle />
                <span className="font-inter">account overview</span>
              </Link>
            </li>
            {(account === factoryOwner || isFactoryAdmin) && (
              <li
                onClick={() => {
                  if (userMenuRef.current) userMenuRef.current.open = false;
                }}
              >
                <Link href="/launchpad/new" className="capitalize flex justify-start items-center gap-1">
                  <MdRocketLaunch />
                  <span className="font-inter">create new launch</span>
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

                      if (userMenuRef.current) userMenuRef.current.open = false;
                    }}
                    className="capitalize flex justify-start items-center gap-1"
                  >
                    <FiLogOut />
                    <span className="font-inter">disconnect wallet</span>
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

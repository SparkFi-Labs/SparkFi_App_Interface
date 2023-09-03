/* eslint-disable react/display-name */
import Image from "next/image";
import { forwardRef, useCallback } from "react";
import { FiEye, FiHelpCircle, FiX } from "react-icons/fi";
import { metamask, walletconnect, coinbase, trustwallet } from "@/web3/connectors";
import { getAddChainParameter } from "@/web3/chains";

interface ModalProps {
  close?: () => any;
}

const WalletConnectModal = forwardRef<HTMLInputElement, ModalProps>(({ close }, ref) => {
  const connectMetamask = useCallback(async () => {
    try {
      await metamask.activate(getAddChainParameter(8453));
      if (close) close();
    } catch (error: any) {
      console.debug(error.message);
    }
  }, [close]);

  const connectCoinbase = useCallback(async () => {
    try {
      await coinbase.activate(getAddChainParameter(8453));
      if (close) close();
    } catch (error: any) {
      console.debug(error.message);
    }
  }, [close]);

  const connectWalletConnect = useCallback(async () => {
    try {
      await walletconnect.activate(8453);
      if (close) close();
    } catch (error: any) {
      console.debug(error.message);
    }
  }, [close]);

  const connectTrustWallet = useCallback(async () => {
    try {
      await trustwallet.activate(getAddChainParameter(8453));
      if (close) close();
    } catch (error: any) {
      console.debug(error.message);
    }
  }, [close]);

  return (
    <>
      <input type="checkbox" className="modal-toggle" id="connect-wallet-modal" ref={ref} />
      <div className="modal z-20">
        <div className="bg-[#000] rounded-[5px] modal-box flex flex-col justify-start items-center gap-7 z-20">
          <div className="flex justify-between items-center px-3 py-1 w-full">
            <div className="flex flex-col justify-start gap-2 items-start">
              <span className="capitalize text-[1em] leading-6 text-[#f5f5f5] font-[500] font-inter">
                connect wallet
              </span>
              <span className="text-[0.7em] lg:text-[0.8em] leading-6 text-[#c1c9ff] font-[400] font-inter">
                Connect wallet in one click to start using SparkFi
              </span>
            </div>
            <label
              htmlFor="connect-wallet-modal"
              className="btn btn-circle btn-ghost btn-sm text-[#fff] p-1 text-[0.95em]"
            >
              <FiX />
            </label>
          </div>
          <div className="flex flex-col justify-start items-center px-3 py-2 w-full gap-3 lg:gap-5">
            <div className="flex flex-col lg:flex-row justify-start lg:justify-center gap-3 w-full items-center">
              <button
                onClick={connectMetamask}
                className="bg-[#040511] w-full lg:w-1/2 rounded-[5px] px-3 py-2 flex items-center justify-between"
              >
                <div className="bg-[#0c0e1e] rounded-[5px] flex justify-center items-center p-2">
                  <Image src="/images/metamask.svg" alt="metamask" width={40} height={40} />
                </div>
                <span className="capitalize text-[0.89em] leading-6 text-[#f5f5f5] font-[500] font-inter">
                  metamask
                </span>
              </button>
              <button
                onClick={connectCoinbase}
                className="bg-[#040511] w-full lg:w-1/2 rounded-[5px] px-3 py-2 flex items-center justify-between"
              >
                <div className="bg-[#0c0e1e] rounded-[5px] flex justify-center items-center p-2">
                  <Image src="/images/coinbase.svg" alt="coinbase" width={40} height={40} />
                </div>
                <span className="capitalize text-[0.89em] leading-6 text-[#f5f5f5] font-[500] font-inter">
                  coinbase
                </span>
              </button>
            </div>

            <div className="flex flex-col lg:flex-row justify-start lg:justify-center gap-3 w-full items-center">
              <button
                onClick={connectTrustWallet}
                className="bg-[#040511] w-full lg:w-1/2 rounded-[5px] px-3 py-2 flex items-center justify-between"
              >
                <div className="bg-[#0c0e1e] rounded-[5px] flex justify-center items-center p-2">
                  <Image src="/images/trust_wallet.svg" alt="trust" width={40} height={40} />
                </div>
                <span className="capitalize text-[0.89em] leading-6 text-[#f5f5f5] font-[500] font-inter">
                  trust wallet
                </span>
              </button>
              <button
                onClick={connectWalletConnect}
                className="bg-[#040511] w-full lg:w-1/2 rounded-[5px] px-3 py-2 flex items-center justify-between"
              >
                <div className="bg-[#0c0e1e] rounded-[5px] flex justify-center items-center p-2">
                  <Image src="/images/wallet_connect.svg" alt="wallet_connect" width={40} height={40} />
                </div>
                <span className="capitalize text-[0.89em] leading-6 text-[#f5f5f5] font-[500] font-inter">
                  wallet connect
                </span>
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full justify-start items-start gap-3 p-4 bg-[#040511] rounded-[5px]">
            <div className="flex justify-start items-center gap-2 w-full">
              <FiEye className="text-[#f5f5f5] text-[0.5em] lg:text-[0.8em]" />
              <span className="text-[0.5em] lg:text-[0.8em] leading-6 text-[#c1c9ff] font-[400] font-inter">
                View only permissions: We can&apos;t do anything without your approval.
              </span>
            </div>
            <div className="flex justify-start items-center gap-2 w-full">
              <FiHelpCircle className="text-[#f5f5f5] text-[0.5em] lg:text-[0.8em]" />
              <span className="text-[0.5em] lg:text-[0.8em] leading-6 text-[#c1c9ff] font-[400] font-inter">
                New to Web3?{" "}
                <a
                  href="https://www.quicknode.com/guides/web3-fundamentals-security/basics-to-web3-wallets#:~:text=What%20are%20Web3%20Wallets%3F,NFTs%2C%20and%20other%20digital%20tokens."
                  target="_blank"
                  rel="noreferrer"
                  className="font-inter"
                >
                  Learn about wallets.
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default WalletConnectModal;

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import {
  metamask,
  metamaskHooks,
  walletconnect,
  walletconnectHooks,
  coinbase,
  coinbaseHooks,
  trustwallet,
  trustwalletHooks
} from "@/web3/connectors";
import type { MetaMask } from "@web3-react/metamask";
import type { WalletConnect } from "@web3-react/walletconnect";
import type { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import type { TrustWallet } from "@trustwallet/web3-react-trust-wallet";
import { Web3ReactProvider, type Web3ReactHooks } from "@web3-react/core";
import { useEffect } from "react";

const connectors: [MetaMask | WalletConnect | CoinbaseWallet | TrustWallet, Web3ReactHooks][] = [
  [metamask, metamaskHooks],
  [walletconnect, walletconnectHooks],
  [coinbase, coinbaseHooks],
  [trustwallet, trustwalletHooks]
];

const AppContent = ({ children }: any) => {
  useEffect(() => {
    metamask.connectEagerly().catch(() => {
      console.debug("Could not eagerly connect Metamask");
      coinbase.connectEagerly().catch(() => {
        console.debug("Could not eagerly connect Coinbase");
        trustwallet.connectEagerly().catch(() => {
          console.debug("Could not eagerly connect Trustwallet");
        });
      });
    });
  }, []);
  return (
    <div className="min-h-screen w-screen flex justify-start flex-col items-center bg-[#0c0e1e] overflow-hidden scroll-smooth gap-0 drawer">
      <Header />
      <div className="flex-1 overflow-auto">{children}</div>
      <Footer />
    </div>
  );
};

function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <AppContent>
        <Component {...pageProps} />
      </AppContent>
    </Web3ReactProvider>
  );
}

export default App;

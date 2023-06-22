import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { WalletConnect } from "@web3-react/walletconnect";
import { TrustWallet } from "@trustwallet/web3-react-trust-wallet";
import { URLS } from "../chains";

export const [metamask, metamaskHooks] = initializeConnector<MetaMask>(actions => new MetaMask({ actions }));
export const [coinbase, coinbaseHooks] = initializeConnector<CoinbaseWallet>(
  actions =>
    new CoinbaseWallet({
      actions,
      options: {
        url: URLS[84531][0],
        appName: "sparkfi.xyz"
      }
    })
);
export const [walletconnect, walletconnectHooks] = initializeConnector<WalletConnect>(
  actions =>
    new WalletConnect({
      actions,
      options: {
        rpc: URLS
      }
    })
);
export const [trustwallet, trustwalletHooks] = initializeConnector<TrustWallet>(
  actions => new TrustWallet({ actions })
);

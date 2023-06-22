import type { Provider } from "@web3-react/types";
import type { MetaMask } from "@web3-react/metamask";
import type { WalletConnect } from "@web3-react/walletconnect-v2";
import type { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { createSlice } from "@reduxjs/toolkit";

interface Web3State {
  isConnected: boolean;
  address?: string;
  connector?: MetaMask | WalletConnect | CoinbaseWallet;
  chainId?: number;
  error?: any;
  isConnecting: boolean;
  provider?: Provider;
}

const initialState: Web3State = {
  isConnected: false,
  address: undefined,
  connector: undefined,
  isConnecting: false,
  error: undefined,
  chainId: undefined,
  provider: undefined
};

const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    updateWeb3State: (state, action) => {
      state.isConnected = action.payload.isConnected ?? state.isConnected;
      state.address = action.payload.address ?? state.address;
      state.isConnecting = action.payload.isConnecting ?? false;
      state.connector = action.payload.connector ?? state.connector;
      state.chainId = action.payload.chainId ?? state.chainId;
      state.error = action.payload.error;
      state.provider = action.payload.provider ?? state.provider;
    }
  }
});

export const { updateWeb3State } = web3Slice.actions;
export default web3Slice.reducer;

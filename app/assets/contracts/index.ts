interface ChainContracts {
  [chainId: number]: string;
}

interface PaymentTokens {
  [chainId: number]: string[];
}

export const presaleFactoryContracts: ChainContracts = {
  84531: "0x64FAF984Bf60dE19e24238521814cA98574E3b00"
};
export const launchpadPaymentTokens: PaymentTokens = {
  84531: [
    "0x6D0F8D488B669aa9BA2D0f0b7B75a88bf5051CD3",
    "0x290B54A504A3b0cB21888e3E405AFC1b2946598C",
    "0x2e9F75DF8839ff192Da27e977CD154FD1EAE03cf"
  ]
};

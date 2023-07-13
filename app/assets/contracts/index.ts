interface ChainContracts {
  [chainId: number]: string;
}

interface PaymentTokens {
  [chainId: number]: string[];
}

export const presaleFactoryContracts: ChainContracts = {
  84531: "0x7961c29F9007ADbE089c1C4163a77e453A960583"
};
export const sparkFiTokenContracts: ChainContracts = {
  84531: "0xf6a6a429a0b9676293Df0E3616A6a33cA673b5C3"
};
export const launchpadPaymentTokens: PaymentTokens = {
  84531: [
    "0x4200000000000000000000000000000000000006",
    "0x6D0F8D488B669aa9BA2D0f0b7B75a88bf5051CD3",
    "0x290B54A504A3b0cB21888e3E405AFC1b2946598C",
    "0x2e9F75DF8839ff192Da27e977CD154FD1EAE03cf"
  ]
};

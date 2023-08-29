interface ChainContracts {
  [chainId: number]: string;
}

interface PaymentTokens {
  [chainId: number]: string[];
}

export const presaleFactoryContracts: ChainContracts = {
  84531: "0x8919e33AEB5B06d127B737Deb89182930B9F43e8"
};
export const sparkFiTokenContracts: ChainContracts = {
  84531: "0x1c6a839b617ecF785A6aD702B1FAACcD5e4ccaaC"
};
export const allocatorContracts: ChainContracts = {
  84531: "0xF2fE2EF1865789E352D4140D98f99486e2e75E76"
};
export const launchpadPaymentTokens: PaymentTokens = {
  84531: [
    "0x4200000000000000000000000000000000000006",
    "0x6D0F8D488B669aa9BA2D0f0b7B75a88bf5051CD3",
    "0x290B54A504A3b0cB21888e3E405AFC1b2946598C",
    "0x2e9F75DF8839ff192Da27e977CD154FD1EAE03cf"
  ]
};

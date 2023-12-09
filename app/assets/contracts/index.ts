interface ChainContracts {
  [chainId: number]: string;
}

interface PaymentTokens {
  [chainId: number]: string[];
}

export const presaleFactoryContracts: ChainContracts = {
  84531: "0x8919e33AEB5B06d127B737Deb89182930B9F43e8",
  8453: "0xf886abace837e5ec0cf7037b4d2198f7a1bf35b5"
};
export const sparkFiTokenContracts: ChainContracts = {
  84531: "0x1c6a839b617ecF785A6aD702B1FAACcD5e4ccaaC",
  8453: "0x64FAF984Bf60dE19e24238521814cA98574E3b00"
};
export const allocatorContracts: ChainContracts = {
  84531: "0xF2fE2EF1865789E352D4140D98f99486e2e75E76",
  8453: "0x2e19f01b81628ccd8cfce9f7d9f2facc77343b7c"
};
export const launchpadPaymentTokens: PaymentTokens = {
  84531: [
    "0x4200000000000000000000000000000000000006",
    "0x6D0F8D488B669aa9BA2D0f0b7B75a88bf5051CD3",
    "0x290B54A504A3b0cB21888e3E405AFC1b2946598C",
    "0x2e9F75DF8839ff192Da27e977CD154FD1EAE03cf"
  ],
  8453: [
    "0x4200000000000000000000000000000000000006",
    "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "0x65a2508c429a6078a7bc2f7df81ab575bd9d9275",
    "0xb79dd08ea68a908a97220c76d19a6aa9cbde4376",
    "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    "0xeb466342c4d449bc9f53a865d5cb90586f405215"
  ]
};
export const exchangeRouterContracts: ChainContracts = {
  84531: "0xd6351CC74A04F9472dFBA0b5601d5Bb0d93F4E22",
  8453: "0x8160C59218be97F301a857cD8E72e5d3446621df"
};
export const WETH: ChainContracts = {
  84531: "0x4200000000000000000000000000000000000006",
  8453: "0x4200000000000000000000000000000000000006"
};

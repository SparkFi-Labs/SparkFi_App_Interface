enum VestingType {
  LINEAR = "LINEAR",
  CLIFF = "CLIFF"
}

interface LinearVesting {
  id: string;
  endTime: bigint;
}

interface CliffPeriod {
  id: string;
  claimTime: bigint;
  percentage: number;
}

interface Contribution {
  id: string;
  user: string;
  tokenSale: TokenSale;
  amount: bigint;
}

interface Token {
  id: string;
  name: string;
  decimals: bigint;
  symbol: string;
  totalSupply: bigint;
}

export interface TokenSale {
  presaleId: string;
  metadataURI: string;
  funder: string;
  salePrice: bigint;
  paymentToken: Token;
  saleToken: Token;
  startTime: bigint;
  endTime: bigint;
  minTotalPayment: bigint;
  maxTotalPayment: bigint;
  withdrawalDelay: number;
  blockNumber: bigint;
  blockTimestamp: bigint;
  transactionHash: string;
  vestingType: VestingType;
  linearVesting?: LinearVesting;
  cliffPeriod?: Array<CliffPeriod>;
  totalPaymentMade: bigint;
}

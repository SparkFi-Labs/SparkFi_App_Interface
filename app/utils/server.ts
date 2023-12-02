import { hexValue } from "@ethersproject/bytes";
import axios from "axios";
import bigInt from "big-integer";

const secret = process.env.NEXT_PUBLIC_SECRET as string;
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9700";
const baseClient = axios.create({
  baseURL
});

// Global variables for zk computations
const p = bigInt("0x2527"); // 9511 to base 16
const q = bigInt("0x13D"); // Prime factor of p - 1
// const t = bigInt("0xA"); // 10 to base 16
const g = bigInt[32]; // 7032 to base 16

export async function getZKChallenge() {
  return new Promise<{ result: string }>((resolve, reject) => {
    baseClient
      .get<{ result: string }>("/challenge")
      .then(({ data }) => resolve(data))
      .catch(reject);
  });
}

export async function getWhitelist(presaleId: string, zkchallenge: string) {
  const zkv = "0x".concat(bigInt.randBetween(bigInt.zero, q.minus(bigInt.one)).toString(16));
  const zky = "0x".concat(
    g
      .pow(q.minus(bigInt(secret)))
      .mod(p)
      .toString(16)
  );
  const headers = { zkv, zkchallenge, zky };
  return new Promise<{ result: string }>((resolve, reject) => {
    baseClient
      .get<{ result: string }>(`/get-whitelist/${presaleId}`, { headers })
      .then(({ data }) => resolve(data))
      .catch(reject);
  });
}

export async function saveWhitelist(presaleId: string, whitelist: string, zkchallenge: string) {
  const zkv = "0x".concat(bigInt.randBetween(bigInt.zero, q.minus(bigInt.one)).toString(16));
  const zky = "0x".concat(
    g
      .pow(q.minus(bigInt(secret)))
      .mod(p)
      .toString(16)
  );
  const headers = { zkv, zkchallenge, zky };
  return new Promise<{ result: string }>((resolve, reject) => {
    baseClient
      .post("/update-whitelist", { presaleId, whitelist }, { headers })
      .then(({ data }) => resolve(data))
      .catch(reject);
  });
}

export async function getTokenList(chainId: number) {
  return new Promise<{ result: any[] }>((resolve, reject) => {
    baseClient
      .get(`/tokenlist/${hexValue(chainId)}`)
      .then(({ data }) => resolve(data))
      .catch(reject);
  });
}

import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { split } from "lodash";

export function _composeMerkleTree(elements: string) {
  const splitElements = split(elements, ",");
  return new MerkleTree(splitElements, keccak256, { hashLeaves: true, sortPairs: true });
}

export function _getProofForElement(elements: string, element: string) {
  const mt = _composeMerkleTree(elements);
  return mt.getHexProof(keccak256(element));
}

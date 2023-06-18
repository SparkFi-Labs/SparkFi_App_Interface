import Card from "@/components/Card";
import { TokenSale } from "@/data/token-sale/types";

interface ISaleItemCardProps {
  data: TokenSale;
}

export default function SaleItemCard({ data }: ISaleItemCardProps) {
  return <Card></Card>;
}

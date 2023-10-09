import { Inter, Manuale, Monda } from "next/font/google";

export const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});
export const manuale = Manuale({ weight: ["300", "400", "500", "600", "700", "800"], subsets: ["latin"] });
export const monda = Monda({ weight: ["400", "700"], subsets: ["latin"] });

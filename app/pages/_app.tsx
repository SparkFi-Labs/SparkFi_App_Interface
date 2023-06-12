import Header from "@/ui/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/ui/Footer";

const AppContent = ({ children }: any) => {
  return (
    <div className="min-h-screen w-screen flex justify-start flex-col items-center bg-[#0c0e1e] overflow-hidden scroll-smooth gap-0 drawer">
      <Header />
      <div className="flex-1 overflow-auto">{children}</div>
      <Footer />
    </div>
  );
};

function App({ Component, pageProps }: AppProps) {
  return (
    <AppContent>
      <Component {...pageProps} />
    </AppContent>
  );
}

export default App;

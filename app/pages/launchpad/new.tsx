import { CheckButton, DateField, FileChooser, InputField } from "@/components/Input";
import { useTokenDetails, useTokensDetails } from "@/hooks/contracts";
import { Steps, Step } from "@/ui/Steps";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { launchpadPaymentTokens } from "@/assets/contracts";
import { map, toLower } from "lodash";
import { AiOutlineDisconnect } from "react-icons/ai";
import { CTAPurpleOutline } from "@/components/Button";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function NewLaunch() {
  const [activeStep, setActiveStep] = useState(0);

  const { chainId, isActive } = useWeb3React();
  const tokenAddresses = useMemo(() => launchpadPaymentTokens[chainId as number] || ([] as string[]), [chainId]);
  const paymentTokensDetails = useTokensDetails(tokenAddresses);

  const [saleTokenAddress, setSaleTokenAddress] = useState("");
  const saleTokenDetail = useTokenDetails(saleTokenAddress);
  const [selectedPaymentTokenAddress, setSelectedPaymentTokenAddress] = useState("");
  const selectedPaymentTokenDetail = useTokenDetails(selectedPaymentTokenAddress);

  useEffect(() => {
    if (tokenAddresses && tokenAddresses.length) setSelectedPaymentTokenAddress(toLower(tokenAddresses[0]));
  }, [tokenAddresses]);

  return (
    <div className="flex flex-col gap-24 justify-center items-center py-24 lg:px-24 px-3 w-screen">
      {isActive ? (
        <Fragment>
          <Steps activeStep={activeStep}>
            <Step title="token information" />
            <Step title="sale information" />
            <Step title="project information" />
            <Step title="finish" />
          </Steps>
          <div className="bg-[#101221] flex flex-col justify-start py-7 px-5 w-full items-center gap-9">
            {activeStep === 0 && (
              <div className="flex flex-col w-full lg:w-1/3 justify-start items-center gap-4">
                <div className="flex flex-col w-full justify-start items-start gap-3">
                  <span className="text-[#0029ff] capitalize text-[1rem] font-[600]">token address*</span>
                  <InputField
                    onTextChange={ev => setSaleTokenAddress(ev.target.value)}
                    type="text"
                    placeholder="Enter token contract address"
                    width="100%"
                    height="3.25rem"
                    value={saleTokenAddress}
                  />
                </div>
                <div className="flex flex-col w-full justify-start items-start gap-2">
                  <span className="text-[1rem] text-[#fff] font-[600] capitalize">token information</span>
                  <div className="flex flex-col bg-[#0c0e1e] border border-[#131735] rounded-[8px] w-full justify-start items-start gap-3 px-2 py-4 text-[#0029ff]">
                    <div className="flex justify-between items-center text-[0.98rem] w-full">
                      <span className="capitalize">name:</span>
                      <span className="capitalize">{saleTokenDetail ? saleTokenDetail.name : "-----"}</span>
                    </div>
                    <div className="flex justify-between items-center text-[0.98rem] w-full">
                      <span className="capitalize">symbol:</span>
                      <span className="capitalize">{saleTokenDetail ? saleTokenDetail.symbol : "-----"}</span>
                    </div>
                    <div className="flex justify-between items-center text-[0.98rem] w-full">
                      <span className="capitalize">decimals:</span>
                      <span className="capitalize">{saleTokenDetail ? saleTokenDetail.decimals : "-----"}</span>
                    </div>
                    <div className="flex justify-between items-center text-[0.98rem] w-full">
                      <span className="capitalize">total supply:</span>
                      <span className="capitalize">{saleTokenDetail ? saleTokenDetail.totalSupply : "-----"}</span>
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-col lg:flex-row gap-5 w-full justify-start lg:justify-between items-start lg:items-center">
                  
                </div> */}
              </div>
            )}
            {activeStep === 1 && (
              <div className="flex flex-col lg:flex-row w-full justify-start lg:justify-between items-start">
                <div className="flex flex-col justify-start items-start w-full lg:w-[48%] gap-4">
                  <div className="flex flex-col justify-start items-start w-full gap-3">
                    <span className="text-[1rem] text-[#fff] font-[600] capitalize">hard cap</span>
                    <InputField type="number" placeholder="Enter hard cap" width="100%" height="3.25rem" />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full gap-3">
                    <span className="text-[1rem] text-[#fff] font-[600] capitalize">soft cap</span>
                    <InputField type="number" placeholder="Enter soft cap" width="100%" height="3.25rem" />
                  </div>

                  <div className="flex flex-col justify-start items-start w-full gap-3">
                    <span className="text-[1rem] text-[#fff] font-[600] capitalize">presale admin</span>
                    <InputField type="text" placeholder="Enter presale admin address" width="100%" height="3.25rem" />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full gap-3">
                    <span className="text-[1rem] text-[#fff] font-[600] capitalize">receiver</span>
                    <InputField
                      type="text"
                      placeholder="Address of recipient of after-sale proceeds"
                      width="100%"
                      height="3.25rem"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-start items-start w-full lg:w-[48%] gap-4">
                  <div className="flex flex-col justify-start items-start w-full gap-3 relative">
                    <span className="text-[1rem] text-[#fff] font-[600] capitalize">sale start time</span>
                    <DateField width="100%" height={"3.25rem"} />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full gap-3 relative">
                    <span className="text-[1rem] text-[#fff] font-[600] capitalize">duration (in days)</span>
                    <InputField
                      type="number"
                      placeholder="How long should this sale last?"
                      width="100%"
                      height="3.25rem"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full gap-3">
                    <span className="text-[1rem] text-[#fff] font-[600] capitalize">funder</span>
                    <InputField
                      type="text"
                      placeholder="Which address can fund this presale?"
                      width="100%"
                      height="3.25rem"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full gap-3">
                    <span className="text-[1rem] text-[#fff] font-[600] capitalize">withdrawal delay (in seconds)</span>
                    <InputField
                      type="number"
                      placeholder="How long after sale can participants withdraw the tokens purchased?"
                      width="100%"
                      height="3.25rem"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full lg:w-1/2 gap-3">
                    <div className="flex flex-col justify-start items-start w-full gap-3">
                      <span className="text-[1rem] text-[#fff] font-[600] capitalize">payment token</span>
                      <div className="flex flex-col justify-start items-start gap-2">
                        {map(paymentTokensDetails, (detail, index) => (
                          <div key={index} className="flex justify-center items-center gap-2">
                            <CheckButton
                              checked={selectedPaymentTokenAddress === detail.address}
                              onCheckPressed={() => setSelectedPaymentTokenAddress(toLower(detail.address))}
                            />
                            <span className="text-[1rem] text-[#0029ff] font-[600] uppercase">{detail.symbol}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className="text-[0.78rem] text-[#fff] font-[600] capitalize">
                      users will deposit {selectedPaymentTokenDetail?.symbol} for your token
                    </span>
                  </div>
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <div className="w-full flex flex-col justify-start items-center gap-4">
                <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-3">
                  <div className="flex flex-col justify-start items-start gap-3">
                  <span className="text-[1rem] text-[#fff] font-[600] capitalize">upload logo</span>
                    <div className="w-40 h-40 lg:w-64 lg:h-64">
                    <FileChooser width="100%" height="100%" isfullyRounded />
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-3">
                  <span className="text-[1rem] text-[#fff] font-[600] capitalize">upload banner</span>
                    <div className="w-52 h-40 lg:w-80 lg:h-64">
                    <FileChooser width="100%" height="100%" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-3">
                  <span className="text-[1rem] text-[#fff] font-[600] capitalize">upload intro video</span>
                    <div className="w-52 h-40 lg:w-80 lg:h-64">
                    <FileChooser width="100%" height="100%" isMotionPicture />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={`w-full flex ${activeStep > 0 ? "justify-between" : "justify-end"} items-end`}>
              {activeStep > 0 && (
                <CTAPurpleOutline
                  onPress={() => setActiveStep(step => step - 1)}
                  width={100}
                  label={
                    <div className="flex justify-between items-center text-[#fff] w-full">
                      <BsArrowLeft />
                      <span className="capitalize font-[500]">back</span>
                    </div>
                  }
                />
              )}
              {activeStep < 3 && (
                <CTAPurpleOutline
                  onPress={() => setActiveStep(step => step + 1)}
                  width={100}
                  label={
                    <div className="flex justify-between items-center text-[#fff] w-full">
                      <span className="capitalize font-[500]">next</span>
                      <BsArrowRight />
                    </div>
                  }
                />
              )}
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="bg-[#0c0e1e] rounded-[10px] w-full flex justify-center items-center flex-col gap-7 py-32">
          <div className="w-[7rem] h-[7rem] px-3 py-3 rounded-full flex justify-center items-center bg-[#131735]">
            <AiOutlineDisconnect className="text-[#c1c9ff] text-[7rem]" />
          </div>
          <span className="text-[#fff] text-[0.9rem] lg:text-[0.9875rem] font-[600] text-center capitalize">
            please connect your wallet
          </span>
        </div>
      )}
    </div>
  );
}

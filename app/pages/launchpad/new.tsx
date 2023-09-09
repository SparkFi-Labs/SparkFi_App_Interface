import { CheckButton, DateField, FileChooser, InputField, JSONChooser, TextArea } from "@/components/Input";
import { useTokenDetails, useTokensDetails } from "@/hooks/contracts";
import { Steps, Step } from "@/ui/Steps";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { launchpadPaymentTokens } from "@/assets/contracts";
import { assign, floor, isNil, map, multiply, toLower } from "lodash";
import { AiOutlineDisconnect } from "react-icons/ai";
import { CTAPurple, CTAPurpleOutline } from "@/components/Button";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useIPFSUpload } from "@/hooks/ipfs";
import truncateEthAddress from "truncate-eth-address";
import { toast, ToastContainer } from "react-toastify";
import { usePresaleDeploymentInitializer } from "@/hooks/app/web3/launchpad";
import validateSchema from "@/utils/validateSchema";
import { saleIPFSMetadataSchema } from "@/schemas";
import Head from "next/head";
import { useRouter } from "next/router";
import Card from "@/components/Card";

export default function NewLaunch() {
  const [activeStep, setActiveStep] = useState(0);
  const { replace } = useRouter();

  const { chainId, isActive } = useWeb3React();
  const tokenAddresses = useMemo(() => launchpadPaymentTokens[chainId as number] || ([] as string[]), [chainId]);
  const paymentTokensDetails = useTokensDetails(tokenAddresses);

  const [saleTokenAddress, setSaleTokenAddress] = useState("");
  const saleTokenDetail = useTokenDetails(saleTokenAddress);
  const [selectedPaymentTokenAddress, setSelectedPaymentTokenAddress] = useState("");
  const selectedPaymentTokenDetail = useTokenDetails(selectedPaymentTokenAddress);

  const [projectMetadata, setProjectMetadata] = useState<{ [key: string]: any }>({});
  const [projectLogoFile, setProjectLogoFile] = useState<File | undefined>(undefined);
  const [tokenLogoFile, setTokenLogoFile] = useState<File | undefined>(undefined);

  const [hardcap, setHardcap] = useState<number | undefined>(0);
  const [softcap, setSoftcap] = useState<number | undefined>(0);
  const [presaleAdmin, setPresaleAdmin] = useState("");
  const [receiver, setReceiver] = useState("");
  const [saleStartTime, setSaleStartTime] = useState(0);
  const [saleDuration, setSaleDuration] = useState<number | undefined>(0);
  const [funder, setFunder] = useState("");
  const [withdrawalDelay, setWithdrawalDelay] = useState<number | undefined>(0);
  const [salePrice, setSalePrice] = useState<number | undefined>(0);

  const [presaleType, setPresaleType] = useState<0 | 1>(1);

  const projectLogoFileIPFSUploader = useIPFSUpload(projectLogoFile, process.env.NEXT_PUBLIC_IPFS_ENDPOINT, res =>
    setProjectMetadata(md => {
      let newMd = { ...md };

      newMd = assign(newMd, {
        projectLogoURI: (process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io") + "/ipfs/" + res.cid.toString()
      });
      return newMd;
    })
  );
  const tokenLogoFileIPFSUploader = useIPFSUpload(tokenLogoFile, process.env.NEXT_PUBLIC_IPFS_ENDPOINT, res =>
    setProjectMetadata(md => {
      let newMd = { ...md };
      newMd = assign(newMd, {
        tokenLogoURI: (process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io") + "/ipfs/" + res.cid.toString()
      });
      return newMd;
    })
  );
  const metadataIPFSUploader = useIPFSUpload(
    Buffer.from(JSON.stringify(projectMetadata)),
    process.env.NEXT_PUBLIC_IPFS_ENDPOINT
  );

  const presaleInitializer = usePresaleDeploymentInitializer(
    presaleAdmin,
    receiver,
    funder,
    salePrice || 0,
    selectedPaymentTokenAddress,
    saleTokenAddress,
    floor(saleStartTime / 1000),
    saleDuration || 0,
    softcap || 0,
    hardcap || 0,
    withdrawalDelay || 0,
    presaleType
  );

  const createPool = useCallback(async () => {
    try {
      console.log(projectMetadata);
      validateSchema(saleIPFSMetadataSchema, projectMetadata);

      const toastId = toast("Now uploading metadata to IPFS", { type: "info", autoClose: 15000 });
      const metadataUploadResult = await metadataIPFSUploader.executeUpload();

      toast.update(toastId, { render: "Successfully uploaded metadata to IPFS", type: "success", autoClose: 5000 });

      const toastId2 = toast("Now deploying pool to chain", { type: "info", autoClose: 15000 });
      const deploymentResult = await presaleInitializer.initiateDeployment(
        (process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io") + "/ipfs/" + metadataUploadResult.cid.toString()
      );

      console.log(deploymentResult);
      toast.update(toastId2, { render: "Successfully deployed", type: "success", autoClose: 5000 });
      await replace("/launchpad");
    } catch (error: any) {
      toast(error.error?.data?.message || error.message, { type: "error" });
    }
  }, [metadataIPFSUploader, presaleInitializer, projectMetadata, replace]);

  useEffect(() => {
    if (tokenAddresses && tokenAddresses.length) setSelectedPaymentTokenAddress(toLower(tokenAddresses[0]));
  }, [tokenAddresses]);

  return (
    <div className="flex flex-col gap-24 justify-center items-center py-24 lg:px-24 px-3 w-screen">
      <Head>
        <title>Launchpad | New</title>
      </Head>
      {isActive ? (
        <Fragment>
          <Steps activeStep={activeStep}>
            <Step title="token information" />
            <Step title="sale information" />
            <Step title="project information" />
            <Step title="finish" />
          </Steps>
          <div className="flex flex-col justify-start py-7 px-1 lg:px-5 w-full items-center gap-9 rounded-lg">
            <Card width="100%">
              <div className="card-body justify-start items-start lg:items-center py-7">
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
                          <span className="capitalize font-inter">name:</span>
                          <span className="capitalize font-inter">
                            {saleTokenDetail ? saleTokenDetail.name : "-----"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[0.98rem] w-full">
                          <span className="capitalize font-inter">symbol:</span>
                          <span className="capitalize font-inter">
                            {saleTokenDetail ? saleTokenDetail.symbol : "-----"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[0.98rem] w-full">
                          <span className="capitalize font-inter">decimals:</span>
                          <span className="capitalize font-inter">
                            {saleTokenDetail ? saleTokenDetail.decimals : "-----"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[0.98rem] w-full">
                          <span className="capitalize font-inter">total supply:</span>
                          <span className="capitalize font-inter">
                            {saleTokenDetail ? saleTokenDetail.totalSupply : "-----"}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <div className="flex flex-col lg:flex-row gap-5 w-full justify-start lg:justify-between items-start lg:items-center">
                  
                </div> */}
                  </div>
                )}
                {activeStep === 1 && (
                  <div className="flex flex-col justify-start items-start gap-9 w-full">
                    <div className="flex flex-col lg:flex-row w-full justify-start lg:justify-between items-start gap-7">
                      <div className="flex flex-col justify-start items-start w-full lg:w-[48%] gap-4">
                        <div className="flex flex-col justify-start items-start w-full gap-3">
                          <span className="text-[1rem] text-[#fff] font-[600] capitalize">maximum buy</span>
                          <InputField
                            value={hardcap}
                            onTextChange={ev => setHardcap(ev.target.valueAsNumber)}
                            type="number"
                            placeholder="Enter minimum buy"
                            width="100%"
                            height="3.25rem"
                          />
                        </div>
                        <div className="flex flex-col justify-start items-start w-full gap-3">
                          <span className="text-[1rem] text-[#fff] font-[600] capitalize">minimum buy</span>
                          <InputField
                            value={softcap}
                            onTextChange={ev => setSoftcap(ev.target.valueAsNumber)}
                            type="number"
                            placeholder="Enter minimum buy"
                            width="100%"
                            height="3.25rem"
                          />
                        </div>

                        <div className="flex flex-col justify-start items-start w-full gap-3">
                          <span className="text-[1rem] text-[#fff] font-[600] capitalize">presale admin</span>
                          <InputField
                            value={presaleAdmin}
                            onTextChange={ev => setPresaleAdmin(ev.target.value)}
                            type="text"
                            placeholder="Enter presale admin address"
                            width="100%"
                            height="3.25rem"
                          />
                        </div>
                        <div className="flex flex-col justify-start items-start w-full gap-3">
                          <span className="text-[1rem] text-[#fff] font-[600] capitalize">receiver</span>
                          <InputField
                            value={receiver}
                            onTextChange={ev => setReceiver(ev.target.value)}
                            type="text"
                            placeholder="Address of recipient of after-sale proceeds"
                            width="100%"
                            height="3.25rem"
                          />
                        </div>
                        <div className="flex flex-col justify-start items-start w-full gap-3">
                          <span className="text-[1rem] text-[#fff] font-[600] capitalize">sale type</span>
                          <div className="flex flex-col justify-start items-start gap-2">
                            <div className="flex justify-center items-center gap-2">
                              <CheckButton checked={presaleType === 0} onCheckPressed={() => setPresaleType(0)} />
                              <span className="text-[1rem] text-[#0029ff] font-[600] uppercase font-inter">
                                regular
                              </span>
                            </div>

                            <div className="flex justify-center items-center gap-2">
                              <CheckButton checked={presaleType === 1} onCheckPressed={() => setPresaleType(1)} />
                              <span className="text-[1rem] text-[#0029ff] font-[600] uppercase font-inter">
                                allocation
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start w-full gap-3">
                          <span className="text-[1rem] text-[#fff] font-[600] capitalize">soft cap</span>
                          <InputField
                            value={projectMetadata.softcap}
                            onTextChange={ev => setProjectMetadata(d => ({ ...d, softcap: ev.target.valueAsNumber }))}
                            type="number"
                            width="100%"
                            height="3.25rem"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col justify-start items-start w-full lg:w-[48%] gap-4">
                        <div className="flex flex-col justify-start items-start w-full gap-3 relative">
                          <span className="text-[1rem] text-[#fff] font-[600] capitalize">sale start time</span>
                          <DateField
                            date={saleStartTime}
                            onDateChanged={date => setSaleStartTime(date.getTime())}
                            width="100%"
                            height={"3.25rem"}
                          />
                        </div>
                        <div className="flex flex-col justify-start items-start w-full gap-3 relative">
                          <span className="text-[1rem] text-[#fff] font-[600] capitalize">duration (in days)</span>
                          <InputField
                            value={saleDuration}
                            onTextChange={ev => setSaleDuration(ev.target.valueAsNumber)}
                            type="number"
                            placeholder="How long should this sale last?"
                            width="100%"
                            height="3.25rem"
                          />
                        </div>
                        <div className="flex flex-col justify-start items-start w-full gap-3">
                          <span className="text-[1rem] text-[#fff] font-[600] capitalize">funder</span>
                          <InputField
                            value={funder}
                            onTextChange={ev => setFunder(ev.target.value)}
                            type="text"
                            placeholder="Which address can fund this presale?"
                            width="100%"
                            height="3.25rem"
                          />
                        </div>
                        <div className="flex flex-col justify-start items-start w-full gap-3">
                          <span className="text-[1rem] text-[#fff] font-[600] capitalize">
                            withdrawal delay (in seconds)
                          </span>
                          <InputField
                            value={withdrawalDelay}
                            onTextChange={ev => setWithdrawalDelay(ev.target.valueAsNumber)}
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
                                  <span className="text-[1rem] text-[#0029ff] font-[600] uppercase font-inter">
                                    {detail.symbol}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <span className="text-[0.78rem] text-[#fff] font-[600] capitalize font-inter">
                            users will deposit {selectedPaymentTokenDetail?.symbol} for your token
                          </span>
                          <InputField
                            value={salePrice}
                            onTextChange={ev => setSalePrice(ev.target.valueAsNumber)}
                            type="number"
                            placeholder={`How much ${
                              selectedPaymentTokenDetail?.symbol ?? "payment tokens"
                            } per token?`}
                            width="100%"
                            height="3.25rem"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeStep === 2 && (
                  <div className="w-full flex flex-col justify-start items-center gap-9">
                    <div className="flex flex-col justify-start items-start gap-4 w-full">
                      <span className="text-[#0029ff] capitalize text-[1rem] font-[600]">additional project info</span>
                      <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-center items-start lg:items-center gap-16">
                        <div className="flex flex-col justify-start items-start gap-3">
                          <span className="text-[1rem] text-[#fff] font-[600] capitalize">upload project logo</span>
                          <div className="w-40 h-40 lg:w-64 lg:h-64">
                            <FileChooser
                              onFilesSelected={files => setProjectLogoFile(files ? files[0] : undefined)}
                              width="100%"
                              height="100%"
                              isfullyRounded
                              onConfirmation={async () => {
                                try {
                                  await projectLogoFileIPFSUploader.executeUpload();
                                  toast("Successfully uploaded project logo", { type: "success" });
                                } catch (error: any) {
                                  toast(error.message, { type: "error" });
                                }
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-3">
                          <span className="text-[1rem] text-[#fff] font-[600] capitalize">upload token logo</span>
                          <div className="w-52 h-40 lg:w-80 lg:h-64">
                            <FileChooser
                              onFilesSelected={files => setTokenLogoFile(files ? files[0] : undefined)}
                              width="100%"
                              height="100%"
                              onConfirmation={async () => {
                                try {
                                  await tokenLogoFileIPFSUploader.executeUpload();
                                  toast("Successfully uploaded token logo", { type: "success" });
                                } catch (error: any) {
                                  toast(error.message, { type: "error" });
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start w-full">
                        <div className="flex flex-col justify-start items-start w-full lg:w-[48%]">
                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">project name</span>
                            <InputField
                              value={projectMetadata.name}
                              onTextChange={ev => setProjectMetadata(md => ({ ...md, name: ev.target.value }))}
                              type="text"
                              width="100%"
                              height="3.25rem"
                              placeholder="Ex: SparkFi"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start w-full lg:w-[48%]">
                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">genre</span>
                            <InputField
                              value={projectMetadata.genre}
                              onTextChange={ev => setProjectMetadata(md => ({ ...md, genre: ev.target.value }))}
                              type="text"
                              width="100%"
                              height="3.25rem"
                              placeholder="Ex: GameFi, Metaverse"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start w-full">
                        <div className="flex flex-col justify-start items-start w-full lg:w-[48%]">
                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">initial market cap.</span>
                            <InputField
                              value={projectMetadata.initialMarketCap}
                              onTextChange={ev =>
                                setProjectMetadata(md => ({ ...md, initialMarketCap: ev.target.value }))
                              }
                              type="text"
                              width="100%"
                              height="3.25rem"
                              placeholder="Ex: $1,000,000"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start w-full lg:w-[48%]">
                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">project valuation</span>
                            <InputField
                              value={projectMetadata.projectValuation}
                              onTextChange={ev =>
                                setProjectMetadata(md => ({ ...md, projectValuation: ev.target.value }))
                              }
                              type="text"
                              width="100%"
                              height="3.25rem"
                              placeholder="Ex: $1,000,000"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start w-full">
                        <div className="flex flex-col justify-start items-start w-full lg:w-[48%]">
                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">team</span>
                            <JSONChooser
                              width="100%"
                              height="3.25rem"
                              placeholder="Select JSON file"
                              onFilesSelected={files => {
                                if (!isNil(files)) {
                                  const file = files[0];
                                  const fileReader = new FileReader();

                                  fileReader.onload = ev => {
                                    const { result } = ev.target as FileReader;
                                    setProjectMetadata(metadata => ({
                                      ...metadata,
                                      team: JSON.parse(result as string)
                                    }));
                                  };

                                  fileReader.readAsText(file, "UTF-8");
                                }
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start w-full lg:w-[48%]">
                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">tokenomics</span>
                            <JSONChooser
                              width="100%"
                              height="3.25rem"
                              placeholder="Select JSON file"
                              onFilesSelected={files => {
                                if (!isNil(files)) {
                                  const file = files[0];
                                  const fileReader = new FileReader();

                                  fileReader.onload = ev => {
                                    const { result } = ev.target as FileReader;
                                    setProjectMetadata(metadata => ({
                                      ...metadata,
                                      tokenomics: JSON.parse(result as string)
                                    }));
                                  };

                                  fileReader.readAsText(file, "UTF-8");
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-start items-start w-full gap-3">
                        <span className="text-[1rem] text-[#fff] font-[600] capitalize">roadmap (HTML allowed)</span>
                        <TextArea
                          width="100%"
                          height={300}
                          placeholder="Roadmap (HTML allowed)"
                          onTextChange={ev => setProjectMetadata(md => ({ ...md, roadmap: ev.target.value }))}
                          value={projectMetadata.roadmap}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-4 w-full">
                      <span className="text-[#0029ff] capitalize text-[1rem] font-[600]">links</span>
                      <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start w-full">
                        <div className="flex flex-col justify-start items-start w-full lg:w-[48%] gap-4">
                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">twitter</span>
                            <InputField
                              type="text"
                              placeholder="Ex: https://twitter.com/kingsley-victor"
                              width="100%"
                              height="3.25rem"
                              value={projectMetadata.links?.twitter}
                              onTextChange={ev =>
                                setProjectMetadata(md => ({
                                  ...md,
                                  links: { ...(md.links || {}), twitter: ev.target.value }
                                }))
                              }
                            />
                          </div>

                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">discord</span>
                            <InputField
                              type="text"
                              placeholder="Ex: https://discord.gg/server"
                              width="100%"
                              height="3.25rem"
                              value={projectMetadata.links?.discord}
                              onTextChange={ev =>
                                setProjectMetadata(md => ({
                                  ...md,
                                  links: { ...(md.links || {}), discord: ev.target.value }
                                }))
                              }
                            />
                          </div>

                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">github</span>
                            <InputField
                              type="text"
                              placeholder="Ex: https://github.com/organization"
                              width="100%"
                              height="3.25rem"
                              value={projectMetadata.links?.github}
                              onTextChange={ev =>
                                setProjectMetadata(md => ({
                                  ...md,
                                  links: { ...(md.links || {}), github: ev.target.value }
                                }))
                              }
                            />
                          </div>

                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">telegram</span>
                            <InputField
                              type="text"
                              placeholder="Ex: https://t.me/profile"
                              width="100%"
                              height="3.25rem"
                              value={projectMetadata.links?.telegram}
                              onTextChange={ev =>
                                setProjectMetadata(md => ({
                                  ...md,
                                  links: { ...(md.links || {}), telegram: ev.target.value }
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div className="flex flex-col justify-start items-start w-full lg:w-[48%] gap-4">
                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">medium</span>
                            <InputField
                              type="text"
                              placeholder="Ex: https://medium.com/kingsley-victor"
                              width="100%"
                              height="3.25rem"
                              value={projectMetadata.links?.medium}
                              onTextChange={ev =>
                                setProjectMetadata(md => ({
                                  ...md,
                                  links: { ...(md.links || {}), medium: ev.target.value }
                                }))
                              }
                            />
                          </div>

                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">gitbook</span>
                            <InputField
                              type="text"
                              placeholder="Ex: https://app.gitbook.io"
                              width="100%"
                              height="3.25rem"
                              value={projectMetadata.links?.gitbook}
                              onTextChange={ev =>
                                setProjectMetadata(md => ({
                                  ...md,
                                  links: { ...(md.links || {}), gitbook: ev.target.value }
                                }))
                              }
                            />
                          </div>

                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">linkedin</span>
                            <InputField
                              type="text"
                              placeholder="Ex: https://linkedin.com/in/profile"
                              width="100%"
                              height="3.25rem"
                              value={projectMetadata.links?.linkedin}
                              onTextChange={ev =>
                                setProjectMetadata(md => ({
                                  ...md,
                                  links: { ...(md.links || {}), linkedin: ev.target.value }
                                }))
                              }
                            />
                          </div>

                          <div className="flex flex-col justify-start items-start w-full gap-3">
                            <span className="text-[1rem] text-[#fff] font-[600] capitalize">website</span>
                            <InputField
                              type="text"
                              placeholder="Ex: https://google.com"
                              width="100%"
                              height="3.25rem"
                              value={projectMetadata.links?.website}
                              onTextChange={ev =>
                                setProjectMetadata(md => ({
                                  ...md,
                                  links: { ...(md.links || {}), website: ev.target.value }
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-start items-start w-full gap-3">
                        <span className="text-[1rem] text-[#fff] font-[600] capitalize">
                          project description (HTML allowed)
                        </span>
                        <TextArea
                          width="100%"
                          height={400}
                          placeholder="Ex: Introducing SparkFi: A new generation incubation hub."
                          onTextChange={ev => setProjectMetadata(md => ({ ...md, description: ev.target.value }))}
                          value={projectMetadata.description}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {activeStep === 3 && (
                  <div className="flex flex-col justify-start items-start w-full gap-4">
                    <span className="text-[#0029ff] capitalize text-[1rem] font-[600]">review info</span>
                    <div className="flex flex-col justify-start items-start w-full gap-2">
                      <div className="flex justify-between items-center gap-3 w-full border-b border-[#131735] px-1 py-2">
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize">project name:</span>
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize font-inter">
                          {projectMetadata.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-3 w-full border-b border-[#131735] px-1 py-2">
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize">project genre:</span>
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize font-inter">
                          {projectMetadata.genre}
                        </span>
                      </div>

                      <div className="flex justify-between items-center gap-3 w-full border-b border-[#131735] px-1 py-2">
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize">project valuation:</span>
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize font-inter">
                          {projectMetadata.projectValuation}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-3 w-full border-b border-[#131735] px-1 py-2">
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize">initial market cap:</span>
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize font-inter">
                          {projectMetadata.initialMarketCap}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-3 w-full border-b border-[#131735] px-1 py-2">
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize">website:</span>
                        <span className="text-[0.89rem] text-[#fff] font-[600] font-inter">
                          {projectMetadata.links?.website}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-3 w-full border-b border-[#131735] px-1 py-2">
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize">
                          maximum buy per wallet:
                        </span>
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize font-inter">
                          {hardcap} {selectedPaymentTokenDetail?.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-3 w-full border-b border-[#131735] px-1 py-2">
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize">
                          minimum buy per wallet:
                        </span>
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize font-inter">
                          {softcap} {selectedPaymentTokenDetail?.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-3 w-full border-b border-[#131735] px-1 py-2">
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize">price:</span>
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize font-inter">
                          {salePrice} {selectedPaymentTokenDetail?.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-3 w-full border-b border-[#131735] px-1 py-2">
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize">start date:</span>
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize font-inter">
                          {new Date(saleStartTime).toUTCString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-3 w-full border-b border-[#131735] px-1 py-2">
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize">end date:</span>
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize font-inter">
                          {new Date(saleStartTime + multiply(saleDuration || 0, 86400000)).toUTCString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-3 w-full border-b border-[#131735] px-1 py-2">
                        <span className="text-[0.89rem] text-[#fff] font-[600] capitalize">token address:</span>
                        <span className="text-[0.89rem] text-[#0029ff] font-[600] capitalize font-inter">
                          {truncateEthAddress(saleTokenAddress)}
                        </span>
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
                  {activeStep === 3 && (
                    <CTAPurple
                      onPress={createPool}
                      width={120}
                      disabled={metadataIPFSUploader.isLoading || presaleInitializer.isLoading}
                      label={
                        <div className="flex justify-between items-center text-[#fff] w-full">
                          <span className="capitalize font-[500]">create pool</span>
                          {metadataIPFSUploader.isLoading || presaleInitializer.isLoading ? (
                            <span className="loading loading-infinity loading-md text-accent"></span>
                          ) : (
                            <BsArrowRight />
                          )}
                        </div>
                      }
                    />
                  )}
                </div>
              </div>
            </Card>
          </div>
          <ToastContainer position="top-right" autoClose={5000} theme="dark" pauseOnFocusLoss />
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

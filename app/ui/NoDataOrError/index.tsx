import { BsEmojiNeutral } from "react-icons/bs";

interface NoDataOrErrorProps {
  message: string;
}

export default function NoDataOrError({ message }: NoDataOrErrorProps) {
  return (
    <div className="bg-[#0c0e1e] rounded-[10px] w-full flex justify-center items-center flex-col gap-7 py-32">
      <div className="w-[4rem] h-[4rem] px-3 py-3 rounded-full flex justify-center items-center bg-[#131735]">
        <BsEmojiNeutral className="text-[#c1c9ff] text-[4rem]" />
      </div>
      <span className="text-[#fff] text-[0.9rem] lg:text-[0.9875rem] font-[600] text-center">{message}</span>
    </div>
  );
}

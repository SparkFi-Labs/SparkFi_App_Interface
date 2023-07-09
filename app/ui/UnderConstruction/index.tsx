import { MdOutlineConstruction } from "react-icons/md";

export default function UnderConstruction() {
  return (
    <div className="bg-[#0c0e1e] rounded-[10px] w-full flex justify-center items-center flex-col gap-7 py-32">
      <div className="w-[12rem] h-[12rem] px-3 py-3 rounded-full flex justify-center items-center bg-[#131735]">
        <MdOutlineConstruction className="text-[#c1c9ff] text-[10rem]" />
      </div>
      <span className="text-[#fff] text-[1rem] lg:text-[2rem] font-[600] text-center capitalize">coming soon</span>
    </div>
  );
}

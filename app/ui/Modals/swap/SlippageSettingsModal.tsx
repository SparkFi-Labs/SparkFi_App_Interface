/* eslint-disable react/display-name */
import { RootState } from "@/store";
import { updateSlippage } from "@/store/slices/swapSettingsSlice";
import { map } from "lodash";
import { forwardRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const CONSTANT_SLIPPAGES = [0.1, 0.5, 1];

const SlippageSettingsModal = forwardRef<HTMLInputElement>(({}, ref) => {
  const modalId = useMemo(() => "slippage-modal-" + Date.now() + "-" + Math.floor(Math.random() * Date.now()), []);
  const { slippage } = useSelector((state: RootState) => state.swap);
  const dispatch = useDispatch();
  return (
    <>
      <input type="checkbox" className="modal-toggle" id={modalId} ref={ref} />
      <div className="modal" role="dialog">
        <div className="bg-[#0c0e1c] rounded-[3.679px] modal-box flex flex-col justify-start items-center gap-2 z-20 border border-[#292d32]">
          <div className="flex justify-between items-center gap-3 w-full px-1">
            <span className="capitalize font-inter font-[400] text-sm md:text-lg text-[#fff]">slippage</span>
            <span className="capitalize font-inter font-[400] text-sm md:text-lg text-[#fff]">{slippage}%</span>
          </div>
          <div className="border border-[#292d32] flex justify-evenly items-center gap-2 px-2 py-2 rounded-md w-full">
            {map(CONSTANT_SLIPPAGES, (sl, index) => (
              <button
                onClick={() => dispatch(updateSlippage(sl))}
                key={index * sl}
                className={`${
                  sl === slippage ? "bg-[#0061f3] text-[#0c0e1c]" : "border border-[#292d32] text-[#fff]"
                } font-inter font-[400] rounded-md py-1 px-3 flex justify-center items-center w-1/3`}
              >
                {sl}%
              </button>
            ))}
            <input
              type="number"
              onChange={e => dispatch(updateSlippage(parseFloat(e.target.value || "0.1")))}
              className="w-1/3 font-inter font-[400] rounded-md py-1 px-3 border border-[#292d32] text-[#fff] outline-0 bg-transparent"
              placeholder="%"
            />
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={modalId}>
          x
        </label>
      </div>
    </>
  );
});

export default SlippageSettingsModal;

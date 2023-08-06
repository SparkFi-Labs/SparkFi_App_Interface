import { forEach } from "lodash";
import { Children, ReactElement, useEffect, useMemo, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface IAccordionItemProps {
  children: any;
  title: string;
}

export const AccordionItem = ({ children, title }: IAccordionItemProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col justify-start items-center gap-4 w-full">
      <div className="flex justify-between items-start w-full px-2 py-2">
        <span className="text-[#fff] font-[400] text-[1em] leading-5 font-inter">{title}</span>
        <button
          onClick={() => setOpen(o => !o)}
          className="bg-[#0c0e1e] border-[0.75px] border-[#c1c9ff] px-2 py-2 flex justify-center items-center text-[1em] font-[500] text-[#fff]"
        >
          {open ? <FiMinus /> : <FiPlus />}
        </button>
      </div>
      {open && <div className="w-full bg-[#0c0e1e]/70 rounded-md py-3 px-3">{children}</div>}
    </div>
  );
};

export const Accordion = ({ children }: any) => {
  const accordionChildren = useMemo(() => Children.toArray(children), [children]);

  useEffect(() => {
    forEach(accordionChildren, (elem, index) => {
      if ((elem as ReactElement<any>).type !== AccordionItem)
        throw new Error(`Only children of type 'AccordionItem' are allowed. Child at ${index} is not allowed`);
    });
  }, [accordionChildren]);

  return <div className="w-full flex flex-col justify-start items-center gap-7">{accordionChildren}</div>;
};

import { forEach, map } from "lodash";
import { Children, MouseEventHandler, ReactElement, ReactNode, cloneElement, useEffect } from "react";

interface TabProps {
  isActive?: boolean;
  label: ReactNode;
  onTabSelected?: MouseEventHandler<HTMLButtonElement>;
}

export const Tab = ({ isActive, label, onTabSelected }: TabProps) => (
  <button
    onClick={onTabSelected}
    className={`btn btn-ghost no-animation lg:btn-wide text-[0.82em] lg:text-[1em] btn-lg capitalize px-3 py-2 flex justify-center items-end rounded-none ${
      isActive ? "text-[#ffe603] border-b-[0.25rem] border-b-[#878aa1] font-[#600]" : "text-[#878aa1] font-[#500]"
    }`}
  >
    {label}
  </button>
);

type TabsProps = {
  activeTab?: number;
  children: ReactNode;
};

export const Tabs = ({ activeTab, children }: TabsProps) => {
  const childrenArray = Children.toArray(children);

  useEffect(() => {
    forEach(childrenArray, (elem, index) => {
      if ((elem as ReactElement<any>).type !== Tab)
        throw new Error(`Invalid child. Only child of type 'Tab' is allowed. Element at index ${index}`);
    });
  }, [childrenArray]);

  return (
    <div className="flex justify-between items-center gap-4 w-full">
      {map(childrenArray, (elem, index) => (
        <div key={index}>
          {cloneElement(elem as ReactElement, {
            isActive: index === activeTab
          })}
        </div>
      ))}
    </div>
  );
};

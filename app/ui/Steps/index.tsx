import { forEach, map } from "lodash";
import { Children, ReactElement, cloneElement, useEffect } from "react";

type StepProps = {
  isActive?: boolean;
  label?: string;
  title?: string;
};

export const Step = ({ isActive, label }: StepProps) => (
  <div
    className={`flex justify-center items-center lg:h-12 h-8 lg:w-12 w-8 rounded-full px-2 py-2 text-[0.5em] lg:text-[0.92em] ${
      isActive ? "bg-[#0029ff]" : "bg-[#393c54]"
    } font-[500]`}
  >
    {label}
  </div>
);

type StepsProps = {
  activeStep?: number;
  children: any;
};

export const Steps = ({ activeStep = 0, children }: StepsProps) => {
  const childrenArray = Children.toArray(children);

  useEffect(() => {
    forEach(childrenArray, (elem, index) => {
      if ((elem as ReactElement<any>).type !== Step)
        throw new Error(`Invalid child. Only child of type 'Step' is allowed. Element at index ${index}`);
    });
  }, [childrenArray]);

  return (
    <div className="flex justify-between items-center gap-4 w-full">
      {map(childrenArray, (elem, index) => (
        <div
          className={`flex justify-center items-center gap-2 ${index < childrenArray.length - 1 ? "flex-1" : ""}`}
          key={index}
        >
          <div className="flex justify-start items-center gap-2 w-full">
            {cloneElement(elem as ReactElement, {
              isActive: index === activeStep,
              label: (elem as ReactElement<any>).props.label || `${index + 1}`
            })}
            {(elem as ReactElement<any>).props.title && (
              <div className="flex justify-center items-center w-1/3">
                <span className="font-[500] text-[0.5em] lg:text-[0.9em] capitalize text-[#fff]">
                  {(elem as ReactElement<any>).props.title}
                </span>
              </div>
            )}
            {index < childrenArray.length - 1 && (
              <div className="border-b border-[#c1c9ff] bg-transparent flex-1 w-1/3"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

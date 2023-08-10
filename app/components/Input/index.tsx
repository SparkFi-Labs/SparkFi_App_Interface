import {
  InputHTMLAttributes,
  ChangeEventHandler,
  MouseEventHandler,
  HTMLAttributes,
  useState,
  Fragment,
  useRef,
  useCallback,
  ChangeEvent,
  useEffect,
  DragEvent,
  TextareaHTMLAttributes
} from "react";
import { FiCalendar, FiCheck, FiX } from "react-icons/fi";
import Calendar from "../Calendar";
import { isNil, isNull, startsWith } from "lodash";
import { FaImage, FaPlay } from "react-icons/fa";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onTextChange?: ChangeEventHandler<HTMLInputElement>;
  width?: number | string;
  height?: number | string;
}

interface CheckButtonProps {
  checked?: boolean;
  onCheckPressed?: MouseEventHandler<HTMLButtonElement>;
}

interface DateFieldProps extends HTMLAttributes<HTMLDivElement> {
  onDateChanged?: (date: Date) => any;
  width?: number | string;
  height?: number | string;
  date?: Date | number | string;
}

interface FilePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "accept"> {
  onFilesSelected?: (files: FileList | null) => any;
  width?: number | string;
  height?: number | string;
  isfullyRounded?: boolean;
  isMotionPicture?: boolean;
  onConfirmation?: MouseEventHandler<HTMLButtonElement>;
}

interface JSONPickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "accept"> {
  onFilesSelected?: (files: FileList | null) => any;
  width?: number | string;
  height?: number | string;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onTextChange?: ChangeEventHandler<HTMLTextAreaElement>;
  width?: number | string;
  height?: number | string;
}

export const InputField = ({ onTextChange, width, height, type, ...props }: InputFieldProps) => (
  <div className="bg-[#0f1122] rounded-[8px] flex justify-start items-center gap-1 px-2 py-2" style={{ width, height }}>
    <input
      onChange={onTextChange}
      className="w-full border-0 outline-0 bg-transparent text-left px-1 py-1 text-[#4d4f5c] font-inter text-[0.82em]"
      type={type}
      {...props}
    />
  </div>
);

export const TextArea = ({ onTextChange, width, height, ...props }: TextAreaProps) => (
  <div
    className="bg-[#0c0e1e] border border-[#131735] rounded-[8px] flex justify-start items-center gap-1 px-2 py-2"
    style={{ width, height }}
  >
    <textarea
      onChange={onTextChange}
      className="w-full border-0 outline-0 bg-transparent text-left px-1 py-1 text-[#4d4f5c] text-[0.82em] h-full font-inter"
      {...props}
    ></textarea>
  </div>
);

export const CheckButton = ({ checked, onCheckPressed }: CheckButtonProps) => (
  <button
    onClick={onCheckPressed}
    className="border border-[#0029ff] w-5 h-5 rounded-full bg-[#0f1122] flex justify-center items-center py-[0.1rem] px-[0.1rem]"
  >
    {checked && <span className="w-3 h-3 rounded-full bg-[#0029ff]"></span>}
  </button>
);

export const DateField = ({ onDateChanged, width, height, date: dateExternal, ...props }: DateFieldProps) => {
  const [dateValue, setDateValue] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (dateExternal) {
      let d: Date;
      if (typeof dateExternal === "string" || typeof dateExternal === "number") d = new Date(dateExternal);
      else d = dateExternal;

      setDateValue(d);
    }
  }, [dateExternal]);

  return (
    <div
      className="bg-[#0c0e1e] border border-[#131735] rounded-[8px] flex justify-start items-center gap-1 px-2 py-2 relative"
      style={{ width, height }}
      {...props}
    >
      <input
        type="text"
        className="w-full border-0 outline-0 bg-transparent text-left px-1 py-1 text-[#4d4f5c] text-[0.82em] font-inter"
        placeholder="YYYY-MM-DD HH:MM:SS"
        disabled
        value={`${dateValue.getFullYear()}-${
          dateValue.getMonth() + 1
        }-${dateValue.getDate()} ${dateValue.getHours()}:${dateValue.getMinutes()}:${dateValue.getSeconds()}`}
      />
      <button
        onClick={() => setShowCalendar(show => !show)}
        className="btn btn-ghost btn-square btn-sm flex justify-center items-center"
      >
        <FiCalendar />
      </button>
      {showCalendar && (
        <Calendar
          date={dateValue}
          onDateChange={date => {
            if (onDateChanged) onDateChanged(date);
            setShowCalendar(false);
            setDateValue(date);
          }}
        />
      )}
    </div>
  );
};

export const JSONChooser = ({ onFilesSelected, width, height, ...props }: JSONPickerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleFileInputChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      try {
        if (!isNil(ev.target.files)) {
          const file = ev.target.files[0];
          if (!file.type.match(/(application\/json)/)) return;

          setSelectedFile(file);
          if (onFilesSelected) onFilesSelected(ev.target.files);
        }
      } catch (error: any) {
        console.debug(error);
      }
    },
    [onFilesSelected]
  );

  return (
    <Fragment>
      <InputField
        onClick={() => {
          if (fileInputRef.current) fileInputRef.current.click();
        }}
        width={width}
        height={height}
        value={!isNil(selectedFile) ? selectedFile.name : ""}
        {...props}
      />
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="application/json"
        onChange={handleFileInputChange}
        {...props}
      />
    </Fragment>
  );
};

export const FileChooser = ({
  onFilesSelected,
  width,
  height,
  isfullyRounded,
  isMotionPicture,
  onConfirmation,
  ...props
}: FilePickerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleFileInputChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      try {
        if (!isNull(ev.target.files)) {
          const file = ev.target.files[0];
          if (
            !file.type.match(
              /((image\/(jpeg|gif|jpg|png|svg|webp))|(video\/(wav|webm|mkv|flv|gif|wmv|mp4|mpg|mpeg|3gp|3gep)))/
            )
          )
            return;

          setSelectedFile(file);
          setIsConfirmed(false);
          if (onFilesSelected) onFilesSelected(ev.target.files);
        }
      } catch (error: any) {
        console.debug(error);
      }
    },
    [onFilesSelected]
  );

  const handleDragOverEvent = useCallback((ev: DragEvent<HTMLDivElement>) => {
    try {
      ev.preventDefault();
      ev.stopPropagation();
      if (!isNull(ev.dataTransfer)) ev.dataTransfer.dropEffect = "copy";
    } catch (error: any) {
      console.debug(error);
    }
  }, []);

  const handleDropEvent = useCallback(
    (ev: DragEvent<HTMLDivElement>) => {
      try {
        ev.preventDefault();
        ev.stopPropagation();

        if (!isNull(ev.dataTransfer)) {
          const file = ev.dataTransfer.files[0];
          if (
            !file.type.match(/((image\/(jpeg|gif|jpg|png|svg|webp))|(video\/(wav|webm|mkv|flv|gif|wmv|mp4|mpg|mpeg)))/)
          )
            return;

          setSelectedFile(file);
          setIsConfirmed(false);
          if (onFilesSelected) onFilesSelected(ev.dataTransfer.files);
        }
      } catch (error: any) {}
    },
    [onFilesSelected]
  );

  useEffect(() => {
    let fileReader: FileReader;
    let isCancelled: boolean = false;

    if (selectedFile) {
      fileReader = new FileReader();
      fileReader.onload = ev => {
        const { result } = ev.target as FileReader;
        if (result && !isCancelled) setFileDataURL(result);
      };
      fileReader.readAsDataURL(selectedFile);
    }
    return () => {
      isCancelled = true;
      if (fileReader && fileReader.readyState === 1) fileReader.abort();
    };
  }, [selectedFile]);

  return (
    <Fragment>
      <div
        onDragOver={handleDragOverEvent}
        onDrop={handleDropEvent}
        className={`${
          isfullyRounded ? "rounded-full" : "rounded-[8px]"
        } flex justify-center items-center bg-[#0c0e1e] border border-[#131735] cursor-pointer`}
        style={{ width, height }}
      >
        {isNil(selectedFile) || isNil(selectedFile) ? (
          <div
            onClick={() => {
              if (fileInputRef.current) fileInputRef.current.click();
            }}
            className="flex justify-center items-center w-full h-full rounded-[inherit] text-[2rem] text-[#0029ff] px-10 py-10"
          >
            {isMotionPicture ? <FaPlay /> : <FaImage />}
          </div>
        ) : (
          <div className="flex justify-center items-center relative w-full h-full rounded-[inherit]">
            {isMotionPicture || startsWith(selectedFile.type, "video") ? (
              <video controls className="w-full min-h-full bg-cover rounded-[inherit]">
                <source src={fileDataURL as string} />
              </video>
            ) : (
              <img src={fileDataURL as string} className="w-full h-full rounded-[inherit]" alt={selectedFile.name} />
            )}
            {!isConfirmed && (
              <button
                onClick={ev => {
                  if (onConfirmation) onConfirmation(ev);

                  setIsConfirmed(true);
                }}
                className="absolute -top-2 -left-2 btn btn-circle btn-success text-[#fff] text-[1em] btn-sm flex justify-center items-center"
              >
                <FiCheck />
              </button>
            )}
            <button
              onClick={() => {
                setSelectedFile(undefined);
                setFileDataURL(null);

                if (fileInputRef.current) fileInputRef.current.value = "";
                if (onFilesSelected) onFilesSelected(null);
              }}
              className="absolute -top-2 -right-2 btn btn-circle btn-neutral text-[#fff] text-[1em] btn-sm flex justify-center items-center"
            >
              <FiX />
            </button>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={isMotionPicture ? "video/*" : "image/*"}
        onChange={handleFileInputChange}
        {...props}
      />
    </Fragment>
  );
};

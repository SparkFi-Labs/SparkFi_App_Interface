interface IProgressProps {
  progress: number;
}

export default function Progress({ progress }: IProgressProps) {
  return (
    <div className="w-full rounded-2xl h-3 bg-[#fff]">
      <div
        className="h-full bg-[linear-gradient(90deg,_#0019FF_0%,_#00FFC2_100%)] rounded-[inherit] ease-linear transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

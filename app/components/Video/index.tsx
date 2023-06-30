import { VideoHTMLAttributes, useEffect, useRef, useState } from "react";
import { FiFastForward, FiPause, FiPlay, FiRewind } from "react-icons/fi";

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  width?: number | string;
  height?: number | string;
}

export default function Video({ width, height, children, ...props }: VideoProps) {
  const videoElement = useRef<HTMLVideoElement>(null);
  const [progressvalue, setProgressValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoElement.current) videoElement.current.pause();
  }, []);

  return (
    <figure className="flex flex-col justify-start items-start rounded-[inherit]" style={{ width, height }}>
      <div className="w-full relative flex justify-center items-center rounded-[inherit]">
        <video
          {...props}
          style={{ objectFit: "cover" }}
          onClick={() => {
            if (videoElement.current) videoElement.current.pause();
          }}
          onTimeUpdate={() => {
            if (videoElement.current)
              setProgressValue((videoElement.current.currentTime / videoElement.current.duration) * 100);
          }}
          ref={videoElement}
          width="100%"
          height="100%"
          preload="auto"
          onEnded={() => setIsPlaying(false)}
        >
          {children}
        </video>
        {(!isPlaying || videoElement.current?.paused) && (
          <button
            onClick={async () => {
              if (videoElement.current) {
                await videoElement.current.play();
                setIsPlaying(true);
              }
            }}
            className="absolute btn btn-ghost btn-circle bg-[#040511] btn-lg flex justify-center items-center text-center px-2 py-2 text-[1.9em] text-[#fff]"
          >
            <FiPlay />
          </button>
        )}
      </div>
      <div className="w-full flex justify-start items-center px-2 py-2 bg-[#000] gap-7">
        <div className="flex justify-center items-center gap-2">
          {videoElement.current?.paused || videoElement.current?.ended || !isPlaying ? (
            <button
              onClick={async () => {
                if (videoElement.current) {
                  await videoElement.current.play();
                  setIsPlaying(true);
                }
              }}
              className="px-1 py-1 btn btn-ghost btn-sm btn-neutral text-[#fff] text-[1em] btn-circle flex justify-center items-center"
            >
              <FiPlay />
            </button>
          ) : (
            <button
              onClick={() => {
                if (videoElement.current) {
                  videoElement.current.pause();
                  setIsPlaying(false);
                }
              }}
              className="px-1 py-1 btn btn-ghost btn-sm btn-neutral text-[#fff] text-[1em] btn-circle flex justify-center items-center"
            >
              <FiPause />
            </button>
          )}
          {progressvalue > 0 && (
            <button
              onClick={() => {
                if (videoElement.current)
                  videoElement.current.currentTime =
                    videoElement.current.currentTime - 0.2 * videoElement.current.currentTime;
              }}
              className="px-1 py-1 btn btn-ghost btn-sm btn-neutral text-[#fff] text-[1em] btn-circle flex justify-center items-center"
            >
              <FiRewind />
            </button>
          )}
          {progressvalue < 100 && (
            <button
              onClick={() => {
                if (videoElement.current)
                  videoElement.current.currentTime =
                    videoElement.current.currentTime +
                    (videoElement.current.currentTime -
                      (videoElement.current.currentTime / videoElement.current.duration) *
                        videoElement.current.currentTime);
              }}
              className="px-1 py-1 btn btn-ghost btn-sm btn-neutral text-[#fff] text-[1em] btn-circle flex justify-center items-center"
            >
              <FiFastForward />
            </button>
          )}
        </div>
        <input
          type="range"
          value={progressvalue}
          min={0}
          max={100}
          className="bg-[#ccc] h-1 rounded-[16px] w-full cursor-pointer"
          onChange={e => {
            if (videoElement.current)
              videoElement.current.currentTime =
                (e.target.valueAsNumber / 100) *
                (!isNaN(videoElement.current.duration) && videoElement.current.duration !== Infinity
                  ? videoElement.current.duration
                  : 1);
          }}
        />
      </div>
    </figure>
  );
}

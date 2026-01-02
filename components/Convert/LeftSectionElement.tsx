import Image from "next/image";

type LeftSectionElementProps = {
  text: string;
  onClick?: () => void;
  src: string;
  isActive?: boolean;
};

export default function LeftSectionElement({
  text,
  onClick,
  src,
  isActive = false,
}: LeftSectionElementProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between w-full p-2 rounded-md transition-colors
        ${isActive ? "bg-[#E6E6ED]" : "hover:bg-[#E6E6ED]"}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          <Image
            src={src}
            alt={text}
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="text-base font-medium text-gray-700">{text}</span>
        </div>
        <Image
          src="/arrow.png"
          alt="Arrow icon"
          width={9}
          height={4.5}
          className="object-contain ml-2"
        />
      </div>
    </button>
  );
}

interface ArrowIconProps {
  direction?: "down-right" | "left" | "right" | "up-right";
  className?: string;
}

const paths = {
  "down-right": "M4.5 4.5 11.5 11.5M5 11.5h6.5V5",
  left: "M12.5 8h-9m4 4-4-4 4-4",
  right: "M3.5 8h9m-4-4 4 4-4 4",
  "up-right": "M4.5 11.5 11.5 4.5M5 4.5h6.5V11",
};

export default function ArrowIcon({
  direction = "up-right",
  className = "size-3.5 shrink-0",
}: ArrowIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d={paths[direction]}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

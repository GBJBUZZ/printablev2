import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "completed" | "canceled" | "out-for-signature";
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusConfig = {
    completed: {
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      dotColor: "bg-green-500",
      defaultLabel: "Completed",
    },
    canceled: {
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      dotColor: "bg-red-500",
      defaultLabel: "Canceled",
    },
    "out-for-signature": {
      bgColor: "bg-amber-100",
      textColor: "text-amber-800",
      dotColor: "bg-amber-500",
      defaultLabel: "Out for signature",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.bgColor,
        config.textColor
      )}
    >
      <span
        className={cn("mr-1.5 h-2 w-2 rounded-full", config.dotColor)}
      ></span>
      {label || config.defaultLabel}
    </span>
  );
}

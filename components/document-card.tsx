import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface DocumentCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function DocumentCard({
  icon: Icon,
  title,
  description,
}: DocumentCardProps) {
  return (
    <Card className="p-6 hover:bg-slate-50 transition-colors cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-slate-100 rounded-md">
          <Icon className="h-5 w-5 text-slate-700" />
        </div>
        <div>
          <h2 className="font-medium text-lg">{title}</h2>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
    </Card>
  );
}

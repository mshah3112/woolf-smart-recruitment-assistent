import { X } from "lucide-react";

type ErrorComponentProps = {
  title: string;
  description: string;
};

export const ErrorComponent = ({ title, description }: ErrorComponentProps) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] text-center gap-4">
      <div className="size-12 bg-foreground rounded-full flex items-center justify-center">
        <X className="size-6 text-background" />
      </div>
      <div className="flex flex-col max-w-md text-left">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

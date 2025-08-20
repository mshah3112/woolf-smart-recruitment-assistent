import { cn } from "@/utils/ui";

type HeadingProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
};

export const Heading = ({ title, description, icon, className }: HeadingProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-xl tracking-tight text-foreground">{title}</h2>
      </div>
      <div className="text-muted-foreground text-sm">{description}</div>
    </div>
  );
};

import { LoaderPinwheel } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
      <div className="size-12 bg-foreground rounded-full flex items-center justify-center">
         <LoaderPinwheel className="size-6 text-background animate-spin" />
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Please wait while AI analyzes job fitment for you ... !!! </h2>
        <p className="text-muted-foreground max-w-md">This may take around 30 Sec to 1 Minute. If failed to analyze please retry again!</p>
      </div>
    </div>
  );
};

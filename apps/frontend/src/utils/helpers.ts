import { AlertTriangle, CheckCircle, X } from "lucide-react";

export const getScoreProps = (scorePercentage: number) => {
  if (scorePercentage >= 75)
    return {
      text: "text-green-900",
      paper: "text-background bg-purple-400",
      progress: "[&>div]:bg-purple-400 bg-purple-400/10",
      Icon: CheckCircle,
    };
  if (scorePercentage >= 50)
    return {
      text: "text-yellow-700",
      paper: "text-background bg-yellow-700",
      progress: "[&>div]:bg-yellow-700 bg-yellow-900/10",
      Icon: AlertTriangle,
    };
  return {
    text: "text-red-800",
    paper: "text-background bg-red-800",
    progress: "[&>div]:bg-red-800 bg-red-900/10",
    Icon: X,
  };
};

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

export const formatCriterionName = (name: string) => {
  return name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
};

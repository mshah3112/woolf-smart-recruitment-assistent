import { NotepadText, TriangleDashed } from "lucide-react";
import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Card, CardContent, CardTitle } from "@/components/card";
import { Progress } from "@/components/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { cn } from "@/utils/ui";
import { formatCriterionName, getScoreProps } from "@/utils/helpers";
import type { AnalysisResult as AnalysisResultType } from "@/utils/types";

type AnalysisResultProps = {
  result: AnalysisResultType;
};

export const AnalysisResult = ({ result }: AnalysisResultProps) => {
  const overallScoreProps = getScoreProps(result.overallScore);
  
  return (
    <>
      <div className="flex flex-col gap-2">
        <Heading
          title="Detailed Assessment Summary"
          description="Overall resume Detailed analysis and recommendations, for the best fitment wrt given job descriptions"
          icon={<TriangleDashed className="size-5" />}
        />
      </div>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <CardTitle className="flex flex-col gap-4">
            <div className="flex gap-4 w-full items-center">
              <div className="text-foreground flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <overallScoreProps.Icon className={cn("size-5", overallScoreProps.text)} />
                  <span className="whitespace-nowrap">{result?.finalRecommendation}</span>
                </div>
                <Badge className={cn("text-sm", overallScoreProps.paper)}>{result.overallScore} / 100</Badge>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Progress value={result?.overallScore} className={cn("w-full", overallScoreProps.progress)} />
            </div>
          </CardTitle>
          <div className="text-sm text-muted-foreground">{result.overallComment}</div>
        </CardContent>
      </Card>

      
      <Card>
        <CardContent className="flex flex-col gap-4">
          <CardTitle className="flex flex-col gap-4">
            <div className="flex gap-4 w-full items-center">
              <div className="text-foreground flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <overallScoreProps.Icon className={cn("size-5", overallScoreProps.text)} />
                  <span className="whitespace-nowrap">Key Strengths</span>
                </div>
                <Badge className={cn("text-sm", overallScoreProps.paper)}>{result.strengths.score} / 100</Badge>
              </div>
            </div>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            <ul className="result-list gap-0">
            {result.strengths?.comment.map((strength, index) => (
              <li key={index} className="result-item p-0">
                <span className="item-bullet strength-bullet"></span>
                <div className="item-text leading-normal">{strength}</div>
              </li>
            ))}
          </ul></div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col gap-4">
          <CardTitle className="flex flex-col gap-4">
            <div className="flex gap-4 w-full items-center">
              <div className="text-foreground flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <overallScoreProps.Icon className={cn("size-5", overallScoreProps.text)} />
                  <span className="whitespace-nowrap">Key Weeknesses</span>
                </div>
                <Badge className={cn("text-sm", overallScoreProps.paper)}>{result.weaknesses.score} / 100</Badge>
              </div>
            </div>
          </CardTitle>

          <div className="text-sm text-muted-foreground">
            <ul className="result-list">
            {result.weaknesses?.comment.map((weakness, index) => (
              <li key={index} className="result-item">
                <div className="item-bullet weakness-bullet"></div>
                <div className="item-text">{weakness}</div>
              </li>
            ))}
          </ul></div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-4">
          <CardTitle className="flex flex-col gap-4">
            <div className="flex gap-4 w-full items-center">
              <div className="text-foreground flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <overallScoreProps.Icon className={cn("size-5", overallScoreProps.text)} />
                  <span className="whitespace-nowrap">Area Of Improvement</span>
                </div>
                <Badge className={cn("text-sm", overallScoreProps.paper)}>{result.improvements.score} / 100</Badge>
              </div>
            </div>

          </CardTitle>
          <div className="text-sm text-muted-foreground">{result?.improvements?.comment.map((improvement, index) => (
            <li key={index} className="result-item">
              <div className="item-bullet weakness-bullet"></div>
              <div className="item-text">{improvement}</div>
            </li>
          ))}
          </div>
        </CardContent>
      </Card>
    
      <Heading
        title="Individual Criteria Based Assessment"
        description="Analysis of the resume against each criteria."
        icon={<NotepadText className="size-5" />}
        className="mt-2"
      />
      <Tabs defaultValue={Object.keys(result.criteria)[0]}>
        <div className="grid grid-cols-4 gap-4">
          <TabsList className="flex flex-col h-fit gap-1 col-span-1 w-full">
            {Object.keys(result.criteria).map((key) => (
              <TabsTrigger key={key} value={key} className="w-full">
                <div className="flex w-full gap-2 items-center py-1 justify-between">
                  {formatCriterionName(key)}
                  
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(result.criteria).map(([key, value]) => (
            <TabsContent key={key} value={key} asChild>
              <Card className="col-span-3">
                <CardContent className="flex flex-col gap-4">
                  <CardTitle className="flex items-center gap-2 justify-between">
                    {formatCriterionName(key)}
                    <Badge className={cn("text-sm", getScoreProps(value.score).paper)}>{value.score} / 100</Badge>
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">{value.comment}</div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </>
  );
};

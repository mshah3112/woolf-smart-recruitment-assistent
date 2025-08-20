import { api } from "@/utils/api";
import { AnalysisResult } from "@/components/analysis-result";
import { ErrorComponent } from "@/components/error";
import { Initial } from "@/components/initial";
import { Loading } from "@/components/loading";
import { Sidebar } from "@/components/sidebar";
import { readFileAsDataURL } from "@/utils/helpers";

 export const AnalyzeResume = () => {
  const { data, mutate: checkCandidateAlignment, isPending, error } = api.ai.analyzeResume.useMutation();
  
  const onAnalyze = async (resume: File, jobDescription: File) => {
    const resumeDataType = await readFileAsDataURL(resume);
    const jobDescriptionDataType = await readFileAsDataURL(jobDescription);
    
    checkCandidateAlignment({
      resumePdf: resumeDataType,
      jobDescriptionPdf: jobDescriptionDataType,
    });
  };

  return (
    <>
      <div className="flex h-fit bg-muted p-4 m-2">
        <div className="flex h-fit grow gap-2">
          <Sidebar onAnalyze={onAnalyze} isPending={isPending} />
          {!data && (
            <div className="flex-3 flex p-2 items-center justify-center border-10 rounded-2xl">
            {isPending ? (
              <Loading />
            ) : error ? (
              <ErrorComponent
                title="An error occurred while analyzing your resume."
                description="Please try again."
              />
            ) : (
              <Initial />
            )}
          </div>
        )}
        {data && (
          <div className="flex-3 p-3 gap-3 flex flex-col h-fit">
               <AnalysisResult result={data} />
          </div>
        )}
      </div>
    </div>
    </>
  );
};

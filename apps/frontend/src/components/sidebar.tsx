import { Loader2, WavesLadder } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { FileRejection, useDropzone } from 'react-dropzone';


type SidebarProps = {
  onAnalyze: (resume: File, jobDescription: File) => void;
  isPending: boolean;
};

const MAX_SIZE_BYTES = 3 * 1024 * 1024; //3MB

const dropzoneStyle: React.CSSProperties = {
  border: '2px dashed #888',
  borderRadius: '8px',
  padding: '20px',
  width: '300px',
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: '#f9f9f9'
};

type ErrorEntry = {
   signature: string;
   messages: string[];
};


export const Sidebar = ({ onAnalyze, isPending }: SidebarProps) => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<File | null>(null);
  const [error, setError] =  useState<ErrorEntry[]>([]);


  const createDropHandler = (setter: React.Dispatch<React.SetStateAction<File | null>>, type: string) =>
    useCallback((acceptedFiles: File[], fileRejections : FileRejection[]) => {
      if (fileRejections.length > 0) {
      const newEntries: ErrorEntry[] = fileRejections.map(rejection => ({
        signature: type,
        messages: rejection.errors.map(err => `File Rejected ${rejection.file.name}: ${err.message}`)
      }));

      setError(prev => [...prev, ...newEntries]);
      return;
    }


      const file = acceptedFiles[0];
      setter(file);
      setError(prev => prev.filter(entry => entry.signature !== type));

    }, [setter]);

  const resumeDropzone = useDropzone({
    onDrop: createDropHandler(setResume, "Resume"),
    accept: { 'application/pdf': [] },
    maxSize: MAX_SIZE_BYTES,
    multiple: false
  });

  const jdDropzone = useDropzone({
    onDrop: createDropHandler(setJobDescription, "Job Description"),
    accept: { 'application/pdf': [] },
    maxSize: MAX_SIZE_BYTES,
    multiple: false
  });


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(resume && jobDescription)) {
      return;
    }
    setError([]);
    onAnalyze(resume, jobDescription);
  };

  const isButtonDisabled = isPending || !(resume && jobDescription);

  return (
    <Card className="flex-1 border border-10">
      <CardContent className="flex-1 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <div className="text-sm text-muted-foreground">
           A structured analysis that maps resume content to job descriptions, highlighting areas of alignment and potential gaps for informed decision-making.
           Reviewing the resume alongside the job description to understand how well the candidate fits the role.
          </div>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              {/* Resume Dropzone */}
               <div {...resumeDropzone.getRootProps()} style={dropzoneStyle}>
                <input {...resumeDropzone.getInputProps()} />
               <p>Upload Resume (PDF, max 3MB)</p>
               {resume && (
                <p>
                  ✅ <strong>{resume.name}</strong> ({(resume.size / 1024 / 1024).toFixed(2)} MB)
                </p>
            )}
            </div>
            </div>

            <div className="flex flex-col gap-2">
             {/* Job Description Dropzone */}
              <div {...jdDropzone.getRootProps()} style={dropzoneStyle}>
                <input {...jdDropzone.getInputProps()} />
                <p>Upload Job Description (PDF, max 3MB)</p>
                {jobDescription && (
                  <p>
                    ✅ <strong>{jobDescription.name}</strong> ({(jobDescription.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

            </div>
            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={isButtonDisabled} className="cursor-pointer bg-green-400">
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <WavesLadder className="size-4" />
                    Analyze Resume
                  </span>
                )}
              </Button>
              {error.map((entry, index) => (
                <div key={entry.signature || index} style={{ marginBottom: '1rem' }}>
                  <strong>Uploading Failed: </strong> {entry.signature}
                  <ul>
                    {entry.messages.map((msg, i) => (
                      <li key={i} className="text-red-500 text-sm mt-2">{msg}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

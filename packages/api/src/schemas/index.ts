import { z } from "zod";

export const base64Pdf = z
  .string()
  .startsWith("data:application/pdf;base64,")
  .transform((val: string) => val.split(",")[1]);

const criterionSchema = z.object({
  score: z
    .number()
    .describe(
      "Individual criterion score on a scale of 0-100, where 0 to 25 poor, 25 to 50 below average, 50 to 75 average, 75 to 90 above average, and 90 to 100 excellent. This score reflects how well the candidate meets the specific requirements for this evaluation criterion.",
    ),
  comment: z
    .string()
    .describe(
      "Detailed feedback specific to this criterion, including strengths demonstrated, areas needing improvement, specific examples from the resume, and actionable recommendations for enhancement.",
    ),
});

export const analysisResultSchema = z
  .object({
    overallScore: z
      .number()
      .describe(
        "The comprehensive match score between 0-100, calculated as a weighted average of all individual criteria scores. This score represents the overall alignment between the candidate's resume and the job requirements, providing a quantitative measure of fit.",
      ),
    overallComment: z
      .string()
      .describe(
        "A detailed narrative analysis summarizing the candidate's overall strengths, weaknesses, and key areas for improvement. This comment provides context for the overall score and actionable insights for both the candidate and hiring team. around 100 words",
      ),
    finalRecommendation: z
      .enum(["Strong hire", "Hire", "Consider with reservations", "No hire"])
      .describe(
        "The final hiring recommendation based on comprehensive analysis: 'Strong hire' (excellent match, highly recommended), 'Hire' (good match, recommended), 'Consider with reservations' (moderate match, proceed with caution), or 'No hire' (poor match, not recommended).",
      ),
      strengths: z
        .object({
          score: z
            .number()
            .describe(
              "Individual criterion score on a scale of 0-100, where 0 to 25 poor, 25 to 50 below average, 50 to 75 average, 75 to 90 above average, and 90 to 100 excellent. This score reflects how well the candidate meets the specific requirements for this evaluation criterion wrt job description.",
            ),
          comment: z
            .array(z.string())
             .describe(
                "The candidate's key strengths relevant to the job description any alternate technologies  apart from mentioned in the jobdescription should also be listed limit 5 points.",
              )
        }),
       weaknesses: z
        .object({
          score: z
            .number()
            .describe(
              "Individual criterion score on a scale of 0-100, where 0 to 25 poor, 25 to 50 below average, 50 to 75 average, 75 to 90 above average, and 90 to 100 excellent. This score reflects how well the candidate meets the specific requirements for this evaluation criterion wrt job description."
            ),
          comment: z
                .array(z.string())
                .describe(
                  "The candidate's key weaknesses relevant to the job description  where candidate may be lacking and no any alternate technologies mentioned in the resume limit 5 points."
            )
        }),
       alignment: z
        .object({
          score: z
            .number()
            .describe(
              "Individual criterion score on a scale of 0-100, where 0 to 25 poor, 25 to 50 below average, 50 to 75 average, 75 to 90 above average, and 90 to 100 excellent. This score reflects how well the candidate meets the specific requirements for this evaluation criterion wrt job description."
            ),
          comment: z
                .string()
                .describe(
                  "The alignment of the candidate's experience and skills with the job requirements, including a score and detailed explanation."
            )
        }),
     
       improvements: z
        .object({
          score: z
            .number()
            .describe(
              "Individual criterion score on a scale of 0-100, where 0 to 25 poor, 25 to 50 below average, 50 to 75 average, 75 to 90 above average, and 90 to 100 excellent. This score reflects how well the candidate meets the specific requirements for this evaluation criterion wrt job description."
            ),
          comment: z
              .array(z.string())
              .describe("Specific areas where the candidate can improve their resume or qualifications to better align with the job requirements.")
          }),
      criteria: z
      .object({
        relevantExperience: criterionSchema.describe("The relevant experience criterion"),
        technicalSkills: criterionSchema.describe("The technical skills criterion"),
        leadershipSkills: criterionSchema.describe("The leadership skills criterion"),
        industryKnowledge: criterionSchema.describe("The industry knowledge criterion"),
        problemSolving: criterionSchema.describe("The problem solving criterion"),
        communication: criterionSchema.describe("The communication criterion"),
        culturalFit: criterionSchema.describe("The cultural fit criterion"),
        motivation: criterionSchema.describe("The motivation criterion"),
        education: criterionSchema.describe("The education criterion"),
      })
      .describe("The detailed resume based criteria of the analysis."),
  })
  .describe(
    "The comprehensive analysis result containing detailed evaluation of candidate-resume alignment across all criteria, overall assessment, and final hiring recommendation with supporting rationale.",
  );

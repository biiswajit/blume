import { assignmentSchema, solutionSchema } from "../schemas";
import { z } from "zod";

export type assignmentType = z.infer<typeof assignmentSchema>;
export type solutionType = z.infer<typeof solutionSchema>;

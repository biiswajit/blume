import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 10; // 10MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword"];

export const assignmentSchema = z.object({
  name: z.string().min(4).max(30),
  description: z.string().min(5).max(200).optional(),
  file: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 10MB")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File must be a PDF or DOC"),
  classroomId: z.string(),
  dueDate: z.string().date(),
});

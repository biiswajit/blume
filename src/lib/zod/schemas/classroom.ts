import { z } from "zod";

export const classroomSchema = z.object({
  name: z
    .string()
    .min(4)
    .max(30)
    .describe(
      "The name of the classroom that clearly conveys its subject, purpose, or focus, helping participants identify it easily.",
    ),
  description: z
    .string()
    .min(5)
    .max(500)
    .optional()
    .describe(
      "A brief overview of the classroom's goals, activities, or topics, providing participants with context and expectations (optional).",
    ),
  themeColor: z
    .string()
    .length(7)
    .optional()
    .describe(
      "A hexadecimal color code (e.g., #3498db) representing the visual theme of the classroom for branding or personalization (optional).",
    ),
});

// TODO: add share link support to classroom join schema
export const classroomJoinSchema = z
  .string()
  .length(8)
  .describe(
    "Classroom code must be exactly 8 characters long and is required to join the classroom as a student.",
  );

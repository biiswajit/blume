import { classroomSchema, classroomJoinSchema } from "../schemas";
import { z } from "zod";

export type classroomType = z.infer<typeof classroomSchema>;
export type classroomJoinType = z.infer<typeof classroomJoinSchema>;

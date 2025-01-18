import { atom } from "jotai";

export type AssignmentType = {
  name: string;
  description?: string;
  dueDate: string;
  id: string;
  createdAt: string;
  mark?: number;
};

export const AssignmentsAtom = atom<AssignmentType[]>([]);

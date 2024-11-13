import { atom } from "jotai";

export type Classroom = {
  classroom: {
    id: string;
    name: string;
    description?: string;
    themeColor: string;
    createdBy: {
      name: string;
      image: string;
    };
    createdAt: string;
  };
  joinedAt: string;
  role: string;
};

export const classroomsAtom = atom<Classroom[]>([]);
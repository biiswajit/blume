import { atom } from "jotai";
import { Discussion } from "@/lib/actions";

export const DiscussionAtom = atom<Discussion[]>([])
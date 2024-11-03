import { atom } from "jotai";

export type WebSocketConnections = Record<string, WebSocket>;

export const wsConnections = atom<WebSocketConnections>({});

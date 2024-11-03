import { useAtom } from "jotai";
import { useCallback } from "react";
import { WebSocketConnections, wsConnections } from "@/store/atoms";

export function useSocket() {
  const [connections, setConnections] = useAtom(wsConnections);

  // Add a WebSocket connection for a specific room
  const addConnection = useCallback(
    (discussionId: string, ws: WebSocket) => {
      setConnections((prevConnections) => ({
        ...prevConnections,
        [discussionId]: ws,
      }));
    },
    [setConnections],
  );

  // Retrieve WebSocket connection for a specific room
  const getConnection = useCallback(
    (discussionId: string): WebSocket | null => {
      return connections[discussionId] || null;
    },
    [connections],
  );

  return { addConnection, getConnection };
}

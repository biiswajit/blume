"use client";
export function sendTextMessage(
  ws: WebSocket,
  userId: string,
  discussionId: string,
  message: string,
) {
  const msg = {
    type: "TEXT_MESSAGE",
    payload: {
      userId,
      discussionId,
      message,
    },
  };

  ws.send(JSON.stringify(msg));
}

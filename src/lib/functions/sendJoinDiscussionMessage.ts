export function sendJoinDiscussionMessage(
  ws: WebSocket,
  userId: string,
  discussionId: string,
  userName: string,
) {
  const msg = {
    type: "JOIN_DISCUSSION",
    payload: {
      userId,
      discussionId,
      userName,
    },
  };

  ws.send(JSON.stringify(msg));
}

import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { EnterIcon } from "@radix-ui/react-icons";
import { FormEvent } from "react";
import { joinDiscussion } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useSocket, DiscussionAtom } from "@/store";
import { useAtom } from "jotai";
import { fetchDiscussions, Discussion } from "@/lib/actions";

export function JoinDiscussion({ classroomId }: { classroomId: string }) {
  const { toast } = useToast();
  const { addConnection } = useSocket();
  const [discussions, setDiscussions] = useAtom(DiscussionAtom);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const discussionCode = formData.get("discussionCode") as string;
    const { success, message } = await joinDiscussion(
      discussionCode,
      classroomId,
    );

    if (success) {
      const data = await fetchDiscussions(classroomId);
      setDiscussions(data);
    }

    if (success && message?.discussionId && message.conn) {
      addConnection(message?.discussionId, JSON.parse(message.conn));
    }
    toast({
      title: success ? "Success!" : "Error!",
      description: success
        ? "you're successfully joind to the discussion"
        : "unable to join you in",
      variant: success ? "default" : "destructive",
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" name="discussionCode" required />
      <Button type="submit" variant="default">
        <EnterIcon className="mr-2 h-4 w-4" />
        Join
      </Button>
    </form>
  );
}

import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { EnterIcon } from "@radix-ui/react-icons";
import { FormEvent } from "react";
import { joinDiscussion } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

export function JoinDiscussion({ classroomId }: { classroomId: string }) {
  const { toast } = useToast();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const discussionCode = formData.get("discussionCode") as string;
    const { success, message } = await joinDiscussion(
      discussionCode,
      classroomId,
    );
    toast({
      title: success ? "Success!" : "Error!",
      description: message,
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

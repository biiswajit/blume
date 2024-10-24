import { NavUser } from "@/ui/nav-user";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Badge } from "@/ui/badge";
import { parseDate } from "@/lib/functions";

export type MemberType = {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  joinedAt: string;
  role: string;
};

export function Members({ members }: { members: MemberType[] }) {
  return (
    <div className="m-auto w-fit flex flex-col gap-2">
      {members.map((member: MemberType) => (
        <Card key={member.user.email}>
          <CardFooter className="flex flex-col items-stretch">
            <CardFooter className="p-0 m-0">
              <NavUser
                name={member.user.name}
                image={member.user.image}
                email={member.user.email}
              />
              <Badge variant="default">{member.role}</Badge>
            </CardFooter>
            <CardDescription>
              Joined this classroom at {parseDate(member.joinedAt)}
            </CardDescription>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

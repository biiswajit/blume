import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { NavUser } from "@/ui/nav-user";
import { Badge } from "@/ui/badge";
import { parseDate } from "@/lib/functions";

export function ClassroomCard({
  name,
  description,
  themeColor,
  owner,
  ownerImg,
  role,
  joinedAt,
  createdAt,
}: {
  name: string;
  description?: string;
  themeColor: string;
  owner: string;
  ownerImg?: string;
  role: string;
  joinedAt: string;
  createdAt: string;
}) {
  return (
    <Card
      className={"bg-sidebar md:w-96 hover:ring-8 ring-[" + themeColor + "]"}
    >
      <CardHeader className="border-b">
        <CardTitle className="flex justify-between">
          {name}
          <Badge variant="default">{role}</Badge>
        </CardTitle>
        <CardDescription>You joined at {parseDate(joinedAt)}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-stretch">
        <CardFooter className="p-0 m-0">
          <NavUser name={owner} image={ownerImg} />
          <Badge variant="secondary">Owner</Badge>
        </CardFooter>
        <CardDescription>
          This classroom created at {parseDate(createdAt)}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

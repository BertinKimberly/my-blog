import CreatePostForm from "@/components/CreatePostForm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../../lib/authOptions";

export const metadata = {
   title: "Create A New Post ",
   description: `A page to Create a new post`,
 };
export default async function Page() {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect("/sign-in");
   }

   return <CreatePostForm />;
}

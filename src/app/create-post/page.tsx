import CreatePostForm from "@/components/CreatePostForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
   title: "Create A New Post ",
   description: `A page to Create a new post`,
 };
export default async function CreatePost() {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect("/sign-in");
   }

   return <CreatePostForm />;
}

import SignInBtns from "@/components/SignInBtns";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../../lib/authOptions";

export const metadata = {
   title: "Sign In  ",
   description: `Sign In For Glog`,
};
export default async function Page() {
   const session = await getServerSession(authOptions);

   if (session) {
      redirect("/dashboard");
   }

   return (
      <div className='flex items-center justify-center min-h-[80vh] w-full flex-col gap-5'>
         <SignInBtns />
      </div>
   );
}

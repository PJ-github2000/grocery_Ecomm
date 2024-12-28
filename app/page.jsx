import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import TiltedScroll from "./loginpageanimation/page";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <main className="h-screen">
      <div className="flex gap-20 h-[100%]">
      <TiltedScroll/>
      <div className="w-[400px]">
      <LoginForm />

      </div>
      </div>
   
    </main>
  );
}

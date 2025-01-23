import Layout from "@/components/Layout";
import { auth } from "./api/auth/[...nextauth]/options";
export default async function Home() {
  const session = await auth();
  // console.log("auth", session);

  return (
    <Layout>
      <div className="flex text-blue-900 justify-between">
        <h2>
          Hello,<b> {session?.user.name}</b>
        </h2>
        <div className="flex bg-gray-300 text-black gap-1 rounded-lg overflow-hidden">
          <img
            src={session?.user.image}
            className="w-6 h-6"
            alt={session?.user.name}
          />
          <span className="px-2">{session?.user.name}</span>
        </div>
      </div>
    </Layout>
  );
}

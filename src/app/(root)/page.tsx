import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = auth();

  console.log(userId);

  return <div>Home Page</div>;
}

import { getLabelsForUserId } from "@/api/label";
import { PaymentRegistrationForm } from "@/components/payment-registration-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in");
  }

  const labels = await getLabelsForUserId(userId);

  return (
    <div className="flex items-center justify-center">
      <PaymentRegistrationForm userId={userId} labels={labels} />
    </div>
  );
}

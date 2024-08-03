import { users } from "@/db/schema";
import { db } from "@/utils/database";
import { WebhookEvent } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const webhook = new Webhook(WEBHOOK_SECRET);

  let event: WebhookEvent;

  try {
    event = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const { id } = event.data;
  const eventType = event.type;

  if (!id) {
    return new Response("No id provided", {
      status: 400,
    });
  }

  if (eventType === "user.created") {
    await db.insert(users).values({
      externalId: id,
    });
  } else if (eventType === "user.deleted") {
    await db.delete(users).where(eq(users.externalId, id));
  }

  return new Response("", { status: 200 });
}

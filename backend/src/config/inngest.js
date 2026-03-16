import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js"; 
import { addUserToPublicChannels, deleteStreamUser, upsertStreamUser } from "./stream.js";

// Inngest client
export const inngest = new Inngest({ id: "rewired" });

// -------------------------
// Handle user creation
// -------------------------
const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    // Guard against missing Clerk ID
    if (!id || typeof id !== "string") {
      console.error("Invalid Clerk ID, skipping insert:", event.data);
      return;
    }

    // Prepare user data
    const newUser = {
      clerkId: id,
      email: email_addresses?.[0]?.email_address || "",
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      image: image_url || "",
    };

    // Upsert to prevent duplicates
    await User.updateOne(
      { clerkId: id },
      { $set: newUser },
      { upsert: true }
    );

    // Sync with Stream
    await upsertStreamUser({
      id: id.toString(),
      name: newUser.name,
      image: newUser.image,
    });

    // Add user to public channels
    await addUserToPublicChannels(id.toString());
  }
);

// -------------------------
// Handle user deletion
// -------------------------
const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    if (!id || typeof id !== "string") {
      console.error("Invalid Clerk ID on delete:", event.data);
      return;
    }

    // Remove from MongoDB
    await User.deleteOne({ clerkId: id });

    // Remove from Stream
    await deleteStreamUser(id.toString());
  }
);

// Export all functions
export const functions = [syncUser, deleteUserFromDB];

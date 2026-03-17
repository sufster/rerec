import "../instrument.mjs"
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { setServers } from "node:dns/promises";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js"
import cors from "cors";
import * as Sentry from "@sentry/node";


setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.use(express.json());
app.use(cors({origin:"http://localhost:5173", credentials:true}));
app.use(clerkMiddleware());

app.get("/debug-sentry", (req, res)=> {
  throw new Error("My first Sentry error")
})

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () => {
      console.log("Server started on port:", ENV.PORT);
    });

  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

// ONLY run locally
if (ENV.NODE_ENV !== "production") {
  startServer();
}

export default app;
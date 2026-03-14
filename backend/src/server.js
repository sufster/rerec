import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { setServers } from "node:dns/promises";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";

setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client:inngest, functions }));

app.get("/",(req, res)=>{
    res.send("hello world");
});

const startServer = async() => {
    try{
        await connectDB();
        if(ENV.NODE_ENV !== "production"){
            console.log("db connected & env.js completed");
            app.listen(ENV.PORT, ()=>
    { 
    console.log("Server started at port: ", ENV.PORT);
    }
);
        }
    }catch (error){
        console.error("error starting: ", error);
        process.exit(1);
    }
};

startServer();

export default app;

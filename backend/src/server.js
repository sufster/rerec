import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.get("/",(req, res)=>{
    res.send("hello world");
});

app.listen(ENV.PORT, ()=>
    { 
    console.log("Server started at port: ", ENV.PORT)
    connectDB();
    }
);


// import { redis as redisConnect } from "./redisOptions";
// // Redis Configuration
// redisConnect.on("connect", () => console.log("✅ Redis connected successfully"));
// redisConnect.on("error", (err: any) => console.error("❌ Redis error:", err));


// export default redisConnect;

import { createClient } from "redis";

const redisConnect = createClient({
  url: "redis://default:Do75EC9PRJTKXHdBBdOzOdZeMBRsa45N@redis-19169.c270.us-east-1-3.ec2.cloud.redislabs.com:19169"
});

redisConnect.on("connect", () => console.log("✅ Redis connected successfully"));
redisConnect.on("error", (err: any) => console.error("❌ Redis error:", err));

export default redisConnect;
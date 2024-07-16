import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { quizRouter } from "./routes/quiz";
import dotenv from "dotenv";
import { JwtVariables } from "hono/jwt";

dotenv.config();

type variables = JwtVariables;

//To get the right types on c.env, when initializing the Hono app, pass the types of env as a generic
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string; 
},
    Variables: variables;
}>();

app.get("/",(c)=>{
   return c.text("Hello World");
});

app.route("/v1/user",userRouter);
app.route("/v1/quiz",quizRouter);

export default app;
import { create } from "domain";
import prisma from "../prismaClient";
import { Hono } from "hono";

export const quizRouter = new Hono<{
    Bindings:{
        JWT_SECRET: string;
        DATABASE_URL: string;
    },
}>();

quizRouter.use("/*",async (c,next)=>{
    const auth = c.req.header("Authorization");
    
    if(!auth){
        c.status(401);
        return c.json("Unauthorized");
    };
    
    const token = auth.split(" ")[1];
    const payload =await verify(token,c.env.JWT_SECRET);
    if(!payload){
        c.status(401);
        return c.json("Unauthorized");
    }
    
    c.set("jwtPayload",payload);
    await next();
})


quizRouter.post("/create-form",async (c)=>{
    prisma.$connect();
  const { title, description, questions } = await c.req.json();

  try {
    const createdForm = await prisma.form.create({
      data: {
        title,
        description,
        questions: {
          create: questions.map((q) => ({
            questionText: q.questionText,
            questionType: q.questionType,
            order: q.order,
            options: {
              create: q.options.map((o) => ({
                optionText: o.optionText,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return c.json(createdForm);
  } catch (error) {   
    console.error("Failed to create form:", error);
    c.status(500)
    return c.json({ error: "Failed to create form" });
  }
});
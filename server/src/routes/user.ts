import prisma from "../prismaClient";
import { Hono } from "hono";
import { sign,verify } from "hono/jwt";


export const userRouter = new Hono<{
    Bindings:{
        JWT_SECRET: string;
        DATABASE_URL: string;
    },
    }>();


userRouter.post("/signin",async (c)=>{
    prisma.$connect();
    const body = await c.req.json();

    const {username,password} = body;

    let jwt;
    prisma.user.findUnique({
        where:{
            username,
            password,
        }
    })
    .then((user)=>{
         jwt = sign({id:user?.id},c.env.JWT_SECRET);
    })
    .catch((err)=>{
        c.status(403);
        return c.json("Signin Error: ",err);
    })
    .finally(async ()=>{
        await prisma.$disconnect();
    });

    return c.json({jwt});
});

userRouter.post("/signup",async (c)=>{
    await prisma.$connect();
    const body = await c.req.json();
    const {fullname,email,username,password} = body;

    let token;

    prisma.user.create({
        data:{
            fullname,
            email,
            username,
            password,
        }
    })
    .then((user)=>{
         token = sign({id:user?.id},c.env.JWT_SECRET);
    })
    .catch((err)=>{
        c.status(403);
        return c.json("Signup Error: ",err);
    })
    .finally(async ()=>{
        await prisma.$disconnect();
    });
    
    return c.json({
        jwt: token
    })
});
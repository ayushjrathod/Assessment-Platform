import z from "zod";

export const signUpInput = z.object({
    fullname: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
});

export type SignUpInput = z.infer<typeof signUpInput>;

export const signInInput = z.object({
    username: z.string(),
    password: z.string(),
});

export type SignInInput = z.infer<typeof signInInput>;

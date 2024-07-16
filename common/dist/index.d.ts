import z from "zod";
export declare const signUpInput: z.ZodObject<{
    fullname: z.ZodString;
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    fullname: string;
    username: string;
    email: string;
    password: string;
}, {
    fullname: string;
    username: string;
    email: string;
    password: string;
}>;
export type SignUpInput = z.infer<typeof signUpInput>;
export declare const signInInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type SignInInput = z.infer<typeof signInInput>;

import { z } from "zod";
// ARTICLE Validation
export const createValidation = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(4, { message: "title should be at least 4 characters" }),
  body: z
    .string({ required_error: "Desription is required" })
    .min(20, { message: "Desription should be at least 150 characters" }),
});

// User Register Validation

export const RegisterValidation = z.object({
  userName: z
    .string({ required_error: "User Name Is Required!" })
    .min(4)
    .max(120),
  password: z.string({ required_error: "Password Is Required!" }).min(8),
  email: z.string({ required_error: "Email Is Required!" }).email(),
});

// User LogIn Validation

export const LogInValidation = z.object({
  email: z.string({ required_error: "Email Is Required!" }).email(),
  password: z.string({ required_error: "Password Is Required!" }).min(8),
});

// Comments Validation

export const CommentValidation = z.object({
  commentText: z
    .string({ required_error: "required_error from text" })
    .min(2)
    .max(1000),
  articleId: z.number({ required_error: "required_error from id" }),
});

// User Register Validation
export const UpdateUserValidation = z.object({
  userName: z.string().min(4).max(120).optional(),
  password: z.string().min(8).optional(),
  email: z.string().email().optional(),
});

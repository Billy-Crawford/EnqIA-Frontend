import { z } from "zod";

export const registerSchema = z
  .object({
    firstname: z
      .string()
      .min(2, "Prénom trop court"),

    lastname: z
      .string()
      .min(2, "Nom trop court"),

    email: z
      .string()
      .email("Email invalide"),

    password: z
      .string()
      .min(6, "Minimum 6 caractères"),

    confirmPassword: z
      .string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Les mots de passe ne correspondent pas",
      path: ["confirmPassword"],
    }
  );

export type RegisterFormData = z.infer<
  typeof registerSchema
>;


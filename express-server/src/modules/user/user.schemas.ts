import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    fbId: string({
      required_error: "Fb Id is required",
    }),
    accessToken: string({
      required_error: "Access Token is required",
    }),
    emailAddress: string({
      required_error: "Email address is required",
    }).email("Email Address is Not a vaild email address"),
  }),
});
export const userIdInput = object({
  query: object({
    userId: string({
      required_error: "user Id is required",
    }),
  }),
});
export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type GetUserInput = TypeOf<typeof userIdInput>;

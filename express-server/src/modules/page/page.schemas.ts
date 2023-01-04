import { object, string, TypeOf } from "zod";

export const page = object({
  params: object({
    pageId: string({
      required_error: "page Id is required",
    }),
  }),
  body: object({
    userId: string({
      required_error: "user Id is required",
    }),
  }),
});

export type GetPageInput = TypeOf<typeof page>;

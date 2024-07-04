import { z } from "zod";

export const EditSelfieValidator = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  subtitle: z.string().min(10, "Subtitle must be between 5 and 100 characters long").max(100, "Subtitle must be between 5 and 100 characters long"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format"),
  place: z.string().min(1, "Place must not be empty"),
  lat: z.number().refine(val => val !== 0, {
    message: "Latitude cannot be 0",
  }),
  lng: z.number().refine(val => val !== 0, {
    message: "Longitude cannot be 0",
  }),
  description: z.string(),
  url: z.string(),
  hash: z.string(),
  visible: z.boolean(),
  draft: z.boolean(),
});

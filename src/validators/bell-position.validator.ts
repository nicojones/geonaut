import { z } from "zod";

export const BellPositionValidator = z.enum(["menu", "top"]);

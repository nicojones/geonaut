import { z } from "zod";

import { BellPositionValidator } from "@/validators";

export type IBellPosition = z.infer<typeof BellPositionValidator>;

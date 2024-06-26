import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { IStorageKey } from "@/types";

export async function POST (request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl.clone();
  url.pathname = "/";

  cookies().delete("token" satisfies IStorageKey);
  // cookies().set({ name: "token" satisfies IStorageKey, value: "", maxAge: 0 });
  return NextResponse.json({ success: true });
}

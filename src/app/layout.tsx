import "./globals.css";
import "@fontsource/inter";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";

import { Header } from "@/components";
import { Toaster } from "@/components/shadcn";
import { JwtTokenContextWrapper } from "@/context";
import { getUserFromJwt } from "@/functions";
import { IJwtContextAuthedOrAnonymous, IStorageKey, IUserSettings } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geonaut",
  description: "A unique travel blog",
};

const getAuthData = async (): Promise<IJwtContextAuthedOrAnonymous> => {
  const jwt: string | null = cookies().get("token" satisfies IStorageKey)?.value ?? null;
  const user: IUserSettings | null = getUserFromJwt(jwt);

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    jwt,
    user,
    isAdmin: user?.username === "nico",
    isAuthed: !!user,
  } as IJwtContextAuthedOrAnonymous;
};

export default async function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<JSX.Element> {
  const contextData: IJwtContextAuthedOrAnonymous = await getAuthData();

  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen"}>
        <NextTopLoader showSpinner={false} />
        <JwtTokenContextWrapper contextData={contextData}>
          <Header />
          {children}
          <Toaster />
        </JwtTokenContextWrapper>
      </body>
    </html>
  );
}

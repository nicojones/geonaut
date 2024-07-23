import "./globals.css";

import { CssVarsProvider } from "@mui/joy";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";

import { HeaderAndDrawer } from "@/components";
import { Footer, SystemModeColorCookie } from "@/components/generic";
import { Toaster } from "@/components/shadcn";
import { JwtTokenContextWrapper } from "@/context";
import { getUserFromJwt } from "@/functions";
import { IJwtContextAuthedOrAnonymous, IMuiThemeType, IStorageKey, IUserSettings } from "@/types";

export const metadata: Metadata = {
  title: "geonaut",
  description: "a unique travel blog",
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

  const colorScheme = cookies().get("theme" satisfies IStorageKey)?.value as IMuiThemeType | undefined;

  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={colorScheme}
    >
      <body className="min-h-screen">
        <CssVarsProvider defaultMode={colorScheme ?? "system"}>
          {/* makes sure the color scheme is in sync with the device */}
          <SystemModeColorCookie />
          <NextTopLoader showSpinner={false} />
          <JwtTokenContextWrapper contextData={contextData}>
            <HeaderAndDrawer />
            {children}
            <Toaster />
          </JwtTokenContextWrapper>
          <Footer />
        </CssVarsProvider>
      </body>
    </html>
  );
}

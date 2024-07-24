import { Card, Typography } from "@mui/joy";
import Link from "next/link";

import { ComponentChildren } from "@/types";

interface AuthCardProps {
  title: string;
  children: ComponentChildren;
  orElse?: {
    text: [string, string];
    url: string;
  };
}

export const AuthCard = ({ children, orElse, title }: AuthCardProps): JSX.Element => {
  return (
    <div className="grid place-content-center mt-[var(--header-height)] fill-screen">
      <Card
        variant="outlined"
        sx={{ maxHeight: "max-content", minWidth: 384 }}
      >
        <Typography level="h3">{title}</Typography>

        {children}
      </Card>
      {
        orElse &&
        <span className="text-sm relative mt-4 fric space-x-2 opacity-50 hover:opacity-100 transition-opacity">
          <span>{orElse.text[0]}</span>
          <Link href={orElse.url} className="is-link">{orElse.text[1]}</Link>
        </span>
      }
    </div>
  );
};

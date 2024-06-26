"use client";

import { EnvelopeIcon, KeyIcon } from "@heroicons/react/16/solid";
import { Button, FormControl, FormLabel, Input } from "@mui/joy";

import { signUpSubmit } from "./sign-up-submit.function";

export const SignUpForm = (): JSX.Element => {
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form action={signUpSubmit} className="flex flex-col space-y-4">

        <FormControl sx={{ gridColumn: "1/-1" }}>
          <FormLabel>email or username</FormLabel>
          <Input
            endDecorator={<EnvelopeIcon className="size-4" />}
            autoFocus
            autoComplete="off"
            name="username"
          />
        </FormControl>
        <FormControl sx={{ gridColumn: "1/-1" }}>
          <FormLabel>password</FormLabel>
          <Input
            endDecorator={<KeyIcon className="size-4" />}
            type="password"
            name="password"
          />
        </FormControl>

        <FormControl sx={{ gridColumn: "1/-1" }}>
          <Button type="submit">Log in</Button>
        </FormControl>
      </form>
    </>
  );
};

"use client";

import { KeyIcon } from "@heroicons/react/16/solid";
import { Button, FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import classNames from "classnames";
import { useFormStatus } from "react-dom";

import { loadingMask } from "@/functions";
import { ILoginFormFields } from "@/types";

interface SignInFormFieldsProps {
  errors: Partial<ILoginFormFields>;
}
export const SignInFormFields = ({ errors }: SignInFormFieldsProps): JSX.Element => {
  const { pending } = useFormStatus();
  return (
    <div className={classNames("flex flex-col space-y-4", loadingMask({ loading: pending }))}>

      <FormControl
        error={!!errors.username}
        sx={{ gridColumn: "1/-1" }}
      >
        <FormLabel>username or email</FormLabel>
        <Input
          startDecorator="@"
          autoFocus
          autoComplete="off"
          name="username"
        />
        {errors.username && <FormHelperText>{errors.username}</FormHelperText>}
      </FormControl>

      <FormControl
        error={!!errors.password}
        sx={{ gridColumn: "1/-1" }}
      >
        <FormLabel>password</FormLabel>
        <Input
          startDecorator={<KeyIcon className="size-4" />}
          type="password"
          name="password"
        />
        {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
      </FormControl>

      <FormControl sx={{ gridColumn: "1/-1" }}>
        <Button
          type="submit"
          loading={pending}
        >log in
        </Button>
      </FormControl>
    </div>
  );
};

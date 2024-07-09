"use client";

import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { Button, FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import classNames from "classnames";
import { useFormStatus } from "react-dom";

import { loadingMask } from "@/functions";
import { ISignupFormFields } from "@/types";

interface SignUpFormFieldsProps {
  errors: Partial<ISignupFormFields>;
}

export const SignUpFormFields = ({ errors }: SignUpFormFieldsProps): JSX.Element => {
  const { pending } = useFormStatus();
  return (
    <div className={classNames("flex flex-col space-y-4", loadingMask({ loading: pending }))}>
      <FormControl
        error={!!errors.name}
        sx={{ gridColumn: "1/-1" }}
      >
        <FormLabel>name</FormLabel>
        <Input
          startDecorator={<UserIcon className="size-4" />}
          autoFocus
          autoComplete="off"
          name="name"
        />
        {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
      </FormControl>

      <FormControl
        error={!!errors.email}
        sx={{ gridColumn: "1/-1" }}
      >
        <FormLabel>email</FormLabel>
        <Input
          startDecorator={<EnvelopeIcon className="size-4" />}
          autoFocus
          autoComplete="off"
          name="email"
        />
        {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
      </FormControl>

      <FormControl
        error={!!errors.username}
        sx={{ gridColumn: "1/-1" }}
      >
        <FormLabel>username</FormLabel>
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
        >create account
        </Button>
      </FormControl>
    </div>
  );
};

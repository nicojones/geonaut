"use client";

import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { Button, FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import classNames from "classnames";
import { useFormStatus } from "react-dom";

import { loadingMask } from "@/functions";
import { IForgotPasswordFormFields } from "@/types";

interface ForgotPasswordFormFieldsProps {
  errors: Partial<IForgotPasswordFormFields>;
}
export const ForgotPasswordFormFields = ({ errors }: ForgotPasswordFormFieldsProps): JSX.Element => {
  const { pending } = useFormStatus();
  return (
    <div className={classNames("flex flex-col space-y-4", loadingMask({ loading: pending }))}>

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

      <FormControl sx={{ gridColumn: "1/-1" }}>
        <Button
          type="submit"
          loading={pending}
        >reset password
        </Button>
      </FormControl>
    </div>
  );
};

"use client";

import { EnvelopeIcon, KeyIcon } from "@heroicons/react/16/solid";
import { Button, FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import classNames from "classnames";
import { useFormStatus } from "react-dom";

import { loadingMask } from "@/functions";
import { IResetPasswordFormFields } from "@/types";

interface ResetPasswordFormFieldsProps {
  errors: Partial<IResetPasswordFormFields>;
  email: string;
}
export const ResetPasswordFormFields = ({ email, errors }: ResetPasswordFormFieldsProps): JSX.Element => {
  const { pending } = useFormStatus();
  return (
    <div className={classNames("flex flex-col space-y-4", loadingMask({ loading: pending }))}>

      <FormControl sx={{ gridColumn: "1/-1" }}>
        <FormLabel>email</FormLabel>
        <Input
          startDecorator={<EnvelopeIcon className="size-4" />}
          disabled
          value={email}
        />
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

      <FormControl
        error={!!errors.confirm}
        sx={{ gridColumn: "1/-1" }}
      >
        <FormLabel>confirm</FormLabel>
        <Input
          startDecorator={<KeyIcon className="size-4" />}
          type="password"
          name="confirm"
        />
        {errors.confirm && <FormHelperText>{errors.confirm}</FormHelperText>}
      </FormControl>

      <FormControl sx={{ gridColumn: "1/-1" }}>
        <Button
          type="submit"
          loading={pending}
        >set password
        </Button>
      </FormControl>
    </div>
  );
};

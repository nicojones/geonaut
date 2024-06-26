"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { Button } from "@mui/joy";
import { Dispatch, SetStateAction } from "react";

interface TogglePasswordProps {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}

export const TogglePassword = ({ showPassword, setShowPassword }: TogglePasswordProps): JSX.Element => {
  return (
    <Button variant="plain" onClick={() => setShowPassword(s => !s)}>
      {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
    </Button>
  );
};

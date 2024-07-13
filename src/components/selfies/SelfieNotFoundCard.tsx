
import { selfieNotFound } from "@/functions";
import { IClassName, ISelfie } from "@/types";

import { SelfieCard } from "./SelfieCard";

interface SelfieNotFoundCardProps extends IClassName {
  hash: string;
}

export const SelfieNotFoundCard = ({ hash }: SelfieNotFoundCardProps): JSX.Element => {
  const fakeSelfieData: ISelfie = selfieNotFound({ hash });
  return (
    <SelfieCard selfie={fakeSelfieData} disabled />
  );
};

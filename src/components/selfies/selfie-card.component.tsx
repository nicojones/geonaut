import { selfieLcImage, selfieMyImage } from "@/functions";
import { ISelfie } from "@/types";
import Image from "next/image";

interface SelfieCardProps {
  selfie: ISelfie;
}

export const SelfieCard = ({ selfie }: SelfieCardProps): JSX.Element => {
  return (
    <div className="flex flex-col">
      <div role="header" className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1>{selfie.title}</h1>
          <h2>{selfie.short_desc}</h2>
        </div>
        <div className="flex flex-col">
          <span>{selfie.added_on_words}</span>
          <span>{selfie.selfie_place}</span>
          <span>@{selfie.username}</span>
        </div>
      </div>

      <div role="content" className="flex flex-row">
        <img src={selfieMyImage(selfie.hash)} alt="My image" />
        <img src={selfieLcImage(selfie.hash)} alt="Landscape image" />
      </div>

    </div>
  )
};

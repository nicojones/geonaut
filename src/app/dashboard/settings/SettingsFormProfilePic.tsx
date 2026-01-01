import { Button, Card, FormControl, FormLabel, Skeleton } from "@mui/joy";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useJwtTokenContext } from "@/context";
import { dbGetSelfies } from "@/db/db-get-selfies.query";
import { range, selfieMyImage } from "@/functions";
import { ISelfie } from "@/types";

interface SettingsFormProfilePicProps {
  value: string;
  onChange: (value: string) => any;
}

interface ISelectSelfie {
  loaded: null /* unopened */ | false /* loading */ | true /* loaded */;
  data: ISelfie[] | null;
}

export const SettingsFormProfilePic = ({ value, onChange }: SettingsFormProfilePicProps): JSX.Element => {
  const { user } = useJwtTokenContext();
  const [allSelfies, setAllSelfies] = useState<ISelectSelfie>({ loaded: null, data: null });

  useEffect(() => {
    if (allSelfies.loaded !== false) {
      return;
    }
    if (allSelfies.data) {
      setAllSelfies(v => ({ ...v, loaded: true }));
    }
    dbGetSelfies({ selfId: user?.id, userId: user?.id, skip: 0, limit: 100000 })
      .then(_selfies => {
        setAllSelfies({ loaded: true, data: _selfies });
      });
  }, [allSelfies, user?.id]);

  const handleSelectProfilePicture = (hash: string): void => {
    setAllSelfies(v => ({ ...v, loaded: null }));
    onChange(hash);
  };

  return (
    <FormControl>
      <FormLabel>profile picture</FormLabel>
      {
        allSelfies.loaded === null
          ? (
            // Must be toggled
            <Button
              variant="plain"
              className="fric space-x-2"
              onClick={() => setAllSelfies(v => ({ ...v, loaded: false }))}
            >
              <Image
                className="w-36 aspect-[4/3] shrink-0 grow-0 rounded"
                src={selfieMyImage({ hash: value }, true)}
                width={666}
                height={500}
                alt="Profile picture"
              />
              <span>change</span>
            </Button>
          )
          : (
            <Card className="inline-block w-full">
              {
                !allSelfies.loaded
                  ? (
                    range(0, 24).map(k =>
                      <span
                        key={k}
                        className=" aspect-square w-4/12 md:w-3/12 lg:w-2/12 float-left relative p-1"
                      >
                        <Skeleton
                          key={k}
                          className="m-1 w-[calc(100%-8px)] h-[calc(100%-8px)]"
                          animation="wave"
                        />
                      </span>,
                    )
                  )
                  : (
                    (allSelfies.data ?? []).map(s =>
                      <Image
                        className={classNames(
                          "float-left transition-opacity hover:opacity-100 cursor-pointer w-4/12 md:w-3/12 lg:w-2/12",
                          { "opacity-40": s.hash !== value },
                        )}
                        key={s.hash}
                        src={selfieMyImage(s, true)}
                        width={250}
                        height={250}
                        alt={s.title}
                        onClick={() => handleSelectProfilePicture(s.hash)}
                      />,
                    )
                  )
              }
            </Card>
          )
      }
    </FormControl>
  );
};

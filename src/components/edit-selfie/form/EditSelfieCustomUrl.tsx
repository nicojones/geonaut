import classNames from "classnames";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

import { useEditSelfieContext, useJwtTokenContext } from "@/context";
import { raiseOnError } from "@/functions";

export const EditSelfieCustomUrl = (): JSX.Element => {
  const { api } = useJwtTokenContext();
  const { data, setSelfieData } = useEditSelfieContext();
  const [url, setUrl] = useState<string>(data.selfie.url || data.selfie.hash);
  const [urlTaken, setUrlTaken] = useState<boolean | undefined>(undefined);
  const checkUrlTimeoutRef = useRef<any>();
  const handleChangeUrl = (event: ChangeEvent<HTMLInputElement>): void => {
    clearTimeout(checkUrlTimeoutRef.current);
    const _url = (event.target.value ?? "").trim();
    setUrl(_url);

    if (_url.length === 0 || _url === data.selfie.hash) {
      setUrlTaken(undefined);
      return;
    } else if (_url.length < 5) {
      return;
    }
    checkUrlTimeoutRef.current = setTimeout(() => {
      api<any, any>({
        url: "/api/check-url",
        body: { hash: data.selfie.hash, url: _url },
      })
        .then(raiseOnError)
        .then(_r => {
          setSelfieData({ ...data.selfie, url: _url });
          setUrlTaken(false);
        })
        .catch(_e => {
          setUrlTaken(true);
          setSelfieData({ url: undefined });
          toast.error(String(_e));
        });
    }, 1000);
  };
  return (
    <div className={classNames(
      "fric text-xs subtle-hover",
      { "!text-red-500": urlTaken },
      { "!text-green-500": urlTaken === false },
    )}
    >
      <span>{process.env.NEXT_PUBLIC_API_URL}/s/</span>
      <input
        value={url}
        onChange={handleChangeUrl}
        className="bg-transparent text-xs border-none w-16 outline-none focus:outline-none"
        placeholder={data.selfie.hash}
      />
    </div>
  );
};

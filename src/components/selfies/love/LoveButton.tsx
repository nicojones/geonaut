import { HeartIcon } from "@heroicons/react/16/solid";

interface LoveButtonProps {
  count: number;
}

export const LoveButton = ({ count }: LoveButtonProps): JSX.Element => {
  return (
    <>
      <span className="absolute z-10 top-5 left-5 text-white translate-x-[-50%] translate-y-[-50%] text-sm inline-block">{count}</span>
      <HeartIcon className="size-10 text-red-500" />
    </>
  );
};

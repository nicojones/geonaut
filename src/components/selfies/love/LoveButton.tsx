import { HeartIcon } from "@heroicons/react/16/solid";

interface LoveButtonProps {
  count: number;
}

export const LoveButton = ({ count }: LoveButtonProps): JSX.Element => {
  return (
    <>
      <HeartIcon className="absolute top-0 mx-auto size-10 text-red-500" />
      <span className="relative z-10 top-2 w-full text-center text-white text-sm inline-block">{count}</span>
    </>
  );
};

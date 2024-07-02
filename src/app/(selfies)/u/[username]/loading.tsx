
import { LoadingPage } from "@/components/generic";

export default function Loading (): JSX.Element {
  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  return (
    <LoadingPage headerType="user" />
  );
}

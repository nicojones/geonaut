import classNames from "classnames";

/**
 * Everything @optional and @defaults to `false`
 */
export interface ILoadingMask {
  loading?: boolean;
  spinner?: boolean;
  fetching?: boolean;
}

export const loadingMask = (options: ILoadingMask): string =>
  classNames(
    "has-loading-mask",
    { "is-loading-mask": options.loading },
    { "cursor-wait": options.fetching },
    { "has-spinner": options.spinner },
  );

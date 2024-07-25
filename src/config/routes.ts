export const PROTECTED_ROUTES = [
  "/new",
  "/edit/(?:[^/]+)",
  "/discover",
  "/loves",
  "/dashboard/?(?:[^/]*)",
  "/auth/logout",
] as const;

export const ANONYMOUS_ROUTES = [
  "/auth/(?!logout)[^/]+",
];

export const REDIRECT_IF_UNAUTHORIZED = "/auth/sign-in";
export const REDIRECT_IF_ANONYMOUS = "/";
export const REDIRECT_IF_AUTHENTICATED = "/dashboard";

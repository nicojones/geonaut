export type ExcludeKeys<T, K extends keyof T> = Omit<T, K>;

type Falsy = false | null | undefined | 0 | "";

export type RemoveFalsy<T> = T extends Falsy ? never : T;

/**
 * Same as Pick<IObject, "a", "b"> but for string unions like:
 * @example
 * type MyWords = "my" | "favourite" | "words"
 * type MeMeMe = PickUnion<MyWords, "my">
 */
export type PickUnion<T, K extends T> = T extends K ? T : never;

import { IStorageKey } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class StorageService {
  public static flash = <T extends string | Record<string, any> | null>(
    key: IStorageKey,
    defaultValue: T,
  ): T => {
    const value = this.get(key, defaultValue);
    this.remove(key);
    return value;
  };

  public static get = <T extends string | Record<string, any> | null>(
    key: IStorageKey,
    defaultValue: T,
  ): T => {
    const item = sessionStorage.getItem(key);
    if (!item) {
      return defaultValue;
    } else {
      try {
        return JSON.parse(item);
      } catch (e) {
        return defaultValue;
      }
    }
  };

  public static set = <T extends string | Record<string, any> | null = string>(
    key: IStorageKey,
    value: T,
  ): void => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  public static upsert = <T extends string | Record<string, any> | null = string>(
    key: IStorageKey,
    setter: (current: T | null) => T,
  ): void => {
    const currentValue = StorageService.get(key, null);
    sessionStorage.setItem(key, JSON.stringify(setter(currentValue)));
  };

  public static remove = (key: IStorageKey): void => {
    sessionStorage.removeItem(key);
  };
}

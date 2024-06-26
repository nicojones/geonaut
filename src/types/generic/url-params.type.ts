export interface IUrlParams<T extends string = string, SP extends string = never> {
  params: Record<T, string>;
  searchParams: Record<SP, string>;
}

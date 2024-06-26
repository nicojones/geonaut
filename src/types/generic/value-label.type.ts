export interface IValueLabel<
  ValueType extends string | number = string | number,
  LabelType = ValueType | JSX.Element,
> {
  value: ValueType;
  label: LabelType;
}

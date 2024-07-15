export const pluralise = (amount: number, translations: [string, string]): string =>
  `${amount} ${translations[Number(amount !== 1)]}`;

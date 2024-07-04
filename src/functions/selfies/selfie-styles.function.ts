export const selfieBackgroundStyle = (leftColor: string, rightColor: string): string =>
  `linear-gradient(0.25turn,rgb(${leftColor}),rgb(${rightColor}))`;

export const selfieBoxShadowStyle = (color: string): string =>
  `0 1px 60px 20px rgb(${color})`;

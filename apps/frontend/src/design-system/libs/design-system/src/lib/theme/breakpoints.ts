export type Breakpoints = typeof breakpoints;

export const breakpoints = {
  xs: 0, // smartphones
  s: 768, // tablets
  m: 1024, // small desktop
  l: 1280, // desktop
  xl: 1440, // large desktop
} as const;

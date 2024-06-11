export const themes = ["light", "dark", "system"] as const;
export type Themes = typeof themes;
export type Theme = (typeof themes)[number];

export const themeConfig = {
  cookie: {
    name: "rc-jereko-theme",
    expires: 365,
  },
} as const;

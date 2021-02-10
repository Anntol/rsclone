export interface Mode {
 name: string,
 properties: any,
}

export const LIGHT: Mode = {
  name: "light",
  properties: {
  "--color-black": "#000",
  "--color-white": "#FFF",
  "--color-success": "#00BF32",
  "--color-error": "#FF1E00",

  "--primary-color": "#15a4cb", // left-menu-color
  "--primary-color-btn": "#15a4cb", // btn-color
  "--primary-text-color": "#fefefe", // btn-text-color, logo-color, bg-card-color
  "--accent-color": "#FF4081",
  "--accent-color-dark": "#C2185B",
  "--accent-violet-color": "#783b78", // text-color-accent, footer
  "--secondary-text-color": "#151515", // text-color-base
  "--color-white-alt": "#EBECF0", // bg-base-color

  "--color-violet-op04": "#783b7866",
  "--color-black-op04": "#14141466",
  "--color-white-op04": "#ffffff66",
  "--color-white-op08": "#ffffffcc",

  "--shadow-ligth": "#fafbfff2",
  "--shadow-dark": "#0028780c",
  "--shadow-accent": "#763a76b9",
  }
}

export const DARK: Mode = {
  name: "dark",
  properties: {
  "--color-black": "#000",
  "--color-white": "#FFF",
  "--color-success": "#00BF32",
  "--color-error": "#FF1E00",

  "--primary-color": "#252C42", // left-menu-color
  "--primary-color-btn": "#1381ff", // btn-color
  "--primary-text-color": "#252C42", // btn-text-color
  "--accent-color": "#FF4081",
  "--accent-color-dark": "#C2185B",
  "--accent-violet-color": "#fefefe", // text-color-accent, footer
  "--secondary-text-color": "#fefefe", // text-color-base
  "--color-white-alt": "#131924", // bg-base-color

  "--color-violet-op04": "#783b7866",
  "--color-black-op04": "#14141466",
  "--color-white-op04": "#ffffff66",
  "--color-white-op08": "#ffffffcc",

  "--shadow-ligth": "#fafbfff2",
  "--shadow-dark": "#0028780c",
  "--shadow-accent": "#763a76b9",
  }
}

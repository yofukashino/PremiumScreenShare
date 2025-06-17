import Types from "./types";
export default [
  {
    find: "this.setDesktopEncodingOptions",
    replacements: [
      {
        match: /\|\|\w+\.bitrateMax!==\w+/,
        replace: () => ``,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];

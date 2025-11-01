import Types from "./types";
export default [
  {
    find: "this.setDesktopEncodingOptions",
    replacements: [
      {
        match: /0===\w+&&\w+>=10\|\|\w+>720\|\|\w+>30\?O.\w+:\w+.\w+/,
        replace: (suffix: string) =>
          `replugged.plugins.getExports("dev.tharki.PremiumScreenShare")._getBirtate(...arguments)?.bitrateMax??(${suffix})`,
      },
      {
        match: /.setGoliveQuality\({/,
        replace: () =>
          `.setGoliveQuality({...(replugged.plugins.getExports("dev.tharki.PremiumScreenShare")._getBirtate(...arguments)??{}),`,
      },
    ],
  },
  {
    find: "stream-options",
    replacements: [
      {
        match: /("frame-rate",label:\w+\.intl\.string\(\w+\.\w+\.\w+\),children:)(\w+)\.map/,
        replace: (_, prefix: string, fps: string) =>
          `${prefix}(replugged.plugins.getExports("dev.tharki.PremiumScreenShare")._getFPS() ?? ${fps}).map`,
      },
      {
        match: /("resolution",label:\w+\.intl\.string\(\w+\.\w+\.\w+\),children:)(\w+)\.filter/,
        replace: (_, prefix: string, resolution: string) =>
          `${prefix}(replugged.plugins.getExports("dev.tharki.PremiumScreenShare")._getResolution(${resolution}) ?? ${resolution}).filter`,
      },
    ],
  },
  {
    find: "getGoliveLQQuality()",
    replacements: [
      {
        match: /Math\.min/g,
        replace: () => "Math.max",
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];

import { ApplicationStreamingOptionStore } from "./requiredModules.jsx";
export const defaultSettings = {
  fps: {
    1: 15,
    2: 30,
    3: 60,
  },
  resolution: {
    1: 480,
    2: 720,
    3: 1080,
  },
  smoothVideo: {
    resolution: 720,
    fps: 60,
  },
  betterReadability: {
    resolution: 0,
    fps: 60,
  },
};
export const defaultParameters = Object.freeze({
  LY: Object.freeze(Object.assign({}, ApplicationStreamingOptionStore?.LY)),
  ND: Object.freeze(ApplicationStreamingOptionStore?.ND?.map((n) => Object.freeze(n))),
  WC: Object.freeze(ApplicationStreamingOptionStore?.WC?.map((n) => Object.freeze(n))),
  af: Object.freeze(ApplicationStreamingOptionStore?.af?.map((n) => Object.freeze(n))),
  k0: Object.freeze(ApplicationStreamingOptionStore?.k0?.map((n) => Object.freeze(n))),
  km: Object.freeze(ApplicationStreamingOptionStore?.km?.map((n) => Object.freeze(n))),
  no: Object.freeze(Object.assign({}, ApplicationStreamingOptionStore?.no)),
  ws: Object.freeze(Object.assign({}, ApplicationStreamingOptionStore?.ws)),
});
console.log(defaultParameters);

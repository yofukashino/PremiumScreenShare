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
export const fpsOptions = [
  {
    label: "5 FPS",
    value: 5,
  },
  {
    label: "10 FPS",
    value: 10,
  },
  {
    label: "15 FPS",
    value: 15,
  },
  {
    label: "30 FPS",
    value: 30,
  },
  {
    label: "45 FPS",
    value: 45,
  },
  {
    label: "60 FPS",
    value: 60,
  },
  {
    label: "120 FPS",
    value: 120,
  },
  {
    label: "144 FPS",
    value: 144,
  },
  {
    label: "240 FPS",
    value: 240,
  },
  {
    label: "360 FPS",
    value: 360,
  },
];
export const resoOptions = [
  {
    label: "144p",
    value: 144,
  },
  {
    label: "240p",
    value: 240,
  },
  {
    label: "360p",
    value: 360,
  },
  {
    label: "480p",
    value: 480,
  },
  {
    label: "720p",
    value: 720,
  },
  {
    label: "1080p",
    value: 1080,
  },
  {
    label: "1440p",
    value: 1440,
  },
  {
    label: "2160p",
    value: 2160,
  },
];
export const resoWithSource = [
  {
    label: "Source",
    value: 0,
  },
  ...resoOptions,
];
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

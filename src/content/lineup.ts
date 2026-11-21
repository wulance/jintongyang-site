import type { Localized } from "@/i18n/config";

export interface StageDesign {
  /** Product id; the design needs a cut-out. */
  id: number;
  /** Colour of the light it stands in, taken from the toy itself. */
  light: string;
  /** What the designer decided, as visible on the finished toy. */
  details: Localized[];
}

/** The designs that take turns in the spotlight on the home page. */
export const stageLineup: StageDesign[] = [
  {
    id: 730, light: "#8fdc8a",
    details: [
      { en: "Lotus-leaf cap", zh: "荷叶帽" },
      { en: "Cross-body satchel", zh: "斜挎小包" },
      { en: "Blushed cheeks", zh: "腮红晕染" },
    ],
  },
  {
    id: 717, light: "#ff9fb6",
    details: [
      { en: "Party hat with pom-pom", zh: "毛球生日帽" },
      { en: "Pinstripe dungarees", zh: "细条纹背带裤" },
      { en: "Satin bow tie", zh: "缎面领结" },
    ],
  },
  {
    id: 719, light: "#a9d8f5",
    details: [
      { en: "Lop ears", zh: "折耳" },
      { en: "Star-print tulle dress", zh: "星星纱裙" },
      { en: "Embroidered lashes", zh: "刺绣睫毛" },
    ],
  },
  {
    id: 720, light: "#ff7a2f",
    details: [
      { en: "Name-printed jersey", zh: "球衣可印名字" },
      { en: "Stitched football", zh: "缝制足球" },
      { en: "Parent and child sizes", zh: "亲子大小款" },
    ],
  },
  {
    id: 708, light: "#ffd046",
    details: [
      { en: "Curly fleece", zh: "卷毛绒" },
      { en: "Leaf sprout", zh: "头顶叶芽" },
      { en: "A persimmon to hold", zh: "手捧柿子" },
    ],
  },
  {
    id: 718, light: "#f0b98c",
    details: [
      { en: "Ringed tail", zh: "环纹尾巴" },
      { en: "Heart-patch dungarees", zh: "爱心背带裤" },
      { en: "Embroidered paw pads", zh: "刺绣肉垫" },
    ],
  },
  {
    id: 731, light: "#9cc4f2",
    details: [
      { en: "Polka-dot balloon", zh: "波点气球" },
      { en: "Oversized soft ears", zh: "大软耳" },
      { en: "Two-tone belly", zh: "双色肚皮" },
    ],
  },
];

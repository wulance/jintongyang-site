import type { Localized } from "@/i18n/config";

/**
 * Everything here is taken from jintongyang.com (archived 2026-11-20).
 * Figures are the company's own statements and have not been independently verified.
 */
export const company = {
  legalName: { en: "Hebei Jintongyang Toys Co., Ltd.", zh: "河北金彤阳玩具有限公司" } satisfies Localized,
  shortName: { en: "Jintongyang", zh: "金彤阳" } satisfies Localized,
  brands: { en: ["Jintongyang", "Mengbixiong"], zh: ["金彤阳", "梦比熊"] } satisfies Localized<string[]>,
  contact: {
    person: { en: "Manager Feng", zh: "冯经理" } satisfies Localized,
    phoneDisplay: "+86 159 3352 5222",
    phoneHref: "tel:+8615933525222",
    address: {
      en: "Shops 10–12, south side of Fangyuan West Road, Neiqiu Industrial Park (North Zone), Neiqiu County, Xingtai, Hebei, China",
      zh: "河北内丘工业园区（北园）方圆西路南侧 10-12 门市",
    } satisfies Localized,
  },
  sourceUrl: "https://www.jintongyang.com/",
};

export interface Fact {
  value: string;
  label: Localized;
}

export const facts: Fact[] = [
  { value: "1M", label: { en: "pieces a month at peak output", zh: "件 · 单月出货量可达" } },
  { value: "20+", label: { en: "standardised workshops", zh: "座标准化生产车间" } },
  { value: "300+", label: { en: "people on staff", zh: "名在岗员工" } },
  { value: "500+", label: { en: "high-speed sewing machines", zh: "台高速缝纫机" } },
];

export const equipment: Fact[] = [
  { value: "45", label: { en: "computerised embroidery machines", zh: "台电脑绣花机" } },
  { value: "40", label: { en: "cutting machines", zh: "台专业裁剪机" } },
  { value: "20", label: { en: "automatic filling machines", zh: "台全自动充棉机" } },
  { value: "500+", label: { en: "high-speed sewing machines", zh: "台高速缝纫机" } },
];

export const standardSizes: Localized = {
  en: "8, 10 and 15 inch as standard; other sizes to order",
  zh: "常规八寸、十寸、十五寸，其他尺寸可定制",
};

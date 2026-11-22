import type { Product } from "./types";

/**
 * Catalogue curated from the 43 items on jintongyang.com.
 * English names are working translations. Items whose only photo is a multi-product
 * poster, shows a model, or resembles third-party characters are left out until cleared.
 */
export const products: Product[] = [
  // Gift plush
  {
    id: 708, slug: "persimmon-lamb", category: "gift", images: [708, 742],
    name: { en: "Persimmon Lamb", zh: "柿子羊" },
  },
  {
    id: 707, slug: "dress-lamb", category: "gift", images: [707],
    name: { en: "Dress Lamb", zh: "裙子羊" },
    summary: {
      en: "A lamb in a finely made little dress. Sweet, soft and carefully finished; suited to children's gifts and home décor.",
      zh: "小羊造型搭配精致小裙子设计，外观甜美软萌，做工精细，适合作为儿童礼物、家居装饰。",
    },
  },
  { id: 709, slug: "storybook-lamb", category: "gift", images: [709], name: { en: "Storybook Lamb", zh: "书本羊" } },
  { id: 710, slug: "star-lamb", category: "gift", images: [710], name: { en: "Star Lamb", zh: "五星羊" } },
  {
    id: 713, slug: "cloud-cushion", category: "gift", images: [713],
    name: { en: "Cloud Cushion", zh: "云朵抱枕" },
    summary: {
      en: "Cloud-shaped and generously filled, soft against the skin. Works as a sofa cushion or a car pillow.",
      zh: "采用云朵造型设计，填充饱满蓬松，手感柔软亲肤，可作为居家靠垫、车载靠枕使用。",
    },
  },
  {
    id: 712, slug: "glow-bunny", category: "gift", images: [712], options: ["light"],
    name: { en: "Glow Bunny", zh: "荧光兔子" },
    summary: {
      en: "A lively bunny with a built-in light module that doubles as a night light. Fits designer-toy and gift ranges.",
      zh: "内置发光灯组设计，兔子造型灵动可爱，夜间可作小夜灯使用，适配潮玩、礼品等场景。",
    },
  },
  { id: 711, slug: "glow-fox", category: "gift", images: [711], options: ["light"], name: { en: "Glow Fox", zh: "荧光狐狸" } },

  // Character plush
  {
    id: 714, slug: "baker-pig", category: "character", images: [714, 743],
    name: { en: "Baker Pig", zh: "烘焙猪" },
    summary: {
      en: "A pig family in bakery outfits. Charmingly round, in skin-friendly, odour-free fabric; made for display and gifting.",
      zh: "以小猪为原型搭配烘焙元素设计，造型憨态可掬，面料亲肤无异味，适合做摆件、礼品。",
    },
  },
  {
    id: 717, slug: "birthday-monkey", category: "character", images: [717],
    name: { en: "Birthday Monkey", zh: "生日猴子" },
    summary: {
      en: "Designed for birthdays: a cheerful monkey that works as a party favour or table decoration.",
      zh: "专为生日场景设计的猴子造型玩偶，造型活泼喜庆，可作为生日伴手礼、派对装饰使用。",
    },
  },
  {
    id: 719, slug: "princess-lop-bunny", category: "character", images: [719],
    name: { en: "Princess Lop Bunny", zh: "折耳公主兔" },
    summary: {
      en: "A lop-eared bunny in a princess dress, with fine, fluffy pile. A holiday gift or a shelf piece.",
      zh: "采用折耳兔造型搭配公主风设计，绒毛蓬松细腻，手感柔软，适合作为节日礼品、家居摆件。",
    },
  },
  {
    id: 720, slug: "football-fox", category: "character", images: [720, 736], options: ["logo"],
    name: { en: "Football Fox", zh: "足球狐狸" },
    summary: {
      en: "A fox in a football kit, lively in shape and soft to the touch. For gifting and home display.",
      zh: "以狐狸为原型搭配足球元素设计，造型生动可爱，面料柔软亲肤，可作礼品、家居摆件使用。",
    },
  },
  { id: 718, slug: "raccoon-bear", category: "character", images: [718], name: { en: "Raccoon Bear", zh: "熊小浣" } },

  // Plush figures
  {
    id: 730, slug: "aquarium-penguin", category: "figures", images: [730, 735],
    name: { en: "Aquarium Penguin", zh: "海洋馆企鹅" },
  },
  { id: 731, slug: "balloon-elephant", category: "figures", images: [731], name: { en: "Balloon Elephant", zh: "气球小象" } },
  { id: 732, slug: "strawberry-penguin", category: "figures", images: [732], name: { en: "Strawberry Penguin", zh: "网红企鹅" } },
  { id: 733, slug: "xinjiang-lamb", category: "figures", images: [733], name: { en: "Xinjiang Lamb", zh: "新疆小羊" } },
  { id: 734, slug: "duck-and-friends", category: "figures", images: [734], name: { en: "Duck & Friends", zh: "鸭公仔" } },

  // Home & cuddle
  { id: 739, slug: "sofa-panda", category: "home", images: [739], name: { en: "Sofa Panda", zh: "熊猫" } },
  { id: 740, slug: "long-fox", category: "home", images: [740], name: { en: "Long Fox", zh: "长条狐狸" } },
  { id: 737, slug: "pig-pair", category: "home", images: [737], focus: "50% 30%", name: { en: "Pig Pair", zh: "情侣小猪" } },
  { id: 738, slug: "blue-cat", category: "home", images: [738], name: { en: "Blue Cat", zh: "蓝白猫" } },

  // Claw machine
  { id: 729, slug: "claw-assortment", category: "claw-machine", images: [729], name: { en: "Mixed Assortment", zh: "抓机娃娃组合" } },
  { id: 726, slug: "beret-elephant", category: "claw-machine", images: [726], name: { en: "Beret Elephant", zh: "贝雷帽小象" } },
  { id: 724, slug: "claw-six-pack", category: "claw-machine", images: [724], name: { en: "Six-Style Set", zh: "六款组合" } },

  // Ruan Tuan Tuan
  { id: 704, slug: "ruan-tuan-tuan-puppy", category: "ruan-tuan-tuan", images: [704], name: { en: "Ruan Tuan Tuan Puppy", zh: "软团团 小狗" } },
  { id: 703, slug: "ruan-tuan-tuan-penguin", category: "ruan-tuan-tuan", images: [703], name: { en: "Ruan Tuan Tuan Penguin", zh: "软团团 企鹅" } },
];

/** Styles from other collections that fill up "related styles" on a product page. */
export const featuredIds = [714, 739, 719, 730, 710, 740, 731];

export type Language = 'hu' | 'en';

export interface HeroSlide {
  id: string;
  tag: string;
  titleLine1: string;
  titleAccent: string;
  bgWord: string;
  ingredients: string;
  priceValue: string;
  numericPrice: number;
  kcal: number;
  image: string;
  comboEligible?: boolean;
  layerLabels: string[];
}

export interface ItemVariant {
  id: string;
  label: string;
  price: number;
  priceDisplay: string;
  kcal: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  numericPrice: number;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  image: string;
  badge?: string;
  spicy?: boolean;
  cheeseLover?: boolean;
  smashBeef?: boolean;
  poultry?: boolean;
  vegetarian?: boolean;
  menuUpgradeable?: boolean;
  variants?: ItemVariant[];
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
}

export interface ExtraAddon {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  kcal: number;
  category: 'side' | 'sauce';
}

export interface PromoCard {
  id: string;
  visualType: 'responders' | 'group';
  visualLabels: string[];
  badge: string;
  discountText: string;
  title: string;
  highlights: string[];
  footnote: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  categoryLabel: string;
}

export interface ReviewExtra {
  label: string;
  value: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  googleLink: string;
  extras?: ReviewExtra[];
}

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface SiteDictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    menu: string;
    promos: string;
    about: string;
    gallery: string;
    reviews: string;
    contact: string;
    cartLabel: string;
  };
  hero: {
    eyebrow: string;
    orderNowCta: string;
    addToCartCta: string;
    menuCta: string;
    comboTag: string;
    includedComboTag: string;
    scrollHint: string;
    prevSlideAria: string;
    nextSlideAria: string;
    slides: HeroSlide[];
    marqueeItems: string[];
  };
  menuSection: {
    badge: string;
    title: string;
    searchPlaceholder: string;
    allCategoriesLabel: string;
    jumpToCategoriesLabel: string;
    showMoreLabel: string;
    showLessLabel: string;
    noResultsLabel: string;
    itemsCountLabel: string;
    addToCartLabel: string;
    menuUpgradeToggleLabel: string;
    sortLabels: {
      nameAsc: string;
      nameDesc: string;
      priceAsc: string;
      priceDesc: string;
    };
    nutrition: {
      toggleLabel: string;
      energy: string;
      protein: string;
      carbs: string;
      fat: string;
      comboBonusLabel: string;
      comboBonusKcal: number;
      disclaimer: string;
    };
    filterLabels: {
      smashBeef: string;
      cheeseLover: string;
      spicy: string;
      poultry: string;
    };
    comboStrip: {
      title: string;
      subtitle: string;
      price: string;
      sidesTitle: string;
      sidesIncluded: string[];
      saucesTitle: string;
    };
    extraAddons: ExtraAddon[];
    categories: MenuCategory[];
  };
  cart: {
    title: string;
    emptyTitle: string;
    emptySub: string;
    comboLabel: string;
    subtotalLabel: string;
    discountToggle10: string;
    discountToggle20: string;
    finalTotalLabel: string;
    callToOrderCta: string;
    clearCartLabel: string;
    kcalToggleLabel: string;
    kcalTotalLabel: string;
    kcalDisclaimer: string;
  };
  promos: {
    badge: string;
    title: string;
    cards: PromoCard[];
  };
  about: {
    badge: string;
    title: string;
    lead: string;
    paragraphs: string[];
    socialPrompt: string;
    stickerCaptions: {
      gyros: string;
      burger: string;
    };
    stats: { value: string; label: string }[];
  };
  gallery: {
    badge: string;
    title: string;
    items: GalleryItem[];
  };
  reviews: {
    badge: string;
    title: string;
    ratingScore: string;
    reviewCountBadge: string;
    viewAllLabel: string;
    writeReviewLabel: string;
    moreLabel: string;
    lessLabel: string;
    items: ReviewItem[];
  };
  contact: {
    badge: string;
    title: string;
    addressLabel: string;
    addressValue: string;
    phoneLabel: string;
    phoneDisplay: string;
    messengerLabel: string;
    messengerValue: string;
    messengerCta: string;
    socialLabel: string;
    socialSub: string;
    hoursTitle: string;
    hoursRows: { day: string; time: string; isClosed?: boolean }[];
    directionsCta: string;
  };
  footer: {
    tagline: string;
    quickLinksTitle: string;
    contactTitle: string;
    legalTitle: string;
    termsLabel: string;
    privacyLabel: string;
    rightsReserved: string;
    demoNotice: string;
  };
  legal: {
    closeLabel: string;
    termsTitle: string;
    termsUpdated: string;
    termsSections: LegalSection[];
    privacyTitle: string;
    privacyUpdated: string;
    privacySections: LegalSection[];
  };
}

declare global {
  interface Window {
    __lenis?: {
      scrollTo: (
        target: HTMLElement | string | number,
        options?: { offset?: number; duration?: number }
      ) => void;
      stop: () => void;
      start: () => void;
    };
  }
}

export const businessInfo = {
  name: 'Gyros & Go',
  legalName: 'Gyros & Go Gyorsétterem',
  phoneRaw: '+36303335114',
  phoneTel: 'tel:+36303335114',
  phoneDisplay: '+36 30 333 5114',
  address: '4300 Nyírbátor, Szentvér út 19.',
  streetAddress: 'Szentvér út 19.',
  city: 'Nyírbátor',
  postalCode: '4300',
  country: 'HU',
  geo: {
    lat: 47.8351132,
    lng: 22.1369672,
  },
  facebookUrl: 'https://www.facebook.com/profile.php?id=61576193392666',
  messengerUrl: 'https://m.me/61576193392666',
  instagramUrl: 'https://www.instagram.com/gyrosgo.hu/',
  tiktokUrl: 'https://www.tiktok.com/@gyrosgo1/',
  googleMapsUrl:
    'https://www.google.com/maps/place/Gyros%26Go/@47.8351132,22.1343869,17z/data=!4m6!3m5!1s0x474781004df2d89b:0x401c1bd5b7fcfa12!8m2!3d47.8351132!4d22.1369672!16s%2Fg%2F11ysm18x0c',
  googleReviewsUrl:
    'https://www.google.com/maps/place/Gyros%26Go/@47.8351132,22.1343869,17z/data=!4m6!3m5!1s0x474781004df2d89b:0x401c1bd5b7fcfa12!8m2!3d47.8351132!4d22.1369672!16s%2Fg%2F11ysm18x0c',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/dir//4300+Ny%C3%ADrb%C3%A1tor,+Szentv%C3%A9r+%C3%BAt+19.',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=Gyros%26Go+Ny%C3%ADrb%C3%A1tor+Szentv%C3%A9r+%C3%BAt+19&output=embed',
};

export const siteData: Record<Language, SiteDictionary> = {
  hu: {
    meta: {
      title: 'Gyros & Go Nyírbátor | Smash Burger • Gyros • Frissensültek',
      description:
        'Gyros & Go Nyírbátor (Szentvér út 19.). 100% marha smash burgerek, gyros, 6-os Smash Box, Cheddar Sajtőrület, frissensültek és házi mártások.',
    },
    nav: {
      home: 'Főoldal',
      menu: 'Étlap',
      promos: 'Kedvezmények',
      about: 'Étterem',
      gallery: 'Galéria',
      reviews: 'Vélemények',
      contact: 'Kapcsolat',
      cartLabel: 'Kosár',
    },
    hero: {
      eyebrow: 'NYÍRBÁTOR • SZENTVÉR ÚT 19.',
      orderNowCta: '+36 30 333 5114',
      addToCartCta: '+ Kosárba',
      menuCta: 'Étlap',
      comboTag: 'Menüben +700 Ft (Krumpli + 0.33l üdítő)',
      includedComboTag: '2 adag sült krumpli + 2 szósz az árban',
      scrollHint: 'Görgess',
      prevSlideAria: 'Előző kiemelt étel',
      nextSlideAria: 'Következő kiemelt étel',
      slides: [
        {
          id: 'dupla-smash-burger',
          tag: '100% MARHA SMASH',
          titleLine1: 'DUPLA HÚSOS',
          titleAccent: 'SMASH BURGER',
          bgWord: 'SMASH',
          ingredients:
            '150g smash marhahús • pirított bacon • cheddar szósz • csemegeuborka • házi burger szósz',
          priceValue: '2 700 Ft',
          numericPrice: 2700,
          kcal: 860,
          image: '/images/menu/dupla-smash-burger.jpg',
          comboEligible: true,
          layerLabels: [
            'Pirított briós buci',
            'Ropogós bacon & uborka',
            'Smash marhahús & cheddar',
            'Smash marhahús & házi szósz',
            'Pirított buci alap',
          ],
        },
        {
          id: 'smash-box-6db',
          tag: 'BEVEZETŐ AJÁNLAT',
          titleLine1: '6 DB-OS MINI',
          titleAccent: 'SMASH BOX',
          bgWord: 'BOX',
          ingredients:
            '6 db mini Smash Burger • 2 adag ropogós sült krumpli • 2 db szabadon választható szósz',
          priceValue: '4 900 Ft',
          numericPrice: 4900,
          kcal: 2480,
          image: '/images/menu/smash-box-1.jpg',
          comboEligible: false,
          layerLabels: [
            '3 db klasszikus mini Smash Burger',
            '3 db baconos mini Smash Burger',
            '2 adag sült krumpli & 2 mártogatós',
            'Street-food box tálca',
          ],
        },
        {
          id: 'cheddar-sajtorulet',
          tag: 'FOLYÉKONY CHEDDAR ÁR',
          titleLine1: 'CHEDDAR',
          titleAccent: 'SAJTŐRÜLET',
          bgWord: 'CHEDDAR',
          ingredients:
            'Forró folyékony cheddar sajtszósz • marhahús • lilahagyma lekvár • bacon • hagymakarika',
          priceValue: '3 400 Ft',
          numericPrice: 3400,
          kcal: 980,
          image: '/images/menu/cheddar-sajtorulet.jpg',
          comboEligible: true,
          layerLabels: [
            'Ropogós hagymakarika & briós buci',
            'Folyékony cheddar sajtszósz',
            'Sült bacon & lilahagyma lekvár',
            'Smash marhahús & cheddar',
            'Pirított briós alap',
          ],
        },
      ],
      marqueeItems: [
        'GYORSAN. FINOMAT. NEKED!',
        '100% MARHA SMASH BURGER',
        '6 DB-OS SMASH BOX 4 900 FT',
        'CHEDDAR SAJTŐRÜLET 3 400 FT',
        'GYROS & KEBAB',
        'MENÜ UPGRADE +700 FT',
      ],
    },
    menuSection: {
      badge: 'KÍNÁLAT',
      title: 'ÉTLAP',
      searchPlaceholder: 'Keresés (pl. smash box, gyros, cheddar)...',
      allCategoriesLabel: 'Összes',
      jumpToCategoriesLabel: 'Kategóriák',
      showMoreLabel: 'Összes megjelenítése',
      showLessLabel: 'Kevesebb',
      noResultsLabel: 'Nincs találat.',
      itemsCountLabel: 'tétel',
      addToCartLabel: '+ Kosárba',
      menuUpgradeToggleLabel: '+ Menü (+700 Ft)',
      sortLabels: {
        nameAsc: 'A–Z',
        nameDesc: 'Z–A',
        priceAsc: 'Ár ↑',
        priceDesc: 'Ár ↓',
      },
      nutrition: {
        toggleLabel: 'kcal',
        energy: 'Kalória',
        protein: 'Fehérje',
        carbs: 'Szénhidrát',
        fat: 'Zsír',
        comboBonusLabel: '+ Menü (+460 kcal)',
        comboBonusKcal: 460,
        disclaimer: 'Kalkulált becslés, ±15% eltérés lehetséges.',
      },
      filterLabels: {
        smashBeef: 'Marha',
        cheeseLover: 'Sajtos',
        spicy: 'Csípős',
        poultry: 'Csirke',
      },
      comboStrip: {
        title: 'MENÜ UPGRADE',
        subtitle:
          'Hamburgerek, Gyros kifli, Wrap & Go, Pita vagy Nuggets mellé: burgonya + 0.33l üdítő',
        price: '+700 Ft',
        sidesTitle: 'Köretek',
        sidesIncluded: ['Hasábburgonya', 'Steak burgonya', 'Hercegnő burgonya', 'Rizs'],
        saucesTitle: 'Extra Köret & Mártások',
      },
      extraAddons: [
        {
          id: 'addon-edesburgonya',
          name: 'Édesburgonya felár',
          price: 500,
          priceDisplay: '+500 Ft',
          kcal: 80,
          category: 'side',
        },
        {
          id: 'addon-cheddar',
          name: 'Prémium Cheddar szósz',
          price: 600,
          priceDisplay: '600 Ft',
          kcal: 210,
          category: 'sauce',
        },
        {
          id: 'addon-tartar',
          name: 'Tartármártás',
          price: 300,
          priceDisplay: '300 Ft',
          kcal: 190,
          category: 'sauce',
        },
        {
          id: 'addon-tzatziki',
          name: 'Tzatziki mártás',
          price: 300,
          priceDisplay: '300 Ft',
          kcal: 110,
          category: 'sauce',
        },
        {
          id: 'addon-csipos',
          name: 'Csípős mártás',
          price: 300,
          priceDisplay: '300 Ft',
          kcal: 95,
          category: 'sauce',
        },
        {
          id: 'addon-joghurt',
          name: 'Joghurtos mártás',
          price: 300,
          priceDisplay: '300 Ft',
          kcal: 105,
          category: 'sauce',
        },
      ],
      categories: [
        {
          id: 'hamburgerek',
          title: 'Hamburgerek & Boxok',
          subtitle: '100% marhahús • 6-os Smash Box • Folyékony cheddar',
          items: [
            {
              id: 'smash-box-6db',
              name: '6 db-os Smash Box',
              description:
                '6 db mini Smash Burger, 2 adag ropogós sült krumpli, 2 db szabadon választható szósz',
              price: '4 900 Ft',
              numericPrice: 4900,
              kcal: 2480,
              proteinG: 118,
              carbsG: 215,
              fatG: 128,
              image: '/images/menu/smash-box-1.jpg',
              badge: 'Box',
              smashBeef: true,
              cheeseLover: true,
            },
            {
              id: 'cheddar-sajtos-burger',
              name: 'Cheddar Sajtos Hamburger',
              description:
                '85 g marhahús, cheddar sajt, lilahagyma lekvár, uborka, bacon, cheddar sajtszósz',
              price: '3 700 Ft',
              numericPrice: 3700,
              kcal: 940,
              proteinG: 42,
              carbsG: 52,
              fatG: 62,
              image: '/images/menu/cheddar-sajtos-burger.jpg',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'cheddar-sajtorulet',
              name: 'Cheddar Sajtőrület',
              description:
                'Forró folyékony cheddar sajtszósz, marhahús, választható feltét: sonka / jalapeño / bacon / cheddar',
              price: '3 400 Ft',
              numericPrice: 3400,
              kcal: 980,
              proteinG: 46,
              carbsG: 54,
              fatG: 64,
              image: '/images/menu/cheddar-sajtorulet.jpg',
              badge: '4 féle',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
              variants: [
                {
                  id: 'bacon',
                  label: 'Bacon',
                  price: 3400,
                  priceDisplay: '3 400 Ft',
                  kcal: 990,
                },
                {
                  id: 'cheddar',
                  label: 'Cheddar',
                  price: 3400,
                  priceDisplay: '3 400 Ft',
                  kcal: 1020,
                },
                {
                  id: 'jalapeno',
                  label: 'Jalapeño',
                  price: 3400,
                  priceDisplay: '3 400 Ft',
                  kcal: 920,
                },
                {
                  id: 'sonka',
                  label: 'Sonka',
                  price: 3400,
                  priceDisplay: '3 400 Ft',
                  kcal: 940,
                },
              ],
            },
            {
              id: 'crispy-burger',
              name: 'Crispy Burger',
              description: 'Cornflakes bundás rántott hús, majonéz, salátalevél, hagyma, BBQ szósz',
              price: '2 900 Ft',
              numericPrice: 2900,
              kcal: 790,
              proteinG: 36,
              carbsG: 62,
              fatG: 44,
              image: '/images/menu/crispy-burger.jpg',
              poultry: true,
              menuUpgradeable: true,
            },
            {
              id: 'csibe-burger',
              name: 'Csibe Burger',
              description: 'Omlós csirkemell, majonéz, friss roppanós jégsaláta',
              price: '2 700 Ft',
              numericPrice: 2700,
              kcal: 640,
              proteinG: 34,
              carbsG: 48,
              fatG: 34,
              image: '/images/menu/csibe-burger.jpg',
              poultry: true,
              menuUpgradeable: true,
            },
            {
              id: 'dupla-smash-burger',
              name: 'Dupla Húsos Smash Burger',
              description:
                '150 g smash marhahús, bacon, csemegeuborka, cheddar szósz, hamburger szósz',
              price: '2 700 Ft',
              numericPrice: 2700,
              kcal: 860,
              proteinG: 48,
              carbsG: 46,
              fatG: 54,
              image: '/images/menu/dupla-smash-burger.jpg',
              badge: 'Top',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'gouda-boss-burger',
              name: 'Gouda Boss Hamburger',
              description:
                'Marhahús, rántott Gouda sajt, cheddar sajt, sült bacon, saláta, paradicsom',
              price: '3 800 Ft',
              numericPrice: 3800,
              kcal: 1090,
              proteinG: 52,
              carbsG: 58,
              fatG: 72,
              image: '/images/menu/gouda-boss-burger.jpg',
              badge: 'Boss',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'hagyomanyos-burger',
              name: 'Hagyományos Hamburger',
              description:
                'Hambi zsemle, sertéshús pogácsa, hagyma, paradicsom, uborka, jégsaláta, ketchup, mustár',
              price: '1 800 Ft',
              numericPrice: 1800,
              kcal: 560,
              proteinG: 26,
              carbsG: 48,
              fatG: 29,
              image: '/images/menu/hagyomanyos-burger.jpg',
              menuUpgradeable: true,
            },
            {
              id: 'herkentyu-burger',
              name: 'Herkentyű Burger',
              description:
                '85 g marhahús, lilahagyma, paradicsom, jégsaláta, ketchup, mustár, cheddar lapsajt',
              price: '2 700 Ft',
              numericPrice: 2700,
              kcal: 690,
              proteinG: 32,
              carbsG: 49,
              fatG: 40,
              image: '/images/menu/herkentyu-burger.jpg',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'klasszik-burger',
              name: 'Klasszik Burger',
              description: '85 g marhahús, cheddar szósz, hamburger szósz, bacon, cheddar sajt',
              price: '2 200 Ft',
              numericPrice: 2200,
              kcal: 720,
              proteinG: 34,
              carbsG: 46,
              fatG: 44,
              image: '/images/menu/klasszik-burger.jpg',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'smoky-csibe-burger',
              name: 'Smoky Csibe Burger',
              description: 'Csirkemell, ketchup, házi baconos majonéz, sajt, sült bacon',
              price: '2 800 Ft',
              numericPrice: 2800,
              kcal: 760,
              proteinG: 38,
              carbsG: 50,
              fatG: 45,
              image: '/images/menu/smoky-csibe-burger.jpg',
              poultry: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'szarvasgombas-burger',
              name: 'Szarvasgombás Hamburger',
              description: '170 g marhahús, szarvasgombás mártás, cheddar sajt, friss rukkola',
              price: '2 900 Ft',
              numericPrice: 2900,
              kcal: 890,
              proteinG: 46,
              carbsG: 47,
              fatG: 58,
              image: '/images/menu/szarvasgombas-burger.jpg',
              badge: '170g',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'tojasos-burger',
              name: 'Tojásos Hamburger',
              description: '85 g marhahús, majonéz, cheddar sajt, ropogós bacon, tükörtojás',
              price: '2 300 Ft',
              numericPrice: 2300,
              kcal: 780,
              proteinG: 39,
              carbsG: 46,
              fatG: 49,
              image: '/images/menu/tojasos-burger.jpg',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
          ],
        },
        {
          id: 'gyros',
          title: 'Gyros Ételek',
          subtitle: 'Autentikus fűszerezés • Házi mártások',
          items: [
            {
              id: 'gyros-kifli',
              name: 'Gyros Kifli',
              description: 'Gyros hús, hagyma, uborka, paradicsom, sajt, választható mártás',
              price: '1 800 Ft / 2 200 Ft',
              numericPrice: 1800,
              kcal: 680,
              proteinG: 32,
              carbsG: 64,
              fatG: 32,
              image: '/images/menu/gyros-kifli.jpg',
              poultry: true,
              menuUpgradeable: true,
              variants: [
                {
                  id: 'kicsi',
                  label: 'Kicsi',
                  price: 1800,
                  priceDisplay: '1 800 Ft',
                  kcal: 680,
                },
                {
                  id: 'nagy',
                  label: 'Nagy',
                  price: 2200,
                  priceDisplay: '2 200 Ft',
                  kcal: 890,
                },
              ],
            },
            {
              id: 'gyros-pita',
              name: 'Gyros Pita',
              description: 'Pita, gyros hús, hagyma, paradicsom, uborka, mártás, sajt',
              price: '1 800 Ft',
              numericPrice: 1800,
              kcal: 690,
              proteinG: 34,
              carbsG: 62,
              fatG: 33,
              image: '/images/menu/gyros-pita.jpg',
              poultry: true,
              menuUpgradeable: true,
            },
            {
              id: 'gyros-tortilla',
              name: 'Gyros Tortilla',
              description:
                'Gyros hús, hagyma, uborka, paradicsom, jégsaláta, választható mártás, reszelt sajt',
              price: '2 000 Ft',
              numericPrice: 2000,
              kcal: 740,
              proteinG: 35,
              carbsG: 66,
              fatG: 37,
              image: '/images/menu/gyros-tortilla.jpg',
              poultry: true,
            },
            {
              id: 'kis-gyros-tal',
              name: 'Kis Gyros Tál',
              description:
                'Burgonya, gyros hús, káposzta, uborka, lilahagyma, paradicsom, jégsaláta, mártás, sajt',
              price: '2 500 Ft',
              numericPrice: 2500,
              kcal: 880,
              proteinG: 42,
              carbsG: 74,
              fatG: 46,
              image: '/images/menu/kis-gyros-tal.jpg',
              poultry: true,
            },
            {
              id: 'nagy-gyros-tal',
              name: 'Nagy Gyros Tál',
              description:
                'Burgonya, gyros hús, hagyma, uborka, paradicsom, káposzta, jégsaláta, mártás, reszelt sajt',
              price: '2 900 Ft',
              numericPrice: 2900,
              kcal: 1160,
              proteinG: 56,
              carbsG: 96,
              fatG: 61,
              image: '/images/menu/nagy-gyros-tal.jpg',
              badge: 'Top',
              poultry: true,
            },
            {
              id: 'wrap-and-go',
              name: 'Wrap & Go',
              description:
                'Rántott csirkemell, jégsaláta, paradicsom, uborka, lilahagyma, választható mártás',
              price: '2 000 Ft',
              numericPrice: 2000,
              kcal: 720,
              proteinG: 33,
              carbsG: 68,
              fatG: 35,
              image: '/images/menu/wrap-and-go.jpg',
              poultry: true,
              menuUpgradeable: true,
            },
          ],
        },
        {
          id: 'kebab-doner',
          title: 'Kebab & Döner',
          subtitle: 'Eredeti ízvilág',
          items: [
            {
              id: 'doner-tal',
              name: 'Dönertál',
              description:
                'Hasábburgonya, kebab hús, lilakáposzta, lilahagyma, uborka, tartár, ketchup, sajt',
              price: '3 500 Ft',
              numericPrice: 3500,
              kcal: 1190,
              proteinG: 54,
              carbsG: 98,
              fatG: 64,
              image: '/images/menu/nagy-gyros-tal.jpg',
              cheeseLover: true,
            },
            {
              id: 'kebab-pita',
              name: 'Kebab Pita (Dürüm)',
              description: 'Pita, kebab hús, lilakáposzta, lilahagyma, uborka, paradicsom',
              price: '2 500 Ft',
              numericPrice: 2500,
              kcal: 730,
              proteinG: 36,
              carbsG: 64,
              fatG: 36,
              image: '/images/menu/kebab.jpg',
            },
            {
              id: 'kebab-tal',
              name: 'Kebab Tál',
              description: 'Kebab hús, lilahagyma, uborka, tartár, lilakáposzta, sajt',
              price: '3 500 Ft',
              numericPrice: 3500,
              kcal: 1120,
              proteinG: 52,
              carbsG: 88,
              fatG: 60,
              image: '/images/menu/kebab.jpg',
              cheeseLover: true,
            },
            {
              id: 'kebab-tortilla',
              name: 'Kebab Tortilla',
              description: 'Kebab hús, lilahagyma, uborka, tartár, lilakáposzta, sajt',
              price: '2 500 Ft',
              numericPrice: 2500,
              kcal: 780,
              proteinG: 37,
              carbsG: 66,
              fatG: 41,
              image: '/images/menu/gyros-tortilla.jpg',
              cheeseLover: true,
            },
          ],
        },
        {
          id: 'frissensultek',
          title: 'Frissensültek',
          subtitle: 'Ropogós bundák • Gazdag köretek',
          items: [
            {
              id: 'bbq-csirkemell',
              name: 'BBQ Csirkemell',
              description: 'Csirkemell, hagymakarika, BBQ mártás, burgonya, saláta',
              price: '3 500 Ft',
              numericPrice: 3500,
              kcal: 960,
              proteinG: 52,
              carbsG: 88,
              fatG: 44,
              image: '/images/menu/bbq-csirkemell.jpg',
              poultry: true,
            },
            {
              id: 'bbq-sajt-bomba',
              name: 'BBQ Sajt Bomba',
              description: 'Csirkemell, bacon, füstölt sajt, BBQ mártás, burgonya, saláta',
              price: '3 500 Ft',
              numericPrice: 3500,
              kcal: 1080,
              proteinG: 56,
              carbsG: 84,
              fatG: 57,
              image: '/images/menu/bbq-sajt-bomba.jpg',
              poultry: true,
              cheeseLover: true,
            },
            {
              id: 'cheddar-sonka-csirke',
              name: 'Cheddarral & Fekete Erdő Sonkával Töltött Csirke',
              description: 'Pankómorzsában sütve, gazdag körettel',
              price: '3 900 Ft',
              numericPrice: 3900,
              kcal: 1140,
              proteinG: 58,
              carbsG: 86,
              fatG: 62,
              image: '/images/menu/cheddar-sonka-csirke.jpg',
              badge: 'Pankó',
              poultry: true,
              cheeseLover: true,
            },
            {
              id: 'csipos-csirke-csikok',
              name: 'Csípős Tészta Bundás Csirkemell Csíkok',
              description: 'Ropogós csirke csíkok, rizs, saláta, tartár',
              price: '3 400 Ft',
              numericPrice: 3400,
              kcal: 950,
              proteinG: 48,
              carbsG: 92,
              fatG: 43,
              image: '/images/menu/csipos-csirke-csikok.jpg',
              spicy: true,
              poultry: true,
            },
            {
              id: 'feta-kremes-csirke',
              name: 'Feta Krémmel Töltött Csirkemell',
              description: 'Steak burgonya, saláta, tartármártás',
              price: '3 600 Ft',
              numericPrice: 3600,
              kcal: 1020,
              proteinG: 54,
              carbsG: 82,
              fatG: 52,
              image: '/images/menu/feta-kremes-csirke.jpg',
              poultry: true,
              cheeseLover: true,
            },
            {
              id: 'fustolt-sajtos-csirke',
              name: 'Füstölt Sajttal & Baconnal Töltött Csirke',
              description: 'Csirkemell, füstölt sajt, bacon, burgonya, saláta, mártás',
              price: '3 600 Ft',
              numericPrice: 3600,
              kcal: 1090,
              proteinG: 57,
              carbsG: 82,
              fatG: 59,
              image: '/images/menu/fustolt-sajtos-csirke.jpg',
              poultry: true,
              cheeseLover: true,
            },
            {
              id: 'joghurtos-alom',
              name: 'Joghurtos Álom',
              description: 'Natúr csirkemell, joghurtos mártás, parmezán, sajt, rizs, saláta, tartár',
              price: '3 200 Ft',
              numericPrice: 3200,
              kcal: 840,
              proteinG: 52,
              carbsG: 76,
              fatG: 36,
              image: '/images/menu/joghurtos-alom.jpg',
              poultry: true,
              cheeseLover: true,
            },
            {
              id: 'rantott-brokkoli',
              name: 'Rántott Brokkoli',
              description: 'Édesburgonya, cheddar szósz, BBQ szósz',
              price: '3 400 Ft',
              numericPrice: 3400,
              kcal: 820,
              proteinG: 18,
              carbsG: 90,
              fatG: 43,
              image: '/images/menu/rantott-brokkoli.jpg',
              cheeseLover: true,
            },
            {
              id: 'rantott-camembert',
              name: 'Rántott Camembert Áfonya Töltelékkel',
              description: 'Hercegnő burgonya, áfonya öntet',
              price: '3 400 Ft',
              numericPrice: 3400,
              kcal: 980,
              proteinG: 32,
              carbsG: 88,
              fatG: 55,
              image: '/images/menu/rantott-camembert.jpg',
              cheeseLover: true,
              vegetarian: true,
            },
            {
              id: 'rantott-szelet',
              name: 'Rántott Csirkemell / Szelet',
              description: 'Hasábburgonya, friss saláta, tartármártás',
              price: '3 400 Ft',
              numericPrice: 3400,
              kcal: 940,
              proteinG: 49,
              carbsG: 84,
              fatG: 45,
              image: '/images/menu/rantott-szelet.jpg',
              poultry: true,
            },
            {
              id: 'rantott-sajt',
              name: 'Rántott Sajt',
              description: 'Hasábburgonya, házi tartármártás',
              price: '2 900 Ft',
              numericPrice: 2900,
              kcal: 1040,
              proteinG: 38,
              carbsG: 86,
              fatG: 61,
              image: '/images/menu/rantott-sajt.jpg',
              cheeseLover: true,
              vegetarian: true,
            },
          ],
        },
        {
          id: 'nuggets',
          title: 'Nuggets Falatok',
          subtitle: 'Ropogós és sajtos',
          items: [
            {
              id: 'chicken-nuggets',
              name: 'Chicken Nuggets',
              description: 'Klasszikus aranybarna ropogós csirkefalatok',
              price: '800 Ft / 1 000 Ft',
              numericPrice: 800,
              kcal: 290,
              proteinG: 18,
              carbsG: 18,
              fatG: 16,
              image: '/images/menu/chicken-nuggets.jpg',
              poultry: true,
              menuUpgradeable: true,
              variants: [
                { id: '6db', label: '6 db', price: 800, priceDisplay: '800 Ft', kcal: 290 },
                { id: '10db', label: '10 db', price: 1000, priceDisplay: '1 000 Ft', kcal: 480 },
              ],
            },
            {
              id: 'chili-cheese-nuggets',
              name: 'Chili Cheese Nuggets',
              description: 'Csípős, krémes lágy sajtos falatok',
              price: '1 400 Ft / 1 600 Ft',
              numericPrice: 1400,
              kcal: 360,
              proteinG: 14,
              carbsG: 24,
              fatG: 23,
              image: '/images/menu/chili-cheese-nuggets.jpg',
              spicy: true,
              cheeseLover: true,
              vegetarian: true,
              menuUpgradeable: true,
              variants: [
                { id: '6db', label: '6 db', price: 1400, priceDisplay: '1 400 Ft', kcal: 360 },
                { id: '10db', label: '10 db', price: 1600, priceDisplay: '1 600 Ft', kcal: 590 },
              ],
            },
          ],
        },
        {
          id: 'uditok',
          title: 'Jéghideg Üdítők',
          subtitle: '+50 Ft DRS visszaváltási díj',
          items: [
            {
              id: 'coca-cola-033',
              name: 'Coca-Cola (0.33 l)',
              description: 'Eredeti, Zéró, Koffeinmentes Zéró (+50 Ft DRS)',
              price: '500 Ft',
              numericPrice: 550,
              kcal: 139,
              proteinG: 0,
              carbsG: 35,
              fatG: 0,
              image: '/images/menu/coca-cola-033.jpg',
            },
            {
              id: 'coca-cola-05',
              name: 'Coca-Cola (0.5 l)',
              description: 'Eredeti, Zéró, Light (+50 Ft DRS)',
              price: '600 Ft',
              numericPrice: 650,
              kcal: 210,
              proteinG: 0,
              carbsG: 53,
              fatG: 0,
              image: '/images/menu/coca-cola-05.jpg',
            },
            {
              id: 'fanta-033',
              name: 'Fanta (0.33 l)',
              description: 'Narancs, Exotic, Cherry, Bodza (+50 Ft DRS)',
              price: '500 Ft',
              numericPrice: 550,
              kcal: 142,
              proteinG: 0,
              carbsG: 35,
              fatG: 0,
              image: '/images/menu/fanta-033.jpg',
            },
            {
              id: 'kinley-05',
              name: 'Kinley Ginger Ale (0.5 l)',
              description: 'Gyömbér (+50 Ft DRS)',
              price: '600 Ft',
              numericPrice: 650,
              kcal: 185,
              proteinG: 0,
              carbsG: 45,
              fatG: 0,
              image: '/images/menu/kinley-05.jpg',
            },
            {
              id: 'xixo-025',
              name: 'XIXO Teák & Limonádék',
              description: 'Mangó-Ananász, Málna-Áfonya, Apple, Kiwi, Orange (+50 Ft DRS)',
              price: '500 Ft',
              numericPrice: 550,
              kcal: 75,
              proteinG: 0,
              carbsG: 18,
              fatG: 0,
              image: '/images/menu/xixo-025.jpg',
            },
          ],
        },
      ],
    },
    cart: {
      title: 'RENDELÉSI KALKULÁTOR',
      emptyTitle: 'A kosarad még üres',
      emptySub:
        'Válassz az étlapról, állítsd össze a rendelésed, majd indítsd a telefonhívást egy gombnyomással!',
      comboLabel: '+ Menü (+700 Ft)',
      subtotalLabel: 'Részösszeg',
      discountToggle10: '-10% Rendőr / Tűzoltó / Mentős',
      discountToggle20: '-20% Csoportos (10+ fő)',
      finalTotalLabel: 'Várható végösszeg',
      callToOrderCta: 'Telefonos rendelés',
      clearCartLabel: 'Kosár ürítése',
      kcalToggleLabel: 'Kalória táblázat',
      kcalTotalLabel: 'Összes becsült kalória',
      kcalDisclaimer: 'Tájékoztató becslés (±15% eltérhet)',
    },
    promos: {
      badge: 'KEDVEZMÉNYEK',
      title: 'ÁLLANDÓ AKCIÓK',
      cards: [
        {
          id: 'promo-heroes',
          visualType: 'responders',
          visualLabels: ['Rendőrség', 'Tűzoltóság', 'Mentők'],
          badge: 'RENDŐR • TŰZOLTÓ • MENTŐS',
          discountText: '-10%',
          title: 'Hivatásos Kedvezmény',
          highlights: [
            'Állandó 10% kedvezmény a teljes étlapra',
            'Érvényes szolgálati igazolvány felmutatásával',
          ],
          footnote: '*Más akciókkal nem összevonható.',
        },
        {
          id: 'promo-group',
          visualType: 'group',
          visualLabels: ['6. étel -50%', '10+ fő -20%'],
          badge: '6 VAGY 10+ FŐ',
          discountText: '-50% / -20%',
          title: 'Csoportos Rendelés',
          highlights: [
            '6 fő esetén: a 6. saját ételre 50% kedvezmény',
            '10 fő felett: a teljes rendelésre 20% kedvezmény',
          ],
          footnote: '*Más akciókkal nem összevonható.',
        },
      ],
    },
    about: {
      badge: 'NYÍRBÁTOR • SZENTVÉR ÚT 19.',
      title: 'VALÓDI ÍZEK. FRISSEN SÜTVE.',
      lead: '100% marha smash burgerek, autentikus fűszerezésű gyros és ropogós frissensültek.',
      paragraphs: [
        'Forró rostlapon karamellizált smash pogácsák, folyékony cheddar sajtszósz és minden nap frissen aprított zöldségek házi mártásokkal.',
      ],
      socialPrompt: 'Akciókért és újdonságokért kövess minket!',
      stickerCaptions: {
        gyros: 'Nagy Gyros Tál',
        burger: 'Dupla Smash Burger',
      },
      stats: [
        { value: '4.2 ★', label: '32+ Google' },
        { value: '100%', label: 'Marha & Csirke' },
        { value: '35+', label: 'Étel & Box' },
        { value: '+700 Ft', label: 'Menü Upgrade' },
      ],
    },
    gallery: {
      badge: 'FOTÓK',
      title: 'GALÉRIA',
      items: [
        {
          id: 'gal-1',
          src: '/images/menu/smash-box-1.jpg',
          title: '6 db-os Smash Box',
          categoryLabel: 'Smash Box',
        },
        {
          id: 'gal-2',
          src: '/images/brand/interior.jpg',
          title: 'Étterem',
          categoryLabel: 'Belső tér',
        },
        {
          id: 'gal-3',
          src: '/images/menu/dupla-smash-burger.jpg',
          title: 'Dupla Húsos Smash Burger',
          categoryLabel: 'Burger',
        },
        {
          id: 'gal-4',
          src: '/images/menu/nagy-gyros-tal.jpg',
          title: 'Nagy Gyros Tál',
          categoryLabel: 'Gyros',
        },
        {
          id: 'gal-5',
          src: '/images/menu/gouda-boss-burger.jpg',
          title: 'Gouda Boss Burger',
          categoryLabel: 'Burger',
        },
        {
          id: 'gal-6',
          src: '/images/menu/smash-box-tray.jpg',
          title: 'Smash Box tálcán',
          categoryLabel: 'Smash Box',
        },
        {
          id: 'gal-7',
          src: '/images/menu/cheddar-sajtos-burger.jpg',
          title: 'Cheddar Sajtos Burger',
          categoryLabel: 'Burger',
        },
        {
          id: 'gal-8',
          src: '/images/menu/gyros-pita.jpg',
          title: 'Gyros Pita',
          categoryLabel: 'Gyros',
        },
      ],
    },
    reviews: {
      badge: 'GOOGLE MAPS',
      title: 'VÉLEMÉNYEK',
      ratingScore: '4.2 / 5.0',
      reviewCountBadge: '32+ Google vélemény',
      viewAllLabel: 'Összes vélemény',
      writeReviewLabel: 'Vélemény írása',
      moreLabel: 'Részletek ▼',
      lessLabel: 'Kevesebb ▲',
      items: [
        {
          id: 'rev-turi-tamas',
          name: 'Turi Tamás',
          avatar: '/images/reviews/turitamas.png',
          rating: 5,
          text: 'Finom volt a smashburger menü.',
          googleLink: 'https://maps.app.goo.gl/NyESXh7CyLGvzCYb8',
          extras: [
            { label: 'Étel', value: '5 / 5' },
            { label: 'Szolgáltatás', value: '5 / 5' },
            { label: 'Hangulat', value: '5 / 5' },
          ],
        },
        {
          id: 'rev-fodor-adam',
          name: 'Ádám Zsolt Fodor',
          avatar: '/images/reviews/adamzsoltfodor.png',
          rating: 5,
          text: 'Házhoz rendeltem egy dupla húsos hambi menüt , az étel kiváló minőségű volt és a szarvasgombás majonézzel egyszerűen fenomenális kombó 😎 Pacsi,tisztelet , köszi ,hogy vagytok a városnak!🔥',
          googleLink: 'https://maps.app.goo.gl/TtFuSjexFv8qAwud7',
          extras: [
            { label: 'Ár / fő', value: '4 000 – 6 000 Ft' },
            { label: 'Étel', value: '5 / 5' },
            { label: 'Szolgáltatás', value: '5 / 5' },
            { label: 'Hangulat', value: '5 / 5' },
          ],
        },
        {
          id: 'rev-nikoletta-szente',
          name: 'Nikoletta Szente',
          avatar: '/images/reviews/nikolettaszente.png',
          rating: 5,
          text: 'Tegnap átutazóban voltunk,s ki próbáltuk az új ételt. Nem bántuk meg,hogy itt álltunk meg. Jó tálalás,finom ízek, barátságos kiszolgálás.',
          googleLink: 'https://maps.app.goo.gl/oFHBVmr3tS3X785Y9',
          extras: [
            { label: 'Étel', value: '5 / 5' },
            { label: 'Szolgáltatás', value: '5 / 5' },
            { label: 'Hangulat', value: '5 / 5' },
          ],
        },
        {
          id: 'rev-viktor-racz',
          name: 'Viktor Rácz',
          avatar: '/images/reviews/viktorracz.png',
          rating: 5,
          text: 'Dupla hamburgert ettem ami igen finom volt! Sokat nem kellett várni, a sracok is jó fejek voltak! Ide visszajövök! Pacsi a szakácsnak!',
          googleLink: 'https://maps.app.goo.gl/zQoDxG6ymYfyt4gP8',
          extras: [
            { label: 'Étel', value: '5 / 5' },
            { label: 'Szolgáltatás', value: '5 / 5' },
            { label: 'Hangulat', value: '5 / 5' },
          ],
        },
        {
          id: 'rev-richard-csokai',
          name: 'Richard Csokai',
          avatar: '/images/reviews/richardcsokai.png',
          rating: 5,
          text: 'Környék legjobb smash burgerezője',
          googleLink: 'https://maps.app.goo.gl/AYnH4j2ZiZx3f4kdA',
          extras: [
            { label: 'Étel', value: '5 / 5' },
            { label: 'Szolgáltatás', value: '5 / 5' },
            { label: 'Hangulat', value: '5 / 5' },
          ],
        },
        {
          id: 'rev-verzxy',
          name: 'Verzxy',
          avatar: '/images/reviews/verzxy.png',
          rating: 5,
          text: 'Szerintem nyirbatorban legjobb burgerezős',
          googleLink: 'https://maps.app.goo.gl/a3nj5bcdRU1LE6As9',
          extras: [
            { label: 'Ár / fő', value: '2 000 – 4 000 Ft' },
            { label: 'Étel', value: '5 / 5' },
            { label: 'Szolgáltatás', value: '5 / 5' },
            { label: 'Hangulat', value: '5 / 5' },
          ],
        },
        {
          id: 'rev-bence-torok',
          name: 'Bence Török',
          avatar: '/images/reviews/bencetorok.png',
          rating: 5,
          text: 'Meglepően nagyon jo volt, Nagyon ajánlom mindenkinek!',
          googleLink: 'https://maps.app.goo.gl/9eB9KDDWdjDz62s88',
          extras: [
            { label: 'Ár / fő', value: '2 000 – 4 000 Ft' },
            { label: 'Várakozási idő', value: 'Nem kellett várni' },
            { label: 'Étel / Szolgáltatás', value: '5 / 5' },
          ],
        },
      ],
    },
    contact: {
      badge: 'ELÉRHETŐSÉG',
      title: 'KAPCSOLAT & NYITVATARTÁS',
      addressLabel: 'Cím',
      addressValue: '4300 Nyírbátor, Szentvér út 19.',
      phoneLabel: 'Telefonos rendelés',
      phoneDisplay: '+36 30 333 5114',
      messengerLabel: 'Érdeklődés & Üzenet',
      messengerValue: 'Facebook Messenger',
      messengerCta: 'Üzenetküldés',
      socialLabel: 'Közösségi oldalak',
      socialSub: 'Kövess minket az akciókért és újdonságokért!',
      hoursTitle: 'Nyitvatartás',
      hoursRows: [
        { day: 'Hétfő – Szombat', time: '11:00 – 21:00' },
        { day: 'Vasárnap', time: 'ZÁRVA', isClosed: true },
      ],
      directionsCta: 'Útvonaltervezés',
    },
    footer: {
      tagline: 'Több mint Gyros! • Valódi ízek Nyírbátorban.',
      quickLinksTitle: 'Menü',
      contactTitle: 'Kapcsolat',
      legalTitle: 'Jogi információk',
      termsLabel: 'ÁSZF',
      privacyLabel: 'Adatkezelés',
      rightsReserved: 'Minden jog fenntartva.',
      demoNotice: 'Ez a weboldal bemutató célú mintaweboldal, amelyet az E-Brolo fejlesztett.',
    },
    legal: {
      closeLabel: 'Bezárás',
      termsTitle: 'Általános Szerződési Feltételek (ÁSZF)',
      termsUpdated: 'Hatályos: 2026. november 6.',
      termsSections: [
        {
          heading: '1. Szolgáltató adatai',
          body: [
            'Név: Gyros & Go Gyorsétterem',
            'Cím: 4300 Nyírbátor, Szentvér út 19.',
            'Telefon: +36 30 333 5114',
          ],
        },
        {
          heading: '2. Rendelés és fizetés',
          body: [
            'A weboldalon található kosár kalkulátor tájékoztató jellegű rendelés-összeállító segédeszköz. A tényleges rendelés leadása kizárólag telefonon (+36 30 333 5114) vagy személyesen történik.',
            'Az üdítőitalok ára mellé +50 Ft DRS visszaváltási díj számolandó fel. A feltüntetett kalóriaértékek becsült tájékoztató adatok (±15% eltérés lehetséges). A kedvezmények más akciókkal nem összevonhatók.',
          ],
        },
      ],
      privacyTitle: 'Adatkezelési Tájékoztató',
      privacyUpdated: 'Hatályos: 2026. november 6.',
      privacySections: [
        {
          heading: '1. Adatkezelés',
          body: [
            'A weboldal nem gyűjt és nem tárol személyes adatokat. A kosár tartalma kizárólag a látogató saját böngészőjében jelenik meg a telefonos rendelés megkönnyítésére.',
          ],
        },
      ],
    },
  },
  en: {
    meta: {
      title: 'Gyros & Go Nyírbátor | Smash Burgers • Gyros • Fresh Grills',
      description:
        'Gyros & Go Nyírbátor (Szentvér út 19.). 100% beef smash burgers, gyros, 6-pc Smash Box, Cheddar Madness, fresh grills, and house sauces.',
    },
    nav: {
      home: 'Home',
      menu: 'Menu',
      promos: 'Deals',
      about: 'Restaurant',
      gallery: 'Gallery',
      reviews: 'Reviews',
      contact: 'Contact',
      cartLabel: 'Cart',
    },
    hero: {
      eyebrow: 'NYÍRBÁTOR • SZENTVÉR ÚT 19.',
      orderNowCta: '+36 30 333 5114',
      addToCartCta: '+ Add to Cart',
      menuCta: 'Full Menu',
      comboTag: 'Combo Upgrade +700 Ft (Fries + 0.33L Drink)',
      includedComboTag: 'Includes 2 fries + 2 dipping sauces',
      scrollHint: 'Scroll',
      prevSlideAria: 'Previous featured dish',
      nextSlideAria: 'Next featured dish',
      slides: [
        {
          id: 'dupla-smash-burger',
          tag: '100% BEEF SMASH',
          titleLine1: 'DOUBLE BEEF',
          titleAccent: 'SMASH BURGER',
          bgWord: 'SMASH',
          ingredients:
            '150g smashed beef • crispy bacon • molten cheddar sauce • pickles • house burger sauce',
          priceValue: '2 700 Ft',
          numericPrice: 2700,
          kcal: 860,
          image: '/images/menu/dupla-smash-burger.jpg',
          comboEligible: true,
          layerLabels: [
            'Toasted brioche crown',
            'Crispy bacon & pickles',
            'Smash beef & molten cheddar',
            'Smash beef & house sauce',
            'Toasted brioche heel',
          ],
        },
        {
          id: 'smash-box-6db',
          tag: 'INTRODUCTORY DEAL',
          titleLine1: '6-PIECE MINI',
          titleAccent: 'SMASH BOX',
          bgWord: 'BOX',
          ingredients:
            '6 mini Smash Burgers • 2 portions of crispy fries • 2 selectable dipping sauces',
          priceValue: '4 900 Ft',
          numericPrice: 4900,
          kcal: 2480,
          image: '/images/menu/smash-box-1.jpg',
          comboEligible: false,
          layerLabels: [
            '3 classic mini Smash Burgers',
            '3 bacon mini Smash Burgers',
            '2 crispy fries & 2 dipping sauces',
            'Street-food kraft box tray',
          ],
        },
        {
          id: 'cheddar-sajtorulet',
          tag: 'FLOWING MOLTEN CHEESE',
          titleLine1: 'CHEDDAR',
          titleAccent: 'MADNESS BURGER',
          bgWord: 'CHEDDAR',
          ingredients:
            'Flowing molten cheddar sauce • smashed beef • red onion jam • bacon • crispy onion rings',
          priceValue: '3 400 Ft',
          numericPrice: 3400,
          kcal: 980,
          image: '/images/menu/cheddar-sajtorulet.jpg',
          comboEligible: true,
          layerLabels: [
            'Crispy onion rings & brioche crown',
            'Flowing molten cheddar wave',
            'Crispy bacon & red onion jam',
            'Smash beef & melted cheddar',
            'Toasted brioche heel',
          ],
        },
      ],
      marqueeItems: [
        'FAST. DELICIOUS. FOR YOU!',
        '100% BEEF SMASH BURGER',
        '6-PC SMASH BOX 4 900 FT',
        'CHEDDAR MADNESS 3 400 FT',
        'GYROS & KEBAB',
        'COMBO UPGRADE +700 FT',
      ],
    },
    menuSection: {
      badge: 'SELECTION',
      title: 'FULL MENU',
      searchPlaceholder: 'Search (e.g. smash box, gyros, cheddar)...',
      allCategoriesLabel: 'All',
      jumpToCategoriesLabel: 'Categories',
      showMoreLabel: 'Show All',
      showLessLabel: 'Show Less',
      noResultsLabel: 'No items found.',
      itemsCountLabel: 'items',
      addToCartLabel: '+ Add',
      menuUpgradeToggleLabel: '+ Combo (+700 Ft)',
      sortLabels: {
        nameAsc: 'A–Z',
        nameDesc: 'Z–A',
        priceAsc: 'Price ↑',
        priceDesc: 'Price ↓',
      },
      nutrition: {
        toggleLabel: 'kcal',
        energy: 'Calories',
        protein: 'Protein',
        carbs: 'Carbs',
        fat: 'Fat',
        comboBonusLabel: '+ Combo (+460 kcal)',
        comboBonusKcal: 460,
        disclaimer: 'Approximate values, ±15% variance may occur.',
      },
      filterLabels: {
        smashBeef: 'Beef',
        cheeseLover: 'Cheese',
        spicy: 'Spicy',
        poultry: 'Chicken',
      },
      comboStrip: {
        title: 'COMBO UPGRADE',
        subtitle:
          'With any Burger, Gyros roll, Wrap & Go, Pita, or Nuggets: fries + 0.33L drink',
        price: '+700 Ft',
        sidesTitle: 'Sides',
        sidesIncluded: ['French Fries', 'Steak Fries', 'Duchess Potatoes', 'Rice'],
        saucesTitle: 'Extra Sides & Sauces',
      },
      extraAddons: [
        {
          id: 'addon-edesburgonya',
          name: 'Sweet Potato Upgrade',
          price: 500,
          priceDisplay: '+500 Ft',
          kcal: 80,
          category: 'side',
        },
        {
          id: 'addon-cheddar',
          name: 'Cheddar Cheese Sauce',
          price: 600,
          priceDisplay: '600 Ft',
          kcal: 210,
          category: 'sauce',
        },
        {
          id: 'addon-tartar',
          name: 'Tartar Sauce',
          price: 300,
          priceDisplay: '300 Ft',
          kcal: 190,
          category: 'sauce',
        },
        {
          id: 'addon-tzatziki',
          name: 'Tzatziki Sauce',
          price: 300,
          priceDisplay: '300 Ft',
          kcal: 110,
          category: 'sauce',
        },
        {
          id: 'addon-csipos',
          name: 'Spicy Sauce',
          price: 300,
          priceDisplay: '300 Ft',
          kcal: 95,
          category: 'sauce',
        },
        {
          id: 'addon-joghurt',
          name: 'Yogurt Sauce',
          price: 300,
          priceDisplay: '300 Ft',
          kcal: 105,
          category: 'sauce',
        },
      ],
      categories: [
        {
          id: 'hamburgerek',
          title: 'Burgers & Boxes',
          subtitle: '100% Beef • 6-pc Smash Box • Molten Cheddar',
          items: [
            {
              id: 'smash-box-6db',
              name: '6-pc Smash Box',
              description:
                '6 mini Smash Burgers, 2 portions of crispy fries, 2 selectable dipping sauces',
              price: '4 900 Ft',
              numericPrice: 4900,
              kcal: 2480,
              proteinG: 118,
              carbsG: 215,
              fatG: 128,
              image: '/images/menu/smash-box-1.jpg',
              badge: 'Box',
              smashBeef: true,
              cheeseLover: true,
            },
            {
              id: 'cheddar-sajtos-burger',
              name: 'Cheddar Cheese Burger',
              description:
                '85g beef, cheddar, red onion jam, pickles, bacon, cheddar cheese sauce',
              price: '3 700 Ft',
              numericPrice: 3700,
              kcal: 940,
              proteinG: 42,
              carbsG: 52,
              fatG: 62,
              image: '/images/menu/cheddar-sajtos-burger.jpg',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'cheddar-sajtorulet',
              name: 'Cheddar Madness Burger',
              description:
                'Hot molten cheddar sauce, smashed beef, choice of: bacon / cheddar / jalapeño / ham',
              price: '3 400 Ft',
              numericPrice: 3400,
              kcal: 980,
              proteinG: 46,
              carbsG: 54,
              fatG: 64,
              image: '/images/menu/cheddar-sajtorulet.jpg',
              badge: '4 Styles',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
              variants: [
                {
                  id: 'bacon',
                  label: 'Bacon',
                  price: 3400,
                  priceDisplay: '3 400 Ft',
                  kcal: 990,
                },
                {
                  id: 'cheddar',
                  label: 'Cheddar',
                  price: 3400,
                  priceDisplay: '3 400 Ft',
                  kcal: 1020,
                },
                {
                  id: 'jalapeno',
                  label: 'Jalapeño',
                  price: 3400,
                  priceDisplay: '3 400 Ft',
                  kcal: 920,
                },
                {
                  id: 'sonka',
                  label: 'Ham',
                  price: 3400,
                  priceDisplay: '3 400 Ft',
                  kcal: 940,
                },
              ],
            },
            {
              id: 'csibe-burger',
              name: 'Chicken Burger',
              description: 'Tender chicken breast, mayo, crisp iceberg lettuce',
              price: '2 700 Ft',
              numericPrice: 2700,
              kcal: 640,
              proteinG: 34,
              carbsG: 48,
              fatG: 34,
              image: '/images/menu/csibe-burger.jpg',
              poultry: true,
              menuUpgradeable: true,
            },
            {
              id: 'klasszik-burger',
              name: 'Classic Burger',
              description: '85g beef, cheddar sauce, burger sauce, bacon, cheddar',
              price: '2 200 Ft',
              numericPrice: 2200,
              kcal: 720,
              proteinG: 34,
              carbsG: 46,
              fatG: 44,
              image: '/images/menu/klasszik-burger.jpg',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'crispy-burger',
              name: 'Crispy Burger',
              description: 'Cornflakes-crusted crispy meat, mayo, lettuce, onion, BBQ sauce',
              price: '2 900 Ft',
              numericPrice: 2900,
              kcal: 790,
              proteinG: 36,
              carbsG: 62,
              fatG: 44,
              image: '/images/menu/crispy-burger.jpg',
              poultry: true,
              menuUpgradeable: true,
            },
            {
              id: 'dupla-smash-burger',
              name: 'Double Beef Smash Burger',
              description: '150g smashed beef, bacon, pickles, cheddar sauce, burger sauce',
              price: '2 700 Ft',
              numericPrice: 2700,
              kcal: 860,
              proteinG: 48,
              carbsG: 46,
              fatG: 54,
              image: '/images/menu/dupla-smash-burger.jpg',
              badge: 'Top',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'tojasos-burger',
              name: 'Egg Burger',
              description: '85g beef, mayo, cheddar, crispy bacon, fried egg',
              price: '2 300 Ft',
              numericPrice: 2300,
              kcal: 780,
              proteinG: 39,
              carbsG: 46,
              fatG: 49,
              image: '/images/menu/tojasos-burger.jpg',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'gouda-boss-burger',
              name: 'Gouda Boss Burger',
              description: 'Beef, fried Gouda cheese, cheddar, grilled bacon, lettuce, tomato',
              price: '3 800 Ft',
              numericPrice: 3800,
              kcal: 1090,
              proteinG: 52,
              carbsG: 58,
              fatG: 72,
              image: '/images/menu/gouda-boss-burger.jpg',
              badge: 'Boss',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'herkentyu-burger',
              name: 'Krabby Patty Burger',
              description: '85g beef, red onion, tomato, iceberg lettuce, ketchup, mustard, cheddar',
              price: '2 700 Ft',
              numericPrice: 2700,
              kcal: 690,
              proteinG: 32,
              carbsG: 49,
              fatG: 40,
              image: '/images/menu/herkentyu-burger.jpg',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'smoky-csibe-burger',
              name: 'Smoky Chicken Burger',
              description: 'Chicken breast, ketchup, house bacon mayo, cheese, bacon',
              price: '2 800 Ft',
              numericPrice: 2800,
              kcal: 760,
              proteinG: 38,
              carbsG: 50,
              fatG: 45,
              image: '/images/menu/smoky-csibe-burger.jpg',
              poultry: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
            {
              id: 'hagyomanyos-burger',
              name: 'Traditional Burger',
              description:
                'Burger bun, pork patty, onion, tomato, pickles, lettuce, ketchup, mustard',
              price: '1 800 Ft',
              numericPrice: 1800,
              kcal: 560,
              proteinG: 26,
              carbsG: 48,
              fatG: 29,
              image: '/images/menu/hagyomanyos-burger.jpg',
              menuUpgradeable: true,
            },
            {
              id: 'szarvasgombas-burger',
              name: 'Truffle Burger',
              description: '170g beef, truffle mayo, cheddar cheese, fresh arugula',
              price: '2 900 Ft',
              numericPrice: 2900,
              kcal: 890,
              proteinG: 46,
              carbsG: 47,
              fatG: 58,
              image: '/images/menu/szarvasgombas-burger.jpg',
              badge: '170g',
              smashBeef: true,
              cheeseLover: true,
              menuUpgradeable: true,
            },
          ],
        },
        {
          id: 'gyros',
          title: 'Gyros',
          subtitle: 'Authentic spices • House sauces',
          items: [
            {
              id: 'gyros-pita',
              name: 'Gyros Pita',
              description: 'Pita, gyros meat, onion, tomato, cucumber, sauce, cheese',
              price: '1 800 Ft',
              numericPrice: 1800,
              kcal: 690,
              proteinG: 34,
              carbsG: 62,
              fatG: 33,
              image: '/images/menu/gyros-pita.jpg',
              poultry: true,
              menuUpgradeable: true,
            },
            {
              id: 'gyros-kifli',
              name: 'Gyros Roll (Kifli)',
              description: 'Gyros meat, onion, cucumber, tomato, cheese, house sauce',
              price: '1 800 Ft / 2 200 Ft',
              numericPrice: 1800,
              kcal: 680,
              proteinG: 32,
              carbsG: 64,
              fatG: 32,
              image: '/images/menu/gyros-kifli.jpg',
              poultry: true,
              menuUpgradeable: true,
              variants: [
                { id: 'kicsi', label: 'Small', price: 1800, priceDisplay: '1 800 Ft', kcal: 680 },
                { id: 'nagy', label: 'Large', price: 2200, priceDisplay: '2 200 Ft', kcal: 890 },
              ],
            },
            {
              id: 'gyros-tortilla',
              name: 'Gyros Tortilla',
              description: 'Gyros meat, onion, cucumber, tomato, lettuce, sauce, grated cheese',
              price: '2 000 Ft',
              numericPrice: 2000,
              kcal: 740,
              proteinG: 35,
              carbsG: 66,
              fatG: 37,
              image: '/images/menu/gyros-tortilla.jpg',
              poultry: true,
            },
            {
              id: 'nagy-gyros-tal',
              name: 'Large Gyros Platter',
              description:
                'Fries, gyros meat, onion, cucumber, tomato, cabbage, lettuce, sauce, cheese',
              price: '2 900 Ft',
              numericPrice: 2900,
              kcal: 1160,
              proteinG: 56,
              carbsG: 96,
              fatG: 61,
              image: '/images/menu/nagy-gyros-tal.jpg',
              badge: 'Top',
              poultry: true,
            },
            {
              id: 'kis-gyros-tal',
              name: 'Small Gyros Platter',
              description:
                'Fries, gyros meat, cabbage, cucumber, red onion, tomato, lettuce, sauce, cheese',
              price: '2 500 Ft',
              numericPrice: 2500,
              kcal: 880,
              proteinG: 42,
              carbsG: 74,
              fatG: 46,
              image: '/images/menu/kis-gyros-tal.jpg',
              poultry: true,
            },
            {
              id: 'wrap-and-go',
              name: 'Wrap & Go',
              description:
                'Breaded chicken breast, lettuce, tomato, cucumber, red onion, sauce',
              price: '2 000 Ft',
              numericPrice: 2000,
              kcal: 720,
              proteinG: 33,
              carbsG: 68,
              fatG: 35,
              image: '/images/menu/wrap-and-go.jpg',
              poultry: true,
              menuUpgradeable: true,
            },
          ],
        },
        {
          id: 'kebab-doner',
          title: 'Kebab & Döner',
          subtitle: 'Original taste',
          items: [
            {
              id: 'doner-tal',
              name: 'Döner Platter',
              description:
                'Fries, kebab meat, red cabbage, red onion, cucumber, tartar, ketchup, cheese',
              price: '3 500 Ft',
              numericPrice: 3500,
              kcal: 1190,
              proteinG: 54,
              carbsG: 98,
              fatG: 64,
              image: '/images/menu/nagy-gyros-tal.jpg',
              cheeseLover: true,
            },
            {
              id: 'kebab-pita',
              name: 'Kebab Pita (Dürüm)',
              description: 'Pita, kebab meat, red cabbage, red onion, cucumber, tomato',
              price: '2 500 Ft',
              numericPrice: 2500,
              kcal: 730,
              proteinG: 36,
              carbsG: 64,
              fatG: 36,
              image: '/images/menu/kebab.jpg',
            },
            {
              id: 'kebab-tal',
              name: 'Kebab Platter',
              description: 'Kebab meat, red onion, cucumber, tartar, red cabbage, cheese',
              price: '3 500 Ft',
              numericPrice: 3500,
              kcal: 1120,
              proteinG: 52,
              carbsG: 88,
              fatG: 60,
              image: '/images/menu/kebab.jpg',
              cheeseLover: true,
            },
            {
              id: 'kebab-tortilla',
              name: 'Kebab Tortilla',
              description: 'Kebab meat, red onion, cucumber, tartar, red cabbage, cheese',
              price: '2 500 Ft',
              numericPrice: 2500,
              kcal: 780,
              proteinG: 37,
              carbsG: 66,
              fatG: 41,
              image: '/images/menu/gyros-tortilla.jpg',
              cheeseLover: true,
            },
          ],
        },
        {
          id: 'frissensultek',
          title: 'Fresh Grills',
          subtitle: 'Crispy coatings • Rich sides',
          items: [
            {
              id: 'bbq-sajt-bomba',
              name: 'BBQ Cheese Bomb',
              description: 'Chicken breast, bacon, smoked cheese, BBQ sauce, potatoes, salad',
              price: '3 500 Ft',
              numericPrice: 3500,
              kcal: 1080,
              proteinG: 56,
              carbsG: 84,
              fatG: 57,
              image: '/images/menu/bbq-sajt-bomba.jpg',
              poultry: true,
              cheeseLover: true,
            },
            {
              id: 'bbq-csirkemell',
              name: 'BBQ Chicken Breast',
              description: 'Chicken breast, onion rings, BBQ sauce, potatoes, salad',
              price: '3 500 Ft',
              numericPrice: 3500,
              kcal: 960,
              proteinG: 52,
              carbsG: 88,
              fatG: 44,
              image: '/images/menu/bbq-csirkemell.jpg',
              poultry: true,
            },
            {
              id: 'rantott-szelet',
              name: 'Breaded Chicken Cutlet',
              description: 'French fries, fresh salad, tartar sauce',
              price: '3 400 Ft',
              numericPrice: 3400,
              kcal: 940,
              proteinG: 49,
              carbsG: 84,
              fatG: 45,
              image: '/images/menu/rantott-szelet.jpg',
              poultry: true,
            },
            {
              id: 'feta-kremes-csirke',
              name: 'Feta-Stuffed Chicken Breast',
              description: 'Steak fries, fresh salad, tartar sauce',
              price: '3 600 Ft',
              numericPrice: 3600,
              kcal: 1020,
              proteinG: 54,
              carbsG: 82,
              fatG: 52,
              image: '/images/menu/feta-kremes-csirke.jpg',
              poultry: true,
              cheeseLover: true,
            },
            {
              id: 'rantott-brokkoli',
              name: 'Fried Broccoli',
              description: 'Sweet potato fries, cheddar sauce, BBQ sauce',
              price: '3 400 Ft',
              numericPrice: 3400,
              kcal: 820,
              proteinG: 18,
              carbsG: 90,
              fatG: 43,
              image: '/images/menu/rantott-brokkoli.jpg',
              cheeseLover: true,
            },
            {
              id: 'rantott-camembert',
              name: 'Fried Camembert with Blueberry',
              description: 'Duchess potatoes, blueberry sauce',
              price: '3 400 Ft',
              numericPrice: 3400,
              kcal: 980,
              proteinG: 32,
              carbsG: 88,
              fatG: 55,
              image: '/images/menu/rantott-camembert.jpg',
              cheeseLover: true,
              vegetarian: true,
            },
            {
              id: 'rantott-sajt',
              name: 'Fried Cheese',
              description: 'French fries, homemade tartar sauce',
              price: '2 900 Ft',
              numericPrice: 2900,
              kcal: 1040,
              proteinG: 38,
              carbsG: 86,
              fatG: 61,
              image: '/images/menu/rantott-sajt.jpg',
              cheeseLover: true,
              vegetarian: true,
            },
            {
              id: 'cheddar-sonka-csirke',
              name: 'Panko Chicken with Cheddar & Black Forest Ham',
              description: 'Panko-crusted stuffed chicken breast with sides',
              price: '3 900 Ft',
              numericPrice: 3900,
              kcal: 1140,
              proteinG: 58,
              carbsG: 86,
              fatG: 62,
              image: '/images/menu/cheddar-sonka-csirke.jpg',
              badge: 'Panko',
              poultry: true,
              cheeseLover: true,
            },
            {
              id: 'fustolt-sajtos-csirke',
              name: 'Smoked Cheese & Bacon Stuffed Chicken',
              description: 'Chicken breast, smoked cheese, bacon, potatoes, salad, sauce',
              price: '3 600 Ft',
              numericPrice: 3600,
              kcal: 1090,
              proteinG: 57,
              carbsG: 82,
              fatG: 59,
              image: '/images/menu/fustolt-sajtos-csirke.jpg',
              poultry: true,
              cheeseLover: true,
            },
            {
              id: 'csipos-csirke-csikok',
              name: 'Spicy Batter Chicken Strips',
              description: 'Crispy spicy chicken strips, rice, salad, tartar',
              price: '3 400 Ft',
              numericPrice: 3400,
              kcal: 950,
              proteinG: 48,
              carbsG: 92,
              fatG: 43,
              image: '/images/menu/csipos-csirke-csikok.jpg',
              spicy: true,
              poultry: true,
            },
            {
              id: 'joghurtos-alom',
              name: 'Yogurt Dream Chicken',
              description: 'Grilled chicken, yogurt dressing, parmesan, cheese, rice, salad, tartar',
              price: '3 200 Ft',
              numericPrice: 3200,
              kcal: 840,
              proteinG: 52,
              carbsG: 76,
              fatG: 36,
              image: '/images/menu/joghurtos-alom.jpg',
              poultry: true,
              cheeseLover: true,
            },
          ],
        },
        {
          id: 'nuggets',
          title: 'Nuggets',
          subtitle: 'Crispy & cheesy bites',
          items: [
            {
              id: 'chicken-nuggets',
              name: 'Chicken Nuggets',
              description: 'Golden crispy chicken nuggets',
              price: '800 Ft / 1 000 Ft',
              numericPrice: 800,
              kcal: 290,
              proteinG: 18,
              carbsG: 18,
              fatG: 16,
              image: '/images/menu/chicken-nuggets.jpg',
              poultry: true,
              menuUpgradeable: true,
              variants: [
                { id: '6db', label: '6 pcs', price: 800, priceDisplay: '800 Ft', kcal: 290 },
                { id: '10db', label: '10 pcs', price: 1000, priceDisplay: '1 000 Ft', kcal: 480 },
              ],
            },
            {
              id: 'chili-cheese-nuggets',
              name: 'Chili Cheese Nuggets',
              description: 'Spicy creamy cheese nuggets',
              price: '1 400 Ft / 1 600 Ft',
              numericPrice: 1400,
              kcal: 360,
              proteinG: 14,
              carbsG: 24,
              fatG: 23,
              image: '/images/menu/chili-cheese-nuggets.jpg',
              spicy: true,
              cheeseLover: true,
              vegetarian: true,
              menuUpgradeable: true,
              variants: [
                { id: '6db', label: '6 pcs', price: 1400, priceDisplay: '1 400 Ft', kcal: 360 },
                { id: '10db', label: '10 pcs', price: 1600, priceDisplay: '1 600 Ft', kcal: 590 },
              ],
            },
          ],
        },
        {
          id: 'uditok',
          title: 'Cold Drinks',
          subtitle: '+50 Ft DRS deposit fee',
          items: [
            {
              id: 'coca-cola-033',
              name: 'Coca-Cola (0.33L)',
              description: 'Original, Zero, Caffeine-Free (+50 Ft DRS)',
              price: '500 Ft',
              numericPrice: 550,
              kcal: 139,
              proteinG: 0,
              carbsG: 35,
              fatG: 0,
              image: '/images/menu/coca-cola-033.jpg',
            },
            {
              id: 'coca-cola-05',
              name: 'Coca-Cola (0.5L)',
              description: 'Original, Zero, Light (+50 Ft DRS)',
              price: '600 Ft',
              numericPrice: 650,
              kcal: 210,
              proteinG: 0,
              carbsG: 53,
              fatG: 0,
              image: '/images/menu/coca-cola-05.jpg',
            },
            {
              id: 'fanta-033',
              name: 'Fanta (0.33L)',
              description: 'Orange, Exotic, Cherry, Elderflower (+50 Ft DRS)',
              price: '500 Ft',
              numericPrice: 550,
              kcal: 142,
              proteinG: 0,
              carbsG: 35,
              fatG: 0,
              image: '/images/menu/fanta-033.jpg',
            },
            {
              id: 'kinley-05',
              name: 'Kinley Ginger Ale (0.5L)',
              description: 'Ginger Ale (+50 Ft DRS)',
              price: '600 Ft',
              numericPrice: 650,
              kcal: 185,
              proteinG: 0,
              carbsG: 45,
              fatG: 0,
              image: '/images/menu/kinley-05.jpg',
            },
            {
              id: 'xixo-025',
              name: 'XIXO Ice Teas & Lemonades',
              description: 'Mango, Raspberry, Apple, Kiwi, Orange (+50 Ft DRS)',
              price: '500 Ft',
              numericPrice: 550,
              kcal: 75,
              proteinG: 0,
              carbsG: 18,
              fatG: 0,
              image: '/images/menu/xixo-025.jpg',
            },
          ],
        },
      ],
    },
    cart: {
      title: 'ORDER CALCULATOR',
      emptyTitle: 'Your cart is empty',
      emptySub: 'Pick dishes from the menu to calculate your total, then call us in one tap!',
      comboLabel: '+ Combo (+700 Ft)',
      subtotalLabel: 'Subtotal',
      discountToggle10: '-10% First Responder ID',
      discountToggle20: '-20% Group Order (10+ people)',
      finalTotalLabel: 'Estimated Total',
      callToOrderCta: 'Call to Order',
      clearCartLabel: 'Clear cart',
      kcalToggleLabel: 'Calorie Breakdown',
      kcalTotalLabel: 'Estimated Total Calories',
      kcalDisclaimer: 'Approximate estimate (±15% variance)',
    },
    promos: {
      badge: 'DISCOUNTS',
      title: 'PERMANENT DEALS',
      cards: [
        {
          id: 'promo-heroes',
          visualType: 'responders',
          visualLabels: ['Police', 'Fire Dept', 'Ambulance'],
          badge: 'POLICE • FIRE • EMS',
          discountText: '-10%',
          title: 'First Responder Discount',
          highlights: [
            'Permanent 10% discount across the entire menu',
            'Valid with active service ID card',
          ],
          footnote: '*Cannot be combined with other offers.',
        },
        {
          id: 'promo-group',
          visualType: 'group',
          visualLabels: ['6th dish -50%', '10+ guests -20%'],
          badge: '6 OR 10+ GUESTS',
          discountText: '-50% / -20%',
          title: 'Group Order Deals',
          highlights: [
            '6 guests: 50% off the 6th organizer’s dish',
            '10+ guests: 20% off the entire order',
          ],
          footnote: '*Cannot be combined with other offers.',
        },
      ],
    },
    about: {
      badge: 'NYÍRBÁTOR • SZENTVÉR ÚT 19.',
      title: 'REAL FLAVOR. SEARED FRESH.',
      lead: '100% beef smash burgers, authentic spiced gyros, and crispy fresh platters.',
      paragraphs: [
        'Caramelized smash patties seared on a hot griddle, molten cheddar cheese sauce, and crisp daily vegetables with homemade sauces.',
      ],
      socialPrompt: 'Follow us for deals & new drops!',
      stickerCaptions: {
        gyros: 'Large Gyros Platter',
        burger: 'Double Smash Burger',
      },
      stats: [
        { value: '4.2 ★', label: '32+ Google' },
        { value: '100%', label: 'Beef & Poultry' },
        { value: '35+', label: 'Dishes & Boxes' },
        { value: '+700 Ft', label: 'Combo Upgrade' },
      ],
    },
    gallery: {
      badge: 'PHOTOS',
      title: 'GALLERY',
      items: [
        {
          id: 'gal-1',
          src: '/images/menu/smash-box-1.jpg',
          title: '6-pc Smash Box',
          categoryLabel: 'Smash Box',
        },
        {
          id: 'gal-2',
          src: '/images/brand/interior.jpg',
          title: 'Restaurant',
          categoryLabel: 'Interior',
        },
        {
          id: 'gal-3',
          src: '/images/menu/dupla-smash-burger.jpg',
          title: 'Double Smash Burger',
          categoryLabel: 'Burger',
        },
        {
          id: 'gal-4',
          src: '/images/menu/nagy-gyros-tal.jpg',
          title: 'Large Gyros Platter',
          categoryLabel: 'Gyros',
        },
        {
          id: 'gal-5',
          src: '/images/menu/gouda-boss-burger.jpg',
          title: 'Gouda Boss Burger',
          categoryLabel: 'Burger',
        },
        {
          id: 'gal-6',
          src: '/images/menu/smash-box-tray.jpg',
          title: 'Smash Box Tray',
          categoryLabel: 'Smash Box',
        },
        {
          id: 'gal-7',
          src: '/images/menu/cheddar-sajtos-burger.jpg',
          title: 'Cheddar Burger',
          categoryLabel: 'Burger',
        },
        {
          id: 'gal-8',
          src: '/images/menu/gyros-pita.jpg',
          title: 'Gyros Pita',
          categoryLabel: 'Gyros',
        },
      ],
    },
    reviews: {
      badge: 'GOOGLE MAPS',
      title: 'REVIEWS',
      ratingScore: '4.2 / 5.0',
      reviewCountBadge: '32+ Google reviews',
      viewAllLabel: 'All reviews',
      writeReviewLabel: 'Write a review',
      moreLabel: 'Details ▼',
      lessLabel: 'Less ▲',
      items: [
        {
          id: 'rev-turi-tamas',
          name: 'Turi Tamás',
          avatar: '/images/reviews/turitamas.png',
          rating: 5,
          text: 'The smash burger combo menu was delicious.',
          googleLink: 'https://maps.app.goo.gl/NyESXh7CyLGvzCYb8',
          extras: [
            { label: 'Food', value: '5 / 5' },
            { label: 'Service', value: '5 / 5' },
            { label: 'Atmosphere', value: '5 / 5' },
          ],
        },
        {
          id: 'rev-fodor-adam',
          name: 'Ádám Zsolt Fodor',
          avatar: '/images/reviews/adamzsoltfodor.png',
          rating: 5,
          text: 'Ordered a double beef burger menu for delivery — the food quality was outstanding and paired with the truffle mayo it is simply a phenomenal combo 😎 Respect and thank you for being here for the city!🔥',
          googleLink: 'https://maps.app.goo.gl/TtFuSjexFv8qAwud7',
          extras: [
            { label: 'Price / person', value: '4 000 – 6 000 Ft' },
            { label: 'Food', value: '5 / 5' },
            { label: 'Service', value: '5 / 5' },
            { label: 'Atmosphere', value: '5 / 5' },
          ],
        },
        {
          id: 'rev-nikoletta-szente',
          name: 'Nikoletta Szente',
          avatar: '/images/reviews/nikolettaszente.png',
          rating: 5,
          text: 'We were passing through yesterday and tried their new dish. We did not regret stopping here at all. Great plating, delicious flavors, and friendly service.',
          googleLink: 'https://maps.app.goo.gl/oFHBVmr3tS3X785Y9',
          extras: [
            { label: 'Food', value: '5 / 5' },
            { label: 'Service', value: '5 / 5' },
            { label: 'Atmosphere', value: '5 / 5' },
          ],
        },
        {
          id: 'rev-viktor-racz',
          name: 'Viktor Rácz',
          avatar: '/images/reviews/viktorracz.png',
          rating: 5,
          text: 'Had a double burger which was super tasty! Didn’t have to wait long at all, and the guys were really cool! I will definitely come back! High five to the chef!',
          googleLink: 'https://maps.app.goo.gl/zQoDxG6ymYfyt4gP8',
          extras: [
            { label: 'Food', value: '5 / 5' },
            { label: 'Service', value: '5 / 5' },
            { label: 'Atmosphere', value: '5 / 5' },
          ],
        },
        {
          id: 'rev-richard-csokai',
          name: 'Richard Csokai',
          avatar: '/images/reviews/richardcsokai.png',
          rating: 5,
          text: 'Best smash burger spot in the region',
          googleLink: 'https://maps.app.goo.gl/AYnH4j2ZiZx3f4kdA',
          extras: [
            { label: 'Food', value: '5 / 5' },
            { label: 'Service', value: '5 / 5' },
            { label: 'Atmosphere', value: '5 / 5' },
          ],
        },
        {
          id: 'rev-verzxy',
          name: 'Verzxy',
          avatar: '/images/reviews/verzxy.png',
          rating: 5,
          text: 'In my opinion the best burger place in Nyírbátor',
          googleLink: 'https://maps.app.goo.gl/a3nj5bcdRU1LE6As9',
          extras: [
            { label: 'Price / person', value: '2 000 – 4 000 Ft' },
            { label: 'Food', value: '5 / 5' },
            { label: 'Service', value: '5 / 5' },
            { label: 'Atmosphere', value: '5 / 5' },
          ],
        },
        {
          id: 'rev-bence-torok',
          name: 'Bence Török',
          avatar: '/images/reviews/bencetorok.png',
          rating: 5,
          text: 'Surprisingly amazing, I highly recommend it to everyone!',
          googleLink: 'https://maps.app.goo.gl/9eB9KDDWdjDz62s88',
          extras: [
            { label: 'Price / person', value: '2 000 – 4 000 Ft' },
            { label: 'Wait time', value: 'No wait' },
            { label: 'Food / Service', value: '5 / 5' },
          ],
        },
      ],
    },
    contact: {
      badge: 'LOCATION',
      title: 'CONTACT & HOURS',
      addressLabel: 'Address',
      addressValue: '4300 Nyírbátor, Szentvér út 19.',
      phoneLabel: 'Phone Orders',
      phoneDisplay: '+36 30 333 5114',
      messengerLabel: 'Inquiries & Chat',
      messengerValue: 'Facebook Messenger',
      messengerCta: 'Message Us',
      socialLabel: 'Social Media',
      socialSub: 'Follow us for deals & new drops!',
      hoursTitle: 'Opening Hours',
      hoursRows: [
        { day: 'Monday – Saturday', time: '11:00 – 21:00' },
        { day: 'Sunday', time: 'CLOSED', isClosed: true },
      ],
      directionsCta: 'Directions',
    },
    footer: {
      tagline: 'More than Gyros! • Real flavors in Nyírbátor.',
      quickLinksTitle: 'Menu',
      contactTitle: 'Contact',
      legalTitle: 'Legal',
      termsLabel: 'Terms (ÁSZF)',
      privacyLabel: 'Privacy',
      rightsReserved: 'All rights reserved.',
      demoNotice: 'This is a preview demonstration website developed by E-Brolo.',
    },
    legal: {
      closeLabel: 'Close',
      termsTitle: 'Terms of Service',
      termsUpdated: 'Effective: November 6, 2026',
      termsSections: [
        {
          heading: '1. Provider Details',
          body: [
            'Name: Gyros & Go Fast Food Restaurant',
            'Address: 4300 Nyírbátor, Szentvér út 19., Hungary',
            'Phone: +36 30 333 5114',
          ],
        },
        {
          heading: '2. Ordering & Pricing',
          body: [
            'The cart calculator on this website helps you assemble and calculate your order total before calling us by phone (+36 30 333 5114) or ordering in person.',
            'Canned and bottled drinks carry a mandatory +50 Ft DRS deposit fee. Calorie figures are approximate estimates (±15% variance). Discounts cannot be combined.',
          ],
        },
      ],
      privacyTitle: 'Privacy Policy',
      privacyUpdated: 'Effective: November 6, 2026',
      privacySections: [
        {
          heading: '1. Data Processing',
          body: [
            'This website does not store personal data on a server. Your cart items exist solely in your browser session to help you place your order by phone.',
          ],
        },
      ],
    },
  },
};

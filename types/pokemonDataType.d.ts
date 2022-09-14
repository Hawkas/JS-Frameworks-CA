export interface PokeDex {
  data: PokemonCard[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

export interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  ancientTrait?: AncientTrait;
  abilities?: Ability[];
  attacks?: Attack[];
  weaknesses?: Weakness[];
  resistances?: Resistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: Set;
  number: string;
  artist?: string;
  rarity: Rarity;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: Legality;
  images: CardImage;
  tcgplayer?: TCGPlayer;
  cardmarket?: Cardmarket;
}

////

export type Rarity =
  | 'Amazing Rare'
  | 'Common'
  | 'LEGEND'
  | 'Promo'
  | 'Rare'
  | 'Rare ACE'
  | 'Rare BREAK'
  | 'Rare Holo'
  | 'Rare Holo EX'
  | 'Rare Holo GX'
  | 'Rare Holo LV.X'
  | 'Rare Holo Star'
  | 'Rare Holo V'
  | 'Rare Holo VMAX'
  | 'Rare Prime'
  | 'Rare Prism Star'
  | 'Rare Rainbow'
  | 'Rare Secret'
  | 'Rare Shining'
  | 'Rare Shiny'
  | 'Rare Shiny GX'
  | 'Rare Ultra'
  | 'Uncommon';

export interface AncientTrait {
  name: string;
  text: string;
}

export interface Ability {
  name: string;
  text: string;
  type: string;
}

export interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface CardImage {
  small: string;
  large: string;
}

export interface Cardmarket {
  url: string;
  updatedAt: string;
  prices: {
    averageSellPrice: number | null;
    lowPrice: number | null;
    trendPrice: number | null;
    germanProLow: number | null;
    suggestedPrice: number | null;
    reverseHoloSell: number | null;
    reverseHoloLow: number | null;
    reverseHoloTrend: number | null;
    lowPriceExPlus: number | null;
    avg1: number | null;
    avg7: number | null;
    avg30: number | null;
    reverseHoloAvg1: number | null;
    reverseHoloAvg7: number | null;
    reverseHoloAvg30: number | null;
  };
}
export interface Legality {
  unlimited: string;
  expanded: string;
  standard: string;
}

export interface Resistance {
  type: string;
  value: string;
}

export interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImage;
}

export interface SetImage {
  symbol: string;
  logo: string;
}

export interface TCGPlayer {
  url: string;
  updatedAt: string;
  prices: Prices;
}

export interface Prices {
  normal: IPrice | undefined;
  holofoil: IPrice | undefined;
  reverseHolofoil: IPrice | undefined;
  '1stEditionNormal': IPrice | undefined;
  '1stEditionHolofoil': IPrice | undefined;
}
export interface IPrice {
  low: number | null;
  mid: number | null;
  high: number | null;
  market: number | null;
  directLow: number | null;
}

export interface Weakness {
  type: string;
  value: string;
}

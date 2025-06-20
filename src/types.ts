export interface LicenseFee {
  organizationName: string;
  feeBreakdown: {
    description: string;
    amount: number;
  }[];
  perLocationFee: number;
}

export interface GymRoom {
  classesPerWeek: number;
  classCapacity: number;
}

export type MusicUseType = 'group' | 'ambient';

export interface GymDetails {
  numberOfLocations: number;
  totalMembers: number;
  rooms: GymRoom[];
  squareFootage: number;
  musicUseTypes: MusicUseType[];
  isHfaaMember: boolean;
}

export interface SesacTier {
  min: number;
  max: number | null;
  feePerLocation: number;
}

export interface AscapGroupClassTier {
  min: number;
  max: number | null;
  fee: number | 'per_participant';
  perParticipantFee?: number;
}

export interface AscapSquareFootageTier {
  min: number;
  max: number | null;
  fee: number;
}

export interface AscapSocialEventsTier {
  min: number;
  max: number | null;
  fee: number;
}

export interface AscapChainDiscount {
  min: number;
  max: number | null;
  discountPercentage: number;
}

export const SESAC_TIERS: SesacTier[] = [
  { min: 1, max: 9, feePerLocation: 413.00 },
  { min: 10, max: 99, feePerLocation: 384.00 },
  { min: 100, max: 250, feePerLocation: 342.00 },
  { min: 251, max: 499, feePerLocation: 298.00 },
  { min: 500, max: null, feePerLocation: 261.00 },
];

export const ASCAP_GROUP_CLASS_TIERS: AscapGroupClassTier[] = [
  { min: 1, max: 500, fee: 529 },
  { min: 501, max: 1000, fee: 687 },
  { min: 1001, max: 1500, fee: 805 },
  { min: 1501, max: 2000, fee: 923 },
  { min: 2001, max: 3000, fee: 1242 },
  { min: 3001, max: 4000, fee: 1398 },
  { min: 4001, max: null, fee: 'per_participant', perParticipantFee: 0.34 }
];

export const ASCAP_SQUARE_FOOTAGE_TIERS: AscapSquareFootageTier[] = [
  { min: 0, max: 3750, fee: 329 },
  { min: 3751, max: 10000, fee: 435 },
  { min: 10001, max: null, fee: 499 }
];

export const ASCAP_SOCIAL_EVENTS_TIERS: AscapSocialEventsTier[] = [
  { min: 0, max: 3, fee: 161 },
  { min: 4, max: 12, fee: 473 },
  { min: 13, max: null, fee: 722 }
];

export const ASCAP_CHAIN_DISCOUNTS: AscapChainDiscount[] = [
  { min: 10, max: 500, discountPercentage: 5 },
  { min: 501, max: null, discountPercentage: 10 }
];

export const BMI_RATES = {
  groupFitnessClasses: 0.3670,
  ambientMusic: 0.2570,
  minimumFee: 410,
  maximumFee: 2790
} as const;

// Annual fee (estimate for custom-negotiated license)
export const GMR_ANNUAL_FEE = 500;

// BMI Chain Discount Tiers
export const BMI_CHAIN_DISCOUNTS = [
  { min: 1, max: 6, discountPercentage: 0 },
  { min: 7, max: 50, discountPercentage: 5 },
  { min: 51, max: 250, discountPercentage: 10 },
  { min: 251, max: 750, discountPercentage: 15 },
  { min: 751, max: null, discountPercentage: 20 }
] as const; 
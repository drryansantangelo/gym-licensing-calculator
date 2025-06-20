import {
  GymDetails,
  GymRoom, 
  LicenseFee, 
  MusicUseType,
  SESAC_TIERS,
  ASCAP_GROUP_CLASS_TIERS,
  ASCAP_SQUARE_FOOTAGE_TIERS,
  ASCAP_CHAIN_DISCOUNTS,
  BMI_RATES,
  BMI_CHAIN_DISCOUNTS,
  GMR_ANNUAL_FEE,
} from '../types';

function calculateAscapGroupClassFee(rooms: GymRoom[]): { fee: number; totalWeeklyParticipants: number } {
  // Handle invalid or empty input
  if (!rooms || !Array.isArray(rooms) || rooms.length === 0) {
    return { fee: 0, totalWeeklyParticipants: 0 };
  }

  // Calculate total weekly participants across all rooms
  const totalWeeklyParticipants = rooms.reduce((total, room) => {
    const weeklyParticipants = (room.classesPerWeek || 0) * (room.classCapacity || 0);
    return total + weeklyParticipants;
  }, 0);

  // Find the appropriate fee tier
  const tier = ASCAP_GROUP_CLASS_TIERS.find(
    (tier) => totalWeeklyParticipants >= tier.min &&
    (tier.max === null || totalWeeklyParticipants <= tier.max)
  );

  if (!tier) {
    return { fee: 0, totalWeeklyParticipants };
  }

  const fee = tier.fee === 'per_participant'
    ? (tier.perParticipantFee || 0) * totalWeeklyParticipants
    : tier.fee;

  return { fee, totalWeeklyParticipants };
}

export function calculateSesacFee(gymDetails: GymDetails): LicenseFee {
  if (gymDetails.isSoundtrackUser) {
    return {
      organizationName: 'SESAC',
      feeBreakdown: [{ description: 'Not required for Soundtrack Your Brand users', amount: 0 }],
      perLocationFee: 0,
      message: 'Not required with Soundtrack'
    };
  }

  const tier = SESAC_TIERS.find(
    (tier) =>
      gymDetails.numberOfLocations >= tier.min &&
      (tier.max === null || gymDetails.numberOfLocations <= tier.max)
  );
  
  if (!tier) {
    return {
      organizationName: 'SESAC',
      feeBreakdown: [{ description: 'Number of locations out of range', amount: 0 }],
      perLocationFee: 0
    };
  }
  
  return {
    organizationName: 'SESAC',
    feeBreakdown: [{
      description: `Per location fee for ${gymDetails.numberOfLocations} location tier`,
      amount: tier.feePerLocation
    }],
    perLocationFee: tier.feePerLocation
  };
}

export function calculateAscapFee(gymDetails: GymDetails): LicenseFee {
  const { numberOfLocations, rooms, squareFootage, musicUseTypes, isHfaMember } = gymDetails;
  
  const feeBreakdown: { description: string, amount: number }[] = [];
  let baseFee = 0;

  // 1. Group Classes Fee (if applicable)
  if (musicUseTypes.includes('group')) {
    const groupClassResult = calculateAscapGroupClassFee(rooms);
    if (groupClassResult.fee > 0) {
      let description = `${groupClassResult.totalWeeklyParticipants} participant capacity (Group Fitness Classes`;
      if (musicUseTypes.includes('ambient')) {
        description += ' – covers ambient use';
      }
      description += ')';

      feeBreakdown.push({
        description: description,
        amount: groupClassResult.fee
      });
      baseFee += groupClassResult.fee;
    }
  }

  // 2. Ambient Uses Fee (if applicable, and group fitness is not)
  if (musicUseTypes.includes('ambient') && !musicUseTypes.includes('group') && squareFootage > 0) {
    const squareFootageTier = ASCAP_SQUARE_FOOTAGE_TIERS.find(
      (tier) => squareFootage >= tier.min &&
      (tier.max === null || squareFootage <= tier.max)
    );

    if (squareFootageTier) {
      feeBreakdown.push({
        description: 'Ambient Uses Fee',
        amount: squareFootageTier.fee
      });
      baseFee += squareFootageTier.fee;
    }
  }

  // 3. Apply Chain Discount if applicable
  if (numberOfLocations >= 10) {
    const chainDiscount = ASCAP_CHAIN_DISCOUNTS.find(
      (tier) => numberOfLocations >= tier.min &&
      (tier.max === null || numberOfLocations <= tier.max)
    );

    if (chainDiscount) {
      const discountAmount = baseFee * (chainDiscount.discountPercentage / 100);
      feeBreakdown.push({
        description: `Chain Discount (${chainDiscount.discountPercentage}%)`,
        amount: -discountAmount
      });
      baseFee -= discountAmount;
    }
  }

  // 4. Apply HFAA Discount if applicable
  if (isHfaMember) {
    const hfaaDiscount = baseFee * 0.05; // 5% discount
    feeBreakdown.push({
      description: 'HFAA Member Discount (5%)',
      amount: -hfaaDiscount
    });
    baseFee -= hfaaDiscount;
  }

  return {
    organizationName: 'ASCAP',
    feeBreakdown,
    perLocationFee: baseFee
  };
}

export function calculateBmiFee(gymDetails: GymDetails): LicenseFee {
  const { numberOfLocations, totalMembers, musicUseTypes, isHfaMember } = gymDetails;
  
  // Get the highest rate based on selected music use types
  const rates = {
    group: BMI_RATES.groupFitnessClasses,
    ambient: BMI_RATES.ambientMusic
  };

  const applicableRates = musicUseTypes
    .map(type => rates[type as keyof typeof rates]);

  const rate = Math.max(...applicableRates, 0);
  const calculatedFee = rate * totalMembers;
  
  // Apply minimum and maximum constraints
  let perLocationFee = Math.max(BMI_RATES.minimumFee, calculatedFee);
  perLocationFee = Math.min(BMI_RATES.maximumFee, perLocationFee);

  const feeBreakdown = [
    {
      description: `${totalMembers} members @ $${rate.toFixed(4)} per member (${
        rate === BMI_RATES.groupFitnessClasses ? 'Group Fitness Classes' :
        rate === BMI_RATES.ambientMusic ? 'Ambient Music' : 'No music type selected'
      })`,
      amount: calculatedFee
    }
  ];

  // Add note about minimum/maximum adjustment if applicable
  if (calculatedFee < BMI_RATES.minimumFee) {
    feeBreakdown.push({
      description: `Adjusted to minimum fee ($${BMI_RATES.minimumFee} minimum applies)`,
      amount: BMI_RATES.minimumFee - calculatedFee
    });
  } else if (calculatedFee > BMI_RATES.maximumFee) {
    feeBreakdown.push({
      description: `Adjusted to maximum fee ($${BMI_RATES.maximumFee} maximum applies)`,
      amount: BMI_RATES.maximumFee - calculatedFee
    });
  }

  // Apply HFA Member Discount (5%)
  if (isHfaMember) {
    const discountAmount = perLocationFee * 0.05;
    feeBreakdown.push({
      description: 'HFA Member Discount (5%)',
      amount: -discountAmount
    });
    perLocationFee -= discountAmount;
  }

  // Apply Chain Discount
  const chainDiscount = BMI_CHAIN_DISCOUNTS.find(
    (tier) => numberOfLocations >= tier.min &&
    (tier.max === null || numberOfLocations <= tier.max)
  );

  if (chainDiscount && chainDiscount.discountPercentage > 0) {
    const chainDiscountAmount = perLocationFee * (chainDiscount.discountPercentage / 100);
    feeBreakdown.push({
      description: `Chain Discount (${chainDiscount.discountPercentage}%)`,
      amount: -chainDiscountAmount
    });
    perLocationFee -= chainDiscountAmount;
  }

  return {
    organizationName: 'BMI',
    feeBreakdown,
    perLocationFee
  };
}

export function calculateGmrFee(numberOfLocations: number): LicenseFee {
  return {
    organizationName: 'GMR',
    feeBreakdown: [{
      description: 'Estimated annual fee per location (custom-negotiated license)',
      amount: GMR_ANNUAL_FEE
    }],
    perLocationFee: GMR_ANNUAL_FEE
  };
}

export function calculateTotalFees(gymDetails: GymDetails): LicenseFee[] {
  return [
    calculateSesacFee(gymDetails),
    calculateAscapFee(gymDetails),
    calculateBmiFee(gymDetails),
    calculateGmrFee(gymDetails.numberOfLocations)
  ];
} 
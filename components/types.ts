export type StayDetails = {
  optionId: string;
  listingTitle?: string;
  propertyType?: string;
  neighbourhood?: string;
  nights?: number;
  pricePerNightUsd?: number;
  totalFor2NightsUsd?: number;
  guestRating?: number;
  reviewCount?: number;
  hostFirstName?: string;
  highlight?: string;
  checkIn?: string;
  checkOut?: string;
};

export type ExperienceDetails = {
  optionId: string;
  experienceTitle?: string;
  category?: string;
  hostFirstName?: string;
  date?: string;
  startTime?: string;
  durationHours?: number;
  pricePerGuestUsd?: number;
  totalFor2GuestsUsd?: number;
  rating?: number;
  meetingPoint?: string;
  availability?: string;
};

export type FoodDetails = {
  optionId: string;
  placeName?: string;
  cuisine?: string;
  neighbourhood?: string;
  meal?: string;
  priceLevel?: string;
  estCostFor2Usd?: number;
  walkFromStayMin?: number;
  bookingNote?: string;
};

export type CardItem =
  | { cardType: "stay"; details: StayDetails }
  | { cardType: "experience"; details: ExperienceDetails }
  | { cardType: "food"; details: FoodDetails };

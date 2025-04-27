export interface MemberDataResponse {
  value: Member;
}

export interface Member {
  id: number;
  nameListAs: string;
  nameDisplayAs: string;
  nameFullTitle: string;
  nameAddressAs: string | null;
  latestParty: Party;
  gender: string;
  latestHouseMembership: HouseMembership;
  thumbnailUrl: string;
}

export interface Party {
  id: number;
  name: string;
  abbreviation: string;
  backgroundColour: string;
  foregroundColour: string;
  isLordsMainParty: boolean;
  isLordsSpiritualParty: boolean;
  governmentType: number;
  isIndependentParty: boolean;
}

export interface HouseMembership {
  membershipFrom: string;
  membershipFromId: number;
  house: number;
  membershipStartDate: string;
  membershipEndDate: string | null;
  membershipEndReason: string | null;
  membershipEndReasonNotes: string | null;
  membershipEndReasonId: number | null;
  membershipStatus: MembershipStatus;
}

export interface MembershipStatus {
  statusIsActive: boolean;
  statusDescription: string;
  statusNotes: string | null;
  statusId: number;
  status: number;
  statusStartDate: string;
}

export type PageType = 'grouping' | 'meeting' | 'community' | 'profile';

export type StrictPropsWithChildren<P = unknown> = P & {
  children: React.ReactNode;
};

export interface ImageType {
  imageFile: File | null;
  imageBlob: string;
}

export interface TimeType {
  fromHour: string;
  fromMin: string;
  fromAmPm: AMPMType;
}

export type DateType = {
  year: string;
  month: string;
  date: string;
};

export type GenderType = '남성' | '여성';

export type AMPMType = 'AM' | 'PM';

export type CookieKeyType = {
  accessToken: string;
  refreshToken: string;
  userId: number;
};

export type PersonalityType = {
  id: number;
  emoji: string;
  keyword: string;
  keywordDTO: string;
};

export type ReliabilityType = 'HOOD' | 'MATE' | 'SOULMATE' | 'GLODDY';

export type ApplyStatusType = 'APPROVE' | 'REFUSE';

export type LatLng = {
  lat: number;
  lng: number;
};

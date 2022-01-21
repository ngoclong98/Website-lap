import DateRangeItem from "./models/DateRangeItem";

export const OTP_LENGTH: number = 6;
export const OTP_TIME = 60; // seconds;
export const REPLACE_IDENTIFIER = "*****";

export const VN_COUNTRY_CODE: string = "VN";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export const GenderDisplayMap = {
  [Gender.MALE]: "male",
  [Gender.FEMALE]: "female",
};
// export enum CardType {
//   PASSPORT = "FS0002",
//   CMND = "ZMBL02",
//   CCCD = "ZMBL03",
//   CMTQD = "ZMBL18",
// }

export const PAGE_SIZE = 10;

export enum ROOT_LOCATION_ACTION {
  CHARGE = "CHARGE",
}

export enum DONATE_TARGET_STATUS {
  ON_GOING = "ON_GOING",
  PAUSE = "PAUSE",
  COMPLETED = "COMPLETED",
  COMPLETE_TARGET = "COMPLETE_TARGET",
  DRAFT = "DRAFT",
  UNAVAILABLE = "UNAVAILABLE",
  FINISHED = "FINISHED",
}

export enum SEARCH_TARGET_STATUS {
  ON_GOING = "ON_GOING",
  COMPLETE_TARGET = "COMPLETE_TARGET",
  FINISHED = "FINISHED",
}

export const RECENT_DONATOR_FIRST_PAGE_SIZE = 5;
export const RECENT_DONATOR_NEXT_PAGE_SIZE = 15;
export const RECENT_DONATOR_MAX_RECORD = 20;
export const DEFAULT_PAGE_SIZE = 20;

export enum COLORS {
  PRIMARY = "#36f",
  SUCCESS = "#00d68f",
  ON_SURFACE = "#8f9bb3",
}

export enum DATE_RANGE_VALUE {
  ALL_TIME = "ALL_TIME",
  YESTERDAY = "YESTERDAY",
  WEEK_TO_DATE = "WEEK_TO_DATE",
  MONTH_TO_DATE = "MONTH_TO_DATE",
  LAST_WEEK = "LAST_WEEK",
  LAST_MONTH = "LAST_MONTH",
  LAST_7_DAY = "LAST_7_DAY",
  LAST_28_DAY = "LAST_28_DAY",
  LAST_30_DAY = "LAST_30_DAY",
  LAST_90_DAY = "LAST_90_DAY",
  CUSTOM = "CUSTOM",
}

export const DATE_RANGE_ITEMS: DateRangeItem[] = [
  { nameKey: "all-time", value: DATE_RANGE_VALUE.ALL_TIME },
  { nameKey: "yesterday", value: DATE_RANGE_VALUE.YESTERDAY },
  { nameKey: "week-to-date", value: DATE_RANGE_VALUE.WEEK_TO_DATE },
  { nameKey: "month-to-date", value: DATE_RANGE_VALUE.MONTH_TO_DATE },
  { nameKey: "last-week", value: DATE_RANGE_VALUE.LAST_WEEK },
  { nameKey: "last-month", value: DATE_RANGE_VALUE.LAST_MONTH },
  { nameKey: "last-7-day", value: DATE_RANGE_VALUE.LAST_7_DAY },
  { nameKey: "last-28-day", value: DATE_RANGE_VALUE.LAST_28_DAY },
  { nameKey: "last-30-day", value: DATE_RANGE_VALUE.LAST_30_DAY },
  { nameKey: "last-90-day", value: DATE_RANGE_VALUE.LAST_90_DAY },
];

export const EXCHANGE_DATE_FORMAT = "DD/MM/YYYY";

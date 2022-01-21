import { TableInfoItem } from "src/components/TableInfo";

export const REVENUE_DATA = [
  {
    date: "01/11",
    currentPeriod: 150,
    previousPeriod: 100,
  },
  {
    date: "05/11",
    currentPeriod: 80,
    previousPeriod: 113,
  },
  {
    date: "09/11",
    currentPeriod: 200,
    previousPeriod: 210,
  },
  {
    date: "11/11",
    currentPeriod: 80,
    previousPeriod: 10,
  },
  {
    date: "16/11",
    currentPeriod: 150,
    previousPeriod: 170,
  },
  {
    date: "20/11",
    currentPeriod: 20,
    previousPeriod: 100,
  },
  {
    date: "25/11",
    currentPeriod: 100,
    previousPeriod: 130,
  },
  {
    date: "29/11",
    currentPeriod: 150,
    previousPeriod: 120,
  },
];
export const DONUT_DATA =[
  { name: "Tranfer-MB", value: 350 },
  { name: "Tranfer-Interbank", value: 150 },
  { name: "Others", value: 230 },
  { name: "Cash", value: 200 },
];
export const FUNNEL_DATA = [
  {
    _id: "5de52b4ac4275a463f912042",
    item: "All sessions",
    label: "All sessions",
    percent: 100,
    quantity: 143750,
  },
  {
    _id: "5de52b4ac4275a463f912041",
    item: "Sessions w Checkout",
    label: "Sessions w Checkout",
    percent: "25.71",
    quantity: 785,
  },
  {
    _id: "5de52b4ac4275a463f912040",
    item: "Sessions w Purchase",
    label: "Sessions w Purchase",
    percent: 0,
    quantity: 442,
  },
];
export const SUBCRIPTION_DATA: TableInfoItem[] = [
  {
    name: "New subscribers",
    value: "79,601",
    changePercent: -7.5,
  },
  {
    name: "New subscriptions",
    value: "84,826",
    changePercent: -7.5,
  },
  {
    name: "Recurring Payments",
    value: "49,991",
    changePercent: 4.2,
  },
  {
    name: "Recurring Revenue",
    value: "29,450M",
    changePercent: -7.5,
  },
  {
    name: "Failure Payment Rate",
    value: "45.41%",
    changePercent: 5.0,
  },
];

export const TOP_MERCHANT_BY_SESSION_DATA: TableInfoItem[] = [
  {
    name: "Horoscope",
    value: "945.8K",
    changePercent: -7.5,
  },
  {
    name: "Cashin Ecom",
    value: "945.8K",
    changePercent: -7.5,
  },
  {
    name: "Thiennguyen",
    value: "945.8K",
    changePercent: 4.2,
  },
  {
    name: "MB Ageas",
    value: "945.8K",
    changePercent: -7.5,
  },
  {
    name: "Mobilott",
    value: "945.8K",
    changePercent: 5.0,
  },
];

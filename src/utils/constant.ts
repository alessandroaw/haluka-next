import { DateFilterItem } from "src/types/models";
import { getNDaysAgo } from "src/utils/helper";

export const BASE_URL = "https://haluka-api.herokuapp.com";

export const kDateFilterItems: DateFilterItem[] = [
  // Hari ini (00:00 - now)
  {
    label: "Hari ini",
    startedAt: getNDaysAgo(0),
    endedAt: getNDaysAgo(-1),
  },
  {
    label: "Kemarin",
    startedAt: getNDaysAgo(1),
    endedAt: getNDaysAgo(0),
  },
  // 3 hari terakhir
  {
    label: "3 hari terakhir",
    startedAt: getNDaysAgo(3),
    endedAt: getNDaysAgo(-1),
  },
  // 7 hari terakhir
  {
    label: "7 hari terakhir",
    startedAt: getNDaysAgo(7),
    endedAt: getNDaysAgo(-1),
  },
  // 14 hari terakhir
  {
    label: "14 hari terakhir",
    startedAt: getNDaysAgo(14),
    endedAt: getNDaysAgo(-1),
  },
  // 30 hari terakhir
  {
    label: "30 hari terakhir",
    startedAt: getNDaysAgo(30),
    endedAt: getNDaysAgo(-1),
  },
  // Bulan ini
  {
    label: "Bulan ini",
    startedAt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endedAt: getNDaysAgo(-1),
  },
];

export const kCallMethod = ["GSM", "Suara Whatsapp", "Video Whatsapp"];

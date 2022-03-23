import { ParsedUrlQuery } from "querystring";

export interface CallFilterQuery extends ParsedUrlQuery {
  dateRange?: string;
  boothNumber?: string;
  method?: string;
  status?: string;
}

import { SEARCH_TARGET_STATUS } from "src/Constants";

interface SearchDonateTargetParams {
  donateTargetMiniappStatus: SEARCH_TARGET_STATUS;
  pageSize?: number;
  nextPageId?: string | null;
  keyword?: string | null;
}
export default SearchDonateTargetParams;

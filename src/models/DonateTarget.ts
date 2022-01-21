import Media from "./Media";
import Payment from "./Payment";
import Photo from "./Photo";
import UserDonator from "./UserDonator";
import UserProfile from "./UserProfile";

interface DonateTarget {
  id?: string;
  createdTime?: string;
  updatedTime?: string;
  endTime?: string;
  description: string;
  name: string;
  actualAmount?: number;
  targetAmount?: number;
  remainingAmount?: number;
  status?: string;
  paused?: boolean;
  permalink?: string;
  nbDonation?: number;
  nbDonator?: number;
  liked?: boolean;
  canUpdate?: boolean;
  saved?: boolean;
  hidden?: boolean;
  deleted?: boolean;
  syntax?: string;
  photo?: Photo;
  owner?: UserProfile;
  payment?: Payment;
  medias?: Media[];
  recentDonators?: UserDonator[];
  hasOnhome?: boolean | null;
  canUpdateSyntax?: boolean;
}
export default DonateTarget;

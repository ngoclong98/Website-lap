import BankAccount from "./BankAccount";
import Photo from "./Photo";

interface UserProfile {
  id: string;
  fullname: string;
  username: string;
  profilePhoto: Photo;
  verified?: boolean;
  enableDonate: boolean;
  facebookUrl: string | null;
  youtubeUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
  biography: string | null;
  permalink: string | null;
  defaultBankAccount?: BankAccount;
  followed?: boolean;
  framePhoto?: string | null;
  gender?: string | null;
  showFrame?: boolean;
  blocked?: boolean;
  defaultBannerPhoto?: boolean;
  defaultProfilePhoto?: boolean;
  nbDonation?: number;
}
export default UserProfile;

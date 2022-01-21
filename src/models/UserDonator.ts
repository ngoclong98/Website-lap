import UserProfile from "./UserProfile";
interface UserDonator {
  user?: UserProfile;
  amount?: number;
  incognito?: boolean;
}
export default UserDonator;

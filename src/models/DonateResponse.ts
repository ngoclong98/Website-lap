import Payment from "./Payment";
import UserProfile from "./UserProfile";

interface DonateResponse {
  id: string;
  createdTime: string;
  amount: number;
  message: string | null;
  payment?: Payment;
  incognito: boolean;
  status: string;
  doneeUser?: UserProfile;
}
export default DonateResponse;

import DonateTarget from "./DonateTarget";
import Payment from "./Payment";
import Transaction from "./Transaction";
import UserProfile from "./UserProfile";

interface Donation {
  id: string;
  amount: number;
  code: string;
  createdTime: string;
  updatedTime: string;
  message: string | null;
  donateMessageHiddenConfig: null;
  donateTarget: DonateTarget | null;
  doneeUser: UserProfile;
  hiddenDonateMessage: boolean;
  incognito: boolean;
  payment: Payment;
  status: string;
  user: UserProfile | null;
  transaction: Transaction;
}
export default Donation;

import BankAccount from "./BankAccount";
interface Payment {
  bankAccount: BankAccount;
  paymentAmount?: number;
  paymentDescription?: string;
  vietQrCode?: string;
  mbAppDeepLinkUrl?: string;
}
export default Payment;

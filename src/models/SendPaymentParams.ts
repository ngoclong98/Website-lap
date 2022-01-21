interface SendPaymentParams {
  bankCode?: string;
  accountNo?: string;
  amount?: number | null;
  description?: string;
}
export default SendPaymentParams;

interface BankAccount {
  id: string;
  bankCode: string;
  bankName: string;
  accountNo: string;
  accountName: string;
  bankPhoto: string;
  accountBalance?: number;
  supportTransactionHistory?: boolean;
  defaultAccount?: boolean;
  updatedTime?: string;
}
export default BankAccount;

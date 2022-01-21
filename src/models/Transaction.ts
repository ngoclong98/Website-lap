interface Transaction {
  id: string;
  transactionTime: string;
  type: string;
  method: string;
  transactionAmount: number;
  feeAmount: number;
  otherBankCode: string;
  otherBankName: string;
  otherBankPhoto: string;
  otherAccountNo: string;
  otherAccountName: string;
  narrative: string;
  hiddenNarrative: true;
}
export default Transaction;

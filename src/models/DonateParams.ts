interface DonateParams {
  userId: string;
  amount: number | null;
  message: string | null;
  donateTargetId: string | null;
  incognito: boolean;
}
export default DonateParams;

interface Bank {
  cardLengths: number[];
  code: string;
  id: string;
  name: string;
  photo: string;
  requireOpenDate?: boolean;
  requireExpDate?: boolean;
}
export default Bank;

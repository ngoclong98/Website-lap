import DonateTarget from "./DonateTarget";

interface Banner {
  activeStatus: string;
  content: string;
  createdTime: string | null;
  displayNameButton: null;
  displayPriority: number | null;
  id: string;
  link: string | null;
  name: string;
  photo: string;
  updateTime: string | null;
  updatedTime: string | null;
  titleNavigationName: string | null;
  navigationType: string | null;
  donateTarget: DonateTarget | null;
}

export default Banner;

import Photo from "./Photo";

interface UserSimple {
  id: string;
  username?: string;
  fullname: string;
  profilePhoto?: Photo;
  followed: boolean;
  verified: boolean;
  blocked?: boolean;
  gender?: string;
}
export default UserSimple;

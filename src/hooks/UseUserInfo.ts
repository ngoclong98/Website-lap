import { useEffect } from "react";
import { getUserInfo } from "src/api";
import UserProfile from "src/models/UserProfile";
import useLocalStorage from "./UseLocalStorage";

const useUserInfo = (): UserProfile | null => {
  const [userInfo, setUserInfo] = useLocalStorage("user_info", null);
  const _loadUserInfo = async () => {
    try {
      const userInfoRes = await getUserInfo();
      console.log("userProfileRes", userInfoRes);
      setUserInfo(userInfoRes.data);
    } catch (err) {
      console.log("Load userProfile err", err);
    }
  };
  useEffect(() => {
    _loadUserInfo();
  }, []);
  return userInfo;
};

export default useUserInfo;

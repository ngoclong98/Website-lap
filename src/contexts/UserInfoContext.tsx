import React from "react";
import useLocalStorage, { SetValue } from "src/hooks/UseLocalStorage";
import UserInfo from "src/models/UserInfo";

interface UserInfoContextValue {
  userInfo?: UserInfo | null | undefined;
  setUserInfo: SetValue<UserInfo>;
}
export const UserInfoContext = React.createContext<UserInfoContextValue>({
  userInfo: null,
  setUserInfo: () => {},
});

export const UserInfoProvider = (props) => {
  const [userInfo, setUserInfo] = useLocalStorage<UserInfo>(
    "user-info",
    undefined
  );
  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {props.children}
    </UserInfoContext.Provider>
  );
};

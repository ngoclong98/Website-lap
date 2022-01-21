import UserProfile from "src/models/UserProfile";

class UserInfoService {
  static setInfo(
    accessToken: string,
    refreshToken: string,
    loginToken?: string,
    userInfo?: string
  ) {
    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("refresh_token", refreshToken);
    if (loginToken) {
      sessionStorage.setItem("login_token", loginToken);
    }
    if (userInfo) {
      localStorage.setItem("user_info", JSON.stringify(userInfo));
    }
  }

  static getAccessToken(): string | null {
    return sessionStorage.getItem("access_token");
  }

  static getRefreshToken(): string | null {
    return sessionStorage.getItem("refresh_token");
  }

  static setLoginToken(loginToken: string) {
    sessionStorage.setItem("login_token", loginToken);
  }

  static getLoginToken = (): string | null => {
    return sessionStorage.getItem("login_token");
  };

  static clearInfo() {
    localStorage.removeItem("user_info");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
  }

  static setUserInfo(userInfo: UserProfile) {
    localStorage.setItem("user_info", JSON.stringify(userInfo));
  }

  static getUserInfo(): UserProfile | null {
    const userInfoStr = localStorage.getItem("user_info");
    if (!userInfoStr) return null;
    try {
      const userInfo: UserProfile = JSON.parse(userInfoStr);
      return userInfo;
    } catch (err) {
      console.log("Parse UserInfo err", err);
      return null;
    }
  }
}

export default UserInfoService;

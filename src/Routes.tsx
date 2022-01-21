import { Switch, Route, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import UserInfoService from "./services/UserInfoService";
import { login, getUserInfo } from "src/api";
import qs from "qs";
// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ThienNguyen from "./pages/ThienNguyen";
import LoginFailed from "./components/LoginFailed";
import NotFound from "./pages/NotFound";
import UserProfile from "./models/UserProfile";
import Loading from "./components/Loading";
import Login from "./pages/Login";

const AuthRoute = ({ ...rest }) => {
  const location = useLocation();
  const [logining, setLogining] = useState<boolean>(true);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [accountLocked, setAccountLocked] = useState<boolean>(false);

  const _loginByToken = useCallback(async () => {
    let queryUrl = location.search;
    const queryParams = qs.parse(queryUrl, { ignoreQueryPrefix: true });
    const loginToken = queryParams?.loginToken as string;
    console.log("loginToken", loginToken);

    if (!loginToken) {
      if (!UserInfoService.getAccessToken()) {
        setLoginFailed(true);
      }
      setLogining(false);
      return;
    }

    if (
      !UserInfoService.getAccessToken() ||
      loginToken !== UserInfoService.getLoginToken()
    ) {
      try {
        setLogining(true);
        const loginRes = await login(loginToken);
        console.log("Login Res", loginRes);
        UserInfoService.setInfo(
          loginRes?.data?.access_token,
          loginRes?.data?.refresh_token,
          loginToken
        );
        const userInfoRes = await getUserInfo();
        console.log("userInfoRes", userInfoRes);
        UserInfoService.setUserInfo(userInfoRes.data as UserProfile);
        setLogining(false);
        setLoginFailed(false);
        setAccountLocked(false);
      } catch (err: any) {
        console.log("Login err", err, err?.response);
        if (err?.response?.data?.error_code === "account-locked") {
          setAccountLocked(true);
        } else {
          setAccountLocked(false);
        }
        setLoginFailed(true);
        setLogining(false);
      }
    } else {
      setLogining(false);
      return;
    }
  }, [location]);

  useEffect(() => {
    _loginByToken();
  }, [location, _loginByToken]);
  if (logining) return <Loading />;
  if (loginFailed) {
    return <LoginFailed locked={accountLocked} />;
  }
  return <Route {...rest} />;
};

interface RouteData {
  exact?: boolean;
  component: React.ComponentType<any>;
  path: string;
  auth?: boolean;
}

export enum RouteKey {
  login,
  dashboard,
  homeDemo,
  thiennguyen,
  notFound,
}

export const Routes: Record<RouteKey, RouteData> = {
  [RouteKey.login]: {
    exact: true,
    path: "/login",
    component: Login,
    auth: false,
  },
  [RouteKey.dashboard]: {
    exact: true,
    path: "/",
    component: Dashboard,
    auth: false,
  },
  [RouteKey.thiennguyen]: {
    exact: true,
    path: "/thiennguyen",
    component: ThienNguyen,
    auth: false,
  },
  
  [RouteKey.homeDemo]: {
    exact: true,
    path: "/home-demo",
    component: Home,
    auth: true,
  },
  [RouteKey.notFound]: {
    exact: false,
    path: "*",
    component: NotFound,
    auth: false,
  },
};

const AppRouter = () => {
  const routes: React.ReactNode[] = [];
  for (let routeKey in Routes) {
    const route = Routes[routeKey] as RouteData;
    if (route.auth) {
      routes.push(
        <AuthRoute
          exact={route?.exact || false}
          path={route.path}
          component={route.component}
          key={route.path}
        />
      );
    } else {
      routes.push(
        <Route
          path={route.path}
          key={route.path}
          exact={route?.exact || false}
          component={route.component}
        />
      );
    }
  }
  return <Switch>{routes}</Switch>;
};

export default AppRouter;

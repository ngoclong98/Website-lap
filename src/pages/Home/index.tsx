import { useCallback, useEffect, useState } from "react";
import Toolbar from "src/components/Toolbar";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import HeaderBottomBar from "src/components/HeartBottomBar";
import useUserInfo from "src/hooks/UseUserInfo";
import useConfig from "src/hooks/UseConfig";
import Loading from "src/components/Loading";
import PullToRefresh from "react-simple-pull-to-refresh";
import UserInfoService from "src/services/UserInfoService";
import UiService from "src/services/UiService";
import {
  fetchBanner,
  fetchDonateTarget,
  fetchPopularUser,
  selectBanner,
  selectDonateTarget,
  selectLoadingDonateTarget,
  selectLoadingMoreDonateTarget,
  selectLoadingPopularBanner,
  selectPopularBanner,
} from "src/redux/HomeSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import useLocalStorage from "src/hooks/UseLocalStorage";
import { logout } from "src/api";
import Utils from "src/utils/Utils";

const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  useConfig();
  const [activeImageIndex, setActiveImageIndex] = useLocalStorage<number>(
    "homeBannerIndex",
    0,
    history.action !== "POP"
  );
  const dispatch = useAppDispatch();
  const banners = useAppSelector(selectBanner);
  const popularUser = useAppSelector(selectPopularBanner);
  const loadingPopularUser = useAppSelector(selectLoadingPopularBanner);
  const homeDonateTarget = useAppSelector(selectDonateTarget);
  const loadingDonateTarget = useAppSelector(selectLoadingDonateTarget);
  const loadingMoreDonateTarget = useAppSelector(selectLoadingMoreDonateTarget);

  const userInfo = useUserInfo();

  const _loadBanner = useCallback(async () => {
    dispatch(fetchBanner());
  }, [dispatch]);

  const _loadPopularUser = useCallback(async () => {
    dispatch(fetchPopularUser());
  }, [dispatch]);

  const _loadHomeDonateTarget = useCallback(
    async (
      nextPageId: string | null = null,
      hasOnHome: boolean | null = null
    ) => {
      dispatch(fetchDonateTarget({ hasOnHome, nextPageId }));
    },
    [dispatch]
  );

  const _load = useCallback(async () => {
    await Promise.all([
      _loadBanner(),
      _loadHomeDonateTarget(),
      _loadPopularUser(),
    ]);
  }, [_loadBanner, _loadHomeDonateTarget, _loadPopularUser]);

  const _checkDeepLink = () => {
    console.log("donateTargetId", queryParams.get("donateTargetId"));
    if (queryParams.has("donateTargetId")) {
      const donateTargetId = queryParams.get("donateTargetId");
      queryParams.delete("donateTargetId");
      history.replace({
        search: queryParams.toString(),
      });
      history.push(`/donate-target?id=${donateTargetId}`);
    }
  };

  useEffect(() => {
    _load();
    _checkDeepLink();
  }, []);

  const _handleRefresh = async () => {
    await _load();
  };

  const _handleBack = async () => {
    try {
      UiService.showLoading();
      const logoutRes = await logout();
      console.log("logoutRes", logoutRes);
    } catch (err) {
      console.log("logout err", err);
    } finally {
      UiService.hideLoading();
      UserInfoService.clearInfo();
      window.localStorage.removeItem("homeBannerIndex");
      Utils.closeWebview();
    }
  };

  const _loadMore = () => {
    if (
      !homeDonateTarget?.nextPageId ||
      !homeDonateTarget.list ||
      homeDonateTarget.list.length === 0 ||
      loadingMoreDonateTarget
    ) {
      return;
    }

    _loadHomeDonateTarget(
      homeDonateTarget?.nextPageId,
      homeDonateTarget.list[0].hasOnhome
    );
  };

  const _handleScroll = (e) => {
    if (Utils.isScrollToEnd(e)) {
      _loadMore();
    }
  };

  return (
    <div className="screenContainer">
      <Toolbar title={t("app-name")} onClickPrefixIcon={_handleBack} />
      <PullToRefresh
        onRefresh={_handleRefresh}
        refreshingContent={<Loading containerClassName="columnCenter" />}
        pullingContent=""
      >
        <div
          className="screenScrollContainer refreshContent"
          onScroll={_handleScroll}
        >
          {!!loadingMoreDonateTarget && (
            <Loading containerClassName={"columnCenter"} />
          )}
          <div className="heartBarSpacer" />
        </div>
      </PullToRefresh>
      <HeaderBottomBar />
    </div>
  );
};

export default Home;

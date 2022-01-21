import {
  RECENT_DONATOR_FIRST_PAGE_SIZE,
  SEARCH_TARGET_STATUS,
} from "src/Constants";
import DonateParams from "src/models/DonateParams";
import SearchDonateTargetParams from "src/models/SearchDonateTargerParams";
import SearchUserDonateTargetParams from "src/models/SearchUserDonateTargetParams";
import { get, post } from "./common";

export const login = (token: string) => {
  return post({ url: "/api/miniapp/authentication/login", params: { token } });
};

export const logout = () => {
  return post({ url: "/api/miniapp/authentication/logout" });
};

export const refreshToken = (refreshToken: string) => {
  return post({
    url: "/api/miniapp/authentication/refresh-token",
    params: { refreshToken },
  });
};

export const getUserInfo = () => {
  return get({ url: "/api/miniapp/user/on-home" });
};

export const getConfig = () => {
  return get({ url: "api/miniapp/common/config" });
};

// Home Api
export const getHomeDonateTarget = (
  nextPageId: string | null,
  hasOnHome: boolean | null = null,
  pageSize: number = 5
) => {
  return get({
    url: "/api/miniapp/donate-target/home",
    params: { nextPageId, hasOnHome, pageSize },
  });
};

export const getBanner = () => {
  return get({ url: "/api/miniapp/banner" });
};

export const getBannerDetail = (bannerId: string) => {
  return get({ url: `/api/miniapp/banner/${bannerId}` });
};

export const getPopularUser = () => {
  return get({ url: "/api/miniapp/user/popular" });
};

export const getStatisticNumber = () => {
  return get({ url: "/api/miniapp/home" });
};

// Donate Api
export const getDonateTargetDetail = (id: string) => {
  return get({ url: `/api/miniapp/donate-target/${id}` });
};

export const getDonateTargetsSameAccount = (
  userId: string,
  donateTargetId: string
) => {
  return get({
    url: `/api/miniapp/user/${userId}/donate-targets`,
    params: { userId, donateTargetId },
  });
};

export const getDonateTargetListDonator = (
  donateTargetId: string,
  nextPageId: string | null | undefined = null,
  pageSize: number | null | undefined = RECENT_DONATOR_FIRST_PAGE_SIZE
) => {
  return get({
    url: `/api/miniapp/donate-target/${donateTargetId}/list-donator`,
    params: { donateTargetId, nextPageId, pageSize },
  });
};

export const getDonateTargetListDonation = (
  donateTargetId: string,
  nextPageId: string | null | undefined = null,
  pageSize: number | null | undefined = RECENT_DONATOR_FIRST_PAGE_SIZE
) => {
  return get({
    url: `/api/miniapp/donate-target/${donateTargetId}/list-donation`,
    params: { donateTargetId, nextPageId, pageSize },
  });
};

export const getWish = () => {
  return get({ url: "/api/miniapp/wish" });
};

export const donate = (params: DonateParams) => {
  return post({
    url: `/api/miniapp/user/${params.userId}/donate`,
    params: {
      amount: params.amount,
      message: params.message,
      donateTargetId: params.donateTargetId,
      incognito: params.incognito,
    },
  });
};

export const getUserProfile = (userId: string) => {
  return get({ url: `/api/miniapp/user/${userId}` });
};

export const searchAccount = (
  pageSize: number = 21,
  nextPageId: string | null = null,
  keyword: string | null = null
) => {
  return get({
    url: `/api/miniapp/user/ranking-search`,
    params: {
      pageSize,
      nextPageId,
      keyword,
    },
  });
};

export const searchDonateTarget = (params: SearchDonateTargetParams) => {
  return get({
    url: `/api/miniapp/donate-target/search`,
    params: {
      donateTargetMiniappStatus: params.donateTargetMiniappStatus,
      pageSize: params.pageSize || 20,
      nextPageId: params.nextPageId || null,
      keyword: params.keyword || null,
    },
  });
};

export const searchUserDonateTarget = (
  params: SearchUserDonateTargetParams
) => {
  return get({
    url: `/api/miniapp/user/${params.userId}/search-donate-target`,
    params: {
      donateTargetMiniappStatus: params.donateTargetMiniappStatus,
      pageSize: params.pageSize || 20,
      nextPageId: params.nextPageId || null,
      keyword: params.keyword || null,
    },
  });
};

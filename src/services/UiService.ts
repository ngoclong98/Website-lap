import React from "react";
import { GlobalPopupConfirmRef } from "../components/GlobalPopupConfirm";
import { PopupConfirmProps } from "../components/PopupConfirm";
import { LoadingModalRef } from "src/components/LoadingModal";
class UiService {
  static popupInstance: React.MutableRefObject<
    GlobalPopupConfirmRef | undefined
  >;
  static loadingInstance: React.MutableRefObject<LoadingModalRef | undefined>;

  static openPopup(data: PopupConfirmProps) {
    UiService.popupInstance?.current?.open(data);
  }

  static closePopup() {
    UiService.popupInstance?.current?.close();
  }

  static showLoading() {
    UiService.loadingInstance?.current?.open();
  }

  static hideLoading() {
    UiService.loadingInstance?.current?.close();
  }
}

export default UiService;

import {
  REPLACE_IDENTIFIER,
  DATE_RANGE_VALUE,
  EXCHANGE_DATE_FORMAT,
} from "src/Constants";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SendPaymentParams from "src/models/SendPaymentParams";
import DonateTarget from "src/models/DonateTarget";
import { TFunction } from "react-i18next";
import { DONATE_TARGET_STATUS } from "src/Constants";
import DateRange from "src/models/DateRange";
dayjs.extend(customParseFormat);
export default class Utils {
  static isValidEmail(str: string) {
    if (!str) return false;
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = emailRegex.test(str);
    if (result === true) {
      if (str[str.indexOf("@") + 1] === "-" || str[str.length - 1] === "-") {
        return false;
      }
    }
    return result;
  }

  static isValidPhoneNumer(str: string) {
    if (!str) return false;
    if (str.length !== 10) return false;
    if (str[0] !== "0") return false;
    let phoneRegexStr = "^\\d{10}$";
    let phoneRegex = new RegExp(phoneRegexStr);
    return phoneRegex.test(str);
  }

  static removeAccent = (str: string): string => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  };

  static censorPhoneNumber = (phone: string) => {
    let splitArr = phone.split("");
    splitArr.splice(3, 3, "x", "x", "x");
    return splitArr.join("");
  };

  static censorGTTT = (gttt: string) => {
    let splitArr = gttt.split("");
    splitArr.splice(3, 2, "x", "x");
    return splitArr.join("");
  };

  static formatDate = (date: Date, format = "DD/MM/YYYY") => {
    return dayjs(date).format(format);
  };

  static covertToDate = (dateStr: string, format = "DD/MM/YYYY"): Date => {
    return dayjs(dateStr, format).toDate();
  };

  static formatDateFromString = (
    dateStr: string,
    inputFormat: string,
    outputFormat: string
  ): string => {
    return dayjs(dateStr, inputFormat).format(outputFormat);
  };

  static getFileBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result as string);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  };

  static getFileType = (file: File) => {
    if (file.name.toLowerCase().endsWith("pdf")) {
      return "PDF";
    }
    if (
      file.name.toLowerCase().endsWith("jpg") ||
      file.name.toLowerCase().endsWith("jpeg")
    ) {
      return "JPG";
    }
    if (file.name.toLowerCase().endsWith("png")) {
      return "PNG";
    }
    return "";
  };

  static getReplaceText = (
    text: string,
    replaceValue,
    replaceIdentifier?: string
  ): string => {
    return text.replace(replaceIdentifier || REPLACE_IDENTIFIER, replaceValue);
  };

  static getReplaceTextMulti = (
    text: string,
    replaceValue: string[],
    replaceIdentifier: string = REPLACE_IDENTIFIER
  ): string => {
    const splitTextArr = text.split(replaceIdentifier);
    console.log("Split arr", splitTextArr);
    let newText = "";
    for (let i = 0; i < splitTextArr.length; i++) {
      newText += splitTextArr[i];
      if (i < splitTextArr.length - 1) {
        newText += replaceValue[i];
      }
    }
    return newText;
  };

  static isValidUploadImageSize = (imageFile: File) => {
    return imageFile.size < 5242880;
  };

  static isValidImageFileType = (imageFile: File) => {
    const lowerCaseName = imageFile.name.toLowerCase();
    return (
      lowerCaseName.endsWith(".pdf") ||
      lowerCaseName.endsWith(".jpg") ||
      lowerCaseName.endsWith(".jpeg") ||
      lowerCaseName.endsWith(".png")
    );
  };

  static isValidCMND = (cmnd: string) => {
    if (!cmnd) return false;
    if (cmnd.length !== 9 && cmnd.length !== 12) return false;
    let cmndRegexStr = "^\\d{12}$";
    if (cmnd.length === 9) {
      cmndRegexStr = "^\\d{9}$";
    }
    let cmndRegex = new RegExp(cmndRegexStr);
    return cmndRegex.test(cmnd);
  };

  static isValidCCCD = (cccd: string) => {
    if (!cccd) return false;
    if (cccd.length !== 12) return false;
    let cccdRegexStr = "^\\d{12}$";
    let cccdRegex = new RegExp(cccdRegexStr);
    return cccdRegex.test(cccd);
  };

  static isValidPassport = (passport: string) => {
    const passportRegexStr = "^[a-zA-Z0-9]{6,}$";
    let passportRegex = new RegExp(passportRegexStr);
    return passportRegex.test(passport);
  };

  static isValidCMTQD = (cmtqd: string) => {
    const cmtqdRegexStr = "^[a-zA-Z0-9]{6,}$";
    let cmtqdRegex = new RegExp(cmtqdRegexStr);
    return cmtqdRegex.test(cmtqd);
  };

  static isNotContainSpecialCharacter = (text: string) => {
    const notContainSpecialCharacterRegexStr = "^[a-zA-Z0-9]+$";
    let notContainSpecialCharacterRegex = new RegExp(
      notContainSpecialCharacterRegexStr
    );
    return notContainSpecialCharacterRegex.test(text);
  };

  static formatPhoneNumber = (phone: string): string | null => {
    let cleaned = ("" + phone).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{4})(\d+)$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return null;
  };

  static formatMoney = (str: any): string => {
    if (str == null || typeof str == "undefined" || str.length === 0) return "";
    if (typeof str === "number") {
      str = Math.floor(str);
    }
    str = "" + str;
    str = str.replace(/\D/g, "");
    if (str.length === 2 && str[1] === 0 && str[0] === 0) {
      return "0";
    }
    let temp = str;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] !== "0") {
        temp = temp.substr(i);
        if (temp.length > 1 && temp[0] === ".") {
          temp = temp.substr(1);
        }
        if (temp < 0) {
          return (
            "-" +
            temp
              .toString()
              .replace(/\D/g, "")
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
          );
          // console.log("temp ==", temp.toString().replace(/\D/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1\."))
        } else {
          return temp
            .toString()
            .replace(/\D/g, "")
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
      }
    }
    if (str < 0) {
      return (
        "-" +
        str
          .toString()
          .replace(/\D/g, "")
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      );
    } else {
      return str
        .toString()
        .replace(/\D/g, "")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  };

  static closeWebview = () => {
    if (window?.ReactNativeWebView) {
      window?.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: "go_back",
          source: "web_mobile",
        })
      );
    }
  };

  static openNewWebView = (name: string, link: string) => {
    console.log("openNewWebView", name, link);
    if (window?.ReactNativeWebView) {
      window?.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: "MINIAPP_OPEN_NEW_WEBVIEW",
          name,
          link,
        })
      );
    } else {
      window.location.href = link;
    }
  };

  static openBrowser = (link: string) => {
    console.log("openBrowser", link);
    if (window?.ReactNativeWebView) {
      window?.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: "OPEN_BROWSER",
          link,
        })
      );
    } else {
      window.location.href = link;
    }
  };

  static sendPayment = (data: SendPaymentParams) => {
    console.log("sendPayment params", data);
    if (window?.ReactNativeWebView) {
      window["ReactNativeWebView"].postMessage(
        JSON.stringify({
          type: "THIEN_NGUYEN_TRANSFER",
          data: {
            bankCode: data.bankCode,
            accountNo: data.accountNo,
            amount: data.amount,
            description: data.description,
          },
        })
      );
    }
  };

  static sendExtendSession = () => {
    console.log("sendExtendSession");
    if (window?.ReactNativeWebView) {
      window?.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: "MINIAPP_EXTEND_SESSION",
        })
      );
    }
  };

  static isMonthYearInFuture = (monthYear: string): boolean => {
    const day = dayjs(monthYear, "YYYY-MM");
    if (!day) return false;
    const today = dayjs();
    return (
      day.year() > today.year() ||
      (day.year() === today.year() && day.month() > today.month())
    );
  };

  static isMonthYearInThePast = (monthYear: string): boolean => {
    const day = dayjs(monthYear, "YYYY-MM");
    if (!day) return false;
    const today = dayjs();
    return (
      day.year() < today.year() ||
      (day.year() === today.year() && day.month() < today.month())
    );
  };

  static formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return "";
    return (
      cardNumber
        .replace(/\D/g, "")
        .match(/.{1,4}/g)
        ?.join(" ") || ""
    );
  };

  static getAccountNoDisplay = (accountNo?: string): string => {
    if (!accountNo) return "";
    return `MB-${accountNo}`;
  };

  static getDonateTargetTimeRemainingText = (
    data: DonateTarget,
    t: TFunction<"translation">
  ): string => {
    if (
      data.status === DONATE_TARGET_STATUS.COMPLETED ||
      data.status === DONATE_TARGET_STATUS.FINISHED ||
      data.status === DONATE_TARGET_STATUS.PAUSE
    ) {
      if (data.paused) return t("paused");
      return t("completed");
    }
    if (!data.endTime) {
      return t("no-end-time");
    }

    const now = dayjs();
    const endTime = data.endTime;
    const remainDay = dayjs(endTime).diff(now, "day");
    if (remainDay >= 1) {
      return `${t("remain")} ${remainDay} ${t("daylc")}`;
    }
    const remainHour = dayjs(endTime).diff(now, "hour");
    if (remainHour > 1) {
      return `${t("remain")} ${Math.max(remainHour, 0)} ${t("hourlc")}`;
    }
    const remainMinute = dayjs(endTime).diff(now, "minute");
    return `${t("remain")} ${Math.max(remainMinute, 0)} ${t("minutelc")}`;
  };

  static getDonateProgress = (data?: DonateTarget) => {
    if (!data?.targetAmount) return 0;
    return (data.actualAmount || 0) / data.targetAmount;
  };

  static getDonateProgressPercentageText = (data: DonateTarget) => {
    const progress = Utils.getDonateProgress(data);
    return `${Math.ceil(progress * 100)}%`;
  };

  static isOnGoingTarget = (data?: DonateTarget): boolean => {
    if (!data) return false;
    return data.status === DONATE_TARGET_STATUS.ON_GOING;
  };

  static isFinishedTarget = (data?: DonateTarget): boolean => {
    if (!data) return false;
    return (
      data.status === DONATE_TARGET_STATUS.PAUSE ||
      data.status === DONATE_TARGET_STATUS.COMPLETED ||
      data.status === DONATE_TARGET_STATUS.FINISHED
    );
  };

  static isScrollToEnd = (e: any) => {
    const target = e.target;
    return (
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      45
    );
  };

  static getDisplayUserName = (username?: string): string => {
    if (!username) {
      return "";
    }
    return `@${username}`;
  };

  static getPredefineDateRange = (value): DateRange | null => {
    const now = dayjs();
    switch (value) {
      case DATE_RANGE_VALUE.ALL_TIME: {
        const yesterday = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
        return { startDate: null, endDate: yesterday, rangeType: value };
      }
      case DATE_RANGE_VALUE.YESTERDAY: {
        const yesterday = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
        return { startDate: yesterday, endDate: yesterday, rangeType: value };
      }

      case DATE_RANGE_VALUE.WEEK_TO_DATE: {
        if (now.day() === 0) {
          // Sunday
          const startDate = now
            .subtract(1, "week")
            .startOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        } else if (now.day() === 1) {
          // Monday
          const startDate = now
            .subtract(1, "week")
            .startOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        } else {
          const startDate = now
            .startOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        }
      }

      case DATE_RANGE_VALUE.MONTH_TO_DATE: {
        // First day of month
        console.log("Now date", now.date());
        if (now.date() === 1) {
          const startDate = now
            .subtract(1, "month")
            .startOf("month")
            .format(EXCHANGE_DATE_FORMAT);
          const endDate = now
            .subtract(1, "month")
            .endOf("month")
            .format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        } else {
          const startDate = now.startOf("month").format(EXCHANGE_DATE_FORMAT);
          const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        }
      }

      case DATE_RANGE_VALUE.LAST_WEEK: {
        // Sunday
        if (now.day() === 0) {
          const startDate = now
            .subtract(2, "week")
            .startOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          const endDate = now
            .subtract(2, "week")
            .endOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        } else {
          const startDate = now
            .subtract(1, "week")
            .startOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          const endDate = now
            .subtract(1, "week")
            .endOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        }
      }

      case DATE_RANGE_VALUE.LAST_MONTH: {
        const previousMonth = now.subtract(1, "month");
        const startDate = previousMonth
          .startOf("month")
          .format(EXCHANGE_DATE_FORMAT);
        const endDate = previousMonth
          .endOf("month")
          .format(EXCHANGE_DATE_FORMAT);
        return { startDate, endDate, rangeType: value };
      }

      case DATE_RANGE_VALUE.LAST_7_DAY: {
        const startDate = now.subtract(7, "day").format(EXCHANGE_DATE_FORMAT);
        const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
        return { startDate, endDate, rangeType: value };
      }

      case DATE_RANGE_VALUE.LAST_28_DAY: {
        const startDate = now.subtract(28, "day").format(EXCHANGE_DATE_FORMAT);
        const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
        return { startDate, endDate, rangeType: value };
      }

      case DATE_RANGE_VALUE.LAST_30_DAY: {
        const startDate = now.subtract(30, "day").format(EXCHANGE_DATE_FORMAT);
        const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
        return { startDate, endDate, rangeType: value };
      }

      case DATE_RANGE_VALUE.LAST_90_DAY: {
        const startDate = now.subtract(90, "day").format(EXCHANGE_DATE_FORMAT);
        const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
        return { startDate, endDate, rangeType: value };
      }

      default:
        return null;
    }
  };
}

import Toolbar from "src/components/Toolbar";
import { useTranslation } from "react-i18next";
import styles from "./LoginFailed.module.scss";
import Button from "react-bootstrap/Button";
import Utils from "src/utils/Utils";
import errorLoginImg from "src/assets/images/error-login.png";
import Image from "../Image";
import accessDenyImg from "src/assets/images/access-deny.png";
import useConfig from "src/hooks/UseConfig";
interface LoginFailedProps {
  locked: boolean;
}

const LoginFailed = ({ locked = false }) => {
  const { t } = useTranslation();
  const config = useConfig();
  console.log("Config", config);

  const _handleBack = () => {
    Utils.closeWebview();
  };

  return (
    <div className="screenContainer">
      <Toolbar title={t("app-name")} onClickPrefixIcon={_handleBack} />
      <div className={`${styles.emptyStateContainer} screenScrollContainer`}>
        {locked ? (
          <>
            <Image
              src={accessDenyImg}
              className={styles.accessDenyImg}
              alt="Login error"
            />
            <div className="subTitle16 text-center mb24">
              {t("access-deny-title")}
            </div>
            <div className="body14 textGray text-center mb48">
              {t("access-deny-content") + " " + (config?.hotline || "")}
            </div>
          </>
        ) : (
          <>
            <Image
              src={errorLoginImg}
              className={styles.loginFailedImg}
              alt="Login error"
            />
            <div className="title18 text-center mb-4">
              {t("general-error-title")}
            </div>
            <div className="body14 textGray text-center mb48">
              {t("login-failed-message")}
            </div>
          </>
        )}

        <Button variant="primary" onClick={_handleBack}>
          {t("close")}
        </Button>
      </div>
    </div>
  );
};

export default LoginFailed;

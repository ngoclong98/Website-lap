import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Input from "src/components/Input";
import styles from "./Login.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const _handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const _handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="screenContainer">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className={styles.loginFormCard}>
            <div className={styles.loginTitle}>{t("app-name")}</div>
            <div className="mb-4">
              <Input
                label={t("username")}
                value={username}
                onChange={_handleChangeUsername}
              />
            </div>
            <div className="mb-5">
              <Input
                label={t("password")}
                value={password}
                onChange={_handleChangePassword}
                type="password"
              />
            </div>
            <Button variant="primary">{t("login")}</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

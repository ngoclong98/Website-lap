import styles from "./HeartBottomBar.module.scss";
import heartImg from "src/assets/images/heart.gif";
import Image from "src/components/Image";
import { useHistory } from "react-router-dom";

const HeaderBottomBar = () => {
  const history = useHistory();
  const _handleClickHeart = () => {
    history.push("/about");
  };
  return (
    <Image
      src={heartImg}
      alt="Heart"
      className={styles.heartImg}
      onClick={_handleClickHeart}
    />
  );
};

export default HeaderBottomBar;

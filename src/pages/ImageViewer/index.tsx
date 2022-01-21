import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import styles from "./ImageViewer.module.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ImageViewerParams from "src/models/ImageViewerParams";
import BlurToolbar from "src/components/BlurToolbar";
import closeWhiteImg from "src/assets/images/close-white.png";
import Image from "src/components/Image";

const ImageViewer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const data = location.state as ImageViewerParams;
  const [photoIndex, setPhotoIndex] = useState<number>(data.index || 0);
  const history = useHistory();
  const _getImageSrc = (index: number): string => {
    return data.images[index].large?.url || "";
  };

  const _closeImage = () => {
    history.goBack();
  };

  const _renderCloseBtn = () => {
    return (
      <div className={styles.closeImgContainer}>
        <Image
          src={closeWhiteImg}
          className={styles.closeImg}
          alt="Close"
          onClick={_closeImage}
        />
      </div>
    );
  };

  const _getTitle = () => {
    if (data.images.length <= 1) return "";
    return `${photoIndex + 1} / ${data.images.length}`;
  };

  return (
    <div className="screenContainer">
      <BlurToolbar
        className={styles.toolbar}
        leftComponent={_renderCloseBtn()}
        title={_getTitle()}
      />
      <div className={styles.container}>
        <Lightbox
          imagePadding={0}
          clickOutsideToClose={false}
          reactModalStyle={{
            content: {
              top: "calc(var(--statusbar-height) + 44px)",
              bottom: "calc(var(--statusbar-height) + 44px)",
            },
          }}
          wrapperClassName={"lightboxHideNavigateControl"}
          mainSrc={_getImageSrc(photoIndex)}
          nextSrc={_getImageSrc((photoIndex + 1) % data.images.length)}
          prevSrc={_getImageSrc(
            (photoIndex + data.images.length - 1) % data.images.length
          )}
          onCloseRequest={() => {}}
          onMovePrevRequest={() => {
            setPhotoIndex(
              (photoIndex + data.images.length - 1) % data.images.length
            );
          }}
          onMoveNextRequest={() => {
            setPhotoIndex((photoIndex + 1) % data.images.length);
          }}
        />
      </div>
    </div>
  );
};

export default ImageViewer;

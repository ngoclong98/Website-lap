import Offcanvas from "react-bootstrap/Offcanvas";
import Toolbar from "../Toolbar";
import DateInput from "src/components/DateInput";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DATE_RANGE_ITEMS,
  DATE_RANGE_VALUE,
  EXCHANGE_DATE_FORMAT,
} from "src/Constants";
import DateRangeItem from "src/models/DateRangeItem";
import Utils from "src/utils/Utils";
import DateRange from "src/models/DateRange";
import { CheckLg } from "react-bootstrap-icons";
import styles from "./DateRangeSidebar.module.scss";
interface DateRangeSidebarProps {
  show: boolean;
  onHide: () => void;
  onSelectDateRange: (value: DateRange | null) => void;
  value?: DateRange | null;
}
const DateRangeSidebar = ({
  show,
  onHide,
  onSelectDateRange,
  value,
}: DateRangeSidebarProps) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const _handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const _handleClearStartDate = () => {
    setStartDate(undefined);
  };

  const _handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
    if (startDate) {
      onHide();
      onSelectDateRange({
        rangeType: DATE_RANGE_VALUE.CUSTOM,
        startDate: Utils.formatDate(startDate, EXCHANGE_DATE_FORMAT),
        endDate: Utils.formatDate(newValue, EXCHANGE_DATE_FORMAT),
      });
    }
  };

  const _handleClearEndDate = () => {
    setEndDate(undefined);
  };

  const _handleClickPredefineDateRangeItem = (item: DateRangeItem) => {
    console.log("_handleClickPredefineDateRangeItem", item);
    onHide();
    console.log("Date range", Utils.getPredefineDateRange(item.value));
    onSelectDateRange(Utils.getPredefineDateRange(item.value));
  };

  const _renderPredefineDateRange = (item: DateRangeItem, index: number) => {
    return (
      <div
        className={"sidebarItem"}
        key={item.nameKey}
        onClick={() => _handleClickPredefineDateRangeItem(item)}
      >
        <div className="flex-fill">{t(item.nameKey)}</div>
        {item.value === value?.rangeType && (
          <CheckLg className={styles.checkIcon} />
        )}
      </div>
    );
  };

  return (
    <Offcanvas show={show} onHide={onHide}>
      <Toolbar onClickPrefixIcon={onHide} title="" fixed={false} />
      <Offcanvas.Body className={"sidebarBody"}>
        <div className={"sidebarHeader"}>{t("choose-one-time-range-item")}</div>
        {DATE_RANGE_ITEMS.map(_renderPredefineDateRange)}
        <div className={"sidebarHeader"}>
          <div className="flex-fill">{t("custom")}</div>
          {value?.rangeType === DATE_RANGE_VALUE.CUSTOM && (
            <CheckLg className={styles.checkIcon} />
          )}
        </div>
        <div className="pe-3">
          <DateInput
            placeholder={t("choose-start-date")}
            value={startDate}
            onChange={_handleChangeStartDate}
            onClear={_handleClearStartDate}
          />
        </div>
        <div className="pe-3">
          <DateInput
            placeholder={t("choose-end-date")}
            value={endDate}
            onChange={_handleChangeEndDate}
            onClear={_handleClearEndDate}
          />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default DateRangeSidebar;

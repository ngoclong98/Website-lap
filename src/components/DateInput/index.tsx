import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker, {
  DayValue,
  Day,
} from "@hassanmojab/react-modern-calendar-datepicker";
import styles from "./DateInput.module.scss";
// import calendarImg from "src/assets/images/calendar.svg";
import Utils from "src/utils/Utils";
import { XCircleFill } from "react-bootstrap-icons";

const vnLocale = {
  // months list by order
  months: [
    "Th 1",
    "Th 2",
    "Th 3",
    "Th 4",
    "Th 5",
    "Th 6",
    "Th 7",
    "Th 8",
    "Th 9",
    "Th 10",
    "Th 11",
    "Th 12",
  ],

  // week days by order
  weekDays: [
    {
      name: "Thứ 2",
      short: "T2",
    },
    {
      name: "Thứ 3",
      short: "T3",
    },
    {
      name: "Thứ 4",
      short: "T4",
    },
    {
      name: "Thứ 5",
      short: "T5",
    },
    {
      name: "Thứ 6",
      short: "T6",
    },
    {
      name: "Thứ 7",
      short: "T7",
      isWeekend: true,
    },
    {
      name: "Chủ Nhật", // used for accessibility
      short: "CN", // displayed at the top of days' rows
      isWeekend: true, // is it a formal weekend or not?
    },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 6,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject) {
    return gregorainTodayObject;
  },

  // return a native JavaScript date here
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day);
  },

  // return a number for date's month length
  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate();
  },

  // return a transformed digit to your locale
  transformDigit(digit) {
    return digit;
  },

  // texts in the date picker
  nextMonth: "Next Month",
  previousMonth: "Previous Month",
  openMonthSelector: "Open Month Selector",
  openYearSelector: "Open Year Selector",
  closeMonthSelector: "Close Month Selector",
  closeYearSelector: "Close Year Selector",
  defaultPlaceholder: "Select...",

  // for input range value
  from: "from",
  to: "to",

  // used for input value when multi dates are selected
  digitSeparator: ",",

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
};

interface DateInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: Date) => void;
  value?: Date;
  errorText?: string;
  maximumDate?: Day;
  labelHelperIcon?: React.ReactNode;
  onClear?: () => void;
}

const DateInput = ({
  label,
  required,
  placeholder,
  onChange,
  value,
  errorText,
  labelHelperIcon,
  onClear,
  ...passProps
}: // value,
// onChange,
DateInputProps) => {
  const _handleChangeDate = (value: DayValue) => {
    if (onChange != null && value) {
      onChange(new Date(value.year, value.month - 1, value.day));
    }
  };

  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      className={"datePicker form-control" + (!!errorText ? " is-invalid" : "")}
      ref={ref} // necessary
      value={value ? Utils.formatDate(value) : ""}
      placeholder={placeholder}
    />
  );

  return (
    <div>
      {!!label && (
        <Form.Label htmlFor="identity-card-type" className="fullWidth">
          <div className="rowStart flex1 body14 w600 textGray">
            {label}
            {required && <span className="required"> *</span>}
            {labelHelperIcon && labelHelperIcon}
          </div>
        </Form.Label>
      )}
      <InputGroup hasValidation={!!errorText}>
        <div className={styles.datePickerContainer}>
          <DatePicker
            onChange={_handleChangeDate}
            value={
              value != null
                ? {
                    day: value.getDate(),
                    month: value.getMonth() + 1,
                    year: value.getFullYear(),
                  }
                : null
            }
            inputPlaceholder={placeholder}
            shouldHighlightWeekends
            locale={vnLocale}
            renderInput={renderCustomInput}
            {...passProps}
          />
          {/* <img
            src={calendarImg}
            className={styles.calendarIcon}
            alt={"Calendar"}
          /> */}
          {!!value && (
            <XCircleFill size={16} color={"#fff"} onClick={onClear} />
          )}
        </div>
        {!!errorText && !!onClear && (
          <div className="invalidText">{errorText}</div>
        )}
      </InputGroup>
    </div>
  );
};

export default DateInput;

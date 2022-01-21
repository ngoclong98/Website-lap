import ChangeBadge from "../ChangeBadge";
import { Triangle } from "react-bootstrap-icons";
import { TableInfoItem } from "../TableInfo";

interface TableProps {
  title?: string;
  tableTitle: string;
  data: TableInfoItem[];
}

const Table = ({ title, tableTitle, data }: TableProps) => {
  const _renderTableRow = (item: TableInfoItem, index: number) => {
    return (
      <div
        className={
          index >= data.length - 1 ? "chartTalbeItemLast" : "chartTalbeItem"
        }
        key={index}
      >
        <div className="chartTableItemName flex2">{item.name}</div>
        <div className="chartTableItemValue flex1 d-flex flex-row justify-content-end">
          {item.value}
        </div>
        <div className="flex1 d-flex flex-row justify-content-end">
          <ChangeBadge size={"small"} value={item.changePercent} />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="chartTitle">{title}</div>
      <div className="chartTableHeader">
        <div className="subTitle12 textOnSurface flex2">{tableTitle}</div>
        <div className="subTitle12 textOnSurface d-flex flex-row justify-content-end flex1">
          Last 30 days
        </div>
        <div className="flex1 d-flex flex-row justify-content-end textOnPrimary">
          <Triangle fontSize={12} />
        </div>
      </div>
      {data.map(_renderTableRow)}
    </>
  );
};

export default Table;

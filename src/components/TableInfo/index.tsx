import Table from "../Table";

export interface TableInfoItem {
  name: string;
  value: any;
  changePercent: number;
}

interface TableInfoProps {
  title?: string;
  tableTitle: string;
  data: TableInfoItem[];
}
const TableInfo = ({ title, tableTitle, data }: TableInfoProps) => {
  return (
    <div className="chartContainer">
      {!!title && <div className="chartTitle">{title}</div>}
      <Table tableTitle={tableTitle} data={data} />
    </div>
  );
};
export default TableInfo;

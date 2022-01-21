import Utils from "src/utils/Utils";
import ChangeBadge from "../ChangeBadge";
interface SingleNumberInfoProps {
  title: string;
  value: number;
  changePercent?: number;
}
const SingleNumberInfo = ({
  title,
  value,
  changePercent,
}: SingleNumberInfoProps) => {
  return (
    <div className="chartContainer">
      <div className="chartTitle">{title}</div>
      <div className="rowCenter largeChartInfo">{Utils.formatMoney(value)}</div>
      {!!changePercent && (
        <div>
          <div className="rowCenter mt8 mb8">
            <ChangeBadge value={changePercent} size={"normal"} />
          </div>
          <div className="textOnSurfaceLight body14 text-center">
            Comparision period: 60
          </div>
        </div>
      )}
    </div>
  );
};
export default SingleNumberInfo;

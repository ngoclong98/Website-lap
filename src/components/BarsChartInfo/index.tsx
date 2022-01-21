import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import { COLORS } from "src/Constants";
import Utils from "src/utils/Utils";
import ChangeBadge from "../ChangeBadge";

interface BarsChartInfoProps {
  data: any[];
  title: string;
  value: number;
  changePercent?: number;
  xAxisDataKey: string;
  dataKeys: string[];
  colors: string[];
  barSize: number;
  showLegend?: boolean;
}

const BarsChartInfo = ({
  data,
  title,
  value,
  changePercent,
  xAxisDataKey,
  dataKeys,
  colors,
  barSize,
  showLegend = true,
}: BarsChartInfoProps) => {
  const chartHeight = showLegend ? 270 : 240;

  const _renderBar = (item: string, index: number) => {
    return (
      <Bar key={index} dataKey={item} barSize={barSize} fill={colors[index]} />
    );
  };

  const _renderBarChart = () => {
    return (
      <BarChart
        data={data}
        barCategoryGap={3}
        barGap={2}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey={xAxisDataKey} stroke={COLORS.ON_SURFACE} />
        <YAxis stroke={COLORS.ON_SURFACE} />
        <CartesianGrid stroke={COLORS.ON_SURFACE} strokeDasharray="3 3" />
        <Tooltip />
        {showLegend && <Legend verticalAlign="bottom" height={30} />}
        {dataKeys.map(_renderBar)}
      </BarChart>
    );
  };

  return (
    <div className="chartContainer">
      <div className="chartTitle">{title}</div>
      <div className="rowStart mb16">
        <div className="rowCenter largeChartInfo2 mr12">
          {Utils.formatMoney(value)}
        </div>
        {!!changePercent && (
          <div className="d-flex flex-column flex-start">
            <div className="mb2 d-flex flex-row">
              <ChangeBadge value={changePercent} size={"small"} />
            </div>
            <div className="textOnSurfaceLight body14 text-center">
              Comparision period: 60
            </div>
          </div>
        )}
      </div>
      <ResponsiveContainer width={"100%"} height={chartHeight}>
        {_renderBarChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default BarsChartInfo;

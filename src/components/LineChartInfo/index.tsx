import ChangeBadge from "../ChangeBadge";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { COLORS } from "src/Constants";

interface LineChartInfoProps {
  title: string;
  value: any;
  changePercent?: number;
  data: any[];
  xAxisDataKey: string;
  dataKeys: string[];
  colors: string[];
}

const LineChartInfo = ({
  title,
  value,
  changePercent,
  data,
  xAxisDataKey,
  dataKeys,
  colors,
}: LineChartInfoProps) => {
  const _renderAreaChart = (item: string, index: number) => {
    return (
      <Area
        key={index}
        type="monotone"
        dataKey={item}
        stroke={colors[index]}
        fillOpacity={1}
        fill={`url(#${colors[index]})`}
        strokeWidth={2}
      />
    );
  };

  const _renderLinearGradient = (item: string, index: number) => {
    return (
      <linearGradient id={item} x1="0" y1="0" x2="0" y2="1" key={item}>
        <stop offset="5%" stopColor={item} stopOpacity={0.8} />
        <stop offset="95%" stopColor={item} stopOpacity={0} />
      </linearGradient>
    );
  };

  return (
    <div className="chartContainer">
      <div className="chartTitle">{title}</div>
      <div className="rowStart mb16">
        <div className="rowCenter largeChartInfo2 mr12">{value}</div>
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
      <ResponsiveContainer width={"100%"} height={250}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>{colors.map(_renderLinearGradient)}</defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisDataKey} stroke={COLORS.ON_SURFACE} />
          <YAxis stroke={COLORS.ON_SURFACE} />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          {dataKeys.map(_renderAreaChart)}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartInfo;

import {
  ComposedChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Area,
  Tooltip,
} from "recharts";
import { COLORS } from "src/Constants";
import ChangeBadge from "../ChangeBadge";
import Utils from "src/utils/Utils";
import Table from "src/components/Table";
import { TableInfoItem } from "../TableInfo";

interface ComposedChartInfoProps {
  data: any[];
  title: string;
  value?: any;
  changePercent?: number;
  xAxisDataKey: string;
  lineType?: any;
  areaDataKeys?: string[];
  lineDataKeys?: string[];
  areaColors?: string[];
  lineColors?: string[];
  showLegend?: boolean;
  tableData?: TableInfoItem[];
  tableTitle?: string;
}

const ComposedChartInfo = ({
  data,
  title,
  value,
  changePercent,
  xAxisDataKey,
  lineType = "linear",
  areaDataKeys,
  lineDataKeys,
  areaColors,
  lineColors,
  showLegend = true,
  tableData,
  tableTitle = "Metric",
}: ComposedChartInfoProps) => {
  const chartHeight = showLegend ? 300 : 270;

  const _renderArea = (item: string, index: number) => {
    console.log("_renderArea", item);
    return (
      <Area
        key={"area" + index}
        type="monotone"
        dataKey={item}
        stroke={!!areaColors ? areaColors[index] : ""}
        fillOpacity={1}
        fill={`url(#${!!areaColors && areaColors[index]})`}
        strokeWidth={2}
      />
    );
  };

  const _renderLinearGradient = (item: string, index: number) => {
    return (
      <linearGradient
        id={item}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
        key={"areaGradient" + item}
      >
        <stop offset="5%" stopColor={item} stopOpacity={0.8} />
        <stop offset="95%" stopColor={item} stopOpacity={0} />
      </linearGradient>
    );
  };

  const _renderLine = (item: string, index: number) => {
    console.log("_renderLine", item);
    if (!!lineColors) console.log(lineColors[index]);
    return (
      <Line
        key={"line" + index}
        type={!!lineType && lineType}
        dataKey={item}
        stroke={!!lineColors ? lineColors[index] : ""}
      />
    );
  };

  const _renderComposedChart = () => {
    return (
      <ComposedChart
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
        {!!lineDataKeys && !!lineColors && lineDataKeys.map(_renderLine)}
        {!!areaColors && <defs>{areaColors.map(_renderLinearGradient)}</defs>}
        {!!areaDataKeys && !!areaColors && areaDataKeys.map(_renderArea)}
      </ComposedChart>
    );
  };

  return (
    <div className="chartContainer">
      <div className="chartTitle">{title}</div>
      <div className="rowStart mb16">
        {!!value && (
          <div className="rowCenter largeChartInfo2 mr12">
            {/* {Utils.formatMoney(value)} */}
            {value}
          </div>
        )}
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
        {_renderComposedChart()}
      </ResponsiveContainer>
      {!!tableData && <Table tableTitle={tableTitle} data={tableData} />}
    </div>
  );
};

export default ComposedChartInfo;

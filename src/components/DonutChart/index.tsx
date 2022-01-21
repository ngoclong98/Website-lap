import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import Utils from "src/utils/Utils";
import ChangeBadge from "../ChangeBadge";
import { TableInfoItem } from "../TableInfo";
import Table from "src/components/Table";
import { DONUT_DATA } from "src/pages/Dashboard/data";

const totalAmount = DONUT_DATA.reduce((add, item) => {
  return add + item.value;
}, 0);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#feffff"];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 25) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 15;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={4} textAnchor="middle" fill={fill}>
        {/* {payload.value} */}
        {totalAmount}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 7}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 10}
        y={ey}
        textAnchor={textAnchor}
        fill="#ccC"
      >{`${payload.name}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 10}
        y={ey}
        dy={15}
        textAnchor={textAnchor}
        fill="#999"
      >
        {` ${value} (${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
interface DonutChartProps {
  data: any[];
  title: string;
  tableData?: TableInfoItem[];
  tableTitle?: string;
}
const DonutChart = ({
  data,
  title,
  tableData,
  tableTitle = "Metric",
}: DonutChartProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div className="chartContainer">
      <div className="chartTitle">{title}</div>

      <ResponsiveContainer width={"100%"} height={400}>
        <PieChart margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {!!tableData && <Table tableTitle={tableTitle} data={tableData} />}
    </div>
  );
};
export default DonutChart;

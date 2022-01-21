import React, { useState } from "react";
import ReactDOM from "react-dom";
import { TableInfoItem } from "../TableInfo";
import Table from "src/components/Table";
import { Funnel } from "funnel-react";
import { useMediaQuery } from "react-responsive";
import style from "./FunnelChart.module.scss";
import { ResponsiveContainer } from "recharts";

interface FunnelChartProps {
  data: any[];
  title: string;
  tableData?: TableInfoItem[];
  tableTitle?: string;
}
const FunnelChart = ({
  data,
  title,
  tableData,
  tableTitle = "Metric",
}: FunnelChartProps) => {
  // const svgWidth = useMediaQuery({ width: 224 });
  // const styles = { targetDiv: { width: "300" } };
  // const isBigScreen = useMediaQuery({ minWidth: 1824 })
  return (
    <div className="chartContainer">
      <div className="chartTitle">{title}</div>

      <Funnel
        height={300}
        width={700}
        labelKey="label"
        colors={{
          graph: ["#1890FF", "#BAE7FF"],
          percent: "#fff",
          label: "white",
          value: "white",
        }}
        colorPercent="#fff"
        colorLabel="#fff"
        valueKey="quantity"
        displayPercent={true}
        data={data}
      />

      <div className="textOnSurfaceLight body14 text-center">
        Comparision period: 60
      </div>
      {!!tableData && <Table tableTitle={tableTitle} data={tableData} />}
    </div>
  );
};
export default FunnelChart;

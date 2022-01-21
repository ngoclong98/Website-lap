import { useState } from "react";
import Toolbar from "src/components/Toolbar";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import Loading from "src/components/Loading";
import PullToRefresh from "react-simple-pull-to-refresh";
import { ListNested, Calendar3 } from "react-bootstrap-icons";
import MerchantSidebar from "src/components/MerchantSidebar";
import DateRangeSidebar from "src/components/DateRangeSidebar";
import SingleNumberInfo from "src/components/SingleNumberInfo";
import LineChartInfo from "src/components/LineChartInfo";
import ComposedChartInfo from "src/components/ComposedChartInfo";
import TableInfo from "src/components/TableInfo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  REVENUE_DATA,
  SUBCRIPTION_DATA,
  TOP_MERCHANT_BY_SESSION_DATA,
} from "./data";
import { COLORS } from "src/Constants";
import DateRange from "src/models/DateRange";

const Dashboard = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const [showMerchantSidebar, setShowMerchantSidebar] =
    useState<boolean>(false);
  const [showDateRangeSidebar, setShowDateRangeSidebar] =
    useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | null>();
  const _handleRefresh = async () => {
    console.log("Refreshing");
  };

  const _handleShowChooseMerchant = () => {
    console.log("_handleShowChooseMerchant");
    _toggleMerchantSidebar();
  };

  const _handleScroll = (e) => {};

  const _toggleMerchantSidebar = () => {
    setShowMerchantSidebar(!showMerchantSidebar);
  };

  const _toggleDateRangeSideBar = () => {
    setShowDateRangeSidebar(!showDateRangeSidebar);
  };

  const _handleShowChooseDateRange = () => {
    _toggleDateRangeSideBar();
  };

  const _handleSelectDateRange = (value: DateRange | null) => {
    setDateRange(value);
    setTimeout(() => {
      alert(JSON.stringify(value));
    }, 350);
  };

  return (
    <div className="screenContainer">
      <MerchantSidebar
        show={showMerchantSidebar}
        onHide={_toggleMerchantSidebar}
      />

      <DateRangeSidebar
        show={showDateRangeSidebar}
        onHide={_toggleDateRangeSideBar}
        onSelectDateRange={_handleSelectDateRange}
        value={dateRange}
      />

      <Toolbar
        title={"Mb Payment Hub"}
        onClickPrefixIcon={_handleShowChooseMerchant}
        onClickSuffixIcon={_handleShowChooseDateRange}
        prefixIcon={<ListNested className="toolbarIcon" />}
        suffixIcon={<Calendar3 className="toolbarIcon" />}
      />

      <PullToRefresh
        onRefresh={_handleRefresh}
        refreshingContent={<Loading containerClassName="columnCenter" />}
      >
        <div
          className="screenScrollContainer refreshContent"
          onScroll={_handleScroll}
        >
          <div className={"dashboardContent"}>
            {/* <Container> */}
            <Row className="g-md-2">
              <Col md={6}>
                <SingleNumberInfo
                  title="Active Merchants"
                  value={96}
                  changePercent={39.4}
                />
              </Col>
              <Col md={6}>
                <SingleNumberInfo
                  title="Active Subcriptions"
                  value={1456}
                  changePercent={-12.1}
                />
              </Col>
              <Col md={6}>
                <ComposedChartInfo
                  data={REVENUE_DATA}
                  title="Revenue"
                  value={"84,826M"}
                  changePercent={-7.5}
                  xAxisDataKey="date"
                  lineType="monotone"
                  lineDataKeys={["currentPeriod"]}
                  areaDataKeys={["previousPeriod"]}
                  lineColors={[COLORS.PRIMARY]}
                  areaColors={[COLORS.SUCCESS]}
                />
              </Col>
              <Col md={6}>
                <ComposedChartInfo
                  data={REVENUE_DATA}
                  title="Sessions"
                  value={"311,123"}
                  changePercent={9.99}
                  xAxisDataKey="date"
                  lineType="monotone"
                  lineDataKeys={["currentPeriod"]}
                  areaDataKeys={["previousPeriod"]}
                  lineColors={[COLORS.PRIMARY]}
                  areaColors={[COLORS.SUCCESS]}
                />
              </Col>
              <Col md={6}>
                <TableInfo
                  title={"Subscription Overview"}
                  tableTitle={"Metric"}
                  data={SUBCRIPTION_DATA}
                />
              </Col>
              <Col md={6}>
                <TableInfo
                  title={"TOP merchants by Sessions"}
                  tableTitle={"Merchants"}
                  data={TOP_MERCHANT_BY_SESSION_DATA}
                />
              </Col>
            </Row>

            {/* </Container> */}
          </div>
        </div>
      </PullToRefresh>
    </div>
  );
};

export default Dashboard;

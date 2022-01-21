import { useState } from "react";
import Toolbar from "src/components/Toolbar";
import { ListNested, Calendar3 } from "react-bootstrap-icons";
import MerchantSidebar from "src/components/MerchantSidebar";
import DateRangeSidebar from "src/components/DateRangeSidebar";
import DateRange from "src/models/DateRange";

interface DashboardToolbarProps {
  title: string;
}

const DashboardToolbar = ({ title }: DashboardToolbarProps) => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [showDateRangeSidebar, setShowDateRangeSidebar] =
    useState<boolean>(false);

  const _handleShowChooseMerchant = () => {
    console.log("_handleShowChooseMerchant");
    _toggleSideBar();
  };

  const _toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const _toggleDateRangeSideBar = () => {
    setShowDateRangeSidebar(!showDateRangeSidebar);
  };

  const _handleShowChooseDateRange = () => {
    _toggleDateRangeSideBar();
  };

  const _handleSelectDateRange = (value: DateRange | null) => {
    alert(JSON.stringify(value));
  };

  return (
    <div>
      <MerchantSidebar show={showSideBar} onHide={_toggleSideBar} />
      <DateRangeSidebar
        show={showDateRangeSidebar}
        onHide={_toggleDateRangeSideBar}
        onSelectDateRange={_handleSelectDateRange}
      />
      <Toolbar
        title={title}
        onClickPrefixIcon={_handleShowChooseMerchant}
        onClickSuffixIcon={_handleShowChooseDateRange}
        prefixIcon={<ListNested className="toolbarIcon" />}
        suffixIcon={<Calendar3 className="toolbarIcon" />}
      />
    </div>
  );
};

export default DashboardToolbar;

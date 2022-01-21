import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useHistory } from "react-router-dom";
import { RouteKey, Routes } from "src/Routes";
import Toolbar from "../Toolbar";

interface MerchantSidebarItem {
  path: string;
  name: string;
  isHeader?: boolean;
}
interface MerchantSidebarProps {
  show: boolean;
  onHide: () => void;
}
const MerchantSidebar = ({ show, onHide }: MerchantSidebarProps) => {
  const history = useHistory();
  const MERCHANT_DASHBOARD_LINK_DATA: MerchantSidebarItem[] = [
    {
      name: "Mb PaymentHub",
      isHeader: true,
      path: Routes[RouteKey.dashboard].path,
    },
    { name: "All", path: Routes[RouteKey.dashboard].path },
    { name: "Horoscope", path: Routes[RouteKey.dashboard].path },
    { name: "Mobilott", path: Routes[RouteKey.dashboard].path },
    { name: "MB Ageas", path: Routes[RouteKey.dashboard].path },
    {
      name: "Mb Ekyc Partner",
      isHeader: true,
      path: Routes[RouteKey.dashboard].path,
    },
    { name: "All", path: Routes[RouteKey.dashboard].path },
    { name: "DrOH", path: Routes[RouteKey.dashboard].path },
    { name: "Paytech", path: Routes[RouteKey.dashboard].path },
    { name: "Cashin Ecom", path: Routes[RouteKey.dashboard].path },
    { name: "Thiennguyen", path: Routes[RouteKey.thiennguyen].path },
  ];

  return (
    <Offcanvas show={show} onHide={onHide}>
      <Toolbar onClickPrefixIcon={onHide} title="" fixed={false} />
      <Offcanvas.Body className={"sidebarBody"}>
        {MERCHANT_DASHBOARD_LINK_DATA.map((item, index) => (
          <Link
            to={item.path}
            key={item.path + "_" + index}
            className="linkNoHighlight"
          >
            <div className={item.isHeader ? "sidebarHeader" : "sidebarItem"}>
              {item.name}
            </div>
          </Link>
        ))}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MerchantSidebar;

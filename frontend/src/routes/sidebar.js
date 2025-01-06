/** Icons are imported separatly to reduce build time */
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";
import CodeBracketSquareIcon from "@heroicons/react/24/outline/CodeBracketSquareIcon";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import {
  ChevronDownIcon,
  FolderIcon,
  ClipboardDocumentListIcon,
  HomeModernIcon,
  IdentificationIcon,
  InboxStackIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },

  {
    path: "", //no url needed as this has submenu
    icon: <FolderIcon className={`${iconClasses} inline`} />, // icon component
    name: "Product", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/product-createProduct",
        name: "Create Product",
      },
      {
        path: "/app/product-allProduct", //url
        name: "All Products", // name that appear in Sidebar
      },
      {
        path: "/app/product-countStock",
        name: "Count Stock",
      },
      {
        path: "/app/product-category",
        name: "Category",
      },
      {
        path: "/app/product-printLabels",
        name: "Print Labels",
      },
      {
        path: "/app/product-unit",
        name: "Unit",
      },
      {
        path: "/app/product-brand",
        name: "Brand",
      },
    ],
  },
  {
    path: "", //no url needed as this has submenu
    icon: <InboxStackIcon className={`${iconClasses} inline`} />, // icon component
    name: "Inventory", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/CreatePurchase",
        name: "Create Purchase",
      },
      {
        path: "/app/AllPurchases",
        name: "All Purchases",
      },
      {
        path: "/app/ReturnPurchases",
        name: "Return Purchases",
      },
    ],
  },

  {
    path: "", //no url needed as this has submenu
    icon: <IdentificationIcon className={`${iconClasses} inline`} />, // icon component
    name: "People", // name that appear in Sidebar
    submenu: [
      {
        path: '/app/customer',
        name: "Customers",
      },
      {
        path: "/app/supplier",
        name: "Suppliers",
      },
      {
        path: "/app/user",
        name: "User",
      },
    ],
  },

  {
    path: "", 
    icon: <SwatchIcon className={`${iconClasses} inline`} />, 
    name: "Sales",
    submenu: [
      {
        path: '/app/createsales',
        name: 'Create Sales',
      },
      {
        path: '/app/allsales',
        name: 'All Sales', 
      },
      {
        path: '/app/returnsales', 
        name: 'Return Sales',
      },
    ],
  },

  {
    path: "", //no url needed as this has submenu
    icon: <HomeModernIcon className={`${iconClasses} inline`} />, // icon component
    name: "Warehouse", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/warehouse-warehouse",
        name: "Warehouses",
      },
      {
        path: "/app/warehouse-createTransfer",
        name: "Create Transfer",
      },
      {
        path: "/app/warehouse-allTransfer",
        name: "All Transfer",
      },
    ],
  },

  {
    path: "", //no url needed as this has submenu
    icon: <ChartBarIcon className={`${iconClasses} inline`} />, // icon component
    name: "Report", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/SalesReport",
        name: "Sales Report",
      },
      {
        path: "/app/ProductReport",
        name: "Product Report",
      },
      {
        path: "/app/PSalesReport",
        name: "Product Sales Report",
      },
      {
        path: "/app/PurchaseReport",
        name: "Purchase Report",
      },
      {
        path: "/app/StockReport",
        name: "Stock Report",
      },
      {
        path: "/app/SupplierReport",
        name: "Supplier Report",
      },
      {
        path: "/app/QtyAlert",
        name: "Product Quantity Alert",
      },
      {
        path: "/app/CustomerReport",
        name: "Customer Report",
      },
      {
        path: "/app/BestCustomer",
        name: "Best Customer",
      },
      {
        path: "/app/TopSell",
        name: "Top-Selling Product",
      },
    ],
  },
];

export default routes;

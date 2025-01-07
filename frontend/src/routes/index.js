// All components mapping with path for internal routes

import { lazy } from "react";
import CreateProduct from "../pages/protected/CreateProduct";
import AllProducts from "../pages/protected/AllProduct";
import CountStock from "../pages/protected/CountStock";
import CategoryPage from "../pages/protected/Category";
import PrintLabels from "../pages/protected/PrintLabel";
import UnitPage from "../pages/protected/Unit";
import BrandPage from "../pages/protected/Brand";
import DetailProduct from "../features/product/allProduct/detailProduct";
import EditProduct from "../features/product/allProduct/editProduct";

import Warehouse from "../pages/protected/Warehouse";
import CreateTransfer from "../pages/protected/CreateTransfer";
import AllTransfer from "../pages/protected/AllTransfer";
import DetailTransfer from "../features/warehouse/detailTransfer";
import EditTransfer from "../features/warehouse/editTransfer";

const SalesReport = lazy(() => import('../pages/protected/SalesReport'))
const ProductReport = lazy(() => import('../pages/protected/ProductReport'))
const PSalesReport = lazy(() => import('../pages/protected/PSalesReport'))
const PurchaseReport = lazy(() => import('../pages/protected/PurchaseReport'))
const StockReport = lazy(() => import('../pages/protected/StockReport'))
const SupplierReport = lazy(() => import('../pages/protected/SupplierReport'))
const QtyAlert = lazy(() => import('../pages/protected/QtyAlert'))
const CustomerReport = lazy(() => import('../pages/protected/CustomerReport'))
const BestCustomer = lazy(() => import('../pages/protected/BestCustomer'))
const TopSell = lazy(() => import('../pages/protected/TopSell'))

const CreatePurchase = lazy(() => import('../pages/protected/CreatePurchase'))
const ReturnPurchase = lazy(() => import('../pages/protected/ReturnPurchase'))
const AllPurchase = lazy(() => import('../pages/protected/AllPurchase'))

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const Charts = lazy(() => import("../pages/protected/Charts"));
const Leads = lazy(() => import("../pages/protected/Leads"));
const Integration = lazy(() => import("../pages/protected/Integration"));
const Calendar = lazy(() => import("../pages/protected/Calendar"));
const Team = lazy(() => import("../pages/protected/Team"));
const Transactions = lazy(() => import("../pages/protected/Transactions"));
const Bills = lazy(() => import("../pages/protected/Bills"));
const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings")
);
const GettingStarted = lazy(() => import("../pages/GettingStarted"));
const DocFeatures = lazy(() => import("../pages/DocFeatures"));
const DocComponents = lazy(() => import("../pages/DocComponents"));

const Customer = lazy(() => import('../pages/protected/Customer'));
const Supplier = lazy(() => import('../pages/protected/Supplier'));
const User = lazy(() => import('../pages/protected/User'));
const AllSales = lazy(() => import('../pages/protected/AllSales'))
const CreateSales = lazy(() => import('../pages/protected/CreateSales'))
const POS = lazy(() => import('../pages/protected/POS'))
const ReturnSales = lazy(() => import('../pages/protected/ReturnSales'))
const SalesDetail = lazy(() => import('../features/sales/allsales/SalesDetail'))
const ReturnDetail = lazy(() => import('../features/sales/returnsales/ReturnDetail'))


const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/customer',
    component: Customer,
  },
  {
    path: '/supplier',
    component: Supplier,
  },
  {
    path: '/user',
    component: User,
  },
  {
    path: '/allsales',
    component: AllSales,
  },
  {
    path: '/salesdetail',
    component: SalesDetail,
  },
  {
    path: '/createsales',
    component: CreateSales,
  },
  {
    path: '/returnsales',
    component: ReturnSales,
  },{
    path: '/returndetail',
    component: ReturnDetail,
  },
  {
    path: '/pos',
    component: POS,
  },
  {
    path: "/product-createProduct",
    component: CreateProduct,
  },
  {
    path: "/product-allProduct",
    component: AllProducts,
  },
  {
    path: "/product-allProduct/detailProduct",
    component: DetailProduct,
  },
  {
    path: "/product-allProduct/editProduct",
    component: EditProduct,
  },
  {
    path: "/product-countStock",
    component: CountStock,
  },
  {
    path: "/product-category",
    component: CategoryPage,
  },
  {
    path: "/product-printLabels",
    component: PrintLabels,
  },
  {
    path: "/product-unit",
    component: UnitPage,
  },
  {
    path: "/product-brand",
    component: BrandPage,
  },
  {
    path: "/warehouse-warehouse",
    component: Warehouse,
  },
  {
    path: "/warehouse-createTransfer",
    component: CreateTransfer,
  },
  {
    path: "/warehouse-allTransfer",
    component: AllTransfer,
  },
  {
    path: "/warehouse-detailTransfer",
    component: DetailTransfer,
  },
  {
    path: "/warehouse-editTransfer",
    component: EditTransfer,
  },
  {
    path: '/CreatePurchase',
    component: CreatePurchase,
  },
  {
    path: '/AllPurchases',
    component: AllPurchase,
  },
  {
    path: '/ReturnPurchases',
    component: ReturnPurchase,
  },
  {
    path: '/SalesReport',
    component: SalesReport,
  },
  {
    path: '/ProductReport',
    component: ProductReport,
  },
  {
    path: '/PSalesReport',
    component: PSalesReport,
  },
  {
    path: '/PurchaseReport',
    component: PurchaseReport,
  },
  {
    path: '/StockReport',
    component: StockReport,
  },
  {
    path: '/SupplierReport',
    component: SupplierReport,
  },
  {
    path: '/QtyAlert',
    component: QtyAlert,
  },
  {
    path: '/CustomerReport',
    component: CustomerReport,
  },
  {
    path: '/BestCustomer',
    component: BestCustomer,
  },
  {
    path: '/TopSell',
    component: TopSell,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;

import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  // Configurator,
} from "./widgets/layout";
import routes from "./routes";
import { useMaterialTailwindController, setOpenConfigurator } from "./context";
import EditCategory from "./pages/dashboard/EDIT/EditCategory";
import EditProduct from "./pages/dashboard/EDIT/EditProduct";
import EditSubCategory from "./pages/dashboard/EDIT/EditSubCategory";
import AddCategory from "./pages/dashboard/ADD/AddCategory";
import AddSubCategory from "./pages/dashboard/ADD/AddSubCategory";
import AddProduct from "./pages/dashboard/ADD/AddProduct";




export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        {/* <Configurator /> */}
        {/* <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element, i }) => (
                <Route exact key={i} path={path} element={element} />
              ))
          )}
          <Route path="/tables/edit-category/:id" element={<EditCategory />}></Route>
          <Route path="/tables/edit-subcategory/:id" element={<EditSubCategory />}></Route>
          <Route path="/tables/edit-product/:id" element={<EditProduct />}></Route>
          <Route path="/tables/add-category" element={<AddCategory />}></Route>
          <Route path="/tables/add-subcategory" element={<AddSubCategory />}></Route>
          <Route path="/tables/add-product" element={<AddProduct />}></Route>
        </Routes>

        <div className="text-blue-gray-600">{/* <Footer /> */}</div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;

import { Navigate, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "@material-tailwind/react";
import Dashboard from "./admin/Dashboard";
import "./index.css";
import { MaterialTailwindControllerProvider } from "./admin/context";
export default function LayoutAdmin() {
  return (
   
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
        <Routes>

        <Route path={'/dashboard/*'} element={<Dashboard/>}></Route>
        <Route path={'/dashboard'} element={<Navigate to={'/admin/dashboard/home'}/>}></Route>
        </Routes>
      
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
  );
}

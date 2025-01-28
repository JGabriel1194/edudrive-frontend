import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import DashboardContent from "../components/DashboardContent";
import Licences from "../pages/Licences";

const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/perfil-institucion" element={"hole"} />
      <Route path="/licencias" element={<Licences/>} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<DashboardContent />} />
    </Routes>
  );
};

export default DashboardRouter;

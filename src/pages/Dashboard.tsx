import { useState } from "react";
import Navbar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1">
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="p-4 sm:ml-64">
            <div className="mt-14 rounded-lg  border-dashed border-gray-200  dark:border-gray-700">
              <Outlet/>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Dashboard;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import { useAuth } from "../contexts/AuthConext";
import AuthRoute from "../components/AuthRoute";
import Loading from "../components/Loading/Loading";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import DashboardRouter from "./DashboardRouter";

function GlobalRouter(){
    const {user, loading} = useAuth();

    if(loading){
        return <Loading/>
    }

    return(
        <BrowserRouter>
            <Routes>
                <Route element= {<AuthRoute/>}>
                    <Route path="/" element={<Login/>}/>
                </Route>
                <Route element={<PrivateRoute isAuth={!!user}/>}>
                    <Route path="/dashboard/*" element={<Dashboard/>}>
                        <Route path="*" element={<DashboardRouter/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default GlobalRouter;
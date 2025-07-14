import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ onCategorySelect,isLoggedIn }) => {
    return (
        <div className="main-wrap">
            <Header onCategorySelect={onCategorySelect} isLoggedIn={isLoggedIn}/>
            <Outlet />
            <Footer/>
        </div>
    );
};

export default MainLayout;
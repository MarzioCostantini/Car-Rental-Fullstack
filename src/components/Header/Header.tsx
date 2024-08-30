import "./Header.css"
import Herz from "../../assets/svg/Herz";
import Notification from "../../assets/svg/Notification";
import Settings from "../../assets/svg/Settings";
import Searchbar from "../Searchbar/Searchbar";
import { useUserContext } from "../../Context/UserContext";
import Logout from "../Logout/Logout";
import { Link } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

const Header = () => {
    const userContext = useUserContext();
    const user = userContext?.user;



    return (
        <header>
            <div className="left">
                <h2 className="logo">MORENT</h2>
                <Searchbar />
            </div>
            <div className="right">
                <Herz />
                <Notification />
                <Settings />
                <UserMenu />



            </div>

        </header>
    );
}

export default Header;
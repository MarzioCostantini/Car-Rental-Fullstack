import "./Header.css"
import Herz from "../../assets/svg/Herz";
import Notification from "../../assets/svg/Notification";
import Settings from "../../assets/svg/Settings";
import Searchbar from "../Searchbar/Searchbar";
import UserMenu from "../UserMenu/UserMenu";
import { Link } from "react-router-dom";

const Header = () => {

    return (
        <header>
            <div className="left">
                <Link to="/">
                    <h2 className="logo">MORENT</h2>
                </Link>
                <Searchbar />
            </div>
            <div className="right">
                <div className="round-icon">
                    <Herz />
                    <Notification />
                    <Settings />
                </div>
                <UserMenu />



            </div>

        </header>
    );
}

export default Header;
import { NavLink, Link, useLocation } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import Logout from "../Logout/Logout";
import "./UserMenu.css"
import { useEffect, useState } from "react";
import { MdFavorite, MdPerson, MdPayments } from "react-icons/md";



const UserMenu = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const userContext = useUserContext();
    const user = userContext?.user;
    const location = useLocation();


    useEffect(() => {
        setShowMenu(false);
    }, [user, location]);


    return (
        <section>
            {user ? (<div className="user-menu">

                <img onClick={() => setShowMenu(prev => !prev)} className="avatar" src={user?.user_metadata.photo} alt="user photo" />

                {showMenu && <div className="menu-items">
                    <h4> Hi, {user?.user_metadata.first_name}</h4>
                    <NavLink to="/user-profile"><MdPerson /> Profile</NavLink>
                    <NavLink to="/my-bookings"><MdPayments /> My Bookings</NavLink>
                    <NavLink to="/favorites"><MdFavorite /> Favorietes</NavLink>
                    <hr />
                    <Logout />
                </div>}


            </div>) :
                (
                    <Link to="/login">
                        <img className="avatar" src="https://fylztorujxwdqtsjnyme.supabase.co/storage/v1/object/public/profile-photos/wf34gsqw3image.png" alt="user photo" />
                    </Link>
                )}
        </section>
    );
}

export default UserMenu;
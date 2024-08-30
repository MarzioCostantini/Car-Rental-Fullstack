import { Link } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import Logout from "../Logout/Logout";



const UserMenu = () => {
    const userContext = useUserContext();
    const user = userContext?.user;

    console.log(user);



    return (

        <section>
            {user ? (<div>

                <img className="avatar" src={user?.user_metadata.photo} alt="user photo" />

                <p> Hi, {user?.user_metadata.first_name}</p>
                <Link to="/profile">Profile</Link>
                <Link to="/car-rental-history">Rental History</Link>
                <Logout />
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
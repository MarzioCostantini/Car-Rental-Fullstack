import { Link } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import "./UserProfil.css"

const UserProfile = () => {
    const userContext = useUserContext();
    const user = userContext?.user;


    console.log(user);

    if (!user) return

    return (
        <main className="pro">
            <img src={user?.user_metadata.photo} alt="user img" />
            <h1>{user?.user_metadata.first_name} {user?.user_metadata.last_name}</h1>
            <h4>{user.email}</h4>
            <Link className="btn-main" to="/my-bookings">My Booking</Link>
        </main>
    );
}

export default UserProfile;
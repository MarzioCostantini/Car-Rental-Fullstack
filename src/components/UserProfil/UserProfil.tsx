import { useUserContext } from "../../Context/UserContext";

const UserProfile = () => {
    const userContext = useUserContext();
    const user = userContext?.user;


    console.log(user);

    if (!user) return

    return (
        <main>
            <img src={user?.user_metadata.photo} alt="user img" />
            <h1>{user?.user_metadata.first_name} {user?.user_metadata.last_name}</h1>
        </main>
    );
}

export default UserProfile;
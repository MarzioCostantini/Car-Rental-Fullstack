import { useUserContext } from "../../Context/UserContext";
import supabaseClient from "../../lib/supaBaseClient";

const Logout = () => {
    const userContext = useUserContext();


    const logout = async (e: React.MouseEvent) => {
        e.preventDefault()

        const signoutRespons = await supabaseClient.auth.signOut()

        if (signoutRespons.error) {
            console.error("Fehler beim abmelden", signoutRespons.error)
        }
        else {
            userContext?.setUser(null)
        }
    }

    return (
        <div>
            <button className="btn-main" onClick={logout}>Logout</button>
        </div>
    );
}

export default Logout;
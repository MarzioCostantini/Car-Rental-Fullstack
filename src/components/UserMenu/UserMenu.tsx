import { NavLink, Link, useLocation } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import Logout from "../Logout/Logout";
import "./UserMenu.css";
import { useEffect, useState } from "react";
import { MdFavorite, MdPerson, MdPayments } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion"; // Importiere AnimatePresence

const UserMenu = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const userContext = useUserContext();
    const user = userContext?.user;
    const location = useLocation();

    useEffect(() => {
        setShowMenu(false); // Menü schließen, wenn der Benutzer oder die Route geändert wird
    }, [user, location]);

    // Variablen für Animationseigenschaften
    const menuVariants = {
        hidden: { opacity: 0, y: -20 }, // Startet unsichtbar und leicht nach oben versetzt
        visible: { opacity: 1, y: 40 },  // Wird sichtbar und gleitet nach unten
        exit: { opacity: 0, y: -20 },   // Gleitet nach oben und wird unsichtbar
    };

    return (
        <section>
            {user ? (
                <div className="user-menu">
                    {/* Avatar-Bild zum Öffnen/Schließen des Menüs */}
                    <img
                        onClick={() => setShowMenu(prev => !prev)}
                        className="avatar"
                        src={user?.user_metadata.photo}
                        alt="user photo"
                    />

                    {/* AnimatePresence für das Verwalten von Ein- und Austrittsanimationen */}
                    <AnimatePresence>
                        {showMenu && (
                            <motion.div
                                className="menu-items"
                                initial="hidden"   // Startzustand der Animation
                                animate="visible"  // Zielzustand der Animation
                                exit="exit"        // Zustand bei Verlassen
                                variants={menuVariants}  // Definiert, wie das Menü animiert wird
                                transition={{ duration: 0.3 }} // Dauer der Transition
                            >
                                <h4>Hi, {user?.user_metadata.first_name}</h4>
                                <NavLink to="/user-profile">
                                    <MdPerson /> Profile
                                </NavLink>
                                <NavLink to="/my-bookings">
                                    <MdPayments /> My Bookings
                                </NavLink>
                                <NavLink to="/favorites">
                                    <MdFavorite /> Favorites
                                </NavLink>
                                <hr />
                                <Logout />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <Link to="/login">
                    <img
                        className="avatar"
                        src="https://fylztorujxwdqtsjnyme.supabase.co/storage/v1/object/public/profile-photos/wf34gsqw3image.png"
                        alt="user photo"
                    />
                </Link>
            )}
        </section>
    );
};

export default UserMenu;

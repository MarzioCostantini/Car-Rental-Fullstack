import { useEffect, useState } from "react";
import Full from "../../assets/svg/Full";
import Gear from "../../assets/svg/Gear";
import Herz from "../../assets/svg/Herz";
import Persons from "../../assets/svg/Persons";
import { Car } from "../../Car";
import { useUserContext } from "../../Context/UserContext";
import "./CarItem.css"
import supabaseClient from "../../lib/supaBaseClient";
import Herzfull from "../../assets/svg/HerzFull";

interface CarItemProps {
    item: Car
}

const CarItem: React.FC<CarItemProps> = ({ item }) => {

    const [favorites, setFavorites] = useState<string[]>([]);
    const userContext = useUserContext();
    const user = userContext?.user;

    // ! useEffect-Hook, der beim ersten Rendern und bei Änderungen des Benutzers ausgeführt wird
    // Holt alle Rezept id dich ich favoritisiert habe und speicher sie in state aus string array
    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) return;

            // Abfrage der Favoriten des aktuellen Benutzers aus der Datenbank
            const { data, error } = await supabaseClient
                .from('favorites')
                .select('car_id')
                .eq('user_id', user.id); // Filtert die Favoriten nach der Benutzer-ID

            if (error) {
                console.error("Fehler beim Laden der Favoriten:", error.message);
            } else if (data) {
                // * Wandelt das Array aus Objekten zb 
                const carIds = data.map((favorite) => favorite.car_id);
                setFavorites(carIds);
            }
        };

        fetchFavorites();
    }, [user]);


    //! Funktion zum Hinzufügen eines Rezepts zu den Favoriten
    const addFavorite = async (carId: string) => {
        if (!user) {
            alert("You must be logged in to favorite an item.")
            return
        };

        // * Hinzufügen in der UI
        // Es wird der aktuelle Array geholt und dann wird das mit der ", recipId" mit hinzugefügt
        setFavorites([...favorites, carId]);

        // * Hinzufügen in der DB
        // user.id => kommt von Context
        // carId => kommt von mein onklick was via Props gegeben wird
        const { error } = await supabaseClient
            .from("favorites")
            .insert([{ user_id: user.id, car_id: carId }]);

        if (error) {
            console.error("Fehler beim Hinzufügen des Favoriten:", error.message);
        }
    };

    // ! Funktion zum Entfernen eines Rezepts aus den Favoriten
    const removeFavorite = async (carId: string) => {
        if (!user) {
            alert("You must be logged in to favorite an item.")
            return
        };


        // * Löschen aus der UI
        //kickt die recipte raus die gerade angeklickt worden ist und erstellt ein neuens array ohne (via Props)
        let fav = favorites.filter(fav => fav !== carId)
        console.log({ fav });
        setFavorites(fav);

        // * Löschen aus der DB
        const { error } = await supabaseClient
            .from("favorites")
            .delete()
            // Ich möchte sicher stellen das es nur aus den gelöscht wird wo ubereinstimmt mit den eingeloogten user Id und natülich das rezept übereinstimmt. So bin ich sicher das es bei den richtgen User rausgelöscht wird
            .eq("user_id", user.id)
            .eq("car_id", carId);

        if (error) {
            console.error("Fehler beim Entfernen des Favoriten:", error.message);
        }
    };


    return (
        <article className="car-item">
            <div className="hero">
                <h4>{item.brand} {item.model}</h4>
                {favorites.includes(item.id) ?
                    <div onClick={() => removeFavorite(item.id)}>
                        <Herzfull />
                    </div>
                    :
                    <div onClick={() => addFavorite(item.id)}>
                        <Herz />
                    </div>

                }
            </div>
            <h6>{item.vehicleType}</h6>
            <div className="photo">
                <img src={item.carImg} alt={item.model} />
                <div className="white"></div>
            </div>
            <div className="icons">
                <div>
                    <Full />
                    <p>{item.consumption}</p>
                </div>
                <div>
                    <Gear />
                    <p>{item.gearType}</p></div>
                <div>
                    <Persons />
                    <p>{item.seats}</p>
                </div>
            </div>
            <div className="footer">
                <h4>${item.pricePerDay} / <span>day</span></h4>
                <a className="btn-main" href="#">Rent Now</a>
            </div>
        </article>
    );
}

export default CarItem;
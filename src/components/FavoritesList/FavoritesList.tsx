import { useEffect, useState } from "react";
import { Car } from "../../Car";
import { useUserContext } from "../../Context/UserContext";
import "./FavoritesList.css"
import supabaseClient from '../../lib/supaBaseClient';
import CarItem from "../CarItem/CarItem";

const FavoritesList = () => {
    const [favCars, setFavCars] = useState<Car[]>([]);

    const userContext = useUserContext();
    const user = userContext?.user;

    if (!user) {
        return null;
    }

    useEffect(() => {
        const getCarDataID = async () => {

            // Auto IDs die mit Herz markiert sind
            let favCarsRespons = await supabaseClient
                .from("favorites")
                .select("car_id")
                .eq("user_id", user.id)

            if (favCarsRespons.error) {
                console.error("Fehler bei den Favoriten Daten ziehen", favCarsRespons.error)
                return
            }

            if (favCarsRespons.data.length === 0) {
                console.log("Keien Daten vorhanden");
            }

            const carIds = favCarsRespons.data.map(fav => fav.car_id)


            // Alle Autodaten nun 
            let fullCarDataRespons = await supabaseClient
                .from('vehicles')
                .select('*')
                .in("id", carIds)

            if (fullCarDataRespons.error) {
                console.error("Fehler mein Daten auto mit ids Holen", fullCarDataRespons.error)
            }

            if (fullCarDataRespons.data) {
                setFavCars(fullCarDataRespons.data)
            }

        }

        getCarDataID()
    })



    return (
        <section className="car-list">
            {favCars.length <= 0 && <h2>Keine Favoreiten vorhanden</h2>}

            {favCars.map((item, index) => (
                <CarItem item={item} key={index} />
            ))}
        </section>
    );
}

export default FavoritesList;
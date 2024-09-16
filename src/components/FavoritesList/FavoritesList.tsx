import { useEffect, useState } from "react";
import { Car } from "../../Car";
import { useUserContext } from "../../Context/UserContext";
import "./FavoritesList.css"
import supabaseClient from '../../lib/supaBaseClient';
import CarItem from "../CarItem/CarItem";
import NoResults from "../NoResults/NoResults";

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

                return
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
        < section className="fav-cars" >
            {
                favCars.length === 0 ? (
                    <NoResults />
                ) : (
                    <section className="car-list">
                        {favCars.map((item) => (
                            <CarItem item={item} key={item.id} />
                        ))}
                    </section>
                )
            }
        </section >
    );
}

export default FavoritesList;
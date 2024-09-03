import { useLocation, useParams } from "react-router-dom";
import BackIcon from "../../components/BackIcon/BackIcon";
import Form from "../../components/Form/Form";
import "./RentalPage.css"
import { useContext, useEffect, useState } from "react";
import { VehicleDetail } from "../../DetailCar";
import supabaseClient from "../../lib/supaBaseClient";
import { useUserContext } from "../../Context/UserContext";
import { FormDataContext } from "../../Context/context";

const RentalPage = () => {
    const [detailData, setDetailData] = useState<VehicleDetail | null>(null)
    const { id } = useParams()

    const location = useLocation()

    const userContext = useUserContext();
    const formData = useContext(FormDataContext);

    let user = userContext?.user;
    console.log(user);


    // console.log("ich bin formDa", formData?.formData);


    // ! Daten holen
    useEffect(() => {
        const getData = async () => {


            const data = await supabaseClient
                .from("vehicles")
                .select(`
                    id,
                    brand,
                    model,
                    year,
                    vehicleType,
                    colors,
                    locations,
                    pricePerDay,
                    availability,
                    electricVehicle,
                    carImg,
                    seats,
                    luggage,
                    horstpower,
                    ps,
                    consumption,
                    fuel,
                    gearType,
                    reviews (
                        id,
                        vehicleID,
                        name,
                        text,
                        stars,
                        date,
                        created_at
                    )
                `)
                .eq('id', id)
                .single();

            if (data.error) {
                console.error("Fehler beim Abrufen der Daten:", data.error);
            }
            if (data.data) {
                setDetailData(data.data);
            }
        };

        getData();
    }, [location]);

    if (!detailData) {
        return <p>Loading...</p>;
    }

    const handleRent = async () => {

        // Berechnung von Tagen
        let date1 = new Date(formData?.formData?.picUpDate || "");
        let date2 = new Date(formData?.formData?.dropOffDate || "");

        let differenceInTime =
            date2.getTime() - date1.getTime();


        let differenceInDays =
            Math.round
                (differenceInTime / (1000 * 3600 * 24));

        // Berrechnung von Totalen Preis
        let totalPrice = differenceInDays * detailData.pricePerDay


        const { data, error } = await supabaseClient
            .from("rental")
            .insert([
                {

                    user_id: user?.id,
                    car_id: detailData.id,
                    picup_location: formData?.formData?.picUpLocation,
                    picup_date: formData?.formData?.picUpDate,
                    picup_time: formData?.formData?.picUpTime,
                    dropoff_location: formData?.formData?.dropOffLocation,
                    dropoff_date: formData?.formData?.dropOffDate,
                    dropoff_time: formData?.formData?.dropOffTime,
                    total_days: differenceInDays,
                    total_price: totalPrice,
                },
            ]);
        if (error) {
            console.error('Fehler beim Hinzufügen der Buchung:', error);
        } else {
            console.log('buchung erfolgreich hinzugefügt:', data);
            // Formular zurücksetzen

        }

    }


    return (
        <main className="r-page">
            <BackIcon />

            <h3>{detailData.brand} {detailData.model}</h3>

            <Form />

            <button onClick={handleRent} className="btn-main">RENT</button>
        </main>
    );
}

export default RentalPage;
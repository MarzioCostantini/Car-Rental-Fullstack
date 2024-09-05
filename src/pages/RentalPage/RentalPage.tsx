import { useLocation, useParams } from "react-router-dom";
import BackIcon from "../../components/BackIcon/BackIcon";
import "./RentalPage.css"
import { useContext, useEffect, useState } from "react";
import { VehicleDetail } from "../../DetailCar";
import supabaseClient from "../../lib/supaBaseClient";
import { useUserContext } from "../../Context/UserContext";
import { FormDataContext } from "../../Context/context";
import BillingInfo from "../../components/BillingInfo/BillingInfo";
import RentalInfo from "../../components/RentalInfo/RentalInfo";
import Payment from "../../components/Payment/Payment";
import RentalSummary from "../../components/RentalSummary/RentalSummary";
import Loader from "../../components/Loader/Loader";
import { checkDates } from "../../components/Function/CheckDate";

const RentalPage = () => {
    const [detailData, setDetailData] = useState<VehicleDetail | null>(null)



    // * Billing Info
    const [userName, setUserName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [adress, setAdress] = useState<string>("")
    const [city, setCity] = useState<string>("")

    // * Total Price
    const [totalPrice, setTotalPrice] = useState<number | null>(null)
    const [totalDays, setTotalDays] = useState<number | null>(null)




    const { id } = useParams()

    const location = useLocation()

    const userContext = useUserContext();
    let user = userContext?.user;

    const formData = useContext(FormDataContext);


    // !Berechnung von Tagen und Gesamtpreis
    useEffect(() => {
        console.log("Datenänderung:", {
            picUpDate: formData?.formData?.picUpDate,
            dropOffDate: formData?.formData?.dropOffDate,
            pricePerDay: detailData?.pricePerDay,
        });

        if (formData?.formData?.picUpDate && formData?.formData?.dropOffDate && detailData?.pricePerDay) {
            // Überprüfen, ob die Daten valide sind
            const isValid = checkDates(formData?.formData?.picUpDate, formData?.formData?.dropOffDate, formData);

            if (isValid) {
                // Berechnung von Tagen
                let date1 = new Date(formData.formData.picUpDate);
                let date2 = new Date(formData.formData.dropOffDate);

                let differenceInTime = date2.getTime() - date1.getTime();
                let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

                setTotalDays(differenceInDays);

                // Berechnung des Gesamtpreises
                let totalPrice = differenceInDays * detailData.pricePerDay;
                setTotalPrice(totalPrice);
            }
        } else {
            console.log("Fehlende Daten für die Berechnung!");
        }
    }, [formData?.formData?.picUpDate, formData?.formData?.dropOffDate, detailData?.pricePerDay]);




    console.log("RentalPage.tsx ", { totalPrice }, { totalDays });

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

    if (!detailData) return <Loader />;








    //! Schreibt Daten in die DB!
    const handleRent = async () => {
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

            <section className="form-wrapper">
                <div>
                    <BillingInfo userName={setUserName} phone={setPhone} adress={setAdress} city={setCity} />
                    <RentalInfo formData={formData} />
                    <Payment />

                </div>
                <RentalSummary detaildata={detailData} totalDay={totalDays} totalPrice={totalPrice} />
            </section>



            <button onClick={handleRent} className="btn-main">RENT</button>
        </main>
    );
}

export default RentalPage;
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BackIcon from "../../components/BackIcon/BackIcon";
import "./RentalPage.css"
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
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
import Confirmation from "../../components/Confirmation/Confirmation";

const RentalPage = () => {
    const [detailData, setDetailData] = useState<VehicleDetail | null>(null)


    // * Billing Info
    const [userName, setUserName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [adress, setAdress] = useState<string>("")
    const [city, setCity] = useState<string>("")

    // * Total Price & Days of Rent
    const [totalPrice, setTotalPrice] = useState<number | null>(null)
    const [totalDays, setTotalDays] = useState<number | null>(null)

    // * Payment Methode
    const [payment, setPayment] = useState<string>("Credit Card")
    console.log("Payment in RentalPage", payment);

    // * Confirmation Info
    const [marketingChecked, setMarketingChecked] = useState<boolean>(false);
    const [termsChecked, setTermsChecked] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null)

    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const userContext = useUserContext();
    let user = userContext?.user;

    const formData = useContext(FormDataContext);


    // !Berechnung von Tagen und Gesamtpreis
    useEffect(() => {


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



    // create UUID
    let rentalUuid = uuidv4()

    console.log(rentalUuid);




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



    //#  Schreibt Daten in die DB!
    const handleRent = async () => {



        // ! Check if all fields are filled
        if (
            user?.id &&
            detailData?.id &&
            formData?.formData?.picUpLocation &&
            formData?.formData?.picUpDate &&
            formData?.formData?.picUpTime &&
            formData?.formData?.dropOffDate &&
            formData?.formData?.dropOffTime &&
            userName &&
            adress &&
            city &&
            phone &&
            totalDays !== null &&
            totalPrice !== null &&
            termsChecked &&
            marketingChecked
        ) {


            // ! Schreibt Daten in die DB
            const { data, error } = await supabaseClient
                .from("rental")
                .insert([
                    {
                        id: rentalUuid,
                        user_id: user?.id,
                        car_id: detailData.id,
                        picup_location: formData?.formData?.picUpLocation,
                        picup_date: formData?.formData?.picUpDate,
                        picup_time: formData?.formData?.picUpTime,
                        dropoff_location: formData?.formData?.picUpLocation,
                        dropoff_date: formData?.formData?.dropOffDate,
                        dropoff_time: formData?.formData?.dropOffTime,
                        total_days: totalDays,
                        total_price: totalPrice,
                        payment: payment,
                        paid: true,
                        user_name: userName,
                        adress: adress,
                        town: city,
                        phone_number: phone,
                        marketing_checked: marketingChecked,
                        terms_checked: termsChecked
                    },
                ]);
            if (error) {
                console.error('Fehler beim Hinzufügen der Buchung:', error);
            } else {
                console.log('buchung erfolgreich hinzugefügt:', data);
                navigate(`/confirmation/${rentalUuid}`)


            }

        } else {
            setMessage("Please fill in all required fields and check the confirmation checkboxes. ")

        }


    }



    return (
        <main className="r-page">
            <BackIcon />

            <section className="form-wrapper">
                <div>
                    <BillingInfo userName={setUserName} phone={setPhone} adress={setAdress} city={setCity} />
                    <RentalInfo formData={formData} />
                    <Payment setPayment={setPayment} payment={payment} />
                    <Confirmation setMarketingChecked={setMarketingChecked} setTermsChecked={setTermsChecked} termsChecked={termsChecked} marketingChecked={marketingChecked} />

                </div>
                <RentalSummary detaildata={detailData} totalDay={totalDays} totalPrice={totalPrice} />
            </section>

            <p>{message && message}</p>

            <button onClick={handleRent} className="btn-main">RENT NOW</button>
        </main>
    );
}

export default RentalPage;
import { useEffect, useState } from "react";
import "./RentalHistory.css";
import { useUserContext } from "../../Context/UserContext";
import supabaseClient from "../../lib/supaBaseClient";
import { RentalDetail } from "../../Rental";
import UpcomingRentalsItem from "../../components/UpcomingRentalsItem/UpcomingRentalsItem";
import Loader from "../../components/Loader/Loader";

const RentalHistory = () => {
    const [detailData, setDetailData] = useState<RentalDetail[] | null>(null);
    const [time, setTime] = useState("Upcoming")

    const userContext = useUserContext();
    const user = userContext?.user;


    if (!user) {
        return;
    }


    useEffect(() => {

        const fetchRentalData = async () => {
            let query = supabaseClient
                .from('rental')
                .select(`
                    id,
                    user_id,
                    car_id,
                    picup_location,
                    picup_date,
                    picup_time,
                    dropoff_location,
                    dropoff_date,
                    dropoff_time,
                    created_at,
                    total_days,
                    total_price,
                    payment,
                    paid,
                    adress,
                    town,
                    phone_number,
                    marketing_checked,
                    terms_checked,
                    user_name,
                    vehicles!rental_car_id_fkey (
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
                        gearType
                    )
                `)
                .eq('user_id', user.id);



            // Apply the correct filter based on the 'time' state
            const today = new Date().toISOString().split('T')[0];


            console.log({ today });

            console.log(time);


            // In der Abfrage
            if (time === "Upcoming") {
                query = query.gte('dropoff_date', today);
            } else if (time === "History") {
                query = query.lt('dropoff_date', today);  // Vergangene Buchungen (< heute)
            }

            // Add ordering
            query = query.order('created_at', { ascending: false });

            const { data, error } = await query;



            if (error) {
                console.error('Error fetching rental data:', error);
                return;
            }

            if (data) {
                setDetailData(data as unknown as RentalDetail[]);
            }
        };

        fetchRentalData();
    }, [time, user]);


    console.log(detailData);


    if (!detailData) {
        return <div><Loader /></div>;
    }

    return (
        <div className="rental">
            <h1>My Bookings</h1>

            <hr />
            <section>
                <article className="switcher-wr">
                    <div className="switcher">
                        <button onClick={() => setTime("Upcoming")} className={`${time === "Upcoming" && "active-btn"}`}>Upcoming</button>
                        <button onClick={() => setTime("History")} className={`${time === "History" && "active-btn"}`}>History</button>
                    </div>
                </article>


                <div>
                    {detailData.map((item, index) => (
                        <UpcomingRentalsItem item={item} key={index} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default RentalHistory;

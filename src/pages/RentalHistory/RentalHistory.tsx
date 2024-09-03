import { useEffect, useState } from "react";
import "./RentalHistory.css";
import { useUserContext } from "../../Context/UserContext";
import supabaseClient from "../../lib/supaBaseClient";
import { RentalDetail } from "../../Rental";
import UpcomingRentalsItem from "../../components/UpcomingRentalsItem/UpcomingRentalsItem";

const RentalHistory = () => {
    const [detailData, setDetailData] = useState<RentalDetail[] | null>(null);
    const [time, setTime] = useState("Upcoming")

    const userContext = useUserContext();
    const user = userContext?.user;


    if (!user) {
        return;
    }


    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];

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
            if (time === "Upcoming") {
                query = query.gt('picup_date', today); // Future rentals
            } else if (time === "History") {
                query = query.lt('dropoff_date', today); // Past rentals
            }

            // Add ordering
            query = query.order('created_at', { ascending: false });

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching rental data:', error);
                return;
            }

            if (data) {
                setDetailData(data as RentalDetail[]);
            }
        };

        fetchRentalData();
    }, [time, user]);


    console.log(detailData);


    if (!detailData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="rental">
            <h1>Rental History</h1>

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

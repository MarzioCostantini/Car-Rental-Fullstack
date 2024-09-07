import { Link, useLocation, useParams } from 'react-router-dom';
import './Confirmation.css';
import { useEffect, useState } from 'react';
import supabaseClient from '../../lib/supaBaseClient';
import Loader from '../../components/Loader/Loader';
import { SingleRentalDetail } from '../../SingleRental';

const Confirmation = () => {
    const [rentalInfo, setRentalInfo] = useState<SingleRentalDetail | null>(null)
    const location = useLocation()

    const { id } = useParams()




    useEffect(() => {
        const getData = async () => {
            const rentResponst = await supabaseClient
                .from("rental")
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
                .eq("id", id)
                .single()

            if (rentResponst.error) {
                console.log("Error by Rentinfo", rentResponst.error);

            }
            if (rentResponst.data) {
                setRentalInfo(rentResponst.data as SingleRentalDetail)
            }


        }


        getData()
    }, [location])



    console.log(rentalInfo);

    if (!rentalInfo) return <Loader />

    return (
        <div className="confirmation">
            <div className="container">
                <div className="header">
                    <h1>Thank You for Your Booking!</h1>
                    <p>We have successfully received your booking. You will receive a confirmation email shortly.</p>
                </div>
                <div className="card">
                    <div className="summary">
                        <h2>Booking Summary</h2>
                        <div className="details">
                            <p>{(rentalInfo.vehicles as any).brand} {(rentalInfo.vehicles as any).model}</p>
                            <p>Pickup Location: {rentalInfo.picup_location}</p>
                            <p>Pickup Date: {rentalInfo.picup_date} - {rentalInfo.picup_time}</p>
                            <p>Dropoff Location: {rentalInfo.dropoff_location}</p>
                            <p>Dropoff Date: {rentalInfo.dropoff_date}- {rentalInfo.dropoff_time}</p>
                            <p>Total Price: ${rentalInfo.total_price}</p>
                        </div>
                    </div>
                    <div className="footer">
                        <Link to="/my-bookings">Go to my Bookings</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;

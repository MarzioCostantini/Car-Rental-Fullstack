import { useContext, useEffect, useState } from "react";
import "./CarList.css";
import { FormDataContext, UserFilterContext } from "../../Context/context";
import CarItem from "../CarItem/CarItem";
import { Car } from "../../Car";
import supabaseClient from "../../lib/supaBaseClient";
import NoResults from "../NoResults/NoResults";

const CarList = () => {
    const filterUser = useContext(UserFilterContext);
    const formData = useContext(FormDataContext);

    const [showCars, setShowCars] = useState<number>(15);
    const [locationCarsState, setLocationCarsState] = useState<Car[] | null>(null);




    useEffect(() => {
        const getData = async () => {
            // *checkt ob daten gesetzt sind
            const picUpLocation = formData?.formData?.picUpLocation;
            const vehicleTypes = filterUser?.userFilter?.type;
            const vehicleColor = filterUser?.userFilter?.colors;
            const driverType = filterUser?.userFilter?.drivesType
            const gearType = filterUser?.userFilter?.gear
            const priceDay = filterUser?.userFilter?.priceDay

            // *Abfrage erstellen an supabase
            let filterData = supabaseClient
                .from("vehicles")
                .select("*")
                .contains('locations', [picUpLocation]);

            // *Optional Filter 

            // Checken ob wirklich was gesetzt ist
            if (vehicleTypes &&
                vehicleTypes.length > 0 &&

                vehicleColor &&
                vehicleColor.length > 0 &&

                driverType &&
                driverType.length > 0 &&

                gearType &&
                gearType.length > 0 &&

                priceDay &&
                priceDay !== undefined

            ) {
                // * Filter anwenden
                filterData = filterData.in('vehicleType', vehicleTypes);
                filterData = filterData.in('colors', vehicleColor);
                filterData = filterData.in('fuel', driverType)
                filterData = filterData.in('gearType', gearType)
                filterData = filterData.lte('pricePerDay', priceDay);
            }

            // * Gefilterte daten rausziehen
            const { data, error } = await filterData;

            if (error) {
                console.log("Error bei daten ziehen", error);
            } else if (data) {
                // * Daten setzen
                setLocationCarsState(data);
            }
        };

        getData();
    }, [formData?.formData, filterUser?.userFilter]);



    console.log(locationCarsState);



    return (
        <>
            {locationCarsState?.length === 0 ? (<NoResults />) : (<div>
                <section className="car-list">
                    {locationCarsState?.slice(0, showCars).map((item, index) => (
                        <CarItem key={index} item={item} />
                    ))}
                </section>
                <div className="btn-more-wrp">
                    <div className="btn-container">
                        <button onClick={() => setShowCars(showCars + 10)} className="show-more-btn btn-main">Show more cars</button>
                    </div>
                    <p>{locationCarsState?.length} Cars total</p>
                </div>
            </div>)}


        </>
    );
};

export default CarList;

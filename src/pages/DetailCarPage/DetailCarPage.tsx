import { useParams } from "react-router-dom";
import "./DetailCarPage.css"
import { useEffect, useState } from "react";
import supabaseClient from "../../lib/supaBaseClient";
import { VehicleDetail } from "../../DetailCar";
import Reviews from "../../components/Reviews/Reviews";
import ReviewStars from "../../components/ReviewStars/ReviewStars";

const DetailCarPage = () => {
    const [detailData, setDetailData] = useState<VehicleDetail | null>(null)
    const { id } = useParams()

    console.log({ detailData });


    // ! Daten anzeigen
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
    }, []);

    if (!detailData) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <section className="detail">
                <div className="box-wrapper-detail">
                    <div className="detail-img">
                        <img src={detailData.carImg} alt="car img" />
                    </div>

                    <div className="car-meta-data">
                        <h1>{detailData.brand} {detailData.model}</h1>
                        <div>
                            {/* Durchschnitt berechen stars */}
                        </div>
                        <article>
                            <div>
                                <p>Type Car <span>{detailData.vehicleType}</span></p>
                                <p>Gear <span>{detailData.gearType}</span></p>
                                <p>HP <span>{detailData.ps}</span></p>
                                <p>Color <span>{detailData.colors}</span></p>
                            </div>

                            <div>
                                <p>Capacity <span>{detailData.seats} Persons</span></p>
                                <p>Usage <span>{detailData.consumption} L</span></p>
                                <p>Fuel <span>{detailData.fuel}</span></p>
                                <p>Laggage <span>{detailData.luggage}</span></p>
                            </div>
                        </article>

                        <article>
                            <h2>${detailData.pricePerDay}/<span>day</span></h2>
                            <button className="btn-main">Rent Now</button>
                        </article>
                    </div>
                </div>


                <div className="reviews">
                    <h2>Reviews <span className="btn-main">{detailData.reviews.length}</span></h2>
                    {detailData.reviews.map((item, index) => (
                        <Reviews item={item} key={index} />
                    ))}
                </div>
            </section>
        </>
    );
}

export default DetailCarPage;
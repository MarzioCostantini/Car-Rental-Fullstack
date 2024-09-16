import "./UpcomingRentalsItem.css";
import { RentalDetail } from "../../Rental";
import FromTo from "../../assets/svg/FromTo";
import MapWithMarkers from "../Map/Map";

interface IUpcomingRentalsItem {
    item: RentalDetail
}

const UpcomingRentalsItem: React.FC<IUpcomingRentalsItem> = ({ item }) => {


    const vehicle = Array.isArray(item.vehicles) ? item.vehicles[0] : item.vehicles;

    return (
        <div className="rental-item">
            <h3>{item.picup_date.replace(/-/g, ".")}</h3>
            <article>
                <div className="top-r">
                    <img src={vehicle.carImg} alt="" />
                    <div>
                        <h3>{vehicle.brand} {vehicle.model}</h3>
                        <p>{item.picup_date.replace(/-/g, ".")} - {item.dropoff_date.replace(/-/g, ".")}</p>
                        <h4>$ {item.total_price}</h4>
                    </div>
                </div>
                <div className="bottom-r">
                    <section>
                        <div>
                            <FromTo />
                        </div>
                        <div>
                            <p>{item.picup_location}</p>
                            <p>{item.dropoff_location}</p>
                        </div>
                    </section>
                    <MapWithMarkers stadt={[item.picup_location]} />
                </div>
            </article>
        </div>
    );
}

export default UpcomingRentalsItem;

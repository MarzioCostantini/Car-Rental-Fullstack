import "./UpcomingRentalsItem.css"
import { RentalDetail } from "../../Rental";
import FromTo from "../../assets/svg/FromTo";
import MapWithMarkers from "../Map/Map";



interface IUpcomingRentalsItem {
    item: RentalDetail
}

const UpcomingRentalsItem: React.FC<IUpcomingRentalsItem> = ({ item }) => {
    return (
        <div className="rental-item">
            <h3>{item.picup_date.replace(/-/g, ".")}</h3>
            <article>
                <div className="top-r">
                    <img src={item.vehicles.carImg} alt="" />
                    <div>
                        <h3> {item.vehicles.brand} {item.vehicles.model}</h3>
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
                    <MapWithMarkers stadt={item.picup_location} />

                </div>
            </article>
        </div>
    );
}

export default UpcomingRentalsItem;
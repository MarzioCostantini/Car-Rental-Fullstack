import { VehicleDetail } from "../../DetailCar";
import ReviewStarsDurchschnitt from "../ReviewStarsDurchschnitt/ReviewStarsDurchschnitt";
import "./RentalSummary.css"

interface PropsCar {
    detaildata: VehicleDetail,
    totalDay: number | null,
    totalPrice: number | null
}

const RentalSummary: React.FC<PropsCar> = (props) => {

    return (
        <section className="rental-summary">
            <div className="rental-summary-header">
                <h2>Rental Summary</h2>
                <p>Prices may change depending on the length of the rental and the price of your rental car.</p>
            </div>

            <div className="rental-summary-car">
                <img src={props.detaildata.carImg} alt={props.detaildata.model} />
                <div className="car-details">
                    <h3>{props.detaildata.brand} {props.detaildata.model}</h3>
                    <div className="rating">

                        <ReviewStarsDurchschnitt stars={props.detaildata.reviews} />
                    </div>
                </div>
            </div>

            <div className="price-details">
                <div className="price-row">
                    <span>Price per Day</span>
                    <span>${props.detaildata.pricePerDay}</span>
                </div>
                <div className="price-row">
                    {props.totalDay && <>
                        <span>Total Days</span>
                        <span>{props.totalDay} {props.totalDay === 1 ? "Day" : "Days"}  </span>
                    </>}
                </div>
                <div className="price-row">
                    <span>Tax</span>
                    <span>$0</span>
                </div>
            </div>

            <div className="total-price">
                <div className="total-price-row">
                    {props.totalPrice &&
                        <>
                            <div>
                                <h4>Total Rental Price</h4>
                                <p>Overall price and includes rental discount</p>
                            </div> <h3>${props.totalPrice}</h3>
                        </>}




                </div>
            </div>
        </section>
    );
}

export default RentalSummary;
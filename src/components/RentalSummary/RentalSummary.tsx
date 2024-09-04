import "./RentalSummary.css"

const RentalSummary = () => {
    return (
        <section className="rental-summary">
            <div className="rental-summary-header">
                <h2>Rental Summary</h2>
                <p>Prices may change depending on the length of the rental and the price of your rental car.</p>
            </div>

            <div className="rental-summary-car">
                <img src="https://media.gq-magazin.de/photos/62876c8d2586a05028020d4d/master/w_1600%2Cc_limit/Auto-Mercedes-Benz-Versteigerung-300-SLR-Uhlenhaut-Coupe%25CC%2581.jpg" alt="Nissan GT-R" />
                <div className="car-details">
                    <h3>Nissan GT – R</h3>
                    <div className="rating">
                        <span className="stars">★★★★☆</span>
                        <span>440+ Reviewer</span>
                    </div>
                </div>
            </div>

            <div className="price-details">
                <div className="price-row">
                    <span>Subtotal</span>
                    <span>$80.00</span>
                </div>
                <div className="price-row">
                    <span>Tax</span>
                    <span>$0</span>
                </div>
            </div>

            <div className="total-price">
                <div className="total-price-row">
                    <div>
                        <h4>Total Rental Price</h4>
                        <p>Overall price and includes rental discount</p>
                    </div>

                    <h3>$80.00</h3>
                </div>
            </div>
        </section>
    );
}

export default RentalSummary;
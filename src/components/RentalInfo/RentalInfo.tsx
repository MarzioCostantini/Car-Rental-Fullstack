import "./RentalInfo.css"

const RentalInfo = () => {
    return (
        <section className="rental-info">
            <div className="rental-info-header">
                <div>
                    <h2>Rental Info</h2>
                    <p>Please select your rental date</p>
                </div>

                <span>Step 2 of 4</span>
            </div>
            <form className="rental-info-form">
                {/* Pick-Up Section */}
                <div className="form-section">
                    <div className="section-header">

                        <label htmlFor="pickup">Pick – Up</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pickup-location">Locations</label>
                        <select id="pickup-location">
                            <option>Select your city</option>
                            {/* Options für die Standorte hier */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pickup-date">Date</label>
                        <input type="date" id="pickup-date" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pickup-time">Time</label>
                        <input type="time" id="pickup-time" />
                    </div>
                </div>

                {/* Drop-Off Section */}
                <div className="form-section">
                    <div className="section-header">

                        <label htmlFor="dropoff">Drop – Off</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dropoff-location">Locations</label>
                        <select id="dropoff-location">
                            <option>Select your city</option>
                            {/* Options für die Standorte hier */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dropoff-date">Date</label>
                        <input type="date" id="dropoff-date" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dropoff-time">Time</label>
                        <input type="time" id="dropoff-time" />
                    </div>
                </div>
            </form>
        </section>
    );
};

export default RentalInfo;
